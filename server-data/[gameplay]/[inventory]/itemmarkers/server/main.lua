ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

Citizen.CreateThread(function()
	while true do
		for k, zone in pairs(Config.Zones) do
			if zone.Cooldown and zone.Cooldown > 0 then
				zone.Cooldown = zone.Cooldown - 1
			end
		end
		Citizen.Wait(1000)
	end
end)


RegisterServerEvent("itemmarkers:giveitem")
AddEventHandler("itemmarkers:giveitem", function(zoneId)
        local xPlayer = ESX.GetPlayerFromId(source)
	local zone = Config.Zones[zoneId]
	local ItemInfo = zone.Item

	if zone.Cooldown and zone.Cooldown > 0 then
		xPlayer.showNotification('Слишком рано! Ожидайте '..tostring(zone.Cooldown)..' сек.')
		return
	end

	
	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)

	if inv then
		item = ESX.Custom.Inventory.Item.Create(ItemInfo.name)
		if item and ESX.Custom.Inventory.AddItem(inv, item, ItemInfo.amount, true, true) then
			xPlayer.showNotification('Предмет добавлен')
			zone.Cooldown = zone.Interval
		else
			xPlayer.showNotification('Невозможно добавить предмет '..tostring(ItemInfo.name))
		end
	end

end)
