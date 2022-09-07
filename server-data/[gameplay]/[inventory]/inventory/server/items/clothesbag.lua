ESX.Custom.Inventory.RegisterItemType('clothesbag', {

	init = function(item)
		local inv = AbstractCreateNestedInventory(item, {
			title = "Костюм",
			maxWeight = 5,
			width = 20,
			height = 8,
			actionGroup = 'player',
			hidden = true,
		})
		item.extra = { inventory = inv.identifier }

		return item
	end,

	getDescription = function(item)
		if item.number then
			return tostring(item.number)
		else
			return ''
		end
	end,

	getActions = function(item)
		item.actions.player.puton = {
			['label'] = 'Надеть',
			['priority'] = 3,
			['action'] = 'inventory:clothesBag:putOn'
 	       }

		item.actions.player.putoff = {
			['label'] = 'Снять',
			['priority'] = 2,
			['action'] = 'inventory:clothesBag:putOff'
 	       }

		return item.actions
	end,


	merge = function(xPlayer, inv1, item1, inv2, item2)
		return false
	end,

	onAdd = function(item, inv)
	end,
})


AddEventHandler('inventory:clothesBag:putOn', function(xPlayer, inventory, item)
	assert(xPlayer)
	assert(inventory)
	assert(item)

	if item.extra.inventory == nil then
		return
	end

	local baginv = ESX.Custom.Inventory.Get("item-clothesbag", item.extra.inventory)
	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
	local areas = {}

	for _, area in pairs(inv.areas) do

		if area.tags then
			for _, tag in pairs(area.tags) do
				areas[tag] = area
			end
		end

	end

	for _, item in pairs(baginv.items) do
		local cat = item.category

		if areas[cat] ~= nil then
			local area = areas[cat]
			local previtems = ESX.Custom.Inventory.Collision.ItemsInArea(inv, area.x, area.y, 1, 1)

			if #previtems == 0 then
				ESX.Custom.Inventory.TransferItem({ uid = item.uid }, 1, baginv, inv, true, { x = area.x, y = area.y })
				inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
			end
		end

	end	
end)

AddEventHandler('inventory:clothesBag:putOff', function(xPlayer, inventory, bagItem)
	assert(xPlayer)
	assert(inventory)
	assert(bagItem)

	if bagItem.extra.inventory == nil then
		return
	end

	local baginv = ESX.Custom.Inventory.Get("item-clothesbag", bagItem.extra.inventory)
	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
	local areas = {}

	for _, item in pairs(inv.items) do
		if item.y == 0 then
			-- не переносим руки
		elseif item.y == 3 and item.x == 1 then
			-- не переносим сумку
		elseif item.y == 4 and item.x == 1 then
			-- не переносим броник
		elseif item.y == 7 and item.x == 1 then
			-- не переносим телефон
		else
			ESX.Custom.Inventory.TransferItem({ uid = item.uid }, 1, inv, baginv, true, nil)
			baginv = ESX.Custom.Inventory.Get("item-clothesbag", bagItem.extra.inventory)
		end

	end	
end)
