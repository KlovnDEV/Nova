ESX = nil
Markers = {}
Properties = {}

Citizen.CreateThread(function ()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		local coords = GetEntityCoords(PlayerPedId(-1))
		for k,v in pairs(Markers) do
			v.marker:draw(coords)
		end

		for k,v in pairs(Properties) do
			v.marker:draw(coords)
		end

	end
end)

RegisterNetEvent("property:updateMarkers")
AddEventHandler("property:updateMarkers", function(markers)
	Markers = markers
	for k,v in pairs(Markers) do
		v.marker = MarkerClass:new({
			type = 1,
			pos = json.decode(v.pos),
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'property:onInMarkerPress',
--			onEnter = 'property:onEnter',
--			onExit = 'property:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для доступа к меню недвижимости',
		})

		v.marker:set('Zone', v)
	end
end)

RegisterNetEvent("property:updateProperties")
AddEventHandler("property:updateProperties", function(properties)
	Properties = properties
	for k,v in pairs(Properties) do
		v.marker = MarkerClass:new({
			type = 1,
			pos = json.decode(v.inside_pos),
			color = { r = 55, g = 100, b = 255 },
			scale = { x = 2, y = 2, z = 1},
			drawDistance = 20,
			onPress = 'property:onOutMarkerPress',
--			onEnter = 'property:onEnter',
--			onExit = 'property:onExit',
			notification = 'Нажмите ~INPUT_PICKUP~ для выхода',
		})

		v.marker:set('Zone', v)
	end
end)


AddEventHandler("property:onInMarkerPress", function(marker)
	TriggerServerEvent("property:onInMarkerPress", marker.Zone.name)
end)

AddEventHandler("property:onOutMarkerPress", function(marker)
	TriggerServerEvent("property:onOutMarkerPress", marker.Zone.name)
end)

RegisterNetEvent("property:openPropertyMenu")
AddEventHandler("property:openPropertyMenu", function(property, identifier)
	if #property == 1 then
		openPropertyMenu(property[1], identifier)
	else
		local elements = {}
		for k,v in pairs(property) do
			if v.owner == nil then
				table.insert(elements, {label = v.label.." [свободно]", value = v})
			elseif v.owner == identifier then
				if v.rented > 0 then
					table.insert(elements, {label = v.label.." [снято]", value = v})
				else
					table.insert(elements, {label = v.label.." [куплено]", value = v})
				end
			else
				table.insert(elements, {label = v.label, value = v})
			end
		end

		TriggerEvent('nova-ui:menu_show', 'properties-menu', {
			name = "properties-menu",
			title = "Недвижимость",
			position = "tl",
			elements = elements
		}, {
			click = function(cmd)
				TriggerEvent('nova-ui:menu_hide')
				openPropertyMenu(cmd, identifier)
			end,

			back = function()
				TriggerEvent('nova-ui:menu_hide')
			end
		})

	end

end)

RegisterNetEvent("property:returnFrom")
AddEventHandler("property:returnFrom", function(marker)
	ESX.Game.Teleport(PlayerPedId(), json.decode(marker.pos), function() end)
end)

function openPropertyMenu(property, identifier)
	local elements = {}

	if property.owner == nil then
		table.insert(elements, {label = 'Купить за $'..tostring(property.price), value = 'buy'})
		table.insert(elements, {label = 'Снять за $'..tostring(math.floor(property.price * Config.RentCoefficient))..' в сутки', value = 'rent'})
	elseif property.owner == identifier then
		table.insert(elements, {label = 'Войти', value = 'enter'})
		if property.rented > 0 then
			table.insert(elements, {label = 'Выселиться', value = 'sell'})
		else
			table.insert(elements, {label = 'Продать [$'..tostring(math.floor(property.price * Config.SellCoefficient))..']', value = 'sell'})
		end
	else
		table.insert(elements, {label = 'Постучать', value = 'knock'})

		if ESX.Roles.HasRole('police') then
			table.insert(elements, {label = 'Вломиться', value = 'breakin'})
		end
	end

	TriggerEvent('nova-ui:menu_show', 'property-menu', {
		name = "property-menu",
		title = "Недвижимость",
		position = "tl",
		elements = elements
	}, {

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')

			if cmd == 'enter' then
				ESX.Game.Teleport(PlayerPedId(), json.decode(property.inside_pos), function()
				end)
		        end

			if cmd == 'buy' then
				TriggerServerEvent("property:buy", property.id)
			end

			if cmd == 'rent' then
				TriggerServerEvent("property:rent", property.id)
			end

			if cmd == 'sell' then
				TriggerServerEvent("property:sell", property.id)
			end

			if cmd == 'knock' then
				ESX.ShowNotification('Вы позвонили в домофон...')
			end

			if cmd == 'breakin' then
				TriggerServerEvent("property:breakin", property.id)
			end

		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
	})
end
