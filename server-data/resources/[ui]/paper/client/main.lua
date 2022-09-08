-- internal variables
local menuIsShowed = false
ESX = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

function showMenu(uid, title, text, readonly)
	TriggerEvent('esx_inventory:hideInventoryMenu', function()
		menuIsShowed = true
		SetNuiFocus(true, true)

		ESX.TriggerServerCallback('esx:getPlayerData', function(data)
			SendNUIMessage({
				uid = uid,
				showMenu = true,
				title = title,
				text = text,
				readonly = readonly,
			})
		end)
	end)
end

function hideMenu()
	menuIsShowed = false
	SetNuiFocus(false)
	SendNUIMessage({
		hideAll = true
	})
end

Citizen.CreateThread(function()
	while true do
		if menuIsShowed then
			BlockWeaponWheelThisFrame()
			DisableControlAction(0, 1, true) -- LookLeftRight
			DisableControlAction(0, 2, true) -- LookUpDown
			DisableControlAction(0, 24, true) -- Attack
			DisableControlAction(0, 142, true) -- MeleeAttackAlternate
			DisableControlAction(0, 257, true) -- Attack 2
			DisableControlAction(0, 263, true) -- Melee Attack 1
			DisablePlayerFiring(PlayerPedId(), true) -- Disable weapon firing
			Citizen.Wait(0)
		else
			Citizen.Wait(500)
		end
	end
end)

RegisterNetEvent('paper:edit')
AddEventHandler('paper:edit', function(item)
	if item.textid then
		ESX.TriggerServerCallback('paper:getPaperText', function(papertext)
			showMenu(item.uid, item.paperTitle or 'Бумага', papertext, false)
		end, item.textid)
	else
		showMenu(item.uid, item.paperTitle or 'Бумага', item.text or '', false)
	end
end)

RegisterNetEvent('paper:view')
AddEventHandler('paper:view', function(item)
	if item.textid then
		ESX.TriggerServerCallback('paper:getPaperText', function(papertext)
			showMenu(item.uid, item.paperTitle or 'Бумага', papertext, true)
		end, item.textid)
	else
		showMenu(item.uid, item.paperTitle or 'Бумага', item.text or '', true)
	end
end)


RegisterNetEvent('paper:closeMenu')
AddEventHandler('paper:closeMenu', function()
	menuIsShowed = false
	SetNuiFocus(false)
	SendNUIMessage({
		hideAll = true
	})
end)

RegisterNUICallback('escape', function(data, cb)
	hideMenu()
	cb('ok')
end)

RegisterNUICallback('save', function(data, cb)
	if #data.title > 100 then
		ESX.ShowNotification("~r~Заголовок слишком длинный!")
		return
	end

	if #data.text > 30000 then
		ESX.ShowNotification("~r~Текст слишком длинный!")
		return
	end

	ESX.TriggerServerCallback('paper:newPaperText', function(textid)
		TriggerServerEvent('paper:savePaperText', data.original.uid, data.title, textid)
	end, data.text)

	hideMenu()
	cb('ok')
end)

-- close the menu when script is stopping to avoid being stuck in NUI focus
AddEventHandler('onResourceStop', function(resource)
	if resource == GetCurrentResourceName() then
		if menuIsShowed then
			hideMenu()
		end
	end
end)
