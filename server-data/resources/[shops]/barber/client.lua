ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

local BarberShops = {
	{ id = 1, pos = vector3(-814.2, -183.96, 37.57), color = 18 }
}

Markers = {}
Blips = {}

Citizen.CreateThread(function()
	for k,v in pairs(BarberShops) do
		Markers[v.id] = MarkerClass:new({
			type = 1,
			zone = v.id,
			pos = v.pos,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'barber:onPress',
			onEnter = 'barber:onEnter',
			onExit = 'barber:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к магазину',
		})

		Blips[v.id] = BlipClass:new({
			pos = vector3(v.pos.x, v.pos.y, v.pos.z),
			sprite  = 71,
			display = 4,
			scale   = 1.0,
			color   = v.color,
			shortRange = true,
		})
	end

	while true do
		Citizen.Wait(0)

		local coords = GetEntityCoords(PlayerPedId(-1))
		for k,marker in pairs(Markers) do
			marker:draw(coords)
		end
	end
end)

RegisterNetEvent("barber:onPress")
AddEventHandler("barber:onPress", function(marker)
	local shopId = marker.zone
	TriggerEvent('nova-ui:openSkinChanger', 'barber');
end)
