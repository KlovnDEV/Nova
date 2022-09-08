----------------------------------
-- Created 21.03.202 by Fellini --
--      fellinirp@gmail.com     --
-- DeJavu Roleplay Server 1.0.0 --
----------------------------------
ESX = nil
BLOCK_KEYS = false

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while ESX.GetPlayerData().job == nil do
		Citizen.Wait(10)
	end

	ESX.PlayerData = ESX.GetPlayerData()
end)

Blips = {}

Citizen.CreateThread(function()

	for k, Blip in pairs(Config.Blips) do

		Blips[k] = BlipClass:new({
			pos = vector3(Blip.x,Blip.y,Blip.z),
			text = Blip.title,
			sprite  = Blip.id,
			display = 4,
			scale   = 1.0,
			color   = 4,
			shortRange = true,
		})
	end

end)

Citizen.CreateThread(function()
	while true do
        Citizen.Wait(1)
        local playerPed = PlayerPedId()
		local coords = GetEntityCoords(playerPed)

		if BLOCK_KEYS 	then
			 DisableAllControlActions(0)
		end

		local sellDistance = #(vector3(Config.Blips.sell.x,Config.Blips.sell.y,Config.Blips.sell.z)-coords)

		if sellDistance < 20.0 then
			for k, marker in pairs(Config.SellPoints) do
				DrawMarker(20, marker.x, marker.y, marker.z, 0, 0, 0, 0, 0, 100.0, 1.0, 1.0, 1.0, 0, 155, 253, 155, 1, 0, 2, 0, 0, 0, 0)

				if #(vector3(marker.x, marker.y, marker.z)-coords) < 1.5 then
					ESX.ShowHelpNotification(_U('sell_notification'))

					if IsControlJustReleased(1, 38) then
						OpenSellGui()
					end
				end
			end
		end

		local buyDistance = #(vector3(Config.Blips.buy.x,Config.Blips.buy.y,Config.Blips.buy.z)-coords)

		if buyDistance < 20.0 then
			for k, marker in pairs(Config.BuyPoints) do
				DrawMarker(20, marker.x, marker.y, marker.z, 0, 0, 0, 0, 0, 100.0, 1.0, 1.0, 1.0, 0, 155, 253, 155, 1, 0, 2, 0, 0, 0, 0)

				if #(vector3(marker.x, marker.y, marker.z)-coords) < 1.5 then
					ESX.ShowHelpNotification(_U('buy_notification'))

					if IsControlJustReleased(1, 38) then
						OpenBuyGui()
					end
				end
			end
		end
	end
end)

-- NUI events --
OpenSellGui = function()
	ESX.TriggerServerCallback('mall:getPlayerItems', function(items)
		SendGuiState('sell', true, json.encode(items))
	end)
end

OpenBuyGui = function()
	ESX.TriggerServerCallback('mall:getItemsList', function(items)
		SendGuiState('buy', true, json.encode(items))
	end)
end

SendGuiState = function(item, visibility, items)
	SetNuiFocus(true, true)
	BLOCK_KEYS = true
		SendNUIMessage({
        element = item,
        display = visibility,
        items = items
    })
end

-- NUI callbacks --
RegisterNUICallback('search', function(data)
	ESX.TriggerServerCallback('mall:getSelectedItems', function(items)
		SendNUIMessage({
			buyGrid = true,
			gridItems = json.encode(items)
		})
	end, data.value)
end)

RegisterNUICallback('close_menu', function(element)
	SendGuiState(element, false)
	SetNuiFocus(false, false)
	BLOCK_KEYS = false
end)

RegisterNUICallback('buy_item', function(data)
	local sum = 0
	if data.error == 'nan_qty' then
		ESX.ShowNotification(_U('error_by_form'))
	else
		sum = data.selectedQty * data.itemPrice

		ESX.TriggerServerCallback('mall:checkMoney', function(result)
			local error = data.error
			local errorMessage = ""

			if error == 'empty_qty' then
				errorMessage = _U('error_empty_qty')
			elseif error == 'wrong_qty' then
				errorMessage = _U('qty_greater_than_available')
			elseif result == 'error' then
				errorMessage = _U('error_money')
			elseif data.selectedQty == nil then
				errorMessage = _U('error_try_again')
			end

			if errorMessage == "" then
				SendGuiState('buy', false)
				SetNuiFocus(false, false)
				BLOCK_KEYS = false
				TriggerServerEvent('mall:buyItem', data, sum)
			else
				ESX.ShowNotification(errorMessage)
			end
		end, sum)
	end
end)

RegisterNUICallback('sell_item', function(data)
	local error = data.error
	local errorMessage = ""

	if error == 'empty_value' then
		errorMessage = _U('error_empty_value')
	elseif error == 'empty_qty' then
		errorMessage = _U('error_empty_qty')
	elseif error == 'empty_price' then
		errorMessage = _U('error_empty_price')
	elseif error == 'nan_qty' then
		errorMessage = _U('error_nan_qty')
	elseif error == 'nan_price' then
		errorMessage = _U('error_nan_price')
	elseif error == 'qty_failure' then
		errorMessage = _U('error_qty_failure')
	end

	if errorMessage == "" then
		SendGuiState('sell', false)
		SetNuiFocus(false, false)
		BLOCK_KEYS = false
		TriggerServerEvent('mall:placeItem', data)
		ESX.ShowNotification(_U('notify_player_placed_item', data.qty, data.label))
	else
		ESX.ShowNotification(errorMessage)
	end
end)
