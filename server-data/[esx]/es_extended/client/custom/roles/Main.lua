ESX.Roles = {}
myRoles = nil

ESX.Roles.HasRole = function(roleName)
	if not myRoles then
		updateRoles(LocalPlayer.state.roles)
	end

	if myRoles == nil then
		return false
	end

	for k,v in pairs(myRoles) do
		if k == roleName then
			return true
		end
	end

	return false
end

ESX.Roles.Get = function(role)
	if not myRoles then
		updateRoles(LocalPlayer.state.roles)
	end

	if not role then
		return myRoles
	end

	return myRoles[role]
end

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	updateRoles(LocalPlayer.state.roles)
end)

RegisterNetEvent('esx:sendRoles')
AddEventHandler('esx:sendRoles', function(roles)
	updateRoles(roles)
end)

RegisterNetEvent('esx:getRoles')
AddEventHandler('esx:getRoles', function(cb)
	if not myRoles then
		updateRoles(LocalPlayer.state.roles)
	end

	cb(myRoles)
end)

function updateRoles(roles)
	myRoles = roles
	TriggerEvent('esx:setRoles', roles)
end
