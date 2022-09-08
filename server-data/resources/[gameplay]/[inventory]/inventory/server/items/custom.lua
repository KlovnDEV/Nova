function AbstractMergeItems(xPlayer, inv1, item1, inv2, item2, ignore_extra)
	assert(inv1)
	assert(item1)
	assert(inv2)
	assert(item2)

	if item1.name ~= item2.name then
		return false
	end

	if not ignore_extra and not tablesEqual(item1.extra, item2.extra) then
		return false
	end

	if item1.amount == item1.maxstack then
		return false
	end

	local amount = item2.amount
	local maxstack = item1.maxstack * (inv1.stack_multiplier or 1)

	if (item1.amount + amount) > maxstack then
		amount = maxstack - item1.amount
		if amount < 1 then
			return false
		end
	end

	assert(amount > 0)

	if (item2 and ESX.Custom.Inventory.RemoveItem(inv2, item2, amount, false)) then
		item1.amount = item1.amount + amount
		ESX.Custom.Inventory.UpdateItem(inv1, item1)
	end

	return true
end

function AbstractCreateNestedInventory(item, inventory_properties)
	local invid

	if item.extra and item.extra.inventory then
		invid = item.extra.inventory
	else
		invid = generateString(8, "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789")
	end

	return ESX.Custom.Inventory.Create("item-"..item.name, invid, false, inventory_properties)
end

ESX.Custom.Inventory.RegisterItemType('custom', {

	init = function(item)
		return item
	end,

	getActions = function(item)
		return item.actions
	end,

	merge = function(xPlayer, inv1, item1, inv2, item2)
		return AbstractMergeItems(xPlayer, inv1, item1, inv2, item2)
	end,
})
