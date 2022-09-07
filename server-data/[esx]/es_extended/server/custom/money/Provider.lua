ESX.Money = {}

function initMoney(identifier)
	ESX.Money.Get('bank', identifier, function(cb) end)
--	ESX.Money.Get('cash', identifier, function(cb) end)
end

AddEventHandler('esx:playerLoaded', function(source, xPlayer)
	if xPlayer and xPlayer.identifier then
		initMoney(xPlayer.identifier)
	end
end)

AddEventHandler("onClientResourceStart", function(resource)
	if GetCurrentResourceName() ~= resource then return end

	for _,id in pairs(GetPlayers()) do
		local xPlayer = ESX.GetPlayerFromId(id)
		initMoney(xPlayer.identifier)
	end
end)

local function updateStateBag(xPlayer, name, cb)
--    print('updateStateBag', xPlayer.identifier, name, cb)
    local stateName = "money:"..name

    if xPlayer then
        local state = Player(xPlayer.playerId).state

        if not state[stateName] then
--            print('new money state')
            state:set(stateName, 0, true)
        end

--        print('set money')
        state:set(stateName, cb(state[stateName] or 0), true)
        return true
    end

    return false
end

ESX.Money.Get = function(name, identifier, cb)
    assert(name)
    assert(identifier)
    assert(cb)

    local res = exports['db'].post(0, 'money/get', json.encode({
        ['name'] = name,
        ['identifier'] = identifier
    }))

    -- not initialized accounts are zero-mapped by default
    if res[1] == 400 then
        cb(0)
        return
    end

    if res[1] ~= 200 then
	ESX.Error(_f('Unknown response in ESX.Money.Get: %s', json.encode(res)))
        cb(false)
        return
    end

    local reslines = json.decode(res[2])
    if reslines == nil or reslines.amount == nil then
        cb(false)
        return
    end

    local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
    if xPlayer then
	updateStateBag(xPlayer, name, function(val)
		return reslines.amount
	end)
    end

    cb(reslines.amount)
end

ESX.Money.Set = function(name, identifier, amount, cb)
    assert(name)
    assert(identifier)
    assert(amount)
    assert(cb)
    assert(amount >= 0)

    local xPlayer = ESX.GetPlayerFromIdentifier(identifier)

    local res = exports['db'].post(0, 'money/set', json.encode({
        ['name'] = name,
        ['identifier'] = identifier,
        ['amount'] = amount,
    }))

    if res[1] ~= 200 then
        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.MONEY_SET), debug.traceback())
        cb(false)
        return
    end


    if json.decode(res[2]).affectedRows < 1 then
        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.MONEY_SET), debug.traceback())
        cb(false)
        return
    end

    if xPlayer then
        updateStateBag(xPlayer, name, function(val)
            TriggerClientEvent(xPlayer.source, 'esx:updateMoney', 'set', name, amount, amount)
            return amount
        end)
    end
--    print('money set', json.encode(res[2]))
    cb(true)
end

ESX.Money.Add = function(name, identifier, amount, cb)
    assert(name)
    assert(identifier)
    assert(amount)
    assert(cb)

    local res = exports['db'].post(0, 'money/add', json.encode({
        ['name'] = name,
        ['identifier'] = identifier,
        ['amount'] = amount,
    }))

    if res[1] ~= 200 then
        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.MONEY_ADD), debug.traceback())
        cb(false)
        return
    end

    if json.decode(res[2]).affectedRows < 1 then
        ESX.Error(_F(C.INSERT_DB_ERROR, C.F.MONEY_ADD), debug.traceback())
        cb(false)
        return
    end

--    print('money add', json.encode(res[2]))

    local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
    if xPlayer then
        updateStateBag(xPlayer, name, function(val)
            TriggerClientEvent(xPlayer.source, 'esx:updateMoney', 'add', name, amount, val+amount)
            return val+amount
        end)
    end

    cb(true)
end

ESX.Money.Remove = function(name, identifier, amount, cb)
    assert(name)
    assert(identifier)
    assert(amount)
    assert(cb)

    if name == 'cash' then
        local inv = ESX.Custom.Inventory.Get("player-inventory", identifier)
        if not inv or not ESX.Custom.Inventory.Cash.Remove(inv, amount) then
            cb(false)
            return
        end
    else
        local res = exports['db'].post(0, 'money/remove', json.encode({
            ['name'] = name,
            ['identifier'] = identifier,
            ['amount'] = amount,
        }))

        if res[1] ~= 200 then
            ESX.Error(_F(C.REMOVE_DB_ERROR, C.F.MONEY_REMOVE), debug.traceback())
            cb(false)
            return
        end

        if json.decode(res[2]).affectedRows < 1 then
            cb(false)
            return
        end
    end

--    print('money remove', json.encode(res[2]))
    local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
    if xPlayer then
        updateStateBag(xPlayer, name, function(val)
            TriggerClientEvent(xPlayer.source, 'esx:updateMoney', 'sub', name, amount, val-amount)
            return val-amount
        end)
    end

    cb(true)
end

ESX.Money.Pay = function(name, identifier, amount, cb_success, cb_failure, description, tax)
    assert(name)
    assert(identifier)
    assert(amount)

    local cb = function(success)
        if success then
            -- TODO: actual code
            if description then
                print('ESX Money Pay', amount, json.encode(description))
            end

            if tax then
                ESX.Tax.Calculate(tax, amount, function(taxAmount)
	                if taxAmount > 0 then
        	            ESX.Money.Add('budget', 'government', taxAmount, function() end)
	                end
		end)
            end

            if cb_success then cb_success() end
        else
            if cb_failure then cb_failure() end
        end
    end

    if name == "cash-bank" then
        ESX.Money.Remove("cash", identifier, amount, function(res)
            if res then
                cb(true)
            else
                ESX.Money.Remove("bank", identifier, amount, cb)
            end
	    end)
    elseif name == "bank-cash" then
        ESX.Money.Remove("bank", identifier, amount, function(res)
            if res then
                cb(true)
            else
                ESX.Money.Remove("cash", identifier, amount, cb)
            end
	    end)
    else
        ESX.Money.Remove(name, identifier, amount, cb)
    end
end

ESX.Money.Compensate = function(name, identifier, amount, cb_success, cb_failure, description, tax)
    assert(name)
    assert(identifier)
    assert(amount)

    local taxAmount = 0
    if tax then
        taxAmount = CalculateTax(tax, amount)		
    end

    if taxAmount > amount then
        taxAmount = amount
    end

    ESX.Money.Add(name, identifier, amount-taxAmount, function(success)
        if success then
-- TODO: actual code
            if description then
                print('ESX Money Compensate', amount, description)
            end            

            if cb_success then cb_success() end
        else
            if cb_failure then cb_failure() end
        end
    end)
end


ESX.Money.Check = function(name, identifier, amount, cb)
    assert(name)
    assert(identifier)
    assert(amount)
    assert(cb)

    ESX.Money.Get(name, identifier, function(actual_amount)
        if actual_amount ~= false then
            cb(actual_amount >= amount)
        else
            cb(false)
        end
    end)
end
