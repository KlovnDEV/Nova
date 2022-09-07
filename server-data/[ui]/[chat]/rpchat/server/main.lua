function getDisplayName(source)
	local name = GetPlayerName(source)
	if Config.EnableIdentity then name = GetCharacterName(source) end
	return name
end

function write_ooc(source, message)
	TriggerClientEvent('chat:addMessage', -1, { args = { _U('ooc_prefix', getDisplayName(source)), message }, color = { 184,242,255 } })
end

function write_twt(source, message)
	TriggerClientEvent('chat:addMessage', -1, { args = { _U('twt_prefix', getDisplayName(source)), message }, color = { 0, 153, 204 } })
end

function write_me(source, message)
	TriggerClientEvent('rpchat:sendProximityMessage', -1, source, _U('me_prefix', getDisplayName(source)), message, { 255,222,137 })
	TriggerClientEvent('3dme:me', source, message)
end

function write_do(source, message)
	TriggerClientEvent('rpchat:sendProximityMessage', -1, source, _U('do_prefix', getDisplayName(source)), message, { 0, 0, 255 })
end

function write_report(source, message)
	TriggerClientEvent('chat:addMessage', -1, { args = { _U('report_prefix', getDisplayName(source)), message }, color = { 255,82,84 } })
end

AddEventHandler('es:invalidCommandHandler', function(source, command_args, user)
	CancelEvent()
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', _U('unknown_command', command_args[1]) } })
end)

AddEventHandler('chatMessage', function(source, name, message)
	if string.sub(message, 1, string.len('/')) ~= '/' then
		CancelEvent()
		write_me(source, message)
	end
end)

RegisterCommand('ooc', function(source, args, rawCommand)
	if source == 0 then
		print('rpchat: you can\'t use this command from rcon!')
		return
	end

	local message = table.concat(args, ' ')
	write_ooc(source, message)

end, false)

RegisterCommand('twt', function(source, args, rawCommand)
	if source == 0 then
		print('rpchat: you can\'t use this command from rcon!')
		return
	end

	local message = table.concat(args, ' ')
	write_twt(source, message)

end, false)

RegisterCommand('me', function(source, args, rawCommand)
	if source == 0 then
		print('rpchat: you can\'t use this command from rcon!')
		return
	end

	local message = table.concat(args, ' ')
	write_me(source, message)

end, false)

RegisterCommand('do', function(source, args, rawCommand)
	if source == 0 then
		print('rpchat: you can\'t use this command from rcon!')
		return
	end

	local message = table.concat(args, ' ')
	write_do(source, message)

end, false)

RegisterCommand('report', function(source, args, rawCommand)
	if source == 0 then
		print('rpchat: you can\'t use this command from rcon!')
		return
	end

	local message = table.concat(args, ' ')
	write_report(source, message)

end, false)

function GetCharacterName(source)
	local identity = Player(source).state.identity

        if identity ~= nil then
		if Config.OnlyFirstname then
			return result[1].firstname
		else
			return ('%s %s'):format(identity.firstname, identity.lastname)
		end
	else
		return GetPlayerName(source)
        end
end
