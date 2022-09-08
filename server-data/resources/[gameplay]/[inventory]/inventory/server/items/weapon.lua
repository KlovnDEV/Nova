ESX.Custom.Inventory.RegisterItemType('weapon', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		item.actions.player.wear = {
			['label'] = 'Разрядить',
			['priority'] = 3,
			['action'] = 'inventory:unload',
		}
		return item.actions
	end,

	getDescription = function(item)
		if item.extra and item.extra.ammoClip and item.extra.ammoWeapon then
			return 'П: '..tostring(item.extra.ammoWeapon + item.extra.ammoClip)
		else
			return ''
		end
	end,

	merge = function(xPlayer, inv_weapon, item_weapon, inv_ammo, item_ammo)
		if item_ammo.category ~= 'ammo' then
			return
		end

		if GetHashKey(item_weapon.extra.weaponName) then
			local amount = item_ammo.amount
			if (ESX.Custom.Inventory.RemoveItem(inv_ammo, item_ammo, amount, false)) then
				item_weapon.extra.ammoWeapon = item_weapon.extra.ammoWeapon + amount
				ESX.Custom.Inventory.UpdateItem(inv_weapon, item_weapon)
				return true
			end
		end
		
		return false
	end,


})

--[[
AddEventHandler('inventory:onBack', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	TriggerEvent('inventory:weaponOnBack', xPlayer.source, item)
end)
]]--

AddEventHandler('inventory:unload', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)
	--TODO: unload code

	item.extra.ammoWeapon = 0
	ESX.Custom.Inventory.UpdateItem(inventory, item)
end)
