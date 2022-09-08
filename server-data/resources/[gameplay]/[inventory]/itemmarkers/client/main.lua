ESX          = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Blips = {}

Citizen.CreateThread(function()

	for k, zone in pairs(Config.Zones) do
		zone._marker = MarkerClass:new({
			type = 1,
			pos = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'itemmarkers:onPress',
			onEnter = 'itemmarkers:onEnter',
			onExit = 'itemmarkers:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ '..(zone.Notification or "для получения предмета"),
		})

		Blips[k] = BlipClass:new({
			pos = zone.Position,
			text = zone.Label,
			sprite  = zone.Blip or 70,
			display = 4,
			scale   = 0.8,
			color   = GetHashKey(zone.Item.name) % 100,
			shortRange = true,
		})

		zone._marker:set('Zone', zone)
		zone.id = k
	end

	while true do
		Citizen.Wait(0)
		local coords = GetEntityCoords(PlayerPedId(-1))
		for _, zone in pairs(Config.Zones) do
			zone._marker:draw(coords)
		end
	end
end)

RegisterNetEvent("itemmarkers:onPress")
AddEventHandler("itemmarkers:onPress", function(marker)
	TriggerServerEvent('itemmarkers:giveitem', marker.Zone.id)
end)
