local GXTs = {}
local variations = {}

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

function gxtAcquireLoop()
	local ped = PlayerPedId()
	local model = GetEntityModel(ped)
 	if (model ~= GetHashKey("mp_m_freemode_01") and model ~= GetHashKey("mp_f_freemode_01")) then
        	return false
	end

	GXTs = gxtAcquire(ped)
	return true
end

function gxtAcquire(ped)
	local gxts = {}

	for cid = 1, 11 do
	for drawable = 0, GetNumberOfPedDrawableVariations(ped, cid) - 1 do
	for texture = 0, GetNumberOfPedTextureVariations(ped, cid, drawable) - 1 do

		local topHash = GetHashNameForComponent(ped, cid, drawable, texture)
		local lockHash, hash, locate, _drawable, _texture, f_5, componentType, f_7, f_8, gxt = GetShopPedComponent2(topHash)
--		local gxt = GetShopPedComponent2(topHash)

		if gxt ~= nil then
			gxts[gxt] = { cid = cid, drawable = drawable, texture = texture }

			if texture > 0 then
				if variations[cid] == nil then
					variations[cid] = {}
				end

				if variations[cid][drawable] == nil then
					variations[cid][drawable] = {}
				end

				table.insert(variations[cid][drawable], gxt)
			end
		end

	end
	end
	end

	return gxts
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)

	if gxtAcquireLoop() then
		local gxt = GXTs['CLO_GRM_F_1_0']
		local vars = variations[gxt.cid][gxt.drawable]

		print(json.encode(gxt))
		print(json.encode(vars))
		break
	end
    end
end)
