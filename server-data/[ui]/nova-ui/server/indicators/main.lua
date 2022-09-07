local zonePos = vector3(-74.07, -823.06, 285)

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

	local distance = #(zonePos - vector3(player.state.coords[1], player.state.coords[2], player.state.coords[3]))
--[[
	if distance < 16.0 then
		player.state.buffs = {
			['nonrp'] = { startTime = 0, label = 'Non-RP zone' }
		}
	else
		player.state.buffs = {}
	end
]]--
end
