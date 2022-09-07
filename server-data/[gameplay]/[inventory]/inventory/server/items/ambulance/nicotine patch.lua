ESX.Custom.Inventory.RegisterItemType('nicotinepatch', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Приклеить',
			['priority'] = 3,
			['action'] = 'inventory:nicotinePatch'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:nicotinePatch', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'patch')
end)
