RegisterNetEvent('nova-ui:showPlayerHealth')
AddEventHandler('nova-ui:showPlayerHealth', function(personInfo, damageMap)
	CloseScreen('playerinfo')
	OpenScreen('health')
	SendNUIMessage({
		query = 'health/show',
		personInfo = personInfo,
		damageMap = damageMap
	})
	
end)

