ESX.Custom.Inventory.RegisterItemType('alcotester', {

	init = function(item)
		return item
	end,
-- TODO: Проверять у таргета уровень
	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Провести тест',
			['priority'] = 3,
			['action'] = 'inventory:alcotestStart'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:alcotestStart', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
    TriggerClientEvent('inventory:alcotest', xPlayer.source)
    TriggerClientEvent('dpemotes:emote', xPlayer.source, "uncuff")
end)

RegisterServerEvent('inventory:alcotest')
AddEventHandler('inventory:alcotest', function(target)
	local xPlayer = ESX.GetPlayerFromId(source)

	if ESX.Roles.HasRole('police') or ESX.Roles.HasRole('ambulance') then
		TriggerEvent('esx_status:getStatus', target, 'drunk', function(status)
	                if status.val < 1 then
				TriggerClientEvent('esx:showNotification', xPlayer.source, "Степень опьянения: не выявлено")
			elseif status.val < 250000 then
				TriggerClientEvent('esx:showNotification', xPlayer.source, "Степень опьянения: ~g~лёгкое")
			elseif status.val < 500000 then
				TriggerClientEvent('esx:showNotification', xPlayer.source, "Степень опьянения: ~y~умеренное")
			elseif status.val < 750000 then
				TriggerClientEvent('esx:showNotification', xPlayer.source, "Степень опьянения: ~r~тяжёлое")
			else
				TriggerClientEvent('esx:showNotification', xPlayer.source, "Степень опьянения: ~r~крайне тяжёлое")
			end
		end)
	else
	end
end)
