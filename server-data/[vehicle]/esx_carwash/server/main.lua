ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

ESX.RegisterServerCallback('esx_carwash:canAfford', function(source, cb)
	if not Config.EnablePrice then
		cb(true)
		return
	end

	TriggerEvent('esx_atm:pay', source, "carwash", Config.Price, cb)
end)
