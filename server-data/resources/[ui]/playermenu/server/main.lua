ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

-- JobList = nil

--[[function updateAdmin(xPlayer)
	TriggerEvent('es:canGroupTarget', xPlayer.getGroup(), "admin", function(canTarget)
		TriggerClientEvent('esx_playermenu:setAdmin', xPlayer.source, canTarget)
	end)
end]] --

--[[AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
	updateAdmin(xPlayer)
end)]] --

--[[MySQL.ready(function()
	MySQL.Async.fetchAll('SELECT * FROM jobs', {}, function(result)
		JobList = result
	end)
end)]] --

--[[AddEventHandler('onResourceStart', function(resource)
	if resource == GetCurrentResourceName() then
		Citizen.CreateThread(function()
			Citizen.Wait(1000)
			local xPlayers = ESX.GetPlayers()

			for i=1, #xPlayers, 1 do
				local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
				if xPlayer ~= nil then
					updateAdmin(xPlayer)
				end
			end
		end)
	end
end)]] --

--[[ESX.RegisterServerCallback('esx_playermenu:getJobs', function(source, cb)
	cb(JobList)
end)]] --

RegisterServerEvent('esx_playermenu:bringPlayer')
AddEventHandler('esx_playermenu:bringPlayer', function(target, pos)
    local xPlayer = ESX.GetPlayerFromId(source)

    --[[if not exports["essentialmode"]:canGroupTarget(xPlayer.getGroup(), "admin") then
        return
    end]] --

    local xTarget = ESX.GetPlayerFromId(target)

    if xTarget ~= nil then
        TriggerClientEvent('esx_playermenu:bringPlayer', xTarget.source, pos)
    end
end)

--[[RegisterServerEvent('esx_playermenu:setJob')
AddEventHandler('esx_playermenu:setJob', function(target, job, grade)
    local xPlayer = ESX.GetPlayerFromId(source)
    
    if not exports["essentialmode"]:canGroupTarget(xPlayer.getGroup(), "admin") then
        return
    end

    local xTarget = ESX.GetPlayerFromId(target)

    if xTarget ~= nil then
        xTarget.setJob(job, grade)
    end
end)]] --

ESX.RegisterServerCallback('esx_playermenu:adminGetPlayers',
                           function(source, cb)
    xPlayer = ESX.GetPlayerFromId(source)

    --[[if not exports["essentialmode"]:canGroupTarget(xPlayer.getGroup(), "admin") then
        return
    end]] --

    local xPlayers = ESX.GetPlayers()
    local arr = {}
    for i = 1, #xPlayers, 1 do
        local pl = ESX.GetPlayerFromId(xPlayers[i])
        local identity = pl.get("identity")
        local job = "unemployed"
        local grade = -1

        if pl.job ~= nil then
            job = pl.job.name
            grade = pl.job.grade
        end

        local status = pl.get('status')

        table.insert(arr, {
            ["id"] = pl.source,
            ["name"] = pl.name,
            ["job"] = job,
            ["jobgrade"] = grade,
            ["identity"] = identity,
            ["identifier"] = pl.identifier,
            ["money"] = pl.getMoney(),
            ["bank"] = pl.getAccount('bank').money,
            ["black_money"] = pl.getAccount('black_money').money,
            ["phone_number"] = exports["gcphone"]:getPhoneNumber(pl.identifier),
            ['status'] = status
        })
    end

    cb(arr)
end)

ESX.RegisterServerCallback('esx_playermenu:adminGetSocietyAccount', function(source, cb, societyName)
    TriggerEvent('esx_addonaccount:getSharedAccount', societyName, function(account) 
        cb({["money"] = account.money}) 
    end)
end)

ESX.RegisterServerCallback('esx_playermenu:adminMoney', function(source, cb, identifier, moneytype, act, val)
    local xPlayer = ESX.GetPlayerFromId(source)

    --[[if not exports["essentialmode"]:canGroupTarget(xPlayer.getGroup(), "admin") then
        return
    end]] --

    xTarget = ESX.GetPlayerFromIdentifier(identifier)
    TriggerEvent('admin_commands:setmoney', xPlayer.source, xTarget.source, moneytype, act, val)
    cb()
end)
