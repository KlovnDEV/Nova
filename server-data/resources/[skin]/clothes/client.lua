ESX = nil
Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

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

function GetShopPedProp2(hash)
    local blob = string.rep('\0\0\0\0\0\0\0\0', 9 + 16)
    if not Citizen.InvokeNative(0x5D5CAFF661DDF6FC, hash, blob) then
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

function clothToSkin(cid, drawable, texture)
	local adapt = {
		[1] = { "mask_1", "mask_2" },
		[2] = { "hair_1", "hair_2" },
		[3] = { "arms", "arms_2" },
		[4] = { "pants_1", "pants_2" },
		[5] = { "bags_1", "bags_2" },
		[6] = { "shoes_1", "shoes_2" },
		[7] = { "chain_1", "chain_2" },
		[8] = { "tshirt_1", "tshirt_2" },
		[9] = { "bproof_1", "bproof_2" },
		[10] = { "decals_1", "decals_2" },
		[11] = { "torso_1", "torso_2" },
		[12] = { "helmet_1", "helmet_2" },
	}
	local ct = adapt[cid]

	assert(ct)

	local res = {}
	res[ct[1]] = drawable
	res[ct[2]] = texture

	return res
end


RegisterNetEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inventory)
    local xPlayer = ESX.GetPlayerData()
    if (inventory.category == "player-inventory" and inventory.identifier == xPlayer.identifier) then
        TriggerServerEvent('clothes:update')
    end
end)

RegisterNetEvent('clothes:update')
AddEventHandler('clothes:update', function(components, props, gloves1, gloves2)
	print('client clothes  update', json.encode(components), json.encode(props), gloves1, gloves2)

    local skin = {}

    for k,hash in pairs(components) do
	local lockHash, comphash, locate, drawable, texture, field5, cid, field7, field8, gxt = GetShopPedComponent2(hash)

	if comphash ~= 0 then
		local subskin = clothToSkin(cid, drawable, texture)
	
		if subskin then
			for k2,v2 in pairs(subskin) do
				skin[k2] = v2
			end
		end
	end
    end

    for k,hash in pairs(props) do
	local lockHash, prophash, locate, drawable, texture, field5, cid, field7, field8, gxt = GetShopPedProp2(hash)
	print('prop', lockHash, comphash, locate, drawable, texture, field5, cid, field7, field8, gxt)

	if prophash ~= 0 then
		-- todo: PROPS!
--[[
		local subskin = clothToSkin(cid, drawable, texture)
	
		if subskin then
			for k2,v2 in pairs(subskin) do
				skin[k2] = v2
			end
		end
]]
	else
		local hhash = hash
		local cid = math.floor(hash / 1000000)
		hhash = hhash - cid * 1000000

		local drawable =  math.floor(hhash / 100)
		local texture = hhash - drawable * 100

		print('11111', cid, drawable, texture)
		
		local subskin = clothToSkin(cid, drawable, texture)
		
		if subskin then
			for k2,v2 in pairs(subskin) do
				skin[k2] = v2
			end
		end
	end

	print(json.encode(skin))
    end


    TriggerEvent('skin:loadClothesClean', skin, function()

	TriggerEvent('clothesLimiter:limit', function()
		local ped = PlayerPedId()
		local arms = GetPedDrawableVariation(ped, 3)

		local model = GetEntityModel(ped)

		local sex = 0

		if model == `mp_m_freemode_01` then
			sex = 1
		end

		if model == `mp_f_freemode_01` then
			sex = 2
		end


	    if arms and arms < 16 and arms ~= 3 and arms ~= 7 and arms ~= 9 then
	        local gloves_offsets = {
	            { -- муж
	                [0] = { 19, 30, 41, 52, 63, 74, 85 },
	                [1] = { 20, 31, 42, 53	, 64, 75, 86 },
	                [2] = { 21, 32, 43, 54, 65, 76, 87 },
	                [4] = { 22, 33, 44, 55, 66, 77, 88 },
	                [5] = { 23, 34, 45, 56, 67, 78, 89 },
	                [6] = { 24, 35, 46, 57, 68, 79, 90 },
	                [8] = { 25, 36, 47, 58, 69, 80, 91 },
	                [11] = { 26, 37, 48, 59, 70, 81, 92 },
	                [12] = { 27, 38, 49, 60, 71, 82, 93 },
	                [14] = { 28, 39, 50, 61, 72, 83, 94 },
	                [15] = { 29, 40, 51, 62, 73, 84, 95 },
	            },
	            { -- жен
	                [0] = { 20, 33, 46, 59, 72, 85, 98 },
	                [1] = { 21, 34, 47, 60, 73, 86, 99 },
	                [2] = { 22, 35, 48, 61, 74, 87, 100 },
	                [3] = { 23, 36, 49, 62, 75, 88, 101 },
	                [4] = { 24, 37, 50, 63, 76, 89, 102 },
	                [5] = { 25, 38, 51, 64, 77, 90, 103 },
	                [6] = { 26, 39, 52, 65, 78, 91, 104 },
	                [7] = { 27, 40, 53, 66, 79, 92, 105 },
	                [9] = { 28, 41, 54, 67, 80, 93, 106 },
	                [11] = { 29, 42, 55, 68, 81, 94, 107 },
	                [12] = { 30, 43, 56, 69, 82, 95, 108 },
	                [14] = { 31, 44, 57, 70, 83, 96, 109 },
	                [15] = { 32, 45, 58, 71, 84, 97, 110 },
	            }
	        }

	        if gloves1 > 0 and sex > 0 then
		    local newSkin = {}
	            newSkin['arms'] = gloves_offsets[sex][arms][gloves1]
	            newSkin['arms_2'] = gloves2
		    TriggerEvent('skin:loadClothes', newSkin, nil)
	        end
	    end
	end)
    end)
end)