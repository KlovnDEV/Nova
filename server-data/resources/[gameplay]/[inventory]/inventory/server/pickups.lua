local global_pickup_id = 0
local pickups = {}

AddEventHandler('inventory:createPickup', function(source, item, amount, label, cb, coords, rotation)
	if source ~= nil then
		local player = Player(source)

		if player == nil or player.state.coords == nil or player.state.forward == nil then
			print("Player coords unknown!")
			return false
	       	end

		local forwardCoords = vector3(player.state.coords[1], player.state.coords[2], player.state.coords[3]) + vector3(player.state.forward[1], player.state.forward[2], player.state.forward[3]) * 0.2

		if not coords or #(coords-forwardCoords) >= 7.0 then
			coords = forwardCoords
		end
	end

	if not coords then
		print("Unknown pickup coords!")
		return false		
	end

	local res = createPickup(source, item, amount, label, coords, rotation)
	if cb then
		cb(res)
	end
end)

function createPickup(source, item, amount, label, coords, desiredRotation)
	global_pickup_id = global_pickup_id + 1
	local pickup = {}

	local pickitem = ESX.Custom.Inventory.Item.Duplicate(item)
	pickitem.x = nil
	pickitem.y = nil
	pickitem.amount = amount

	pickup.id = global_pickup_id
	pickup.prop = item.prop or 'prop_money_bag_01'
	pickup.item = pickitem
	pickup.label = label
	pickup.coords = coords
	pickup.rotation = vector3(0, 0, desiredRotation or 0)
	pickup.source = source

	pickups[pickup.id] = pickup

	TriggerClientEvent('esx_inventory:createPickup', -1, global_pickup_id, pickup)
	return true
end

function sendAllPickups(source)
	for _, pickup in pairs(pickups) do
		TriggerClientEvent('esx_inventory:createPickup', source, pickup.id, pickup)
	end
end

function isAreaEmpty(inv, areaName)
    local area = inv.areas[areaName]

    for k,item in pairs(inv.items) do
        if item.x == area.x and item.y == area.y then
                return false
        end
    end

    return true
end

function pickupItem(inv, item)
	assert(inv)
	assert(item)

	if inv then
		if ESX.Custom.Inventory.AddItem(inv, item, item.amount) then
			return true
		end
	end

	return false
end

function playerPickupItem(xPlayer, item)
	assert(xPlayer)
	assert(item)

	local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)

	if isAreaEmpty(inv, 'hand_r') then
            item.x = inv.areas['hand_r'].x
            item.y = inv.areas['hand_r'].y
        elseif isAreaEmpty(inv, 'hand_l') then
            item.x = inv.areas['hand_l'].x
            item.y = inv.areas['hand_l'].y
        else
            -- item.x = nil
            -- item.y = nil
            xPlayer.showNotification('~r~Нет места в руках!')
            return false
        end

	return pickupItem(inv, item)
end

RegisterServerEvent('inventory:transferItem')
AddEventHandler('inventory:transferItem', function(inventory, uid, target)
	local xPlayer = ESX.GetPlayerFromId(source)
	local xTarget = ESX.GetPlayerFromId(target)
	assert(xPlayer)
	assert(xTarget)

	local inv1 = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)

        local item = ESX.Custom.Inventory.SearchFirst(inv1, { ["uid"] = uid })
	assert(item)

	if playerPickupItem(xTarget, item) then
		if not ESX.Custom.Inventory.RemoveItem(inv1, { ["uid"] = uid }, item.amount, true) then
			print('Unable to remove transferable item! '..tostring(uid))
		end
	end
end)

RegisterServerEvent('esx_inventory:onPickup')
AddEventHandler('esx_inventory:onPickup', function(id)
		local player = Player(source)

		if not player or not player.state.coords or not player.state.forward then
			print("Player coords unknown!")
			return
		end

		local pickup  = pickups[id]
		local xPlayer = ESX.GetPlayerFromId(source)

		if not pickup then
			print("Non-existent pickup id: " .. tostring(id))
			return
		end

		local dist = #(vector3(player.state.coords[1], player.state.coords[2], player.state.coords[3]) - pickup.coords)

		if dist > 10 then
			print(string.format("Player %i is too far to get pickup %i", source, id))
			return
		end

		local item = pickup.item
		local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
		if playerPickupItem(xPlayer, item) then
			TriggerClientEvent('esx_inventory:removePickup', -1, id)
			pickups[id] = nil
		end
end)

RegisterServerEvent('esx_inventory:putPickupIntoCarTrunk')
AddEventHandler('esx_inventory:putPickupIntoCarTrunk', function(id, inv)
		local pickup  = pickups[id]
		local xPlayer = ESX.GetPlayerFromId(source)
		local item = pickup.item

		local inv = ESX.Custom.Inventory.Get(inv.category, inv.identifier)

		if pickupItem(inv, item) then
			TriggerClientEvent('esx_inventory:removePickup', -1, id)
			pickups[id] = nil
		else
			xPlayer.showNotification('Невозможно погрузить!')
		end
end)

ESX.RegisterCommand('spawnpickup', 'admin', function(xPlayer, args, showError, showInfo)

    local item = ESX.Custom.Inventory.Item.Create(args.item, amount, {})
    if not item then
        showError('Incorrect item name.')
        return
    end

    local amount = math.min(item.maxstack, args.count)

    if amount < 1 then
        showError('Incorrect item amount.')
        return
    end

    if not item then
        showError('Incorrect item name: '..tostring(args.item))
        return
    end

    local player = Player(xPlayer.source)    
    if player.state.coords then
	local coords = player.state.coords
        createPickup(xPlayer.source, item, amount, item.label, vector3(coords[1], coords[2], coords[3]), 0)
    else
        showError('Unknown player coords!')
    end

end, true, {help = _U('command_giveitem'), validate = true, arguments = {
	{name = 'item', help = _U('command_giveitem_item'), type = 'string'},
	{name = 'count', help = _U('command_giveitem_count'), type = 'number'}
}})
