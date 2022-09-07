ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

oilStore = 0
gasStore = 100000

Citizen.CreateThread(function()

	while true do
		if oilStore >= 3 then
			oilStore = oilStore - 3
			gasStore = gasStore + 1
		end

		for k,zone in pairs(Config.Zones) do
			if zone.Type == 'extract' and zone.Store.current < zone.Store.max then
				zone.Store.current = zone.Store.current + 1
			end
		end

		Citizen.Wait(10000)
	end
end)

function RefuelTanker(xPlayer, e, liquid, amount)
	assert(liquid)
	assert(amount > 0)

	if not e.state.liquid then
		e.state:set('liquid', { name = liquid, amount = 0, capacity = Config.TankerCapacity }, true)
	end

	if e.state.liquid.amount < 1 or (e.state.liquid.name == liquid and e.state.liquid.amount <= Config.TankerCapacity-amount) then
		e.state.liquid = { name = liquid, amount = e.state.liquid.amount + amount, capacity = Config.TankerCapacity }
		xPlayer.showNotification('Заправка '..tostring(liquid)..': '..tostring(e.state.liquid.amount)..' из '..tostring(Config.TankerCapacity))
		return true
	end

	return false
end

function storeFromZone(zoneId, amount)
	local zone = Config.Zones[zoneId]

	assert(zone)
	assert(amount > 0)

	if zone.Store.current < amount then
		return false
	end

	zone.Store.current = zone.Store.current - amount

	return true
end

function storeFromTanker(xPlayer, e, liquid, amount)
	if not e.state.liquid or not e.state.liquid.name or e.state.liquid.name ~= liquid then
		if liquid == 'oil' then
			xPlayer.showNotification('В цистерне нет нефти!')
		elseif liquid == 'gas' then
			xPlayer.showNotification('В цистерне нет бензина!')
		else
			xPlayer.showNotification('В цистерне нет: '..liquid..'!')
		end

		return false
	end

	if e.state.liquid.amount >= amount then
		e.state.liquid = { name = liquid, amount = e.state.liquid.amount - amount, capacity = Config.TankerCapacity }
		return true
	end


	return false
end

function getEntityFromNetid(netid)
	local entity  = NetworkGetEntityFromNetworkId(netid)
	if not DoesEntityExist(entity) then
		return nil
	end

	local e = Entity(entity)
	return e
end

function insideExtract(xPlayer, e)
	if not e then
		print(string.format('Entity with netid=%i not found!',netid))
		return
	end

	RefuelTanker(xPlayer, e, 'oil', 1)
end

function insideStore(xPlayer, e)
	if oilStore > Config.OilStoreCapacity then
		return
	end

	if storeFromTanker(xPlayer, e, 'oil', 1) then
		oilStore = oilStore + 1
	end
end

function insideGasStore(xPlayer, e, zoneId)

	if storeFromZone(zoneId, 1) and RefuelTanker(xPlayer, e, 'gas', 1) then
	end
end

function insideGasStation(xPlayer, e, brand, index)
	local zone = findGasStation(brand, index)

	if zone.Store.current >= zone.Store.max then
		return
	end

	if storeFromTanker(xPlayer, e, 'gas', 1) then
		zone.Store.current = zone.Store.current + 1
		TriggerClientEvent('nova-ui:updateGasStation', xPlayer.source, brand, index)
	end
end

RegisterNetEvent('jobs_oil:insideMarker')
AddEventHandler('jobs_oil:insideMarker', function(netid, zoneId, data)
	local xPlayer = ESX.GetPlayerFromId(source)
	local e = getEntityFromNetid(netid)
	local zone = Config.Zones[zoneId]
	if not e then return end

--	print(zone.Type, json.encode(e.state.liquid), json.encode(zone.Type))

	if zone.Type == 'extract' then
		insideExtract(xPlayer, e)
	elseif zone.Type == 'store' then
		insideStore(xPlayer, e)
	elseif zone.Type == 'gas-store' then
		insideGasStore(xPlayer, e, zoneId)
	elseif zone.Type == 'gas-station' and data then
		insideGasStation(xPlayer, e, data.brand, data.index)
	end
end)

RegisterNetEvent('jobs_oil:insideGasStation')
AddEventHandler('jobs_oil:insideGasStation', function(netid, brand, index)
	local xPlayer = ESX.GetPlayerFromId(source)
	local e = getEntityFromNetid(netid)
	if not e then return end

	insideGasStation(xPlayer, e, brand, index)
end)

function findGasStation(brand, index)
	for k,v in pairs(Config.Zones) do
		if v.Type == 'gas-station' then
			if v.Brand == brand and v.Index == index then
				return v
			end
		end
	end

	return nil
end

function getTankerLiquid(netid)
	local e = getEntityFromNetid(netid)
	if not e then return nil end
	return e.state.liquid
end

ESX.RegisterServerCallback('jobs_oil:getGasStationData', function(source, cb, brand, index)
	local xPlayer = ESX.GetPlayerFromId(source)

	local station = findGasStation(brand, index)
	cb(station)
end)

ESX.RegisterServerCallback('jobs_oil:getZone', function(source, cb, zoneId)
	local xPlayer = ESX.GetPlayerFromId(source)

	local zone = Config.Zones[zoneId]
	cb(zone)
end)
