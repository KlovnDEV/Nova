local tireChangeActive = false
local tireChangeProp = nil

Citizen.CreateThread(function()
	while true do
		local allowedWeapons = {"WEAPON_KNIFE", "WEAPON_BOTTLE", "WEAPON_DAGGER", "WEAPON_HATCHET", "WEAPON_MACHETE", "WEAPON_SWITCHBLADE"}
		local player = PlayerId()
		local plyPed = GetPlayerPed(player)
		local vehicle = GetClosestVehicleToPlayer()
		local animDict = "melee@knife@streamed_core_fps"
		local animName = "ground_attack_on_spot"

		if tireChangeActive == true then
			if tireChangeProp == nil then
				local prop_name = "prop_wheel_tyre"
				local coords = GetEntityCoords(plyPed)
				local prop = CreateObject(GetHashKey(prop_name), coords.x, coords.y, coords.z + 10.2, true, true, true)
				local boneIndex = GetPedBoneIndex(plyPed, 57005) -- 18905 = left hand, 57005 = right hand
				AttachEntityToEntity(prop, plyPed, boneIndex, -0.05, 0.10, -0.32, 150.0, 95.0, 190.0, true, true, false, true, 1, true)
				tireChangeProp = prop
			end

			if not IsEntityPlayingAnim(plyPed, "anim@heists@box_carry@", "idle", 3) then
				RequestAnimDict("anim@heists@box_carry@")
				while not HasAnimDictLoaded("anim@heists@box_carry@") do
					Citizen.Wait(0)
				end
				TaskPlayAnim(plyPed, "anim@heists@box_carry@", "idle", 8.0, 8.0, -1, 50, 0, false, false, false)
			end

			local closestTire = GetClosestVehicleTire(vehicle)
			if closestTire ~= nil then
					local repDict = "amb@medic@standing@tendtodead@idle_a"
					local repAnim = "idle_b"

					if IsVehicleTyreBurst(vehicle, closestTire.tireIndex, 0) ~= false then
						Draw3DText(closestTire.bonePos.x, closestTire.bonePos.y, closestTire.bonePos.z, tostring("~g~[E] Заменить колесо"))
						if IsControlJustPressed(1, 38) then

							DeleteObject(tireChangeProp)
							tireChangeProp = nil

							if IsEntityPlayingAnim(plyPed, "anim@heists@box_carry@", "idle", 3) then
								StopAnimTask(plyPed, "anim@heists@box_carry@", "idle", 4.0)
							end

							RequestAnimDict(repDict)
							RequestAnimDict("amb@medic@standing@tendtodead@exit")
							while not HasAnimDictLoaded(repDict) do
								Citizen.Wait(100)
							end

							while not HasAnimDictLoaded("amb@medic@standing@tendtodead@exit") do
								Citizen.Wait(100)
							end

							local animDuration = GetAnimDuration(repDict, repAnim)
							TaskPlayAnim(plyPed, repDict, repAnim, 8.0, -8.0, animDuration, 15, 1.0, 0, 0, 0)
							Citizen.Wait((animDuration / 2) * 1000)

							TriggerServerEvent("SlashTires:repair", GetEntityCoords(vehicle), GetEntityModel(vehicle), closestTire.tireIndex)
							tireChangeActive = false

							Citizen.Wait((animDuration / 2) * 1000)
--							ClearPedTasksImmediately(plyPed)

							TaskPlayAnim(plyPed, "amb@medic@standing@tendtodead@exit", "exit", 8.0, -8.0, -1, 15, 1.0, 0, 0, 0)
							Citizen.Wait(2000)

							ClearPedTasks(plyPed)
						end
					end
			end

			if IsControlJustPressed(0, 177) or IsControlJustPressed(0, 73) then -- BACKSPACE or X
				tireChangeActive = false
				if IsEntityPlayingAnim(plyPed, "anim@heists@box_carry@", "idle", 3) then
					StopAnimTask(plyPed, "anim@heists@box_carry@", "idle", 4.0)
				end
				if tireChangeProp ~= nil then
					DeleteObject(tireChangeProp)
				end
			end
		else
			if tireChangeProp ~= nil then
				if IsEntityPlayingAnim(plyPed, "anim@heists@box_carry@", "idle", 3) then
					StopAnimTask(plyPed, "anim@heists@box_carry@", "idle", 4.0)
				end
				DeleteObject(tireChangeProp)
				tireChangeProp = nil
			end
		end

		if tireChangeActive == false and vehicle ~= 0 then
			if CanUseWeapon(allowedWeapons) then
				local closestTire = GetClosestVehicleTire(vehicle)
				if closestTire ~= nil then

					if IsVehicleTyreBurst(vehicle, closestTire.tireIndex, 0) == false then
						Draw3DText(closestTire.bonePos.x, closestTire.bonePos.y, closestTire.bonePos.z, tostring("~r~[E] Проткнуть колесо"))
						if IsControlJustPressed(1, 38) then

							RequestAnimDict(animDict)
							while not HasAnimDictLoaded(animDict) do
								Citizen.Wait(100)
							end

							local animDuration = GetAnimDuration(animDict, animName)
							TaskPlayAnim(plyPed, animDict, animName, 8.0, -8.0, animDuration, 15, 1.0, 0, 0, 0)
							Citizen.Wait((animDuration / 2) * 1000)

							local driverOfVehicle = GetDriverOfVehicle(vehicle)
							local driverServer = GetPlayerServerId(driverOfVehicle)

							if driverServer == 0 then
								SetVehicleTyreBurst(vehicle, closestTire.tireIndex, 0, 100.0)
							else
								TriggerServerEvent("SlashTires:TargetClient", driverServer, closestTire.tireIndex)
							end

							TriggerServerEvent("SlashTires:slash", GetEntityCoords(vehicle), GetEntityModel(vehicle), closestTire.tireIndex)

							Citizen.Wait((animDuration / 2) * 1000)
							ClearPedTasksImmediately(plyPed)
						end
					end
				end
			end
		end
		Citizen.Wait(0)
	end
end)

RegisterNetEvent("SlashTires:slash")
AddEventHandler("SlashTires:slash", function(pos, model, tireIndex)
	local vehicle = GetClosestVehicle(pos.x,pos.y,pos.z, 1.0, model, 71)
	if vehicle > 0 then
		SetVehicleTyreBurst(vehicle, tireIndex, 0, 100.0)
	end
end)

RegisterNetEvent("SlashTires:repair")
AddEventHandler("SlashTires:repair", function(pos, model, tireIndex)
	local vehicle = GetClosestVehicle(pos.x,pos.y,pos.z, 1.0, model, 71)
	if vehicle > 0 then
		SetVehicleTyreFixed(vehicle, tireIndex)
	end
end)


RegisterNetEvent("SlashTires:activateTire")
AddEventHandler("SlashTires:activateTire", function()
	tireChangeActive = not tireChangeActive
end)

RegisterNetEvent("SlashTires:SlashClientTire")
AddEventHandler("SlashTires:SlashClientTire", function(tireIndex)
	TriggerEvent("chatMessage", "^1A вам прокалывают колесо")
	local player = PlayerId()
	local plyPed = GetPlayerPed(player)
	local vehicle = GetVehiclePedIsIn(plyPed, false)
	SetVehicleTyreBurst(vehicle, tireIndex, 0, 100.0)
end)

function GetDriverOfVehicle(vehicle)
	local dPed = GetPedInVehicleSeat(vehicle, -1)
	for a = 0, 32 do
		if dPed == GetPlayerPed(a) then
			return a
		end
	end
	return -1
end

function CanUseWeapon(allowedWeapons)
	local player = PlayerId()
	local plyPed = GetPlayerPed(player)
	local plyCurrentWeapon = GetSelectedPedWeapon(plyPed)
	for a = 1, #allowedWeapons do
		if GetHashKey(allowedWeapons[a]) == plyCurrentWeapon then
			return true
		end
	end
	return false
end

function GetClosestVehicleToPlayer()
	local player = PlayerId()
	local plyPed = GetPlayerPed(player)
	local plyPos = GetEntityCoords(plyPed, false)
	local plyOffset = GetOffsetFromEntityInWorldCoords(plyPed, 0.0, 1.0, 0.0)
	local radius = 3.0
	local rayHandle = StartShapeTestCapsule(plyPos.x, plyPos.y, plyPos.z, plyOffset.x, plyOffset.y, plyOffset.z, radius, 10, plyPed, 7)
	local _, _, _, _, vehicle = GetShapeTestResult(rayHandle)
	return vehicle
end

function GetClosestVehicleTire(vehicle)
	local tireBones = {"wheel_lf", "wheel_rf", "wheel_lm1", "wheel_rm1", "wheel_lm2", "wheel_rm2", "wheel_lm3", "wheel_rm3", "wheel_lr", "wheel_rr"}
	local tireIndex = {
		["wheel_lf"] = 0,
		["wheel_rf"] = 1,
		["wheel_lm1"] = 2,
		["wheel_rm1"] = 3,
		["wheel_lm2"] = 45,
		["wheel_rm2"] = 47,
		["wheel_lm3"] = 46,
		["wheel_rm3"] = 48,
		["wheel_lr"] = 4,
		["wheel_rr"] = 5,
	}
	local player = PlayerId()
	local plyPed = GetPlayerPed(player)
	local plyPos = GetEntityCoords(plyPed, false)
	local minDistance = 1.0
	local closestTire = nil
	for a = 1, #tireBones do
		local bonePos = GetWorldPositionOfEntityBone(vehicle, GetEntityBoneIndexByName(vehicle, tireBones[a]))
		local distance = Vdist(plyPos.x, plyPos.y, plyPos.z, bonePos.x, bonePos.y, bonePos.z)

		if closestTire == nil then
			if distance <= minDistance then
				closestTire = {bone = tireBones[a], boneDist = distance, bonePos = bonePos, tireIndex = tireIndex[tireBones[a]]}
			end
		else
			if distance < closestTire.boneDist then
				closestTire = {bone = tireBones[a], boneDist = distance, bonePos = bonePos, tireIndex = tireIndex[tireBones[a]]}
			end
		end
	end

	return closestTire
end

function Draw3DText(x, y, z, text)
    local onScreen,_x,_y=World3dToScreen2d(x,y,z)
    local px,py,pz=table.unpack(GetGameplayCamCoords())
    local dist = GetDistanceBetweenCoords(px,py,pz, x,y,z, 1)

    local scale = (1/dist)*2
    local fov = (1/GetGameplayCamFov())*100
    local scale = scale*fov

    if onScreen then
        SetTextScale(0.0*scale, 0.55*scale)
        SetTextFont(0)
        SetTextProportional(1)
        -- SetTextScale(0.0, 0.55)
        SetTextColour(255, 255, 255, 255)
        SetTextDropshadow(0, 0, 0, 0, 255)
        SetTextEdge(2, 0, 0, 0, 150)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry("STRING")
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(_x,_y)
    end
end
