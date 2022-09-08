local cam, isCameraActive
local zoomOffset, camOffset, heading = 0.0, 0.0, 90.0
local startAngle, zoomValue = 0.0, 0.0

function OpenMenu(submitCb, cancelCb, restrict)
	local playerPed = PlayerPedId()

	TriggerEvent('skin:getSkin', function(skin)
		lastSkin = skin
	end)

	TriggerEvent('skin:getData', function(components, maxVals)
		local elements    = {}
		local _components = {}

		-- Restrict menu
		if restrict == nil then
			for k,v in pairs(components) do
				_components[k] = v
			end
		else
			for k,v in pairs(components) do
				local found = false

				for j=1, #restrict, 1 do
					if k == restrict[j] then
						found = true
						break
					end
				end

				if found then
					table.insert(_components, components[i])
				end
			end
		end

		-- Insert elements
		for k,v in pairs(_components) do
			local value       = v.value
			local componentId = v.componentId

			if componentId == 0 then
				value = GetPedPropIndex(playerPed, v.componentId)
			end

			local data = {
				label     = v.label,
				name      = v.name,
				value     = value,
				min       = v.min,
				max       = maxVals[v.name],
				textureof = v.textureof,
				zoomOffset= v.zoomOffset,
				camOffset = v.camOffset or 0.65,
				type      = 'slider'
			}

			table.insert(elements, data)
		end

		CreateSkinCam()
		zoomOffset = 0.5
		camOffset = 0.65

		ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'skin', {
			title    = _U('skin_menu'),
			align    = 'top-left',
			elements = elements
		}, function(data, menu)
			TriggerEvent('skin:getSkin', function(skin)
				lastSkin = skin
			end)

			submitCb(data, menu)
			DeleteSkinCam()
		end, function(data, menu)
			menu.close()
			DeleteSkinCam()
			TriggerEvent('skin:loadSkin', lastSkin)

			if cancelCb ~= nil then
				cancelCb(data, menu)
			end
		end, function(data, menu)

			local skin, components, maxVals

			TriggerEvent('skin:getSkin', function(getSkin)
				skin = getSkin
			end)

			zoomOffset = data.current.zoomOffset
			camOffset = data.current.camOffset

			if skin[data.current.name] ~= data.current.value then
				-- Change skin element
				TriggerEvent('skin:change', data.current.name, data.current.value)
				print('skin:change', data.current.name, data.current.value)

				-- Update max values
				TriggerEvent('skin:getData', function(comp, max)
					components, maxVals = comp, max
				end)

				local newData = {}

				for i=1, #elements, 1 do
					newData = {}
					newData.max = maxVals[elements[i].name]

					if elements[i].textureof ~= nil and data.current.name == elements[i].textureof then
						newData.value = 0
					end

					menu.update({name = elements[i].name}, newData)
				end

				menu.refresh()
			end
		end, function(data, menu)
			DeleteSkinCam()
		end)
	end)
end

function CreateSkinCam()
	startAngle = GetGameplayCamRot(0).z-GetEntityRotation(PlayerPedId(),0).z-90

	if not DoesCamExist(cam) then
		cam = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
	end

	local coords = GetEntityCoords(PlayerPedId())
	SetCamCoord(cam, coords.x, coords.y, coords.z)

	SetCamActive(cam, true)
	RenderScriptCams(true, true, 500, true, true)

	isCameraActive = true
--	SetCamRot(cam, 0.0, 0.0, 270.0, true)
--	SetEntityHeading(playerPed, 90.0)
end

function DeleteSkinCam()
	isCameraActive = false
	SetCamActive(cam, false)
	RenderScriptCams(false, true, 500, true, true)
	cam = nil
end


Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if isCameraActive then
			DisableControlAction(2, 30, true)
			DisableControlAction(2, 31, true)
			DisableControlAction(2, 32, true)
			DisableControlAction(2, 33, true)
			DisableControlAction(2, 34, true)
			DisableControlAction(2, 35, true)
			DisableControlAction(0, 25, true) -- Input Aim
			DisableControlAction(0, 24, true) -- Input Attack

			local playerPed = PlayerPedId()
			local coords    = GetEntityCoords(playerPed)

			local angle = heading * math.pi / 180.0
			local theta = {
				x = math.cos(angle),
				y = math.sin(angle)
			}

			local pos = {
				x = coords.x + ((zoomValue+zoomOffset) * theta.x),
				y = coords.y + ((zoomValue+zoomOffset) * theta.y)
			}

			local angleToLook = heading - 140.0
			if angleToLook > 360 then
				angleToLook = angleToLook - 360
			elseif angleToLook < 0 then
				angleToLook = angleToLook + 360
			end

			angleToLook = angleToLook * math.pi / 180.0
			local thetaToLook = {
				x = math.cos(angleToLook),
				y = math.sin(angleToLook)
			}

			local posToLook = {
				x = coords.x + ((zoomValue+zoomOffset) * thetaToLook.x),
				y = coords.y + ((zoomValue+zoomOffset) * thetaToLook.y)
			}

			SetCamCoord(cam, pos.x, pos.y, coords.z + camOffset)
			PointCamAtCoord(cam, posToLook.x, posToLook.y, coords.z + camOffset)

			ESX.ShowHelpNotification(_U('use_rotate_view'))
		else
			Citizen.Wait(500)
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if isCameraActive then
			--[[
			if IsControlPressed(0, 63) then
				angle = angle - 1
			elseif IsControlPressed(0, 9) then
				angle = angle + 1
			end
			]]--
			BlockWeaponWheelThisFrame()

			local angle = GetGameplayCamRot(0).z - startAngle

			if IsControlPressed(24, 14) then --INPUT_WEAPON_WHEEL_NEXT
				zoomValue = zoomValue + 0.2
			elseif IsControlPressed(24, 15) then --INPUT_WEAPON_WHEEL_PREV
				zoomValue = zoomValue - 0.2
			end

			if zoomValue < 0 then
				zoomValue = 0
			elseif zoomValue > 1 then
				zoomValue = 1
			end

			if angle > 360 then
				angle = angle - 360
			elseif angle < 0 then
				angle = angle + 360
			end

			heading = angle + 0.0
		else
			Citizen.Wait(500)
		end
	end
end)

function OpenSaveableMenu(submitCb, cancelCb, restrict)
	TriggerEvent('skin:getSkin', function(skin)
		lastSkin = skin
	end)

	OpenMenu(function(data, menu)
		menu.close()
		DeleteSkinCam()

		TriggerEvent('skin:getSkin', function(skin)
			TriggerServerEvent('skin:save', skin)

			if submitCb ~= nil then
				submitCb(data, menu)
			end
		end)

	end, cancelCb, restrict)
end

RegisterNetEvent('skin:openMenu')
AddEventHandler('skin:openMenu', function(submitCb, cancelCb)
	OpenMenu(submitCb, cancelCb, nil)
end)

RegisterNetEvent('skin:openRestrictedMenu')
AddEventHandler('skin:openRestrictedMenu', function(submitCb, cancelCb, restrict)
	OpenMenu(submitCb, cancelCb, restrict)
end)

RegisterNetEvent('skin:openSaveableMenu')
AddEventHandler('skin:openSaveableMenu', function(submitCb, cancelCb)
	OpenSaveableMenu(submitCb, cancelCb, nil)
end)

RegisterNetEvent('skin:openSaveableRestrictedMenu')
AddEventHandler('skin:openSaveableRestrictedMenu', function(submitCb, cancelCb, restrict)
	OpenSaveableMenu(submitCb, cancelCb, restrict)
end)
