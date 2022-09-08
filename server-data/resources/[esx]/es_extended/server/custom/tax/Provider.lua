ESX.Tax = {}

ESX.Tax.List = function(cb) 
    assert(cb)

    local res = exports['db'].post(0, 'tax/getlist', "{}")

    if res[1] ~= 200 then
	error(string.format("Unable to get tax list (%i): %s", res[1], res[2]))
        cb(false)
        return
    end

    cb(json.decode(res[2]))
end


ESX.Tax.Get = function(name, cb) 
    assert(name)
    assert(cb)

    local res = exports['db'].post(0, 'tax/getbyname', json.encode({
        ['name'] = name,
    }))

    if res[1] ~= 200 then
	error(string.format("Unable to get tax: %s (%i)", name, res[1]))
        cb(false)
        return
    end

    res = json.decode(res[2])
    if not res or #res ~= 1 then
	error(string.format("Unable to get tax: %s (incorrect json %s)", name, res[2]))
        cb(false)
        return
    end

    cb(res[1])
end

ESX.Tax.Calculate = function(name, amount, cb) 
    ESX.Tax.Get(name, function(response)
        if response then
            cb(math.ceil(amount * response.amount / 100.0))
        else
            error(string.format("Unknown tax: %s", name))
            cb(0)
        end
    end)
end

---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------

ESX.Tax.Set = function(name, amount, label, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.TAX_GET), debug.traceback())

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.TAX_SET))

        return
    elseif not amount then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.AMOUNT, C.F.TAX_SET))

        return
    elseif tonumber(amount) < 0 then
        ESX.Error(_F(C.NEGATIVE_AMOUNT, C.F.TAX_SET))

        return
    elseif not label then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.LABEL, C.F.TAX_SET))

        return
    end

    MySQL.Async.fetchAll('INSERT INTO tax(name, label, amount) VALUES(@name, @label, @amount) ON DUPLICATE KEY UPDATE amount = @amount', 
    {
        ['@name'] = name,
        ['@label'] = label,
        ['@amount'] = amount
    }, function(response)
        if response and response.affectedRows and response.affectedRows > 0 then
            cb('success')  
            
            return
        end

        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.TAX_GET), debug.traceback())
        cb(nil)
    end)
end
