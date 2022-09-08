ESX          = nil

insideMarker = nil
insideExtract = false
insideStore = false
insideGasStore = false

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()

	for k, zone in pairs(Config.Zones) do
		zone._marker = MarkerClass:new({
			type = -1,
			zone  = zone,
			pos   = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 25, y = 25, z = 1},
			drawDistance = 50,
			onPress = 'oil:marker-press',
			onEnter = 'oil:marker-enter',
			onExit = 'oil:marker-exit',
--			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к шкафчику',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.3, y = 0.3 },
			textureDict = 'spritedict',
			textureName = 'gasstation',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = 50,
			distanceFade = false,
		})
		zone.id = k

		zone._marker:set('Zone', zone)
	end

	while true do
		Citizen.Wait(0)
		local coords = GetEntityCoords(PlayerPedId(-1))
		for _, zone in pairs(Config.Zones) do
			zone._marker:draw(coords)
			zone._sprite:draw(coords)
		end
	end
end)

AddEventHandler("oil:marker-press", function(marker)
	insideMarker = marker.zone

	if marker.zone.Type == 'gas-station' then
		TriggerEvent('nova-ui:showGasStation', marker.zone)
	else
		ESX.TriggerServerCallback('jobs_oil:getZone', function(zone)
			if zone then
				ESX.ShowNotification('Хранилище '..tostring(zone.Store.current)..' / '.. tostring(zone.Store.max))
			end
		end, marker.zone.id)

	end
end)

AddEventHandler("oil:marker-enter", function(marker)
	insideMarker = marker.zone
end)

AddEventHandler("oil:marker-exit", function(marker)
	insideMarker = nil
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)

		local veh = GetVehiclePedIsIn(PlayerPedId())
		local tanker = ESX.Game.GetClosestVehicle(GetEntityCoords(PlayerPedId()), { [GetHashKey('tanker')] = true })
		if insideMarker then
			if DoesEntityExist(tanker) and DoesEntityExist(veh) and GetEntityAttachedTo(tanker) == veh then
				local netid = NetworkGetNetworkIdFromEntity(tanker)
				if NetworkDoesNetworkIdExist(netid) then
					TriggerServerEvent('jobs_oil:insideMarker', netid, insideMarker.id)
				end
			end
		end
	end
end)
