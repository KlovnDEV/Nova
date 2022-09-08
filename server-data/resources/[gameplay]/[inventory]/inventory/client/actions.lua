itemActions = {}
itemActions["@shared"] = {}

function registerItemAction(itemName, actionName, actionLabel, actionPriority, cb_use, cb_if)
	if itemActions[itemName] == nil then
		itemActions[itemName] = {}
	end

	local act = {}
	act.label = actionLabel
	act.priority = actionPriority
	act.cb = cb_use
	act.condition = cb_if

	itemActions[itemName][actionName] = act
end

function getItemActions(itemName)

	if itemActions[itemName] == nil then
		itemActions[itemName] = {}
	end

	local actions = itemActions[itemName]
	for k,v in pairs(itemActions["@shared"]) do actions[k] = v end

	return actions
end


RegisterNetEvent('esx_inventory:itemAction')
AddEventHandler('esx_inventory:itemAction', function(data)
	assert(data)
	local extra = {}
	if data.action == 'drop' or data.action == 'container-put' or data.action == 'container-get' then
		TriggerEvent("esx_inventory:showInputBox", "drop-box", "Сколько выбросить?", "Введите количество предметов", function(text)
			extra.amount = tonumber(text) or 0
			TriggerServerEvent("inventory:runAction", data.inventory.category, data.inventory.identifier, data.item.item.uid, data.action, extra)
		end)
	else
		TriggerServerEvent("inventory:runAction", data.inventory.category, data.inventory.identifier, data.item.item.uid, data.action, extra)
	end

end)

AddEventHandler('esx_inventory:registerItemAction', function(itemName, actionName, actionLabel, actionPriority, cb_action, cb_condition)
	return registerItemAction(itemName, actionName, actionLabel, actionPriority, cb_action, cb_condition)
end)


--[[
function unequip_weapon(weaponName, amount)

	local playerPed = PlayerPedId()
	local weaponHash = GetHashKey(weaponName)
	local current_ammo = GetAmmoInPedWeapon(playerPed, weaponHash)

	if HasPedGotWeapon(playerPed, weaponHash, false) and current_ammo >= amount then
		if GetSelectedPedWeapon(playerPed) == weaponHash then
			SetCurrentPedWeapon(playerPed, GetHashKey("WEAPON_UNARMED"), true)
		end

		SetPedAmmo(playerPed, weaponHash, current_ammo - amount)
		RemoveWeaponFromPed(playerPed, weaponHash)

		TriggerServerEvent('esx_inventory:unequipWeapon', weaponName, amount)
		return true
	end

	return false
end

function equip_weapon(item)
	local weaponName = item.extra.weapon_name
	local playerPed = PlayerPedId()
	local weaponHash = GetHashKey(weaponName)

	if HasPedGotWeapon(playerPed, weaponHash, false) then
		ESX.ShowNotification(_U('already_equipped'))
	else
		GiveWeaponToPed(playerPed, weaponHash, item.extra.ammo, false, true)
		TriggerEvent('esx_inventory:updateInventory', "player", false)
	end
end

TriggerEvent('esx_inventory:registerItemAction', "recipe", "learn", "Изучить", 0, function(item)
	TriggerServerEvent('esx_inventory:actionUseRecipe', item.extra.name)
end)

RegisterNetEvent('esx_inventory:outfitWear')
AddEventHandler('esx_inventory:outfitWear', function(outfit)
	full_outfit = {
		["helmet_1"] = -1,
	}

	for k,v in pairs(outfit) do
		full_outfit[k] = v
	end

	TriggerEvent('skin:loadClothes', full_outfit)
end)

RegisterNetEvent('esx_inventory:unequipWeapon')
AddEventHandler('esx_inventory:unequipWeapon', function(weaponName, amount)
	unequip_weapon(weaponName, amount)
end)

RegisterNetEvent('esx_inventory:equipWeapon')
AddEventHandler('esx_inventory:equipWeapon', function(item)
	equip_weapon(item)
end)

AddEventHandler('esx_inventory:registerActions', function()

TriggerEvent('esx_inventory:registerItemAction', "esx_item", "heal_target", "Вылечить другого", 1, function(item)

	if item.extra == nil then
		TriggerEvent('esx:showNotification', "Что-то пошло не так")
		return
	end

	if item.extra.name ~= 'medikit' then
		return
	end

	local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
--	closestPlayer = PlayerId()
--	closestDistance = 0.1

	if closestPlayer ~= -1 and closestDistance < 1.0 then
		TriggerEvent('esx_ambulancejob:useMedikit', closestPlayer)
	else
		ESX.ShowNotification("Некого лечить!")
	end

end, function(item)
	if item.extra == nil then
		return false
	end

	if item.extra.name ~= 'medikit' then
		return false
	end

	return true
end)

TriggerEvent('esx_inventory:registerItemAction', "equipped_weapon", "unequip", _U("inventory_action_unequip"), 0, function(item)

	if item.extra == nil then
		TriggerEvent('esx:showNotification', "Что-то пошло не так")
		return
	end

	if item.extra.ammo > 0 then
		TriggerEvent("esx_inventory:showInputBox", "unequip-box", "Сколько разэкипировать?", "Введите количество патронов", function(text)
			local val = tonumber(text)
			if val ~= nil and val >= 0 and val <= item.extra.ammo then
				unequip_weapon(item.extra.weapon_name, val)
			else
				ESX.ShowNotification(_U('amount_invalid'))
			end
		end)
	else
		unequip_weapon(item.extra.weapon_name, 0)
	end
end)

TriggerEvent('esx_inventory:registerItemAction', "weapon", "equip", _U("inventory_action_equip"), 0, function(item)
	TriggerServerEvent('esx_inventory:equipWeapon', item)
end)

TriggerEvent('esx_inventory:registerItemAction', "money_pack", "unpack", _U("inventory_action_unpack"), 1, function(item)
	TriggerServerEvent('esx_inventory:actionUnpackMoney', item)
end)

TriggerEvent('esx_inventory:registerItemAction', "passport", "show", "Просмотреть", 1, function(item)
	TriggerEvent('esx_inventory:hideInventoryMenu', function()
		TriggerServerEvent('sosamba_ui:actionShowPassport', item)
	end)
end)

end)
]]--