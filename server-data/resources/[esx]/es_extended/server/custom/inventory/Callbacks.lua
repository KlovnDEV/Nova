ESX.RegisterServerCallback('inventory:checkWeight', function(source, cb, obj)
    assert(obj)
    assert(cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    assert(xPlayer)

    local inv = ESX.Custom.Inventory.Get(obj.inventoryCategory, xPlayer.identifier)
    local inv_weight = ESX.Custom.Inventory.GetWeight(inv)

    local new_item = ESX.Custom.Inventory.Item.Create(obj.itemName, obj.itemQty)
    if not new_item then
        cb(nil)
        return
    end

    local weightToAdd = (new_item.weight or 0) * obj.itemQty
    cb((inv_weight + weightToAdd) <= inv.maxWeight)
end)
