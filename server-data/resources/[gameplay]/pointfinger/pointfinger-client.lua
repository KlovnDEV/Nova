local mp_pointing = false

local function startPointing()
	local ped = PlayerPedId()
	mp_pointing = true

	RequestAnimDict("anim@mp_point")
	while not HasAnimDictLoaded("anim@mp_point") do
		Citizen.Wait(1)
	end

	SetPedCurrentWeaponVisible(ped, 0, 1, 1, 1)
	SetPedConfigFlag(ped, 36, 1)
	TaskMoveNetwork(ped, "task_mp_pointing", 0.5, 0, "anim@mp_point", 24)
	RemoveAnimDict("anim@mp_point")
end

local function stopPointing()
	local ped = PlayerPedId()
	Citizen.InvokeNative(0xD01015C7316AE176, ped, "Stop")

	if not IsPedInjured(ped) then
		ClearPedSecondaryTask(ped)
	end

	if not IsPedInAnyVehicle(ped, 1) then
		SetPedCurrentWeaponVisible(ped, 1, 1, 1, 1)
	end

	SetPedConfigFlag(ped, 36, 0)
	ClearPedSecondaryTask(PlayerPedId())
	mp_pointing = false
end

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		local onFoot = IsPedOnFoot(PlayerPedId())

		if IsControlJustPressed(0, 29) and not mp_pointing and onFoot then
			startPointing()
			Citizen.Wait(700)
		elseif IsControlJustPressed(0, 29) and mp_pointing then
			stopPointing()
			Citizen.Wait(700)
		elseif not onFoot and mp_pointing then
			stopPointing()
			Citizen.Wait(700)
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)

		if Citizen.InvokeNative(0x921CE12C489C4C41, PlayerPedId()) and not mp_pointing then
			stopPointing()
		end
		if Citizen.InvokeNative(0x921CE12C489C4C41, PlayerPedId()) then
			if not IsPedOnFoot(PlayerPedId()) then
				stopPointing()
			else
				local ped = PlayerPedId()
				local camPitch = GetGameplayCamRelativePitch()
				if camPitch < -70.0 then
					camPitch = -70.0
				elseif camPitch > 42.0 then
					camPitch = 42.0
				end
				camPitch = (camPitch + 70.0) / 112.0

				local camHeading = GetGameplayCamRelativeHeading()
				local cosCamHeading = Cos(camHeading)
				local sinCamHeading = Sin(camHeading)
				if camHeading < -180.0 then
					camHeading = -180.0
				elseif camHeading > 180.0 then
					camHeading = 180.0
				end
				camHeading = (camHeading + 180.0) / 360.0

				local blocked = 0
				local nn = 0

				local coords = GetOffsetFromEntityInWorldCoords(ped, (cosCamHeading * -0.2) - (sinCamHeading * (0.4 * camHeading + 0.3)), (sinCamHeading * -0.2) + (cosCamHeading * (0.4 * camHeading + 0.3)), 0.6)
				local ray = Cast_3dRayPointToPoint(coords.x, coords.y, coords.z - 0.2, coords.x, coords.y, coords.z + 0.2, 0.4, 95, ped, 7);
				nn,blocked,coords,coords = GetRaycastResult(ray)

				SetTaskPropertyFloat(ped, "Pitch", camPitch)
				SetTaskPropertyFloat(ped, "Heading", camHeading * -1.0 + 1.0)
				SetTaskPropertyBool(ped, "isBlocked", blocked)
				SetTaskPropertyBool(ped, "isFirstPerson", Citizen.InvokeNative(0xEE778F8C7E1142E2, Citizen.InvokeNative(0x19CAFA3C87F7C2FF)) == 4)

			end
		end
	end
end)

local canHandsUp = true

AddEventHandler('handsup:toggle', function(param)
	canHandsUp = param
end)

Citizen.CreateThread(function()
	local handsup = false

	while true do
		Citizen.Wait(0)

		if canHandsUp then
			if IsControlJustReleased(0, 289) then
				local playerPed = PlayerPedId()

				RequestAnimDict('random@mugging3')
				while not HasAnimDictLoaded('random@mugging3') do
					Citizen.Wait(100)
				end

				if handsup then
					handsup = false
					ClearPedSecondaryTask(playerPed)
					TriggerServerEvent('esx_thief:update', handsup)
					Citizen.Wait(500)
				else
					handsup = true
					TaskPlayAnim(playerPed, 'random@mugging3', 'handsup_standing_base', 6.0, -6.0, -1, 49, 0, 0, 0, 0)
					TriggerServerEvent('esx_thief:update', handsup)
					Citizen.Wait(500)
				end
			end
		end
	end
end)
