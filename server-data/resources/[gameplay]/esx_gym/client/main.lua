local Keys = {
  ["ESC"] = 322, ["F1"] = 288, ["F2"] = 289, ["F3"] = 170, ["F5"] = 166, ["F6"] = 167, ["F7"] = 168, ["F8"] = 169, ["F9"] = 56, ["F10"] = 57,
  ["~"] = 243, ["1"] = 157, ["2"] = 158, ["3"] = 160, ["4"] = 164, ["5"] = 165, ["6"] = 159, ["7"] = 161, ["8"] = 162, ["9"] = 163, ["-"] = 84, ["="] = 83, ["BACKSPACE"] = 177,
  ["TAB"] = 37, ["Q"] = 44, ["W"] = 32, ["E"] = 38, ["R"] = 45, ["T"] = 245, ["Y"] = 246, ["U"] = 303, ["P"] = 199, ["["] = 39, ["]"] = 40, ["ENTER"] = 18,
  ["CAPS"] = 137, ["A"] = 34, ["S"] = 8, ["D"] = 9, ["F"] = 23, ["G"] = 47, ["H"] = 74, ["K"] = 311, ["L"] = 182,
  ["LEFTSHIFT"] = 21, ["Z"] = 20, ["X"] = 73, ["C"] = 26, ["V"] = 0, ["B"] = 29, ["N"] = 249, ["M"] = 244, [","] = 82, ["."] = 81,
  ["LEFTCTRL"] = 36, ["LEFTALT"] = 19, ["SPACE"] = 22, ["RIGHTCTRL"] = 70,
  ["HOME"] = 213, ["PAGEUP"] = 10, ["PAGEDOWN"] = 11, ["DELETE"] = 178,
  ["LEFT"] = 174, ["RIGHT"] = 175, ["TOP"] = 27, ["DOWN"] = 173,
  ["NENTER"] = 201, ["N4"] = 108, ["N5"] = 60, ["N6"] = 107, ["N+"] = 96, ["N-"] = 97, ["N7"] = 117, ["N8"] = 61, ["N9"] = 118
}

ESX = nil
local isNearGym = false
local training = false
local resting = false
local membership = false
local needRest = 0.0

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

function StartTraining(onStart)
	if training then
		return
	end

	if needRest > 0 then
		ESX.ShowNotification(string.format("Вам нужно отдохнуть ещё ~r~%.0f сек~s~.", needRest))
		return
	end

	if not membership then
		TriggerServerEvent('esx_gym:checkChip')
		Citizen.Wait(1000)

		if not membership then
			ESX.ShowNotification("Вам нужно купить Абонемент чтобы начать ~r~упражнение")
			return
		end
	end

	ESX.ShowNotification("Вы начали ~g~упражнение~w~...")

	training = true
	onStart()
	training = false

	if needRest > 0 then
		ESX.ShowNotification(string.format("Вам нужно отдохнуть ~r~%.0f сек~w~ прежде чем начать следующее упражнение.", needRest))
		resting = true
	end
end

-- Rest timer
Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)

		if not training and needRest > 0 then
			needRest = needRest - 1.0
			if needRest < 0 then
				needRest = 0
			end

			if resting and needRest == 0 then
				ESX.ShowNotification("Можете приступать к тренировкам...")
				resting = false
			end
		end
	end
end)

function hintToDisplay(text)
	SetTextComponentFormat("STRING")
	AddTextComponentString(text)
	DisplayHelpTextFromStringLabel(0, 0, 1, -1)
end

local blips = {
	{title="Тренажерка", colour=7, id=311, x = -1201.2257, y = -1568.8670, z = 4.6101}
}

Citizen.CreateThread(function()

	for _, info in pairs(blips) do
		info.blip = AddBlipForCoord(info.x, info.y, info.z)
		SetBlipSprite(info.blip, info.id)
		SetBlipDisplay(info.blip, 4)
		SetBlipScale(info.blip, 1.0)
		SetBlipColour(info.blip, info.colour)
		SetBlipAsShortRange(info.blip, true)
		BeginTextCommandSetBlipName("STRING")
		AddTextComponentString(info.title)
		EndTextCommandSetBlipName(info.blip)
	end
end)

RegisterNetEvent('esx_gym:useBandage')
AddEventHandler('esx_gym:useBandage', function()
	local playerPed = GetPlayerPed(-1)
	local maxHealth = GetEntityMaxHealth(playerPed)
	local health = GetEntityHealth(playerPed)
	local newHealth = math.min(maxHealth , math.floor(health + maxHealth/3))

	SetEntityHealth(playerPed, newHealth)
	--SetEntityHealth(playerPed, maxHealth) -- Give them full health by one bandage

	ESX.ShowNotification("Вы наложили ~g~повязки")
end)

RegisterNetEvent('esx_gym:membership')
AddEventHandler('esx_gym:membership', function(val)
	membership = val
end)

function drawExerciseMarker(pos)
	DrawMarker(21, pos.x, pos.y, pos.z, 0, 0, 0, 0, 0, 0, 0.301, 0.301, 0.3001, 0, 255, 50, 200, 0, 0, 0, 0)
end

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(0)
        local plyCoords = GetEntityCoords(PlayerPedId())
        isNearGym = false

        for k in pairs(Config.gym) do
            DrawMarker(21, Config.gym[k].pos, 0, 0, 0, 0, 0, 0, 0.301, 0.301, 0.3001, 0, 153, 255, 255, 0, 0, 0, 0)
            local dist = #(plyCoords-Config.gym[k].pos)
            if dist <= 0.5 then
								doGym()
								isNearGym = true
            elseif dist < 100.0 then
                isNearGym = true
            end
        end

	if not isNearGym then
		Citizen.Wait(1000)
	end

        for k in pairs(Config.rentbike) do
            DrawMarker(38, Config.rentbike[k].pos, 0, 0, 0, 0, 0, 0, 0.301, 0.301, 0.3001, 0, 153, 255, 255, 0, 0, 0, 0)
            if #(plyCoords-Config.rentbike[k].pos) <= 0.5 then
		doRentBike()
            end
        end
        for k in pairs(Config.arms) do
            drawExerciseMarker(Config.arms[k].pos)
            if #(plyCoords-Config.arms[k].pos) <= 0.5 then
		doArms()
            end
        end
        for k in pairs(Config.pushup) do
            drawExerciseMarker(Config.pushup[k].pos)
            if #(plyCoords-Config.pushup[k].pos) <= 0.5 then
		doPushups()
            end
        end
        for k in pairs(Config.yoga) do
            drawExerciseMarker(Config.yoga[k].pos)
            if #(plyCoords-Config.yoga[k].pos) <= 0.5 then
		doYoga()
            end
        end
        for k in pairs(Config.situps) do
            drawExerciseMarker(Config.situps[k].pos)
            if #(plyCoords-Config.situps[k].pos) <= 0.5 then
		doSitups()
            end
        end
        for k in pairs(Config.chins) do
            drawExerciseMarker(Config.chins[k].pos)
            if #(plyCoords-Config.chins[k].pos) <= 0.5 then
		doChinups(Config.chins[k])
            end
        end
    end
end)

function doRentBike()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы арендовать ~b~Велосипед')

	if IsControlJustPressed(0, Keys['E']) then -- "E"
		if IsPedInAnyVehicle(GetPlayerPed(-1)) then
			ESX.ShowNotification("У вас уже есть ~r~транспорт")
		else
			OpenBikeMenu()
		end
	end
end

function doGym()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы ознакомиться с ~b~Услугами~w~')

	if IsControlJustPressed(0, Keys['E']) then
		OpenGymMenu()
	end
end

function doArms()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы поднять ~g~штангу')

	if IsControlJustPressed(0, Keys['E']) then
		StartTraining(function() -- onStart
			TaskStartScenarioInPlace(PlayerPedId(), "world_human_muscle_free_weights", 0, true)
			Citizen.Wait(1000)
			while needRest < 60 and IsPedUsingAnyScenario(PlayerPedId()) do
				TriggerEvent('esx_status:add', 'strength', Config.armsStrength)
				needRest = needRest + 1.5
				Citizen.Wait(1000)
			end
			ClearPedTasksImmediately(PlayerPedId())
		end)
	end
end

function doChinups(info)
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы начать ~g~подтягиваться')

	if IsControlJustPressed(0, Keys['E']) then

		StartTraining(function()
			if info.start_pos ~= nil then
				TaskStartScenarioAtPosition(PlayerPedId(), "prop_human_muscle_chin_ups", info.start_pos.x, info.start_pos.y, info.start_pos.z, info.start_heading, 0, 0, 0)
			else
				TaskStartScenarioInPlace(PlayerPedId(), "prop_human_muscle_chin_ups", 0, true)
			end
			Citizen.Wait(1000)
			while needRest < 60 and IsPedUsingAnyScenario(PlayerPedId()) do
				needRest = needRest + 1
				TriggerEvent('esx_status:add', 'strength', Config.chinStrength)
				local playerData = ESX.GetPlayerData()
				Citizen.Wait(1000)
			end
			ClearPedTasksImmediately(PlayerPedId())
		end)
	end
end

function doPushups()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы начать ~g~отжиматься')

	if IsControlJustPressed(0, Keys['E']) then
		local animDict = 'amb@world_human_push_ups@male@base'
		local animName = 'base'

		RequestAnimDict(animDict)
		while not HasAnimDictLoaded(animDict) do
			Citizen.Wait(100)
		end

		StartTraining(function() -- onStart
		        TaskPlayAnim(PlayerPedId(), animDict, animName, 8.0, 8.0, -1, 1, 0.0, false, false, false);
			Citizen.Wait(1000)
			while needRest < 60 and IsEntityPlayingAnim(PlayerPedId(), animDict, animName, 3)  do
				TriggerEvent('esx_status:add', 'endurance', Config.pushStamina)
				needRest = needRest + 1
				Citizen.Wait(1000)
			end
			ClearPedTasks(PlayerPedId())
		end)
	end
end

function doYoga()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы ~g~заниматься йогой')

	if IsControlJustPressed(0, Keys['E']) then

		StartTraining(function() -- onStart
			TaskStartScenarioInPlace(PlayerPedId(), "world_human_yoga", 0, true)
			Citizen.Wait(1000)
			while needRest < 30 and IsPedUsingAnyScenario(PlayerPedId()) do
				TriggerEvent('esx_status:add', 'endurance', Config.yogaStamina)
				needRest = needRest + 0.1
				Citizen.Wait(1000)
			end
			ClearPedTasksImmediately(PlayerPedId())
		end)
	end
end

function doSitups()
	hintToDisplay('Нажмите ~INPUT_CONTEXT~ чтобы начать ~g~качать пресс')

	if IsControlJustPressed(0, Keys['E']) then
		local animDict = 'amb@world_human_sit_ups@male@base'
		local animName = 'base'

		RequestAnimDict(animDict)
		while not HasAnimDictLoaded(animDict) do
			Citizen.Wait(100)
		end

		StartTraining(function() -- onStart
		        TaskPlayAnim(PlayerPedId(), animDict, animName, 8.0, 8.0, -1, 1, 0.0, false, false, false);
			Citizen.Wait(1000)
			while needRest < 60 and IsEntityPlayingAnim(PlayerPedId(), animDict, animName, 3) do
				TriggerEvent('esx_status:add', 'endurance', Config.situpsStamina)
				needRest = needRest + 1
				Citizen.Wait(1000)
			end
			ClearPedTasks(PlayerPedId())
		end)
	end
end

function OpenGymMenu()
    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default', GetCurrentResourceName(), 'gym_menu',
        {
            title    = 'Тренажерка',
            elements = {
				{label = 'Магазин', value = 'shop'},
--				{label = 'Часы работы', value = 'hours'},
				{label = 'Абонемент', value = 'ship'},
            }
        },
        function(data, menu)
            if data.current.value == 'shop' then
				OpenGymShopMenu()
--[[
            elseif data.current.value == 'hours' then
				ESX.UI.Menu.CloseAll()

				ESX.ShowNotification("Мы открыты ~g~24~w~ часа в сутки. Приходите еще!")
]]--
            elseif data.current.value == 'ship' then
				OpenGymShipMenu()
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function OpenGymShopMenu()
    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default', GetCurrentResourceName(), 'gym_shop_menu',
        {
            title    = 'Спортпит',
            elements = {
				{label = 'Протеиновый коктейль ($6)', value = 'protein_shake'},
				{label = 'Вода ($1)', value = 'water'},
				{label = 'Спортивное питание ($2)', value = 'sportlunch'},
				{label = 'Powerade ($4)', value = 'powerade'},
				-- {label = 'Повязки ($50)', value = 'bandage'},
            }
        },
        function(data, menu)
            if data.current.value == 'protein_shake' then
				TriggerServerEvent('esx_gym:buyProteinshake')
            elseif data.current.value == 'water' then
				TriggerServerEvent('esx_gym:buyWater')
            elseif data.current.value == 'sportlunch' then
				TriggerServerEvent('esx_gym:buySportlunch')
            elseif data.current.value == 'powerade' then
				TriggerServerEvent('esx_gym:buyPowerade')
            elseif data.current.value == 'bandage' then
				TriggerServerEvent('esx_gym:buyBandage')
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function OpenGymShipMenu()
    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default', GetCurrentResourceName(), 'gym_ship_menu',
        {
            title    = 'Абонемент',
            elements = {
				{label = 'Абонемент ($'..tostring(Config.MembershipPrice)..')', value = 'membership'},
            }
        },
        function(data, menu)
            if data.current.value == 'membership' then
				TriggerServerEvent('esx_gym:buyMembership')

				ESX.UI.Menu.CloseAll()
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function OpenBikeMenu()
    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default', GetCurrentResourceName(), 'bike_menu',
        {
            title    = 'Аренда велосипедовы',
            elements = {
				{label = 'BMX ($50)', value = 'bmx'},
				{label = 'Cruiser ($50)', value = 'cruiser'},
				{label = 'Fixter ($50)', value = 'fixter'},
				{label = 'Scorcher ($50)', value = 'scorcher'},
            }
        },
        function(data, menu)
            if data.current.value == 'bmx' then
				TriggerServerEvent('esx_gym:hireBmx')
				TriggerEvent('esx:spawnVehicle', "bmx")

				ESX.UI.Menu.CloseAll()
            elseif data.current.value == 'cruiser' then
				TriggerServerEvent('esx_gym:hireCruiser')
				TriggerEvent('esx:spawnVehicle', "cruiser")

				ESX.UI.Menu.CloseAll()
            elseif data.current.value == 'fixter' then
				TriggerServerEvent('esx_gym:hireFixter')
				TriggerEvent('esx:spawnVehicle', "fixter")

				ESX.UI.Menu.CloseAll()
            elseif data.current.value == 'scorcher' then
				TriggerServerEvent('esx_gym:hireScorcher')
				TriggerEvent('esx:spawnVehicle', "scorcher")

				ESX.UI.Menu.CloseAll()
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end
