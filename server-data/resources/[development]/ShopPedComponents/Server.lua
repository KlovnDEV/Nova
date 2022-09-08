RegisterNetEvent('api_test:save')
AddEventHandler('api_test:save', function(id, data)
	SaveResourceFile('api_test','screens/'..tostring(id)..'.b64', data, data.length)
end)
