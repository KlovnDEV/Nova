ESX.Custom.Inventory.RegisterItemType('tire', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.use = {
			['label'] = 'Использовать',
			['priority'] = 3,
			['action'] = 'inventory:activateTire'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:activateTire', function(xPlayer, inventory, item)
	TriggerClientEvent('slashtires:activateTire', xPlayer.source)
end)
