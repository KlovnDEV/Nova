ESX.RegisterCommand('delrole', 'admin', function(xPlayer, args, showError, showInfo)
	ESX.Roles.Remove(args.playerId.identifier, args.rolename)
	showInfo('Success.')

end, true, {help = "Удалить роль игрока", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'rolename', help = "Роль", type = 'string'},
}})

ESX.RegisterCommand('setrole', 'admin', function(xPlayer, args, showError, showInfo)
	if args.rolegrade == nil or args.rolegrade < 0 then
		showError('Incorrect role grade.')
		return
	end

	ESX.Roles.Set(args.playerId.identifier, args.rolename, args.rolegrade)
	showInfo('Success.')

end, true, {help = "Задать роль игрока", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
	{name = 'rolename', help = "Роль", type = 'string'},
	{name = 'rolegrade', help = "Грейд", type = 'number'},
}})

ESX.RegisterCommand('roles', 'admin', function(xPlayer, args, showError, showInfo)
	local roles = ESX.Roles.Get(args.playerId.identifier)
	showInfo('Roles:' .. json.encode(roles))

end, true, {help = "Просмотреть роли игрока", validate = true, arguments = {
	{name = 'playerId', help = "Игрок", type = 'player'},
}})
