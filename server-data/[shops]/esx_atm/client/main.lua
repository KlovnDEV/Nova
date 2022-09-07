-- internal variables
local hasAlreadyEnteredMarker = false
local isInATMMarker = false
local currentMarker = nil
local cardProp = nil
ESX = nil

function getClosestATM(dist)
	local entities = { "prop_fleeca_atm", "prop_atm_02", "prop_atm_01", "prop_atm_03" }
	local coords = GetEntityCoords(PlayerPedId())

	for k,v in pairs(entities) do
		local atm_entity = GetClosestObjectOfType(coords, dist, GetHashKey(v), false, false)
		if DoesEntityExist(atm_entity) then
			return atm_entity
		end
	end

	return nil
end

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	for k, zone in pairs(Config.Zones) do
		zone._marker = MarkerClass:new({
			type = 1,
			zone = zone,
			pos = zone.Position,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = zone.DrawDistance or 20,
			onPress = 'esx_atm:onPress',
			onEnter = 'esx_atm:onEnter',
			onExit = 'esx_atm:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к банку',
		})

		zone._sprite = Sprite3DClass:new({
			pos = zone.Position,
			scale = { x = 0.1, y = 0.1 },
			textureDict = 'spritedict',
			textureName = 'locker',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = 5.0,
			distanceFade = false,
		})

		zone._blip = BlipClass:new({
			pos = zone.Position,
			sprite  = 108,
			display = 4,
			scale   = 0.7,
			color   = 30,
			shortRange = true,
			text = "Банк",
		})

		zone.id = k
	end

end)

RegisterNetEvent("esx_atm:onPress")
AddEventHandler("esx_atm:onPress", function(marker)
	showMenu(marker.zone)
end)

RegisterNetEvent("esx_atm:onEnter")
AddEventHandler("esx_atm:onEnter", function(marker)
	ESX.SetPlayerData('inventory_current_container', { ["category"] = marker.zone.Category, ["identifier"] = marker.zone.Identifier })
	Config.Zones[marker.zone.id]._sprite:set('textureName', 'locker_e')
end)

RegisterNetEvent("esx_atm:onExit")
AddEventHandler("esx_atm:onExit", function(marker)
	ESX.SetPlayerData('inventory_current_container', nil)
	Config.Zones[marker.zone.id]._sprite:set('textureName', 'locker')
	TriggerEvent('esx_atm:closeATM')
end)

function showMenu(zone)
	TriggerEvent('nova-ui:showBank', zone)
--[[
	TriggerScreenblurFadeIn(500.0)
	SetNuiFocus(true, true)

	ESX.TriggerServerCallback('esx:getPlayerData', function(data)
		SendNUIMessage({
			showMenu = true,
			player = {
				money = data.money,
				accounts = data.accounts,
			}
		})

		ESX.TriggerServerCallback("esx_atm:get_transactions", function(transactions)
			SendNUIMessage({
				setTransactions = true,
				transactions = transactions,
			})
		end)
	end)
]]--
end

RegisterNetEvent('esx_atm:closeATM')
AddEventHandler('esx_atm:closeATM', function()
	local prop_name = "prop_cs_credit_card"
	local playerPed = PlayerPedId()
	local x,y,z = table.unpack(GetEntityCoords(playerPed))
	local prop = CreateObject(GetHashKey(prop_name), x, y, z + 10.2, true, true, true)
	local boneIndex = GetPedBoneIndex(playerPed, 57005) -- 18905 = left hand, 57005 = right hand

--[[
	if currentMarker["static"] == nil then
		Citizen.CreateThread(function()
			ESX.Streaming.RequestAnimDict("amb@prop_human_atm@male@exit", function()
				TaskPlayAnim(PlayerPedId(), "amb@prop_human_atm@male@exit", "exit", 8.0, -8.0, -1, 0, 0, false, false, false)
				Citizen.Wait(3000)
				AttachEntityToEntity(prop, playerPed, boneIndex, 0.162, 0.038, -0.021, 10.0, 175.0, 0.0, true, true, false, true, 1, true)
				Citizen.Wait(2000)
				DeleteObject(prop)
			end)
		end)
	end
]]--
	TriggerEvent('nova-ui:CloseScreen', 'bank')
--	TriggerScreenblurFadeOut(500.0)
end)

RegisterNUICallback('deposit', function(data, cb)
	TriggerServerEvent('esx_atm:deposit', data.amount, data.account)
	cb('ok')
end)

RegisterNUICallback('withdraw', function(data, cb)
	TriggerServerEvent('esx_atm:withdraw', data.amount, data.account)
	cb('ok')
end)

-- Draw markers
Citizen.CreateThread(function()

	Citizen.Wait(1000)

	while true do
		Citizen.Wait(0)
		local coords = GetEntityCoords(GetPlayerPed(-1))
		for k,zone in pairs(Config.Zones) do
			zone._marker:draw(coords)
			zone._sprite:draw(coords)
		end
	end
end)

-- Activate menu when player is inside marker
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local coords = GetEntityCoords(PlayerPedId())
		local canSleep = true
		isInATMMarker = false

		local atm_entity = getClosestATM(1.0)

		if atm_entity then
			isInATMMarker = true
			local coords = GetEntityCoords(atm_entity)
			currentMarker = {}
			currentMarker.x = coords.x
			currentMarker.y = coords.y
			currentMarker.z = coords.z
		end

		if isInATMMarker and not hasAlreadyEnteredMarker then
			hasAlreadyEnteredMarker = true
			canSleep = false
		end

		if not isInATMMarker and hasAlreadyEnteredMarker then
			TriggerScreenblurFadeOut(500.0)
			hasAlreadyEnteredMarker = false
			TriggerEvent('nova-ui:CloseScreen', 'bank')
			canSleep = false
		end

		if canSleep then
			Citizen.Wait(500)
		end
	end
end)

function headTowardsEntity(ped, entity, timeout)
	for k = 1,timeout*10 do
		if IsPedHeadingTowardsPosition(ped, GetEntityCoords(entity), 10.0) then
			break
		end

                TaskTurnPedToFaceEntity(ped, entity, 200)
		Citizen.Wait(100)
	end
end

function moveTowardsEntity(ped, entity, minDist, timeout)
	for k = 1,timeout*10 do
		local curDist = #(GetEntityCoords(ped) - GetEntityCoords(entity))

		if curDist <= minDist + 0.01 then
			break
		end

		TaskGoToEntity(ped, entity, 200, 0.0, 4.0)
		Citizen.Wait(100)
	end
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if isInATMMarker and not CURRENT_SCREEN and IsPedOnFoot(PlayerPedId()) then

			ESX.ShowHelpNotification(_U('press_e_atm'))

			if IsControlJustReleased(0, 38) then

				if currentMarker["static"] == nil then
					Citizen.CreateThread(function()
						local prop_name = "prop_cs_credit_card"
						local playerPed = PlayerPedId()
						local coords = GetEntityCoords(playerPed)
						local prop = CreateObject(GetHashKey(prop_name), coords.x, coords.y, coords.z + 10.2, true, true, true)
						local boneIndex = GetPedBoneIndex(playerPed, 57005) -- 18905 = left hand, 57005 = right hand

						local atmEntity = getClosestATM(3.0)
						if atmEntity then
							ClearPedTasks(playerPed)
							Citizen.Wait(0)

							moveTowardsEntity(playerPed, atmEntity, 1.16, 5)
							ClearPedTasks(playerPed)
							headTowardsEntity(playerPed, atmEntity, 5)
							ClearPedTasks(playerPed)
						end

						AttachEntityToEntity(prop, playerPed, boneIndex, 0.162, 0.038, -0.021, 10.0, 175.0, 0.0, true, true, false, true, 1, true)

						ESX.Streaming.RequestAnimDict("anim@mp_atm@enter", function()
							TaskPlayAnim(playerPed, "anim@mp_atm@enter", "enter", 8.0, -8.0, -1, 2, 0, false, false, false)
							Citizen.Wait(1300)
							DeleteObject(prop)
							Citizen.Wait(2700)
							ESX.Streaming.RequestAnimDict("anim@mp_atm@base", function()
								TaskPlayAnim(playerPed, "anim@mp_atm@base", "base", 8.0, -8.0, -1, 1, 0, false, false, false)
							end)
						end)
					end)
					Citizen.Wait(4000)
				end

				showMenu()

--				TriggerScreenblurFadeIn(500.0)
--				SetNuiFocus(true, true)
			end

		else
			Citizen.Wait(500)
		end
	end
end)

-- close the menu when script is stopping to avoid being stuck in NUI focus
AddEventHandler('onResourceStop', function(resource)
	if resource == GetCurrentResourceName() then
		TriggerEvent('nova-ui:CloseScreen', 'bank')
	end
end)
