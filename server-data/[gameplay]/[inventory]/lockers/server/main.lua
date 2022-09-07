ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

Citizen.CreateThread(function()

	for _, zone in pairs(Config.Zones) do
		local inv = ESX.Custom.Inventory.Create(zone.Category, zone.Identifier, false, {
			title = zone.Title or "Контейнер",
			maxWeight = zone.MaxWeight or 30,
			actionGroup = 'container',
			width = zone.Width or 15,
			height = zone.Height or 20,
		})
	end
end)
