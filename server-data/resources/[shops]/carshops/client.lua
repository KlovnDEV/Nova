GS = GlobalState

EnableAllControlActions(0)

local currentShopId = nil

ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Markers = {}

Citizen.CreateThread(function()
	for k,v in pairs(Config.CarShops) do
		Markers[v.id] = MarkerClass:new({
			type = 1,
			zone = v,
			pos = v.pos,
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'carshops:onPress',
			onEnter = 'carshops:onEnter',
			onExit = 'carshops:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к магазину',
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

RegisterNetEvent("carshops:onPress")
AddEventHandler("carshops:onPress", function(marker)
	local shop = marker.zone

	showShopMenu(shop.id)

end)

RegisterNetEvent("carshops:previewCar")
AddEventHandler("carshops:previewCar", function(car)
	print('preview', json.encode(car))
	local shop = Config.CarShops[currentShopId]

	previewVehicle(car.name, shop.carPos, shop.heading)
end)

function showShopMenu(shopId, items)
	local shop = Config.CarShops[shopId]
	if not shop then
		return
	end
--[[
	elements = {}

	for k,v in pairs(shop.items) do
		table.insert(elements, {
--			label = tostring(v.label or v.name)..' x'..tostring(v.amount)..' [$'..tostring(v.price)..']',
			name = tostring(v.label or v.name)
			label = tostring(v.label or v.name)..' [$'..tostring(v.price)..']',
			value = k,
		})
	end
]]

	local playerPed = PlayerPedId()

	FreezeEntityPosition(playerPed, true)
	SetEntityVisible(playerPed, false)
	SetEntityCoords(playerPed, shop.carPos.x, shop.carPos.y, shop.carPos.z)

	TriggerEvent('nova-ui:showCarShop', shop.categories)
	currentShopId = shopId

--[[
	TriggerEvent('nova-ui:menu_show', 'player-menu', {
		name = "carshop-menu",
		title = tostring(shop.label or shop.name or ''),
		position = "tl",
		elements = elements
	}, {

		click = function(cmd)
--			local item = shop.items[cmd]

			TriggerEvent('nova-ui:menu_hide')
			TriggerServerEvent('carshops:buy', shopId, cmd)

--			ESX.Game.SpawnVehicle(cmd, shop.pos, 0.0, function(veh)
--				SetPedIntoVehicle(PlayerPedId(), veh, -1)
--			end)
		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})	
]]--
end

function closeShop()
	local playerPed = PlayerPedId()
	DeleteLocalVehicles()

	FreezeEntityPosition(playerPed, false)
	SetEntityVisible(playerPed, true)
	SetEntityCoords(playerPed, shop.pos.x, shop.pos.y, shop.pos.z)
end


AddEventHandler('nova-ui:change_screen', function(scr)
	if scr ~= nil or currentShopId == nil then
		return
	end

	closeShop()
end)
