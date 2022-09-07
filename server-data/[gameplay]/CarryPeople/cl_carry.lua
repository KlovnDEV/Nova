ESX                     = nil

Citizen.CreateThread(function()
  while ESX == nil do
    TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
    Citizen.Wait(0)
  end
end)

local carryingBackInProgress = false
local carried = false
local carryType = "shoulder"

local carryTypes = {
	["shoulder"] = {
		["source"] = {
			["dict"] = "missfinale_c2mcs_1",
			["anim"] = "fin_c2_mcs_1_camman",
			["bone"] = 0,
			["pos"] = { ["x"] = 0.27, ["y"] = 0.16, ["z"] = 0.63 },
			["rot"] = { ["x"] = 0.5, ["y"] = 0.5, ["z"] = 0.0 },
		},

		["target"] = {
			["dict"] = "nm",
			["anim"] = "firemans_carry",
		},
	},
	["forward"] = {
		["source"] = {
			["dict"] = "anim@heists@box_carry@",
			["anim"] = "idle",
			["bone"] = 9816,
			["pos"] = { ["x"] = -0.315, ["y"] = 0.18, ["z"] = 0.08 },
			["rot"] = { ["x"] = 0.9, ["y"] = 0.3, ["z"] = -80.0 },
		},

		["target"] = {
			["dict"] = "anim@amb@clubhouse@boss@female@",
			["anim"] = "base",
		},
	},
}

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(100)
		if carried == true then
			if not IsEntityPlayingAnim(PlayerPedId(), carryTypes[carryType].target.dict, carryTypes[carryType].target.anim, 3) then
				TaskPlayAnim(PlayerPedId(), carryTypes[carryType].target.dict, carryTypes[carryType].target.anim, 8.0, -8.0, -1, 33, 0, false, false, false)
			end
		elseif carryingBackInProgress then
			if not IsEntityPlayingAnim(PlayerPedId(), carryTypes[carryType].source.dict, carryTypes[carryType].source.anim, 3) then
				TaskPlayAnim(PlayerPedId(), carryTypes[carryType].source.dict, carryTypes[carryType].source.anim, 8.0, -8.0, -1, 49, 0, false, false, false)
			end
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(0)
		if (carried or carryingBackInProgress) and IsControlJustPressed(0, 73) then -- X
                	StopCarry()
		end
	end
end)

function StopCarry()
	if carried then
		local me = GetPlayerServerId(PlayerId())
		TriggerServerEvent("cmg2_animations:stop", me)
		local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
		if closestPlayer > 0 and closestDistance < 3.0 then
			target = GetPlayerServerId(closestPlayer)
			TriggerServerEvent("cmg2_animations:stop",target)
		end
	elseif carryingBackInProgress then
		carryingBackInProgress = false
		ClearPedSecondaryTask(GetPlayerPed(-1))
		DetachEntity(GetPlayerPed(-1), true, false)
		local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
		if closestPlayer > 0 and closestDistance < 3.0 then
			target = GetPlayerServerId(closestPlayer)
			TriggerServerEvent("cmg2_animations:stop",target)
		end
	end
end

function Carry()
	print("carrying")
	if not carryingBackInProgress then
		local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()

		if closestPlayer > 0 and closestDistance < 3.0 then
			target = GetPlayerServerId(closestPlayer)

			ESX.TriggerServerCallback('esx_request:request', function(res)
				if res == true then
					carryingBackInProgress = true
					print("triggering cmg2_animations:sync")
					TriggerServerEvent('cmg2_animations:sync', target, carryType)
				end
			end, target, "разрешение поднять вас")
		else
			ESX.ShowNotification('Рядом никого нет')
		end
	else
		StopCarry()
	end
end

-- RegisterCommand("carry",function(source, args)
--	Carry()
-- end,false)

RegisterNetEvent('cmg2_animations:syncTarget')
AddEventHandler('cmg2_animations:syncTarget', function(target, ctp)
	carryType = ctp
	local targetPed = GetPlayerPed(GetPlayerFromServerId(target))
	carryingBackInProgress = true
	print("triggered cmg2_animations:syncTarget")

	local ct = carryTypes[carryType].source

	RequestAnimDict(carryTypes[carryType].target.dict)

	while not HasAnimDictLoaded(carryTypes[carryType].target.dict) do
					Citizen.Wait(100)
	end

	AttachEntityToEntity(PlayerPedId(), targetPed, ct.bone, ct.pos.x, ct.pos.y, ct.pos.z, ct.rot.x, ct.rot.y, ct.rot.z, false, false, false, false, 2, false)
	TaskPlayAnim(PlayerPedId(), carryTypes[carryType].target.dict, carryTypes[carryType].target.anim, 8.0, -8.0, -1, 33, 0, false, false, false)
	carried = true
end)

RegisterNetEvent('cmg2_animations:syncMe')
AddEventHandler('cmg2_animations:syncMe', function(ctp)
	carryType = ctp
	print("triggered cmg2_animations:syncMe")

	RequestAnimDict(carryTypes[carryType].source.dict)

	while not HasAnimDictLoaded(carryTypes[carryType].source.dict) do
					Citizen.Wait(100)
	end

	Wait(500)
	TaskPlayAnim(PlayerPedId(), carryTypes[carryType].source.dict, carryTypes[carryType].source.anim, 8.0, -8.0, -1, 49, 0, false, false, false)
end)

RegisterNetEvent('cmg2_animations:cl_stop')
AddEventHandler('cmg2_animations:cl_stop', function()
	carryingBackInProgress = false
	carried = false
	ClearPedSecondaryTask(GetPlayerPed(-1))
	DetachEntity(GetPlayerPed(-1), true, false)
end)

AddEventHandler('CarryPeople:carry', function(ct)
  if ct ~= nil then
		carryType = ct
	else
		carryType = "shoulder"
	end

	print(carryType)

	if carried == true then
		StopCarry()
	else
		Carry()
	end
end)
