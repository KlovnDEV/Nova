RegisterServerEvent("eff_smokes")
AddEventHandler("eff_smokes", function(entity)
	TriggerClientEvent("c_eff_smokes", -1, entity)
end)

ESX.Custom.Inventory.RegisterItemType('vape', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.vape = {
			['label'] = 'Достать Вейп',
			['priority'] = 3,
			['action'] = 'inventory:vapeOn'
            }
        item.actions.player.vape2 = {
            ['label'] = 'Убрать Вейп',
            ['priority'] = 2,
            ['action'] = 'inventory:vapeOff'
            }
        return item.actions

	end,
})

AddEventHandler('inventory:vapeOn', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    TriggerClientEvent("Vape:StartVaping", xPlayer.source, item)
end)

AddEventHandler('inventory:vapeOff', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
    assert(item)
    TriggerClientEvent("Vape:StopVaping", xPlayer.source, item)
end)
