ESX.Custom.Inventory.RegisterItemType('handcuffs', {

	init = function(item)
		return item
	end,
	getActions = function(item)

			item.actions.player['apply-handcuffs'] = {
				['label'] = 'Заковать',
				['priority'] = 3,
				['action'] = 'inventory:applyHandcuffs'
				}
			item.actions.player['apply-Unhandcuffs'] = {
				['label'] = 'Отпустить',
				['priority'] = 2,
				['action'] = 'inventory:applyUnhandcuff'
				}
		return item.actions
	end,
})

AddEventHandler('inventory:applyHandcuffs', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent('inventory:handcuff', xPlayer.source, inventory, item)

end)

AddEventHandler('inventory:applyUnhandcuff', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent('inventory:Unhandcuff', xPlayer.source, inventory, item)
end)

RegisterServerEvent('inventory:handcuffPlayer')
AddEventHandler('inventory:handcuffPlayer', function(target)
	local player = Player(target)
	player.state.isHandcuffed = true

    TriggerClientEvent('handcuffs:cuffTarget', target, source)
	TriggerClientEvent('handcuffs:cuffCop', source)
end)

RegisterServerEvent('inventory:unhandcuffPlayer')
AddEventHandler('inventory:unhandcuffPlayer', function(target)
	local player = Player(target)
	player.state.isHandcuffed = false
end)
