RegisterServerEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inv)
    if inv.category ~= 'player-inventory' then
        return
    end

    local xPlayer = ESX.GetPlayerFromIdentifier(inv.identifier)

    if xPlayer == nil then
        return
    end

    local inv = ESX.Custom.Inventory.Get(inv.category, inv.identifier)

    local handr_area = inv.areas['hand_r']
    local handl_area = inv.areas['hand_l']

    local item = ESX.Custom.Inventory.SearchFirst(inv, { x = handr_area.x, y = handr_area.y })

    if item and item.category ~= 'weapon' then
        TriggerClientEvent('inventory:setHandProp', xPlayer.source, 'hand_r', item.prop)-- or 'prop_money_bag_01'
    else
        TriggerClientEvent('inventory:setHandProp', xPlayer.source, 'hand_r', nil)
    end

    item = ESX.Custom.Inventory.SearchFirst(inv, { x = handl_area.x, y = handl_area.y })

    if item and item.category ~= 'weapon' then
        TriggerClientEvent('inventory:setHandProp', xPlayer.source, 'hand_l', item.prop)--  or 'prop_money_bag_01'
    else
        TriggerClientEvent('inventory:setHandProp', xPlayer.source, 'hand_l', nil)
    end

end)
