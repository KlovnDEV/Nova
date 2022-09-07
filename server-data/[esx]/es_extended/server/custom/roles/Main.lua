ESX.Roles = {}
ESX.Roles.Grades = {}

roles = {}
rolesPopulated = false

function populateRoles(results)

	for _,row in pairs(results) do
		local id = row.identifier

		if roles[id] == nil then
			roles[id] = {}
		end

		if roles[id][row.role] == nil then
			roles[id][row.role] = {}
		end

		roles[id][row.role].grade = row.grade
	end

	rolesPopulated = true
end

function getRolesFromDB(cb, id)
	local result

	if id ~= nil then
		local res = exports['db'].post(0, 'roles/get', json.encode({
			["identifier"] = id,
		}))

		if res[1] == 200 then
			cb(json.decode(res[2]))
		else
			ESX.Error('Unable to get roles from DB! '..json.encode(res), debug.traceback())
		end
	else
		local res = exports['db'].post(0, 'roles/get', "{}")

		if res[1] == 200 then
			cb(json.decode(res[2]))
		else
			ESX.Error('Unable to get roles from DB! '..json.encode(res), debug.traceback())
		end
	end
end

function hasRole(identifier, role)

	if type(role) == 'table' then
		for _,v in pairs(role) do
			if hasRole(identifier, v) then
				return true
			end
		end
		return false
	end

	if roles[identifier] == nil then
		return false
	end

	return roles[identifier][role] ~= nil
end

ESX.Roles.HasRole = function(identifier, role)
	return hasRole(identifier,role)
end

ESX.Roles.ListPlayersWithRole = function(role)
	local res = exports['db'].post(0, 'roles/get', json.encode({
		["role"] = role,
	}))

	if res[1] == 200 then
		return json.decode(res[2])
	else
		return nil
	end
end

ESX.Roles.HasRole = function(identifier, role)
	local roleInfo = ESX.Roles.Get(identifier, role)
	return roleInfo and roleInfo.grade
end

ESX.Roles.Get = function(identifier, role)
	assert(identifier)

	if not roles[identifier] then
		return {}
	end

	if role then
		return roles[identifier][role] or {}
	else
		return roles[identifier] or {}
	end
end

ESX.Roles.Set = function(identifier, role, grade)
	assert(identifier)
	assert(role)
	assert(grade)

	if roles[identifier] == nil then
		roles[identifier] = {}
	end

	local res = exports['db'].post(0, 'roles/update', json.encode({
		["identifier"] = identifier,
		["role"] = role,
		["grade"] = grade
	}))

	if res and res[1] == 200 then
		if roles[identifier][role] == nil then
			roles[identifier][role] = {}
		end

		roles[identifier][role].grade = grade
		sendRoles(identifier)
	end
end

ESX.Roles.Remove = function(identifier, role)
	assert(identifier)
	assert(role)

	local res = exports['db'].post(0, 'roles/update', json.encode({
		["identifier"] = identifier,
		["role"] = role,
		["grade"] = -1
	}))

	if res and res[1] == 200 then
		roles[identifier][role] = nil
		sendRoles(identifier)
	end
end

ESX.Roles.Grades.Get = function(role)
	assert(role)
	local res = exports['db'].post(0, 'roles/grades/get', json.encode({
		["role"] = role,
	}))
	if res[1] == 200 then
		return json.decode(res[2])
	else
		ESX.Error('Grades retrieval failed! '..json.encode(res), debug.traceback())
		return nil
	end
end

function sendRoles(identifier)
	local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
	if xPlayer == nil then
		return false
	end

	local roledata = ESX.Roles.Get(identifier)
	if roledata == nil then
		roledata = {}
	end

	local player = Player(xPlayer.source)
	player.state.roles = roledata

	TriggerClientEvent('esx:sendRoles', xPlayer.source, roledata)
	return true
end

MySQL.ready(function()
	if #roles == 0 then
		getRolesFromDB(populateRoles)
	end

	while not rolesPopulated do
		Citizen.Wait(1000)
	end

	local xPlayers = ESX.GetPlayers()

	for i=1, #xPlayers, 1 do
		local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
		if xPlayer ~= nil then
			sendRoles(xPlayer.identifier)
		end
	end
end)

ESX.RegisterServerCallback('esx:getRoles', function(source, cb)
	local xPlayer = ESX.GetPlayerFromId(source)
	if xPlayer ~= nil then
		cb(ESX.Roles.Get(xPlayer.identifier))
	else
		cb({})
	end
end)

ESX.RegisterServerCallback('esx:getRoleGrades', function(source, cb, role)
	cb(ESX.Roles.Grades.Get(role))
end)

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
	if xPlayer then
		getRolesFromDB(populateRoles, xPlayer.identifier)
		sendRoles(xPlayer.identifier)
	end
end)
