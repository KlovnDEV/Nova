---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
ESX = nil

Citizen.CreateThread(function()
    while ESX == nil do
        TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
        Citizen.Wait(0)
    end

    ESX.Blips.Create(Config.Blips)

    while true do
        Citizen.Wait(1)
        
        _collectAction()
    end
end)
