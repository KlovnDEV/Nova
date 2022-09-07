ESX.RegisterCommand('revive', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx:revive', args.playerId.source)

end, true, {help = _U('command_giveitem'), validate = true, arguments = {
	{name = 'playerId', help = _U('commandgeneric_playerid'), type = 'player'}
}})

ESX.RegisterCommand('heal', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('esx:heal', args.playerId.source, 100)

end, true, {help = _U('command_giveitem'), validate = true, arguments = {
	{name = 'playerId', help = _U('commandgeneric_playerid'), type = 'player'}
}})
