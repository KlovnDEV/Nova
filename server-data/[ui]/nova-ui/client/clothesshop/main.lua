local currentShopId = nil

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

function updateClothPreview(data, category, field1, field2)
	if data[category] == nil then
		return
	end

	local cat = data[category]
	local uid = tonumber(cat.variation or cat.uid)

	local lockHash, hash, locate, drawable, texture, field5, cid, field7, field8, gxt = GetShopPedComponent2(uid)

	local props = {}

	if hash ~= 0 then
		props[field1] = drawable
		props[field2] = texture
	end

	for k,v in pairs(props) do
		TriggerEvent('skin:change', k, v)
	end	
end

RegisterNUICallback('updateClothPreview', function(data, cb)
	updateClothPreview(data, "torso", "torso_1", "torso_2")
	updateClothPreview(data, "pants", "pants_1", "pants_2")
	updateClothPreview(data, "tshirt", "tshirt_1", "tshirt_2")
	updateClothPreview(data, "shoes", "shoes_1", "shoes_2")

	cb('ok')
end)

function openShop(shopId)
	local playerPed = PlayerPedId()

	ESX.TriggerServerCallback('clothesshops:getShopItems', function(clothes)

		for cat, arr in pairs(clothes) do
			for k,v in pairs(arr) do
				local lockHash, hash, locate, drawable, texture, field5, cid, field7, field8, gxt = GetShopPedComponent2(tonumber(v.uid))

				local variations = {}

				if hash ~= 0 then
					local texNum = GetNumberOfPedTextureVariations(playerPed, cid, drawable)

					for tex = 0, texNum-1 do
						local variationHash = GetHashNameForComponent(playerPed, cid, drawable, tex)
						if variationHash ~= 0 then
							table.insert(variations,  variationHash)
						end
					end
				end

				v.variations = variations
			end
			
		end

		SendNUIMessage({
			query = 'clothesshop/show',
			shopId = shopId,
			clothes = clothes,
		})
		OpenScreen('clothesshop')
		currentShopId = shopId
	end, shopId, 0)
end

local function closeShop()
	TriggerServerEvent('clothes:update')
	SendNUIMessage({
		showClothesShop = false,
	})
	CloseScreen('clothesshop')
	currentShopId = nil
end

AddEventHandler('nova-ui:openClothesShop', function(shopId)
	openShop(shopId)
end)

AddEventHandler('nova-ui:closeClothesShop', function()
	closeShop()
end)

RegisterNUICallback('buy', function(data, cb)
	TriggerServerEvent('clothesshops:buy', currentShopId, data.cart, data.account)
end)

AddEventHandler('nova-ui:change_screen', function(scr)
	if scr ~= nil or currentShopId == nil then
		return
	end

	closeShop()
end)
