ESX = nil

local binEntity
local binPos
local binDist
local binMaxDist = 0
local isLooting = false

TrashSprite = Sprite3DClass:new({
	pos = vector3(0,0,0),
	scale = { x = 0.05, y = 0.05 },
	textureDict = 'spritedict',
	textureName = 'trash_e',
	alpha = 255,
	color = { r = 255, g = 255, b = 255 },
	drawDistance = 0.8,
	distanceFade = false,
})

Citizen.CreateThread(function()
  while ESX == nil do
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
    Citizen.Wait(0)
  end
end)

Citizen.CreateThread(function()
    local lastBinEntity = nil

    while true do
	Citizen.Wait(300)

        local pos = GetEntityCoords(PlayerPedId())

        binEntity = nil
	binPos = vector3(16384,16384,16384)
        binDist = 10000

	for k,v in pairs(Config.TrashCanModels) do
		local obj = GetClosestObjectOfType(pos.x,pos.y,pos.z, 5.0, GetHashKey(k))
		if DoesEntityExist(obj) and not IsEntityUpsidedown(obj) then
			binPos = GetEntityCoords(obj) + vector3(0,0,1)
			binEntity = obj
                        binDist = #(pos-binPos)
			binMaxDist = v
			break
		end
	end

	if not binEntity then
		TrashSprite:set('pos', vector3(0,0,-100))
		TrashSprite:set('alpha', 0)
	else
		TrashSprite:set('pos', binPos)
		TrashSprite:set('drawDistance', binMaxDist)
		TrashSprite:set('alpha', 255)
	end

	if lastBinEntity ~= binEntity then
		lastBinEntity = binEntity
		isLooting = false

		if binEntity == nil then
			current_container = ESX.GetPlayerData().inventory_current_container

			if current_container and DoesEntityExist(current_container.trashcan) then
				ESX.SetPlayerData('inventory_current_container', nil)
			end
		end

	end
-- It will be faster if we have 30+ bin models
--        binEntity, binEntityDst = ESX.Game.GetClosestObject(Config.BinsAvailable)
    end
end)

RegisterNetEvent('esx_inventory:onInventoryHide')
AddEventHandler('esx_inventory:onInventoryHide', function(cb)
	if isLooting then
		ClearPedTasks(PlayerPedId())
		isLooting = false
	end
end)

-- Key controls
Citizen.CreateThread(function()
while true do
	Citizen.Wait(0)
	local ped = PlayerPedId()
	local pos = GetEntityCoords(ped)
	TrashSprite:draw(pos)

	if IsControlJustPressed(0, 38) and binEntity and binDist < binMaxDist then
		local uid = string.format("%i/%i", binPos.x // 3, binPos.y // 3)
		ESX.TriggerServerCallback('trunks:registerTrash', function(inventory)
			ESX.SetPlayerData('inventory_current_container', { ["category"] = 'trashcan', ["identifier"] = uid, ["trashcan"] = binEntity })

			isLooting = true

			local _, sequence = OpenSequenceTask()
			TaskTurnPedToFaceEntity(0, binEntity, 1000)
			TaskStartScenarioInPlace(0, "PROP_HUMAN_BUM_BIN", 0, true)
			CloseSequenceTask(sequence)

			TaskPerformSequence(ped, sequence)
			ClearSequenceTask(sequence)

			TriggerServerEvent("inventory:openInventories", {
				{ category = "player-inventory" },
				{ category = inventory.category, identifier = inventory.identifier }
			})
		end, uid)
	end
  end
end)
