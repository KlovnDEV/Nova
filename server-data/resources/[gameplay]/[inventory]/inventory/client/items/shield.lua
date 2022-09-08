-- ЩИТ

local shieldActive = false
local shieldEntity = nil

-- ANIM
local animDict = "mp_character_creation@customise@male_a"
local animName = "loop"
--local animDict = "combat@aim_variations@1h@gang"
--local animName = "aim_variation_a"

local prop = GetHashKey("leb_prop_ballistic_shield01")
local pistol = GetHashKey("WEAPON_PISTOL" or "weapon_combatpistol")

RegisterNetEvent("shield:enable")
AddEventHandler("shield:enable", function()
    if shieldActive == true then
	shieldActive = false
        return
    end
    local ped = GetPlayerPed(-1)
    if IsPedInAnyVehicle(ped, true) then
        TriggerEvent('esx:showNotification', "Нельзя использовать щит ~r~в транспорте~s~!")
        return
    end

    -- if HasPedGotWeapon(ped, pistol, 0) or GetSelectedPedWeapon(ped) == pistol then
    --     SetCurrentPedWeapon(ped, pistol, 1)
    -- else
    --     TriggerEvent('esx:showNotification', "Для использования щита ~r~нужен пистолет~s~!")
    --     return
    -- end

    shieldActive = true

    local pedPos = GetEntityCoords(ped, false)

    RequestAnimDict(animDict)
    while not HasAnimDictLoaded(animDict) do
        Citizen.Wait(100)
    end

    RequestModel(prop)
    while not HasModelLoaded(prop) do
        Citizen.Wait(100)
    end

    local shield = CreateObject(prop, pedPos.x, pedPos.y, pedPos.z, 1, 1, 1)
    shieldEntity = shield
    AttachEntityToEntity(shieldEntity, ped, GetEntityBoneIndexByName(ped, "IK_L_Hand"), 0.17, -0.05, 0.23, -40.0, 95.0, 25.0, 0, 0, 1.0, 0, 0, 1)

    SetWeaponAnimationOverride(ped, GetHashKey("Gang1H"))
    SetEnableHandcuffs(ped, true)

    while shieldActive == true do
        Citizen.Wait(0)
    end

    DeleteEntity(shieldEntity)
    ClearPedTasksImmediately(ped)
    SetWeaponAnimationOverride(ped, GetHashKey("Default"))

    SetEnableHandcuffs(ped, false)
end)

Citizen.CreateThread(function()
    while true do
        if shieldActive then
            local ped = GetPlayerPed(-1)
            if not IsEntityPlayingAnim(ped, animDict, animName, 1) then
                TaskPlayAnim(ped, animDict, animName, 0.7, -8.0, -1, (2 + 16 + 32), 0.0, 0, 0, 0)
		Citizen.Wait(100)
            end

            -- if GetSelectedPedWeapon(ped) ~= pistol then
            --     shieldActive = false
            -- end

            if IsControlJustPressed(0, 322) then
                shieldActive = false
            end
        end

        Citizen.Wait(0)
    end
end)
