ESX.Custom.Inventory.RegisterItemType('bodycam', {

	init = function(item)
		return item
	end,

	getDescription = function(item)
		if item.enabled then
			return 'Включен'
		end

		return 'Выключен'
	end,

	getActions = function(item)
		if item.enabled then
			item.actions.player['turn-off'] = {
					['label'] = 'Выключить',
					['priority'] = 2,
					['action'] = 'inventory:bodycamTurnOff'
			}
		else
			item.actions.player['turn-on'] = {
					['label'] = 'Включить',
					['priority'] = 2,
					['action'] = 'inventory:bodycamTurnOn'
			}
		end

		return item.actions
	end,

	merge = function(xPlayer, inv1, item1, inv2, item2)
		return false
	end,
})

AddEventHandler('inventory:bodycamTurnOff', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	item.enabled = false
	ESX.Custom.Inventory.UpdateItem(inventory, item)
end)

AddEventHandler('inventory:bodycamTurnOn', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	item.enabled = true
	ESX.Custom.Inventory.UpdateItem(inventory, item)
end)
