local proximities = {2.5, 8.0, 20.0}
local prox = proximities[1]
local isTalking = false
local inTheGame = false
local ticksToShowProx = 0


AddEventHandler('pma-voice:setTalkingMode', function(proximity)
	print('setProximity', proximity)
	setProximity(proximity)
end)

function setProximity(value)
	prox = proximities[value]
	SendNUIMessage({query = "indicators/voice/proximity", value = value})
	ticksToShowProx = 30
end

TriggerEvent("nova-ui:SetVoiceData", voiceData, key, value, target)

--[[
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(500)
		if not inTheGame then
			NetworkSetVoiceActive(false)
			NetworkSetTalkerProximity(1.0)
			inTheGame = true
		end
	end
end)
]]--
Citizen.CreateThread(function()
	Citizen.Wait(1000)
	setProximity(2)

	while true do
		Citizen.Wait(0)
		if ticksToShowProx > 0 then
			local posPlayer = GetEntityCoords(GetPlayerPed(-1))
			DrawMarker(23, posPlayer.x, posPlayer.y, posPlayer.z - 1, 0, 0, 0, 0, 0, 0, prox * 2, prox * 2, 0.8001, 0, 145, 255, 165, 0,0, 0,0)
			ticksToShowProx = ticksToShowProx - 1
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(50)
			if isTalking == false then
				if NetworkIsPlayerTalking(PlayerId()) then
					isTalking = true
					SendNUIMessage({query = "indicators/voice/talk", value = true})
				end
			else
				if NetworkIsPlayerTalking(PlayerId()) == false then
					isTalking = false
					SendNUIMessage({query = "indicators/voice/talk", value = false})
				end
			end
	end
end)
