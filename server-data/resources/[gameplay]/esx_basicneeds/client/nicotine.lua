AddEventHandler('esx_basicneeds:resetStatus', function()
	TriggerEvent('esx_status:set', 'nicotine', 0)
	TriggerEvent('esx_status:set', 'nicotineLong', 0)
end)

AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'nicotine', 0, '#cadfff', function(status)
		return true
	end, function(status)
		status.remove(100)
	end)

	TriggerEvent('esx_status:registerStatus', 'nicotineLong', 0, '#755c48', function(status)
		return true
	end, function(status)
		status.remove(10)
	end)

    -- Citizen.CreateThread(function(val)
	-- 	while true do
    --         Citizen.Wait(1)
    --         TriggerEvent('esx_status:getStatus', 'nicotinel', function(status)
	-- 			NicotineVal = status.val
    --         end)

    --         if NicotineVal >= 900000 then
    --         TriggerEvent('esx_basicneeds:nicotineAdd', val / 100)
    --         elseif NicotineVal >= 800000 then
    --         TriggerEvent('esx_basicneeds:nicotineAdd', val / 80)
    --         elseif NicotineVal >= 700000 then
    --         TriggerEvent('esx_basicneeds:nicotineAdd', val / 60)
    --         elseif NicotineVal >= 600000 then
    --         TriggerEvent('esx_basicneeds:nicotineAdd', val / 40)
    --         elseif NicotineVal >= 500000 then
    --         TriggerEvent('esx_basicneeds:nicotineAdd', val / 20)
    --         else
    --             Citizen.Wait(3000)
    --         end
    --     end
    -- end)
end)

RegisterNetEvent ('esx_basicneeds:nicotineAdd')
AddEventHandler('esx_basicneeds:nicotineAdd', function (val)
    TriggerEvent('esx_status:add', 'nicotine', val*10000)
    TriggerEvent('esx_status:add','nicotineLong', val*100)
end)

RegisterNetEvent('esx_basicneeds:smoking')
AddEventHandler('esx_basicneeds:smoking', function(val)
    local smoking = TriggerEvent('dpemotes:emote', "smoke2")
    Citizen.Wait(1000)
    local playerPed  = PlayerPedId()
    if smoking then
        for i = 0,30 do
            if IsEntityPlayingAnim(playerPed, "amb@world_human_aa_smoke@male@idle_a", "idle_c", 3) then
                TriggerEvent('esx_basicneeds:nicotineAdd', val / 30)
                TriggerServerEvent("stress:remove", 7000)
                Citizen.Wait(1000)
            else
                break
            end
        end
        Citizen.Wait(30000)
        ClearPedTasks(playerPed)
    end
end)

RegisterNetEvent('esx_basicneeds:nicotinePatch')
AddEventHandler('esx_basicneeds:nicotinePatch', function(val)
    local nicotinePatch = TriggerEvent('dpemotes:emote', "uncuff")
    Citizen.Wait(1000)
    local playerPed  = PlayerPedId()
    if nicotinePatch then
        TriggerEvent('esx_status:add', 'nicotine', val*10000)
        Citizen.Wait(1000)
        ClearPedTasks(playerPed)
    end
end)

RegisterNetEvent('esx_basicneeds:vape')
AddEventHandler('esx_basicneeds:vape', function(val)
    local vaping = TriggerEvent("Vape:Drag")
    Citizen.Wait(1000)
    local playerPed  = PlayerPedId()
    if vaping then
        TriggerEvent('esx_basicneeds:nicotineAdd', 3)
        TriggerServerEvent("stress:remove", 5000)
        Citizen.Wait(1000)
    end
end)
