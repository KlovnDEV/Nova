ESX.Custom.Inventory.RegisterItemType('sedative', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Принять',
			['priority'] = 3,
			['action'] = 'inventory:sedative'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:sedative', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    if item.extra and item.extra.ef then
        TriggerClientEvent('drugs:effect', xPlayer.source, item.extra.ef)
    end
    TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'sedative')
end)
