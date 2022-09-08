local previewEntity = 0
local previewRotation = 0

DecorRegister("PICKUP_ID", 3)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if DoesEntityExist(previewEntity) then
			if IsDisabledControlJustPressed(0, 241) then
				previewRotation = previewRotation + 20
				SetEntityRotation(previewEntity, vector3(0, 0, previewRotation), 2, true)

			elseif IsDisabledControlJustPressed(0, 242) then
				previewRotation = previewRotation - 20
				SetEntityRotation(previewEntity, vector3(0, 0, previewRotation), 2, true)
			end

			DrawLightWithRange(GetEntityCoords(previewEntity), 255, 255, 255, 1.0, 1.0)
		end
	end
end)

RegisterNetEvent('nova-ui:on_api')
AddEventHandler('nova-ui:on_api', function(cmd, args)
	print('on_api', cmd, args)
end)

RegisterNetEvent('nova-ui:showInventoryMenu')
AddEventHandler('nova-ui:showInventoryMenu', function(data)
	SendNUIMessage({
            query='inventory/show',
            inventories = data.inventories,
	})
	OpenScreen('inventory')
end)

RegisterNetEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inventory)
	SendNUIMessage({
		query='inventory/update',
		inventory = inventory,
	})
end)

function inventory_item_move(data, cb)
	assert(data.from)
	assert(data.to)
	assert(data.uid ~= nil)
	assert(data.x ~= nil)
	assert(data.y ~= nil)
	assert(data.shift ~= nil)
	assert(data.ctrl ~= nil)

	ESX.TriggerServerCallback('inventory:setItemPos', cb, data.from, data.to, data.uid, data.x, data.y, data.shift, data.ctrl)

	removePreview()
end

function removePreview()
	if DoesEntityExist(previewEntity) then
		DeleteEntity(previewEntity)
		previewEntity = 0
	end
end

function inventory_action_do(data, cb)
	assert(data)
	local extra = {
		current_container = ESX.GetPlayerData().inventory_current_container,
		amount = data.item.amount,
	}
	TriggerServerEvent("inventory:runAction", data.inventory.category, data.inventory.identifier, data.item.uid, data.action, extra)

	cb('ok')
end

function inventory_item_hover(data, cb)
	local item = data.item
	if item then
			local prop = GetHashKey(item.prop or "prop_money_bag_01")
			local cameraCoord, hit, coords, normal, entity = NUICursorRaycast(50.0)
			local dist = #(GetEntityCoords(PlayerPedId())-coords)

			if DoesEntityExist(previewEntity) and (GetEntityModel(previewEntity) ~= prop or dist > Config.DropDistance) then
				DeleteEntity(previewEntity)
				previewEntity = 0
			end

			if not DoesEntityExist(previewEntity) and dist < Config.DropDistance then
				previewEntity = CreateObjectNoOffset(prop, coords, false, false, false)
				SetEntityAlpha(previewEntity, 200)
				SetEntityCollision(previewEntity, false, false)
                        else
				SetEntityCoordsNoOffset(previewEntity, coords.x, coords.y, coords.z, false, false, false)
                        end


		cb(true)
	else
		cb(false)
	end
end

function inventory_item_drop(data, cb)
	removePreview()

	assert(data.inventory)
	assert(data.uid ~= nil)
	assert(data.x ~= nil)
	assert(data.y ~= nil)

	local cursor_x, cursor_y = GetNuiCursorPosition()

	local cameraCoord, hit, coords, normal, entity = NUICursorRaycast(50.0)

	if #(GetEntityCoords(PlayerPedId())-coords) > Config.DropDistance then
		return
	end

	if IsEntityAVehicle(entity) then
		return
	end

	if IsEntityAPed(entity) and IsPedAPlayer(entity) and #(GetEntityCoords(PlayerPedId())-GetEntityCoords(entity)) < Config.DropDistance then
		local target = NetworkGetPlayerIndexFromPed(entity)
		local targetServerId = GetPlayerServerId(target)
		TriggerServerEvent("inventory:transferItem", data.inventory, data.uid, targetServerId)
		return
	end

	if normal.z < 0.8 then
		return
	end

	local extra = {}
	if hit then
		extra.coords = coords
		extra.entity = entity
		extra.rotation = previewRotation
	end

	local hit2 = RayCastCapsule(coords+vector3(0,0,0.1), coords+vector3(0,0,0.5), 0.5, 10)

	if hit2 > 0 then
		return
	end

	TriggerServerEvent("inventory:runAction", data.inventory.category, data.inventory.identifier, data.uid, "drop", extra)

	cb('ok')
end

function inventory_close(data, cb)
	SendNUIMessage({
            query='close',
	})

	if DoesEntityExist(previewEntity) then
		DeleteEntity(previewEntity)
		previewEntity = 0
	end
end

RegisterNUICallback('query_api', function(data, cb)
	if data.cmd == "inventory_item_move" then
		inventory_item_move(data.args, cb)
	elseif data.cmd == "inventory_item_drop" then
		inventory_item_drop(data.args, cb)
	elseif data.cmd == "inventory_item_hover" then
		inventory_item_hover(data.args, cb)
	elseif data.cmd == "inventory_action_do" then
		inventory_action_do(data.args, cb)
	elseif data.cmd == "close" then
		inventory_close(data.args, cb)
	end

end)
