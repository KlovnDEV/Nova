Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)

	local playerPed = PlayerPedId()

	local sex = getSex(playerPed)

	if sex == nil then
		return
	end



	local helmet1 = GetPedPropIndex(playerPed, 0)
	local helmet2 = GetPedPropTextureIndex(playerPed, 0)

	local torso1 = GetPedDrawableVariation(playerPed, 11)
	local torso2 = GetPedTextureVariation(playerPed, 11)

	local hash = GetHashNameForComponent(playerPed, 11, torso1, torso2)
--	print(helmet1, helmet2)
--	print('torso',  torso1, torso2, hash)


--	limitArms(playerPed, sex)
--	limitPantsAndShoes(playerPed, sex)
    end
end)


function doLimit()
	local playerPed = PlayerPedId()

	local sex = getSex(playerPed)

	if sex == nil then
		return
	end

	limitArms(playerPed, sex)
	limitPantsAndShoes(playerPed, sex)
end


RegisterNetEvent('clothesLimiter:limit')
AddEventHandler('clothesLimiter:limit', function(cb)
	doLimit()
	Citizen.Wait(100)
	cb()
end)

exports('doLimit', doLimit)
