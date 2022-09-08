ESX.Custom.Inventory.Item = {}

ESX.Custom.Inventory.ItemTypes = {}

ESX.Custom.Inventory.RegisterItemType = function(type_name, type_obj)
    assert(type_name)
    assert(type_obj)
    ESX.Custom.Inventory.ItemTypes[type_name] = type_obj
end

ESX.Custom.Inventory.Item.Create = function(name, amount, extra)
    assert(name)

	local res = exports['db'].post(0, 'itemtemplate/getitem', json.encode({
		["name"] = name,
    }))

    if res[1] ~= 200 then
        ESX.Error("Unable to create new item: " .. json.encode(res));
        return nil
    end

    local itemTemplate = json.decode(res[2])

    if itemTemplate == nil then
        ESX.Error("Unable to find item template: " .. name .. ", " .. json.encode(res))
        return nil
    end

    if type(itemTemplate.extra) == "string" then
        itemTemplate.extra = json.decode(itemTemplate.extra)
    end

    amount = amount or 1
    extra = extra or {}

    local item = itemTemplate

    item.template_id = itemTemplate.id
    item.id = nil
    item.uid = nil
    item.name = name
    item.amount = amount
    item.stack = 1
    item.x = 0
    item.y = 0

    local itemType = ESX.Custom.Inventory.ItemTypes[item.category]
    if itemType then
        if itemType.init then
            item = itemType.init(item)
        end
    end

    for k,v in pairs(extra) do
        item[k] = v
    end

    item = ESX.Custom.Inventory.Item.Update(item)

    return item
end

ESX.Custom.Inventory.Item.Duplicate = function(item)
    assert(item)

    local res = {}
    for k,v in pairs(item) do
        res[k] = v
    end

    res.uid = nil
    return res
end

ESX.Custom.Inventory.Item.Update = function(item)
    assert(item)

    local actions = {}

    actions.player = {}
    actions.container = {}

    actions.player.drop = {
        ['label'] = 'Выбросить',
        ['priority'] = 1
    }

    actions.container.drop = {
        ['label'] = 'Выбросить',
        ['priority'] = 1
    }
--[[
    actions.player['container-put'] = {
        ['label'] = 'Положить',
        ['priority'] = 2
    }

    actions.container['container-get'] = {
        ['label'] = 'Забрать',
        ['priority'] = 2
    }
]]--
    item.actions = actions

    local itemType = ESX.Custom.Inventory.ItemTypes[item.category]

    if itemType and itemType.getActions then
        item.actions = itemType.getActions(item)
    end

    if itemType and itemType.getDescription then
        item.description = itemType.getDescription(item)
    end

    return item
end

ESX.Custom.Inventory.Item.GetWeight = function(table, name, cb)
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.ITEM_GET_WEIGHT))

        return
    elseif not table then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.TABLE, C.F.ITEM_GET_WEIGHT))

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.ITEM_GET_WEIGHT))

        return
    end

    MySQL.Async.fetchAll('SELECT weight FROM ' .. table .. ' WHERE name = @name',
    {
        ['@name'] = name
    }, function(response)
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.ITEM_GET_WEIGHT), debug.traceback())
            cb(nil)

            return
        end

        cb(response[1].weight)
    end)
end
