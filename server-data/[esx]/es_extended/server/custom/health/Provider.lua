ESX.Health = {}

ESX.Health.Revive = function(playerid, coords, heading)
	TriggerClientEvent('esx:revive', playerid, coords, heading)
end

RegisterNetEvent('esx:revive')
AddEventHandler('esx:revive', function(target, coords, heading)
    local xPlayer = ESX.GetPlayerFromId(source)
    local xTarget = ESX.GetPlayerFromId(target)

    ESX.Health.Revive(xTarget.source, coords, heading)
end)
