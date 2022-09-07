ESX.Identity = {}
ESX.Identity.Grades = {}

identity = {}

function sendIdentity(identifier, identity)
	local xPlayer = ESX.GetPlayerFromIdentifier(identifier)

	local ply = Player(xPlayer.source)
	ply.state.identity = identity
end

function populateIdentity(results)

	for _,row in pairs(results) do
		local id = row.identifier

		if identity[id] == nil then
			identity[id] = {}
		end

		identity[id] = row
	end
end

function getIdentityFromDB(id)
        assert(id)

	if id ~= nil then
		local res = exports['db'].post(0, 'identity/get', json.encode({
			["identifier"] = id,
		}))

		if res[1] == 200 then
			return json.decode(res[2])
		else
			ESX.Error('Unable to get identity from DB! '..json.encode(res), debug.traceback())
		end
	end

	return nil
end

ESX.Identity.Get = function(identifier)
	assert(identifier)

	if not identity[identifier] then
		return nil
	end

	return identity[identifier]
end

ESX.Identity.Set = function(identifier, firstname, lastname, sex, age, height)
	assert(identifier)
	assert(firstname)
	assert(lastname)
	assert(sex)
	assert(age)
	assert(height)

	if identity[identifier] == nil then
		identity[identifier] = {}
	end

	local identity = {
		["identifier"] = identifier,
		["firstname"] = firstname,
		["lastname"] = lastname,
		["sex"] = sex,
		["age"] = age,
		["height"] = height,
	}

	local res = exports['db'].post(0, 'identity/update', json.encode(identity))

	if res and res[1] == 200 then
		identity[identifier] = identity
		sendIdentity(identifier, identity)
	end
end

ESX.RegisterServerCallback('esx:getIdentity', function(source, cb)
	local xPlayer = ESX.GetPlayerFromId(source)
	if xPlayer ~= nil then
		cb(ESX.Identity.Get(xPlayer.identifier))
	else
		cb({})
	end
end)

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
	if xPlayer then
		local identities = getIdentityFromDB(xPlayer.identifier)
		if #identities > 0 then
			populateIdentity(identities)
		end
		sendIdentity(xPlayer.identifier, identities[1])
	end
end)

RegisterNetEvent('esx:setIdentity')
AddEventHandler('esx:setIdentity', function(firstname, lastname, sex, age, height)
    local xPlayer = ESX.GetPlayerFromId(source)
    ESX.Identity.Set(xPlayer.identifier, firstname, lastname, sex, age, height)
end)
