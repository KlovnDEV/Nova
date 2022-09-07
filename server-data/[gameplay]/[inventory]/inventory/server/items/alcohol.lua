ESX.Custom.Inventory.RegisterItemType('alcohol', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Выпить',
			['priority'] = 3,
			['action'] = 'inventory:consumeAlcohol'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:consumeAlcohol', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'drink')
end)
