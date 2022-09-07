local Timers = {
	Droplet = 0,
	Neon = 0,
	Band = 0,
	Laser = 0,
}

local Variations = {
	Droplet = 1,
	Neon = 1,
	Band = 1,
	Laser = 1,
}


Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
	local v = vector3(-1604.664, -3012.583, -80.0)

	for i=1,4 do
	for j=1,4 do
		CreateModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_0"..tostring(j).."_a"), true)
		CreateModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_0"..tostring(j).."_b"), true)
		CreateModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_0"..tostring(j).."_c"), true)
	end
	end

	local varNames = { [1] = 'a', [2] = 'b', [3] = 'c' }

	for k,v in pairs(Timers) do
		print(k, v)
		if v <= 0 then
			print("switch")
			Timers[k] = 10 + math.random()*15
			if Variations[k] > 2 then
				Variations[k] = 1
			else
				Variations[k] = Variations[k] + 1
			end
		else
			Timers[k] = Timers[k] - 1
		end
	end

	for i=1,4 do
		RemoveModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_01_"..varNames[Variations['Droplet']]), false)
		RemoveModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_02_"..varNames[Variations['Neon']]), false)
		RemoveModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_03_"..varNames[Variations['Band']]), false)
		RemoveModelHide(v, 20.0, GetHashKey("ba_rig_dj_0"..tostring(i).."_lights_04_"..varNames[Variations['Laser']]), false)
	end
    end
end)
