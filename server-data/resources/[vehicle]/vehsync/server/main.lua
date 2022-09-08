ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
Vehicles = {}

AddEventHandler("onResourceStart", function(resName)
	if GetCurrentResourceName() ~= resName then return end

	for _,veh in pairs(GetAllVehicles()) do
		local e = Entity(veh)
		if e.state.vehid then
			DeleteEntity(veh)
		end
	end
end)

function updateDBCarProps(id, props)
	local res = exports['db'].post(0, 'vehicle/props/update', json.encode({
		vehicle = id,
		props = json.encode(props),
	}))
end

function updateCarProps(id, props)
	local veh = Vehicles[id]
	assert(veh)

	if not veh.entity then
		return
	end

	for k,v in pairs(props) do
		veh.props[k] = v
	end

	updateDBCarProps(id, props)

	Entity(Vehicles[id].entity).state:set('props', veh.props, true)
end

function CreateAutomobile(modelHash, x, y, z)
	return Citizen.InvokeNative(0x0722A2CA, modelHash, x, y, z, _r, _ri)
end

function setGarage(id, garage)
--	print('setGarage', id, garage)
	Vehicles[id].garage = garage

	local res = exports['db'].post(0, 'vehicle/garage/update', json.encode({
		["id"] = id,
		["garage"] = garage or ''
	}))
end

function CreateOwnedVehicle(model, pos, heading, props)
	local res = exports['db'].post(0, 'vehicle/create', json.encode({
		["model"] = model,
		["x"] = pos.x,
		["y"] = pos.y,
		["z"] = pos.z,
		["heading"] = heading })
	)

	if res[1] ~= 200 then
		return
	end

	local vehid = json.decode(res[2]).insertId

	updateDBCarProps(vehid, props)

	Vehicles[vehid] = {
		pos = pos,
		heading = heading,
		model = model,
		props = props,
		locked = false,
		entity = nil,
		garage = nil
	}
end

RegisterServerEvent('vehsync:createOwnedVehicle')
AddEventHandler('vehsync:createOwnedVehicle', function(model, pos, heading, props)
	CreateOwnedVehicle(model, pos, heading, props)
end)

function dbGetProps(id)
	local res = exports['db'].post(0, 'vehicle/props/get', json.encode({ ["vehicle"] = id }))
	if res[1] == 200 then
		local response = json.decode(res[2])

		if response then
			response = response[1] or {}
			response = response.value
		end

		if response then
			response = json.decode(response)
		end

		if response then
			local props = {}
			for k,v in pairs(response) do
--[[
				if v.name == 'doorBroken' or v.name == 'windowBroken' then
					print(v.value)
					props[v.name] = json.decode(v.value)
				end
]]--
				props[k] = v
			end

			if props['engineHealth'] and props['engineHealth'] < 0 then
				props['engineHealth'] = 0
			end

			if props['tankHealth'] and props['tankHealth'] < 0 then
				props['tankHealth'] = 0
			end

			return props
		else
			ESX.Error('spawnCar: props not found!')
			return nil
		end
	else
		ESX.Error('spawnCar: incorrect response! '..tostring(res[1]))
		return nil
	end

	return nil

end

function spawnCar(vehid)
	local v = Vehicles[vehid]
	assert(v)

	if not DoesEntityExist(v.entity) then
		v.entity = CreateAutomobile(GetHashKey(v.model), v.pos.x, v.pos.y, v.pos.z)
	end

	if not DoesEntityExist(v.entity) then
--		print('Unable to create new entity! Vehicle '..tostring(vehid))
		return
	end

	local e = Entity(v.entity)
	if e then
		e.state:set('vehid', vehid, true)
		e.state:set('heading', v.heading, true)
		e.state:set('props', v.props, true)
		e.state:set('need_init', true, true)
		e.state:set('locked', v.locked, true)
		v.netId = nil
		v.needInit = true
	end
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)

		for k,v in pairs(Vehicles) do
			if v.entity and not DoesEntityExist(v.entity) then
				v.entity = nil
				v.netId = nil
			end

			if not v.entity and not v.garage then
				spawnCar(k)
			end

			if not v.netId then
				local owner = NetworkGetEntityOwner(v.entity)
				if owner > -1 then
					v.netId = NetworkGetNetworkIdFromEntity(v.entity)
				end
			end
		end
	end
end)

RegisterServerEvent('vehsync:inited')
AddEventHandler('vehsync:inited', function(id)
	if Vehicles[id] and Vehicles[id].entity then
		Vehicles[id].needInit = false
		Entity(Vehicles[id].entity).state:set('need_init', false, true)
	end
end)

RegisterServerEvent('vehsync:updateCarProps')
AddEventHandler('vehsync:updateCarProps', function(id, props)
	updateCarProps(id, props)
end)

RegisterServerEvent('vehsync:updateVehiclePos')
AddEventHandler('vehsync:updateVehiclePos', function(id, pos, heading)
	assert(id)
	assert(pos)
	assert(heading)

	if not Vehicles[id] then
		return
	end

	local veh = Vehicles[id]
	veh.pos = pos
	veh.heading = heading

	TriggerEvent('db:post', 'vehicle/update', json.encode({
		id = id,
		x = veh.pos.x,
		y = veh.pos.y,
		z = veh.pos.z,
		heading = veh.heading,
	}), function(status, reply) end)
--[[
	local res = exports['db'].post(0, 'vehicle/update', json.encode({
		id = id,
		x = veh.pos.x,
		y = veh.pos.y,
		z = veh.pos.z,
		heading = veh.heading,
	}))
]]--
end)

Citizen.CreateThread(function()

	Citizen.Wait(1000)

	local res = exports['db'].get(0, 'vehicle/getlist')

	if res[1] == 200 then
		Vehicles = {}

		local vehs = json.decode(res[2])
		for _,veh in pairs(vehs) do

			Vehicles[veh.id] = {
				pos = vector3(veh.x, veh.y, veh.z),
				heading = veh.heading,
				model = veh.model,
				props = dbGetProps(veh.id) or {},
				locked = veh.locked ~= nil and veh.locked > 0,
				entity = nil,
				garage = veh.garage,
			}
			if Vehicles[veh.id] == "" then Vehicles[veh.id].garage = nil end
		end
	end
end)

ESX.RegisterServerCallback('vehsync:getGarage', function(source, cb, garage)
	assert(garage)
	assert(cb)

	local res = exports['db'].post(0, 'vehicle/garage/get', json.encode({ ["garage"] = garage }))
	if res[1] == 200 then
		local response = json.decode(res[2])
		if response then
			cb(response)
		else
			cb(nil)
			ESX.Error('Garage not found!')
		end
	else
		cb(nil)
		ESX.Error('Garage: incorrect response! '..tostring(res[1]) .. json.encode(res[2]))
	end
end)

RegisterServerEvent('vehsync:despawnCar')
AddEventHandler('vehsync:despawnCar', function(id, garage)
	if not Vehicles[id] then
		return
	end

	local entity = Vehicles[id].entity

	if garage then
		setGarage(id, garage)
	end

	if entity then
		DeleteEntity(Vehicles[id].entity)
		Vehicles[id].entity = nil
	end
end)

ESX.RegisterServerCallback('vehsync:respawnCar', function(source, cb, id, pos, heading)
	assert(cb)
	assert(id)
	assert(pos)

	local veh = Vehicles[id]

	if not veh then
		return
	end

	if veh.entity then
		return
	end

	if not veh.garage then
		return
	end

	local res = exports['db'].post(0, 'vehicle/update', json.encode({
		id = id,
		x = pos.x,
		y = pos.y,
		z = pos.z,
		heading = heading,
	}))

	Vehicles[id].pos = pos
	Vehicles[id].heading = heading

	spawnCar(id)

	if DoesEntityExist(Vehicles[id].entity) then

		local lastGarage = Vehicles[id].garage

		local timeout = 10000
		while not Vehicles[id].netId do
--			print('timeout', timeout)
			Citizen.Wait(1000)
			timeout = timeout - 1000
			if timeout < 0 then break end
		end

--		print(bbb, Vehicles[id].netId)
		if Vehicles[id].netId then
			setGarage(id, nil)
			cb(Vehicles[id].netId)
		else
			Vehicles[id].garage = lastGarage
			cb(nil)
		end
	else
		cb(nil)
	end
end)

RegisterServerEvent('vehsync:setLocked')
AddEventHandler('vehsync:setLocked', function(id, value)
	local v = Vehicles[id]
	assert(v, 'Unable to set locked state for veh '..tostring(id)..'. No vehicle found.')
	assert(v.entity, 'Unable to set locked state for veh '..tostring(id)..'. No entity spawned.')

	local e = Entity(v.entity)

	if e then
		local res = exports['db'].post(0, 'vehicle/setlocked', json.encode({
			id = id,
			locked = value,
		}))

		e.state:set('locked', value, true)
	end
end)
