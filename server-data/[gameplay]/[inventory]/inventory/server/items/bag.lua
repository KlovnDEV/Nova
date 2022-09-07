ESX.Custom.Inventory.RegisterItemType('bag', {

	init = function(item)
		local inv = AbstractCreateNestedInventory(item, {
			title = "Сумка",
			maxWeight = 30,
			width = 20,
			height = 20,
			actionGroup = 'player',
			hidden = true,
		})
		item.extra = { inventory = inv.identifier }

		return item
	end,

	getDescription = function(item)
		if item.number then
			return tostring(item.number)
		else
			return ''
		end
	end,

	getActions = function(item)
		return item.actions
	end,


	merge = function(xPlayer, inv1, item1, inv2, item2)
		return false
	end,

	onAdd = function(item, inv)
	end,
})
