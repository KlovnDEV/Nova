
ESX = nil
lockStatus = {}

function IsCar(vehicle)
    local vc = GetVehicleClass(vehicle)
    return (vc >= 0 and vc <= 7) or (vc >= 9 and vc <= 12) or (vc >= 17 and vc <= 20) or (vc == 8) -- 8 = bike
end

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

RegisterNetEvent('esx_locksystem:setLock')
AddEventHandler('esx_locksystem:setLock', function(plate, status)
	lockStatus[plate] = status
	TriggerServerEvent('esx_locksystem:setLock', plate, status)
end)

--[[
function MyClosestVehicle(x, y, z, radius)
	for i = 1,72 do
		local angle = (i * 5) * Math.PI / 180

		local sx = (50.0 * math.cos(angle)) + x
		local sy = (50.0 * math.sin(angle)) + y

		local ex = x - (sx - x)
		local ey = y - (sy - y)

		local rayHandle = StartShapeTestCapsule(sx, sy, z, ex, ey, z, radius, 10, PlayerPedId(), 1000)
		local ent = GetShapeTestResult(rayHandle, false)[4]

		return ent
	end
end
]]

-- Садимся в ближайшую дверь, если она открыта, а не на место водителя
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
	        if IsControlJustPressed(1, 23) then
			local coords = GetEntityCoords(PlayerPedId())
			local veh, dist = ESX.Game.GetClosestVehicle(coords)
--			local veh = MyClosestVehicle(coords.x, coords.y, coords.z, 3.0)

			if DoesEntityExist(veh) and dist < 5.0 then
				for i=1,GetNumberOfVehicleDoors(veh) do
					local doorCoord = GetEntryPositionOfDoor(veh, i)

					if #(doorCoord - coords) < 0.75 and not DoesEntityExist(GetPedInVehicleSeat(veh, i - 1)) and GetVehicleDoorLockStatus(veh) <= 2 then
						TaskEnterVehicle(PlayerPedId(), veh, 10000, i - 1, 1.0, 1, 0)
						break
					end
				end
			end
		end
	end
end)

RegisterNetEvent('esx_locksystem:sendLockStatuses')
AddEventHandler('esx_locksystem:sendLockStatuses', function(locks)
	lockStatus = locks
end)

RegisterNetEvent('esx_locksystem:sendLockStatus')
AddEventHandler('esx_locksystem:sendLockStatus', function(plate, status)
	lockStatus[plate] = status
end)

function carLock(vehicle, plate)
	local lockStatus = GetVehicleDoorLockStatus(vehicle)

        if lockStatus <= 2 then
            SetVehicleDoorsLocked(vehicle, 4)
            SetVehicleDoorsLockedForAllPlayers(vehicle, 1)
            TriggerEvent('esx:showNotification', "Транспорт закрыт")
            TriggerEvent('esx_locksystem:setLock', plate, true)
            TriggerServerEvent("InteractSound_SV:PlayWithinDistance", 10, "lock", 0.2)
        else
            SetVehicleDoorsLocked(vehicle, 1)
            SetVehicleDoorsLockedForAllPlayers(vehicle, false)
            TriggerEvent('esx:showNotification', "Транспорт открыт")
            TriggerEvent('esx_locksystem:setLock', plate, false)
            TriggerServerEvent("InteractSound_SV:PlayWithinDistance", 10, "unlock", 0.2)
        end
end

Citizen.CreateThread(function()
    while true do
        Wait(0)

        -- If the defined key is pressed
        if IsControlJustPressed(1, 303) then
		local ped = PlayerPedId()
		local pos = GetEntityCoords(PlayerPedId())
		local vehicle = 0

                if IsPedInAnyVehicle(ped, true) then
                -- by sitting inside
                    vehicle = GetVehiclePedIsIn(ped, false)
                else
                -- by targeting the vehicle
    	            vehicle = GetTargetedVehicle(pos, ped)
                end

		if vehicle == nil or vehicle < 1 then
			local vehs = ESX.Game.GetVehiclesInArea(pos, 1.1)
			if #vehs > 0 then
				vehicle = vehs[1]
			end
		end

		if vehicle ~= nil and vehicle > 0 and IsCar(vehicle) then
			local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))
                        local vc = GetVehicleClass(vehicle)

			ESX.TriggerServerCallback('esx_locksystem:haveKeys', function(res)
				if res == true then
                                        if vc ~= 8 then
						local dict = "anim@mp_player_intmenu@key_fob@"
						RequestAnimDict(dict)
						while not HasAnimDictLoaded(dict) do
						    Citizen.Wait(100)
						end
						TaskPlayAnim(GetPlayerPed(-1), dict, "fob_click_fp", 8.0, 8.0, -1, 48, 1, false, false, false)
					end
					carLock(vehicle, plate)
				else
			            TriggerEvent('esx:showNotification', "У вас нет ключей от этой машины")
				end
			end, plate)
		end
	end
    end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(100)
		local vehicle = GetClosestVehicle(GetEntityCoords(PlayerPedId()), 5.0, 0, 71)
		local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))
		if DoesEntityExist(vehicle) then
	                local lock = GetVehicleDoorLockStatus(vehicle)
			if GetVehicleDoorAngleRatio(vehicle, 0) > 0.01 and (lock == 4 or lock == 2) then
				SetVehicleDoorsLocked(vehicle, 1)
				SetVehicleDoorsLockedForAllPlayers(vehicle, false)
			end
		end
	end
end)

Citizen.CreateThread(function()
	local last_id = -1
	local last_plate = ""

	while true do
		Citizen.Wait(0)
		local ped = GetPlayerPed(-1)
		local vehicle = GetVehiclePedIsTryingToEnter(PlayerPedId())

	        if DoesEntityExist(vehicle) then
	                local lock = GetVehicleDoorLockStatus(vehicle)
	                local plate = ""

			if last_id == vehicle then
				plate = last_plate
			else
				plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))
			end

			-- Prevents the player from breaking the window if the vehicle is locked
		        if lock == 4 then
	                    ClearPedTasks(PlayerPedId())
		        end

--			print(plate.." "..tostring(lockStatus[plate]).." "..tostring(lock))

			if lockStatus[plate] ~= nil then
				if lock ~= 1 and lockStatus[plate] == false then
					SetVehicleDoorsLocked(vehicle, 1)
					SetVehicleDoorsLockedForAllPlayers(vehicle, false)
				elseif lock ~= 4 and lockStatus[plate] == true then
					SetVehicleDoorsLocked(vehicle, 4)
					SetVehicleDoorsLockedForAllPlayers(vehicle, 1)
				end
			end

			last_id = vehicle
			last_plate = plate
	        end
	end
end)

---- Get a vehicle in direction
-- @param array coordFrom
-- @param array coordTo
-- @return int
function GetVehicleInDirection(coordFrom, coordTo)
	local rayHandle = StartShapeTestCapsule(coordFrom.x, coordFrom.y, coordFrom.z, coordTo.x, coordTo.y, coordTo.z, 0.7, 10, GetPlayerPed(-1), 0)
	local a, b, c, d, vehicle = GetRaycastResult(rayHandle)
	return vehicle
end

---- Get the vehicle in front of the player
-- @param array pCoords
-- @param int ply
-- @return int
function GetTargetedVehicle(pCoords, ply)
        coordB = GetOffsetFromEntityInWorldCoords(ply, 0.0, 6.0, 0.0)
        targetedVehicle = GetVehicleInDirection(pCoords, coordB)
        if(targetedVehicle ~= nil and targetedVehicle ~= 0)then
            return targetedVehicle
        end
    return
end

RegisterNetEvent('InteractSound_CL:PlayWithinDistance')
AddEventHandler('InteractSound_CL:PlayWithinDistance', function(playerNetId, maxDistance, soundFile, soundVolume)
    local lCoords = GetEntityCoords(GetPlayerPed(-1))
    local eCoords = GetEntityCoords(GetPlayerPed(GetPlayerFromServerId(playerNetId)))
    local distIs  = #(lCoords - eCoords)--Vdist(lCoords.x, lCoords.y, lCoords.z, eCoords.x, eCoords.y, eCoords.z)
    if distIs <= maxDistance then
        SendNUIMessage({
            transactionType     = 'playSound',
            transactionFile     = soundFile,
            transactionVolume   = soundVolume
        })
    end
end)
