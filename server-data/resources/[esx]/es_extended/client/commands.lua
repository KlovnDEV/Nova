function loadAnimDict(dict)
	RequestAnimDict(dict)

	for i=1,100 do
		if HasAnimDictLoaded(dict) then
			break
		end

		Citizen.Wait(0)
	end
end

RegisterNetEvent('admin_commands:emote')
AddEventHandler('admin_commands:emote', function(dict,anim)
	loadAnimDict(dict)
	local flag = 0
	TaskPlayAnim(PlayerPedId(), dict, anim, 3.0, -1, -1, flag, 0, false, false, false)
end)