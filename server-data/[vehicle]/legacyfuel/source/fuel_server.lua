ESX = nil
local FuelInfo = {}

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('fuel:pay')
AddEventHandler('fuel:pay', function(price)
	local xPlayer = ESX.GetPlayerFromId(source)
	assert(price > 0, 'Negative fuel price! Id: '..tostring(xPlayer.identifier))

	local amount = math.ceil(price)

	ESX.Money.Pay('cash', xPlayer.identifier, amount, function(success)
		-- success
	end, function(failure)
		-- fail
	end, { description = "Fuel" }, 'fuel_tax')
end)

ESX.RegisterServerCallback('legacyfuel:getFuel', function(source, cb, plate)
--	local xPlayer = ESX.GetPlayerFromId(source)
	if FuelInfo[plate] == nil then
		FuelInfo[plate] = math.random(200, 800) / 10
	end

--	print("getFuel "..tostring(FuelInfo[plate]))
	cb(FuelInfo[plate])
end)

RegisterServerEvent('legacyfuel:setFuel')
AddEventHandler('legacyfuel:setFuel', function(plate, amount)
--	print("setFuel "..tostring(amount))
	FuelInfo[plate] = amount
end)

--[[
RegisterServerEvent('esx:onAccountMoneyChange')
AddEventHandler('esx:onAccountMoneyChange', function(name, identifier)
	local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
	if not xPlayer then return end

	ESX.Money.Get(name, identifier, function(value)
		TriggerClientEvent('legacyfuel:onAccountMoneyChange', xPlayer.source, name, value)
	end)
end)
end
]]--

ESX.RegisterCommand('setfuel', 'admin', function(xPlayer, args, showError)
	TriggerClientEvent('legacyfuel:set', xPlayer.source, args.value)

end, true, {help = "Установить значение топлива", validate = true, arguments = {
	{name = 'value', help = "Значение", type = 'number'},
}})
