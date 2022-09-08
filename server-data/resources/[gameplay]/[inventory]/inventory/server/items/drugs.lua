ESX.Custom.Inventory.RegisterItemType('drugs', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.drugs = {
			['label'] = 'Принять',
			['priority'] = 3,
			['action'] = 'inventory:drug'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:drug', function(xPlayer, inventory, item)
    assert(xPlayer)
    assert(inventory)
    assert(item)
    if item.extra and item.extra.ef then
        TriggerClientEvent('drugs:effect', xPlayer.source, item.extra.ef)
    end
    TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'drugs')
end)
