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
			scale = { x = 2, y = 2, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'forges:onPress',
			onEnter = 'forges:onEnter',
			onExit = 'forges:onExit',
--			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к шкафчику',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.1, y = 0.1 },
			textureDict = 'spritedict',
			textureName = 'craft',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = zone.DrawDistance or 5.0,
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

RegisterNetEvent("forges:onPress")
AddEventHandler("forges:onPress", function(marker)
	TriggerEvent("nova-ui:showCraft", "craft", marker.Zone.Identifier, marker.Zone.Categories)
end)

RegisterNetEvent("forges:onEnter")
AddEventHandler("forges:onEnter", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'craft_e')
end)

RegisterNetEvent("forges:onExit")
AddEventHandler("forges:onExit", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'craft')
end)
