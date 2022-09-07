ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--local cityBudget = exports.money.new(0, "budget", "city")
--cityBudget.Set(1500, "Бюджет города")

ESX.Money.Set('budget', 'government', 1500, function() end)

ESX.RegisterServerCallback('government:getBudget', function(source, cb)

	ESX.Money.Get('budget', 'government', function(amount)
		cb(amount)
	end)

--	cb(cityBudget.Get())
end)
