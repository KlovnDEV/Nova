ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function lower_only(a, b, def)
	if a ~= nil and b ~= nil then
		return math.min(a,b)
	elseif a ~= nil then
		return a
	elseif b ~= nil then
		return b
	end

	return def or 0
end

RegisterServerEvent('weapon:updateAmmo')
AddEventHandler('weapon:updateAmmo', function(weapon, ammoClip, ammoWeapon)
--	print('updateAmmo', weapon, ammoClip, ammoWeapon)

	local xPlayer = ESX.GetPlayerFromId(source)
	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
        local handr_area = inv.areas['hand_r']
        local item = ESX.Custom.Inventory.SearchFirst(inv, { x = handr_area.x, y = handr_area.y })

	if not item then
        	local handl_area = inv.areas['hand_l']
	        item = ESX.Custom.Inventory.SearchFirst(inv, { x = handl_area.x, y = handl_area.y })
	end

	if item and item.category == 'weapon' then
		if GetHashKey(item.extra.weaponName) == weapon then
			item.extra.ammoClip = lower_only(ammoClip, item.extra.ammoClip)
			item.extra.ammoWeapon = lower_only(ammoWeapon, item.extra.ammoWeapon)
			ESX.Custom.Inventory.UpdateItem(inv, item)
		end
	end

end)

RegisterServerEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inv)
    if inv.category ~= 'player-inventory' then
        return
    end

    local xPlayer = ESX.GetPlayerFromIdentifier(inv.identifier)

    if xPlayer == nil then
        return
    end

    local inv = ESX.Custom.Inventory.Get(inv.category, inv.identifier)

    local handr_area = inv.areas['hand_r']
    local item = ESX.Custom.Inventory.SearchFirst(inv, { x = handr_area.x, y = handr_area.y })

    if not item then
        local handl_area = inv.areas['hand_l']
        item = ESX.Custom.Inventory.SearchFirst(inv, { x = handl_area.x, y = handl_area.y })
    end

    if item and item.category ~= 'weapon' then
        TriggerClientEvent('weapon:setHandProp', xPlayer.source, item.prop)
    end

    if item and item.category == 'weapon' then
	if item.extra and item.extra.weaponName then
	        TriggerClientEvent('weapon:setWeapon', xPlayer.source, GetHashKey(item.extra.weaponName), item.extra.ammoClip or 0, item.extra.ammoWeapon or 0)
	else
	        TriggerClientEvent('weapon:setWeapon', xPlayer.source, nil, 0, 0)
		print('Weapon item has no name field! '.. tostring(item.name)..' '..tostring(item.uid))
	end
    else
        TriggerClientEvent('weapon:setWeapon', xPlayer.source, nil, 0, 0)
    end
end)
