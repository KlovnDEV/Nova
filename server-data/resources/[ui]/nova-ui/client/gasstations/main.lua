function getNearestTanker()
	local vehicle = ESX.Game.GetClosestVehicle(GetEntityCoords(PlayerPedId()), { [GetHashKey('tanker')] = true })

	if not DoesEntityExist(vehicle) then
		return nil, nil
	end

	local netid = NetworkGetNetworkIdFromEntity(vehicle)

	if not NetworkDoesNetworkIdExist(netid) then
		return nil, nil
	end

	return vehicle, netid
end

function showGasStation(brand, index)

	OpenScreen('gasstations')

	SendNUIMessage({
		query = 'gasstations/show',
		brand = brand,
		index = index
	})

end

function updateGasStation(brand, index)
	local vehicle, netid = getNearestTanker()

	if not vehicle then
		return
	end

	local veh = Entity(vehicle)
	local liquid = veh.state.liquid

	local tankerCapacity = 0
	local tankerAmount = 10

	if liquid and liquid.name == 'gas' then
		tankerAmount = liquid.amount
		tankerCapacity = liquid.capacity
	end

	ESX.TriggerServerCallback('jobs_oil:getGasStationData', function(data)

		SendNUIMessage({
			query = 'gasstations/update',
			amount = data.Store.current,
			capacity = data.Store.max,
			tankerAmount = tankerAmount,
			tankerCapacity = tankerCapacity,
		})
	end, brand, index)
end

RegisterNetEvent('nova-ui:showGasStation')
AddEventHandler('nova-ui:showGasStation', function(zone)
	updateGasStation(zone.Brand, zone.Index)
	showGasStation(zone.Brand, zone.Index)
end)

RegisterNetEvent('nova-ui:pumpGasStation')
AddEventHandler('nova-ui:pumpGasStation', function(brand, index)
	local vehicle, netid = getNearestTanker()

	if not vehicle then
		return
	end

	TriggerServerEvent('jobs_oil:insideGasStation', netid, brand, index)
end)

RegisterNetEvent('nova-ui:updateGasStation')
AddEventHandler('nova-ui:updateGasStation', function(brand, index)
	updateGasStation(brand, index)
end)
