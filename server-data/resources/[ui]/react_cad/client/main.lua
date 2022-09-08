ESX = nil
BLOCK_KEYS = false

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

RegisterNetEvent('react_cad:update_data')
AddEventHandler('react_cad:update_data', function(params)
    params.updateData = true
    SendNUIMessage(params)
end)


RegisterNetEvent('react_cad:menu_show')
AddEventHandler('react_cad:menu_show', function(params)

    params.showMenu = true
    SendNUIMessage(params)

    SetNuiFocus(true, true)
    SetNuiFocusKeepInput(true)

    BLOCK_KEYS = true
end)

RegisterNetEvent('react_cad:menu_hide')
AddEventHandler('react_cad:menu_hide', function(elements, position)
	SendNUIMessage({
	    showMenu = false,
	})
	SetNuiFocus(false, false)

	BLOCK_KEYS = false
end)

RegisterNetEvent('react_cad:showNotification')
AddEventHandler('react_cad:showNotification', function(text, type)
	showNotification(text, type)
end)

function showNotification(text, type)
	SendNUIMessage({ showMessage = true, text = tostring(text), type = type or 'warn' })
end

Citizen.CreateThread(function()
	while true do
		if BLOCK_KEYS then
				DisableAllControlActions(0)

			if IsDisabledControlJustReleased(0, 25) then  --right mouse
				TriggerEvent('react_cad:menu_hide')
			end
--[[		else
			if IsControlJustReleased(0, 25) then  --right mouse
				TriggerServerEvent('react_cad:menu_show')
			end
]]--
		end

		Citizen.Wait(0)
	end
end)

function takePhotoStart(cb)
    if not DoesCamExist(cam) then
        cam = CreateCamWithParams('DEFAULT_SCRIPTED_CAMERA', 602.33, 0.09, 88.47, 0.0, 0.0, 160.0, 40.0, true, 2)
    end

    RenderScriptCams(true, true, 0, true, true)
    SetCamActive(cam, true)
	cb('{}')
end

function takePhotoEnd(data, cb)
    if data.args and data.args.photo then
        if GetResourceState('screenshot-basic') == "started" then
            exports['screenshot-basic']:requestScreenshotUpload(data.args.url, 'dataurl', { asDataUrl = true, encoding = "jpg", quality = 90, width = 1280, height = 720 }, function(data)
                local resp = json.decode(data)
                local url = resp.url
                cb(url)
            end)
        else
            ESX.Error('screenshot-basic not started!')
        end
    end

    SetCamActive(cam, false)
    RenderScriptCams(false, true, 1000, true, true)
    cam = nil
end

RegisterNUICallback('query_api', function(data, cb)
	if data.cmd == "takePhotoStart" then
		takePhotoStart(cb)
	end

	if data.cmd == "takePhotoEnd" then
		takePhotoEnd(data, cb)
	end

	if data.cmd == "cad/jobs/hire" then


		local ped, distance = ESX.Game.GetClosestPed(coords)
--		local ped = PlayerPedId()
--		local distance = 2

		if distance > 3 then
			SendNUIMessage({ showMessage = true, type = 'error', text = 'Рядом никого нет' })
			return
		end

		local player = NetworkGetPlayerIndexFromPed(ped)

		if player > 0 then
			data.args.target = GetPlayerServerId(player)
		else
			SendNUIMessage({ showMessage = true, type = 'error', text = 'Невозможно нанять' })
			return
		end

	end

	ESX.TriggerServerCallback('react_cad:queryApi', function(res)
		cb(res)
	end, data)
end)


RegisterNUICallback('jobs_change_grade', function(data, cb)
	TriggerServerEvent('react_cad:setEmployeeGrade', data.role, data.identifier, tonumber(data.grade))
	cb('ok')
        updateData()
end)

RegisterNUICallback('jobs_change_salary', function(data, cb)
	TriggerServerEvent('react_cad:setJobSalary', data.role, tonumber(data.grade), tonumber(data.salary))
	cb('ok')
        updateData()
end)

function updateData()
    TriggerServerEvent('react_cad:update_data')
end
