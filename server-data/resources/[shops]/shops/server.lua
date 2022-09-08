GS = GlobalState
function printf(...) print(string.format(...)) end
function assertf(a, ...) assert(a, string.format(...)) end

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

GS:set('Shops', {}, true)

function initShops(shops)
	GS:set('Shops', shops, true)

	for _, shop in pairs(shops) do
		print(shop.id, shop.label)
		local inv = ESX.Custom.Inventory.Create("shop", tostring(shop.id), false, {
			title = shop.label or "Магазин",
			maxWeight = 10000,
			actionGroup = 'container',
			width = 50,
			height = 50,
		})
	end

end


function getShopItems(shopId)
	local res = exports['db'].post(0, 'shop/items/get', json.encode({
		["shop"] = shopId,
	}))

	if res[1] ~= 200 then
		print('Unable to get shop items! DB error:'..tostring(res[1]))
		return nil
	end

	return json.decode(res[2])
end

Citizen.CreateThread(function()

	while #GS.Shops == 0 do
		local res = exports['db'].post(0, 'shop/get', json.encode({}))
		if res[1] == 200 then
			local shops = json.decode(res[2])
			for k,shop in pairs(shops) do
				shop.pos = json.decode(shop.pos)
				shop.manage_pos = json.decode(shop.manage_pos)
			end

			initShops(shops)
			break
		else
			print('Unable to load shops! No connection to DB.')
			Citizen.Wait(1000)
		end
	end

end)

ESX.RegisterServerCallback('shops:getShopItems', function(source, cb, id)
	local xPlayer = ESX.GetPlayerFromId(source)
	cb(getShopItems(id))
end)


RegisterServerEvent('shops:warehouseChange')
AddEventHandler('shops:warehouseChange', function(shopId, warehouse, items)
	shopId = tostring(shopId)

	local inv = ESX.Custom.Inventory.Get("shop", shopId)
	if not inv then
		print('Incorrect shop with id '..shopId)
		return
	end

	for k,v in pairs(warehouse) do
		if not v.stored then
			if ESX.Custom.Inventory.RemoveItem(inv, { uid = v.uid }, v.quantity, true) then
				local res = exports['db'].post(0, 'shop/items/create', json.encode({ shop = shopId, name = v.name, label = v.displayName, amount = v.quantity, extra = json.encode({}), price = v.price }))
			end
		end
	end

	for k,v in pairs(items) do
		-- TODO: что-то делать, если item не влезает на склад
		if v.stored then
			local res = exports['db'].post(0, 'shop/items/delete', json.encode({ id = v.uid }))
			if res[1] == 200 then
				local item = ESX.Custom.Inventory.Item.Create(v.name, 1, {}) -- TODO: EXTRA

		  		if item and ESX.Custom.Inventory.AddItem(inv, item, v.quantity, true) then
					-- success
				else
				        print('Incorrect item.')
				end
			end

		end
	end

end)

RegisterServerEvent('shops:buy')
AddEventHandler('shops:buy', function(shopId, itemId, amount, account)
	local playerId = source
	local xPlayer = ESX.GetPlayerFromId(source)

	assertf(GS.Shops[shopId], 'Shop with id:%i not found!', shopId)

	local items = getShopItems(shopId)
	local item = nil

	for k,v in pairs(items) do
		if v.id == itemId then
			item = v
			break
		end
	end

	assertf(item, 'Shop id:%i has no item id:%i!', shopId, itemId)

    TriggerEvent('engine:payPlayerMoney', playerId, { account }, item.price * amount, "shop buy " .. tostring(shopId), 'sales', function(success)
		if not success then
			xPlayer.showNotification('~r~Недостаточно средств!')
			return
		end

		local res = exports['db'].post(0, 'shop/items/sell', json.encode({
			["id"] = itemId,
			["amount"] = amount,
		}))

		assertf(res[1] == 200, 'Shop item buy error! %i (%s)', res[1], res[2])

		local inv = ESX.Custom.Inventory.Create("player-inventory", xPlayer.identifier, false)
		local item = ESX.Custom.Inventory.Item.Create(item.name, amount, {})

		assertf(item, 'Unable to create item with name %s and amount %i!', item.name, amount)

		assertf(ESX.Custom.Inventory.AddItem(inv, item, amount), 'Unable to add bought item to player inventory!')
		xPlayer.showNotification('~g~Куплено!')
	end)
end)

ESX.RegisterServerCallback('shops:getWarehouse', function(source, cb, id)
	local xPlayer = ESX.GetPlayerFromId(source)
	local inv = ESX.Custom.Inventory.Get("shop", tostring(id))

	if inv ~= nil then
		cb(inv.items)
	end
end)
