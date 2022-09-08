pickups = {}

DecorRegister("PICKUP_ID", 3)

function doPickup(id)
	local playerPed = PlayerPedId()

	if not IsPedOnFoot(playerPed) then
		return false
	end

	local coords = GetEntityCoords(playerPed)

	local pickup = pickups[id]

	if #(coords - pickup.coords) > 2.0 then
		return false
	end

	TriggerServerEvent('esx_inventory:onPickup', id)
	PlaySoundFrontend(-1, 'PICK_UP', 'HUD_FRONTEND_DEFAULT_SOUNDSET', false)

	return true
end

-- pickups
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		local playerPed = PlayerPedId()
		local coords = GetEntityCoords(playerPed)

		for id,v in pairs(pickups) do
			local distance = GetDistanceBetweenCoords(coords, v.coords.x, v.coords.y, v.coords.z, true)

			if distance <= 4.0 then
				local text = (v.label or "Неизвестно") .. ' ['..v.item.amount..']'
				if v.label then
					text = v.label
				elseif v.name then
					text = v.name
				end
				text = text .. ' ['..v.item.amount..']'

				if distance <= 2.0 then
					text = '~g~[E] ~s~' .. text
				end

				ESX.Game.Utils.DrawText3D({
					x = v.coords.x,
					y = v.coords.y,
					z = v.coords.z + 0.25
				}, text)
			end

--			if distance <= 1.0 and not v.inRange and IsPedOnFoot(playerPed) then -- press E
			if IsControlJustReleased(0, 38) and distance <= 2.0 and IsPedOnFoot(playerPed) then -- press E
				doPickup(id)
				v.inRange = true
			end

			if v.inRange and distance > 1.2 then
				v.inRange = false
			end
		end
	end
end)

function vector3FromArr(arr)
	return vector3(arr.x,arr.y,arr.z)
end

RegisterNetEvent('esx_inventory:createPickup')
AddEventHandler('esx_inventory:createPickup', function(id, pickup)
	local ped     = PlayerPedId()
	local player_coords  = GetEntityCoords(ped)
--	local forward = GetEntityForwardVector(ped)
--	local x, y, z = table.unpack(coords)
--	local coords = pickup.coords + forward * -2.0

	local dist = #(player_coords - vector3FromArr(pickup.coords))
	local rotation = pickup.rotation or vector3(0,0,0)

	local propName = pickup.prop or 'prop_money_bag_01'

	if pickup.item.name == "weapon" then
		rotation = vector3(90,0,0)
	end

--[[
	if pickup.item.name == "money" or pickup.item.name == "black_money" then
		propName = "prop_cash_pile_02"
		if pickup.item.amount >= 10000 then
			propName = "prop_cash_case_02"
		elseif pickup.item.amount >= 1000 then
			propName = "prop_poly_bag_money"
		end
	end
]]--
	local propHash = GetHashKey(propName)
	ESX.Streaming.RequestModel(propHash)
	local obj = CreateObject(propHash, pickup.coords.x, pickup.coords.y, pickup.coords.z, 0, 0, 0)

	SetEntityCollision(obj, false, false)
	SetEntityAsMissionEntity(obj, true, false)
	PlaceObjectOnGroundProperly(obj)
	SetEntityRotation(obj, rotation, 2, true)
	DecorSetInt(obj, "PICKUP_ID", id)

	for k,v in pairs(Config.PickupsWithCollision) do
		if v == propName then
			SetEntityCollision(obj, true, true)
		end
	end

	for k,v in pairs(Config.StaticPickups) do
		if v == propName then
			FreezeEntityPosition(obj, true)
		end
	end

	pickups[id] = {
		item = pickup.item,
		label = pickup.label or pickup.name,
		coords = pickup.coords,
		rotation = pickup.rotation,
		obj = obj,
		inRange = true,
		source = pickup.source,
	}
end)

RegisterNetEvent('esx_inventory:removePickup')
AddEventHandler('esx_inventory:removePickup', function(id)
	if pickups[id] == nil then
		return
	end

	if pickups[id].obj ~= nil then
		ESX.Game.DeleteObject(pickups[id].obj)
	end

	pickups[id] = nil
end)
