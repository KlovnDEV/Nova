RegisterNetEvent('inventory:applyRevivekit')
AddEventHandler('inventory:applyRevivekit', function()

	local player, distance = ESX.Game.GetClosestPlayer()
    local ped = GetPlayerPed(-1)

	if player < 0 or distance > 3.0 then
		ESX.ShowNotification('~r~Некого оживлять!~s~')
		return
	end

    TaskPlayAnim(PlayerPedId(), 'mini@cpr@char_a@cpr_str', 'cpr_pumpchest', 8.0, -8.0, -1, 0, 0, false, false, false)
    Citizen.Wait(5000)
	TriggerServerEvent('esx:revive', GetPlayerServerId(player))
end)
