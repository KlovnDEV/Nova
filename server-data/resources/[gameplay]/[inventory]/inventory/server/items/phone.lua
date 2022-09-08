ESX.Custom.Inventory.RegisterItemType('phone', {

	init = function(item)
		item.number = "empty"
		return item
	end,

	getDescription = function(item)
		if item.number and item.number ~= "empty" then
			return "SIM: "..tostring(item.number)
		end

		return 'Без SIM-карты'
	end,

	getActions = function(item)
		if item['number'] ~= 'empty' then
			item.actions.player['remove-sim'] = {
					['label'] = 'Забрать SIM-карту',
					['priority'] = 2,
					['action'] = 'inventory:removeSim'
			}
		end

		return item.actions
	end,

	merge = function(xPlayer, inv1, item1, inv2, item2)
		if item2.name == 'sim' then
			return insertSim(xPlayer, inv2, item2, inv1, item1)
		end

		if item2.name ~= 'phone' then
			return false
		end

		if item1['number'] ~= 'empty' or item2['number'] ~= 'empty' then
			return false
		end

		return AbstractMergeItems(xPlayer, inv1, item1, inv2, item2)
	end,
})

function insertSim(xPlayer, inv_sim, item_sim, inv_phone, item_phone)
	if item_phone.number ~= 'empty' then
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~r~В телефоне уже есть sim-карта!")
		return false
	end

	if (ESX.Custom.Inventory.RemoveItem(inv_sim, item_sim, 1, false)) then
		item_phone.number = item_sim.number
		ESX.Custom.Inventory.UpdateItem(inv_phone, item_phone)
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~g~Карта установлена в телефон!")
	else
		TriggerClientEvent('esx:showNotification', xPlayer.source, "~r~SIM-карта не работает!")
	end
end

AddEventHandler('inventory:removeSim', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	if item.number and item.number ~= "empty" then

		local simitem = ESX.Custom.Inventory.Item.Create("sim", 1, { number = item.number })
		if (ESX.Custom.Inventory.AddItem(inventory, simitem, 1, true)) then
			item.number = "empty"
			item.description = "Смартфон без SIM-карты"
			ESX.Custom.Inventory.UpdateItem(inventory, item)
		end
	end
end)
