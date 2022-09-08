ESX = nil

TriggerEvent('esx:getSharedObject', function(obj)
	ESX = obj
end)

RegisterServerEvent('esx_gym:hireBmx')
AddEventHandler('esx_gym:hireBmx', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 50, function(res)
		if res then
			notification("Вы арендовали ~g~BMX")
		else
			notification("~r~Недостаточно средств для аренды!~s~")
		end
	end)
end)

RegisterServerEvent('esx_gym:hireCruiser')
AddEventHandler('esx_gym:hireCruiser', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 50, function(res)
		if res then
			notification("Вы арендовали ~g~CRUISER")
		else
			notification("~r~Недостаточно средств для аренды!~s~")
		end
	end)
end)

RegisterServerEvent('esx_gym:hireFixter')
AddEventHandler('esx_gym:hireFixter', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 50, function(res)
		if res then
			notification("Вы арендовали ~g~FIXTER")
		else
			notification("~r~Недостаточно средств для аренды!~s~")
		end
	end)
end)

RegisterServerEvent('esx_gym:hireScorcher')
AddEventHandler('esx_gym:hireScorcher', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 50, function(res)
		if res then
			notification("Вы арендовали ~g~SCORCHER")
		else
			notification("~r~Недостаточно средств для аренды!~s~")
		end
	end)
end)

RegisterServerEvent('esx_gym:checkChip')
AddEventHandler('esx_gym:checkChip', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)
	local oneQuantity = xPlayer.getInventoryItem('gym_membership').count

	TriggerClientEvent('esx_gym:membership', source, oneQuantity > 0)
end)

ESX.RegisterUsableItem('gym_bandage', function(source)
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(source)

	xPlayer.removeInventoryItem('gym_bandage', 1)

	TriggerClientEvent('esx_gym:useBandage', source)
end)

RegisterServerEvent('esx_gym:buyBandage')
AddEventHandler('esx_gym:buyBandage', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 5, function(res)
		if res then
			xPlayer.addInventoryItem('gym_bandage', 1)
			notification("Вы купили ~g~Повязку")
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)

RegisterServerEvent('esx_gym:buyMembership')
AddEventHandler('esx_gym:buyMembership', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", Config.MembershipPrice, function(res)
		if res then
			xPlayer.addInventoryItem('gym_membership', 1)
			notification("Вы купили ~g~Абонемент")
			TriggerClientEvent('esx_gym:membership', source, true)
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)


RegisterServerEvent('esx_gym:buyProteinshake')
AddEventHandler('esx_gym:buyProteinshake', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 6, function(res)
		if res then
			xPlayer.addInventoryItem('protein_shake', 1)
			notification("Вы купили ~g~Протеиновый коктейль")
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)

ESX.RegisterUsableItem('protein_shake', function(source)

	local xPlayer = ESX.GetPlayerFromId(source)

	xPlayer.removeInventoryItem('protein_shake', 1)

	TriggerClientEvent('esx_status:add', source, 'thirst', 350000)
	TriggerClientEvent('esx_basicneeds:onDrink', source)
	TriggerClientEvent('esx:showNotification', source, 'Вы выпили ~g~Протеиновый коктейль')

end)

RegisterServerEvent('esx_gym:buyWater')
AddEventHandler('esx_gym:buyWater', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 1, function(res)
		if res then
			xPlayer.addInventoryItem('water', 1)
			notification("Вы купили ~g~Воду")
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)

RegisterServerEvent('esx_gym:buySportlunch')
AddEventHandler('esx_gym:buySportlunch', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 2, function(res)
		if res then
			xPlayer.addInventoryItem('sportlunch', 1)
			notification("Вы купили ~g~Спортивное питание")
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)

ESX.RegisterUsableItem('sportlunch', function(source)

	local xPlayer = ESX.GetPlayerFromId(source)

	xPlayer.removeInventoryItem('sportlunch', 1)

	TriggerClientEvent('esx_status:add', source, 'hunger', 350000)
	TriggerClientEvent('esx_basicneeds:onEat', source)
	TriggerClientEvent('esx:showNotification', source, 'Вы сьели ~g~Спортивное питание')

end)

RegisterServerEvent('esx_gym:buyPowerade')
AddEventHandler('esx_gym:buyPowerade', function()
	local _source = source
	local xPlayer = ESX.GetPlayerFromId(_source)

	TriggerEvent('esx_atm:pay', source, "gym", 4, function(res)
		if res then
			xPlayer.addInventoryItem('powerade', 1)
			notification("Вы купили ~g~Powerade")
		else
			notification("У вас не хватает ~r~денег")
		end
	end)
end)

ESX.RegisterUsableItem('powerade', function(source)

	local xPlayer = ESX.GetPlayerFromId(source)

	xPlayer.removeInventoryItem('powerade', 1)

	TriggerClientEvent('esx_status:add', source, 'thirst', 700000)
	TriggerClientEvent('esx_basicneeds:onDrink', source)
	TriggerClientEvent('esx:showNotification', source, 'Вы выпили ~g~Powerade')

end)

function notification(text)
	TriggerClientEvent('esx:showNotification', source, text)
end
