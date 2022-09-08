---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
CustomTables = {}

CustomTables.Run = function(identifier) 
    -- identifier validation is not needed here as it is validated in the main.lua in onPlayerJoined function --

    -- tattoos section --
    CustomTables.Tattoo(identifier)

    -- money section --
    ESX.Money.Set('bank', identifier, Config.StartBankMoney, function() end)
    ESX.Money.Set('cash', identifier, 0, function() end)

    -- roles section --
    CustomTables.Roles(identifier)
end

CustomTables.Tattoo = function(identifier)
    MySQL.Async.fetchScalar('SELECT 1 FROM fill_tattoo WHERE identifier = @identifier', 
    {
        ['@identifier'] = identifier
    }, function(success) 
        if not success then
            MySQL.Async.execute('INSERT INTO fill_tattoo(identifier, data) VALUES(@identifier, @data)', 
            {
                ['@identifier'] = identifier,
                ['@data'] = '{}'
            }, function(rowsChanged) 
                if rowsChanged < 1 then
                    ESX.Error('Error inserting new entry into fill_tattoo', debug.traceback())
                end
            end)
        end
    end)
end

CustomTables.Roles = function(identifier) 
    MySQL.Async.fetchScalar('SELECT 1 FROM user_roles WHERE identifier = @identifier', 
    {
        ['@identifier'] = identifier
    }, function(success) 
        if not success then
            MySQL.Async.execute('INSERT INTO user_roles(identifier, role, grade) VALUES(@identifier, @role, @grade)', 
            {
                ['@identifier'] = identifier,
                ['@role'] = 'unemployed',
                ['@grade'] = 0,
            }, function(rowsChanged) 
                if rowsChanged < 1 then
                    ESX.Error('Error inserting new entry into user_roles', debug.traceback())
                end
            end)
        end
    end)
end
