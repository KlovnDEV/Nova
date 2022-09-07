local IsAlreadyDrunk = false
local DrunkLevel     = -1

function Drunk(level, start)
	Citizen.CreateThread(function()
        local playerPed = GetPlayerPed(-1)

		if start then
--			DoScreenFadeOut(800)
			SetTransitionTimecycleModifier('DRUNK', 3.5)
--			Wait(1000)
		else
			SetTransitionTimecycleModifier('DRUNK', 0.35)
		end

		local anim = nil

		if level > 8 then
			anim = "move_m@drunk@verydrunk"
		elseif level > 6 then
			anim = "move_m@drunk@moderatedrunk"
		elseif level > 4 then
			anim = "move_m@drunk@slightlydrunk"
		end

		if anim ~= nil then
			RequestAnimSet(anim)
			while not HasAnimSetLoaded(anim) do
				Citizen.Wait(0)
			end
			SetPedMovementClipset(playerPed, anim, true)
		else
			ResetPedMovementClipset(playerPed, 0)
		end

		SetPedIsDrunk(playerPed, true)

		SetTimecycleModifierStrength(level/15.0)
--		SetTimecycleModifier("spectator5")
		SetPedMotionBlur(playerPed, true)

	end)
end

Citizen.CreateThread(function()

    while true do
        Citizen.Wait(1000)
        while DrunkLevel > 0 do
            Citizen.Wait(Config.Power)
            local PlayerPed = PlayerPedId()
            if IsPedInAnyVehicle(PlayerPed, false) then
                drunkInCar()
            end
        end
    end

end)

function drunkInCar()
    local PlayerPed = PlayerPedId()
    local vehicle = GetVehiclePedIsIn(PlayerPed, false)
    if GetPedInVehicleSeat(vehicle, -1) == PlayerPed and DrunkLevel > 6 then
        local class = GetVehicleClass(vehicle)
        local speed = GetEntitySpeed(vehicle)

        if speed ~= 0 and class ~= 15 and class ~= 16 and class ~= 21 and class ~= 13  then
            local drunkMov = randomDrunk()
            TaskVehicleTempAction(PlayerPed, vehicle, drunkMov.interaction, drunkMov.time)
        end
    end
end

function randomDrunk()
	math.randomseed(GetGameTimer())
	local random = math.random(1, #Config.RandomVehicleInteraction)
	return Config.RandomVehicleInteraction[random]
end

function Reality()
	Citizen.CreateThread(function()
		local playerPed = GetPlayerPed(-1)

--		DoScreenFadeOut(800)
		Wait(1000)

		SetTransitionTimecycleModifier('default', 3.5)
--		ClearTimecycleModifier()
		ResetScenarioTypesEnabled()
		ResetPedMovementClipset(playerPed, 0)
		SetPedIsDrunk(playerPed, false)
		SetPedMotionBlur(playerPed, false)
		Wait(3500)

--		DoScreenFadeIn(800)
	end)
end

AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'drunk', 0, '#8F15A5',  function(status)
		return status.val > 0
	end, function(status)
		status.remove(1500)
	end)

	Citizen.CreateThread(function()
		while true do
			Wait(1000)
			TriggerEvent('esx_status:getStatus', 'drunk', function(status)
				if status.val > 0 then
					local level = math.floor(status.val / 100000)

					if level ~= DrunkLevel then
						Drunk(level, not IsAlreadyDrunk)
					end

					IsAlreadyDrunk = true
					DrunkLevel     = level

				elseif status.val == 0 then
					if IsAlreadyDrunk then
						Reality()
					end

					IsAlreadyDrunk = false
					DrunkLevel     = -1
				end
			end)
		end
	end)

end)

RegisterNetEvent('esx_optionalneeds:onDrink')
AddEventHandler('esx_optionalneeds:onDrink', function(val)
	local playerPed = GetPlayerPed(-1)
	TaskStartScenarioInPlace(playerPed, "WORLD_HUMAN_DRINKING", 0, 1)
    TriggerEvent('esx_status:set', 'alcohol', val*10000)
	TriggerEvent('esx_status:set', 'alcoholLong', val*300)
	Citizen.Wait(1000)
	ClearPedTasks(playerPed)
end)

-- Алкоголизм

AddEventHandler('esx_basicneeds:resetStatus', function()
	TriggerEvent('esx_status:set', 'alcohol', 0)
	TriggerEvent('esx_status:set', 'alcoholLong', 0)
end)

AddEventHandler('esx_status:loaded', function(status)

	TriggerEvent('esx_status:registerStatus', 'alcohol', 0, '#12a102', function(status)
		return true
	end, function(status)
		status.remove(100)
	end)

	TriggerEvent('esx_status:registerStatus', 'alcoholLong', 0, '#0a5702', function(status)
		return true
	end, function(status)
		status.remove(5)
	end)
end)
