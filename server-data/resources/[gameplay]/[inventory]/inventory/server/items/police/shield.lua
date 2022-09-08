ESX.Custom.Inventory.RegisterItemType('shield', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player['shield'] = {
			['label'] = 'Взять в руки',
			['priority'] = 3,
			['action'] = 'inventory:shield'
 	       }
        item.actions.player['shield_off'] = {
            ['label'] = 'Убрать',
            ['priority'] = 2,
            ['action'] = 'inventory:shield'
            }
		return item.actions
	end,
})

AddEventHandler('inventory:shield', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent('shield:enable', xPlayer.source, inventory, item)
end)

