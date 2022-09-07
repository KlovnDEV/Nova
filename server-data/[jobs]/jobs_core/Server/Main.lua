---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
ESX = nil

TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterNetEvent('jobs_core:proceed')
AddEventHandler('jobs_core:proceed', function(actionName) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local obj = C.Items[actionName]

    local item = ESX.Custom.Inventory.Item.Create(obj.itemName, obj.itemQty)

    ESX.Custom.Inventory.AddItem({category = 'player', identifier = xPlayer.identifier}, item, obj.itemQty)
end)

ESX.RegisterServerCallback('jobs_core:checkWeight', function(source, cb, name) 
    local xPlayer = ESX.GetPlayerFromId(source)
    local o = C.Items[name]

    local inv = ESX.Custom.Inventory.Get('player', xPlayer.identifier)
    local item = ESX.Custom.Inventory.Item.Create(o.itemName, o.itemQty)
    local weightToAdd = item.weight * o.itemQty
    local maxWeight = inv.maxWeight

    cb(maxWeight >= inv.weight + weightToAdd)
end)
