ESX.Custom.Inventory.RegisterItemType('food', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Съесть',
			['priority'] = 3,
			['action'] = 'inventory:consumeFood'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:consumeFood', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'eat')
end)
