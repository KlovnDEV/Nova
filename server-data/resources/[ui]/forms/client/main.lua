isMenuActive = false

RegisterNetEvent('forms:hide')
AddEventHandler('forms:hide', function()
	SendNUIMessage(
	{
		['hide'] = true,
	})
	SetNuiFocus(false)
	isMenuActive = false
end)


RegisterNetEvent('forms:show')
AddEventHandler('forms:show', function(json)
	SetNuiFocus(true, true)
	SendNUIMessage({
		['show'] = true,
		['json'] = json
	})
	isMenuActive = true
end)

Citizen.CreateThread(function()
	while true do
		if isMenuActive then
			DisableAllControlActions(0);
			Citizen.Wait(0);
		else
			Citizen.Wait(100);
		end
	end

end)

-- Testing


Citizen.CreateThread(function()
	SetNuiFocus(false)
	while true do
		Citizen.Wait(0)
		if IsControlJustReleased(0, 170) then
			local text = LoadResourceFile(GetCurrentResourceName(), "html/test.json")
			TriggerEvent('forms:show', text)
		end
	end
end)

RegisterNUICallback('onClose', function(data, cb)
	TriggerEvent('forms:hide')
end)

RegisterNUICallback('onSubmit', function(data, cb)
	TriggerEvent('forms:hide')
end)

