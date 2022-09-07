local nuiFocus = false
local inputBoxes = {}

Citizen.CreateThread(function()
	SetNuiFocus(false)
	Citizen.Wait(100)
	SetNuiFocus(false)
end)

function inventoryAddNativeItems(elements, inventory)
	if inventory == nil or inventory.items == nil then
		return
	end

	for k,v in pairs(inventory.items) do
		local itemtitle = v.name

		if v.label ~= nil then
			itemtitle = v.label
		end

		local itemdesc = v.description or ''

		local melee = false
		local ammo = 0
		local skip_item = false

		if (v.name == "weapon" or v.name == "equipped_weapon") and v.extra ~= nil then
			local weaponHash = GetHashKey(v.extra.weapon_name)
			local weaponType = GetWeapontypeGroup(weaponHash)
			ammo = v.extra.ammo
			melee = weaponType == RequestModel(GetHashKey("GROUP_MELEE")) --`GROUP_MELEE`
			if v.name == "equipped_weapon" then
				itemdesc = "Экипировано"
				if not HasPedGotWeapon(PlayerPedId(), weaponHash, false) then
					skip_item = true
				end
			end
		end

		if not skip_item then
		table.insert(elements, {
			title = itemtitle,
			description = itemdesc,
			count = v.amount,
			melee = melee,
			ammo = ammo,
			weight = (v.weight or 0)*v.amount,
			name = v.name,
			item = v,
			actions = {},
		})
		end
	end
end

function generateInventoryElements(inventory)
	local elements = {}

--	inventoryAddMoneyItems(elements)
	inventoryAddNativeItems(elements, inventory)
--	inventoryAddESXItems(elements)
--	inventoryAddWeaponItems(elements)

	for i,elem in pairs(elements) do
--FIXME ITEM ACTIONS
		local actions = elem.item.actions[inventory.actionGroup or inventory.category] or {} -- exports['esx_inventory']:getItemActions(elem.name)

		if elements[i].actions == nil then
			elements[i].actions = {}
		end

               for name,act in pairs(actions) do
                       if act.condition == nil or act.condition(elem.item, inventory) == true then
                               table.insert(elements[i].actions, {
                                       key = name,
                                       label = act.label,
                                       priority = act.priority,
                               })
                       end
		end
--[[
		for j,act in pairs(actions) do
			table.insert(elements[i].actions, {
				key = act.name,
				label = act.label,
				priority = act.priority,
			})
		end
]]--
		table.insert(elements[i].actions, {
			key = "return",
			icon = "keyboard-return",
			label = _U("inventory_action_return"),
		})
	end

	return elements

end

function showInventoryMenu(inventory)
	SendNUIMessage({
		action  = 'showInventory',
		inventory = inventory,
		value = true,
	})

	nuiFocus = true
	SetNuiFocus(true, true)
	local elements = generateInventoryElements(inventory)

	SendNUIMessage({
		action  = 'updateInventory',
		inventory = inventory,
		items = elements,
		weight = inventory.weight,
	})

end

function hideInventoryMenu()
	SendNUIMessage({
		action  = 'showInventory',
		value = false,
	})

	if nuiFocus == true then
		nuiFocus = false
		SetNuiFocus(false)
	end

	TriggerEvent('esx_inventory:onInventoryHide')
end

RegisterNetEvent('esx_inventory:showInventoryMenu')
AddEventHandler('esx_inventory:showInventoryMenu', function(inventory)
	showInventoryMenu(inventory)
end)

RegisterNetEvent('esx_inventory:hideInventoryMenu')
AddEventHandler('esx_inventory:hideInventoryMenu', function(cb)
	hideInventoryMenu()
	if cb then
		cb()
	end
end)

Citizen.CreateThread(function()
	while true do
		if nuiFocus then
			local playerPed = PlayerPedId()
			DisableAllControlActions(0)
		end

		Citizen.Wait(0)
	end
end)

RegisterNUICallback('escape', function(data, cb)
	hideInventoryMenu()
	cb('ok')
end)

RegisterNUICallback('do_action', function(data, cb)
	TriggerEvent('esx_inventory:itemAction', data )
end)

RegisterNetEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inventory)
	local elements = generateInventoryElements(inventory)
	SendNUIMessage({
		action  = 'updateInventory',
		inventory = inventory,
		items = elements,
		weight = inventory.weight,
	})
end)

RegisterNUICallback('inputbox', function(data)
	if data.id ~= nil and inputBoxes[data.id] ~= nil then
		inputBoxes[data.id](data.text)
		inputBoxes[data.id] = nil
	end
end)

function showInputBox(id, title, hint, cb)
	inputBoxes[id] = cb
	SendNUIMessage({
		action  = 'showInputBox',
		id = id,
		title = title,
		hint = hint,
	})
end

RegisterNetEvent('esx_inventory:showInputBox')
AddEventHandler('esx_inventory:showInputBox', function(id, title, hint, cb)
	showInputBox(id, title, hint, cb)
end)
