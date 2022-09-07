RegisterNetEvent('nova-ui:showCarShop')
AddEventHandler('nova-ui:showCarShop', function(categories)
	SendNUIMessage({
		query = 'carshop/show',
		categories = categories
	})

	OpenScreen('carshop')
end)


RegisterNUICallback('carshopPreview', function(data, cb)

	print(json.encode(data))

	if data == nil then
		return
	end

	TriggerEvent('carshops:previewCar', data)
	
	cb('')
end)
