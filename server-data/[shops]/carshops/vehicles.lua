local LastVehicles            = {}

function WaitForVehicleToLoad(modelHash)
	modelHash = (type(modelHash) == 'number' and modelHash or GetHashKey(modelHash))

	if not HasModelLoaded(modelHash) then
		RequestModel(modelHash)

		BeginTextCommandBusyString('STRING')
		AddTextComponentSubstringPlayerName(_U('shop_awaiting_model'))
		EndTextCommandBusyString(4)

		while not HasModelLoaded(modelHash) do
			Citizen.Wait(1)
			DisableAllControlActions(0)
		end

		RemoveLoadingPrompt()
	end
end

function DeleteLocalVehicles()
	while #LastVehicles > 0 do
		local vehicle = LastVehicles[1]

		ESX.Game.DeleteVehicle(vehicle)
		table.remove(LastVehicles, 1)
	end
end

function previewVehicle(model, pos, heading)
	DeleteLocalVehicles()

	WaitForVehicleToLoad(model)

	ESX.Game.SpawnLocalVehicle(model, pos, heading, function (vehicle)
		table.insert(LastVehicles, vehicle)
		TaskWarpPedIntoVehicle(PlayerPedId(), vehicle, -1)
		FreezeEntityPosition(vehicle, true)
		SetModelAsNoLongerNeeded(model)
	end)
end