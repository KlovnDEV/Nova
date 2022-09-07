GS = GlobalState
function printf(...) print(string.format(...)) end
function assertf(a, ...) assert(a, string.format(...)) end

ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('carshops:buy')
AddEventHandler('carshops:buy', function(shopId, id) 
	local playerId = source
	local xPlayer = ESX.GetPlayerFromId(source)

	local shop = Config.CarShops[shopId]
	local item = shop.items[id]
--[[
	local res = exports['db'].post(0, 'vehicle/create', json.encode({
		["model"] = item,
		["x"] = shop.pos.x,
		["y"] = shop.pos.y,
		["z"] = shop.pos.z,
		["heading"] = shop.heading })
	)
]]
	local props = {}

	if item.frame then
		props.isFrame = true
	end

	TriggerEvent('vehsync:createOwnedVehicle', item.name, shop.pos, shop.heading, props )

--	if res[1] == 200 then

--[[
	assertf(GS.ClothesShops[shopId], 'ClothesShop with id:%i not found!', shopId)

	local items = getShopItems(shopId)
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
		local item = ESX.Custom.Inventory.Item.Create("pants", 1, { ["extra"] = json.decode(shopitem.extra) } )

		if not item then
			xPlayer.showNotification('~r~Incorrect item name: '..tostring(args.item)..'~s~')
			return
		end

		ESX.Custom.Inventory.AddItem(inv, item, 1)
	end
]]--



--[[
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
]]--
end)
