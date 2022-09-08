local animPlaying = false

function loadAnimDict(dict)
	RequestAnimDict(dict)

	for i=1,100 do
		if HasAnimDictLoaded(dict) then
			break
		end

		Citizen.Wait(0)
	end
end

RegisterNetEvent('nova-ui:anim_coffee')
AddEventHandler('nova-ui:anim_coffee', function(data)

	if animPlaying then
		return
	end

	animPlaying = true

	local animDict = 'amb@world_human_aa_coffee@idle_a'
	local animName = 'idle_a'
	local model = 'prop_fib_coffee'

	loadAnimDict(animDict)
	RequestModel(model)
	while not HasModelLoaded(model) do
		Citizen.Wait(0)
	end

	local flag = 2
	if IsPedInAnyVehicle(PlayerPedId(), true) then
		flag = flag + 16
	end

        TaskPlayAnim(PlayerPedId(), animDict, animName, 8.0, 8.0, -1, flag, 0.0, false, false, false);

        local attachedProp = CreateObject(GetHashKey(model), 1.0, 1.0, 1.0, true, false, true);
	local bone = GetPedBoneIndex(PlayerPedId(), 28422)

	Citizen.Wait(100)

        AttachEntityToEntity(attachedProp, PlayerPedId(), bone, 0, 0, 0, 0, 0, 0, true, true, false, true, 1, true);
        while IsEntityPlayingAnim(PlayerPedId(), animDict, animName, 3) do
		if GetEntityAnimCurrentTime(PlayerPedId(), animDict, animName) == 1.0 then
			if animName == 'idle_a' then
				animName = 'idle_b'
			elseif animName == 'idle_b' then
				animName = 'idle_c'
			else
				animName = 'idle_a'
			end
		        TaskPlayAnim(PlayerPedId(), animDict, animName, 8.0, 8.0, -1, flag, 0.0, false, false, false);
		end
		Citizen.Wait(0)
	end

        DeleteObject(attachedProp)
	animPlaying = false
end)
