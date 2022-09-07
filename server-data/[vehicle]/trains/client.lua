ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)


function CreateTrain(variation, pos, dir)	

	if not IsNavmeshLoadedInArea(pos-vector3(10,10,10), pos+vector3(10,10,10)) then
		return nil
	end

	local veh = CreateMissionTrain(variation, pos, dir)

	SetEntityIconColor(veh, 0, 255, 0, 255)
	SetEntityDrawOutline(veh, true)
	SetEntityAsMissionEntity(veh, true, true)
	SetEntityProofs(veh, true, true, true, true, true, false, false, false)
	SetVehicleExplodesOnHighExplosionDamage(veh, false)
	SetEntityInvincible(veh, true)

	AddBlipForEntity(veh)
	--SetBlipAsFriendly(veh)
--       	SetVehicleDoorsLocked(veh, 2)

--	Citizen.Wait(10000)
--	RemoveNavmeshRequiredRegions()

	return veh
end

function CreateTrainPed(veh)
	local ped = CreatePedInsideVehicle(veh, 26, GetHashKey("s_m_m_trucker_01"), -1, true, true)
	SetEntityInvincible(ped, true)
	SetPedConfigFlag(ped, 116, true)
	SetPedConfigFlag(ped, 29, true)
	SetBlockingOfNonTemporaryEvents(ped, true)
	SetPedKeepTask(ped, true)

	return ped
end

function DoorsControl(veh, speed, angle)
	for k = 0, GetNumberOfVehicleDoors(veh) do
		SetVehicleDoorControl(veh, k, speed, angle)
	end
end

function DoorsOpen(veh)
	for k = 0, GetNumberOfVehicleDoors(veh) do
--		SetVehicleDoorOpen(veh, k, false, false)
		SetVehicleDoorBroken(veh, k, true)
	end
end

function DoorsShut(veh)
	SetVehicleFixed(veh)
	for k = 0, GetNumberOfVehicleDoors(veh) do
		SetVehicleDoorShut(veh, k, false, false)
	end
end

function TrainDoorsControl(veh, vehSpeed)
	if vehSpeed < 1.0 then
--		DoorsControl(veh, k, 5, 1.0)
		DoorsOpen(veh)
	else
--		DoorsControl(veh, k, 5, 0.0)
		DoorsShut(veh)
	end
end

function main()
	-- SetMissionFlag(true)
	-- if HasForceCleanupOccurred(3) then
	-- 	terminate()
	-- end

	SetRandomTrains(false)
	DeleteAllTrains()

	if not IsPedInjured(PlayerPedId()) then
--		SetEntityCoords(PlayerPedId(), 626.68, 6442.31, 30.88) --, true, false, false, true)
--		SetEntityHeading(PlayerPedId(), -177.0)
--		SetGameplayCamRelativeHeading(0.0)
	end

	local models = { "freight", "freightcar", "freightgrain", "freightcont1", "freightcont2", "tankercar", "metrotrain" }

	RequestModel(GetHashKey("s_m_m_trucker_01"))
	while not HasModelLoaded(GetHashKey("s_m_m_trucker_01")) do
		Citizen.Wait(0)
	end

	for k,v in pairs(models) do
		RequestModel(GetHashKey(v))
	end

	for k,v in pairs(models) do
		while not HasModelLoaded(GetHashKey(v)) do
			Citizen.Wait(0)
		end
	end
--[[
    for k,branch in pairs(Config.Branches) do
        for j, train in pairs(branch.Trains) do

            -- if DoesEntityExist(train.Vehicle) then
            --     DeleteMissionTrain(train.Vehicle)
            -- end


	    if train.Vehicle == nil then
                train.Vehicle = CreateTrain(train.Variation, train.SpawnPosition, train.Direction)
                train.Ped = CreateTrainPed(train.Vehicle)
            end


            -- train.LastActiveNode = findNextBranchNode(branch, GetTrainCurrentTrackNode(train.Vehicle ))
            -- train.NextActiveNode = train.LastActiveNode

            -- Citizen.Wait(100)
--				SetEntityCoords(playerPed, TrainPos)
--				SetPedIntoVehicle(playerPed, TrainVeh, 0)


            print(train.Vehicle, train.Ped)
        end
    end
]]--
	while true do
		Citizen.Wait(0)
			local playerPed = PlayerPedId()

            for k,branch in pairs(Config.Branches) do
                for j, train in pairs(branch.Trains) do

                    -- if DoesEntityExist(train.Vehicle) then
                    --     DeleteMissionTrain(train.Vehicle)
                    -- end

    --				SetEntityCoords(playerPed, TrainPos)
    --				SetPedIntoVehicle(playerPed, TrainVeh, 0)

                    TrainDoorsControl(train.Vehicle, train.Speed)
                    for i = 1,12 do
                        local car = GetTrainCarriage(train.Vehicle, i)
                        if DoesEntityExist(car) then
                            TrainDoorsControl(car, train.Speed)
                        else
                            break
                        end
                    end

                end
            end


-- 			if RecreateTrain then
-- 				if DoesEntityExist(TrainVeh) then
-- 					DeleteMissionTrain(TrainVeh)
-- 				end

-- 				if DoesEntityExist(TrainPed) then
-- 					DeleteEntity(TrainPed)
-- 				end

-- 				TrainVeh = CreateTrain(TrainVariation, TrainPos, TrainDir)

-- 				Citizen.Wait(100)
-- --				SetEntityCoords(playerPed, TrainPos)
-- --				SetPedIntoVehicle(playerPed, TrainVeh, 0)

-- 				TrainPed = CreateTrainPed(TrainVeh)
-- 				print(TrainVeh, TrainPed)

-- 				RecreateTrain = false
-- 			end

			-- if UpdateTrainPos then
			-- 	TrainPos = GetFinalRenderedCamCoord()
			-- 	UpdateTrainPos = false
			-- end


			-- if TerminateScript then
			-- 	terminate()
			-- end

		Citizen.Wait(0)
	end
end

function terminate()
	Citizen.Wait(1000)
	SetRandomTrains(true)
	TerminateThisThread()
end

Citizen.CreateThread(function()
	main()
end)

-- function updateTrainDistances(k, j)
--     local branch = Config.Branches[k]
--     local train = branch.Trains[j]

--     if train.Distances == nil then
--         train.Distances = {}
--     end

--     for j2, anotherTrain in pairs(branch.Trains) do

--         if j2 > j then
--             local dist = math.abs(anotherTrain.LastNode - train.LastNode)

--             if dist > branch.MaxNode / 2 then
--                 dist = branch.MaxNode - dist
--             end

--             train.Distances[j2] = dist
--         end

--     end
-- end

-- function getMinTrainDistance(k, j)
--     local branch = Config.Branches[k]
--     local train = branch.Trains[j]

--     local minDist = 99999

--     for k, v in pairs(train.Distances) do
--         if v < minDist then
--             minDist = v
--         end
--     end

--     return minDist

-- end

-- function findNextBranchNode(branch, currentNode)
--     print('findNextBranchNode', currentNode)
--     for k, node in pairs(branch.Nodes) do
--         print(k)
--         if k > currentNode then
--             return k
--         end
--     end

--     return branch.Nodes[1]
-- end

-- function findTrainInNode(branch, node)
--     for k, train in pairs(branch.Trains) do
--         if train.LastActiveNode == node then
--             return k
--         end
--     end

--     return nil
-- end

Citizen.CreateThread(function()
while true do
	Citizen.Wait(0)

	for k,branch in pairs(Config.Branches) do
		for j, train in pairs(branch.Trains) do

            if DoesEntityExist(train.Vehicle) then
                local veh = train.Vehicle
                local trackNode = GetTrainCurrentTrackNode(veh)

                if trackNode ~= train.LastNode then
                    train.LastNode = trackNode
                    if branch.Nodes[trackNode] then
                        if branch.Nodes[trackNode].wait then
                            train.DesiredSpeed = 0.0
                            Citizen.Wait(branch.Nodes[trackNode].wait)
                        end

                        if branch.Nodes[trackNode].speed then
                            train.DesiredSpeed = branch.Nodes[trackNode].speed
                        end

                        -- train.LastActiveNode = trackNode
                        -- train.NextActiveNode = findNextBranchNode(branch, trackNode)
                    end


                end

                -- updateTrainDistances(k,j)
                -- local dist = getMinTrainDistance(k,j)
                -- train.DistanceToTrains = dist
                -- print(j, trackNode, train.DesiredSpeed, dist)

            end
		end
	end

end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

        for k,branch in pairs(Config.Branches) do
            for j, train in pairs(branch.Trains) do
                if DoesEntityExist(train.Vehicle) then
                    if train.DesiredSpeed > train.Speed then
                        train.Speed = train.Speed * 0.995 + train.DesiredSpeed * 0.005
                    else
                        train.Speed = train.Speed * 0.99 + train.DesiredSpeed * 0.01
                    end

                    -- if train.Speed < 1.0 and train.DistanceToTrains < 50.0 then
                        -- train.Speed = 0
                    -- end


                    if train.DistanceToTrains and train.DistanceToTrains < 100.0 then
                        train.Speed = math.min(train.Speed, 5.0)
                    end

                    --print(j, train.Speed)

                    SetTrainSpeed(train.Vehicle, train.Speed)
                    SetTrainCruiseSpeed(train.Vehicle, train.Speed)
                end
            end
        end
    end
end)

-- Citizen.CreateThread(function()
-- while true do
-- 	Citizen.Wait(1000)
-- 	local veh = GetVehiclePedIsIn(PlayerPedId(), false)
-- 	local inTrain = veh == TrainVeh

-- 	for i = 1,12 do
-- 		local car = GetTrainCarriage(TrainVeh, i)
-- 		if DoesEntityExist(car) then
-- 			if veh == car then
-- 				inTrain = true
-- 				break
-- 			end
-- 		else
-- 			break
-- 		end
-- 	end

-- 	if inTrain then
-- 		print('In Train')
-- 		TaskSetBlockingOfNonTemporaryEvents(PlayerPedId(), true)
-- 	end

-- 	print(GetEntityCoords(TrainVeh))
-- end
-- end)



RegisterNetEvent("trains:createTrain")
AddEventHandler("trains:createTrain", function(branchId, trainId)

	local branch = Config.Branches[branchId]
	local train = branch.Trains[trainId]

	if train.Vehicle == nil then
		train.Vehicle = CreateTrain(train.Variation, train.SpawnPosition, train.Direction)
		train.Ped = CreateTrainPed(train.Vehicle)
        end

	Citizen.Wait(100)

	if DoesEntityExist(train.Vehicle) then		
		TriggerServerEvent("trains:trainSpawned", branchId, trainId, VehToNet(train.Vehicle))
	end

end)
