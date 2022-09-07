function blackFractionToCount(amount, fraction)
	return math.floor(amount*fraction)
end

function blackCountToFraction(amount, count)
	return count/amount
end

ESX.Custom.Inventory.RegisterItemType('money', {

	init = function(item)
		item.extra = { ['black'] = math.random(0, 100)/100.0 }
		return item
	end,
--[[
	getDescription = function(item)
		if item.extra and item.extra.black ~= nil then
			return "Меченые: "..tostring(blackFractionToCount(item.amount, item.extra.black))
		end

		return item.description
	end,
]]--
	getActions = function(item)
		return item.actions
	end,

	merge = function(xPlayer, inv1, item1, inv2, item2)
		local amount1 = item1.amount
		local amount2 = item2.amount

		if AbstractMergeItems(xPlayer, inv1, item1, inv2, item2, true) then
			local black1 = blackFractionToCount(amount1, item1.extra.black or 0)
			local black2 = blackFractionToCount(amount2, item2.extra.black or 0)

			item1.extra.black = blackCountToFraction(amount1 + amount2, black1 + black2)
			ESX.Custom.Inventory.UpdateItem(inv1, item1)
			return true
		end

		return false
	end,
})
