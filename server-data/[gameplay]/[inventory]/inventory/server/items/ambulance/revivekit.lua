ESX.Custom.Inventory.RegisterItemType('revivekit', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.revive = {
			['label'] = 'Оказать первую помощь',
			['priority'] = 3,
			['action'] = 'inventory:revive'
 	       }
        item.actions.player.kit = {
            ['label'] = 'Взять в руку',
            ['priority'] = 2,
            ['action'] = 'inventory:getKit'
            }
        return item.actions
	end,
})

AddEventHandler('inventory:revive', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerClientEvent('inventory:applyRevivekit', xPlayer.source)
end)

AddEventHandler('inventory:getKit', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    TriggerClientEvent('dpemotes:emote', xPlayer.source, "revivekit")
end)
