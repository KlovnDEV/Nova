ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

--Calls = {}
Calls = {
	["555-12-35"] = {
		link = nil,
		state = "ready",
	},
	["999-99-99"] = {
		link = "123-45-67",
		state = "ready",
	},
	["888-88-88"] = {
		link = "123-45-69",
		state = "in",
	},

}

AddEventHandler('esx:playerLoaded', function(playerId, xPlayer)
    updatePhone(playerId)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)
    Calls[phoneNumber] = {
        link = nil,
        state = "ready",
    }
end)

RegisterCommand("calls", function(src, args, raw)
	for k,v in pairs(Calls) do
		print(k, v.link or '___-__-__', v.state)
	end
end, true)


RegisterCommand("incomingCall", function(src, args, raw)
    startCall("555-12-35", "735-27-85")
end, true)

function startCall(from_phone, to_phone)
	--print('startCall', from_phone, to_phone)

	if not Calls[from_phone] then
        --print('startCall', 'not')
		Calls[from_phone] = { link = nil, state = "ready" }
	end

	if Calls[to_phone] == nil then
		--print('call_start na')
		Citizen.Wait(math.random(3000, 5000))
		return 'na'
	elseif Calls[to_phone].state == "ready" then
		--print('call_start out')
		Calls[from_phone].state = "call-out"
		Calls[to_phone].state = "call-in"
		Calls[from_phone].link = to_phone
		Calls[to_phone].link = from_phone
		TriggerClientEvent('react_phone:incomingCall', -1, from_phone, to_phone)

--		Citizen.Wait(5000)
--		acceptCall(from_phone, to_phone)
		return 'call-out'
	else
		--print('call_start busy')
		--print(Calls[to_phone].state)
		Citizen.Wait(math.random(3000, 5000))
		return 'busy'
	end
end

function acceptCall(from_phone, to_phone)
	--print('acceptCall', from_phone, to_phone)
	if not Calls[from_phone] then
		Calls[from_phone] = { link = nil, state = "ready" }
	end

	--print(Calls[to_phone].state)
	--print(Calls[to_phone].link)

	if Calls[to_phone].state == "call-in" and Calls[to_phone].link == from_phone then
        --print('acceptCall', 'in')
		Calls[from_phone].state = "out"
		Calls[to_phone].state = "in"
		TriggerClientEvent('react_phone:callAccepted', -1, from_phone, to_phone)
		return true
	end

    --print('acceptCall', 'false')
	return false
end

ESX.RegisterServerCallback('react_phone:startCall', function(source, cb, from_phone, to_phone)
	cb(startCall(from_phone, to_phone))
end)

ESX.RegisterServerCallback('react_phone:endCall', function(source, cb, from_phone)
	--print('call_end', from_phone)
	if not Calls[from_phone] then
		Calls[from_phone] = { link = nil, state = "ready" }
	end

	local to_phone = Calls[from_phone].link

	if not to_phone then
		cb(false)
		return
	end

	if Calls[to_phone] == nil then
		cb(false)
		return
	end

	--print('call_end state '..Calls[to_phone].state)

	if Calls[to_phone].state == "in" or Calls[to_phone].state == "call-in" or Calls[to_phone].state == "out" or Calls[to_phone].state == "call-out" then
		TriggerClientEvent('react_phone:callEnded', -1, from_phone, to_phone)
		Calls[to_phone].state = "ready"
		Calls[to_phone].link = nil
	end

	Calls[from_phone].state = "ready"
	Calls[from_phone].link = nil
	cb(true)
end)


ESX.RegisterServerCallback('react_phone:call_accept', function(source, cb, from_phone, to_phone)
	cb(acceptCall(to_phone, from_phone))
end)

ESX.RegisterServerCallback('react_phone:contacts_get', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)

    local res = exports['db'].post(0, 'phone/contacts/get', json.encode({
        ["sim_number"] = phoneNumber,
    }))

    if res and res[1] == 200 then
        cb(res[2])
    else
        cb(nil)
    end
end)

ESX.RegisterServerCallback('react_phone:contacts_create', function(source, cb, contact)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)

    local res = exports['db'].post(0, 'phone/contacts/create', json.encode({
        ["sim_number"] = phoneNumber,
        ["name"] = contact.name,
        ["avatar"] = contact.avatar,
        ["phone"] = contact.phone,
        ["favorite"] = contact.favorite
    }))

    if res and res[1] == 200 then
        cb(res[2])
    else
        cb(nil)
    end
end)

ESX.RegisterServerCallback('react_phone:set_favorite', function(source, cb, contactId, favorite)
    local xPlayer = ESX.GetPlayerFromId(source)

    local res = exports['db'].post(0, 'phone/contacts/setfavorite', json.encode({
        ["id"] = tonumber(contactId),
        ["favorite"] = favorite,
    }))

    if res and res[1] == 200 then
        cb(res[2])
    else
        cb(nil)
    end
end)

ESX.RegisterServerCallback('react_phone:contacts_delete', function(source, cb, contactId)
    local xPlayer = ESX.GetPlayerFromId(source)

    local res = exports['db'].post(0, 'phone/contacts/delete', json.encode({
        ["id"] = tonumber(contactId),
    }))

    if res and res[1] == 200 then
        cb(res[2])
    else
        cb(nil)
    end
end)

function getPhoneNumber(identifier)
    local xPlayer = ESX.GetPlayerFromIdentifier(identifier)
    if not xPlayer then
        return 'empty'
    end

    local player = Player(xPlayer.source)
    return player.state.phone or 'empty'
end

ESX.RegisterServerCallback('react_phone:get_phone_number', function(source, cb, contactId)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)
    Calls[phoneNumber] = {
        link = nil,
        state = "ready",
    }
    cb(phoneNumber)
end)

ESX.RegisterServerCallback('react_phone:get_messages', function(source, cb, number2)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)

    local res = exports['db'].post(0, 'phone/messages/get', json.encode({
        ["number1"] = phoneNumber,
        ["number2"] = number2,
    }))

    if res and res[1] == 200 then
        cb(json.decode(res[2]))
    else
        cb(nil)
    end
end)

ESX.RegisterServerCallback('react_phone:get_last_messages', function(source, cb)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)

    local res = exports['db'].post(0, 'phone/messages/get_last', json.encode({
        ["phoneNumber"] = phoneNumber,
    }))

    if res and res[1] == 200 then
        cb(json.decode(res[2]))
    else
        cb(nil)
    end
end)

ESX.RegisterServerCallback('react_phone:create_message', function(source, cb, sim_number, msg)
    local xPlayer = ESX.GetPlayerFromId(source)
    local phoneNumber = getPhoneNumber(xPlayer.identifier)

    local res = exports['db'].post(0, 'phone/messages/create', json.encode({
        ["sim_number"] = sim_number,
        ["from_number"] = phoneNumber,
        ["message"] = msg,
    }))

    if res and res[1] == 200 then
        cb(json.decode(res[2]))
    else
        cb(nil)
    end
end)

function updatePhone(source)
    local player = Player(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)

    if not inv then
        player.state.phone = 'empty'    
        return
    end

    local phone_area = inv.areas['phone']
    local item = ESX.Custom.Inventory.SearchFirst(inv, { x = phone_area.x, y = phone_area.y })

    local prev_phone = player.state.phone or 'empty'

    if prev_phone ~= nil then
        Calls[prev_phone] = nil
    end

    if item then
        if item.name == 'phone' and item.number then
            player.state.phone = item.number
            Calls[item.number] = { link = nil, state = "ready" }
        else
            player.state.phone = 'empty'
        end
    else
	    player.state.phone = 'empty'
    end

    TriggerClientEvent('react_phone:phoneChanged', xPlayer.source, player.state.phone)
end

RegisterServerEvent('react_phone:update')
AddEventHandler('react_phone:update', function()
    updatePhone(source)
end)
