ESX.RegisterCommand('removecash', 'admin', function(xPlayer, args, showError, showInfo)
    local inv = ESX.Custom.Inventory.Create("player-inventory", args.playerId.identifier, false)
    if ESX.Custom.Inventory.Cash.Remove(inv, args.count) then
        showInfo('Success.')
    else
        showError('Fail.')
    end

end, true, {help = 'Remove cash', validate = true, arguments = {
	{name = 'playerId', help = _U('commandgeneric_playerid'), type = 'player'},
	{name = 'count', help = _U('command_giveitem_count'), type = 'number'}
}})

ESX.RegisterCommand('giveitem', 'admin', function(xPlayer, args, showError, showInfo)

    local inv = ESX.Custom.Inventory.Create("player-inventory", args.playerId.identifier, false)
    local item = ESX.Custom.Inventory.Item.Create(args.item, 1, {})

    if not item then
        showError('Incorrect item name: '..tostring(args.item))
        return
    end

    local amount = math.min(item.maxstack, args.count)

    if amount < 1 then
        showError('Incorrect item amount.')
        return
    end

    if ESX.Custom.Inventory.AddItem(inv, item, amount) then
        showInfo('Success.')
    else
        showError('Fail.')
    end

end, true, {help = _U('command_giveitem'), validate = true, arguments = {
	{name = 'playerId', help = _U('commandgeneric_playerid'), type = 'player'},
	{name = 'item', help = _U('command_giveitem_item'), type = 'string'},
	{name = 'count', help = _U('command_giveitem_count'), type = 'number'}
}})


ESX.RegisterCommand('givekey', 'admin', function(xPlayer, args, showError)
    local keytype = args.keytype
    local access = args.access

    if keytype ~= 'door' and keytype ~= 'car' then
        xPlayer.showNotification('~r~Неправильный тип ключа: '..tostring(keytype)..'~s~')
        return
    end

    local inv = ESX.Custom.Inventory.Create("player-inventory", xPlayer.identifier, false)
    local item = ESX.Custom.Inventory.Item.Create(keytype..'key', 1, {})

    if not item then
        xPlayer.showNotification('~r~Невозможно создать ключ!~s~')
        return
    end

    item.extra = { ["access"] = access }
    item = ESX.Custom.Inventory.Item.Update(item)

    if ESX.Custom.Inventory.AddItem(inv, item, 1) then
        xPlayer.showNotification('~g~Успех.~s~')
    else
        xPlayer.showNotification('~r~Провал.~s~')
    end

end, true, {help = 'Добавить ключ в инвентарь', validate = true, arguments = {
	{name = 'keytype', help = 'car или door', type = 'string'},
	{name = 'access', help = 'ИД двери или авто', type = 'string'},
}})
