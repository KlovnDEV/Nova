ESX.Custom.Inventory = {}
ESX.Custom.Inventory.ItemMap = {}

ESX.Inventories = {}

ESX.Custom.Inventory.GetInventoryByItemId = function(id)
    return ESX.Custom.Inventory.ItemMap[id]
end

function GetItemExtra(item)
    local extra = ESX.Custom.Inventory.Item.Duplicate(item)
    extra.actions = nil
    extra.uid = item.uid
    return extra
end

function DBUpdateInventoryItem(inv, item)
    assert(inv)
    assert(item)
    assert(item.uid)

    local extra = GetItemExtra(item)

    local res = exports['db'].post(0, 'inventoryitem/update', json.encode({
        ["id"] = item.uid,
        ["inventory_id"] = inv.id,
        ["x"] = item.x or 0,
        ["y"] = item.y or 0,
        ["amount"] = item.amount,
        ["extra"] = json.encode(extra),
    }))

    if res[1] ~= 200 then
        ESX.Error("Unable to update item!", debug.traceback())
        ESX.Error(json.encode(res))
        return false
    end

    return true
end

function DBUpdateInventoryItemPos(inv, item, pos)
    assert(inv)
    assert(item)
    assert(item.uid)
    assert(pos)

    local res = exports['db'].post(0, 'inventoryitem/updatepos', json.encode({
        ["id"] = item.uid,
        ["x"] = pos.x or 0,
        ["y"] = pos.y or 0,
    }))

    if res[1] ~= 200 then
        ESX.Error("Unable to update item pos!", debug.traceback())
        ESX.Error(json.encode(res))
        return false
    end

    return true
end

ESX.Custom.Inventory.Update = function(inventory)
    assert(inventory)
    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)
    if not inv then
        return false
    end

    inv.collision = ESX.Custom.Inventory.Collision.Get(inv)
    inv.weight = ESX.Custom.Inventory.GetWeight(inv)
    inv.cash = ESX.Custom.Inventory.Cash.Update(inv)
    inv.keys = ESX.Custom.Inventory.Keys.Update(inv)

    if inv.category == 'player-inventory' then
        local xPlayer = ESX.GetPlayerFromIdentifier(inv.identifier)
        if xPlayer then
            local player = Player(xPlayer.source)
            player.state['money:cash'] = inv.cash
        end
    end

    local nested_invs = ESX.Custom.Inventory.GetNested(inventory.category, inventory.identifier)

    if inv.nested then
        for category,categoryInvs in pairs(inv.nested) do
            for identifier,_ in pairs(categoryInvs) do
                local ninv = ESX.Custom.Inventory.Get(category, identifier)
                if ninv then
                    ninv.parent = nil
                end
            end
        end
    end

    inv.nested = {}

    for k,nestedInv in pairs(nested_invs) do
        if not inv.nested then inv.nested = {} end
        if not inv.nested[nestedInv.category] then inv.nested[nestedInv.category] = {} end
        inv.nested[nestedInv.category][nestedInv.identifier] = true
        nestedInv.parent = { ["category"] = inventory.category, ["identifier"] = inventory.identifier }
    end

    if inv.parent then
        local parentinv = ESX.Custom.Inventory.Get(inv.parent.category, inv.parent.identifier)
        if parentinv then
            ESX.Custom.Inventory.Update(parentinv)
        end
    end

    exports['db'].post(0, 'inventory/update', json.encode({
        ["category"] = inv.category,
        ["identifier"] = inv.identifier,
        ["current_weight"] = inv.weight,
        ["max_weight"] = inv.maxWeight,
    }))

    TriggerClientEvent('inventory:updateInventory', -1, inv)
    TriggerEvent('inventory:onInventoryUpdate', inv)

    return true
end

ESX.Custom.Inventory.LoadFromDB = function(category, identifier, extra)
    res = exports['db'].post(0, 'inventory/get', json.encode({
        ["category"] = category,
        ["identifier"] = identifier,
    }))

    if res[1] ~= 200 then
        return nil
    end

    local invs = json.decode(res[2])
    if #invs == 0 then
        return nil
    end

    local inv = invs[1]

    local items = {}

    res = exports['db'].post(0, 'inventoryitem/getlist', json.encode({
	    ["inventory_id"] = inv.id,
    }))

    -- load inventory items
    if res[1] == 200 then
        for _,v in pairs(json.decode(res[2])) do
            items[v.id] = json.decode(v.extra)
            items[v.id].uid = v.id
            items[v.id].amount = v.amount
            items[v.id].template_id = v.item_id
            items[v.id] = ESX.Custom.Inventory.Item.Update(items[v.id])
        end
    end

    ESX.Inventories[category][identifier] = {
        ["id"] = inv.id,
        ["category"] = category,
        ["identifier"] = identifier,
    	["title"] = inv.title or "",
        ["maxWeight"] = inv.max_weight or 100.0,
        ["weight"] = inv.current_weight or 0.0,
        ["width"] = inv.width or 1,
        ["height"] = inv.height or 1,
        ["singleItem"] = (inv.single_item > 0) or false,
        ["actionGroup"] = inv.action_group or "default",
        ["items"] = items,
        ["areas"] = json.decode(inv.areas) or {},
    }

    for k,v in pairs(extra or {}) do
        ESX.Inventories[category][identifier][k] = v
    end

    for k,item in pairs(items) do
        local itemType = ESX.Custom.Inventory.ItemTypes[item.category]
        if itemType and itemType.onAdd then
            itemType.onAdd(item, ESX.Inventories[category][identifier])
        end

        ESX.Custom.Inventory.ItemMap[item.uid] = ESX.Inventories[category][identifier]
    end

    ESX.Custom.Inventory.Update(ESX.Inventories[category][identifier])

    return ESX.Inventories[category][identifier]
end

ESX.Custom.Inventory.Get = function(category, identifier)
    assert(category)
    assert(identifier)

    if not ESX.Inventories[category] then
        ESX.Inventories[category] = {}
    end

    if ESX.Inventories[category][identifier] then
        return ESX.Inventories[category][identifier]
    end

    return ESX.Custom.Inventory.LoadFromDB(category, identifier)
end

ESX.Custom.Inventory.GetNested = function(category, identifier)
        local res = {}
	local inv = ESX.Custom.Inventory.Get(category, identifier)
	assert(inv)

        if inv.category == "player-inventory" then
            for k, item in pairs(inv.items) do
                if item.extra and type(item.extra) == "table" and item.extra.inventory then
                    local item_inv = ESX.Custom.Inventory.Get("item-" .. item.name, item.extra.inventory)

                    if item_inv then
                        res[item_inv.id] = item_inv
                    end
                end
            end
        end

	return res
end

ESX.Custom.Inventory.Create = function(category, identifier, replace, extra)
    assert(category)
    assert(identifier)

    if not extra then
        extra = {}
    end

    if not replace then
	    local prevInventory = ESX.Custom.Inventory.Get(category, identifier)
	    if prevInventory then
		if extra.areas then
			prevInventory.areas = extra.areas
			ESX.Custom.Inventory.Update(prevInventory)
		end

		return prevInventory
	    end
    end

    if not ESX.Inventories[category] then
        ESX.Inventories[category] = {}
    end

    res = exports['db'].put(0, 'inventory/create', json.encode({
        ["category"] = category,
        ["identifier"] = identifier,
    	["title"] = extra.title or "",
        ["current_weight"] = 0.0,
        ["max_weight"] = extra.maxWeight or 100.0,
        ["width"] = extra.width or 0,
        ["height"] = extra.height or 0,
        ["single_item"] = extra.singleItem or false,
        ["action_group"] = extra.actionGroup or "default",
    	["areas"] = json.encode(extra.areas) or "{}",
    }))

    if res[1] ~= 200 then
        ESX.Error(string.format('Unable to create inventory %s/%s', category, identifier));
        ESX.Error(json.encode(res[2]))
        return nil
    end

    return ESX.Custom.Inventory.Get(category, identifier)
end

function tableContains(t1,t2)
	if type(t1) == 'number' and type(t2) == 'number' then
		if math.abs(t1-t2) < 1e-7 then
			return true
		end
	end

	if type(t1) ~= 'table' or type(t2) ~= 'table' then
		return t1 == t2
	end

	for k,v in pairs(t2) do
		if not tableContains(t1[k], t2[k]) then
			return false
		end
	end

	return true
end


ESX.Custom.Inventory._IsQueryFit = function(item, query)
    for k,v in pairs(query) do
        if k == 'amount' then
            if item[k] < v then return false end
        elseif k == 'actions' then
            -- do nothing
        elseif type(item[k]) == 'table' and type(v) == 'table' then
            if not tableContains(item[k], v) then
                return false
            end
        elseif item[k] ~= v then
            return false
        end
    end

    return true
end

ESX.Custom.Inventory.Search = function(inventory, query)
    assert(inventory)
    assert(query)

    local res_items = {}

    for uid, item in pairs(inventory.items) do
        if ESX.Custom.Inventory._IsQueryFit(item, query) then
            res_items[uid] = item
        end
    end

    return res_items
end

ESX.Custom.Inventory.SearchWithNested = function(inventory, query)
    assert(inventory)
    assert(query)

    if not inventory then
        ESX.Error('Inventory not defined!', debug.traceback())
    end

    local res_items = ESX.Custom.Inventory.Search(inventory, query)

    local nested_invs = ESX.Custom.Inventory.GetNested(inventory.category, inventory.identifier)
    for k,ninv in pairs(nested_invs) do
        local items = ESX.Custom.Inventory.Search(ninv, query)
        for a,b in pairs(items) do
            res_items[a] = b
        end
    end

    return res_items
end

ESX.Custom.Inventory.SearchFirst = function(inventory, query)
    assert(inventory)
    assert(query)

    if not inventory then
        ESX.Error('Inventory not defined!', debug.traceback())
    end

    for _, item in pairs(inventory.items) do
        if ESX.Custom.Inventory._IsQueryFit(item, query) then
            return item
        end
    end

    return nil
end

ESX.Custom.Inventory.SetItemPos = function(inventory, itemUid, pos)
    assert(inventory)
    assert(itemUid)
    assert(pos)

    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)

    if not inv then
        return false, "Inventory not found"
    end

    if not inv.items then
        return false, "Inventory items not found"
    end

    local item = inv.items[itemUid]

    if not item then
        return false, string.format("Item with uid '%d' not found", itemUid)
    end

    item.x = pos.x
    item.y = pos.y
    ESX.Custom.Inventory.UpdateItem(inv, item)
    return true
end

ESX.Custom.Inventory.AddItem = function(inventory, item, amount, silent, autoStack)
    assert(inventory)
    assert(item)
    assert(amount)

    if amount < 0 then
        return nil
    end

    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)

    if not inv or not inv.items then
        return nil
    end

    if inv.maxWeight and inv.weight + amount*(item.weight or 0) > inv.maxWeight then
        return nil
    end

    local olditem =  nil
    if item.uid then
        olditem = inv.items[item.uid]
    end

    if autoStack and not olditem then
        olditem = ESX.Custom.Inventory.SearchFirst(inventory, { name = item.name, extra = item.extra })
    end

    if olditem then
        inv.items[olditem.uid].amount = inv.items[olditem.uid].amount + amount
        DBUpdateInventoryItem(inv, inv.items[olditem.uid])
    else
        item.amount = amount

        local extra = GetItemExtra(item)

        item.width = item.width or 1
        item.height = item.height or 1

        if item.x == nil or item.y == nil or #ESX.Custom.Inventory.Collision.ItemsInArea(inv, item.x, item.y, item.width, item.height) > 0 then
            item.x, item.y = ESX.Custom.Inventory.Collision.FindFittingArea(inv, item)

            if item.x == nil or item.y == nil then
                -- инвентарь переполнен
                return nil
            end
        end

        local res = exports['db'].put(0, 'inventoryitem/create', json.encode({
            ["item_id"] = item.template_id,
            ["inventory_id"] = inv.id,
            ["x"] = item.x or 0,
            ["y"] = item.y or 0,
            ["amount"] = item.amount,
            ["extra"] = json.encode(extra),
        }))

        if res[1] ~= 200 then
            ESX.Error("Unable to add item! "..tostring(json.encode(res)), debug.traceback())
            return nil
        end

        local itemResponse = json.decode(res[2])
        if itemResponse then
            item.uid = itemResponse.id
            ESX.Custom.Inventory.ItemMap[item.uid] = inv
            local itemType = ESX.Custom.Inventory.ItemTypes[item.category]
            if itemType and itemType.onAdd then
                itemType.onAdd(item, inv)
            end
	else
		ESX.Error('Incorrect item response: '..tostring(res[2]), debug.traceback())
        end

        assert(item.uid)

        inv.items[item.uid] = item
    end

    ESX.Custom.Inventory.Update(inv)
    TriggerClientEvent('inventory:onItemAdd', -1, inv, item, amount, silent or false)
    return item
end

ESX.Custom.Inventory.RemoveItem = function(inventory, query, amount, silent)
    assert(inventory)
    assert(query)
    assert(amount == nil or amount > 0)

    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)
    local item = ESX.Custom.Inventory.SearchFirst(inv, query)

    if not inv or not inv.items or not item or not item.uid or not inv.items[item.uid] then
        return false
    end

    if amount > 0 and item.amount > amount then
        item.amount = item.amount - amount
        DBUpdateInventoryItem(inv, item)

    elseif not amount or (amount and item.amount == amount) then

        res = exports['db'].post(0, 'inventoryitem/delete', json.encode({
            ["inventory_id"] = inv.id,
            ["id"] = item.uid,
        }))

        ESX.Custom.Inventory.ItemMap[item.uid] = nil
        inv.items[item.uid] = nil
    else
        return false
    end

    ESX.Custom.Inventory.Update(inv)
    TriggerClientEvent('inventory:onItemRemove', -1, inv, item, amount, silent or false)
    return true
end

ESX.Custom.Inventory.TransferItem = function(query, amount, inv1, inv2, silent, position)
    assert(query)
    assert(amount == nil or amount > 0)
    assert(inv1)
    assert(inv2)

    inv1 = ESX.Custom.Inventory.Get(inv1.category, inv1.identifier)
    inv2 = ESX.Custom.Inventory.Get(inv2.category, inv2.identifier)
    assert(inv1)
    assert(inv2)
    local item = ESX.Custom.Inventory.SearchFirst(inv1, query)

    if amount == nil then amount = 1 end

    if not item or not item.uid or not inv1.items[item.uid] then
        return false
    end

    -- перевес
    if inv2.maxWeight and inv2.weight + amount*(item.weight or 0) > inv2.maxWeight then
        return false
    end

    -- избавляемся от самопоглощающихся сумок
    if item.extra and type(item.extra) == "table" and item.extra.inventory then
        local nestedInv = ESX.Custom.Inventory.Get('item-'..item.category, item.extra.inventory)
	if nestedInv.id == inv2.id then
		return false
	end
    end

    if not position or position.x == nil or position.y == nil then
        itemx, itemy = ESX.Custom.Inventory.Collision.FindFittingArea(inv2, item)

        if itemx == nil or itemy == nil then
            -- инвентарь переполнен
            return false
        end

        item.x = itemx
        item.y = itemy
    else
        item.x = position.x
        item.y = position.y
    end

    inv1.items[item.uid] = nil
    inv2.items[item.uid] = item

    ESX.Custom.Inventory.ItemMap[item.uid] = inv2

    ESX.Custom.Inventory.UpdateItem(inv2, item)
    ESX.Custom.Inventory.Update(inv1)

    parentBagInv = inv2.parent

    if parentBagInv then
        parentBagInv = ESX.Custom.Inventory.Get(parentBagInv.category, parentBagInv.identifier)
	local parentBagItem = ESX.Custom.Inventory.SearchFirst(parentBagInv, { extra = { inventory = inv2.identifier } })

        if parentBagItem then
            parentBagItem.weight = 0.5 + inv2.weight
            ESX.Custom.Inventory.UpdateItem(parentBagInv, parentBagItem)
        end
    end

    parentBagInv = inv1.parent --ESX.Custom.Inventory.ItemMap[inv1.identifier]

    if parentBagInv then
        parentBagInv = ESX.Custom.Inventory.Get(parentBagInv.category, parentBagInv.identifier)
	local parentBagItem = ESX.Custom.Inventory.SearchFirst(parentBagInv, { extra = { inventory = inv1.identifier } })

        if parentBagItem then
            parentBagItem.weight = 0.5 + inv1.weight
            ESX.Custom.Inventory.UpdateItem(parentBagInv, parentBagItem)
        end
    end

    TriggerClientEvent('inventory:onItemRemove', -1, inv1, item, amount, silent or false)
    TriggerClientEvent('inventory:onItemAdd', -1, inv2, item, amount, silent or false)

    return true
--[[
    local newitem = ESX.Custom.Inventory.Item.Duplicate(item)

    if ESX.Custom.Inventory.AddItem(inv2, newitem, amount, silent) then
        if not ESX.Custom.Inventory.RemoveItem(inv1, item, amount, silent) then
            ESX.Custom.Inventory.RemoveItem(inv2, newitem, amount, silent)
            return nil
        else
            return newitem
        end
    end
    ]]
end

ESX.Custom.Inventory.UpdateItem = function(inventory, item)
    assert(inventory)
    assert(item)

    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)
    assert(inv)

    if not inv.items or not item or not inv.items[item.uid] then
        return false
    end

    item = ESX.Custom.Inventory.Item.Update(item)
    inv.items[item.uid] = item
    DBUpdateInventoryItem(inv, item)

    ESX.Custom.Inventory.Update(inv)
    TriggerClientEvent('inventory:onItemUpdate', -1, inventory, item, silent or false)
    return true
end

ESX.Custom.Inventory.MergeItems = function(xPlayer, inventory1, item1, inventory2, item2)
    assert(xPlayer)
    assert(inventory1)
    assert(item1)
    assert(inventory2)
    assert(item2)

    local inv1 = ESX.Custom.Inventory.Get(inventory1.category, inventory1.identifier)
    local inv2 = ESX.Custom.Inventory.Get(inventory2.category, inventory2.identifier)
    assert(inv1)
    assert(inv2)

    local itemType = ESX.Custom.Inventory.ItemTypes[item1.category]
    if itemType and itemType.merge then
        return itemType.merge(xPlayer, inv1, item1, inv2, item2)
    else
        return ESX.Custom.Inventory.ItemTypes['custom'].merge(xPlayer, inv1, item1, inv2, item2)
    end

    return false
end

ESX.RegisterServerCallback('inventory:getInventory', function(source, cb, category, identifier)
    cb(ESX.Custom.Inventory.Get(category, identifier))
end)

ESX.Custom.Inventory.RunItemAction = function(xPlayer, inventory, query, action_name)
    assert(xPlayer)
    assert(inventory)
    assert(query)
    assert(action_name)

    if not action_name then
        ESX.Error('action_name is nil', debug.traceback())
        return
    end

    local item = ESX.Custom.Inventory.SearchFirst(inventory, query)
    if not item then
        return false
    end

    local actions = item.actions[inventory.actionGroup or inventory.category]
    if not actions or not actions[action_name] then
        ESX.Error('Action "'..action_name..'" for category "'..inventory.category..'" not found!', debug.traceback())
        return false
    end

    local action = actions[action_name]

    if action.action then
        TriggerEvent(action.action, xPlayer, inventory, item)
    end

    local itemType = ESX.Custom.Inventory.ItemTypes[item.category]

    if itemType and itemType.getActions then
        item.actions = itemType.getActions(item)
    end

    if itemType and itemType.getDescription then
        item.description = itemType.getDescription(item)
    end

    return item
end

ESX.Custom.Inventory.GetWeight = function(inventory)
    assert(inventory)

    local weight = 0
    for _,item in pairs(inventory.items) do
        weight = weight + (item.weight or 0) * item.amount
    end
    return weight
end
