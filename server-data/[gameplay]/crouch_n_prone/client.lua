-- Script Created by Giant Cheese Wedge (AKA Blü)
-- Script Modified and fixed by Hoopsure

ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

crouchKey = 36 -- CTRL
local currentState = "stand"

function getGait()
	local gait = ESX.GetPlayerData().gait
	if gait == nil then
		gait = "MOVE_M@TOUGH_GUY@"
	end

	return gait
end

function setState(state)
	local ped = PlayerPedId()

	if state == currentState then
		return
	end

	if (IsPedInAnyVehicle(ped, true) or IsPedSwimming(ped) or IsEntityInAir(ped) or IsEntityDead(ped) or IsEntityAttached(ped)) then
		if state ~= "stand" then
			return
		end
		ClearPedTasks(ped)
	end

--	print("Crouch state transition: "..currentState.." -> "..state)

	if state == "crouch" and currentState == "stand" then
		while ( not HasAnimSetLoaded( "move_ped_crouched" ) ) do
			RequestAnimSet( "move_ped_crouched" )
			Citizen.Wait( 100 )
		end

		ResetPedMovementClipset( ped )
		ResetPedStrafeClipset(ped)
		SetPedMovementClipset( ped, "move_ped_crouched", 0.55 )
		SetPedStrafeClipset(ped, "move_ped_crouched_strafing")
		currentState = "crouch"
		return
	end

	if state == "stand" and currentState == "crouch" then
		local gait = getGait()

		while ( not HasAnimSetLoaded( gait ) ) do
			RequestAnimSet(gait)
			Citizen.Wait( 100 )
		end

		ResetPedMovementClipset( ped )
		ResetPedStrafeClipset(ped)
		SetPedMovementClipset( ped, gait, 0.5)

		currentState = "stand"
		return
	end

	if state == "stand" and currentState == "prone" then
		local gait = getGait()
		while ( not HasAnimSetLoaded( gait ) ) do
			RequestAnimSet(gait)
			Citizen.Wait( 100 )
		end

		ResetPedMovementClipset( ped )
		ResetPedStrafeClipset(ped)
		SetPedMovementClipset( ped, gait, 0.5)

		SetPedToRagdoll(ped, 10, 10, 0, 0, 0, 0)
		Citizen.Wait(1000)
		ClearPedTasks(ped)
		Citizen.Wait( 100 )
		currentState = "stand"
		return
	end

	if state == "prone" and currentState == "crouch" then
		while ( not HasAnimSetLoaded( "move_crawl" ) ) do
			RequestAnimSet("move_crawl")
			Citizen.Wait( 100 )
		end

		local gait = getGait()
		while ( not HasAnimSetLoaded( gait ) ) do
			RequestAnimSet(gait)
			Citizen.Wait( 100 )
		end

		ResetPedMovementClipset( ped )
		ResetPedStrafeClipset(ped)
		SetPedMovementClipset( ped, gait, 0.5)

		SetProned()
		currentState = "prone"
		return
	end

	print("Incorrect crouch state transition: "..currentState.." -> "..state)

end
Citizen.CreateThread( function()
	while true do
		Citizen.Wait( 100 )
		local ped = GetPlayerPed( -1 )

		if IsPedInAnyVehicle(ped, true) or IsPedSwimming(ped) or IsEntityInAir(ped) or IsEntityDead(ped) or IsEntityAttached(ped) then
			setState("stand")
		end
	end
end)

function pedDive(ped)
	ClearPedTasksImmediately(ped)
	TaskPlayAnim(ped, "move_jump", "dive_start_run", 8.0, 1.0, -1, 0, 0.0, 0, 0, 0)
	Citizen.Wait(1200)
	SetPedToRagdoll(PlayerPedId(), 1000, 1000, 0, 0, 0, 0)
end

function pedTick(ped)
	ProneMovement()

	if IsPauseMenuActive() then
		return
	end

	if IsControlJustPressed(0, 20) and IsControlPressed(0, 21) and currentState == "stand" and (IsPedSprinting(ped) or IsPedRunning(ped)) and GetEntitySpeed(ped) > 5 and
	(not IsPedInAnyVehicle(ped, true) and not IsPedFalling(ped) and not IsPedDiving(ped) and not IsPedInCover(ped, false) and
	not IsPedInParachuteFreeFall(ped) and (GetPedParachuteState(ped) == 0 or GetPedParachuteState(ped) == -1) ) then
		pedDive(ped)
		return
	end


	if IsControlJustPressed(0, crouchKey) then

		if currentState == "stand" then
			setState("crouch")
		elseif currentState == "crouch" then
			setState("prone")
		elseif currentState == "prone" then
			setState("stand")
		end

	elseif IsControlJustPressed(0, 73) then
		setState("stand")
		ClearPedTasks(ped)
	end
end

Citizen.CreateThread( function()
	while true do
		Citizen.Wait( 0 )
		local ped = GetPlayerPed(-1)

		if GetPedStealthMovement(ped) then
			SetPedStealthMovement(ped, 0, 0)
		end

		if DoesEntityExist(ped) and not IsEntityDead(ped) then
			pedTick(ped)
		end
	end
end)

function SetProned()
	ped = PlayerPedId()
	ClearPedTasks(ped)

	RequestAnimSet( "move_crawl" )
	while ( not HasAnimSetLoaded( "move_crawl" ) ) do
		Citizen.Wait( 100 )
	end

	TaskPlayAnim(ped, "move_crawl", "onfront_fwd", 	1.0, 0.1, -1, 2, 0)
	Citizen.Wait(1000)
end


function headingChange(ped)
	if IsControlPressed(0, 34) then
		SetEntityHeading(ped, GetEntityHeading(ped)+2.0 )
	elseif IsControlPressed(0, 35) then
		SetEntityHeading(ped, GetEntityHeading(ped)-2.0 )
	end
end

function ProneMovement()
	ped = PlayerPedId()

	if currentState == 'prone' then

		if IsControlPressed(0, 32) then
			TaskPlayAnim(ped, "move_crawl", "onfront_fwd", 	8.0, 0.0, -1, 1, 0)
		        while ( GetEntityAnimCurrentTime( ped, "move_crawl", "onfront_fwd") < 0.99 ) do
				if currentState ~= 'prone' then
					break
				end

				headingChange(ped)

				if IsControlJustPressed(0, 73) then
					setState("stand")
					ClearPedTasks(ped)
					return
				end

				Citizen.Wait(0)
			end

			while IsControlPressed(0, 32) do
				if currentState ~= 'prone' then
					break
				end

				headingChange(ped)

				if IsControlJustPressed(0, 73) then
					setState("stand")
					ClearPedTasks(ped)
					return
				end

				Citizen.Wait( 0 )
			end

			TaskPlayAnim(ped, "move_crawl", "onfront_fwd", 	1.0, 0.0, -1, 2, 0)
		elseif IsControlPressed(0, 33) then
			TaskPlayAnim(ped, "move_crawl", "onfront_bwd", 	8.0, 0.0, -1, 1, 0)
		        while ( GetEntityAnimCurrentTime( ped, "move_crawl", "onfront_bwd") < 0.99 ) do
				if currentState ~= 'prone' then
					break
				end

				headingChange(ped)

				if IsControlJustPressed(0, 73) then
					setState("stand")
					ClearPedTasks(ped)
					return
				end

				Citizen.Wait(0)
			end

			while IsControlPressed(0, 33) do
				if currentState ~= 'prone' then
					break
				end

				headingChange(ped)

				if IsControlJustPressed(0, 73) then
					setState("stand")
					ClearPedTasks(ped)
					return
				end

				Citizen.Wait( 0 )
			end

			TaskPlayAnim(ped, "move_crawl", "onfront_bwd", 	1.0, 0.0, -1, 2, 0)
		end
	end
end
