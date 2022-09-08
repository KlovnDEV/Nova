AddEventHandler('esx_status:loaded', function(status)
    TriggerEvent('esx_status:registerStatus', 'stress', 0, '##38cf44', function(status)
		return false
	end, function(status)
		status.add(1)
	end)

    Citizen.CreateThread(function()
		while true do
            Citizen.Wait(1)
            local ped = PlayerPedId()

            TriggerEvent('esx_status:getStatus', 'stress', function(status)
				StressVal = status.val
            end)

            -- if StressVal == 1000000 then -- Максимальный показатель
			-- 	SetTimecycleModifier("WATER_silty") -- Размытие
			-- 	SetTimecycleModifierStrength(1)
			-- else
			-- 	ClearExtraTimecycleModifier()
			-- end

            if StressVal >= 900000 then
				local veh = GetVehiclePedIsUsing(ped)
                local speed = GetEntitySpeed(veh)
			  	if IsPedInAnyVehicle(ped) and GetPedInVehicleSeat(veh, -1) == ped and speed ~= 0 then -- Если игрок управляет автомобилем
					Citizen.Wait(1000)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15) -- Тряска камеры
					TaskVehicleTempAction(ped, veh, 4, 250) -- Дергания налево
					Citizen.Wait(500)
					TaskVehicleTempAction(ped, veh, 5, 250) -- Дергания направо
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
                    ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
                    ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
                    Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
                    Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
                    Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
			  	else
					Citizen.Wait(1500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.15)
			  	end
			elseif StressVal >= 800000 then
				local veh = GetVehiclePedIsUsing(ped)
			  	if IsPedInAnyVehicle(ped) and GetPedInVehicleSeat(veh, -1) == ped then
					Citizen.Wait(1000)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.10)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.10)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.10)
			  	else
					Citizen.Wait(1500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.10)
			  	end
			elseif StressVal >= 700000 then
				local veh = GetVehiclePedIsUsing(ped)
			  	if IsPedInAnyVehicle(ped) and GetPedInVehicleSeat(veh, -1) == ped then
					Citizen.Wait(1000)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
					Citizen.Wait(500)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
			  	else
					Citizen.Wait(2000)
					ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
			  	end
			elseif StressVal >= 600000 then
				Citizen.Wait(2500)
				ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
			elseif StressVal >= 500000 then
				Citizen.Wait(3500)
				ShakeGameplayCam('VIBRATE_SHAKE', 0.07)
			elseif StressVal >= 350000 then
				Citizen.Wait(5500)
				ShakeGameplayCam('VIBRATE_SHAKE', 0.05)
			elseif StressVal >= 200000 then
				Citizen.Wait(6500)
                ShakeGameplayCam('VIBRATE_SHAKE', 0.03)
            else
                Citizen.Wait(3000)
            end
        end
    end)
end)

Citizen.CreateThread(function() -- Прицеливание
    while true do
        local ped = PlayerPedId()
        local status = GetPedConfigFlag(ped, 78, 1)

        if status then
            TriggerServerEvent("stress:add", 5000)
            Citizen.Wait(5000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() -- Если оружие в руках
    while true do
        local ped = PlayerPedId()
        local status = IsPedArmed(ped, 4)

        if status then
            TriggerServerEvent("stress:add", 10000)
            Citizen.Wait(15000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() -- Если игрок стреляет
    while true do
        local ped = PlayerPedId()
        local status = IsPedShooting(ped)
        local silenced = IsPedCurrentWeaponSilenced(ped)

        if status and not silenced then
            TriggerServerEvent("stress:add", 100000)
            Citizen.Wait(2000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() -- Если игрок слышит\видит стрельбу или удары в мили
    while true do
        local ped = PlayerPedId()
        local status = GetPedAlertness(ped)

        if status == 1 then
            TriggerServerEvent("stress:add", 10000)
            Citizen.Wait(10000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() --  Если игрок дерется в мили
    while true do
        local ped = PlayerPedId()
        local status = IsPedInMeleeCombat(ped)

        if status then
            TriggerServerEvent("stress:add", 5000)
            Citizen.Wait(5000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() -- Если здоровье меньше 50%
    while true do
        local ped = PlayerPedId()
        local amount = (GetEntityHealth(ped)-100)

        if amount <= 50 then
            TriggerServerEvent("stress:add", 8000)
            Citizen.Wait(15000)
        else
            Citizen.Wait(1)
        end
    end
end)

Citizen.CreateThread(function() -- Если игрок гуляет по местам отдыха
    for _, zone in pairs(Config.ChillZones) do
        local blip = AddBlipForRadius(zone.Pos, zone.Radius)
        SetBlipColour(blip, 3)
        SetBlipAlpha(blip, 100)
        zone.blip = blip
    end
    while true do
        local ped = PlayerPedId()
        local status_w = IsPedArmed(ped, 4)
        -- local status_v = IsPedInAnyVehicle(ped, false)
        local playerloc = GetEntityCoords(ped)
        local currentChillZone = nil
        for _, zone in pairs(Config.ChillZones) do
         local distanceChillZone = GetDistanceBetweenCoords(zone.Pos, playerloc, true)
         if distanceChillZone < zone.Radius then
            currentChillZone = zone
            SetBlipColour(zone.blip, 0)
            break
         end
        end
        if not status_w and currentChillZone then
            Citizen.Wait(15000)
            if currentChillZone.Chill > 0 then
                TriggerServerEvent("stress:remove", currentChillZone.Chill)
            elseif currentChillZone.Chill < 0 then
                TriggerServerEvent("stress:add", -currentChillZone.Chill)
            end
            Citizen.Wait(15000)
        else
            Citizen.Wait(0)
        end
    end
end)

Citizen.CreateThread(function() -- Прыжки с парашутом
    while true do
        local ped = PlayerPedId()
        local status = GetPedParachuteState(ped)

        if status == 0 then -- Свободное падение
            TriggerServerEvent("stress:add", 60000)
            Citizen.Wait(5000)
        elseif status == 1 or status == 2 then -- Открытие парашута
            TriggerServerEvent("stress:add", 5000)
            Citizen.Wait(5000)
        else
            Citizen.Wait(5000)
        end
    end
end)

Citizen.CreateThread(function() -- Анимация
    while true do
        local ped = PlayerPedId()
        local status = IsEntityPlayingAnim(ped, "smoke", "smoke2", 3)

        if status then
            Citizen.Wait(20000)
            TriggerServerEvent("stress:remove", 200000)
        else
            Citizen.Wait(1)
        end
    end
end)

function AddStress(method, value, seconds)
    if method:lower() == "instant" then
        TriggerServerEvent("stress:add", value)
    elseif method:lower() == "slow" then
        local count = 0
        repeat
            TriggerServerEvent("stress:add", value/seconds)
            count = count + 1
            Citizen.Wait(1000)
        until count == seconds
    end
end

function RemoveStress(method, value, seconds)
    if method:lower() == "instant" then
        TriggerServerEvent("stress:remove", value)
    elseif method:lower() == "slow" then
        local count = 0
        repeat
            TriggerServerEvent("stress:remove", value/seconds)
            count = count + 1
            Citizen.Wait(1000)
        until count == seconds
    end
end
