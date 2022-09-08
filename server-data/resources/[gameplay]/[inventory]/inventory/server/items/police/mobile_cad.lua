ESX.Custom.Inventory.RegisterItemType('mobile_cad', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player['mobile_cad'] = {
			['label'] = 'Достать полицейский планшет',
			['priority'] = 3,
			['action'] = 'inventory:mobile_cad'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:mobile_cad', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent('dpemotes:emote', xPlayer.source, "mobile_cad")
end)
