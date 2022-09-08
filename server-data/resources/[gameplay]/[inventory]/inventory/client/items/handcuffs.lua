HasHandcuffed = false

function playHandcuffedAnim(ped)
    RequestAnimDict('mp_arresting')
    while not HasAnimDictLoaded('mp_arresting') do
        Citizen.Wait(0)
    end

    TaskPlayAnim(ped, 'mp_arresting', 'idle', 8.0, -8, -1, 49, 0, 0, 0, 0)
end

function handcuffPed(ped)
	SetEnableHandcuffs(ped, true)
	SetCurrentPedWeapon(ped, GetHashKey('WEAPON_UNARMED'), true)
	SetPedCanPlayGestureAnims(ped, false)
	FreezeEntityPosition(ped, false)
	playHandcuffedAnim(ped)
end

function unhandcuffPed(ped)
	SetEnableHandcuffs(ped, false)
	ClearPedSecondaryTask(ped)
	SetPedCanPlayGestureAnims(ped, true)
	FreezeEntityPosition(playerPed, false)
end

RegisterNetEvent('inventory:handcuff')
AddEventHandler('inventory:handcuff', function()
    local coords = GetEntityCoords(PlayerPedId())
    local ped, distance = ESX.Game.GetClosestPed(coords)

    if distance > 3 then
        ESX.ShowNotification ("Рядом никого нет")
		return
    end

    local player = NetworkGetPlayerIndexFromPed(ped)

    if player > 0 then
		TriggerServerEvent('inventory:handcuffPlayer', GetPlayerServerId(player))
    end

    handcuffPed(ped)
end)

-- Наручники отпустить

RegisterNetEvent('inventory:Unhandcuff')
AddEventHandler('inventory:Unhandcuff', function()
    local coords = GetEntityCoords(PlayerPedId())
    local ped, distance = ESX.Game.GetClosestPed(coords)

    if distance >3 then
        ESX.ShowNotification ("Рядом никого нет")
    end

    local player = NetworkGetPlayerIndexFromPed(ped)

    if player > 0 then
	TriggerServerEvent('inventory:unhandcuffPlayer', GetPlayerServerId(player))
    end

    unhandcuffPed(ped)
end)

-- Citizen.CreateThread(function()
-- 	while true do
-- 		Citizen.Wait(0)

-- 		if IsControlJustReleased(0, 82) then
-- 			TriggerServerEvent('inventory:handcuffPlayer', GetPlayerServerId(PlayerId()))
-- 		end

-- 		if IsControlJustReleased(0, 81) then
-- 			TriggerServerEvent('inventory:unhandcuffPlayer', GetPlayerServerId(PlayerId()))
-- 		end
-- 	end
-- end)

-- Наручники, блоки контроля
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local playerPed = PlayerPedId()

		if LocalPlayer.state.isHandcuffed then
			if not HasHandcuffed then
				Citizen.Wait(3000)
				HasHandcuffed = true
			end

			DisablePlayerFiring(playerPed, true)

--			DisableControlAction(0, 1, true) -- Disable pan
--			DisableControlAction(0, 2, true) -- Disable tilt
			DisableControlAction(0, 24, true) -- Attack
			DisableControlAction(0, 257, true) -- Attack 2
			DisableControlAction(0, 25, true) -- Aim
			DisableControlAction(0, 263, true) -- Melee Attack 1
--			DisableControlAction(0, 32, true) -- W
--			DisableControlAction(0, 34, true) -- A
--			DisableControlAction(0, 31, true) -- S
--			DisableControlAction(0, 30, true) -- D

			DisableControlAction(0, 45, true) -- Reload
			DisableControlAction(0, 22, true) -- Jump
			DisableControlAction(0, 44, true) -- Cover
			DisableControlAction(0, 37, true) -- Select Weapon
			DisableControlAction(0, 23, true) -- Also 'enter'?

			DisableControlAction(0, 288,  true) -- Disable phone
			DisableControlAction(0, 289, true) -- Inventory
			DisableControlAction(0, 170, true) -- Animations
			DisableControlAction(0, 166, true) -- Job поменял с F6 на F5

			DisableControlAction(0, 0, true) -- Disable changing view
			DisableControlAction(0, 26, true) -- Disable looking behind
			DisableControlAction(0, 73, true) -- Disable clearing animation
			DisableControlAction(2, 199, true) -- Disable pause screen

			DisableControlAction(0, 59, true) -- Disable steering in vehicle
			DisableControlAction(0, 71, true) -- Disable driving forward in vehicle
			DisableControlAction(0, 72, true) -- Disable reversing in vehicle

			DisableControlAction(2, 36, true) -- Disable going stealth

			DisableControlAction(0, 47, true)  -- Disable weapon
			DisableControlAction(0, 264, true) -- Disable melee
			DisableControlAction(0, 257, true) -- Disable melee
			DisableControlAction(0, 140, true) -- Disable melee
			DisableControlAction(0, 141, true) -- Disable melee
			DisableControlAction(0, 142, true) -- Disable melee
			DisableControlAction(0, 143, true) -- Disable melee
			DisableControlAction(0, 75, true)  -- Disable exit vehicle
			DisableControlAction(27, 75, true) -- Disable exit vehicle

			if IsEntityPlayingAnim(playerPed, 'mp_arresting', 'idle', 3) ~= 1 then
				ESX.Streaming.RequestAnimDict('mp_arresting', function()
					TaskPlayAnim(playerPed, 'mp_arresting', 'idle', 8.0, -8, -1, 49, 0.0, false, false, false)
				end)
			end
		else
			Citizen.Wait(500)

			if HasHandcuffed then
				HasHandcuffed = false
				ClearPedTasks(playerPed)
			end
		end
	end
end)

RegisterNetEvent('handcuffs:cuffTarget')
AddEventHandler('handcuffs:cuffTarget', function(target)
	-- HasHandcuffed = true

	local playerPed = GetPlayerPed(-1)
	local targetPed = GetPlayerPed(GetPlayerFromServerId(target))

	RequestAnimDict("mp_arrest_paired")

	while not HasAnimDictLoaded("mp_arrest_paired") do
		Citizen.Wait(10)
	end

	AttachEntityToEntity(playerPed, targetPed, 11816, -0.1, 0.45, 0.0, 0.0, 0.0, 20.0, false, false, false, false, 20, false)
	TaskPlayAnim(playerPed, "mp_arrest_paired", "crook_p2_back_left", 8.0, -8.0, 5500, 33, 0, false, false, false)

	Citizen.Wait(950)
	DetachEntity(playerPed, true, false)

	-- HasHandcuffed = false
end)

RegisterNetEvent('handcuffs:cuffCop')
AddEventHandler('handcuffs:cuffCop', function()
	local playerPed = GetPlayerPed(-1)

	RequestAnimDict("mp_arrest_paired")

	while not HasAnimDictLoaded("mp_arrest_paired") do
		Citizen.Wait(10)
	end

	TaskPlayAnim(playerPed, "mp_arrest_paired", "cop_p2_back_left", 8.0, -8.0, 5500, 33, 0, false, false, false)

	Citizen.Wait(3000)

	-- HasHandcuffed = false

end)
