-- copyright 2020 --
ESX.Blips = {}
ESX.Peds = {}
ESX.Animation = {}

ESX.Blips.Create = function(config)
    Citizen.CreateThread(function()
        Citizen.Wait(0)
        
        for _, info in pairs(config) do
            info.blip = AddBlipForCoord(info.x, info.y, info.z)

            SetBlipSprite(info.blip, info.id)
            SetBlipDisplay(info.blip, 4)
            SetBlipScale(info.blip, 0.9)
            SetBlipColour(info.blip, info.colour)
            SetBlipAsShortRange(info.blip, true)
            BeginTextCommandSetBlipName("STRING")
            AddTextComponentString(info.title)
            EndTextCommandSetBlipName(info.blip)
        end
    end)
end

ESX.Peds.Create = function(config)
    for _, v in pairs(config) do
        RequestModel(v.model)

        while not HasModelLoaded(v.model) do
            Citizen.Wait(1)
        end

        local ped = CreatePed(0, v.model, v.x, v.y, v.z, v.h, true)

        FreezeEntityPosition(ped, true)
        SetEntityInvincible(ped, true)
        SetBlockingOfNonTemporaryEvents(ped, true)
        TaskStartScenarioInPlace(ped, v.animation, 0, true)
    end
end

ESX.Get3DDistance = function(x1, y1, z1, x2, y2, z2)
    local a = (x1 - x2) * (x1 - x2)
    local b = (y1 - y2) * (y1 - y2)
    local c = (z1 - z2) * (z1 - z2)
    
    return math.sqrt(a + b + c)
end

ESX.Draw3DText = function(coords, text, inputSize) 
    local onScreen, x, y = World3dToScreen2d(coords.x, coords.y, coords.z)
    local camCoords = GetGameplayCamCoords()
    local dist = GetDistanceBetweenCoords(camCoords, coords.x, coords.y, coords.z, true)
    local size = inputSize
    
    if size == nil then size = 1 end
    
    local tmpScale = (size / dist) * 2
    local fov = (1 / GetGameplayCamFov()) * 100
    local scale = tmpScale * fov
    
    if onScreen then
        SetTextScale(0.0 * scale, 0.55 * scale)
        SetTextFont(0)
        SetTextColour(255, 255, 255, 255)
        SetTextDropshadow(0, 0, 0, 0, 255)
        SetTextDropShadow()
        SetTextOutline()
        SetTextEntry('STRING')
        SetTextCentre(1)
        AddTextComponentString(text)
        DrawText(x, y)
    end  
end

ESX.Animation.Start = function(lib, anim, time) 
    Citizen.CreateThread(function() 
        local playerPedId = PlayerPedId()

        ESX.Streaming.RequestAnimDict(lib, function() 
            TaskPlayAnim(playerPedId, lib, anim, 8.0, -8.0, -1, 0, 0, false, false, false)
        end)

        Wait(time)
        ClearPedTasks(playerPedId)
    end)
end
