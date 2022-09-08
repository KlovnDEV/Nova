ESX.Identity = {}

ESX.Identity.Set = function(firstname, lastname, sex, age, height)
	TriggerServerEvent('esx:setIdentity', firstname, lastname, sex, age, height)
end

