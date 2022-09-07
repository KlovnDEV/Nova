ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

RegisterServerEvent('react_cad:menu_show')
AddEventHandler('react_cad:menu_show', function(homepage, permissions)
    local xPlayer = ESX.GetPlayerFromId(source)

    print('menu_show', json.encode(homepage), json.encode(permissions))
    TriggerClientEvent('react_cad:menu_show', xPlayer.source, { ["homepage"] = homepage, ["permissions"] = permissions })
end)
