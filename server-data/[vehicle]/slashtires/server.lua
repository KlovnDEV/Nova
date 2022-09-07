local ESX = nil

TriggerEvent("esx:getSharedObject", function(obj)
    ESX = obj
end)

RegisterServerEvent("SlashTires:TargetClient")
AddEventHandler("SlashTires:TargetClient", function(client, tireIndex)
	TriggerClientEvent("SlashTires:SlashClientTire", client, tireIndex)
end)

RegisterServerEvent("SlashTires:slash")
AddEventHandler("SlashTires:slash", function(pos, model, tireIndex)
	TriggerClientEvent("SlashTires:slash", -1, pos, model, tireIndex)
end)

RegisterServerEvent("SlashTires:repair")
AddEventHandler("SlashTires:repair", function(pos, model, tireIndex)
	local xPlayer = ESX.GetPlayerFromId(source)

        local item = xPlayer.getInventoryItem('tire')
        if item ~= nil and item.count > 0 then
		xPlayer.removeInventoryItem('tire', 1)
		TriggerClientEvent("SlashTires:repair", -1, pos, model, tireIndex)
	end
end)

ESX.RegisterUsableItem('tire', function(source)
	TriggerClientEvent("SlashTires:activateTire", source)
--	local xPlayer = ESX.GetPlayerFromId(source)
end)
