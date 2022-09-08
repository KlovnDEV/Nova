ESX = nil
BLOCK_KEYS = false
PLAYER_INFO_SHOWN = false
CURRENT_SCREEN = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()
    while true do
        if BLOCK_KEYS then
--        DisableAllControlActions(0)
            DisableControlAction(0, 1,   true) -- LookLeftRight
            DisableControlAction(0, 2,   true) -- LookUpDown
            DisableControlAction(0, 142, true) -- MeleeAttackAlternate
            DisableControlAction(0, 106, true) -- VehicleMouseControlOverride
            DisableControlAction(0, 12, true) -- WeaponWheelUpDown
            DisableControlAction(0, 14, true) -- WeaponWheelNext
            DisableControlAction(0, 15, true) -- WeaponWheelPrev
            DisableControlAction(0, 16, true) -- SelectNextWeapon
            DisableControlAction(0, 17, true) -- SelectPrevWeapon
            DisableControlAction(0, 245, true) -- T, Chat
            DisableControlAction(0, 140, true) -- R, Melee attack
            DisableControlAction(0, 74, true) -- H, Ragdoll
            DisableControlAction(0, 311, true) -- K, Animations
            DisableControlAction(0, 199, true) -- P, Pause
            DisableControlAction(0, 29, true) -- B, Point Finger
            DisableControlAction(0, 0, true) -- V, Next camera
--		        DisableControlAction(0, 243, true) -- ~, Player Menu
            DisableControlAction(0, 322, true) -- ESC
            DisableControlAction(0, 200, true) -- ESC
            DisableControlAction(0, 244, true) -- M, vMenu

            DisableControlAction(0, 25, true) -- Right Mouse

            -- enter
            DisableControlAction(0, 18, true)
            DisableControlAction(0, 176, true)
            DisableControlAction(0, 191, true)
            DisableControlAction(0, 201, true)
            DisableControlAction(0, 215, true)

            if CURRENT_SCREEN ~= 'playerinfo' then DisableControlAction(0, 36,   true) end -- CTRL, crouch

            if CURRENT_SCREEN == 'chat' then DisableAllControlActions(0) end

        end

        Citizen.Wait(0)
    end
end)

function OpenScreen(name)
	SetNuiFocus(true, true)
	SetNuiFocusKeepInput(true)
	BLOCK_KEYS = true
	CURRENT_SCREEN = name
        TriggerEvent('nova-ui:change_screen', CURRENT_SCREEN)
end

function CloseScreen(name)

	if PLAYER_INFO_SHOWN and (name == 'playerinfo' or name == nil) then
		SendNUIMessage({
			query = 'playerinfo/hide',
		})
		PLAYER_INFO_SHOWN = false
		CURRENT_SCREEN = nil
		SetNuiFocus(false)
		BLOCK_KEYS = false
                TriggerEvent('nova-ui:change_screen', nil)
		return true
	end

	if CURRENT_SCREEN == name then
		if not PLAYER_INFO_SHOWN then
			SetNuiFocus(false)
			BLOCK_KEYS = false
		end

		CURRENT_SCREEN = nil
                TriggerEvent('nova-ui:change_screen', nil)
		return true
	end

	return false
end

RegisterNUICallback('query_api', function(data, cb)
--	TriggerEvent('nova-ui:on_api', data.cmd, data.args)

    if data.cmd == 'close' and CURRENT_SCREEN ~= 'menu' then
	    CloseScreen(CURRENT_SCREEN)
    end

    if data.cmd == 'menu/click' then
        TriggerEvent('nova-ui:menu_hide')
        cb({200})

	TriggerEvent('nova-ui:menu_click', data.args.menu, data.args.value)
        return
    end

    if data.cmd == 'menu/click-background' then
        TriggerEvent('nova-ui:menu_click_background')
        cb({200})
        return
    end

    if data.cmd == 'ui/popup/click' then
        TriggerEvent('nova-ui:menu_popup_click', data.args.item)
        cb({200})
        return
    end

    if data.cmd == 'playerinfo/runAction' then
        local item = data.args.slot.item
        TriggerServerEvent('esx_inventory:quickAction', item.uid )
        cb({200})
        return
    end

    if data.cmd == 'gasstation/pump' then
        TriggerEvent('nova-ui:pumpGasStation', data.args.brand, data.args.index)
        cb({200})
        return
    end

    if data.cmd == 'shop/warehouse/change' then
        local shopId = data.args.shopId
        local warehouse = data.args.warehouse
        local items = data.args.items
        TriggerServerEvent('shops:warehouseChange', shopId, warehouse, items )
        cb({200})
        return
    end

	ESX.TriggerServerCallback('nova-ui:query_api', function(res)
--		print(json.encode(res))
		cb(res)
	end, data)
end)

RegisterNetEvent('nova-ui:CloseScreen')
AddEventHandler('nova-ui:CloseScreen', function(screen)
	CloseScreen(screen)
end)

Citizen.CreateThread(function()
	SetNuiFocus(false)
	Citizen.Wait(100)
	SetNuiFocus(false)
        TriggerScreenblurFadeOut(0)
end)

RegisterCommand('+toggleui', function()
end, false)

RegisterCommand('-toggleui', function()
	SendNUIMessage({ query = 'ui/toggle' })
end, false)

RegisterKeyMapping('+toggleui', 'Скрыть весь интерфейс', 'keyboard', 'F9')
