ESX.Custom.Inventory.RegisterItemType('cane', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.cane = {
			['label'] = 'Опереться на трость',
			['priority'] = 3,
			['action'] = 'inventory:caneOn'
            }
        -- item.actions.player.cane = {
        --     ['label'] = 'Убрать трость',
        --     ['priority'] = 3,
        --     ['action'] = 'inventory:caneOff'
        --     }
        return item.actions

	end,
})

AddEventHandler('inventory:caneOn', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    TriggerClientEvent('Cane:emote', xPlayer.source, item)
    TriggerClientEvent('dpemotes:emote', xPlayer.source, "Trost")
end)

-- AddEventHandler('inventory:caneOff', function(xPlayer, inventory, item)
-- 	assert(xPlayer)
-- 	assert(inventory)
--     assert(item)
--     TriggerClientEvent('Cane:emote', xPlayer.source, item)
--     TriggerClientEvent('dpemotes:emote', xPlayer.source, "Trost")
-- end)

-- TODO Закреплять трость, чтобы она не сбрасывалась на "Х", пока не уберешь её.
