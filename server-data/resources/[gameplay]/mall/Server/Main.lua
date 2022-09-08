----------------------------------
-- Created 17.03.202 by Fellini --
--      fellinirp@gmail.com     --
-- DeJavu Roleplay Server 1.0.0 --
----------------------------------
ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('mall:getItemsList', function(source, cb)
    local items = {}

    MySQL.Async.fetchAll('SELECT DISTINCT item_name, item_label FROM mall',
                         {}, function(result)
        for _, val in ipairs(result) do
            table.insert(items, {key = val.item_name, value = val.item_label})
        end

        cb(items)
    end)
end)

ESX.RegisterServerCallback('mall:getSelectedItems', function(source, cb, searchItem)
    local items = {}

    MySQL.Async.fetchAll(
        'SELECT * FROM mall WHERE item_name = @searchItem',
        {['@searchItem'] = searchItem}, function(result)
            for _, value in ipairs(result) do
                table.insert(items, {
                    id = value.id,
                    identifier = value.identifier,
                    sellerName = value.player_name,
                    itemType = value.item_type,
                    itemName = value.item_name,
                    itemLabel = value.item_label,
                    itemExtra = value.item_extra,
                    itemQty = value.item_qty,
                    itemPrice = value.item_price
                })
            end

            cb(items)
        end)
end)

ESX.RegisterServerCallback('mall:getPlayerItems', function(source, cb)

    local xPlayer = ESX.GetPlayerFromId(source)
    local data = {}
    local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)

    for _, item in pairs(inv.items) do

        table.insert(data, {
            key = item.name,
            value = item.label,
            count = item.amount,
            extra = json.encode(item),
            type = 'item'
        })

    end

    cb(data)
end)

ESX.RegisterServerCallback('mall:checkMoney', function(source, cb, amount)
    local xPlayer = ESX.GetPlayerFromId(source)
    local result = 'error'

    if xPlayer.getAccount('bank').money > amount then result = 'success' end

    cb(result)
end)

RegisterServerEvent('mall:placeItem')
AddEventHandler('mall:placeItem', function(data)
    local xPlayer = ESX.GetPlayerFromId(source)

    -- get player data
    local result = MySQL.Sync.fetchAll("SELECT firstname, lastname FROM user_identity WHERE identifier = @identifier",{['@identifier'] = xPlayer.identifier})
    local player = result[1]

    MySQL.Async.execute(
        'INSERT INTO mall (identifier, player_name, item_type, item_name, item_extra, item_label, item_qty, item_price) VALUES (@identifier, @player_name, @item_type, @item_name, @item_extra, @item_label, @item_qty, @item_price)',
        {
            ['@identifier'] = xPlayer.identifier,
            ['@player_name'] = player.firstname .. ' ' .. player.lastname,
            ['@item_type'] = data.type,
            ['@item_name'] = data.value,
            ['@item_extra'] = data.extra,
            ['@item_label'] = data.label,
            ['@item_qty'] = data.qty,
            ['@item_price'] = data.price
        })

    if data.type == 'ammo' then
        local weaponName = string.gsub(data.value, '_ammo', '')
        -- remove ammo @todo fix later

        if xPlayer.hasWeapon(weaponName) then
            local _, weaponObject = ESX.GetWeapon(weaponName)
            if weaponObject.ammo then
                xPlayer.removeWeaponAmmo(weaponName, data.qty)
            end
        end
    elseif data.type == 'weapon' then
        -- remove weapon
        xPlayer.removeWeapon(data.value)
    elseif data.type == 'item' then
        -- remove item
        local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)

        ESX.Custom.Inventory.RemoveItem(inv, { name = data.value }, tonumber(data.qty), false)

        --xPlayer.removeInventoryItem(data.value, data.qty)
    end
end)

RegisterServerEvent('mall:buyItem')
AddEventHandler('mall:buyItem', function(data, sum)
    local xPlayer = ESX.GetPlayerFromId(source)
    local targetPlayer = ESX.GetPlayerFromIdentifier(data.identifier)

    -- check if update or remove
    local rest = data.itemQty - data.selectedQty

    if rest > 0 then
        -- update
        MySQL.Sync.execute('UPDATE mall SET item_qty = @qty WHERE id = @id', {['@qty'] = rest, ['@id'] = data.itemId})
    else
        -- remove
        MySQL.Sync.execute('DELETE FROM mall WHERE id = @id', {['@id'] = data.itemId})
    end

    -- remove money by xPlayer
    xPlayer.removeAccountMoney('bank', sum)
    xPlayer.showNotification(_U('notify_player_bought_items', data.selectedQty, data.itemLabel, sum))


    -- add items to xPlayer

    local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier) --взять иневентарь

    if inv then
		item = ESX.Custom.Inventory.Item.Create(data.itemName, 1, json.decode(data.itemExtra) )

        if item and ESX.Custom.Inventory.AddItem(inv, item, data.selectedQty, true, true) then
			xPlayer.showNotification('Предмет добавлен')
		else
			xPlayer.showNotification('Невозможно добавить предмет '..tostring(ItemInfo.name))
		end
	end

  --  if data.itemType == 'item' then
  --      xPlayer.addInventoryItem(data.itemName, data.selectedQty)
  --  elseif data.itemType == 'weapon' then
  --      xPlayer.addWeapon(data.itemName, 0)
  --  end

    -- add money to targetPlayer
    if targetPlayer ~= nil then
        targetPlayer.addAccountMoney('bank', sum)
        targetPlayer.showNotification(_U('notify_target_sold_items',  data.selectedQty, data.itemLabel))
    else
        local tmpAccount = {}
        local accounts = {}

        MySQL.Async.fetchAll(
            'SELECT accounts FROM users WHERE identifier = @identifier',
            {['@identifier'] = data.identifier}, function(result)
                for k, v in ipairs(result) do
                    tmpAccount = json.decode(v.accounts)
                end

                for key, val in pairs(tmpAccount) do
                    if key == 'bank' then
                        accounts['bank'] = val + sum
                    else
                        accounts[key] = val
                    end
                end

                MySQL.Sync.execute(
                    'UPDATE users SET accounts = @accounts WHERE identifier = @identifier',
                    {
                        ['@accounts'] = json.encode(accounts),
                        ['@identifier'] = data.identifier
                    })
            end)
    end
end)
