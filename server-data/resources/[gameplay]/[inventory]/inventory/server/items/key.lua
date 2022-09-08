ESX.Custom.Inventory.RegisterItemType('key', {

	init = function(item)
		item.extra = {}
		item.extra.access = "48GKI673"
		return item
	end,

	getDescription = function(item)
		return tostring(item.extra.access)
	end,

	getActions = function(item)

		if item.name == 'carkey' then
			item.actions.player.unlock = {
				['label'] = 'Отпереть',
				['priority'] = 3,
				['action'] = 'inventory:unlockCar'
	  	        }

			item.actions.player.lock = {
				['label'] = 'Запереть',
				['priority'] = 2,
				['action'] = 'inventory:lockCar'
	  	        }
		end

		return item.actions
	end,


	merge = function(xPlayer, inv1, item1, inv2, item2)
		return false
	end,
})

AddEventHandler('inventory:unlockCar', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	TriggerClientEvent("inventory:setCarLocked", xPlayer.source, item.extra.access, 1)
end)

AddEventHandler('inventory:lockCar', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	TriggerClientEvent("inventory:setCarLocked", xPlayer.source, item.extra.access, 2)
end)
