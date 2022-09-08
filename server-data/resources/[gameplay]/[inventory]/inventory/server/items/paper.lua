ESX.Custom.Inventory.RegisterItemType('paper', {

	init = function(item)
		return item
	end,

	getDescription = function(item)
		if item.paperTitle then
			return tostring(item.paperTitle)
		end

		return ''
	end,

	getActions = function(item)

		if item.textid then
			item.actions.player['paper-view'] = {
				['label'] = 'Просмотреть',
				['priority'] = 3,
				['action'] = 'inventory:viewPaper'
		        }
		else
			item.actions.player['paper-edit'] = {
				['label'] = 'Написать',
				['priority'] = 2,
				['action'] = 'inventory:editPaper'
			}
		end

		return item.actions
	end,
})

AddEventHandler('inventory:editPaper', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	TriggerClientEvent('paper:edit', xPlayer.source, item)
end)

AddEventHandler('inventory:viewPaper', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	TriggerClientEvent('paper:view', xPlayer.source, item)
end)
