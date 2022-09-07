GS = GlobalState

ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Markers = {}
ManageMarkers = {}

Citizen.CreateThread(function()
	while not GS.Shops or #GS.Shops == 0 do
		Citizen.Wait(1000)
	end

	for k,v in pairs(GS.Shops) do
		Markers[v.id] = MarkerClass:new({
			type = 1,
			zone = v.id,
			pos = v.pos,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'shops:onPress',
			onEnter = 'shops:onEnter',
			onExit = 'shops:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к магазину',
		})

		ManageMarkers[v.id] = MarkerClass:new({
			type = 1,
			zone = v.id,
			pos = v.manage_pos,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'shops:onPressManage',
			onEnter = 'shops:onEnterManage',
			onExit = 'shops:onExitManage',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к складу магазина',
		})

	end

	while true do
		Citizen.Wait(0)

		local coords = GetEntityCoords(PlayerPedId(-1))
		for k,marker in pairs(Markers) do
			marker:draw(coords)
		end
		for k,marker in pairs(ManageMarkers) do
			marker:draw(coords)
		end
	end
end)

RegisterNetEvent("shops:onPress")
AddEventHandler("shops:onPress", function(marker)
	local shopId = marker.zone

	ESX.TriggerServerCallback('shops:getShopItems', function(shopItems)
		showShopMenu(shopId, shopItems)
	end, marker.zone)

end)

RegisterNetEvent("shops:onPressManage")
AddEventHandler("shops:onPressManage", function(marker)
	local shopId = marker.zone

	TriggerServerEvent("inventory:openInventories", {
		{ category = "shop", identifier = tostring(shopId)},
		{ category = "player-inventory" },
	})
end)

function showShopMenu(shopId, items)
	local shop = GS.Shops[shopId]
	if not shop then
		return
	end

	ESX.TriggerServerCallback('shops:getWarehouse', function(wareItems)
		TriggerEvent('ui:showShop', shop, items, wareItems)
	end, shopId)

--[[
	elements = {}

	for k,v in pairs(items) do
		table.insert(elements, {
			label = tostring(v.label or v.name)..' x'..tostring(v.amount)..' [$'..tostring(v.price)..']',
			value = v.id,
		})
	end

	TriggerEvent('nova-ui:menu_show', 'player-menu', {
		name = "player-menu",
		title = tostring(shop.label or shop.name or ''),
		position = "tl",
		elements = elements
	}, {

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')
			TriggerServerEvent('shops:buy', shopId, cmd, 1)
		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})	
]]--
end

