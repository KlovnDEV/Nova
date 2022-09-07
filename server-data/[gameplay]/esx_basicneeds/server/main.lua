ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent("stress:add")
AddEventHandler("stress:add", function (value)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	if ESX.Roles.HasRole(xPlayer.identifier, 'police') then
		TriggerClientEvent("esx_status:add", _source, "stress", value / 15)
	elseif ESX.Roles.HasRole(xPlayer.identifier, 'ambulance') then
        TriggerClientEvent("esx_status:add", _source, "stress", value / 10)
    else
		TriggerClientEvent("esx_status:add", _source, "stress", value)
	end
end)

RegisterServerEvent("stress:remove")
AddEventHandler("stress:remove", function (value)
	local _source = source
	TriggerClientEvent("esx_status:remove", _source, "stress", value)
end)

TriggerEvent('es:addGroupCommand', 'heal', 'admin', function(source, args, user)
	-- heal another player - don't heal source
	if args[1] then
		local playerId = tonumber(args[1])

		-- is the argument a number?
		if playerId then
			-- is the number a valid player?
			if GetPlayerName(playerId) then
				print(('esx_basicneeds: %s healed %s'):format(GetPlayerIdentifier(source, 0), GetPlayerIdentifier(playerId, 0)))
				TriggerClientEvent('esx_basicneeds:healPlayer', playerId)
				TriggerClientEvent('chat:addMessage', source, { args = { '^5HEAL', 'You have been healed.' } })
			else
				TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Player not online.' } })
			end
		else
			TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Invalid player id.' } })
		end
	else
		print(('esx_basicneeds: %s healed self'):format(GetPlayerIdentifier(source, 0)))
		TriggerClientEvent('esx_basicneeds:healPlayer', source)
	end
end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, {help = 'Heal a player, or yourself - restores thirst, hunger and health.', params = {{name = 'playerId', help = '(optional) player id'}}})
--[[
ESX.RegisterCommand('setstatus', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, args.status, args.value)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение статуса", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'status', help = "Имя статуса", type = 'string'},
	{name = 'value', help = "Значение", type = 'number'},
}})
]]--
ESX.RegisterCommand('sethunger', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'hunger', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение голода", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setthirst', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'thirst', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение жажды", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setdrunk', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'drunk', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение опьянения", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setnicotine', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'nicotine', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение короткосрочного никотина", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setnicotinel', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'nicotineLong', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение долгосрочного никотина", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setstress', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'stress', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение стресса", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setalcohol', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'alcohol', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение алкогольной зависимосити", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setalcoholl', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'alcoholLong', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение долгосрочного алкоголя", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setdrugs', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'drugs', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение наркотической зависимости", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})

ESX.RegisterCommand('setdrugsl', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx_status:set', args.playerId.source, 'drugsLong', args.value*10000)
	TriggerClientEvent('chat:addMessage', args.playerId.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение тяжелой зависимости", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'value', help = "Значение", type = 'number'},
}})
