Citizen.CreateThread(
    function()
        -- Getting the object to interact with
        Citizen.Wait(1000)
        AfterHoursNightclubs = exports['bob74_ipl']:GetAfterHoursNightclubsObject()
        Citizen.Wait(1000)

        -------------------------------------------
        -- Interior part

        -- Interior setup
        AfterHoursNightclubs.Ipl.Interior.Load()

        -- Setting the name of the club to The Palace
        AfterHoursNightclubs.Interior.Name.Set(AfterHoursNightclubs.Interior.Name.palace, true)

        -- Glamorous style
        AfterHoursNightclubs.Interior.Style.Set(AfterHoursNightclubs.Interior.Style.glam, true)

        -- Glam podiums
        AfterHoursNightclubs.Interior.Podium.Set(AfterHoursNightclubs.Interior.Podium.glam, true)

        -- speakers
        AfterHoursNightclubs.Interior.Speakers.Set(AfterHoursNightclubs.Interior.Speakers.upgrade, true)

        -- security
        AfterHoursNightclubs.Interior.Security.Set(AfterHoursNightclubs.Interior.Security.on, true)

        -- Setting turntables
        AfterHoursNightclubs.Interior.Turntables.Set(AfterHoursNightclubs.Interior.Turntables.style02, true)

        -- Lights --

        AfterHoursNightclubs.Interior.Lights.Clear()

        --Laser--
        AfterHoursNightclubs.Interior.Lights.Lasers.Clear()
--        AfterHoursNightclubs.Interior.Lights.Lasers.Set(AfterHoursNightclubs.Interior.Lights.Lasers.cyan, true)
--        AfterHoursNightclubs.Interior.Lights.Lasers.Set(AfterHoursNightclubs.Interior.Lights.Lasers.yellow, true)
        AfterHoursNightclubs.Interior.Lights.Lasers.Set(AfterHoursNightclubs.Interior.Lights.Lasers.purple, true)
--        AfterHoursNightclubs.Interior.Lights.Lasers.Set(AfterHoursNightclubs.Interior.Lights.Lasers.green, true)
--        AfterHoursNightclubs.Interior.Lights.Lasers.Set(AfterHoursNightclubs.Interior.Lights.Lasers.white, true)
        --Bands--
        AfterHoursNightclubs.Interior.Lights.Bands.Clear()
--        AfterHoursNightclubs.Interior.Lights.Bands.Set(AfterHoursNightclubs.Interior.Lights.Bands.white, true)
        AfterHoursNightclubs.Interior.Lights.Bands.Set(AfterHoursNightclubs.Interior.Lights.Bands.green, true)
--        AfterHoursNightclubs.Interior.Lights.Bands.Set(AfterHoursNightclubs.Interior.Lights.Bands.yellow, true)
        --Neons--
        AfterHoursNightclubs.Interior.Lights.Neons.Clear()
--        AfterHoursNightclubs.Interior.Lights.Neons.Set(AfterHoursNightclubs.Interior.Lights.Neons.yellow, true)
        AfterHoursNightclubs.Interior.Lights.Neons.Set(AfterHoursNightclubs.Interior.Lights.Neons.purple, true)
--        AfterHoursNightclubs.Interior.Lights.Neons.Set(AfterHoursNightclubs.Interior.Lights.Neons.white, true)
        --Drops--
        AfterHoursNightclubs.Interior.Lights.Droplets.Clear()
        --AfterHoursNightclubs.Interior.Lights.Droplets.Set(AfterHoursNightclubs.Interior.Lights.Droplets.green, true)
        AfterHoursNightclubs.Interior.Lights.Droplets.Set(AfterHoursNightclubs.Interior.Lights.Droplets.purple, true)
--        AfterHoursNightclubs.Interior.Lights.Droplets.Set(AfterHoursNightclubs.Interior.Lights.Droplets.yellow, true)
--	AfterHoursNightclubs.Interior.Lights.Droplets.Set(AfterHoursNightclubs.Interior.Lights.Droplets.white, true)

        -- Details
        AfterHoursNightclubs.Interior.Details.Enable(true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.truck, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.dryIce, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.floorTradLights, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.clutter, false, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.worklamps, false, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.lightRigsOff, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.roofLightsOff, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.chest, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultAmmunations, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultMeth, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultFakeID, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultWeed, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultCoke, true, true)
        AfterHoursNightclubs.Interior.Details.Enable(AfterHoursNightclubs.Interior.Details.vaultCash, true, true)

        -- Enabling bottles behind the bar
        AfterHoursNightclubs.Interior.Bar.Enable(true)

        -- Enabling all booze bottles
        AfterHoursNightclubs.Interior.Booze.Enable(AfterHoursNightclubs.Interior.Booze, false)

        -- Adding trophies on the desk
        AfterHoursNightclubs.Interior.Trophy.Enable(AfterHoursNightclubs.Interior.Trophy.dancer, true, AfterHoursNightclubs.Interior.Trophy.Color.gold)

        -- dry ice
        -- AfterHoursNightclubs.Interior.DryIce.Enable(true)

        -- Refreshing interior to apply changes
        RefreshInterior(AfterHoursNightclubs.interiorId, true)

        -------------------------------------------
        -- Exterior part

        -- La Mesa - Exterior
        -- No barriers
        -- AfterHoursNightclubs.Mesa.Barrier.Enable(true)

        -- Only "For sale" poster
        -- AfterHoursNightclubs.Mesa.Posters.Enable(AfterHoursNightclubs.Posters.forSale, true)

        -- Mission Row - Exterior
        -- Barriers
        -- AfterHoursNightclubs.Mesa.Barrier.Enable(true)

        -- Posters for Dixon and Madonna only
        -- AfterHoursNightclubs.Mesa.Posters.Enable({AfterHoursNightclubs.Posters.dixon, AfterHoursNightclubs.Posters.madonna}, true)
    end
)

--Render--
function CreateNamedRenderTargetForModel(name, model)
    local handle = 0
    if not IsNamedRendertargetRegistered(name) then
        RegisterNamedRendertarget(name, 0)
    end
    if not IsNamedRendertargetLinked(model) then
        LinkNamedRendertarget(model)
    end
    if IsNamedRendertargetRegistered(name) then
        handle = GetNamedRendertargetRenderId(name)
    end

    return handle
end

local Playlists = {
    'PL_SOL_RIB_PALACE'
}

--Nightclub Screens--
Citizen.CreateThread(
    function()
        local model = GetHashKey('ba_prop_club_screens_01') -- 1194029334
        local pos = {x = -810.59, y = 170.46, z = 77.25}
        local entity = GetClosestObjectOfType(pos.x, pos.y, pos.z, 20.0, model, 0, 0, 0)
        local handle = CreateNamedRenderTargetForModel('club_projector', model)

        RegisterScriptWithAudio(0)
        SetTvChannel(-1)

        Citizen.InvokeNative(0x9DD5A62390C3B735, 2, 'PL_SOL_RIB_PALACE', 0)
        SetTvChannel(2)
        EnableMovieSubtitles(1)

        while true do
            SetTvAudioFrontend(0)
            AttachTvAudioToEntity(entity)
            SetTextRenderId(handle)
            Set_2dLayer(4)
            Citizen.InvokeNative(0x9DD5A62390C3B735, 1)
            DrawTvChannel(0.5, 0.5, 1.0, 1.0, 0.0, 255, 255, 255, 255)
            SetTextRenderId(GetDefaultScriptRendertargetRenderId())
            Citizen.Wait(0)
        end
    end
)
