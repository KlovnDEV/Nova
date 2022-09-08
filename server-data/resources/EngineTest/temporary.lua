ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)


ESX.RegisterCommand('setstatus', 'admin', function(xPlayer, args, showError)
	TriggerEvent('engine:status:set', args.player.source, args.status, args.value)
	TriggerClientEvent('chat:addMessage', args.player.source, { args = { '^1SYSTEM', 'Выполнено.' } })

end, true, {help = "Установить значение статуса", validate = true, arguments = {
	{name = 'player', help = "Игрок", type = 'player'},
	{name = 'status', help = "Имя статуса", type = 'string'},
	{name = 'value', help = "Значение", type = 'number'},
}})
