ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function checkBodyCam(xPlayer)
	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
	if not inv then
		return false
	end

        local area = inv.areas['neck']
        local item = ESX.Custom.Inventory.SearchFirst(inv, { x = area.x, y = area.y, enabled = true })

	return item ~= nil
end

function paySalary(xPlayer)                                    
	TriggerEvent('engine:addPlayerMoney', xPlayer.source, 'bank', 100, 'Зарплата', function()
		xPlayer.showNotification('Начислена зарплата!')
	end)
end

Citizen.CreateThread(function()
	Citizen.Wait(1000)

	while true do
		local xPlayers = ESX.GetPlayers()

		for i = 1, #xPlayers do
			local xPlayer = ESX.GetPlayerFromId(xPlayers[i])

			if xPlayer ~= nil and ESX.Roles.HasRole(xPlayer.identifier, 'police') then
				local hasBodyCam = checkBodyCam(xPlayer)
				if hasBodyCam then
					paySalary(xPlayer)
				end
			end
		end

		Citizen.Wait(1000 * 60 * 60)
	end
end)
