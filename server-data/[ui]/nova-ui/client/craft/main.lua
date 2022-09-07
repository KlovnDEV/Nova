--[[
Citizen.CreateThread(function()
	while true do
	Citizen.Wait(0)
        if IsControlJustReleased(0, 38) then
		print('EEE')

		-- FIXME
		local inv_cat = "craft"
		local inv_identifier = "test2"

		local categories = {
			{
		        	name = 'Еда',
				icon = 'fruitpot',
			},
		}


		local inventory = ESX.Custom.Inventory.Get(inv_cat, inv_identifier, function(inventory)
			openCraft(inventory, categories)
		end)

	end
	end
end)
]]--

function openCraft(inventory, categories)

	OpenScreen('craft')

	if not inventory then
		print('Inventory '..tostring(inv_cat)..'/'..tostring(inv_identifier)..' not found!')
		return
	end

	ESX.TriggerServerCallback('inventory:getInventories', function(inventories)

		for k, v in pairs(inventories) do
			SendNUIMessage({
				query = 'inventory/update',
				inventory = v
			})
		end

		SendNUIMessage({
			query = 'craft/open',
			categories = categories,
			craftInventoryId = inventory.id,
			inventories = inventories,
		})

	end,
	{
		{ category = inventory.category, identifier = inventory.identifier },
		{ category = 'player-inventory' }
	})

end

RegisterNetEvent('nova-ui:showCraft')
AddEventHandler('nova-ui:showCraft', function(category, identifier, craftData)
	local categories = {}
	-- TODO: craft grades
	local icons = {
		['Еда'] = 'cheese',
		['Напитки'] = 'water',
		['Еда: домашняя'] = 'soup',
		['Еда: cладости'] = 'cake',
		['Еда: рестораны'] = 'wine',
		['Еда: суши'] = 'sushi',
	}

	for k,v in pairs(craftData) do
		table.insert(categories, {
			['name'] = k,
			['grade'] = v,
			['icon'] = icons[k] or 'fruitpot',
		})
	end

	local inventory = ESX.Custom.Inventory.Get(category, identifier, function(inventory)
		openCraft(inventory, categories)
	end)
end)
