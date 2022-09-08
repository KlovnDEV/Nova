function loadExtraFieldsFromDB(item, table_name)
	assert(item)
	assert(table_name)

    local res = MySQL.Sync.fetchAll('SELECT * FROM '..table_name..' WHERE name = @name', {
        ['@name'] = item.name,
	})

	if res and res[1] then
		for k,v in pairs(res[1]) do
			item[k] = v
		end
	end

	return item
end

RegisterServerEvent('inventory:runAction')
AddEventHandler('inventory:runAction', function(category, identifier, item_id, actionName, extra)
	assert(category)
	assert(identifier)
	assert(item_id)
	assert(actionName)

	local xPlayer = ESX.GetPlayerFromId(source)
	if not xPlayer then ESX.Error("Unknown xPlayer!", debug.traceback()) end

	local inv = ESX.Custom.Inventory.Get(category, identifier)

	if inv then
		local item = inv.items[item_id]
		if item then
			if actionName == 'drop' then
				TriggerEvent('inventory:actionDrop', xPlayer, inv, item, actionName, extra)
			elseif actionName == 'container-get' then
				TriggerEvent('inventory:actionContainerGet', xPlayer, inv, item, actionName, extra)
			elseif actionName == 'container-put' then
				TriggerEvent('inventory:actionContainerPut', xPlayer, inv, item, actionName, extra)
			else
				ESX.Custom.Inventory.RunItemAction(xPlayer, inv, item, actionName)
			end
		end
	end
end)


RegisterServerEvent('inventory:actionContainerGet')
AddEventHandler('inventory:actionContainerGet', function(xPlayer, inv, item, actionName, extra)
	assert(xPlayer)
	assert(inv)
	assert(item)
	assert(actionName)

	local playerinv = ESX.Custom.Inventory.Get('player', xPlayer.identifier)
	assert(playerinv)

	if extra.amount < 1 then
		xPlayer.showNotification('~r~Неверное количество предметов!')
		return
	end

	if not ESX.Custom.Inventory.TransferItem(item, extra.amount, inv, playerinv, true) then
		xPlayer.showNotification('~r~Невозможно переместить!')
		return
	end
end)

RegisterServerEvent('inventory:actionContainerPut')
AddEventHandler('inventory:actionContainerPut', function(xPlayer, inv, item, actionName, extra)
	assert(xPlayer)
	assert(inv)
	assert(item)
	assert(actionName)

	if not extra.current_container then
		xPlayer.showNotification('~r~Некуда положить!')
		return
	end

	if extra.amount < 1 then
		xPlayer.showNotification('~r~Неверное количество предметов!')
		return
	end

	local containerinv = ESX.Custom.Inventory.Get(extra.current_container.category, extra.current_container.identifier)
	assert(containerinv)

	if not ESX.Custom.Inventory.TransferItem(item, extra.amount, inv, containerinv, true) then
		xPlayer.showNotification('~r~Невозможно переместить!')
		return
	end
end)


RegisterServerEvent('inventory:actionDrop')
AddEventHandler('inventory:actionDrop', function(xPlayer, inv, item, actionName, extra)
	assert(xPlayer)
	assert(inv)
	assert(item)
	assert(actionName)

	local amount = item.amount

	if extra.amount then
		amount = extra.amount
	end

	if amount < 1 then
		xPlayer.showNotification('~r~Неверное количество предметов!')
		return
	end

	if ESX.Custom.Inventory.RemoveItem(inv, item, amount, false) then
		TriggerEvent('inventory:createPickup', xPlayer.source, item, amount, item.label, function(success)
			if not success then
				-- FIXME: return item to inventory
			end
		end, extra.coords, extra.rotation)
	end
end)

function changeConsumeStatus(handle, name, value)
        if value then
            if value < 0 then
                TriggerEvent('engine:status:sub', handle, name, -value)
            elseif value > 0 then
                TriggerEvent('engine:status:add', handle, name, value)
            end
        end
end

AddEventHandler('inventory:actionConsume', function(xPlayer, inventory, item, anim)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	local source = xPlayer.source

	if not ESX.Custom.Inventory.RemoveItem(inventory, item, 1, false) then
		return
	end

	changeConsumeStatus(source, 'hunger', -(item.extra.food or 0))
	changeConsumeStatus(source, 'thirst', -(item.extra.water or 0))
	changeConsumeStatus(source, 'alcohol', item.extra.alcohol or 0)
	changeConsumeStatus(source, 'smoking', item.extra.nf or 0)
	changeConsumeStatus(source, 'drugs', item.extra.drugs or 0)

        if anim == 'eat' then
            TriggerClientEvent('esx_basicneeds:onEat', source, item.prop)
        elseif anim == 'drink' then
            TriggerClientEvent('esx_basicneeds:onDrink', source, item.prop)
        elseif item.extra.nf and anim == 'smoke' then
            TriggerClientEvent('esx_basicneeds:smoking', source, item.extra.nf)
        elseif item.extra.np and anim == 'patch' then
            TriggerClientEvent('esx_basicneeds:nicotinePatch', source, item.extra.np)
        elseif item.extra.sd and anim == 'sedative' then
            TriggerClientEvent('esx_basicneeds:sedative', source, item.extra.sd)
        elseif item.extra.drugs and anim == 'drugs' then
            TriggerClientEvent('drugs:effect', source, item.extra.drugs)
        elseif item.extra.at and anim == 'antitox' then
            TriggerClientEvent('esx_basicneeds:antitox', source, item.extra.at)
	end
end)
