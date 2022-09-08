-- awesome copyright bla bla --
ESX.Custom.Inventory = {}

ESX.Inventories = {}

function InventorySet(inventory)
	if not ESX.Inventories[inventory.category] then
		ESX.Inventories[inventory.category] = {}
	end

	ESX.Inventories[inventory.category][inventory.identifier] = inventory
end

ESX.Custom.Inventory.Get = function(category, identifier, cb)
	if cb == nil then
		ESX.Error("InventoryGet cb is nil!", debug.traceback())
		return
	end

	if ESX.Inventories[category] and ESX.Inventories[category][identifier] then
		cb(ESX.Inventories[category][identifier])
	end

	ESX.TriggerServerCallback('inventory:getInventory', function(inventory)
		if inventory then
			InventorySet(inventory)
			cb(inventory)
		else
			ESX.Error("InventoryGet inventory not found!", debug.traceback())
		end
	end, category, identifier)

end

RegisterNetEvent('inventory:onItemAdd')
AddEventHandler('inventory:onItemAdd', function(inventory, item, amount, silent)
	InventorySet(inventory)
end)

RegisterNetEvent('inventory:onItemRemove')
AddEventHandler('inventory:onItemRemove', function(inventory, item, amount, silent)
	InventorySet(inventory)
end)


RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
end)
