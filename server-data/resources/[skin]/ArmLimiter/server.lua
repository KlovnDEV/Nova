--[[
RegisterNetEvent('api_test:save')
AddEventHandler('api_test:save', function(id, data)
	SaveResourceFile('api_test','screens/'..tostring(id)..'.b64', data, data.length)
end)
]]
RegisterNetEvent('clothesLimiter:torsoShirtAllow')
AddEventHandler('clothesLimiter:torsoShirtAllow', function(sex, torso, shirt)
--	local xPlayer = ESX.GetPlayerFromId(source)
    local res = exports['db'].post(0, 'clotheslimiter/torsoshirt/add', json.encode({
        ["sex"] = sex,
        ["torso"] = torso,
        ["shirt"] = shirt,
    }))
end)

RegisterNetEvent('clothesLimiter:torsoShirtDeny')
AddEventHandler('clothesLimiter:torsoShirtDeny', function(sex, torso, shirt)
--	local xPlayer = ESX.GetPlayerFromId(source)
    local res = exports['db'].post(0, 'clotheslimiter/torsoshirt/delete', json.encode({
        ["sex"] = sex,
        ["torso"] = torso,
        ["shirt"] = shirt,
    }))
end)

RegisterNetEvent('clothesLimiter:torsoShirtGet')
AddEventHandler('clothesLimiter:torsoShirtGet', function(sex, torso, shirt)
--	local xPlayer = ESX.GetPlayerFromId(source)
    local res = exports['db'].post(0, 'clotheslimiter/torsoshirt/get', json.encode({}))

	TriggerClientEvent('clothesLimiter:torsoShirtList', -1, res)
end)
