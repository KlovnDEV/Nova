ESX = nil

Citizen.CreateThread(function()
	while not ESX do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(100)
	end
end)

local isNearPump = false
local isFueling = false
local currentFuel = 0.0
local currentCost = 0.0
local fuelSynced = false
local inBlacklisted = false
local lastSyncedFuel = -1

function getVehicleMaxFuel(veh)
	local fuelMax = GetVehicleHandlingFloat(veh, "CHandlingData", "fPetrolTankVolume")
	if fuelMax <= 0 then
		fuelMax = 100.0
	end

	return fuelMax
end

RegisterNetEvent("legacyfuel:set")
AddEventHandler('legacyfuel:set', function(value)
	local vehicle = GetVehiclePedIsIn(PlayerPedId())
	if vehicle > 0 then
		local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))
		TriggerServerEvent('legacyfuel:setFuel', plate, value + 0.0)
		SetVehicleFuelLevel(vehicle, value + 0.0)
	end
end)

function GetCurrentCash()
	if LocalPlayer.state['money:cash'] then
		return LocalPlayer.state['money:cash'] or 0
	end

	return 0
end

--[[
Citizen.CreateThread(function()
	while true do
		if fuelSynced and not inBlacklisted then
			local vehicle = GetVehiclePedIsIn(PlayerPedId())
			if vehicle > 0 then
				local fuel = GetVehicleFuelLevel(vehicle)
				local rpm = GetVehicleCurrentRpm(vehicle)
				if rpm > 0.01 then
					SetVehicleCurrentRpm(vehicle, 0.01)
				end
			end
		end
		Citizen.Wait(100)
	end
end)
]]--

function ManageFuelUsage(vehicle)
	local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))

	if not DecorExistOn(vehicle, Config.FuelDecor) or not fuelSynced then
		ESX.TriggerServerCallback('legacyfuel:getFuel', function(fuel)
			SetFuel(vehicle, fuel)
			lastSyncedFuel = fuel
			fuelSynced = true
		end, plate)
	end

	if IsVehicleEngineOn(vehicle) then
		local fuel = GetVehicleFuelLevel(vehicle) - Config.FuelUsage[Round(GetVehicleCurrentRpm(vehicle), 1)] * (Config.Classes[GetVehicleClass(vehicle)] or 1.0) / 10
		SetFuel(vehicle, fuel)
		if math.abs(lastSyncedFuel - fuel) > 1.0 then
			TriggerServerEvent('legacyfuel:setFuel', plate, fuel)
			lastSyncedFuel = fuel
		end
	end
end

Citizen.CreateThread(function()
	DecorRegister(Config.FuelDecor, 1)

	for i = 1, #Config.Blacklist do
		if type(Config.Blacklist[i]) == 'string' then
			Config.Blacklist[GetHashKey(Config.Blacklist[i])] = true
		else
			Config.Blacklist[Config.Blacklist[i]] = true
		end
	end

	for i = #Config.Blacklist, 1, -1 do
		table.remove(Config.Blacklist, i)
	end

	while true do
		Citizen.Wait(1000)

		local ped = PlayerPedId()

		if IsPedInAnyVehicle(ped) then
			local vehicle = GetVehiclePedIsIn(ped)

			if Config.Blacklist[GetEntityModel(vehicle)] then
				inBlacklisted = true
			else
				inBlacklisted = false
			end

			if not inBlacklisted and GetPedInVehicleSeat(vehicle, -1) == ped then
				ManageFuelUsage(vehicle)
			end
		else
			if fuelSynced then
				fuelSynced = false
				lastSyncedFuel = -1
			end

			if inBlacklisted then
				inBlacklisted = false
			end
		end
	end
end)

function FindNearestFuelPump()
	local coords = GetEntityCoords(PlayerPedId())
	local fuelPumps = {}
	local handle, object = FindFirstObject()
	local success

	repeat
		if Config.PumpModels[GetEntityModel(object)] then
			table.insert(fuelPumps, object)
		end

		success, object = FindNextObject(handle, object)
	until not success

	EndFindObject(handle)

	local pumpObject = 0
	local pumpDistance = 1000

	for k,v in pairs(fuelPumps) do
		local dstcheck = GetDistanceBetweenCoords(coords, GetEntityCoords(v))

		if dstcheck < pumpDistance then
			pumpDistance = dstcheck
			pumpObject = v
		end
	end

	return pumpObject, pumpDistance
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(250)

		local pumpObject, pumpDistance = FindNearestFuelPump()

		if pumpDistance < 2.5 then
			isNearPump = pumpObject
		else
			isNearPump = false

			Citizen.Wait(math.ceil(pumpDistance * 20))
		end
	end
end)

function DrawText3Ds(x, y, z, text)
	ESX.Game.Utils.DrawText3D(vector3(x, y, z), text, 0.9, 4)
end

function LoadAnimDict(dict)
	if not HasAnimDictLoaded(dict) then
		RequestAnimDict(dict)

		while not HasAnimDictLoaded(dict) do
			Citizen.Wait(1)
		end
	end
end

AddEventHandler('fuel:startFuelUpTick', function(pumpObject, ped, vehicle)
	currentFuel = GetVehicleFuelLevel(vehicle)
	local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))

	while isFueling do
		Citizen.Wait(500)

		local maxFuel = getVehicleMaxFuel(vehicle)
		local oldFuel = DecorGetFloat(vehicle, Config.FuelDecor)
		local fuelToAdd = math.random(10, 20) / 10.0
		local extraCost = fuelToAdd / 1.5

		if not pumpObject then
			if GetAmmoInPedWeapon(ped, 883325847) - fuelToAdd * 100 >= 0 then
				currentFuel = oldFuel + fuelToAdd

				SetPedAmmo(ped, 883325847, math.floor(GetAmmoInPedWeapon(ped, 883325847) - fuelToAdd * 100))
			else
				TriggerServerEvent('legacyfuel:setFuel', plate, oldFuel)
				isFueling = false
			end
		else
			currentFuel = oldFuel + fuelToAdd
		end

		if currentFuel > maxFuel then
			currentFuel = maxFuel
			TriggerServerEvent('legacyfuel:setFuel', plate, currentFuel)
			isFueling = false
		end

		currentCost = currentCost + extraCost

		if GetCurrentCash() >= currentCost + extraCost then
			SetFuel(vehicle, currentFuel)
		else
			TriggerServerEvent('legacyfuel:setFuel', plate, currentFuel)
			isFueling = false
		end
	end

	if pumpObject then
		TriggerServerEvent('fuel:pay', currentCost)
	end

	currentCost = 0.0
end)

function Round(num, numDecimalPlaces)
	local mult = 10^(numDecimalPlaces or 0)

	return math.floor(num * mult + 0.5) / mult
end

AddEventHandler('fuel:refuelFromPump', function(pumpObject, ped, vehicle)
	local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))
	TaskTurnPedToFaceEntity(ped, vehicle, 1000)
	Citizen.Wait(1000)
	SetCurrentPedWeapon(ped, -1569615261, true)
	LoadAnimDict("timetable@gardener@filling_can")
	TaskPlayAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 2.0, 8.0, -1, 50, 0, 0, 0, 0)

	TriggerEvent('fuel:startFuelUpTick', pumpObject, ped, vehicle)

	local maxFuel = getVehicleMaxFuel(vehicle)

	while isFueling do
		Citizen.Wait(1)

		for k,v in pairs(Config.DisableKeys) do
			DisableControlAction(0, v)
		end

		local vehicleCoords = GetEntityCoords(vehicle)

		if pumpObject then
			local stringCoords = GetEntityCoords(pumpObject)
			local extraString = ""

			if Config.UseESX then
				extraString = "\n" .. Config.Strings.TotalCost .. ": ~g~$" .. Round(currentCost, 1)
			end

			DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.CancelFuelingPump .. extraString)
			DrawText3Ds(vehicleCoords.x, vehicleCoords.y, vehicleCoords.z + 0.5, Round(currentFuel / maxFuel * 100.0, 1) .. "%")
		else
			DrawText3Ds(vehicleCoords.x, vehicleCoords.y, vehicleCoords.z + 1.0, Config.Strings.CancelFuelingJerryCan .. "\nКанистра: ~g~" .. Round(GetAmmoInPedWeapon(ped, 883325847) / 4500 * 100, 1) .. "%")
			DrawText3Ds(vehicleCoords.x, vehicleCoords.y, vehicleCoords.z + 0.6, "Транспорт: " .. Round(currentFuel, 1) .. "%")
		end

		if not IsEntityPlayingAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 3) then
			TaskPlayAnim(ped, "timetable@gardener@filling_can", "gar_ig_5_filling_can", 2.0, 8.0, -1, 50, 0, 0, 0, 0)
		end

		if IsControlJustReleased(0, 38) or DoesEntityExist(GetPedInVehicleSeat(vehicle, -1)) or (isNearPump and GetEntityHealth(pumpObject) <= 0) then
			isFueling = false
			local oldFuel = DecorGetFloat(vehicle, Config.FuelDecor)
			TriggerServerEvent('legacyfuel:setFuel', plate, oldFuel)
		end
	end

	ClearPedTasks(ped)
	RemoveAnimDict("timetable@gardener@filling_can")
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1)

		local ped = PlayerPedId()
		local GasCanEquipped = GetSelectedPedWeapon(ped) == 883325847

		if not isFueling and ((isNearPump and GetEntityHealth(isNearPump) > 0) or (GasCanEquipped and not isNearPump)) then
			if IsPedInAnyVehicle(ped) and GetPedInVehicleSeat(GetVehiclePedIsIn(ped), -1) == ped then
				local pumpCoords = GetEntityCoords(isNearPump)

				DrawText3Ds(pumpCoords.x, pumpCoords.y, pumpCoords.z + 1.2, Config.Strings.ExitVehicle)
			else
				local vehicle = GetPlayersLastVehicle()
				local vehicleCoords = GetEntityCoords(vehicle)

				if DoesEntityExist(vehicle) and GetDistanceBetweenCoords(GetEntityCoords(ped), vehicleCoords) < 2.5 then
					if not DoesEntityExist(GetPedInVehicleSeat(vehicle, -1)) and not Config.Blacklist[GetEntityModel(vehicle)] then
						local stringCoords = GetEntityCoords(isNearPump)
						local canFuel = true

						if GasCanEquipped then
							stringCoords = vehicleCoords

							if GetAmmoInPedWeapon(ped, 883325847) < 100 then
								canFuel = false
								DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.JerryCanEmpty)
							end
						else
							if not isNearPump then
								canFuel = false
							elseif GetCurrentCash() <= 0 then
								canFuel = false
								DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.NotEnoughCash)
							end

						end

						if GetVehicleFuelLevel(vehicle) >= 95 then
							canFuel = false
							DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.FullTank)
						end

						if canFuel then
							DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.EToRefuel)

							if IsControlJustReleased(0, 38) then
								isFueling = true

								TriggerEvent('fuel:refuelFromPump', isNearPump, ped, vehicle)
								LoadAnimDict("timetable@gardener@filling_can")
							end
						end
					end
				elseif isNearPump then
					local stringCoords = GetEntityCoords(isNearPump)

					if GetCurrentCash() >= Config.JerryCanCost then
						if not HasPedGotWeapon(ped, 883325847) then
							DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.PurchaseJerryCan)

							if IsControlJustReleased(0, 38) then
								GiveWeaponToPed(ped, 883325847, 4500, false, true)

								TriggerServerEvent('fuel:pay', Config.JerryCanCost)
							end
						else
							if Config.UseESX then
								local refillCost = Round(Config.RefillCost * (1 - GetAmmoInPedWeapon(ped, 883325847) / 4500))

								if refillCost > 0 then
									if GetCurrentCash() >= refillCost then
										DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.RefillJerryCan .. refillCost)

										if IsControlJustReleased(0, 38) then
											TriggerServerEvent('fuel:pay', refillCost)

											SetPedAmmo(ped, 883325847, 4500)
										end
									else
										DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.NotEnoughCashJerryCan)
									end
								else
									DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.JerryCanFull)
								end
							else
								DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.RefillJerryCan)

								if IsControlJustReleased(0, 38) then
									SetPedAmmo(ped, 883325847, 4500)
								end
							end
						end
					else
						DrawText3Ds(stringCoords.x, stringCoords.y, stringCoords.z + 1.2, Config.Strings.NotEnoughCash)
					end
				else
					Citizen.Wait(250)
				end
			end
		else
			Citizen.Wait(250)
		end
	end
end)

function CreateBlip(coords)
	local blip = AddBlipForCoord(coords)

	SetBlipSprite(blip, 361)
	SetBlipScale(blip, 0.9)
	SetBlipColour(blip, 4)
	SetBlipDisplay(blip, 4)
	SetBlipAsShortRange(blip, true)

	BeginTextCommandSetBlipName("STRING")
	AddTextComponentString("Заправка")
	EndTextCommandSetBlipName(blip)

	return blip
end

function FindNearestStation(coords)
	local mindist = 100000
	local closestStation = nil

	for k,v in pairs(Config.GasStations) do
		local dist = GetDistanceBetweenCoords(coords, v)

		if dist < mindist then
			mindist = dist
			closestStation = v
		end
	end

	return closestStation
end

if Config.ShowNearestGasStationOnly then
	Citizen.CreateThread(function()
		local currentGasBlip = 0

		while true do
			Citizen.Wait(10000)

			local coords = GetEntityCoords(PlayerPedId())
			local closestCoords = FindNearestStation(coords)

			if DoesBlipExist(currentGasBlip) then
				RemoveBlip(currentGasBlip)
			end

			if closestCoords ~= nil then
				currentGasBlip = CreateBlip(closestCoords)
			else
				currentGasBlip = 0
			end
		end
	end)
elseif Config.ShowAllGasStations then
	Citizen.CreateThread(function()
		for k,v in pairs(Config.GasStations) do
			CreateBlip(v)
		end
	end)
end

function GetFuel(vehicle)
	return DecorGetFloat(vehicle, Config.FuelDecor)
end

function SetFuel(vehicle, fuel)
	local maxFuel = getVehicleMaxFuel(vehicle)

	if type(fuel) == 'number' and fuel >= 0 and fuel <= maxFuel then
		SetVehicleFuelLevel(vehicle, fuel + 0.0)
		DecorSetFloat(vehicle, Config.FuelDecor, GetVehicleFuelLevel(vehicle))
	end
end

