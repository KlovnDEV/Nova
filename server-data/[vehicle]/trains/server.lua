ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function GetNearestPlayer(coords)
	local xPlayers = ESX.GetPlayers()
	local minDist = 99999
	local xTarget = nil

	for i=1, #xPlayers, 1 do
		local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
		local player = Player(xPlayer.source)

		local coordsArr = player.state.coords

		if coordsArr then
			local pos = vector3(coordsArr[1],coordsArr[2],coordsArr[3])
			local dist = #( coords - pos )
			if dist < minDist then
				minDist = dist
				xTarget = xPlayer
			end
		end
	end

	return xTarget, minDist
end

RegisterNetEvent("trains:trainSpawned")
AddEventHandler("trains:trainSpawned", function(branchId, trainId, netId)
	local branch = Config.Branches[branchId]
	local train = branch.Trains[trainId]
	train.Vehicle = NetworkGetEntityFromNetworkId(netId)
	train.NetId = netId
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)

        for k,branch in pairs(Config.Branches) do
            for j, train in pairs(branch.Trains) do
                if not DoesEntityExist(train.Vehicle) then
			if train.NetId then
				train.Vehicle = NetworkGetEntityFromNetworkId(netId)
				print('Entity lost', k, '/', j)

		                if not DoesEntityExist(train.Vehicle) then
					train.NetId = nil
					print('NetId lost', k, '/', j)
				end
			end

			local xPlayer, distance = GetNearestPlayer(train.SpawnPosition)
			if xPlayer and distance < 100 then
				print('Create train', k, '/', j, 'by player', xPlayer.source)
				TriggerClientEvent('trains:createTrain', xPlayer.source, k, j)
			end
                end
            end
        end
    end
end)
