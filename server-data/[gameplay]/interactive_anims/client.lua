ESX = nil

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
			onPress = 'interactive_anims:useInteract',
			onEnter = 'interactive_anims:onEnter',
			onExit = 'interactive_anims:onExit',
--			notification = 'Нажмите ~INPUT_PICKUP~ для выполнения действия',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.03, y = 0.03 },
			textureDict = 'spritedict',
			textureName = 'interaction',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = zone.DrawDistance or 20,
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

RegisterNetEvent('interactive_anims:useInteract')
AddEventHandler('interactive_anims:useInteract', function(marker)
	local animDict = marker.Zone.animDict
	local animName = marker.Zone.animName

	ESX.Streaming.RequestAnimDict(animDict, function()
		TaskPlayAnimAdvanced(PlayerPedId(), animDict, animName, marker.Zone.Position.x, marker.Zone.Position.y, marker.Zone.Position.z, marker.Zone.Plase.a, marker.Zone.Plase.b, marker.Zone.Position.h, 8.0, -8.0, -1, 1+8+512, 0.0, false, false)
	end)
    -- print(animDict)
    -- print(animName)
end)


RegisterNetEvent("interactive_anims:onEnter")
AddEventHandler("interactive_anims:onEnter", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'interaction_e')
end)

RegisterNetEvent("interactive_anims:onExit")
AddEventHandler("interactive_anims:onExit", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'interaction')
end)
