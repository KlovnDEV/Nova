ESX = nil
inventories = {}

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	TriggerEvent('esx_inventory:registerActions')
	ESX.PlayerData = ESX.GetPlayerData()
end)

RegisterCommand('+inventory', function()
end, false)

RegisterCommand('-inventory', function()
	if not IsControlEnabled(0,36) then
		return
	end

	TriggerEvent('inventory:showPlayerInventory')
end, false)

RegisterKeyMapping('+inventory', 'Открыть инвентарь', 'keyboard', 'i')

Citizen.CreateThread(function()
	local DisintegrationZone = vector3(-516.93, -1714.29, 18.32)
	while true do
		local coords = GetEntityCoords(PlayerPedId())
		if #(coords - DisintegrationZone) < 100.0 then
			DrawMarker(1, DisintegrationZone, 0.0, 0.0, 0.0, 0, 0.0, 0.0, 5.0,5.0,1.0, 180, 60, 30, 120, false, true, 2, false, false, false, false)
		end

		Citizen.Wait(0)
	end
end)

function showInputDialog(name, title, cb)

        local dialog_flag = false
	local text = nil
	ESX.UI.Menu.Open('dialog', GetCurrentResourceName(), name, {
		title = title
	}, function(data3, menu3)
		text = data3.value
		dialog_flag = true
		menu3.close()

	end, function(data3, menu3)
		text = nil
		dialog_flag = true
		menu3.close()
	end)

	while not dialog_flag do
		Citizen.Wait(100)
	end

	return text
end

--[[
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)
		local playerPed = PlayerPedId()
		local coords = vector3(GetEntityCoords(playerPed))
		local forward = vector3(GetEntityForwardVector(playerPed))

		if LocalPlayer.state.coords == nil or #(vector3(LocalPlayer.state.coords[1], LocalPlayer.state.coords[2], LocalPlayer.state.coords[3]) - coords) > 0.1 then
			LocalPlayer.state:set('coords', {coords.x, coords.y, coords.z}, true)
		end

		if LocalPlayer.state.forward == nil or #(vector3(LocalPlayer.state.forward[1], LocalPlayer.state.forward[2], LocalPlayer.state.forward[3]) - forward) > 0.1 then
			LocalPlayer.state:set('forward', {forward.x, forward.y, forward.z}, true)
		end
	end
end)
]]--

RegisterNetEvent('inventory:updateInventory')
AddEventHandler('inventory:updateInventory', function(inv)
	TriggerEvent('esx_inventory:_onInventoryUpdate', inv)
end)

RegisterNetEvent('inventory:onItemAdd')
AddEventHandler('inventory:onItemAdd', function(inventory, item, amount, silent)
	if not silent and inventory.identifier == ESX.PlayerData.identifier then
		ESX.UI.ShowInventoryItemNotification(true, item.label, amount)
	end
end)

RegisterNetEvent('inventory:onItemRemove')
AddEventHandler('inventory:onItemRemove', function(inventory, item, amount, silent)
	if not silent and inventory.identifier == ESX.PlayerData.identifier then
		ESX.UI.ShowInventoryItemNotification(false, item.label, amount)
	end
end)

RegisterNetEvent('esx_inventory:showInventoryMenu')
AddEventHandler('esx_inventory:showInventoryMenu', function(inventory)
	showInventoryMenu(inventory)
end)

RegisterNetEvent('inventory:showPlayerInventory')
AddEventHandler('inventory:showPlayerInventory', function(inventory)
	TriggerServerEvent("inventory:openInventories", {
		{ category = "player-inventory" },
	})
end)

AddEventHandler("playerSpawned", function()
	TriggerServerEvent('esx_inventory:playerSpawned')
end)

RegisterNetEvent('esx_inventory:_onInventoryUpdate')
AddEventHandler('esx_inventory:_onInventoryUpdate', function(inventory)
	inventories[inventory.category] = inventory
	TriggerEvent('inventory:onInventoryUpdate', inventory)
end)

-- client cached inventory data, nil if no cache
AddEventHandler('esx_inventory:getInventory', function(name, cb)
	cb(inventories[name])
end)

AddEventHandler('esx_inventory:getInventoryItem', function(invname, name, extra, cb)
	local inventory = inventories[invname]
	if inventory == nil then
		cb({})
		return
	end

	local items = {}

	for k,v in pairs(inventory.items) do
		if v.name == name and (extra == nil or subtable(v.extra, extra)) then
                        table.insert(items, v)
		end
	end

	cb(items)
end)
