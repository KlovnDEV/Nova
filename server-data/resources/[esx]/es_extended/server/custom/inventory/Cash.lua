ESX.Custom.Inventory.Cash = {}

ESX.Custom.Inventory.Cash.Update = function(inventory)
	local items = ESX.Custom.Inventory.SearchWithNested(inventory, { ["name"] = "cash" })
	local amount = 0

	for k,item in pairs(items) do
		amount = amount + (item.amount or 0)
	end

	return amount
end

ESX.Custom.Inventory.Cash.Remove = function(inventory, amount)
	local query = { ["name"] = "cash" }
	local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)
	local items = ESX.Custom.Inventory.SearchWithNested(inv, query)
	local hasamount = 0

	for k,item in pairs(items) do
		hasamount = hasamount + (item.amount or 0)
	end

	if amount > hasamount then
		return false
	end

	local remain = amount

	for k,item in pairs(items) do
		local toremove = math.min(item.amount, remain)

		if toremove > 0 then
			local inv = ESX.Custom.Inventory.GetInventoryByItemId(item.uid)

			if inv and ESX.Custom.Inventory.RemoveItem(inv, { uid = item.uid }, toremove, true) then
				remain = remain - toremove
			end
		end

		if remain <= 0 then
			break
		end
	end

	ESX.Custom.Inventory.Update(inv)
	return remain == 0
end
