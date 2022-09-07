PlayerTargets = {}

local myheading = 0
local mypitch = 0

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(100)

		local heading = GetGameplayCamRelativeHeading()
		local pitch = GetGameplayCamRelativePitch()*0.2

		if math.abs(heading - myheading) > 5.0 or math.abs(pitch - mypitch) > 1.0 then
			myheading = heading
			mypitch = pitch
			TriggerServerEvent('headtrack:update', -Sin(heading)*10, Cos(heading)*10, pitch)
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		for _,player in ipairs(GetActivePlayers()) do
	        	local ped = GetPlayerPed(player)
			local target = PlayerTargets[player]

			if target and DoesEntityExist(ped) then
			        local isAiming = GetPedConfigFlag(ped, 78, 1)
				if not isAiming then
					SetIkTarget(ped, 1, PlayerPedId(), 0, target.x, target.y, target.z, 0, 100, 100)
				end
			end
		end

	end
end)

RegisterNetEvent("headtrack:update")
AddEventHandler("headtrack:update", function(serverid, x, y, z)
	local player = GetPlayerFromServerId(serverid)
	PlayerTargets[player] = { ["x"] = x, ["y"] = y, ["z"] = z}
end)
