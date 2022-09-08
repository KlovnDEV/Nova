ESX.Custom.Inventory.RegisterItemType('sim', {

	init = function(item)
		item.label = "SIM-карта"
		item.number = randomPhoneNumber()
		item.weight = 0.001
		return item
	end,

	getDescription = function(item)
		if item.number then
			return tostring(item.number)
		else
			return ''
		end
	end,

	getActions = function(item)
		return item.actions
	end,


	merge = function(xPlayer, inv1, item1, inv2, item2)
		return false
	end,
})

function randomPhoneNumber()
    return string.format("%03d-%02d-%02d", math.random(100,999), math.random(0,99), math.random(0,99))
end
