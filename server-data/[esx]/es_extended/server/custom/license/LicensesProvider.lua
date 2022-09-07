---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
ESX.License = {}

ESX.License.GetByName = function(name, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.LICENSE_GET_BY_NAME), debug.traceback())

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.LICENSE_GET_BY_NAME))

        return
    end

    MySQL.Async.fetchAll('SELECT * FROM licenses WHERE name = @name', 
    {
        ['@name'] = name
    }, function(response) 
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.LICENSE_GET_BY_NAME), debug.traceback())
            cb(nil)

            return
        end

        cb(response[1])
    end)
end

ESX.License.GetList = function(cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.LICENSE_GET_LIST), debug.traceback())

        return
    end

    MySQL.Async.fetchAll('SELECT * FROM licenses', {}, function(response) 
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.LICENSE_GET_LIST), debug.traceback())
            cb(nil)

            return
        end

        cb(response)
    end)
end

ESX.License.Set = function(name, price, label, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.LICENSE_SET), debug.traceback())

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.LICENSE_SET))

        return
    elseif not price then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.PRICE, C.F.LICENSE_SET))

        return
    elseif not label then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.LABEL, C.F.LICENSE_SET))

        return
    end

    MySQL.Async.fetchAll('INSERT INTO licenses(name, label, price) VALUES(@name, @label, @price) ON DUPLICATE KEY UPDATE price = @price', 
    {
        ['@name'] = name,
        ['@label'] = label,
        ['@price'] = price
    }, function(response)
        if response and response.affectedRows and response.affectedRows > 0 then
            cb('success')  
            
            return
        end

        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.LICENSE_SET), debug.traceback())
        cb(nil)
    end)
end
