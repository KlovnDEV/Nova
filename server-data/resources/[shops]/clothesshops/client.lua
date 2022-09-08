GS = GlobalState

ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Markers = {}
Blips = {}

Citizen.CreateThread(function()
	while not GS.ClothesShops or #GS.ClothesShops == 0 do
		Citizen.Wait(1000)
	end

	for k,v in pairs(GS.ClothesShops) do
		Markers[v.id] = MarkerClass:new({
			type = 1,
			zone = v.id,
			pos = v.pos,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'clothesshops:onPress',
			onEnter = 'clothesshops:onEnter',
			onExit = 'clothesshops:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к магазину',
		})

		Blips[v.id] = BlipClass:new({
			pos = vector3(v.pos.x, v.pos.y, v.pos.z),
			sprite  = 366,
			display = 4,
			scale   = 1.0,
			color   = v.color,
			shortRange = true,
		})
	end

	while true do
		Citizen.Wait(0)

		local coords = GetEntityCoords(PlayerPedId(-1))
		for k,marker in pairs(Markers) do
			marker:draw(coords)
		end
	end
end)

RegisterNetEvent("clothesshops:onPress")
AddEventHandler("clothesshops:onPress", function(marker)
	local shopId = marker.zone
--	showShopCategories(shopId)
	TriggerEvent("nova-ui:openClothesShop", shopId)
end)

--[[
function showShopCategories(shopId)
	local shop = GS.ClothesShops[shopId]
	if not shop then
		return
	end

	local player = LocalPlayer
	if player and player.state.identity and player.state.identity.sex ~= nil then
		sex = player.state.identity.sex
	end

	elements = {
		{
			value = "pants",
			label = "Штаны",
		},
		{
			value = "jacket",
			label = "Куртка",
		},
		{
			value = "tshirt",
			label = "Футболка",
		},
		{
			value = "shoes",
			label = "Обувь",
		}
	}

	TriggerEvent('nova-ui:menu_show', 'player-menu', {
		name = "player-menu",
		title = tostring(shop.label or shop.name or ''),
		position = "tl",
		elements = elements
	}, {

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

			ESX.TriggerServerCallback('clothesshops:getShopItems', function(shopItems)
				showShopMenu(shopId, cmd, sex, shopItems)
			end, shopId, cmd, sex)
		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end
]]--

function showShopMenu(shopId, category, sex, items)
	local shop = GS.ClothesShops[shopId]
	if not shop then
		return
	end

	elements = {}

	for k,v in pairs(items) do
		table.insert(elements, {
--			label = tostring(v.label or v.name)..' x'..tostring(v.amount)..' [$'..tostring(v.price)..']',
			label = tostring(v.label or v.name)..' [$'..tostring(v.price)..']',
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
			TriggerServerEvent('clothesshops:buy', shopId, category, sex, cmd, 1)
		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end
