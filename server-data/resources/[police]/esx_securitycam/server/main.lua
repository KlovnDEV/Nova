ESX = nil

locationHacked = {
	["police"] = false,
	["bank"] = false,
}

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('esx_securitycam:unhackanimserver')
AddEventHandler('esx_securitycam:unhackanimserver', function()
	local _source = source
	TriggerClientEvent('esx_securitycam:unhackanim', _source)
end)

RegisterServerEvent('esx_securitycam:setLocationHackedState')
AddEventHandler('esx_securitycam:setLocationHackedState', function(location, state)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)
	print(('esx_securitycam: %s has set the "%s" cameras to %s!'):format(xPlayer.identifier, location, state))
	TriggerClientEvent('esx_securitycam:setLocationHackedState', -1, location, state)
end)


RegisterServerEvent('esx_securitycam:setCameraBroken')
AddEventHandler('esx_securitycam:setCameraBroken', function(location, cam_index)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)
--	print(('esx_securitycam: %s has set the location "%s" cameras to %s!'):format(xPlayer.identifier, location, state))
	if location == "police" or location == "bank" then
		TriggerClientEvent('esx_securitycam:setCameraBrokenTimer', -1, location, cam_index, Config.CameraBreakTimer)
	end
end)

TriggerEvent('es:addGroupCommand', 'securitycam_markers', 'admin', function(source, args, user)
	local en = args[1]
	if en ~= nil then
		en = tonumber(en)
	end
	TriggerClientEvent('esx_securitycam:securitycam_markers', source, en)

end, function(source, args, user)
	TriggerClientEvent('chat:addMessage', source, { args = { '^1SYSTEM', 'Insufficient Permissions.' } })
end, { help = "Показывать маркеры расположения камер", params = {{ name = '1/0' }} })
