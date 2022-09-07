ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--[[
ESX.RegisterServerCallback('nova-ui:buyClothes', function(source, cb, components)
	print('server')
	assert(components)

	local xPlayer = ESX.GetPlayerFromId(source)
	if not xPlayer then
		cb(false)
		return
	end

	if components['accs'] and components['jbib'] then
		local inv = ESX.Custom.Inventory.Create("player", xPlayer.identifier, false)
		local item = ESX.Custom.Inventory.Item.Create('tshirt', 1)

		if not item then
			xPlayer.showNotification('~r~Невозможно купить футболку!~s~')
			return
		end

		item.extra = components

		if ESX.Custom.Inventory.AddItem(inv, item, 1) then
			xPlayer.showNotification('Success.')
		else
			xPlayer.showNotification('Fail.')
		end		
	end

end)

]]--