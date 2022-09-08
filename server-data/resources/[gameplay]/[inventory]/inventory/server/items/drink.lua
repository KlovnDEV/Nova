ESX.Custom.Inventory.RegisterItemType('drink', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Выпить',
			['priority'] = 3,
			['action'] = 'inventory:consumeDrink'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:consumeDrink', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'drink')
end)
