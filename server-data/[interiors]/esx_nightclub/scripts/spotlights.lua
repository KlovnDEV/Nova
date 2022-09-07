function getLampPos(lamp_num)
	if lamp_num == 0 then
		return vector3(-1591.597, -3013.749, -77.38)
	elseif lamp_num == 1 then
		return vector3(-1591.597, -3010.702, -77.38)
	elseif lamp_num == 2 then
		return vector3(-1594.379, -3008.334, -77.38)
	elseif lamp_num == 3 then
		return vector3(-1597.731, -3008.334, -77.38)
	elseif lamp_num == 4 then
		return vector3(-1602.168, -3010.862, -76.9113)
	elseif lamp_num == 5 then
		return vector3(-1602.168, -3014.519, -76.9113)
	elseif lamp_num == 6 then
		return vector3(-1606.63, -3010.431, -75.7108)
	elseif lamp_num == 7 then
		return vector3(-1606.629, -3014.947, -75.7108)
	elseif lamp_num == 8 then
		return vector3(-1602.368, -3018.949, -77.38)
	end

	return nil
end

function getLampRot(lamp_num)
	if lamp_num == 0 then
		return vector3(0,0,180)
	elseif lamp_num == 1 then
		return vector3(0,0,180)
	elseif lamp_num == 2 then
		return vector3(0,0,-90)
	elseif lamp_num == 3 then
		return vector3(0,0,-90)
	elseif lamp_num == 4 then
		return vector3(0,0,0)
	elseif lamp_num == 5 then
		return vector3(0,0,0)
	elseif lamp_num == 6 then
		return vector3(0,0,-30)
	elseif lamp_num == 7 then
		return vector3(0,0,30)
	elseif lamp_num == 8 then
		return vector3(0,0,40)
	end

	return nil
end

function getLampFxHash(lamp_num)
	if lampNum == 0 then
		return `ba_prop_battle_lights_fx_riga`
	elseif lamp_num == 1 then
		return `ba_prop_battle_lights_fx_rigb`
	elseif lamp_num == 2 then
		return `ba_prop_battle_lights_fx_rigc`
	elseif lamp_num == 3 then
		return `ba_prop_battle_lights_fx_rigd`
	elseif lamp_num == 4 then
		return `ba_prop_battle_lights_fx_rige`
	elseif lamp_num == 5 then
		return `ba_prop_battle_lights_fx_rigf`
	elseif lamp_num == 6 then
		return `ba_prop_battle_lights_fx_rigg`
	elseif lamp_num == 7 then
		return `ba_prop_battle_lights_fx_righ`
	end

	return `ba_prop_battle_lights_fx_riga`
end

function createLampsFX()
	for i=0,8 do
		local lampPos = getLampPos(i)
		local lampRot = getLampRot(i)
		local ent = CreateObjectNoOffset(getLampFxHash(i), lampPos, false, true, true)
		SetEntityRotation(ent, lampRot, 2, 1)
	        local lamp = GetClosestObjectOfType(lampPos, 0.1, `ba_prop_battle_lights_fx_lamp`, false, false, false)
		if DoesEntityExist(lamp) then
			AttachEntityToEntity(ent, lamp, -1, 0.0, 0.0, 0.21, 0.0, 0.0, 0.0, 0, 0, 0, 0, 2, 1)
		end

		Citizen.Wait(0)

		Citizen.InvokeNative(0xDF7B44882EE79164, ent, 1, 202, 28, 255)

	end
end

Citizen.CreateThread(function()
	local hasLamps = false

	while true do
		Citizen.Wait(1000)
		local interior = GetInteriorAtCoords(GetEntityCoords(GetPlayerPed(-1)))

		if interior == 271617 then
			if hasLamps == false then
				hasLamps = true
				Citizen.Wait(2000)
				createLampsFX()
			end
		else
			hasLamps = false
		end
	end
end)
