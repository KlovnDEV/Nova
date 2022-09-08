
--=========================================================================================================================================================--

                                              	   -- Hi, if you need to add weapons you can add it down here --
						                        -- Just add a line like this exemple > { WEAPON_MODEL, 'weapon name' }, < --
							                            -- ONLY IN THE FIRST TABLE, DON'T TOUCH SHOOTING TEST --
				                -- You can found weapon_model title and weapon name on this link : https://wiki.rage.mp/index.php?title=Weapons --
                                                   -- Feel free to ask me question on the discord if you needs help. --
                                                                            -- Evy. --

--=========================================================================================================================================================--

local globalWeaponTable = {
    {
        name = "Пристрелка",
        { 'WEAPON_PISTOL', 'Пистолет' },
        -- { 'WEAPON_VINTAGEPISTOL', 'Винтажный пистолет' },
        -- { 'WEAPON_DOUBLEACTION', 'Револьвер' },
        -- { 'WEAPON_HEAVYPISTOL', 'Тяжелый пистолет' },
        type = "try",

    },
    {
        name = "Тренировка стрельбы",
        { 'WEAPON_COMBATPISTOL', 'Легкая' },
        { 'WEAPON_COMBATPISTOL', 'Обычная' },
        { 'WEAPON_COMBATPISTOL', 'Тяжелая' },
        { 'WEAPON_COMBATPISTOL', 'Профессиональная' },
        type = "test",
    },
}


--=====================================================================--
--=========================     VARIABLE     ==========================--
--=====================================================================--
local keyPressed = false
local PnjList = {}
local GoToMenu = false

local alreadyInUse = false

local playerCoords = vector3(0,0,0)
local rangeCoords = vector3(592.93, -17.5, 79.1)

local compart = {
	{x = -5.887964, y = 8.928, z = 29}, --1
	{x = -4.810386, y = 8.928, z = 29}, --2
	{x = -3.888062, y = 8.928, z = 29}, --3
	{x = -2.903463, y = 8.928, z = 29}, --4

	{x = 2.084222, y = 8.928, z = 29}, --5
	{x = 3.098312, y = 8.928, z = 29}, --6
	{x = 4.138843, y = 8.928, z = 29}, --7
	{x = 5.202115, y = 8.928, z = 29} --8

}

local TargetDist = 36.69741

local pedConfig = {
	model = 'mp_m_weapexp_01',
	x = 8.15,
	y = -1099.294,
	z = 28.797,
	h = 157.613,
	animType = "scenario",
	animFlag = 0,
	animLib = 'CODE_HUMAN_CROSS_ROAD_WAIT',
	animName = ''
}

local Weapons = {
    weaponClasses = {},
}

for ci, wepTable in pairs(globalWeaponTable) do
    local className = wepTable.name
    local classType = wepTable.type
    Weapons.weaponClasses[ci] = {
        name = className,
        weapons = {},
    }
    local classWepTable = Weapons.weaponClasses[ci].weapons
    for wi, weaponObject in ipairs(wepTable) do
        classWepTable[wi] = {
            name = weaponObject[2],
            model = weaponObject[1],
            type = classType,
        }
    end
end
--МИШЕНИ !!!!
t = { { x = 600.52, y = -16.35 }, { x = 606.15, y = -16.45 }, { x = 609.78, y = -15.87 }, { x = 608.71, y = -21.05 }, { x = 607.98, y = -23.13 }, { x = 608.71, y = -19.36 }, { x = 605.16, y = -18.04 }, { x = 603.35, y = -15.44 }, { x = 601.91, y = -13.02 }, { x = 604.13, y = -13.72 }, { x = 607.27, y = -14.98 }, { x = 609.77, y = -15.95 }, { x = 609.02, y = -18.15 }, { x = 608.23, y = -20.05 },}

--=====================================================================--
--==========================     FUNCTION     =========================--
--=====================================================================--

function isMale()
    local hashSkinMale = GetHashKey("mp_m_freemode_01")
    local hashSkinFemale = GetHashKey("mp_f_freemode_01")
    if GetEntityModel(PlayerPedId()) == hashSkinMale then
      return true
    elseif GetEntityModel(PlayerPedId()) == hashSkinFemale then
      return false
    end
  end

function CreateNpc(list)  -- Basic function to spawn a safe ped (unkillable).
	RequestModel(list.model)
	while not HasModelLoaded(GetHashKey(list.model)) do
		Wait(1)
	end
	local npc = CreatePed(4, list.model, list.x, list.y, list.z, list.h,  false, true)
	SetModelAsNoLongerNeeded(GetHashKey(list.model))
	SetPedFleeAttributes(npc, 0, 0)
	SetPedDropsWeaponsWhenDead(npc, false)
	SetPedDiesWhenInjured(npc, false)
	SetEntityInvincible(npc , true)
	FreezeEntityPosition(npc, true)
	SetBlockingOfNonTemporaryEvents(npc, true)
	DecorSetBool(npc,"noDrugs",true)
	if list.scenario == 0 then
    	if not HasAnimDictLoaded(list.animDict) then
            RequestAnimDict(list.animDict)
            while not HasAnimDictLoaded(list.animDict) do
                Citizen.Wait(0)
            end
        end
		TaskPlayAnim(npc, list.animDict, list.animName, 2.0, 2.0, -1, list.flag, 0.0, false, false, false)
		RemoveAnimDict(list.animDict)
    end
	if list.scenario == 2 then --assis
		ClearPedTasksImmediately(npc)
		TaskStartScenarioAtPosition(npc, list.anim, list.x, list.y, list.z, list.h , 0, true, true)
	end

	if list.scenario == 3 then --clavier
		ClearPedTasksImmediately(npc)
		TaskStartScenarioAtPosition(npc, list.anim, list.x, list.y, list.z, list.h , 0, true, true)
		FreezeEntityPosition(npc, true)
		Wait(0)
        if not HasAnimDictLoaded('anim@amb@clubhouse@boss@male@') then
            RequestAnimDict('anim@amb@clubhouse@boss@male@')
            while not HasAnimDictLoaded('anim@amb@clubhouse@boss@male@') do
                Citizen.Wait(0)
            end
        end
		TaskPlayAnim(npc, 'anim@amb@clubhouse@boss@male@', 'computer_idle', 2.0, 2.0, -1, 51, 0.0, false, false, false)
		RemoveAnimDict('anim@amb@clubhouse@boss@male@')
	end

	if list.scenario == 4 then --clavier
		ClearPedTasksImmediately(npc)
		TaskStartScenarioAtPosition(npc, list.anim, list.x, list.y, list.z, list.h , 0, true, true)
		FreezeEntityPosition(npc, true)

	end

	if list.scenario == 1 then
		--TaskStartScenarioAtPosition(npc, list.anim, list.x, list.y, list.z, list.h, -1, false, true)
        TaskStartScenarioInPlace(npc, list.anim)
    end
	return npc

end

function alert(msg) -- Basic function to trigger a message at the bottom left of the screen
    SetTextComponentFormat("STRING")
    AddTextComponentString(msg)
    DisplayHelpTextFromStringLabel(0,0,1,-1)
end

function random(tb)
    local keys = {}
    for k in pairs(tb) do
        table.insert(keys, k)
    end
    return tb[keys[math.random(1, #keys)]]
end

function ReqAnimDict(animDict)
    RequestAnimDict(animDict)
    while not HasAnimDictLoaded(animDict) do
        Citizen.Wait(0)
    end
end

function weaponComponent(weaponHash, component)
    if HasPedGotWeapon(GetPlayerPed(-1), GetHashKey(weaponHash), false) then
        GiveWeaponComponentToPed(GetPlayerPed(-1), GetHashKey(weaponHash), GetHashKey(component))
    end
end

function TargetSpawn(x, y, z, a, v)
    local model = GetHashKey("prop_range_target_01")
    local shot = 0
    RequestModel(model)
    while (not HasModelLoaded(model)) do
        Wait(1)
    end
    local obj = CreateObject(model, x, y, z, true, true, true)
    SetEntityProofs(obj, false, true, false, false, false, false, 0, false)
    SetEntityRotation(obj, GetEntityRotation(obj) + vector3(-90, 0.0, 70))
    local r = -90
    PlaySoundFrontend(-1, "SHOOTING_RANGE_ROUND_OVER", "HUD_AWARDS", 1)
    while r ~= 0 do
        SetEntityRotation(obj, GetEntityRotation(obj) + vector3(9, 0.0, 0))
        r = r + 9
        Wait(1)
    end
    DeleteEntity(obj)
    Citizen.Wait(1)
    local obj = CreateObject(model, x, y, z, true, true, true)
    SetEntityRotation(obj, vector3(0, 0.0, 70)) -- ВАЖНО РОТАЦИЯ !!!!!!!!!!!!!!
    local fin = 0
    while shot < a do
        Citizen.Wait(0)
        fin = fin + 1
        if IsPedShooting(GetPlayerPed(-1)) then
            Wait(100)
            if fin > v then
                PlaySoundFrontend(-1, "CONFIRM_BEEP", "HUD_MINI_GAME_SOUNDSET", 1)
                shot = shot + 100
            elseif HasEntityBeenDamagedByWeapon(obj, 0, 2) then
                PlaySoundFrontend(-1, "HACKING_SUCCESS", 0, 1)
                shot = shot + 1
                score = score + 1
                ClearEntityLastDamageEntity(obj)
            elseif not HasEntityBeenDamagedByWeapon(obj, 0, 2) then
                PlaySoundFrontend(-1, "CONFIRM_BEEP", "HUD_MINI_GAME_SOUNDSET", 1)
                shot = shot + 1
            end
        elseif fin > v then
            PlaySoundFrontend(-1, "CONFIRM_BEEP", "HUD_MINI_GAME_SOUNDSET", 1)
            shot = shot + 100
        end
    end
    while r ~= -90 do
        SetEntityRotation(obj, GetEntityRotation(obj) - vector3(5, 0.0, 0))
        r = r - 5
        Wait(1)
    end
    DeleteEntity(obj)
    SetModelAsNoLongerNeeded(model)
end

function GetDistanceBetweenCoords(vec1, vec2) --faster then Vdist and checking X and Y axes only
   return #(vec1 - vec2) or #(vec1.xy - vec2.xy)
end

function TargetSpawnSimple(x, y, z)
    local model = GetHashKey("prop_range_target_01")
    RequestModel(model)
    while not HasModelLoaded(model) do
        Wait(0)
    end
    local obj = CreateObject(model, x, y, z, false, false,false)
    SetEntityProofs(obj, false, true, false, false, false, false, 0, false)
    SetEntityRotation(obj, GetEntityRotation(obj) + vector3(-90, 0.0, -1))
    local r = -90
	PlaySoundFrontend(-1, "GARAGE_DOOR_SCRIPTED_CLOSE", 0, 1)
	while r ~= 0 do
		Wait(0)
    	SetEntityRotation(obj, GetEntityRotation(obj) + vector3(9, 0.0, -0.5))
    	r = r + 9
	end
	return obj
end

function TargetDelete(obj)
	local r = 0
	while r ~= -90 do
		Wait(0)
		SetEntityRotation(obj, GetEntityRotation(obj) + vector3(5, 0.0, -0.2))
		r = r - 50
	end
    DeleteEntity(obj)
end

function initialisePed()
    local basePed = {model = "ig_casey", scenario = 0, animDict = "amb@code_human_police_investigate@idle_a", animName = "idle_b", flag = 1, x = 592.93, y = -17.5, z = 78.42, h = 343.34}
    Ped = CreateNpc(basePed)
    table.insert(PnjList, Ped)
end

function erasePed()
	for i, npc in pairs(PnjList) do
		DeletePed(npc)
	end
	PnjList = {}
end

function notify(msg)
    SetNotificationTextEntry("STRING")
    AddTextComponentString(msg)
    DrawNotification(true, false)
end

function GoMenu()
    SetPlayerControl(PlayerId(), false)
    GoToMenu = true
    CustomUI.OpenMenu("Weapons")
end

--=====================================================================--
--========================     CLIENT EVENT     =======================--
--=====================================================================--

RegisterNetEvent("evy_shootingrange:reserve_cl")
AddEventHandler("evy_shootingrange:reserve_cl", function()
        alreadyInUse = true
end)

RegisterNetEvent("evy_shootingrange:unreserve_cl")
AddEventHandler("evy_shootingrange:unreserve_cl", function()
        alreadyInUse = false
end)

--=====================================================================--
--========================     MAIN THREAD     ========================--
--=====================================================================--

Citizen.CreateThread(function()
	local created = false
	while true do
		Wait(3000)
                local dist = #(playerCoords - rangeCoords)
		if dist < 100 and not created then
			initialisePed()
			created = true
		elseif dist >= 100 and created then
			erasePed()
			created = false
        end
    end
end)

Citizen.CreateThread(function()
    CustomUI.CreateMenu("Weapons", "Shooting Range", function()
        SetPlayerControl(PlayerId(), true)
        return true
    end)
    CustomUI.SetSubTitle('Weapons', "Shooting Range")
    for i, class in ipairs(Weapons.weaponClasses) do
        CustomUI.CreateSubMenu("w_" .. class.name, "Weapons", class.name, function()
            return true
        end)

        for i, weapon in ipairs(class.weapons) do
            CustomUI.CreateSubMenu("w_" .. class.name .. "_" .. weapon.model, "Weapons", weapon.name, function()
                return true
            end)

        end
    end
    while true do
        Citizen.Wait(0)
        if GoToMenu then
            if CustomUI.IsMenuOpened('Weapons') then
                for i, class in ipairs(Weapons.weaponClasses) do
                    CustomUI.MenuButton(class.name, "w_" .. class.name)
                end
                CustomUI.Display()
            end
            for i, class in ipairs(Weapons.weaponClasses) do
                if CustomUI.IsMenuOpened("w_" .. class.name) then
                    for i, weapon in ipairs(class.weapons) do
                        if weapon.type == "try" then
                            local clicked, hovered = CustomUI.SpriteMenuButton(weapon.name, "commonmenu", "shop_gunclub_icon_a", "shop_gunclub_icon_b", "w_" .. class.name .. "_" .. weapon.model)
                            if clicked then
                                stand(weapon.model)
                            end
                        elseif weapon.type == "test" then
                            local clicked, hovered = CustomUI.SpriteMenuButton(weapon.name, "commonmenu", "shop_gunclub_icon_a", "shop_gunclub_icon_b", "w_" .. class.name .. "_" .. weapon.model)
                            if clicked then
                                test(weapon.name)
                            end
                        end
                    end
                    CustomUI.Display()
                end
            end
            if Weapons.closeMenuNextFrame then
                inMenu = false
                Weapons.closeMenuNextFrame = false
                CustomUI.CloseMenu()
                GoToMenu = false
            end
        end
    end
end)

Citizen.CreateThread(function()

    while true do
        local ped = PlayerPedId()
        Citizen.Wait(0)
        if #(playerCoords - rangeCoords) < 2 and not keyPressed then -- НПЦ
            alert('~INPUT_PICKUP~  потренироваться в стрельбе')
            if IsControlPressed(2, 38) then
                keyPressed = true
                GoMenu()
            end

        end
        if IsControlPressed(2, 194) and keyPressed then
            keyPressed = false
        end
        if #(playerCoords - rangeCoords) > 2 and keyPressed then -- НПЦ
            keyPressed = false
        end
    end
end)

local inAnim = false

function stand(weapon)
    SetPlayerControl(PlayerId(), true)
    local T = 500
    local ped = GetPlayerPed(-1)
    local coords = playerCoords
    local remb = 0

    if alreadyInUse then
        return notify("~r~Дождитесь своей очереди !")
    end
        TriggerServerEvent("evy_shootingrange:reserve_sv")
        if HasPedGotWeapon(ped, GetHashKey(weapon), false) then
            remb = 1
        end
        GiveWeaponToPed(ped, GetHashKey(weapon), 999, false, true)
        Citizen.Wait(400)
        local timer = 2000
        ClearPedTasks(ped)
        DoScreenFadeOut(timer) --
        Wait(4000)
        -- if isMale() then
        --     SetPedPropIndex(ped, 0, 0, 0, true)
        --     SetPedPropIndex(ped, 1, 15, 0, true)
        -- else
        --     SetPedPropIndex(ped, 0, 0, 0, true)
        --     SetPedPropIndex(ped, 1, 25, 0, true)
        -- end

        SetEntityHeading(PlayerPedId(), 250.59)
        SetEntityCoordsNoOffset(PlayerPedId(), 595.28, -14.36, 79.43, 302.15) -- МЕСТО СТРЕЛЬБЫ!!!!
        FreezeEntityPosition(ped, true)
        ReqAnimDict("anim@deathmatch_intros@1hmale")
        TaskPlayAnim(ped, "anim@deathmatch_intros@1hmale", "intro_male_1h_d_trevor", 8.0, 5.0, -1, true, 1, 0, 0, 0)
        DoScreenFadeIn(timer)
        Citizen.Wait(8000)
        ClearPedTasks(ped)
        RemoveAnimDict("anim@deathmatch_intros@1hmale")
        local x = 1
        while x == 1 do
            Wait(0)
            alert("~INPUT_PICKUP~ - пристрелка |  ~INPUT_VEH_DUCK~ - выход")
            if IsControlJustPressed(1, 73) then
                DoScreenFadeOut(timer) --
                Wait(4000)
                -- if isMale() then
                --     SetPedPropIndex(ped, 0, 8, 0, true)
                --     SetPedPropIndex(ped, 1, 0, 0, true)
                -- else
                --     SetPedPropIndex(ped, 0, 0, 0, true)
                --     SetPedPropIndex(ped, 1, 57, 0, true)
                -- end
                FreezeEntityPosition(ped, false)
                SetEntityHeading(PlayerPedId(), 359.102)
                SetEntityCoordsNoOffset(PlayerPedId(), 594.56, -14.11, 79.43, 53.35, 0) -- ВЫХОД !
                ReqAnimDict("switch@franklin@chopshop")
                TaskPlayAnim(ped, "switch@franklin@chopshop", "checkshoe", 8.0, 5.0, -1, true, 1, 0, 0, 0)
                DoScreenFadeIn(timer)
                Wait(4000)
                x = 2
                RemoveWeaponFromPed(ped, weapon)
                ClearPedTasks(ped)
                if remb == 1 then
                    GiveWeaponToPed(ped, GetHashKey(weapon), 999, false, true)
                end
                TriggerServerEvent("evy_shootingrange:unreserve_sv")
            elseif IsControlJustPressed(1, 38) then
                TargetSpawn(600.52, -16.35, 79.03, 10, 1000)-- МИШЕНЬ
                Wait(T)
                T = 200
            end
        end
end

score = 0

function test(type)
    SetPedInfiniteAmmo(GetPlayerPed(-1), true, GetHashKey('weapon_combatpistol'))
    SetPedInfiniteAmmoClip(PlayerPedId(), true)
    SetPlayerControl(PlayerId(), true)
    if type == "Легкая" then
        local T = 500
        local ped = GetPlayerPed(-1)
        local coords = playerCoords
        score = 0
        local remb = 0

        if alreadyInUse then
            return notify("~r~Дождитесь своей очереди !")
        end
            TriggerServerEvent("evy_shootingrange:reserve_sv")
            Citizen.Wait(4)
            if HasPedGotWeapon(ped, GetHashKey('weapon_combatpistol'), false) then
                remb = 1
            end
            GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            Citizen.Wait(400)
            local timer = 2000
            -- reserve slot
            DoScreenFadeOut(timer)
            ClearPedTasks(ped)
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 15, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 25, 0, true)
            -- end

            SetEntityHeading(PlayerPedId(), 250.59)
            SetEntityCoordsNoOffset(PlayerPedId(), 595.28, -14.36, 79.43, 302.15) -- МЕСТО СТРЕЛЬБЫ!!!!!
            FreezeEntityPosition(ped, true)
            ReqAnimDict("anim@deathmatch_intros@1hmale")
            TaskPlayAnim(ped, "anim@deathmatch_intros@1hmale", "intro_male_1h_d_trevor", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Citizen.Wait(10000)
            ClearPedTasks(ped)
            RemoveAnimDict("anim@deathmatch_intros@1hmale")
            local x = 1
            while x == 1 do
                Wait(0)
                alert("Нажмите ~INPUT_PICKUP~ что бы начать тренировку")
                if IsControlJustPressed(1, 38) then
                    score = 0
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "CHECKPOINT_PERFECT", "HUD_MINI_GAME_SOUNDSET", 0)
                    Wait(1000)
                    TargetSpawn(600.52, -16.35, 79.03, 1, 100) -- ТЕСТОВАЯ МИШЕНЬ
                    local spawn = random(t)
                    T = 1000
                    notify("Счет : ~b~" .. score .. "~w~ / 1")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 2")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 3")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 4")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 5")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 6")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 7")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 8")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 9")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    x = 2
                end
            end
            DoScreenFadeOut(timer) --
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 8, 0, true)
            --     SetPedPropIndex(ped, 1, 0, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 57, 0, true)
            -- end

            FreezeEntityPosition(ped, false)
            SetEntityHeading(PlayerPedId(), 359.102)
            SetEntityCoordsNoOffset(PlayerPedId(), 594.56, -14.11, 79.43, 53.35, 0) -- ВЫХОД СО СТРЕЛЬБЫ
            ReqAnimDict("switch@franklin@chopshop")
            TaskPlayAnim(ped, "switch@franklin@chopshop", "checkshoe", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Wait(4000)
            x = 2
            RemoveWeaponFromPed(ped, 'weapon_combatpistol')
            ClearPedTasks(ped)
            if score < 8 then
                notify("Вы набрали ~r~" .. score .. "~w~ / 10.")
            else
                notify("Вы набрали ~b~" .. score .. "~w~ / 10.")
            end
            if remb == 1 then
                GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            end
	TriggerServerEvent("evy_shootingrange:unreserve_sv")
    elseif type == "Обычная" then
        local T = 500
        local ped = GetPlayerPed(-1)
        local coords = playerCoords
        score = 0
        local remb = 0

        if alreadyInUse then
            return notify("~r~Дождитесь своей очереди  !")
        end

            TriggerServerEvent("evy_shootingrange:reserve_sv")

            Citizen.Wait(4)

            if HasPedGotWeapon(ped, GetHashKey('weapon_combatpistol'), false) then
                remb = 1
            end
            GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            Citizen.Wait(400)

            local timer = 2000
            DoScreenFadeOut(timer)
            ClearPedTasks(ped)
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 15, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 25, 0, true)
            -- end

            SetEntityHeading(PlayerPedId(), 250.59)
            SetEntityCoordsNoOffset(PlayerPedId(), 595.28, -14.36, 79.43, 302.15) -- МЕСТО СТРЕЛЬБЫ!!!
            FreezeEntityPosition(ped, true)
            ReqAnimDict("anim@deathmatch_intros@1hmale")
            TaskPlayAnim(ped, "anim@deathmatch_intros@1hmale", "intro_male_1h_d_trevor", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Citizen.Wait(10000)
            ClearPedTasks(ped)
            RemoveAnimDict("anim@deathmatch_intros@1hmale")
            local x = 1
            while x == 1 do
                Wait(0)
                alert("Нажмите ~INPUT_PICKUP~ что бы начать тренировку")
                if IsControlJustPressed(1, 38) then
                    score = 0
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "CHECKPOINT_PERFECT", "HUD_MINI_GAME_SOUNDSET", 0)
                    Wait(1000)
                    TargetSpawn(600.52, -16.35, 79.03, 1, 100) -- ТЕСТОВАЯ МИШЕНЬ!!!
                    local spawn = random(t)
                    T = 1000
                    notify("Счет : ~b~" .. score .. "~w~ / 1")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 2")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 3")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 4")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 5")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 6")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 7")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 8")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 9")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 10")
                    spawn = random(t)
                    Wait(T)
                    T = 500
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 11")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 12")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 13")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 14")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 15")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 16")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 17")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 18")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 19")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 20")
                    spawn = random(t)
                    Wait(T)
                    T = 250
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 21")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 22")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 23")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 24")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 25")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 26")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 27")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 28")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    notify("Счет : ~b~" .. score .. "~w~ / 29")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 100)
                    x = 2
                end
            end
            DoScreenFadeOut(timer) --
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 8, 0, true)
            --     SetPedPropIndex(ped, 1, 0, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 57, 0, true)
            -- end

            FreezeEntityPosition(ped, false)
            SetEntityHeading(PlayerPedId(), 359.102)
            SetEntityCoordsNoOffset(PlayerPedId(), 594.56, -14.11, 79.43, 53.35, 0) -- ВЫХОД !!!
            ReqAnimDict("switch@franklin@chopshop")
            TaskPlayAnim(ped, "switch@franklin@chopshop", "checkshoe", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Wait(4000)
            x = 2
            RemoveWeaponFromPed(ped, 'weapon_combatpistol')
            ClearPedTasks(ped)
            if score < 25 then
                notify("Вы набрали ~r~" .. score .. "~w~ / 30.")
            else
                notify("Вы набрали ~b~" .. score .. "~w~ / 30.")
            end
            if remb == 1 then
                GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            end
            TriggerServerEvent("evy_shootingrange:unreserve_sv")
    elseif type == "Тяжелая" then


        local T = 500
        local ped = GetPlayerPed(-1)
        local coords = playerCoords
        score = 0
        local remb = 0

        if alreadyInUse then
            return notify("~r~Дождитесь своей очереди !")
        end


            TriggerServerEvent("evy_shootingrange:reserve_sv")
            Citizen.Wait(4)
            if HasPedGotWeapon(ped, GetHashKey('weapon_combatpistol'), false) then
                remb = 1
            end
            GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            Citizen.Wait(400)

            local timer = 2000
            DoScreenFadeOut(timer)
            ClearPedTasks(ped)
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 15, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 25, 0, true)
            -- end

            SetEntityHeading(PlayerPedId(), 250.59)
            SetEntityCoordsNoOffset(PlayerPedId(), 595.28, -14.36, 79.43, 302.15) -- МЕСТО СТРЕЛЬБЫ !!!
            FreezeEntityPosition(ped, true)
            ReqAnimDict("anim@deathmatch_intros@1hmale")
            TaskPlayAnim(ped, "anim@deathmatch_intros@1hmale", "intro_male_1h_d_trevor", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Citizen.Wait(10000)
            ClearPedTasks(ped)
            RemoveAnimDict("anim@deathmatch_intros@1hmale")
            local x = 1
            while x == 1 do
                Wait(0)
                alert("Нажмите ~INPUT_PICKUP~ что бы начать тренировку ")
                if IsControlJustPressed(1, 38) then
                    score = 0
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                    Wait(1000)
                    PlaySoundFrontend(-1, "CHECKPOINT_PERFECT", "HUD_MINI_GAME_SOUNDSET", 0)
                    Wait(1000)
                    TargetSpawn(600.52, -16.35, 79.03, 1, 50)
                    local spawn = random(t)
                    T = 1000
                    notify("Счет : ~b~" .. score .. "~w~ / 1")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 2")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 3")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 4")
                    Wait(T)
                    spawn = random(t)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 5")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 6")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 7")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 8")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 9")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 10")
                    spawn = random(t)
                    Wait(T)
                    T = 500
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 11")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 12")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 13")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 14")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 15")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 16")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 17")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 18")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 19")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 20")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 21")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 22")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 23")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 24")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 25")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 26")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 27")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 28")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                    notify("Счет : ~b~" .. score .. "~w~ / 29")
                    spawn = random(t)
                    Wait(T)
                    T = 250
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 30")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 31")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 32")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 33")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 34")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 35")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 36")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 37")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 38")
                    spawn = random(t)
                    Wait(T)
                    TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                    notify("Счет : ~b~" .. score .. "~w~ / 39")
                    spawn = random(t)
                    Wait(T)
                    x = 2
                end
            end
            DoScreenFadeOut(timer) --
            Wait(4000)
            -- if isMale() then
            --     SetPedPropIndex(ped, 0, 8, 0, true)
            --     SetPedPropIndex(ped, 1, 0, 0, true)
            -- else
            --     SetPedPropIndex(ped, 0, 0, 0, true)
            --     SetPedPropIndex(ped, 1, 57, 0, true)
            -- end
            FreezeEntityPosition(ped, false)
            SetEntityHeading(PlayerPedId(), 359.102)
            SetEntityCoordsNoOffset(PlayerPedId(), 594.56, -14.11, 79.43, 53.35, 0) -- ВЫХОД !!!
            ReqAnimDict("switch@franklin@chopshop")
            TaskPlayAnim(ped, "switch@franklin@chopshop", "checkshoe", 8.0, 5.0, -1, true, 1, 0, 0, 0)
            DoScreenFadeIn(timer)
            Wait(4000)
            x = 2
            RemoveWeaponFromPed(ped, 'weapon_combatpistol')
            ClearPedTasks(ped)
            if score < 40 then
                notify("Вы набрали ~r~" .. score .. "~w~ / 40.")
            else
                notify("Вы набрали ~b~" .. score .. "~w~ / 40.")
            end
            if remb == 1 then
                GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
            end
            TriggerServerEvent("evy_shootingrange:unreserve_sv")

    elseif type == "Профессиональная" then


            local T = 500
    local ped = GetPlayerPed(-1)
    local coords = playerCoords
    score = 0
    local remb = 0

    if alreadyInUse then
        return notify("~r~Дождитесь своей очереди !")
    end


        TriggerServerEvent("evy_shootingrange:reserve_sv")
        Citizen.Wait(4)
        if HasPedGotWeapon(ped, GetHashKey('weapon_combatpistol'), false) then
            remb = 1
        end
        GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
        Citizen.Wait(400)

        local timer = 2000
        DoScreenFadeOut(timer)
        ClearPedTasks(ped)
        Wait(4000)
        -- if isMale() then
        --     SetPedPropIndex(ped, 0, 0, 0, true)
        --     SetPedPropIndex(ped, 1, 15, 0, true)
        -- else
        --     SetPedPropIndex(ped, 0, 0, 0, true)
        --     SetPedPropIndex(ped, 1, 25, 0, true)
        -- end

        SetEntityHeading(PlayerPedId(), 250.59)
        SetEntityCoordsNoOffset(PlayerPedId(), 595.28, -14.36, 79.43, 302.15) -- МЕСТО СТРЕЛЬБЫ
        FreezeEntityPosition(ped, true)
        ReqAnimDict("anim@deathmatch_intros@1hmale")
        TaskPlayAnim(ped, "anim@deathmatch_intros@1hmale", "intro_male_1h_d_trevor", 8.0, 5.0, -1, true, 1, 0, 0, 0)
        DoScreenFadeIn(timer)
        Citizen.Wait(10000)
        ClearPedTasks(ped)
        RemoveAnimDict("anim@deathmatch_intros@1hmale")
        local x = 1
        while x == 1 do
            Wait(0)
            alert("Нажмите ~INPUT_PICKUP~ что бы начать тренировку")
            if IsControlJustPressed(1, 38) then
                score = 0
                PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                Wait(1000)
                PlaySoundFrontend(-1, "Checkpoint_Hit", "GTAO_FM_Events_Soundset", 0)
                Wait(1000)
                PlaySoundFrontend(-1, "CHECKPOINT_PERFECT", "HUD_MINI_GAME_SOUNDSET", 0)
                Wait(1000)
                TargetSpawn(600.52, -16.35, 79.03, 1, 50)
                local spawn = random(t)
                T = 250
                notify("Счет : ~b~" .. score .. "~w~ / 1")
                Wait(T)
                spawn = random(t)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 2")
                Wait(T)
                spawn = random(t)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 3")
                Wait(T)
                spawn = random(t)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 4")
                Wait(T)
                spawn = random(t)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 5")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 6")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 7")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 8")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 9")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 10")
                spawn = random(t)
                Wait(T)
                T = 200
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 11")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 12")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 13")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 14")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 15")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 16")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 17")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 18")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 19")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 20")
                spawn = random(t)
                Wait(T)
                T = 50
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 21")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 22")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 23")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 24")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 25")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 26")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 27")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 28")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 50)
                notify("Счет : ~b~" .. score .. "~w~ / 29")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 30")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 31")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 32")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 33")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 34")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 35")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 36")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 37")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 38")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 39")
                spawn = random(t)
                Wait(T)
                TargetSpawn(spawn.x, spawn.y,79.03, 1, 20)
                notify("Счет : ~b~" .. score .. "~w~ / 40")
                spawn = random(t)
                Wait(T)
                TargetSpawn(600.52, -16.35, 79.03, 10, 200)
                x = 2
            end
        end
        DoScreenFadeOut(timer) --
        Wait(4000)
        -- if isMale() then
        --     SetPedPropIndex(ped, 0, 8, 0, true)
        --     SetPedPropIndex(ped, 1, 0, 0, true)
        -- else
        --     SetPedPropIndex(ped, 0, 0, 0, true)
        --     SetPedPropIndex(ped, 1, 57, 0, true)
        -- end
        FreezeEntityPosition(ped, false)
        SetEntityHeading(PlayerPedId(), 359.102)
        SetEntityCoordsNoOffset(PlayerPedId(), 594.56, -14.11, 79.43, 53.35, 0) -- ВЫХОД !!!
        ReqAnimDict("switch@franklin@chopshop")
        TaskPlayAnim(ped, "switch@franklin@chopshop", "checkshoe", 8.0, 5.0, -1, true, 1, 0, 0, 0)
        DoScreenFadeIn(timer)
        Wait(4000)
        x = 2
        RemoveWeaponFromPed(ped, 'weapon_combatpistol')
        ClearPedTasks(ped)
        if score < 40 then
            notify("Вы набрали ~r~" .. score .. "~w~ / 50.")
        else
            notify("Вы набрали ~b~" .. score .. "~w~ / 50.")
        end
        if remb == 1 then
            GiveWeaponToPed(ped, GetHashKey('weapon_combatpistol'), 999, false, true)
        end
        TriggerServerEvent("evy_shootingrange:unreserve_sv")
    end
    SetPedInfiniteAmmo(GetPlayerPed(-1), false, GetHashKey('weapon_combatpistol'))
    SetPedInfiniteAmmoClip(PlayerPedId(), false)
end



Citizen.CreateThread(function()
    while true do
        Wait(0)
        playerCoords = GetEntityCoords(PlayerPedId())
    end
end)
