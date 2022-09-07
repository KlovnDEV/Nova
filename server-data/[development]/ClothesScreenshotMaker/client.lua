local _testKey = 38 -- replace with the key you want to test the script (fivem keys: https://docs.fivem.net/docs/game-references/controls/)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
	SetIkTarget(PlayerPedId(), 1, PlayerPedId(), 0, 0.0, 0.0, 0.6, 0, 100, 100)
    end
end)

function save(fname)
	TriggerServerEvent('api_test:save', fname)
--[[
	exports['screenshot-basic']:requestScreenshot(function(data)
--		TriggerEvent('chat:addMessage', { template = '<img src="{0}" style="max-width: 300px;" />', args = { data } })
		TriggerServerEvent('api_test:save', fname, data)
	end)
]]
end

function GetShopPedComponent2(hash)

    local blob = string.rep('\0\0\0\0\0\0\0\0', 9 + 16)
    if not Citizen.InvokeNative(0x74C0E2A57EC66760, hash, blob) then
        return nil
    end

    local lockHash = string.unpack('<i4', blob, 1)
    local hash = string.unpack('<i4', blob, 9)
    local locate = string.unpack('<i4', blob, 17)
    local drawable = string.unpack('<i4', blob, 25)
    local texture = string.unpack('<i4', blob, 33)
    local field5 = string.unpack('<i4', blob, 41)
    local component = string.unpack('<i4', blob, 49)
    local field7 = string.unpack('<i4', blob, 57)
    local field8 = string.unpack('<i4', blob, 65)
    local gxt = string.unpack('z', blob, 73)

    return lockHash, hash, locate, drawable, texture, field5, component, field7, field8, gxt
end


function PrintComponent(ped, cid, drawable, texture)
    local ped = PlayerPedId()
    local model = GetEntityModel(ped)
    if (model ~= GetHashKey("mp_m_freemode_01") and model ~= GetHashKey("mp_f_freemode_01")) then
        return
    end

    local topHash = GetHashNameForComponent(ped, cid, drawable, texture)
    local lockHash, hash, locate, _drawable, _texture, f_5, componentType, f_7, f_8, gxt = GetShopPedComponent2(topHash)
	print(cid, drawable, texture, lockHash, hash, locate, _drawable, _texture, f_5, componentType, f_7, f_8, gxt)
end

function GetProperTorso(ped, cid, drawable, texture)
    local ped = PlayerPedId()
    local model = GetEntityModel(ped)
    if (model ~= GetHashKey("mp_m_freemode_01") and model ~= GetHashKey("mp_f_freemode_01")) then
        return -1, -1
    end

    local topHash = GetHashNameForComponent(ped, cid, drawable, texture)
    local fcTorsoDrawable = -1
    local fcTorsoTexture = -1

    for i = 0, GetShopPedApparelForcedComponentCount(topHash) do
        fcNameHash, fcEnumValue, fcType = GetForcedComponent(topHash, i)

       if (fcNameHash == 0 or fcNameHash == GetHashKey("0")) then
            fcTorsoDrawable = -1 --fcEnumValue
            fcTorsoTexture = -1 --0
        else
            	local lockHash, hash, locate, drawable, texture, f_5, componentType, f_7, f_8, gxt = GetShopPedComponent2(fcNameHash)
		print(drawable)
		print(texture)
            if fcType == 3 then
	        SetPedComponentVariation(ped, fcType, drawable, texture, 2)
 		return drawable, texture
	    end
--		fcTorsoDrawable = drawable
--		fcTorsoTexture = texture
        end
    end

    return fcTorsoDrawable, fcTorsoTexture
end



Citizen.CreateThread(function()
--    while true do
	local playerPed = PlayerPedId()
	SetEntityCoordsNoOffset(playerPed, -69.35, -816.52, 285.0, true, false, false)
--	SetEntityHeading(playerPed, 256)

	local camPos
	local camRot = vector3(0, 0, 270)

	-- Torso
--	camPos = vector3(-1.2, 0, 0.4)

	-- Pants
--	camPos = vector3(-1.2, 0, -0.4)

	-- Shoes
--	camPos = vector3(-0.8, 0.4, -0.8)
--	camRot = vector3(0, 0, 240)

	-- Mask
	camPos = vector3(-0.6, 0, 0.7)

	-- Watches
--	camRot = vector3(0, 0, 340)
--	camPos = vector3(-0.0, -0.8, 0.0)

	-- Ears
--	camPos = vector3(-0.2, 0.3, 0.65)
--	camRot = vector3(0, 0, 200)

	-- Chain
--	camPos = vector3(-0.6, 0, 0.4)


	CreateSkinCam(camPos, camRot, 90.0)

	TriggerEvent('dpemotes:emote', 't2')

	for i = 3, 1, -1 do
		print(i)
	        Citizen.Wait(1000)
	end
--        if IsControlJustReleased(0, _testKey) then

--		TriggerEvent('dpemotes:emote', 'handsup')
--		Citizen.Wait(1000)

		local arms2 = 0
		local torso1 = 15
		local torso2 = 0
		local tshirt2 = 0
		local tshirt1 = 15 -- 15 = m, 14 = f
		local pants1 = 3 --11 = m, 13 = f, 15 = all
		local pants2 = 0
		local shoes1 = 35
		local shoes2 = 0
		local mask1 = 0
		local mask2 = 0
		local helmet1 = -1
		local helmet2 = 0
		local glasses1 = -1
		local glasses2 = 0
		local watches1 = -1
		local watches2 = 0
		local ears1 = -1
		local ears2 = 0
		local chain1 = 0
		local chain2 = 0


--                SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 2)

                local player = PlayerPedId()

--		for ears1 = 0, GetNumberOfPedPropDrawableVariations(playerPed, 2) - 1 do
--		for ears2 = 0, GetNumberOfPedPropTextureVariations(playerPed, 2, ears1) - 1 do

--		for watches1 = 0, GetNumberOfPedPropDrawableVariations(playerPed, 6) - 1 do
--		for watches2 = 0, GetNumberOfPedPropTextureVariations(playerPed, 6, watches1) - 1 do

		for glasses1 = 0, GetNumberOfPedPropDrawableVariations(playerPed, 1) - 1 do
		for glasses2 = 0, GetNumberOfPedPropTextureVariations(playerPed, 1, glasses1) - 1 do

--		for helmet1 = 0, GetNumberOfPedPropDrawableVariations(playerPed, 0) - 1 do
--		for helmet2 = 0, GetNumberOfPedPropTextureVariations(playerPed, 0, helmet1) - 1 do

--		for chain1 = 0, GetNumberOfPedDrawableVariations(playerPed, 7) - 1 do
--		for chain2 = 0, GetNumberOfPedTextureVariations(playerPed, 7, chain1) - 1 do

--		for mask1 = 0, GetNumberOfPedDrawableVariations(playerPed, 1) - 1 do
--		for mask2 = 0, GetNumberOfPedTextureVariations(playerPed, 1, mask1) - 1 do

--		for shoes1 = 0, GetNumberOfPedDrawableVariations(playerPed, 6) - 1 do
--		for shoes2 = 0, GetNumberOfPedTextureVariations(playerPed, 6, shoes1) - 1 do

--		for pants1 = 0, GetNumberOfPedDrawableVariations(playerPed, 4) - 1 do
--		for pants2 = 0, GetNumberOfPedTextureVariations(playerPed, 4, pants1) - 1 do

--		for torso1 = 0, GetNumberOfPedDrawableVariations(playerPed, 11) - 1 do
--		for torso2 = 0, GetNumberOfPedTextureVariations(playerPed, 11, torso1) - 1 do
			SetPedPropIndex(playerPed, 0, helmet1, helmet2)
			SetPedPropIndex(playerPed, 1, glasses1, glasses2)
			SetPedPropIndex(playerPed, 2, ears1, ears2)
			SetPedPropIndex(playerPed, 6, watches1, watches2)
	                SetPedComponentVariation(playerPed, 1, mask1, mask2, 0)
	                SetPedComponentVariation(playerPed, 4, pants1, pants2, 0)
	                SetPedComponentVariation(playerPed, 6, shoes1, shoes2, 0)
	                SetPedComponentVariation(playerPed, 7, chain1, chain2, 0)
	                SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
	                SetPedComponentVariation(playerPed, 11, torso1, torso2, 0)

			Citizen.Wait(100)

--			local topHash = GetHashNameForComponent(playerPed, 1, mask1, mask2)
			local topHash = GetHashNameForProp(playerPed, 0, glasses1, glasses2)
			if topHash == 0 then
				topHash = (1+12)*1000000 + glasses1*100 + glasses2
			end

--			topHash = ears1*100 + ears2

			--local lockHash, hash, locate, _drawable, _texture, f_5, componentType, f_7, f_8, gxt = GetShopPedComponent2(topHash)

			exports['ArmLimiter']:doLimit()
			Citizen.Wait(100)
			save(tostring(topHash))
--			TriggerEvent('clothesLimiter:limit', function()
--				Citizen.Wait(100)
--				save(tostring(topHash))
--			end)

			Citizen.Wait(200)
		end
		end

		Citizen.Wait(1000)
		DeleteSkinCam()

end)
