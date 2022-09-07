ESX.Custom.Inventory.RegisterItemType('binoculars', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player['binoculars'] = {
			['label'] = 'Посмотреть в бинокль',
			['priority'] = 3,
			['action'] = 'inventory:binoculars'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:binoculars', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent("binoculars:Activate", xPlayer.source, item)
end)

