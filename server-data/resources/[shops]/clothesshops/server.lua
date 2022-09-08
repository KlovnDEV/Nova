GS = GlobalState
function printf(...) print(string.format(...)) end
function assertf(a, ...) assert(a, string.format(...)) end

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

GS:set('ClothesShops', {}, true)

function getShopItems(shopId, category, sex)
	local res = exports['db'].post(0, 'clothesshop/items/get', json.encode({
		["shop"] = shopId,
--		["category"] = category,
--		["sex"] = sex,
	}))

	if res[1] ~= 200 then
		print('Unable to get shop items! DB error:'..tostring(res[1]))
		return nil
	end

	local clothesArr = json.decode(res[2])

	local clothes = {}

	for k,row in pairs(clothesArr) do
		if clothes[row.category] == nil then
			clothes[row.category] = {}
		end

		table.insert(clothes[row.category], { uid = row.name, price = row.price })
	end

	return clothes
end

function BuyClothes(xPlayer, inv, name)

    local product = getClothesInfo(name)
    if product == nil then
        xPlayer.showNotification('~r~Incorrect item name: '..tostring(name)..'~s~')
	return
    end

--    local inv = ESX.Custom.Inventory.Get("player-inventory", xPlayer.identifier)
    local item = ESX.Custom.Inventory.Item.Create(product.category, 1, {
        ["label"] = product.label,
        ["extra"] = json.decode(product.extra),
        ["sex"] = product.sex
    })

    if not item then
        xPlayer.showNotification('~r~Incorrect item: '..tostring(name)..'~s~')
        return
    end

    ESX.Money.Pay('bank-cash', xPlayer.identifier, product.price, function(success)
        if ESX.Custom.Inventory.AddItem(inv, item, 1) then
            xPlayer.showNotification("Куплено ~b~" ..product.label..'~s~')
        end
    end, function(failure)
        -- fail
    end, { description = "Clothes" }, 'sales_tax')
end

function getClothesInfo(name)
    local playerId = source
    local xPlayer = ESX.GetPlayerFromId(source)

	local res = exports['db'].post(0, 'itemtemplate/clothes/getitem', json.encode({
	        ['name'] = name,
	}))

    if res[1] ~= 200 then
        return nil
    end

    return json.decode(res[2])
end

Citizen.CreateThread(function()

	while #GS.ClothesShops == 0 do
		local res = exports['db'].post(0, 'clothesshop/get', json.encode({}))
		if res[1] == 200 then
			local shops = json.decode(res[2])
			for k,shop in pairs(shops) do
				shop.pos = json.decode(shop.pos)
			end

			GS:set('ClothesShops', shops, true)
			break
		else
			print('Unable to load clothesshops! No connection to DB.')
			Citizen.Wait(1000)
		end
	end

end)

ESX.RegisterServerCallback('clothesshops:getShopItems', function(source, cb, id, category, sex)
	local xPlayer = ESX.GetPlayerFromId(source)

	cb(getShopItems(id, category, sex))
end)

RegisterServerEvent('clothesshops:buy')
AddEventHandler('clothesshops:buy', function(shopId, cart, account)
	local playerId = source
	local xPlayer = ESX.GetPlayerFromId(source)

	print('BUY', account, json.encode(cart))

	local inv = ESX.Custom.Inventory.Get("player-inventory", xPlayer.identifier)
	local item = ESX.Custom.Inventory.Item.Create("clothesbag", 1, {} )
	ESX.Custom.Inventory.AddItem(inv, item, 1)
	local baginv = ESX.Custom.Inventory.Get("item-clothesbag", item.extra.inventory)

	for cat, item in pairs(cart) do
		local uid = item.variation or item.uid

		if cat == 'torso' then
			local clitem = ESX.Custom.Inventory.Item.Create("jacket", 1, { ["extra"] = { ["components"] = { uid } } } )
			ESX.Custom.Inventory.AddItem(baginv, clitem, 1)
		elseif cat == 'pants' then
			local clitem = ESX.Custom.Inventory.Item.Create("pants", 1, { ["extra"] = { ["components"] = { uid } } } )
			ESX.Custom.Inventory.AddItem(baginv, clitem, 1)
		elseif cat == 'shoes' then
			local clitem = ESX.Custom.Inventory.Item.Create("shoes", 1, { ["extra"] = { ["components"] = { uid } } } )
			ESX.Custom.Inventory.AddItem(baginv, clitem, 1)
		end

	end
end)

--[[
RegisterServerEvent('clothesshops:buy')
AddEventHandler('clothesshops:buy', function(shopId, category, sex, itemId, amount)
	local playerId = source
	local xPlayer = ESX.GetPlayerFromId(source)

	assertf(GS.ClothesShops[shopId], 'ClothesShop with id:%i not found!', shopId)

	local items = getShopItems(shopId, category, sex)
	local shopitem = nil

	for k,v in pairs(items) do
		if v.id == itemId then
			shopitem = v
			break
		end
	end

	assertf(shopitem, 'Shop id:%i has no item id:%i!', shopId, itemId)
	if shopitem then
		local inv = ESX.Custom.Inventory.Get("player-inventory", xPlayer.identifier)
		local item = ESX.Custom.Inventory.Item.Create(category, 1, { ["extra"] = json.decode(shopitem.extra), ["sex"] = shopitem.sex } )

		if not item then
			xPlayer.showNotification('~r~Incorrect item name: '..tostring(args.item)..'~s~')
			return
		end

		ESX.Custom.Inventory.AddItem(inv, item, 1)
	end

	ESX.Money.Pay('bank', xPlayer.identifier, shopitem.price * amount, function()
		local res = exports['db'].post(0, 'shop/items/sell', json.encode({
			["id"] = itemId,
			["amount"] = amount,
		}))

		assertf(res[1] == 200, 'Shop item buy error! %i (%s)', res[1], res[2])

		local inv = ESX.Custom.Inventory.Create("player", xPlayer.identifier, false)
		local item = ESX.Custom.Inventory.Item.Create(item.name, amount, {})

		assertf(item, 'Unable to create item with name %s and amount %i!', item.name, amount)

		assertf(ESX.Custom.Inventory.AddItem(inv, item, amount), 'Unable to add bought item to player inventory!')
		xPlayer.showNotification('~g~Куплено!')
	end, function()
		xPlayer.showNotification('~r~Недостаточно средств!')
	end, 'buy item', 'sales_tax')

end)
]]
