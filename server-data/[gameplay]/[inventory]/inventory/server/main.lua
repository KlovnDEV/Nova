ESX = nil
TriggerEvent(
    "esx:getSharedObject",
    function(obj)
        ESX = obj
    end
)

AddEventHandler(
    "esx:playerLoaded",
    function(playerId, xPlayer)
        ESX.Custom.Inventory.Create(
            "player-inventory",
            xPlayer.identifier,
            false,
            {
                title = "Инвентарь",
                maxWeight = 100,
                width = 5,
                height = 12,
                singleItem = true,
		actionGroup = 'player',
                areas = {
    hand_l = {
      id = 0,
      x = 0,
      y = 0,
    },
    hand_r = { id = 1, x = 1, y = 0 },
    head = {
      id = 2,
      x = 0,
      y = 1,
      tags = {'helmet'},
    },
    mask = {
      id = 3,
      x = 1,
      y = 1,
      tags = {'mask'},
    },
    glasses = {
      id = 4,
      x = 0,
      y = 2,
      tags = {'glasses'},
    },
    ears = {
      id = 5,
      x = 1,
      y = 2,
      tags = {'ears'},
    },
    neck = {
      id = 6,
      x = 0,
      y = 3,
      tags = {'neck', 'bodycam'},
    },
    back = {
      id = 7,
      x = 1,
      y = 3,
      tags = {'bag'},
    },
    torso = {
      id = 8,
      x = 0,
      y = 4,
      tags = {'dress', 'tshirt', 'jacket'},
    },
    armor = {
      id = 9,
      x = 1,
      y = 4,
      tags = {'armor'},
    },
    belt = {
      id = 10,
      x = 0,
      y = 5,
      tags = {'belt'},
    },
    gloves = {
      id = 11,
      x = 1,
      y = 5,
      tags = {'gloves'},
    },
    accs = {
      id = 12,
      x = 0,
      y = 6,
      tags = {'accs'},
    },
    pants = {
      id = 13,
      x = 1,
      y = 6,
      tags = {'pants'},
    },
    shoes = {
      id = 14,
      x = 0,
      y = 7,
      tags = {'shoes'},
    },
    phone= {
      id = 15,
      x = 1,
      y = 7,
      tags = {'phone'},
    },
                }
            }
        )
    end
)

RegisterServerEvent("esx_inventory:playerSpawned")
AddEventHandler(
    "esx_inventory:playerSpawned",
    function()
        sendAllPickups(source)
    end
)

RegisterServerEvent("esx:updateLoadout")
AddEventHandler(
    "esx:updateLoadout",
    function(loadout)
        local xPlayer = ESX.GetPlayerFromId(source)
        --	setTimeout(function()
        --	        getInventory("player", xPlayer.identifier).onChange()
        --	end, 100)
    end
)

function getInventories(query, playerIdentifier)
        local res = {}

        for k, v in pairs(query) do
            local identifier = v.identifier or playerIdentifier
            local inv = ESX.Custom.Inventory.Get(v.category, identifier)
            if inv then
                res[inv.id] = inv
            else
                ESX.Error(
                    "Getting unknown inventory! Inv id = " .. tostring(v.category) .. "/" .. tostring(identifier),
                    debug.traceback()
                )
            end
        end

	return res
end

function getNestedInventories(inv)
        local res = {}
	assert(inv)

                if inv.category == "player-inventory" then
                    for k, item in pairs(inv.items) do
                        if item.extra and type(item.extra) == "table" and item.extra.inventory then
                            local item_inv = ESX.Custom.Inventory.Get("item-" .. item.name, item.extra.inventory)

                            if item_inv then
                                res[item_inv.id] = item_inv
                            end
                        end
                    end
                end

	return res
end

function GetInventoriesWithNested(query, identifier, setOpen)
	local inventories = getInventories(query, identifier)
	local res = {}

        for _, inv in pairs(inventories) do
                res[inv.id] = inv
		if setOpen then
			res[inv.id].open = true
		end

		local nested = getNestedInventories(inv)
		for _,v in pairs(nested) do
			res[v.id] = v
		end
        end

	return res
end

function getCashInInventory(category, identifier)
        local inv = ESX.Custom.Inventory.Get("player-inventory", identifier)
	return inv.cash
end

ESX.RegisterServerCallback("inventory:getInventories", function(source, cb, query)
        local xPlayer = ESX.GetPlayerFromId(source)

        if not xPlayer then
            print("esx_inventory:getInventory Unknown player!")
            return
        end

 	cb(GetInventoriesWithNested(query, xPlayer.identifier))
end)

RegisterServerEvent("inventory:openInventories")
AddEventHandler("inventory:openInventories", function(query, _source)
	if source == '' then
		source = _source
	end

        local xPlayer = ESX.GetPlayerFromId(source)

        if not xPlayer then
            print("inventory:openInventories Unknown player!")
            return
        end

	local invs = GetInventoriesWithNested(query, xPlayer.identifier, true)
	TriggerClientEvent("nova-ui:showInventoryMenu", xPlayer.source, { inventories = invs })
end)


