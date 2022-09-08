ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
	LocalPlayer.state.seatbelt_on = -1
end)

isUIOpen = false
speedBuffer = {0.0, 0.0}
velBuffer = {vector3(0, 0, 0), vector3(0, 0, 0)}
beltOn = false
wasInCar = false

AddEventHandler("seatbelt_lua:isBeltOn", function(cb)
	if IsPedInAnyVehicle(PlayerPedId(), false) then
	        local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)
		if not IsCar(vehicle) then
			cb(nil)
			return
		end
		cb(beltOn)
		return
	end

	cb(nil)
end)

function IsCar(vehicle)
    local vc = GetVehicleClass(vehicle)
    return (vc >= 0 and vc <= 7) or (vc >= 9 and vc <= 12) or (vc >= 17 and vc <= 20)
end

function NUIBuckled(value)
    local data = {}
    data.transactionType = "isBuckled"
    data.transactionValue = value
    data.inCar = wasInCar
    SendNUIMessage(data)
end

function ForwardVelocity(ent)
    local hdg = GetEntityHeading(ent)
    if hdg < 0.0 then hdg = hdg + 360.0 end

    hdg = hdg * 0.0174533

    return {math.cos(hdg) * 2.0, math.sin(hdg) * 2.0}
end

-- Death Tick
Citizen.CreateThread(function()
    while true do
        if IsPlayerDead(PlayerId()) and isUIOpen == true then
            isUIOpen = false
        end
        Citizen.Wait(100)
    end
end)

-- Belt key control
Citizen.CreateThread(function()
    while true do
        if wasInCar and IsControlJustPressed(0, Config.SeatbeltKey) then
            beltOn = not beltOn

            if beltOn then
                    LocalPlayer.state.seatbelt_on = 1
		else
                    LocalPlayer.state.seatbelt_on = 0
		end

            if Config.ShowNotification then
                if beltOn then
                   TriggerEvent('esx:showNotification', _U('seatbelt_on'))
                else
                   TriggerEvent('esx:showNotification', _U('seatbelt_off'))
                end
            end
            NUIBuckled(beltOn)
            Citizen.Wait(3000)
        end

	Citizen.Wait(0)
    end
end)

-- On Tick
Citizen.CreateThread(function()
    Citizen.Wait(1000)

    while true do
        local playerPed = GetPlayerPed(-1)
        local vehicle = GetVehiclePedIsIn(playerPed, false)
        local isCar = IsCar(vehicle)

        if vehicle > 0 and (wasInCar or isCar) then
            if not wasInCar then
                LocalPlayer.state.seatbelt_on = 0
            end

            wasInCar = true
            if not isUIOpen and not IsPlayerDead(playerPed) then
                isUIOpen = true
                NUIBuckled(beltOn)
            end

            -- If seat belt is on, keep them from exiting vehicle
            if beltOn then
                -- Disables INPUT_VEH_EXIT // default: "F"
                DisableControlAction(0, 75, true)
            end

            if IsControlJustPressed(0, 170) and not beltOn then
                TriggerEvent("SeatShuffle")
            end

            speedBuffer[2] = speedBuffer[1]
            speedBuffer[1] = GetEntitySpeed(vehicle)

            if not beltOn and
                GetEntitySpeedVector(vehicle, true).y > 1.0 and
		speedBuffer[2] > Config.MinimalDropSpeed/3.6 and
                (speedBuffer[2] - speedBuffer[1]) > (speedBuffer[2] * (1-Config.DropSensitivity)) then
                    local coords = GetEntityCoords(playerPed, true)
                    local fw = ForwardVelocity(playerPed)
                    SetEntityCoords(playerPed, coords.x + fw[1], coords.y + fw[2], coords.z - 0.47, true, true, true, true)
                    SetEntityVelocity(playerPed, velBuffer[2].x, velBuffer[2].y, velBuffer[2].z)
                    Citizen.Wait(1)
                    SetPedToRagdoll(GetPlayerPed(-1), 3000, 3000, 0, false, false, false)
                    TriggerServerEvent("stress:add", 100000)
            end

            velBuffer[2] = velBuffer[1]
            velBuffer[1] = GetEntityVelocity(vehicle)

        elseif wasInCar == true then
            wasInCar = false
            beltOn = false
            LocalPlayer.state.seatbelt_on = -1
            speedBuffer = {0.0, 0.0}
            if isUIOpen and IsPlayerDead(playerPed) == false then
                isUIOpen = false
            end
            NUIBuckled(beltOn) -- Make sure chime is off
        end

        Citizen.Wait(0)
    end
end)
