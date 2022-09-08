ESX = nil
Vehicles = {}
local CarProps = {}

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
    end
end)

function initVehicle(entity)
	if not DoesEntityExist(entity) then
		return
	end

	local networkId = VehToNet(entity)

	if not NetworkHasControlOfNetworkId(networkId) then
		NetworkRequestControlOfNetworkId(networkId)
		return
	end

	SetNetworkIdCanMigrate(networkId, true)
	SetNetworkIdExistsOnAllMachines(networkId, true)

	for seat = -1, GetVehicleMaxNumberOfPassengers() do
		local ped = GetPedInVehicleSeat(entity, seat)
		if DoesEntityExist(ped) and not IsPedAPlayer(ped) then
			DeleteEntity(ped)
		end
	end

	local e = Entity(entity)
	if e.state.props then
		if e.state.heading then
			SetEntityHeading(entity, e.state.heading)
		end

		ESX.Game.SetVehicleProperties(entity, e.state.props)

		InitExtras(entity, e.state.vehid, e.state.props)

		SetEntityAsMissionEntity(entity, true, false)
		SetVehicleHasBeenOwnedByPlayer(entity, true)
		SetVehicleNeedsToBeHotwired(entity, false)
		SetVehRadioStation(entity, 'OFF')

		if e.state.vehid then
			TriggerServerEvent('vehsync:inited', e.state.vehid)
		end
	end
end

function InitExtras(entity, id, props)
	assert(entity and DoesEntityExist(entity))
	assert(id)
	assert(props)

	print('InitExtras', id, json.encode(props))

	local carIsNotReady = false

	ESX.Game.SetVehicleProperties(entity, props)

	if props.doorBroken then
		for k,v in pairs(props.doorBroken) do
			if v then
				SetVehicleDoorBroken(entity, tonumber(k), true)
			end
		end
	end

	if props.wheelHealth then
		for k,v in pairs(props.wheelHealth) do
			if v then
				SetVehicleWheelHealth(entity, tonumber(k), v*1.0)
			end
		end
	end

--[[
	if props.wheelInfo then
		print('WHEEL INFO')
		for k,v in pairs(props.wheelInfo) do
			wn = tonumber(k)

			print('WHEEL INFO', wn)

			if v.present == false then
				print('WHEEL INFO', 'NON PRESENT')
				carIsNotReady = true
				SetVehicleFixed(entity)
--				FreezeEntityPosition(entity, true)

				SetVehicleWheelHealth(entity, wn, 0.0)

--				SetVehicleWheelsCanBreak(entity, wn, false)
--				SetVehicleWheelYRotation(entity, wn, 90.0)
--				SetVehicleWheelXOffset(entity, wn, 20.0)
--				SetVehicleWheelTireColliderSize(entity, wn, 0.01)
--				SetVehicleWheelSize(entity, wn, 0.01)
--				SetEntityVisible(entity, true, true)
			elseif v.burst then
				print('WHEEL INFO', 'BURST')
				SetVehicleTyreBurst(entity, wn, false, 1000.0)
			end
		end
	end
]]--

	if props.windowBroken then
		for k,v in pairs(props.windowBroken) do
			if v then
				SmashVehicleWindow(entity, tonumber(k))
			end
		end
	end

	if props.engineHealth then
		SetVehicleEngineHealth(entity, props.engineHealth*1.0)
--		if props.engineHealth < -3999 then
--			NetworkExplodeVehicle(entity, false, true, false)
--		end
	end
	if props.tankHealth then
		SetVehiclePetrolTankHealth(entity, props.tankHealth*1.0)
	end

	if props.bodyHealth then
		SetVehicleBodyHealth(entity, props.bodyHealth*1.0)
	end

	if props.isFrame then

--		for k=0, 12 do
--			SetVehicleDoorBroken(entity, k, true)
--		end


		SetVehicleMaxSpeed(entity, 0.1)
--		SetVehicleEngineOn(entity, false, true, true)
--		SetVehicleDoorsLockedForAllPlayers(entity, true)
--		SetVehicleDoorsLocked(entity, 2)
	end


--	DecorSetInt(entity, "Owned_Vehicle_Id", id)
end


function updateVehicleProps(id, veh)
	if not DoesEntityExist(veh) then
		return
	end

	local newProps = ESX.Game.GetVehicleProperties(veh)
	local props = CarProps[id] or {}

	newProps.wheelInfo = getWheels(veh, props.wheelInfo or {})
	newProps.windowBroken = windowBroken(veh)
	newProps.doorBroken = doorBroken(veh)
	newProps.wheelHealth = wheelHealth(veh)

	if props ~= nil then
		local diff = {}
		local needSend = false
		for k,v in pairs(newProps) do
			if k == "engineHealth" and not v then
				v = -4000
			end

			if not tablesEqual(v, props[k]) then
				diff[k] = v
				needSend = true
			end
		end

		if needSend then
			TriggerServerEvent("vehsync:updateCarProps", id, diff)
		end
	end

	CarProps[id] = newProps
end

function tablesEqual(t1,t2)
	if type(t1) == 'number' and type(t2) == 'number' then
		if math.abs(t1-t2) < 1e-7 then
			return true
		end
	end

	if type(t1) ~= 'table' or type(t2) ~= 'table' then
		return t1 == t2
	end

	for k,v in pairs(t1) do
		if not tablesEqual(t1[k], t2[k]) then
			return false
		end
	end

	for k,v in pairs(t2) do
		if not tablesEqual(t1[k], t2[k]) then
			return false
		end
	end

	return true
end

function getWheels(veh, prevWheels)
	local wheels = prevWheels
	for i = 0, GetVehicleNumberOfWheels(veh) - 1 do
		prevWheel = wheels[i] or {}

		pcall(function()
			if not wheels[i] then
				wheels[i] = {}
			end

			wheels[i].burst = not (not IsVehicleTyreBurst(veh, i, false))
--			wheels[i].present = prevWheel.present or GetVehicleWheelXOffset(veh, i) < 9999
			wheels[i].present = false
		end)
	end

	return wheels
end

function windowBroken(veh)
	local windows = {}
	for i = 0, 10 do
		pcall(function()
			windows[i] = not IsVehicleWindowIntact(veh, i)
		end)
	end

	return windows
end

function doorBroken(veh)
	local doors = {}
	for i = 0, 10 do
		pcall(function()
			doors[i] = not (not (IsVehicleDoorDamaged(veh, i)))
		end)
	end

	return doors
end

function wheelHealth(veh)
	local wheels = {}
	for i = 0, 10 do
		pcall(function()
			local health = math.floor(GetVehicleWheelHealth(veh, i))
			if health > 0 then
				wheels[i] = health
			end
		end)
	end

	return wheels
end

function processVehicle(veh)
	if not DoesEntityExist(veh) then
--		print('veh not exist', veh)
		return
	end

	if not NetworkGetEntityIsNetworked(veh) then
--		print('veh not networked', veh)
		return
	end

--	if NetworkGetEntityIsLocal(veh) then
--		print('veh is local', veh)
--		return
--	end

	local coords = GetEntityCoords(veh)-- + vector3(0,0,1.0)
	local heading = GetEntityHeading(veh)
	local e = Entity(veh)

	if not e or not e.state.vehid then
		return
	end

	local id = e.state.vehid

	-- veh not inited yet
	if e.state.need_init then
--		print('veh needs init', veh)
		pcall(function ()
			initVehicle(veh)
		end)

		return
	end

	if Vehicles[id] == nil then
		Vehicles[id] = {}
	end

	local need_update = false

	if Vehicles[id].pos and #(coords-Vehicles[id].pos) > 0.1 then
		need_update = true
	end

	if Vehicles[id].heading and math.abs(Vehicles[id].heading-heading) > 1 then
		need_update = true
	end

	Vehicles[id].pos = coords
	Vehicles[id].heading = heading

	if need_update then
		TriggerServerEvent('vehsync:updateVehiclePos', id, coords, heading)
	end

	updateVehicleProps(id, veh)
end

-- Sync
Citizen.CreateThread(function()
    local Vehicles = {}

    while true do
        Citizen.Wait(1000)

	for _, veh in pairs(ESX.Game.GetVehicles()) do
		processVehicle(veh)
	end
    end
end)
