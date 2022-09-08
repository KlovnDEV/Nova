ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--[[
API = {}
API.TestSend = function(cb, method, url, data)
    PerformHttpRequest(url, function(code, respdata, header)
        if code == 0 or not respdata then
            print('^1[ERROR]: ^7Bad response header!\n^1' .. debug.traceback() .. '^7')

            cb(nil)
            return
        end
        local response = json.decode(respdata)

        cb(response)
    end,
    method,
    data,
    {['Content-Type'] = 'application/json'})
end
]]

RegisterNetEvent('test:apiTest')
AddEventHandler('test:apiTest', function()
	local xPlayer = ESX.GetPlayerFromId(source)
    local res = exports['db'].post(0, 'identity/get', json.encode({
        ["identifier"] = xPlayer.identifier,
    }))
	print(json.encode(res))
end)
