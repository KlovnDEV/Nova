ESX                = nil
lockStatus = {}

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('esx_locksystem:setLock')
AddEventHandler('esx_locksystem:setLock', function(plate, status)
--	local xPlayer = ESX.GetPlayerFromId(source)
	if status == true then
		lockStatus[plate] = true
	else
		lockStatus[plate] = false
	end

	TriggerClientEvent("esx_locksystem:sendLockStatus", -1, plate, lockStatus[plate])
	print("Plate "..plate.." lock changed "..tostring(lockStatus[plate]))
end)

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
	TriggerClientEvent("esx_locksystem:sendLockStatuses", xPlayer.source, lockStatus)
end)

function haveKeys(source, plate)
    local xPlayer = ESX.GetPlayerFromId(source)

    local carkey = exports["esx_inventory"]:createItem("carkey", { ["plate"] = plate }, 1)
    local k,v = exports["esx_inventory"]:findItem("pocket", xPlayer.identifier, carkey)
    if k ~= nil then
	return true
    end

    return false
end

ESX.RegisterServerCallback('esx_locksystem:haveKeys', function(source, cb, plate)
    cb(haveKeys(source, plate))
end)

RegisterServerEvent('InteractSound_SV:PlayWithinDistance')
AddEventHandler('InteractSound_SV:PlayWithinDistance', function(maxDistance, soundFile, soundVolume)
    TriggerClientEvent('InteractSound_CL:PlayWithinDistance', -1, source, maxDistance, soundFile, soundVolume)
end)
