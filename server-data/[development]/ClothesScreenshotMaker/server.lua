RegisterNetEvent('api_test:save')
AddEventHandler('api_test:save', function(id)
--	SaveResourceFile('api_test','screens/'..tostring(id)..'.b64', data, data.length)

	exports['screenshot-basic']:requestClientScreenshot(source, {
	    fileName = 'cache/'..tostring(id)..'.jpg'
	}, function(err, data)
	    print('err', err)
	    print('data', data)
	end)
end)
