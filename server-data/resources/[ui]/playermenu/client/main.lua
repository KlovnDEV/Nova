Keys = {
	["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57, ["F11"] = 344,
	["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177,
	["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
	["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
	["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
	["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70,
	["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
	["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
	["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

ESX = nil
isAdmin = false
instancedPlayers = {}

RegisterNetEvent('instance:onInstancedPlayersData')
AddEventHandler('instance:onInstancedPlayersData', function(_instancedPlayers)
	instancedPlayers = _instancedPlayers
end)

AddEventHandler('esx_playermenu:openVehicleMenu', function()
       OpenVehicleMenu()
end)

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	isAdmin = true
end)

function Teleport(x, y)
	for z = 1000,1,-1 do
		ESX.Game.Teleport(PlayerPedId(), vector3(x*1.0, y*1.0, z*1.0))
		local foundGround, z = GetGroundZFor_3dCoord(x*1.0, y*1.0, z*1.0)

		if foundGround then
			ESX.Game.Teleport(PlayerPedId(), vector3(x*1.0, y*1.0, z*1.0))
			return z
		end
	end

	return nil
end

function TeleportToWaypoint()
	local blip = GetFirstBlipInfoId(8)
	if blip > 0 then
		NetworkFadeOutEntity(PlayerPedId(), 1, 0)
		Citizen.Wait(300)
		local coords = GetBlipInfoIdCoord(blip)
		Teleport(coords.x, coords.y)
		Citizen.Wait(300)
		NetworkFadeInEntity(PlayerPedId(), 0)
	else
		ESX.ShowNotification('Точка не установлена')
	end
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
--			if IsControlJustPressed(0, 188) and IsControlPressed(0, Keys['LEFTSHIFT']) then
--				TriggerEvent('esx_accessories:SetUnsetAccessory', "Mask")
--			end

--			if IsControlJustPressed(0, Keys['~']) then
--				OpenMenu()
--			end

			if isAdmin == true and IsControlJustPressed(0, Keys['F11']) then
				OpenAdminMenu()
			end
	end
end)

RegisterNetEvent('esx_playermenu:setAdmin')
AddEventHandler('esx_playermenu:setAdmin', function(val)
	isAdmin = val
end)

RegisterNetEvent('esx_playermenu:bringPlayer')
AddEventHandler('esx_playermenu:bringPlayer', function(pos)
	local interior = GetInteriorAtCoords(pos.x, pos.y, pos.z)
	if interior > 0 then
		LoadInterior(interior)

		while not IsInteriorReady(interior) do
			Citizen.Wait(100)
		end
	end

	ESX.Game.Teleport(PlayerPedId(), pos, function()
	end)
end)

function OpenTextInput(title, defaultText, maxInputLength)

	if title == nil then
		title = "FMMC_KEY_TIP8"
	else
		AddTextEntry('FT_TEXT', title)
		title = "FT_TEXT"
        end

	DisplayOnscreenKeyboard(true, title, "", defaultText, "", "", "", maxInputLength)

	while UpdateOnscreenKeyboard() == 0 do
		DisableAllControlActions(0)
		Citizen.Wait(10)
	end

	local result = GetOnscreenKeyboardResult()
	if result then
		return result
	else
		return nil
	end

end


function OpenAdminMenu()
	local elements = {}

	table.insert(elements, {label = 'Телепорт', value = 'teleport'})
	table.insert(elements, {label = 'Транспорт', value = 'transport'})

	TriggerEvent('nova-ui:menu_show', 'admin_menu', {
		name = "admin_menu",
		title = "Администрирование",
		position = "tr",
		elements = elements
	}, { 

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

			if cmd == "teleport" then
				TeleportToWaypoint()
			end

			if cmd == "transport" then
				OpenAdminMenuVehicle()
			end

		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})

end

function OpenAdminMenuVehicle()
	local vehicle = GetVehiclePedIsIn(PlayerPedId(), false)

	if vehicle == 0 then
		vehicle = GetClosestVehicle(GetEntityCoords(PlayerPedId()), 5.0, 0, 70)
	end

	if vehicle == 0 then
		return
	end

	local plate = ESX.Math.Trim(GetVehicleNumberPlateText(vehicle))

	local elements = {}
	table.insert(elements, {label = 'Починить', value = 'repair'})
	table.insert(elements, {label = 'Вскрыть замки', value = 'unlock'})

	TriggerEvent('nova-ui:menu_show', 'admin_menu_vehicle', {
		name = "admin_menu_vehicle",
		title = "Администрирование: Транспорт",
		position = "tr",
		elements = elements
	}, { 

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

			if cmd == "repair" then
				SetVehicleFixed(vehicle)
				SetVehicleDeformationFixed(vehicle)
				SetVehicleUndriveable(vehicle, false)
				SetVehicleEngineOn(vehicle, true, true)
			elseif cmd == "unlock" then
				SetVehicleDoorsLocked(vehicle, 1)
				SetVehicleDoorsLockedForAllPlayers(vehicle, false)
			end

		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end


function OpenVehicleMenu()
	local vehicle  = GetVehiclePedIsIn(PlayerPedId(), false)
	if vehicle == 0 then
		return
	end

	local elements = {}

	if IsVehicleEngineOn(vehicle) then
		table.insert(elements, {label = 'Заглушить двигатель', value = 'engine-off'})
	else
		table.insert(elements, {label = 'Завести двигатель', value = 'engine-on'})
	end

	table.insert(elements, {label = 'Опустить стёкла', value = 'rolldown-windows'})
	table.insert(elements, {label = 'Поднять стёкла', value = 'rollup-windows'})

	table.insert(elements, {label = 'Открыть капот', value = 'hood-open'})
	table.insert(elements, {label = 'Закрыть капот', value = 'hood-shut'})

	table.insert(elements, {label = 'Открыть багажник', value = 'trunk-open'})
	table.insert(elements, {label = 'Закрыть багажник', value = 'trunk-shut'})

	table.insert(elements, {label = 'Открыть все двери', value = 'doors-open'})
	table.insert(elements, {label = 'Закрыть все двери', value = 'doors-shut'})

	TriggerEvent('nova-ui:menu_show', 'vehicle_menu', {
		name = "vehicle_menu",
		title = "Транспорт",
		position = "tr",
		elements = elements
	}, { 

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

		if cmd == 'rolldown-windows' then
			RollDownWindows(vehicle)
		end

		if cmd == 'rollup-windows' then
			for i=0,4 do
				RollUpWindow(vehicle, i)
			end
		end

		if cmd == 'engine-on' then
			SetVehicleEngineOn(vehicle, true, false, true)
		end

		if cmd == 'engine-off' then
			SetVehicleEngineOn(vehicle, false, false, true)
		end

		if cmd == 'hood-open' then
			SetVehicleDoorOpen(vehicle, 4, false, false)
		end

		if cmd == 'hood-shut' then
			SetVehicleDoorShut(vehicle, 4, false, false)
		end

		if cmd == 'trunk-open' then
			SetVehicleDoorOpen(vehicle, 5, false, false)
		end

		if cmd == 'trunk-shut' then
			SetVehicleDoorShut(vehicle, 5, false, false)
		end

		if cmd == 'doors-open' then
			for i=0,10 do --GetNumberOfVehicleDoors(vehicle)
				SetVehicleDoorOpen(vehicle, i, false, false)
			end
		end

		if cmd == 'doors-shut' then
			for i=0,10 do
				SetVehicleDoorShut(vehicle, i, false, false)
			end
		end

		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end

function OpenPersonalMenu()
	local elements = {}

	table.insert(elements, {label = 'Посмотреть паспорт', value = 'lookpass'})
	table.insert(elements, {label = 'Посмотреть вод.права', value = 'lookdrivelic'})
	table.insert(elements, {label = 'Посмотреть лиц. на оружие', value = 'lookgunlic'})
	table.insert(elements, {label = 'Показать паспорт', value = 'showpass'})
	table.insert(elements, {label = 'Показать вод.права', value = 'showdrivelic'})
	table.insert(elements, {label = 'Показать лиц. на оружие', value = 'showgunlic'})
	table.insert(elements, {label = 'Передать автомобиль', value = 'changecarowner'})

	ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'personal_menu', {
		title    = "Персональная информация",
		align    = 'top-left',
		elements = elements
	}, function(data, menu)
		local cmd = data.current.value
		local player, distance = ESX.Game.GetClosestPlayer()

		if cmd == 'lookpass' then
			--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(PlayerId()))
		elseif cmd == 'lookdrivelic' then
			--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(PlayerId()), 'driver')
		elseif cmd == 'lookgunlic' then
			--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(PlayerId()), 'weapon')
		elseif cmd == 'showpass' then
			if distance ~= -1 and distance <= 3.0 then
				--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(player))
			else
				ESX.ShowNotification('Некому показать :(')
			end
		elseif cmd == 'showdrivelic' then
			if distance ~= -1 and distance <= 3.0 then
				--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(player), 'driver')
			else
				ESX.ShowNotification('Некому показать :(')
			end
		elseif cmd == 'showgunlic' then
			if distance ~= -1 and distance <= 3.0 then
				--TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(player), 'weapon')
			else
				ESX.ShowNotification('Некому показать :(')
			end
		elseif cmd == 'changecarowner' then
			--TriggerServerEvent('esx_givecarkeys:frommenu')
		end

		menu.close()

	end, function(data, menu)
		menu.close()
	end)
end

function OpenInteractionMenu()
	local elements = {}

	table.insert(elements, {label = ('Взять на руки'), value = 'liftup'})
	table.insert(elements, {label = ('Закинуть на плечо'), value = 'carry'})
	table.insert(elements, {label = ('Взять в заложники'), value = 'hostage'})
	table.insert(elements, {label = ('Поздороваться с братишкой'), value = 'bro'})
	table.insert(elements, {label = ('Обнять'), value = 'hug'})
	table.insert(elements, {label = ('Геттовское приветствие'), value = 'handshake'})


	ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'clothes_menu', {
		title    = "Взаимодействие",
		align    = 'top-right',
		elements = elements
	}, function(data, menu)
		local cmd = data.current.value
		if cmd == 'liftup' then
			TriggerEvent('CarryPeople:carry', 'forward')
		elseif cmd == 'carry' then
			TriggerEvent('CarryPeople:carry', 'shoulder')
		elseif cmd == 'hostage' then
			TriggerEvent('hostage:takeHostage')
		elseif cmd == 'bro' then
			TriggerEvent('dpemotes:shared_emote', 'bro')
		elseif cmd == 'hug' then
			TriggerEvent('dpemotes:shared_emote', 'hug2')
		elseif cmd == 'handshake' then
			TriggerEvent('dpemotes:shared_emote', 'handshake2')
	        end

		menu.close()

	end, function(data, menu)
		menu.close()
	end)
end

function OpenMenu()
	elements = {
		{label = "Инвентарь", value = 'inventory'},
	}

	if IsPedSittingInAnyVehicle(PlayerPedId()) then
		table.insert(elements, {label = "Транспорт", value = 'vehicle'})
	end

	if isAdmin == true then
		table.insert(elements, {label = "Действия администрации", value = 'admin-actions'})
	end

	TriggerEvent('nova-ui:menu_show', 'player-menu', {
		name = "player-menu",
		title = "Меню игрока",
		position = "tl",
		elements = elements
	}, {

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

			if cmd == 'inventory' then
				TriggerEvent('inventory:showPlayerInventory')
			elseif cmd == 'vehicle' then
				OpenVehicleMenu()
			elseif cmd == 'admin-actions'then
				OpenAdminMenu()
			elseif cmd == 'personal' then
				-- TriggerServerEvent('jsfour-idcard:open', GetPlayerServerId(PlayerId()), GetPlayerServerId(PlayerId()))
				OpenPersonalMenu()
			elseif cmd == 'documents' then
				TriggerEvent('esx_documents:openMainMenu')
			elseif cmd == 'crafting' then
	--			TriggerServerEvent('crafting:getPlayerInventory')
				TriggerEvent('vuecraft:show')
			end

		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end
