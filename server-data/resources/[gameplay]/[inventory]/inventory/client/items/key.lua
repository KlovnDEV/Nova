function playUnlockCarAnim(ped)
	local dict = "anim@mp_player_intmenu@key_fob@"
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
	    Citizen.Wait(100)
	end
	TaskPlayAnim(ped, dict, "fob_click_fp", 8.0, 8.0, -1, 48, 1, false, false, false)
end

function carBlinkLights(entity)
	Citizen.Wait(400)
	SetVehicleLights(entity, 2)
	Citizen.Wait(100)
	SetVehicleLights(entity, 0)
	Citizen.Wait(100)
	SetVehicleLights(entity, 2)
	Citizen.Wait(100)
	SetVehicleLights(entity, 0)
end

function findNearbyVehicleByAccess(access)
	local ped = PlayerPedId()
	local vehicles = ESX.Game.GetVehiclesInArea(GetEntityCoords(ped), 5.0)

	local veh = nil

	for k,entity in pairs(vehicles) do
		local car = Entity(entity)
		if car and car.state and tostring(car.state.vehid) == tostring(access) then
			veh = entity
			break
		end

		if GetVehicleNumberPlateText(entity) == access then
			veh = entity
			break
		end
	end

	return veh
end

function setCarLocked(access, status)
	local ped = PlayerPedId()
	local veh = findNearbyVehicleByAccess(access)

	playUnlockCarAnim(ped)

	if veh then
		carBlinkLights(veh)
		local e = Entity(veh)
		SetVehicleDoorsLocked(veh, status)
		if e and e.state and e.state.vehid then
			TriggerServerEvent('vehsync:setLocked', e.state.vehid, status == true or status >= 2)
		end
	end
end


RegisterNetEvent("inventory:setCarLocked")
AddEventHandler("inventory:setCarLocked", function(access, status)
	setCarLocked(access, status)
end)
