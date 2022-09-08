ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--[[
MySQL.ready(function()
    MySQL.Async.execute('DELETE FROM bank_transactions WHERE timestamp < DATE_SUB( CURRENT_TIME(), INTERVAL 1 DAY)', {})
end)

function StartInterest()

	function interest()
		local xPlayers = ESX.GetPlayers()

		for i=1, #xPlayers, 1 do
			local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
			local job     = xPlayer.job.grade_name
			local salary  = xPlayer.job.grade_salary

			local account   = xPlayer.getAccount('savings')
			local inter  = ESX.Math.Round(account.money*Config.InterestRate)
			if inter > 0 then
				xPlayer.addAccountMoney('savings', inter)
				addTransaction(xPlayer.identifier, "interest", inter)
			end
		end

		SetTimeout(Config.InterestInterval, interest)
	end

	SetTimeout(Config.InterestInterval, interest)
end


function addTransaction(identifier, description, amount)
    MySQL.Async.execute('INSERT INTO bank_transactions (identifier, description, amount) VALUES (@identifier, @description, @amount)', {
	['@identifier'] = identifier,
	['@description']  = description,
	['@amount']  = amount})
end

ESX.RegisterServerCallback('esx_atm:get_transactions', function(source, cb)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	MySQL.Async.fetchAll('SELECT * FROM bank_transactions WHERE identifier = @identifier ORDER BY timestamp DESC LIMIT 15',{
		['@identifier'] = xPlayer.identifier
	}, function(result)
		cb(result)
	end)
end)
]]--

RegisterServerEvent('esx_atm:deposit')
AddEventHandler('esx_atm:deposit', function(amount)
	assert(amount)
	local xPlayer = ESX.GetPlayerFromId(source)

	ESX.Money.Pay('cash', xPlayer.identifier, amount, function()
		ESX.Money.Add('bank', xPlayer.identifier, amount, function()
			TriggerClientEvent('nova-ui:updateBank', xPlayer.source)
		end)
	end,
	function()
		xPlayer.showNotification('Недостаточно наличных!')
	end, 'Зачисление на банковский счёт')

--[[
	amount = tonumber(amount)

	if account == 'black_money' then return end
	if not tonumber(amount) then return end
	amount = ESX.Math.Round(amount)

	if amount == nil or amount <= 0 or amount > xPlayer.getMoney() then
		TriggerClientEvent('esx:showNotification', _source, _U('invalid_amount'))
	else
		xPlayer.removeMoney(amount, "ATM deposit")
		xPlayer.addAccountMoney(account, amount, "ATM deposit "..tostring(account))
		TriggerClientEvent('esx:showNotification', _source, _U('deposit_money', amount))
		TriggerClientEvent('esx_atm:moneyChange', _source)
		addTransaction(xPlayer.identifier, "deposit "..account, amount)
	end
]]--
end)

RegisterServerEvent('esx_atm:withdraw')
AddEventHandler('esx_atm:withdraw', function(amount)
	assert(amount)
	local xPlayer = ESX.GetPlayerFromId(source)

	ESX.Money.Pay('bank', xPlayer.identifier, amount, function()

            TriggerClientEvent('nova-ui:updateBank', xPlayer.source)
	    local inv = ESX.Custom.Inventory.Get("player-inventory", xPlayer.identifier)
	    local item = ESX.Custom.Inventory.Item.Create('cash', 1, {})

        -- TODO: put stacks
--	    local amount = math.min(item.maxstack, args.count)

	    if amount < 1 then
	        showError('Incorrect item amount.')
	        return
	    end

	    if not item then
	        showError('Incorrect item name: '..tostring(args.item))
	        return
	    end

	    ESX.Custom.Inventory.AddItem(inv, item, amount)
	end,
	function()
		xPlayer.showNotification('Недостаточно средств на счёте!')
	end, 'Выдача наличных')
end)
--[[
	amount = tonumber(amount)
	local accountMoney = xPlayer.getAccount(account).money

	if account == 'black_money' then return end
	if not tonumber(amount) then return end
	amount = ESX.Math.Round(amount)

	if amount == nil or amount <= 0 or amount > accountMoney then
		TriggerClientEvent('esx:showNotification', _source, _U('invalid_amount'))
	else
		xPlayer.removeAccountMoney(account, amount, "ATM withdraw "..tostring(account))
		xPlayer.addMoney(amount, "ATM withdraw")
		TriggerClientEvent('esx:showNotification', _source, _U('withdraw_money', amount))
		TriggerClientEvent('esx_atm:moneyChange', _source)
		addTransaction(xPlayer.identifier, "withdraw "..account, amount)
	end
end)
]]--
-- not suitable for net
--[[
AddEventHandler('esx_atm:pay', function(source, description, amount, cb)
	local xPlayer = ESX.GetPlayerFromId(source)
	if amount < 0 then
		print("esx_atm: pay cheating "..xPlayer.identifier)
		cb(false)
		return
	end

	if amount <= xPlayer.getMoney() then
		xPlayer.removeMoney(amount, description)
		addTransaction(xPlayer.identifier, "pay "..description, amount)
		cb(true)
		return
	elseif amount <= xPlayer.getAccount('bank').money then
		xPlayer.removeAccountMoney('bank', amount, description)
		addTransaction(xPlayer.identifier, "pay "..description, amount)
		cb(true)
		return
	else
		cb(false)
		return
	end
end)

StartInterest()
]]--
