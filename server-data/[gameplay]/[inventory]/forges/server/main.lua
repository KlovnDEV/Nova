ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

Citizen.CreateThread(function()

	for _, zone in pairs(Config.Zones) do
		local inv = ESX.Custom.Inventory.Create("craft", zone.Identifier, false, {
			title = zone.Title or "Контейнер",
			maxWeight = 1000,
			width = 30,
			height = 20,
			actionGroup = 'container',
		})
	end

end)
