MENU_CALLBACKS = {}
ACTIVE_MENU = nil

Citizen.CreateThread(function()
 	while true do
		if CURRENT_SCREEN == 'menu' then
			if IsDisabledControlJustReleased(0, 25) then  --right mouse
				if ACTIVE_MENU and MENU_CALLBACKS[ACTIVE_MENU] and MENU_CALLBACKS[ACTIVE_MENU].back then
					MENU_CALLBACKS[ACTIVE_MENU].back()
				end
			end

			if IsDisabledControlJustReleased(0, 322) then -- ESC
				TriggerEvent('nova-ui:menu_hide')
			end

			Citizen.Wait(0)
		else
			Citizen.Wait(100)
		end
	end
end)

RegisterNetEvent('nova-ui:menu_show')
AddEventHandler('nova-ui:menu_show', function(name, data, callbacks)
	SendNUIMessage({
            query = 'menu/show',
            name = name,
	    elements = data.elements,
	    position = data.position,
            title = data.title,
            page = page or 'index',
	})
	MENU_CALLBACKS[name] = callbacks
	ACTIVE_MENU = name
	OpenScreen('menu')
end)

RegisterNetEvent('nova-ui:menu_switchPage')
AddEventHandler('nova-ui:menu_switchPage', function(page)
	SendNUIMessage({
	    switchPage = true,
      page = page or 'index',
	})
end)


RegisterNetEvent('nova-ui:menu_hide')
AddEventHandler('nova-ui:menu_hide', function(elements, position)
	SendNUIMessage({
            query = 'menu/hide',
	})

	CloseScreen('menu')
	ACTIVE_MENU = nil
end)

AddEventHandler('nova-ui:menu_click', function(menu, value)
	if value and menu and MENU_CALLBACKS[menu] and MENU_CALLBACKS[menu].click then
		MENU_CALLBACKS[menu].click(value)
	end
end)

function openPlayerPopup(target)
	local x,y = GetNuiCursorPosition()
	local serverid = GetPlayerServerId(target)

	SendNUIMessage({
		query = 'ui/showPopup',
		x = x,
		y = y,
		menu = {
			{
				name = 'player-search',
				label = 'Обыскать',
				target = serverid,
			},
			{
				name = 'player-health',
				label = 'Мед. осмотр',
				target = serverid,
			},
		},
	})
end

function openPickupPopup(pickupId, entity)
	local x,y = GetNuiCursorPosition()
	local ped = PlayerPedId()
	local coords = GetEntityCoords(ped)
	local objCoords = GetEntityCoords(entity)

	local elements = {}

	if #(coords - objCoords) <= 2.0 then
		table.insert(elements, {
			name = 'pickup-hands',
			label = 'Поднять',
			target = pickupId,
		})
	end

	local veh = ESX.Game.GetClosestVehicle(objCoords)

	if DoesEntityExist(veh) then
		local vehCoords = GetEntityCoords(veh)
		if #(vehCoords - coords) < 6.0 then
			table.insert(elements, {
				name = 'pickup-car',
				label = 'Погрузить',
				pickup = pickupId,
				vehicle = veh,
			})
		end
	end

	if #elements == 0 then
		return
	end

	SendNUIMessage({
		query = 'ui/showPopup',
		x = x,
		y = y,
		menu = elements,
	})
end

AddEventHandler('nova-ui:menu_popup_click', function(item)
	if item.name == 'player-search' then
		TriggerServerEvent('nova-ui:player_search', item.target)
	elseif item.name == 'player-health' then
		TriggerServerEvent('nova-ui:player_health', item.target)
	elseif item.name == 'pickup-hands' then
		TriggerServerEvent('esx_inventory:onPickup', item.target)
	elseif item.name == 'pickup-car' then
		TriggerEvent('trunks:getVehicleBootInventory', item.vehicle, function(inv)
			if not inv then
				return
			end

			TriggerServerEvent('esx_inventory:putPickupIntoCarTrunk', item.pickup, inv)
		end)
	end
end)

AddEventHandler('nova-ui:menu_click_background', function()
	local cameraCoord, hit, coords, normal, entity = NUICursorRaycast()

	if #(GetEntityCoords(PlayerPedId())-coords) > 3.0 then
		return
	end

	if IsEntityAVehicle(entity) then
--		openVehiclePopup(entity)
		vehicleControl(entity, coords)

		return
	end

	if IsEntityAPed(entity) and IsPedAPlayer(entity) then
		local playerid = NetworkGetPlayerIndexFromPed(entity)
		openPlayerPopup(playerid)

		return
	end

	if DoesEntityExist(entity) then
		local pickupId = DecorGetInt(entity, "PICKUP_ID")
		if pickupId > 0 then
			openPickupPopup(pickupId, entity)
		end
	end

end)

RegisterNUICallback('menu_left', function(data, cb)
	if data.value and data.menu and MENU_CALLBACKS[data.menu] and MENU_CALLBACKS[data.menu].left then
		MENU_CALLBACKS[data.menu].left(data)
	end
end)

RegisterNUICallback('menu_right', function(data, cb)
	if data.value and data.menu and MENU_CALLBACKS[data.menu] and MENU_CALLBACKS[data.menu].right then
		MENU_CALLBACKS[data.menu].right(data)
	end
end)

RegisterNUICallback('menu_up', function(data, cb)
	if data.value and data.menu and MENU_CALLBACKS[data.menu] and MENU_CALLBACKS[data.menu].change then
		MENU_CALLBACKS[data.menu].change(data)
	end
end)

RegisterNUICallback('menu_down', function(data, cb)
	if data.value and data.menu and MENU_CALLBACKS[data.menu] and MENU_CALLBACKS[data.menu].change then
		MENU_CALLBACKS[data.menu].change(data)
	end
end)

RegisterNUICallback('menu_back', function(data, cb)
	if data.menu and MENU_CALLBACKS[data.menu] and MENU_CALLBACKS[data.menu].back then
		MENU_CALLBACKS[data.menu].back()
	end
end)

