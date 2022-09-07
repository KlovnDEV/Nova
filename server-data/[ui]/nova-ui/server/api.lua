ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function dbPost(query, args)
    local res = exports['db'].post(0, query, json.encode(args))

    local status = res[1]
    local data = res[2]

    if data then
        data = json.decode(data)
    end

    return {status, data}
end

function dbPostOne(query, args)
    local res = dbPost(query, args)

    local status = res[1]
    local data = res[2]

    if data and #data > 0 then
        data = data[1]
    end

    return {status, data}
end

ESX.RegisterServerCallback('nova-ui:query_api', function(source, cb, data)

    local cmd = data.cmd
    local args = data.args

--    if cmd ~= 'inventory_item_hover' then
--       print('query_api '..tostring(cmd))
--    end

    if cmd == "inventory/item/move" then
        setItemPos(source, cb, args.from, args.to, args.uid, args.x, args.y, args.shift, args.ctrl)
        return
    end

    if cmd == "fetchRecipes" then
        cb(dbPost('craft/recipes/get', args));
        return
    end

    if cmd == "fetchTasks" then
        cb({200, getTasks(args.category, args.identifier)})
--        cb(dbPost('craft/tasks/get', args));

        return
    end

    if cmd == "craft/tasks/add" then
        cb({200, addTask(args.category, args.identifier, args.recipeId, args.label, args.amount)})
        return
    end

    if cmd == "craft/tasks/delete" then
        cb({200, deleteTask(args.category .. '/' .. args.identifier, args.id)})
        return
    end

    if cmd == "fetchItem" then
        cb(dbPost('itemtemplate/getitem', args));
        return
    end

    if cmd == "fetchIngredients" then
        cb(dbPost('craft/ingredients/get', args));
        return
    end

    return cb(dbPost(cmd, args));

end)
