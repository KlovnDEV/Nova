ESX          = nil

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
			pos = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = zone.Radius or 5, y = zone.Radius or 5, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'garage:onPress',
			onEnter = 'garage:onEnter',
			onExit = 'garage:onExit',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.09, y = 0.09 },
			textureDict = 'spritedict',
			textureName = 'garage',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = zone.Radius,
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

RegisterNetEvent("garage:onPress")
AddEventHandler("garage:onPress", function(marker)
	local ped = PlayerPedId()
	local veh = GetVehiclePedIsIn(ped)

	-- на авто
	if DoesEntityExist(veh) then
		local entity = Entity(veh)
		local id = -1

		if entity and entity.state.vehid  then
			id = entity.state.vehid
		end

		local vehclass = GetVehicleClass(veh)

		local allowed = true

		if marker.Zone.AllowedClasses then
			allowed = false
			for _,v in pairs(marker.Zone.AllowedClasses) do
				if v == vehclass then
					allowed = true
					break
				end
			end
		end

		if not allowed or id < 0 then
			ESX.ShowNotification('Данный транспорт ~r~нельзя поставить~s~ в этот гараж!')
			return
		end

		if IsPedInAnyVehicle(ped, true) then
			TaskLeaveAnyVehicle(ped)
		end

		Citizen.Wait(1000)

		NetworkFadeOutEntity(veh, true, true)

		Citizen.Wait(200)
		SetEntityVisible(veh, false, 0)

		TriggerServerEvent("vehsync:despawnCar", id, marker.Zone.Name)

		return
	end

	-- пешком
	ESX.TriggerServerCallback('vehsync:getGarage', function(vehicles)
		if not vehicles then
			ESX.Error('Unable to get vehicles!')
			return
		end

		elements = {}
		for k,v in pairs(vehicles) do
			table.insert(elements, { label = v.model, value = v.id })
		end

		if #elements == 0 then
			table.insert(elements, { label = "Ничего нет", value = "-1" })
		end

		TriggerEvent('nova-ui:menu_show', 'garage-menu', {
			name = "player-menu",
			title = marker.Zone.Title,
			position = "tr",
			elements = elements
		}, {

			click = function(cmd)
				TriggerEvent('nova-ui:menu_hide')
				if cmd ~= -1 then
					local position = marker.Zone.SpawnPosition or marker.Zone.Position
					ESX.TriggerServerCallback('vehsync:respawnCar', function(netid)
						if not netid then
							ClearAreaOfVehicles(position.x, position.y, position.z, 0.1, false, false, false, false, false)
							ESX.ShowNotification('Невозможно получить транспорт!')
							return
						end

						local entity = NetworkGetEntityFromNetworkId(netid)
						if DoesEntityExist(entity) then
							SetPedIntoVehicle(PlayerPedId(), entity, -1)
						end
					end, cmd, position, marker.Zone.Heading)
				end
			end,

			back = function()
				TriggerEvent('nova-ui:menu_hide')
			end
		})

	end, marker.Zone.Name)
end)

RegisterNetEvent("garage:onEnter")
AddEventHandler("garage:onEnter", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'garage_e')
end)

RegisterNetEvent("garage:onExit")
AddEventHandler("garage:onExit", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'garage')
end)


