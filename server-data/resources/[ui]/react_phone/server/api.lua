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

ESX.RegisterServerCallback('react_phone:query_api', function(source, cb, data)

    local cmd = data.cmd
    local args = data.args

    local res = dbPost(cmd, args)

    return cb(res);
end)
