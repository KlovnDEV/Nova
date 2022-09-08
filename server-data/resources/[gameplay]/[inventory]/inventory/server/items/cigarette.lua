ESX.Custom.Inventory.RegisterItemType('cigarette', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.consume = {
			['label'] = 'Закурить',
			['priority'] = 3,
			['action'] = 'inventory:smoke'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:smoke', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'smoking')
	TriggerClientEvent('inventory:smoke', xPlayer.source, 30.0)
end)
