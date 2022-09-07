local Keys = {
	["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57,
	["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177,
	["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
	["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
	["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
	["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70,
	["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
	["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
	["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

ESX = nil

local sitting = false
local lastPos = nil
local currentSitObj = nil
local currentScenario = nil

local debugProps = {}

function drawBoxMarker(base_coord, radius)
	local c2 = vector3(radius,radius,radius) + base_coord
	local c1 = vector3(-radius,-radius,-radius) + base_coord
	DrawBox(c1, c2, 255, 0, blue, 0.5)
end

function calcBoxMarker(base_coord, rx,ry,rz)
	local c2 = vector3(rx,ry,rz) + base_coord
	local c1 = -vector3(rx,ry,rz) + base_coord
	return c1,c2
end

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

function DrawText3D(x,y,z, text, r,v,b)
    local onScreen,_x,_y = World3dToScreen2d(x,y,z)
    local px,py,pz = table.unpack(GetGameplayCamCoords())
    local dist = GetDistanceBetweenCoords(px,py,pz, x,y,z, 1)

    local scale = (1/dist)*2
    local fov = (1/GetGameplayCamFov())*100
    local scale = scale*fov

    if onScreen then
        SetTextScale(0.0*scale, 1.1*scale)
        SetTextFont(0)
        SetTextProportional(1)
        SetTextColour(r, v, b, 255)
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

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if #debugProps > 0 then
			for i=1, #debugProps, 1 do
				local coords = GetEntityCoords(debugProps[i])
				local hash = GetEntityModel(debugProps[i])
				local id = coords.x .. coords.y .. coords.z
				local model = "unknown"

				for i=1, #Config.Interactables, 1 do
					local seat = Config.Interactables[i]
					if hash == GetHashKey(seat) then
						model = seat
						break
					end
				end

				local txt = "ID: " .. id .. "\nHASH: " .. hash .. '\nMODEL: ' ..
				DrawText3D(coords.x, coords.y, coords.z + 2.0, txt, 0, 255, 255)
			end
		end

		local playerPed = GetPlayerPed(-1)
		local playerCoords = GetEntityCoords(playerPed)

		if sitting and not IsPedUsingScenario(playerPed, currentScenario) then
			wakeup()
		end

		if (GetLastInputMethod(2) and IsControlJustPressed(1, 20) and IsControlPressed(1, 21)) and not IsPedInAnyVehicle(playerPed, true) then

			if sitting then
				wakeup()
			else
				local object, distance = ESX.Game.GetClosestObject(playerCoords, Config.Interactables)

				if Config.debug then
					table.insert(debugProps, object)
				end

				if distance < 1.5 and distance >= 0 then

					local hash = GetEntityModel(object)
					local data = nil
					local modelName = nil
					local found = false

					for k,v in pairs(Config.Sitable) do
						if GetHashKey(k) == hash then
							data = v
							modelName = k
							found = true
							break
						end
					end

					if found == true then
						sit(object, modelName, data)
					end

				else
					sitInPlace()
				end

			end
			Citizen.Wait(100)

		end

	end
end)

function wakeup()
	ClearPedTasks(playerPed)
	sitting = false
	SetEntityCoords(playerPed, lastPos)
	FreezeEntityPosition(playerPed, false)

	if currentSitObj ~= nil then
		FreezeEntityPosition(currentSitObj, false)
		TriggerServerEvent('esx_interact:leavePlace', currentSitObj)
	end

	currentSitObj = nil
	currentScenario = nil
end

function sit(object, modelName, data)

	local pos = GetEntityCoords(object)
	local id = pos.x .. pos.y .. pos.z

	ESX.TriggerServerCallback('esx_interact:getPlace', function(occupied)

		if occupied then
			ESX.ShowNotification("Cette place est prise...")
		else
			local playerPed = GetPlayerPed(-1)
			lastPos = GetEntityCoords(playerPed)
			currentSitObj = id

			TriggerServerEvent('esx_interact:takePlace', id)
			FreezeEntityPosition(object, true)

			currentScenario = data.scenario

			TaskStartScenarioAtPosition(playerPed, currentScenario, pos.x, pos.y, pos.z - data.verticalOffset, GetEntityHeading(object)+180.0, 0, true, true)

			sitting = true

		end

	end)

end

function startAnim(lib, anim, flag)
	flag = flag or 0
	ESX.Streaming.RequestAnimDict(lib, function()
		TaskPlayAnim(PlayerPedId(), lib, anim, 8.0, -8.0, -1, flag, 0, false, false, false)
	end)
end


function worldCollisionTest(point1, point2, radius, ignore)
--[[
	for i=0,10 do
		DrawBox(point1+vector3(-radius,-radius,0), point2+vector3(radius,radius,0), 255, 0, 0, 0.5)
		Citizen.Wait(0)
	end
]]--
	local handle = StartShapeTestCapsule(point1.x, point1.y, point1.z, point2.x, point2.y, point2.z, radius, 17, ignore, 7)
	return GetShapeTestResult(handle)
end

function sitAttachLedge()
	local playerPed = GetPlayerPed(-1)
	local playerPos = GetEntityCoords(playerPed)
	local heading = GetEntityHeading(playerPed)
	local forward = GetEntityForwardVector(playerPed)

	currentScenario = "PROP_HUMAN_SEAT_LEDGE"
	currentSitObj = nil

	local timer1 = GetGameTimer()
	local boneIndex = GetPedBoneIndex(playerPed, 0) --pelvis 0x2E28, root 0
	local pelvisCoords = GetPedBoneCoords(playerPed, boneIndex, 0, 0, 0)
	local obj = CreateObjectNoOffset(GetHashKey("prop_a4_pile_01"), pelvisCoords.x,  pelvisCoords.y,  pelvisCoords.z, true, false, false)
	SetEntityVisible(obj, false)

	if obj ~= 0 then
		local x,y,z = table.unpack(GetEntityCoords(playerPed))
		local rot = GetEntityRotation(playerPed)

--		SetGameplayCoordHint(x,y,z+1.0, 0, 1000, 1000, 0)

		local offset = vector3(0,0,0)

		local z_change = 0

		startAnim('amb@world_human_seat_wall@male@hands_by_sides@enter','enter_low_left', 2)
		SetEntityRotation(obj, rot)
		AttachEntityToEntity(playerPed, obj, boneIndex, 0, 0, 0, 0,0,0, 0, false, false, true, 0, true)
		sitting = true
		while GetGameTimer()-timer1 < 1500 do
			local delta = GetGameTimer()-timer1
			local pelvisCoords2 = GetPedBoneCoords(playerPed, boneIndex, 0, 0, 0)
			local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(pelvisCoords2+vector3(0,0,0.02),pelvisCoords2-vector3(0,0,0.02), 0.1, playerPed)
			if (hit ~= 0) then
				z_change = z_change + delta*0.00001
			else
				z_change = z_change - delta*0.00001
			end

			local forward = GetEntityForwardVector(playerPed)
			offset = vector3(0,0,z_change-delta*0.0005) - forward * delta *0.0000
			local nc = pelvisCoords + offset

--			DrawBox(c1, c2, 255, 0, 0, 0.5)

			SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)

			Citizen.Wait(0)
		end

		startAnim('amb@world_human_seat_wall@male@hands_by_sides@base','base', 1)
		Citizen.Wait(0)

		while IsEntityPlayingAnim(playerPed, 'amb@world_human_seat_wall@male@hands_by_sides@base','base', 3) do
			local nc = pelvisCoords + offset
			SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)
			Citizen.Wait(0)
		end

		startAnim('amb@world_human_seat_wall@male@hands_by_sides@exit','back_to_wall', 0)
		Citizen.Wait(0)

		timer1 = GetGameTimer()
		local offset2 = vector3(0,0,0)
		while IsEntityPlayingAnim(playerPed, 'amb@world_human_seat_wall@male@hands_by_sides@exit','back_to_wall', 3) do
			local delta = GetGameTimer()-timer1

			offset2 = vector3(0,0,0)
--			local forward = GetEntityForwardVector(playerPed)
			if delta > 2800 then
				offset2 = vector3(0,0,-(delta-2800)*0.00095)-- - forward * delta *0.0002
			end

			local nc = pelvisCoords + offset - offset2

			SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)
			Citizen.Wait(0)
		end
		local nc = pelvisCoords
		SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)

		DetachEntity(playerPed)
		DeleteObject(obj)
	end
end


function sitAttachBench()
	local playerPed = GetPlayerPed(-1)
	local playerPos = GetEntityCoords(playerPed)
	local heading = GetEntityHeading(playerPed)
	local forward = GetEntityForwardVector(playerPed)

	local playerData = ESX.GetPlayerData()
	local identity = playerData.identity

	local libEnter = 'amb@prop_human_seat_chair@male@generic@enter'
	local animEnter = 'enter_forward'
	local libBase = 'amb@prop_human_seat_chair@male@generic@base'
	local animBase = 'base'
	local libExit = 'amb@prop_human_seat_chair@male@generic@exit'
	local animExit = 'exit_forward'
	local upForce = -0.0001
	local fForce = 0.0003

	if playerData ~= nil and identity ~=nil and identity.sex == "f" then
		libEnter = 'amb@prop_human_seat_chair@female@legs_crossed@enter'
		animEnter = 'enter_fwd'
		libBase = 'amb@prop_human_seat_chair@female@legs_crossed@base'
		animBase = 'base'
		libExit = 'amb@prop_human_seat_chair@female@legs_crossed@exit'
		animExit = 'exit_fwd'
		upForce = 0.0001
		fForce = 0.00015
	end

	local behind_pos = lastPos - forward*0.5
	local p1 = behind_pos+vector3(0,0,0.0)
	local p2 = behind_pos+vector3(0,0,-0.65)

	local rayHandle = CastRayPointToPoint(p1,p2, 511, GetPlayerPed(-1), 0)
	local numRayHandle, hit1, endCoords, surfaceNormal, entityHit = GetShapeTestResult(rayHandle)

	if not hit1 or #(endCoords) == 0 then
		return
	end

	currentScenario = "PROP_HUMAN_SEAT_BENCH"
	currentSitObj = nil

	local timer1 = GetGameTimer()
	local boneIndex = GetPedBoneIndex(playerPed, 0) --pelvis 0x2E28, root 0
	local pelvisCoords = GetPedBoneCoords(playerPed, boneIndex, 0, 0, 0)
	local obj = CreateObjectNoOffset(GetHashKey("prop_a4_pile_01"), pelvisCoords.x,  pelvisCoords.y,  pelvisCoords.z, true, false, false)
	SetEntityVisible(obj, false)

	if obj ~= 0 then
		local x,y,z = table.unpack(GetEntityCoords(playerPed))
		local rot = GetEntityRotation(playerPed)

--		SetGameplayCoordHint(x,y,z+1.0, 0, 1000, 1000, 0)

		local offset = vector3(0,0,0)

		local z_change = 0

		startAnim(libEnter, animEnter, 2)

		SetEntityRotation(obj, rot)
		AttachEntityToEntity(playerPed, obj, boneIndex, 0, 0, 0, 0,0,0, 0, false, false, true, 0, true)
		sitting = true
		while GetGameTimer()-timer1 < 1500 do
			local delta = GetGameTimer()-timer1
			local pelvisCoords2 = GetPedBoneCoords(playerPed, boneIndex, 0, 0, 0)
--[[
			local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(pelvisCoords2+vector3(0,0,0.02),pelvisCoords2-vector3(0,0,0.02), 0.1, playerPed)
			if (hit ~= 0) then
				z_change = z_change + delta*0.00001
			else
				z_change = z_change - delta*0.00001
			end
]]--
			local forward = GetEntityForwardVector(playerPed)
			offset = vector3(0,0,z_change+delta*upForce) - forward * delta *fForce
			local nc = pelvisCoords + offset

--			DrawBox(c1, c2, 255, 0, 0, 0.5)
--			drawBoxMarker(pelvisCoords2, 0.1)
--			drawBoxMarker(nc, 0.1)

			SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)

			Citizen.Wait(0)
		end

		startAnim(libBase, animBase, 1)
		Citizen.Wait(0)

		while IsEntityPlayingAnim(playerPed, libBase, animBase, 3) do
			DisableControlAction(0, 73, true)
			local nc = endCoords --pelvisCoords + offset
			SetEntityCoordsNoOffset(obj, nc, 0, 0, 0)

			if IsDisabledControlJustPressed(0,73) then
				break
			end
			Citizen.Wait(0)
		end

		DisableControlAction(0, 73, true)
		startAnim(libExit, animExit, 0)
		Citizen.Wait(0)

		timer1 = GetGameTimer()
		local offset2 = vector3(0,0,0)
		while IsEntityPlayingAnim(playerPed, libExit, animExit, 3) do
			DisableControlAction(0, 73, true)
			local delta = GetGameTimer()-timer1

			local forward = GetEntityForwardVector(playerPed)
			offset2 = vector3(0,0,-delta*0.0002) - forward * delta *0.0003

			local nc = endCoords - offset2

			SetEntityCoordsNoOffset(obj, nc.x,nc.y,nc.z, 0, 0, 0)
			Citizen.Wait(0)
		end

		SetEntityCoordsNoOffset(obj, pelvisCoords, 0, 0, 0)
		DetachEntity(playerPed)
		DeleteObject(obj)
	end
end

function sitInPlace(rec)
	local playerPed = GetPlayerPed(-1)

	if IsPedSwimming(playerPed) or IsEntityInAir(playerPed) or IsEntityDead(playerPed) or IsEntityAttached(playerPed) then
		return
	end

	lastPos = GetEntityCoords(playerPed)
	local heading = GetEntityHeading(playerPed)

	local forward = GetEntityForwardVector(playerPed)
	local behind_pos = lastPos - forward*0.35
	local forward_pos = lastPos + forward*0.45

	local flags = 1

	Citizen.Wait(20)

	local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(behind_pos+vector3(0,0,-0.7),behind_pos+vector3(0,0,-0.5), 0.1, playerPed)
	local sit_point = hit ~= 0

	Citizen.Wait(20)

	local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(behind_pos+vector3(0,0,0.0),behind_pos+vector3(0,0,0.4), 0.1, playerPed)
	local stand_point = hit ~= 0

	Citizen.Wait(20)

	local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(forward_pos+vector3(0,0,-1.6),forward_pos+vector3(0,0,-0.6), 0.1, playerPed)
	local ledge_point = hit ~= 0

	Citizen.Wait(20)

	local numRayHandle, hit, endCoords, surfaceNormal, entityHit = worldCollisionTest(forward_pos+vector3(0,0,0.0),forward_pos+vector3(0,0,0.4), 0.1, playerPed)
	local forward_point = hit ~= 0

	Citizen.Wait(20)

	if stand_point == true then
		TaskStartScenarioInPlace(playerPed, "WORLD_HUMAN_LEANING", 0, true)
	elseif ledge_point == false then
		sitAttachLedge()
	elseif sit_point == true then
		sitAttachBench()
	elseif forward_point and rec ~= 1 then
		SetEntityHeading(playerPed, heading+180)
		sitInPlace(1)
	end

end
