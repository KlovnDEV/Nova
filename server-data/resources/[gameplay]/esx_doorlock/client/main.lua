ESX = nil
closestDoor = -1
doorKeys = {}
myRoles = {}

function RegisterDoor(id, prop, coords)

	RemoveDoorFromSystem(id)
	AddDoorToSystem(id, prop, coords, 0,0,0)
end

function SetDoorLocked(id, val, openRatioThreshold)
	if openRatioThreshold == nil then
		openRatioThreshold = 0.15
	end

	if val and math.abs(DoorSystemGetOpenRatio(id)) < openRatioThreshold then
		if DoorSystemGetDoorState(id) ~= 1 then
			DoorSystemSetDoorState(id, 1, false, false)
		end
	else
		if DoorSystemGetDoorState(id) ~= 0 then
			DoorSystemSetDoorState(id, 0, false, false)
		end
	end

--[[
	if val then
		DoorSystemSetOpenRatio(id, -1.0, 0, 0)
	else
		DoorSystemSetOpenRatio(id, 1.0, 0, 0)
	end
]]--
end

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	myRoles = ESX.Roles.Get() or {}

	-- Update the door list
	ESX.TriggerServerCallback('esx_doorlock:getDoorInfo', function(doorInfo)
		for doorID,state in pairs(doorInfo) do
			Config.DoorList[doorID].locked = state
		end
	end)

	for id,door in pairs(Config.DoorList) do
		if door.objCoords then
			door.id = GetHashKey(id)
			RegisterDoor(door.id, GetHashKey(door.objName), door.objCoords)
		else
			if door.doors then
				for k,v in pairs(door.doors) do
					v.id = GetHashKey(id.."#"..k)
					RegisterDoor(v.id, GetHashKey(v.objName), v.objCoords)
				end
			end
		end

		door._sprite = Sprite3DClass:new({
			pos = door.textCoords,
			scale = { x = 0.1, y = 0.1 },
			textureDict = 'spritedict',
			textureName = 'lock_off',
			alpha = 255,
			color = { r = 255, g = 255, b = 255 },
			drawDistance = door.distance or 3.0,
			distanceFade = false,
		})


	end
end)

RegisterNetEvent('esx:setRoles')
AddEventHandler('esx:setRoles', function(roles)
	myRoles = roles
end)

RegisterNetEvent('inventory:onInventoryUpdate')
AddEventHandler('inventory:onInventoryUpdate', function(inventory)
    local xPlayer = ESX.GetPlayerData()
    if (inventory.category == "player-inventory" and inventory.identifier == xPlayer.identifier) then
        doorKeys = inventory.keys
    end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local playerCoords = GetEntityCoords(PlayerPedId())
		closestDoor = -1

		for k,doorID in pairs(Config.DoorList) do
			local isAuthorized = IsAuthorized(k)
			local distance = #(playerCoords - doorID.textCoords)
			local maxDistance = doorID.distance or 1.5

			if distance < 50 then
				if doorID.doors then
					for _,v in ipairs(doorID.doors) do
						SetDoorLocked(v.id, doorID.locked, doorID.openRatioThreshold)
					end
				else
					SetDoorLocked(doorID.id, doorID.locked, doorID.openRatioThreshold)
				end
			end

			if distance < maxDistance*4 and doorID._sprite then
				local openRatio = math.abs(DoorSystemGetOpenRatio(doorID.id))
				if doorID.locked then
					if isAuthorized and distance < maxDistance then
						doorID._sprite:set('textureName', 'lock_on_e')
					else
						doorID._sprite:set('textureName', 'lock_on')
					end
				else
					if isAuthorized and distance < maxDistance then
						doorID._sprite:set('textureName', 'lock_off_e')
					else
						doorID._sprite:set('textureName', 'lock_off')
					end
				end
				doorID._sprite:draw(playerCoords)
			end

			if distance < maxDistance then
				local displayText = ""--_U('unlocked')
				local size = 0.5

				if doorID.size then
					size = doorID.size
				end

				closestDoor = k

				if IsControlJustReleased(0, 38) then
					if isAuthorized then
						doorID.locked = not doorID.locked
						TriggerServerEvent('esx_doorlock:updateState', k, doorID.locked) -- Broadcast new state of the door to everyone
					end
				end
			end
		end
	end
end)

function IsAuthorized(k)
	local door = Config.DoorList[k]
	if door == nil then
		return false
	end

	if doorKeys[k] ~= nil then
		return true
	elseif door.group ~= nil and doorKeys[door.group] ~= nil then
		return true
	end

	if door.authorizedRoles then
		for _,role in pairs(door.authorizedRoles) do
			if myRoles and myRoles[role] then
				return true
			end
		end
	end

	return false
end

-- Set state for a door
RegisterNetEvent('esx_doorlock:setState')
AddEventHandler('esx_doorlock:setState', function(doorID, state)
	Config.DoorList[doorID].locked = state
end)


RegisterNetEvent('esx_doorlock:getClosestDoor')
AddEventHandler('esx_doorlock:getClosestDoor', function(cb)
	local doorInfo = nil
	if closestDoor ~= -1 then
		doorInfo = Config.DoorList[closestDoor]
	end
	cb(closestDoor, doorInfo)
end)

RegisterNetEvent('esx_doorlock:setClosestDoorState')
AddEventHandler('esx_doorlock:setClosestDoorState', function(state)
	if closestDoor ~= -1 then
		TriggerServerEvent('esx_doorlock:updateState', closestDoor, state)
	end
end)
