DecorRegister(SIRENSOUND_PNAME, 2)
DecorRegister(BLIPSIREN_PNAME, 2)
DecorRegister(SILENTSIREN_PNAME, 2)
hotkeyTimeout = 0

function IsDecorActive(car, decor)
	if not DecorExistOn(car, decor) then
		return false
	else
		return DecorGetBool(car, decor)
	end

end

Citizen.CreateThread(function()

while true do
Citizen.Wait(0)

	local playerPed = PlayerPedId()
	local playerCar = GetVehiclePedIsIn(playerPed)

        if playerCar then
		if IsControlPressed(1, SILENTSIREN_HOTKEY) then
			hotkeyTimeout = hotkeyTimeout + 1
			if hotkeyTimeout > SILENTHOTKEY_MAXTIMEOUT then
				DecorSetBool(playerCar, BLIPSIREN_PNAME, true)
			end
		else
			if hotkeyTimeout > 0 and hotkeyTimeout < SILENTHOTKEY_MAXTIMEOUT then
				DecorSetBool(playerCar, SILENTSIREN_PNAME, not IsDecorActive(playerCar, SILENTSIREN_PNAME))
			end

			DecorSetBool(playerCar, BLIPSIREN_PNAME, false)
	                hotkeyTimeout = 0
		end

                if IsVehicleSirenOn(playerCar) and not IsDecorActive(playerCar, SILENTSIREN_PNAME) then
			if IsControlJustReleased(1, SIRENSOUND_HOTKEY) then
				DecorSetBool(playerCar, SIRENSOUND_PNAME, not IsDecorActive(playerCar, SIRENSOUND_PNAME))
			end
		else
			DecorSetBool(playerCar, SIRENSOUND_PNAME, false)
		end
	end

	CheckForSirens()
end
end)

function CheckForSirens()
	for k,player in ipairs(GetActivePlayers()) do
		local playerPed = GetPlayerPed(player)
		local playerCar = GetVehiclePedIsIn(playerPed)

		if playerPed and playerCar then
			if IsDecorActive(playerCar, BLIPSIREN_PNAME) then
				BlipSiren(playerCar)
			end

			if IsDecorActive(playerCar, SIRENSOUND_PNAME) then
				StartVehicleHorn(playerCar, 1, RequestModel(GetHashKey('HELDDOWN')), false)
			end

			SetVehicleHasMutedSirens(playerCar, IsDecorActive(playerCar, SILENTSIREN_PNAME))
		end
	end
end
