ESX = nil

local currentSpawnPoint = 1

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function saveSkin(identifier, skin)
	MySQL.Async.execute('UPDATE users SET skin = @skin WHERE identifier = @identifier', {
		['@skin'] = json.encode(skin),
		['@identifier'] = identifier
	})
end

-- Создание перса при первом коннекте

RegisterServerEvent('skin:createCharacter')
AddEventHandler('skin:createCharacter', function()
	local xPlayer = ESX.GetPlayerFromId(source)
	xPlayer.setCoords(Config.SpawnPoints[currentSpawnPoint]);
	TriggerClientEvent('nova-ui:openSkinChanger', xPlayer.source, true)

	currentSpawnPoint = currentSpawnPoint + 1
	if currentSpawnPoint > #Config.SpawnPoints then
		currentSpawnPoint = 1
	end
end)

RegisterServerEvent('skin:save')
AddEventHandler('skin:save', function(skin)
	local xPlayer = ESX.GetPlayerFromId(source)
	saveSkin(xPlayer.identifier, skin)
end)

RegisterServerEvent('skin:responseSaveSkin')
AddEventHandler('skin:responseSaveSkin', function(skin)
	local xPlayer = ESX.GetPlayerFromId(source)

	if xPlayer.getGroup() == 'admin' then
		local file = io.open('resources/[skin]/skin/skins.txt', "a")

		file:write(json.encode(skin) .. "\n\n")
		file:flush()
		file:close()
	else
		print(('skin: %s attempted saving skin to file'):format(xPlayer.getIdentifier()))
	end
end)

ESX.RegisterServerCallback('skin:getPlayerSkin', function(source, cb)
	local xPlayer = ESX.GetPlayerFromId(source)

	local res = exports['db'].post(0, 'skin/get', json.encode({ ['identifier'] = xPlayer.identifier }))

	if res[1] == 200 then
		local users = json.decode(res[2])
		local user = users[1]
		local skin

		if user.skin then
			skin = json.decode(user.skin)
		end

		cb(skin)
	end
end)

ESX.RegisterCommand('skin_old', 'admin', function(xPlayer, args, showError)
	xPlayer.triggerEvent('skin:openSaveableMenu')
end, false, {help = _U('skin')})

ESX.RegisterCommand('skinsave', 'admin', function(xPlayer, args, showError)
	xPlayer.triggerEvent('skin:requestSaveSkin')
end, false, {help = _U('saveskin')})


Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)

		local xPlayers = ESX.GetPlayers()

		for i=1, #xPlayers, 1 do
			local xPlayer = ESX.GetPlayerFromId(xPlayers[i])
			if xPlayer ~= nil then
				processPlayer(xPlayer)
			end
		end
	end
end)

function processPlayer(xPlayer)
	local player = Player(xPlayer.source)

	if not player or not player.state.coords then
		return
	end
	local playerPos = vector3(player.state.coords[1], player.state.coords[2], player.state.coords[3])

	local nonRP = false

	for k,v in pairs(Config.SpawnPoints) do
		local zonePos = vector3(v.x, v.y, v.z)
		local distance = #(zonePos-playerPos)
		if distance < 16.0 then
			nonRP = true
			break
		end
	end

--[[
	if nonRP then
		player.state.buffs = {
			['nonrp'] = { startTime = 0, label = 'Non-RP zone' }
		}
	else
		player.state.buffs = {}
	end
]]
end
