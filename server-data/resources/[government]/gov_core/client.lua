ESX          = nil
marker = nil

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()

    marker = MarkerClass:new({
        type = 1,
        pos = vector3(-515.94, -252.96, 35.63),
        color = { r = 55, g = 100, b = 255 },
        scale = { x = 2, y = 2, z = 1},
        drawDistance = 20,
        onPress = 'government:onPress',
    })

    while true do
        Citizen.Wait(0)
        local coords = GetEntityCoords(PlayerPedId())
        marker:draw(coords)
    end
end)

RegisterNetEvent("government:onPress")
AddEventHandler("government:onPress", function(marker)
    TriggerEvent('money:get', 'budget', 'city', function(cityBudget)
        showGovernmentMenu(cityBudget)
    end)
end)

function showGovernmentMenu(cityBudget)
  local elements = {}

	table.insert(elements, {label = 'Бюджет города: '..tostring(cityBudget), value = 'city-budget'})

	TriggerEvent('nova-ui:menu_show', 'government_menu', {
		name = "government_menu",
		title = "Губернатор",
		position = "tr",
		elements = elements
	}, {

		click = function(cmd)
			TriggerEvent('nova-ui:menu_hide')
		end,

		back = function()
			TriggerEvent('nova-ui:menu_hide')
		end
    })
end

