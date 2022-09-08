minimap = nil

local hunger = 0
local thirst = 0
local paused = true
-- local isHidden = false
local sentValues = {}

-- Citizen.CreateThread(function()
--     while true do
--         if isHidden then
--             for i=1,20 do
--                 HideHudComponentThisFrame(i)
--             end
--             HideHudNotificationsThisFrame()
--             DisplayAmmoThisFrame(false)
--         end

--         if isHidden and IsControlJustPressed(0, 243) then -- TILDE
--             isHidden = false
--             TriggerEvent('sosamba_ui:setHidden', isHidden)
--         end

--         if IsControlJustPressed(0, 57) then -- F10
--             isHidden = not isHidden
--             TriggerEvent('sosamba_ui:setHidden', isHidden)
--         end

--         Citizen.Wait(0)
--     end
-- end)

Citizen.CreateThread(function()

    while true do
        local values = {
            hunger = -1,
            thirst = -1,
            stress = -1,
            smoking = -1,
            ['smoking-addiction'] = -1,
            alcohol = -1,
            ['alcohol-addiction'] = -1,
            drugs = -1,
            ['drugs-addiction'] = -1,
        }

        status = LocalPlayer.state.status or {}

        for k,v in pairs(status) do
            values[k] = v / 100.0
        end

        if values['smoking-addiction'] < 0.01 then
            values.smoking = -1
        end

        if values['alcohol-addiction'] < 0.01 then
            values.alcohol = -1
        end

        if values['drugs-addiction'] < 0.01 then
            values.drugs = -1
        end

        values.health = (GetEntityHealth(PlayerPedId()) - 100) / 100.0
        values.armor = GetPedArmour(PlayerPedId()) / 100.0
        values.stamina = 1 - GetPlayerSprintStaminaRemaining(PlayerId()) / 100.0
        values.stress = 1 - values.stress
        values.hunger = 1 - values.hunger
        values.thirst = 1 - values.thirst

        local res = {}
        for k,v in pairs(values) do
            if v >= 0 then
                values[k] = math.floor(v * 100) / 100.0
            end
        end

        values.query = 'indicators/set'

        MakeDifferentialQuery(values)

        Citizen.Wait(100)
    end
end)

Citizen.CreateThread(function()

    while GetIsLoadingScreenActive() do
        Citizen.Wait(1000)
    end

    while true do
        local pauseMenuActive = IsPauseMenuActive()

        if pauseMenuActive ~= paused then
            paused = pauseMenuActive
--[[
            SendNUIMessage({
                action  = 'setPause',
                paused = paused
            })
]]--
        end
        Citizen.Wait(100)
    end
end)

