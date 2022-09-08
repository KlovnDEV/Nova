Citizen.CreateThread(function()

	for k, zone in pairs(Config.Zones) do
		zone._marker = MarkerClass:new({
			type = 1,
			pos = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'react_cad:onPress',
			onEnter = 'react_cad:onEnter',
			onExit = 'react_cad:onExit',
--			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к шкафчику',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.1, y = 0.1 },
			textureDict = 'spritedict',
			textureName = 'craft',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = 5.0,
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

RegisterNetEvent("react_cad:onPress")
AddEventHandler("react_cad:onPress", function(marker)
	local zone = Config.Zones[marker.Zone.id]
	TriggerServerEvent('react_cad:menu_show', zone.HomePage, zone.Permissions)
end)

RegisterNetEvent("react_cad:onEnter")
AddEventHandler("react_cad:onEnter", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'craft_e')
end)

RegisterNetEvent("react_cad:onExit")
AddEventHandler("react_cad:onExit", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'craft')
end)
