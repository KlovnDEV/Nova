local esxStatus = {}
local currentEffect = nil
AddEventHandler('esx_status:loaded', function(status)
    esxStatus = processStatus(status)
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1000)
        updateEffects(esxStatus)
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(60000)
        if esxStatus.nicotineLong and esxStatus.nicotineLong > 10 then
            if math.random(0, 100) < esxStatus.nicotineLong and esxStatus.nicotine < 50 then
                TriggerEvent('dpemotes:emote', "cough")
            end
        end
    end
end)

function updateEffects(s)
    if s.alcohol and s.alcohol == 0 and s.alcoholLong > 10 then
        setEffect("nightvision", (s.alcoholLong -10) / 90.0*3)
    elseif s.nicotine and s.nicotine == 0 and s.nicotineLong > 10 then
        setEffect("fp_vig_black", (s.nicotineLong -10) / 90.0)
    elseif s.drugs and s.drugs == 0 and s.drugsLong > 10 then
        setEffect("hud_def_flash", math.sqrt((s.drugsLong -10) / 90.0))
    else
        if currentEffect ~= nil then
            ClearTimecycleModifier()
            currentEffect = nil
        end
    end
end

function processStatus(status)
    if not status then return {} end
    local s = {}
    for _,item in pairs(status) do
        s[item.name] = item.percent
    end
    return s
end

function setEffect(effect, strength)
    currentEffect = effect
    SetTimecycleModifier(effect)
    SetTimecycleModifierStrength(strength)
end

AddEventHandler('esx_status:onTick', function(status)
    esxStatus = processStatus(status)
end)
