ESX.Custom.Inventory.RegisterItemType('anim', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.anim = {
			['label'] = 'Достать',
			['priority'] = 3,
			['action'] = 'inventory:hold'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:hold', function(xPlayer, inventory, item)
    assert(xPlayer)
    assert(inventory)
    assert(item)

    if item.extra and item.extra.animation then
        TriggerClientEvent('dpemotes:emote', xPlayer.source, item.extra.animation)
    end
end)

