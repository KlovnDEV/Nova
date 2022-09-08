AddEventHandler('esx_basicneeds:resetStatus', function()
	TriggerEvent('esx_status:set', 'drugs', 0)
	TriggerEvent('esx_status:set', 'drugsLong', 0)
end)

AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'drugs', 0, '#cadfff', function(status)
		return true
	end, function(status)
		status.remove(100)
	end)

	TriggerEvent('esx_status:registerStatus', 'drugsLong', 0, '#755c48', function(status)
		return true
	end, function(status)
		status.remove(5)
	end)
end)

RegisterNetEvent ('esx_basicneeds:drugAdd')
AddEventHandler('esx_basicneeds:drugAdd', function (val)
    TriggerEvent('esx_status:add', 'drugs', val*10000)
    TriggerEvent('esx_status:add','drugsLong', val*300)
end)

RegisterNetEvent('esx_basicneeds:antiDrugs')
AddEventHandler('esx_basicneeds:antiDrugs', function(val)
    TriggerEvent('esx_status:add', 'drugs', val*10000)
end)

RegisterNetEvent('esx_basicneeds:sedative')
AddEventHandler('esx_basicneeds:sedative', function(val)
    local nicotinePatch = TriggerEvent('dpemotes:emote', "uncuff")
    Citizen.Wait(1000)
    local playerPed  = PlayerPedId()
    if nicotinePatch then
        TriggerEvent('esx_status:add', 'drugsLong', val*60)
        TriggerServerEvent('stress:remove', 200000)
        Citizen.Wait(1000)
        ClearPedTasks(playerPed)
    end
end)

RegisterNetEvent ('esx_basicneeds:drugRemove')
AddEventHandler('esx_basicneeds:drugRemove', function (val)
    TriggerEvent('esx_status:add', 'drugs', val*10000)
    TriggerEvent('esx_status:remove','drugsLong', val*300)
end)

RegisterNetEvent('esx_basicneeds:antitox')
AddEventHandler('esx_basicneeds:antitox', function(val)
    local nicotinePatch = TriggerEvent('dpemotes:emote', "uncuff")
    Citizen.Wait(1000)
    local playerPed  = PlayerPedId()
    if nicotinePatch then
        TriggerEvent('esx_basicneeds:drugRemove', val*60)
        TriggerServerEvent('stress:add', 1000000)
        Citizen.Wait(1000)
        ClearPedTasks(playerPed)
    end
end)
