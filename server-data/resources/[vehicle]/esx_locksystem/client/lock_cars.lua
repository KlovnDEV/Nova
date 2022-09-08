function lock_cars()
		local pos = GetEntityCoords(PlayerPedId())

		local vehicle = GetClosestVehicle(pos, 5.0, 0, 71)
		if DoesEntityExist(vehicle) then

			if DecorGetBool(vehicle, "NPCLOCKED") == false then
				local locked = math.random()<0.95
				DecorSetBool(vehicle, "NPCLOCKED", true)

				if locked then
					local driver = GetPedInVehicleSeat(vehicle, -1)
					local npcIsDriving = DoesEntityExist(driver) and not IsPedAPlayer(driver)
					local toBeStealed = IsVehicleAlarmSet(vehicle) or IsVehicleNeedsToBeHotwired(vehicle) --or IsVehiclePreviouslyOwnedByPlayer(vehicle) == false

					if toBeStealed or npcIsDriving  then
						SetVehicleDoorsLocked(vehicle, 2)
					end
				end
			end

			local e = Entity(vehicle)
			if e.state and e.state.locked ~= nil then
				local hasLocked = GetVehicleDoorLockStatus(vehicle) >= 2 or GetVehicleDoorsLockedForPlayer(vehicle, PlayerId())

			        if e.state.locked and not hasLocked then
			            SetVehicleDoorsLocked(vehicle, 4)
			            SetVehicleDoorsLockedForAllPlayers(vehicle, 1)
                                    DecorSetBool(vehicle, "NPCLOCKED", true)
			        elseif not e.state.locked and hasLocked then
			            SetVehicleDoorsLocked(vehicle, 1)
			            SetVehicleDoorsLockedForAllPlayers(vehicle, false)
                                    DecorSetBool(vehicle, "NPCLOCKED", false)
			        end
			end
		end

end

Citizen.CreateThread(function()
	if not DecorIsRegisteredAsType("NPCLOCKED", 2) then -- BOOL
		DecorRegister("NPCLOCKED", 2)
	end

	while true do
		Citizen.Wait(300)
		pcall(function()
			lock_cars()
		end)
	end
end)
