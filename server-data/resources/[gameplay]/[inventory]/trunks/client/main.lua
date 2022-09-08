ESX = nil
local GUI = {}
local PlayerData = {}
local arrayWeight = Config.localWeight

TrunkSprite = Sprite3DClass:new({
	pos = vector3(0,0,0),
	scale = { x = 0.1, y = 0.1 },
	textureDict = 'spritedict',
	textureName = 'cartrunk',
	alpha = 255,
	color = { r = 255, g = 255, b = 255 },
	drawDistance = 10.0,
	distanceFade = false,
})

Citizen.CreateThread(function()
  while ESX == nil do
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
    Citizen.Wait(0)
  end
end)

function GetVehicleUid(veh)
	return DecorGetInt(veh, "Owned_Vehicle_Id")
end


function VehicleInFront()
    local pos = GetEntityCoords(GetPlayerPed(-1))
    local entityWorld = GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0.0, 4.0, 0.0)
    local rayHandle = StartShapeTestCapsule(pos.x, pos.y, pos.z, entityWorld.x, entityWorld.y, entityWorld.z, 0.3, 10, GetPlayerPed(-1), 0)

--    local a, b, c, d, result = GetRaycastResult(rayHandle)
    local numRayHandle, hit, endCoords, surfaceNormal, entityHit = GetShapeTestResult(rayHandle)
    if IsEntityAVehicle(entityHit) then
        return entityHit, endCoords
    end

    return 0, 10000
end

function switchVehicleDoor(veh, door)
	if DoesEntityExist(GetPedInVehicleSeat(veh, -1)) then
		return
	end

	if GetVehicleDoorAngleRatio(veh, door) > 0.1 then
		SetVehicleDoorShut(veh, door, false, false)
	else
		local locked = GetVehicleDoorLockStatus(veh)
		if locked == 1 then
			SetVehicleDoorOpen(veh, door, false, false)
		end
	end
end

function getVehicleBootInventory(veh, cb)
	local model = GetDisplayNameFromVehicleModel(GetEntityModel(veh))
	local locked = GetVehicleDoorLockStatus(veh)
	local class = GetVehicleClass(veh)

	local pedDriver = GetPedInVehicleSeat(veh, -1)
	if DoesEntityExist(pedDriver) and not IsPedAPlayer(pedDriver) then
		cb(nil)
		return
	end

	local uid = GetVehicleUid(veh)
	local plate = ESX.Math.Trim(GetVehicleNumberPlateText(veh))

	if locked == 1 or class == 15 or class == 16 or class == 14 then
		ESX.TriggerServerCallback('trunks:registerTrunk', cb, uid, plate)
	end
end

RegisterNetEvent('trunks:getVehicleBootInventory')
AddEventHandler('trunks:getVehicleBootInventory', function(veh, cb)
	getVehicleBootInventory(veh, cb)
end)

function openBoot(veh)
	ESX.UI.Menu.CloseAll()

	getVehicleBootInventory(veh, function(inventory_container)

		if inventory_container == nil then
			ESX.ShowNotification('Багажник закрыт ~r~')
			return
		end

		TriggerServerEvent("inventory:openInventories", {
			{ category = "player-inventory" },
			{ category = inventory_container.category, identifier = inventory_container.identifier }
		})
	end)
end

-- Key controls
Citizen.CreateThread(function()
while true do
	Citizen.Wait(0)

	if true then
		local closecar, vehPos = VehicleInFront()
		local playerPos = GetEntityCoords(GetPlayerPed(-1),true)
		local dist = 1000.0
		if vehPos ~= nil then
			dist = #(playerPos-vehPos)
		end

		local class = GetVehicleClass(closecar)

		if DoesEntityExist(closecar) and class ~= 15 and class ~= 16 and class ~= 14 and class ~= 13 then

			local closestBone = nil
			local minDist = 9999.9
			local hasBoot = true

			local boneDists = {}
			local bonePositions = {}

			for _,BoneName in pairs({ 'boot' }) do
--			for _,BoneName in pairs({ 'bonnet', 'boot', 'handle_pside_f', 'handle_pside_r', 'handle_dside_f', 'handle_dside_r' }) do
				if closecar > 0 then
					local BonePos = GetWorldPositionOfEntityBone(closecar, GetEntityBoneIndexByName(closecar, BoneName))
					local dist = #(playerPos-BonePos)

					if #BonePos > 0 then
						boneDists[BoneName] = dist
						bonePositions[BoneName] = BonePos
					end
				end
			end

			if IsVehicleDoorDamaged(closecar,5) or not boneDists['boot'] then
				hasBoot = false
			end

			local isBootOpen = closecar > 0 and GetVehicleDoorAngleRatio(closecar, 5) > 0.1
			local canAccessBoot = false

			if closecar > 0 and boneDists['boot'] and hasBoot and boneDists['boot'] < 2.0 and isBootOpen then
				TrunkSprite:set('pos', bonePositions['boot'])
				TrunkSprite:set('alpha', 255)
				canAccessBoot = true
			elseif closecar > 0 and hasBoot == false and #(playerPos-vehPos) < 5.0 and GetPedInVehicleSeat(closecar, -1) ~= GetPlayerPed(-1) and GetVehicleDoorAngleRatio(closecar, 0) > 0.1 then
				TrunkSprite:set('pos', GetEntityCoords(closecar) + vector3(0,0,1.0))
				TrunkSprite:set('alpha', 255)
				canAccessBoot = true
			else
				TrunkSprite:set('alpha', 0)
			end

			TrunkSprite:draw(playerPos)

			if IsControlJustPressed(0, 182) then
				if closecar > 0 then
					local inDriverSeat = GetPedInVehicleSeat(closecar, -1) == GetPlayerPed(-1)

					if hasBoot and not isBootOpen then
						ESX.ShowNotification('Багажник закрыт')
					elseif not canAccessBoot then
						-- do nothing
					elseif not inDriverSeat then

						if boneDists['boot'] and hasBoot and boneDists['boot'] < 2.0 then
							openBoot(closecar)
						elseif dist < 2.5 then
							openBoot(closecar)
						end

					elseif hasBoot == false and #(playerPos-vehPos) < 5.0 and not inDriverSeat then
						openBoot(closecar)
					end
				end
			end
		end

	end
  end
end)
