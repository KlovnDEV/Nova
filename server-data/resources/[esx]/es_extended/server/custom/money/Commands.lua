ESX.RegisterCommand('getmoney', 'admin', function(xPlayer, args, showError)

	if tonumber(args.identifier) and tonumber(args.identifier) < 10000 then
		args.identifier = ESX.GetPlayerFromId(args.identifier)
	elseif args.identifier == "me" then
		args.identifier = xPlayer.identifier
	end

	ESX.Money.Get(args.account, args.identifier, function(amount)
		if amount ~= nil then
			if xPlayer then
				xPlayer.showNotification(tostring(amount))
			else
				print(amount)
			end
		else
			xPlayer.showNotification('Fail.')
		end
	end)

end, true, {help = "Задать объём средств игрока", validate = true, arguments = {
	{name = 'identifier', help = "Идентификатор", type = 'string'},
	{name = 'account', help = "Счёт", type = 'string'},
}})

ESX.RegisterCommand('setmoney', 'admin', function(xPlayer, args, showError)

	if tonumber(args.identifier) and tonumber(args.identifier) < 10000 then
		args.identifier = ESX.GetPlayerFromId(args.identifier)
	elseif args.identifier == "me" then
		args.identifier = xPlayer.identifier
	end

	ESX.Money.Set(args.account, args.identifier, args.amount, function(success)
		if success then
			xPlayer.showNotification('Success.')
		else
			xPlayer.showNotification('Fail.')
		end
	end)

end, true, {help = "Задать объём средств игрока", validate = true, arguments = {
	{name = 'identifier', help = "Идентификатор", type = 'string'},
	{name = 'account', help = "Счёт", type = 'string'},
	{name = 'amount', help = "Объём средств", type = 'number'},
}})

ESX.RegisterCommand('addmoney', 'admin', function(xPlayer, args, showError)

	if tonumber(args.identifier) and tonumber(args.identifier) < 10000 then
		args.identifier = ESX.GetPlayerFromId(args.identifier)
	elseif args.identifier == "me" then
		args.identifier = xPlayer.identifier
	end

	ESX.Money.Add(args.account, args.identifier, args.amount, function(success)
		if success then
			xPlayer.showNotification('Success.')
		else
			xPlayer.showNotification('Fail.')
		end
	end)

end, true, {help = "Увеличить объём средств игрока", validate = true, arguments = {
	{name = 'identifier', help = "Идентификатор", type = 'string'},
	{name = 'account', help = "Счёт", type = 'string'},
	{name = 'amount', help = "Объём средств", type = 'number'},
}})

ESX.RegisterCommand('delmoney', 'admin', function(xPlayer, args, showError)

        ESX.Money.Pay(args.account, args.target.identifier, args.amount, function()
		xPlayer.showNotification('Success.')
	end, function()
		xPlayer.showNotification('Fail.')
	end, "delmoney")

end, true, {help = "Уменьшить объём средств игрока", validate = true, arguments = {
	{name = 'target', help = "Игрок", type = 'player'},
	{name = 'account', help = "Счёт", type = 'string'},
	{name = 'amount', help = "Объём средств", type = 'number'},
}})
