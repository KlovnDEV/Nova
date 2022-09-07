---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
ESX.UserLicense = {}

ESX.UserLicense.Get = function(identifier, name, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.USER_LICENSE_GET), debug.traceback())

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.USER_LICENSE_GET))

        return
    elseif not identifier then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.IDENTIFIER, C.F.USER_LICENSE_GET))

        return
    end

    MySQL.Async.fetchAll('SELECT * FROM user_licenses WHERE name = @name AND identifier = @identifier', 
    {
        ['@name'] = name,
        ['@identifier'] = identifier
    }, function(response) 
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.USER_LICENSE_GET), debug.traceback())
            cb(nil)

            return
        end

        cb(response[1])
    end)
end

ESX.UserLicense.GetList = function(identifier, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.USER_LICENSE_GET_LIST), debug.traceback())

        return
    elseif not identifier then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.IDENTIFIER, C.F.USER_LICENSE_GET_LIST))

        return
    end

    MySQL.Async.fetchAll('SELECT * FROM user_licenses WHERE identifier = @identifier', 
    {
        ['@identifier'] = identifier
    }, function(response) 
        if not response or ESX.IsTableEmpty(response) then
            ESX.Error(_F(C.EMPTY_DB_RESPONSE, C.F.USER_LICENSE_GET_LIST), debug.traceback())
            cb(nil)

            return
        end

        cb(response)
    end)
end

ESX.UserLicense.Set = function(identifier, name, label, cb) 
    if not cb then
        ESX.Error(_F(C.CB_ERROR, C.F.USER_LICENSE_SET), debug.traceback())

        return
    elseif not identifier then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.IDENTIFIER, C.F.USER_LICENSE_SET))

        return
    elseif not name then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.NAME, C.F.USER_LICENSE_SET))

        return
    elseif not label then
        ESX.Error(_F(C.ARGUMENT_MISSING, C.A.LABEL, C.F.USER_LICENSE_SET))

        return
    end

    MySQL.Async.fetchAll('INSERT INTO user_licenses(identifier, name, label, created_at) VALUES(@identifier, @name, @label, @created_at) ON DUPLICATE KEY UPDATE created_at = @created_at', 
    {
        ['@identifier'] = identifier,
        ['@name'] = name,
        ['@label'] = label,
        ['@created_at'] = os.time(os.date("!*t"))
    }, function(response)
        if response and response.affectedRows and response.affectedRows > 0 then
            cb('success')  
            
            return
        end

        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.USER_LICENSE_SET), debug.traceback())
        cb(nil)
    end)
end
