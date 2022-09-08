ESX.Custom.Inventory.Keys = {}

ESX.Custom.Inventory.Keys.Update = function(inventory)
	local items = ESX.Custom.Inventory.SearchWithNested(inventory, { ["category"] = "key" })
	local access = {}

	for k,item in pairs(items) do
		access[item.extra.access] = true
	end

	return access
end
