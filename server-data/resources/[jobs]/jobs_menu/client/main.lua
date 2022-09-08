ESX          = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()

	for k, zone in pairs(Config.Zones) do
		if zone.Blip then
			if not zone.Blip.pos then
				zone.Blip.pos = vector3(zone.Position.x, zone.Position.y, zone.Position.z)
			end
			zone._blip = BlipClass:new(zone.Blip)
		end

		zone._marker = MarkerClass:new({
			type = -1,
			pos = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = zone.Radius or 5, y = zone.Radius or 5, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'jobsmenu:onPress',
			onEnter = 'jobsmenu:onEnter',
			onExit = 'jobsmenu:onExit',
--			notification = 'Нажмите ~INPUT_PICKUP~ для управления сотрудниками',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.09, y = 0.09 },
			textureDict = 'spritedict',
			textureName = 'chief',
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

RegisterNetEvent("jobsmenu:onPress")
AddEventHandler("jobsmenu:onPress", function(marker)
	ESX.TriggerServerCallback('jobs_menu:getJobInfo', function(info)
		TriggerEvent("nova-ui:showJobMenu", {
			["role"] = marker.Zone.Role,
			["title"] = marker.Zone.Title,
			["grades"] = info.grades,
			["employees"] = info.employees,
		})
	end, marker.Zone.Role)
end)

RegisterNetEvent("jobsmenu:onEnter")
AddEventHandler("jobsmenu:onEnter", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'chief_e')
end)

RegisterNetEvent("jobsmenu:onExit")
AddEventHandler("jobsmenu:onExit", function(marker)
	Config.Zones[marker.Zone.id]._sprite:set('textureName', 'chief')
end)


