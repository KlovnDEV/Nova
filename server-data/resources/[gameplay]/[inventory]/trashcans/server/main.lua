ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('trunks:registerTrash', function(source, cb, uid)
	local xPlayer = ESX.GetPlayerFromId(source)

	local inv = ESX.Custom.Inventory.Get('trashcan', uid)

	if not inv then
		inv = ESX.Custom.Inventory.Create('trashcan', uid, false, {
			title = "Мусорный бак",
			width = 20,
			height = 20,
			maxWeight = 60,
			disposable = true,
			actionGroup = 'container',
		})

		if #inv.items == 0 then
			local item
			local bottle_amount = math.random(0,2)
			local trash_amount = math.random(0,4)

			if bottle_amount > 0 then
				item = ESX.Custom.Inventory.Item.Create("bottle")
				ESX.Custom.Inventory.AddItem(inv, item, bottle_amount, true, true)
			end

			if trash_amount > 0 then
				item = ESX.Custom.Inventory.Item.Create("trash")
				ESX.Custom.Inventory.AddItem(inv, item, trash_amount, true, true)
			end
		end
	end

	cb(inv)
end)
