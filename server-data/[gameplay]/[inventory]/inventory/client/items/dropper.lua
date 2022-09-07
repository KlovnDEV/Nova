Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        local playerPed = PlayerPedId()
        local coords = GetEntityCoords(playerPed)
        local checkObj = GetClosestObjectOfType(coords, 1.0, GetHashKey('leb_prop_meddropper01'),false, 0, 0)
        if checkObj >0 then
            ESX.Health.Heal(1)
        end
    end
end)
