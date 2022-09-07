torsoshirt = {}

RegisterNetEvent('clothesLimiter:torsoShirtList')
AddEventHandler('clothesLimiter:torsoShirtList', function(resp)
	if resp[1] ~= 200 then
		return
	end

	local list = json.decode(resp[2])
	for k,v in pairs(list) do
		print(json.encode(v))
		local id = tostring(v.sex).."/"..tostring(v.torso).."/"..tostring(v.shirt)
		torsoshirt[id] = true
	end
end)

TriggerServerEvent('clothesLimiter:torsoShirtGet')

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)

		local playerPed = PlayerPedId()

		local model = GetEntityModel(playerPed)

		local maleModel = GetHashKey("mp_m_freemode_01")
		local femaleModel = GetHashKey("mp_f_freemode_01")

		if model ~= maleModel and model ~= femaleModel then
			return
		end

		local sex = 0

		if model == femaleModel then
			sex = 1
		end


		local torso1 = GetPedDrawableVariation(playerPed, 11)
		local torso2 = GetPedTextureVariation(playerPed, 11)
		local torsoHash = GetHashNameForComponent(playerPed, 11, torso1, torso2)
		if torso1 < 16 then
			torsoHash = torso1
		end

		local tshirt1 = GetPedDrawableVariation(playerPed, 8)
		local tshirt2 = GetPedTextureVariation(playerPed, 8)
		local tshirtHash = GetHashNameForComponent(playerPed, 8, tshirt1, tshirt2)
		if tshirt1 < 16 then
			tshirtHash = tshirt1
		end

        if IsControlJustReleased(0, 157) then

		TriggerServerEvent('clothesLimiter:torsoShirtAllow', sex, torsoHash, tshirtHash)
		torsoshirt[tostring(sex).."/"..tostring(torsoHash).."/"..tostring(tshirtHash)] = true
		print(tostring(sex).."/"..tostring(torsoHash).."/"..tostring(tshirtHash), true)
		--TriggerEvent('ui:showNotification', tostring(sex).." "..tostring(torso1).." "..tostring(tshirt1))
	end

        if IsControlJustReleased(0, 158) then

		TriggerServerEvent('clothesLimiter:torsoShirtDeny', sex, torsoHash, tshirtHash)
		torsoshirt[tostring(sex).."/"..tostring(torsoHash).."/"..tostring(tshirtHash)] = false
		print(tostring(sex).."/"..tostring(torsoHash).."/"..tostring(tshirtHash), false)
		--TriggerEvent('ui:showNotification', tostring(sex).." "..tostring(torso1).." "..tostring(tshirt1))
	end

    end
end)
