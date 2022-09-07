ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function setItemPos(source, cb, from, to, uid, x, y, shift, ctrl)
	assert(from)
	assert(to)
	assert(uid)
	assert(x)
	assert(y)
	assert(shift ~= nil)
	assert(ctrl ~= nil)

	local xPlayer = ESX.GetPlayerFromId(source)
	if not xPlayer then
		cb(false)
		return
	end

	local inv1 = ESX.Custom.Inventory.Get(from.category, from.identifier)
	local inv2 = ESX.Custom.Inventory.Get(to.category, to.identifier)
	local item = ESX.Custom.Inventory.SearchFirst(inv1, { uid = uid })

	if not inv1 or not inv2 or not item then
		cb(false)
		return
	end

	local collided_items = ESX.Custom.Inventory.Collision.ItemsInArea(inv2, x, y, item.width, item.height)

	if (ctrl or shift) and #collided_items > 0 then
		ESX.Custom.Inventory.UpdateItem(inv1, item)
		cb(false)
		return
	end

	for k, v in pairs(collided_items) do
		if v == item.uid then
			collided_items[k] = nil
			break
		end
	end

	if #collided_items == 1 then
		local item2 = ESX.Custom.Inventory.SearchFirst(inv2, { uid = collided_items[1] })
		if item2 and ESX.Custom.Inventory.MergeItems(xPlayer, inv2, item2, inv1, item) then
			cb(false)
			return
		end
	end

	if #collided_items > 0 then
		ESX.Custom.Inventory.UpdateItem(inv1, item)
		cb(false)
		return
	end

	if shift or ctrl then
		local amount = 1
		if shift then
			amount = math.floor(item.amount / 2)
		end

		if (amount > 0 and ESX.Custom.Inventory.RemoveItem(inv1, item, amount, false)) then
			local newitem = ESX.Custom.Inventory.AddItem(inv2, ESX.Custom.Inventory.Item.Duplicate(item), amount, false)
			if newitem then
				ESX.Custom.Inventory.SetItemPos(inv2, newitem.uid, { x = x, y = y })
				cb(false)
				return
			end
		end
	end

	if inv1.id == inv2.id then
		ESX.Custom.Inventory.SetItemPos(from, uid, { x = x, y = y })
		cb(true)
	else
		if ESX.Custom.Inventory.TransferItem({ uid = uid }, item.amount, inv1, inv2, false, { x = x, y = y}) then
			cb(true)
		else
			ESX.Custom.Inventory.UpdateItem(inv1, item)
			cb(false)
		end
	end
end

ESX.RegisterServerCallback('inventory:setItemPos', function(source, cb, from, to, uid, x, y, shift, ctrl)
	setItemPos(source, cb, from, to, uid, x, y, shift, ctrl)
end)
