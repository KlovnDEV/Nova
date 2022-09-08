ESX.Custom.Inventory.RegisterItemType('medkit', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Обработать раны',
			['priority'] = 3,
			['action'] = 'inventory:heal'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:heal', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)

    if (ESX.Custom.Inventory.RemoveItem(inventory, item, 1, false)) then
        TriggerClientEvent('esx:heal', xPlayer.source, 25)
        TriggerClientEvent('dpemotes:emote', xPlayer.source, "uncuff")
    end
end)
