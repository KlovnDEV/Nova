RegisterNetEvent('Cane:emote')
AddEventHandler('Cane:emote', function(name)
    local cane_anim = "move_lester_caneup"

        RequestAnimSet(cane_anim)
    if not HasAnimSetLoaded(cane_anim) then
        Citizen.Wait(100)
    end

    ESX.SetPlayerData(cane_anim)
    SetPedMovementClipset(PlayerPedId(), cane_anim, true)
end)
