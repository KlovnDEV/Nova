local securitycam_markers = 0

RegisterNetEvent('esx_securitycam:securitycam_markers')
AddEventHandler('esx_securitycam:securitycam_markers', function(en)
	if en == nil then
		en = 0
	end
	securitycam_markers = en
end)


function isCameraShooted(base_coord, radius)
	local c2 = vector3(radius,radius,radius) + base_coord
	local c1 = vector3(-radius,-radius,-radius) + base_coord

	local res = HasBulletImpactedInBox(c1.x, c1.y, c1.z, c2.x, c2.y, c2.z, 0, 0)
	local blue = 0
	if res == true then
		blue = 255
	end

	if securitycam_markers > 0 then
		DrawBox(c1, c2, 255, 0, blue, 0.5)
	end

	return res
end


Citizen.CreateThread(function()
while true do

	Citizen.Wait(0)
	local playerId = PlayerId()
	local playerPedId = PlayerPedId()
	local coords = GetEntityCoords(playerPedId)

	for location_name,location in pairs(Config.Locations) do
		for j,camera in pairs(location.Cameras) do
			if camera.broken_timer == nil or camera.broken_timer == 0 then
				local camera_coords = vector3(camera.x,camera.y,camera.z)
				local dist = #(coords - camera_coords)

				if dist < Config.CameraMaxDistance then
					if isCameraShooted(camera_coords, 0.15) then
						TriggerServerEvent('esx_securitycam:setCameraBroken', location_name, j)
					end
				end
			end
		end
	end

end
end)

Citizen.CreateThread(function()
while true do
	for location_name,location in pairs(Config.Locations) do
		for j,camera in pairs(location.Cameras) do
			if camera.broken_timer ~= nil and camera.broken_timer > 0 then
				Config.Locations[location_name].Cameras[j].broken_timer = camera.broken_timer - 1
			end
		end
	end

	Citizen.Wait(1000)
end
end)
