local carhudShown = false
local seatbeltOn = -1

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(100)
		seatbeltOn = LocalPlayer.state.seatbelt_on
	end
end)

Citizen.CreateThread(function()
	Citizen.Wait(1000)

	while true do
		Citizen.Wait(0)
		local ped = GetPlayerPed(-1)

		if IsPedInAnyVehicle(ped, false) then

			carhudShown = true

			local car = GetVehiclePedIsIn(ped, false)
			local speed = math.ceil(GetEntitySpeed(car) * 3.6)

			local fuelMax = GetVehicleHandlingFloat(car, "CHandlingData", "fPetrolTankVolume")
			if fuelMax <= 0 then
				fuelMax = 100.0
			end

			local fuel = math.floor(GetVehicleFuelLevel(car)+0.0) / fuelMax

			MakeDifferentialQuery({
				query = "indicators/car",
				speed = speed,
				fuel = fuel,
				belt = seatbeltOn,
			})

		else
			if carhudShown then
				carhudShown = false
				SendNUIMessage({
					query = "indicators/car/hide"
				})
			end
		end
	end
end)

--[[
Citizen.CreateThread(function()
	local delayTime = 500

	while true do
		Citizen.Wait(delayTime)
		local playerPed = GetPlayerPed(-1)
		local playerVeh = GetVehiclePedIsIn(playerPed, false)
		if playerVeh ~= 0 then
			delayTime = 150
			if ShowBigMap == false then
				if ShowHud == false then
					ShowHud = true
					SendNUIMessage({action = "toggleCar", show = true})
				end
				SendNUIMessage({action = "showHud", show = true})
			else
				SendNUIMessage({action = "showHudMap", show = true})
			end
			fuel = math.floor(GetVehicleFuelLevel(playerVeh)+0.0)
			SendNUIMessage({action = "updateGas", key = "gas", value = fuel})
			SwitchRadar(true)
			if not ShowBigMap then
				SetRadarBigmapEnabled(false, false)
			end
			location = false
		else
			delayTime = 500
			if ShowHud == true then
				ShowHud = false
				SendNUIMessage({action = "toggleCar", show = false})
			end
			if not FixedPosition then
				if SwitchHud == false then
					SwitchHud = true
					SendNUIMessage({action = "showHud", show = true})
				end
			end
			SwitchRadar(false)
			if IsControlPressed(1, 243) then
				SwitchRadar(true)
				SetRadarBigmapEnabled(true, false)
				SendNUIMessage({action = "toggleAllHud", show = true})
				SendNUIMessage({action = "showHudMap", show = true})
				location = true
			else
				SendNUIMessage({action = "toggleAllHud", show = false})
				if not FixedPosition then
					SendNUIMessage({action = "showHudMap", show = false})
				end
				location = false
				if not ShowBigMap then
					SetRadarBigmapEnabled(false, false)
				end
			end
		end
	end
end)
]]--