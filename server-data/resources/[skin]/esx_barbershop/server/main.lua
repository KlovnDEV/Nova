ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('esx_barbershop:pay', function(source, cb)
	TriggerEvent('esx_atm:pay', source, "barbershop", Config.Price, cb)
end)
