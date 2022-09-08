ESX.Custom.Inventory.RegisterItemType('antitox', {

	init = function(item)
		return item
	end,
-- TODO: Вкалывать таргету а не себе
	getActions = function(item)
		item.actions.player.inject = {
			['label'] = 'Вколоть препарат',
			['priority'] = 3,
			['action'] = 'inventory:inject'
 	       }
		return item.actions
	end,
})

AddEventHandler('inventory:inject', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    if item.extra and item.extra.ef then
        TriggerClientEvent('drugs:effect', xPlayer.source, item.extra.ef)
    end
	TriggerEvent('inventory:actionConsume', xPlayer, inventory, item, 'antitox')
end)
