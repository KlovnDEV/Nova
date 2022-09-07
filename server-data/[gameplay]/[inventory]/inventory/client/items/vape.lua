local IsPlayerAbleToVape = false
local FadeIn = false
local FadeOut = false

RegisterNetEvent("Vape:StartVaping")
AddEventHandler("Vape:StartVaping", function(source)
	local ped = GetPlayerPed(-1)
	if DoesEntityExist(ped) and not IsEntityDead(ped) then
		if IsPedOnFoot(ped) or IsPedSittingInAnyVehicle(ped)~= true then
			if IsPlayerAbleToVape == false then
				PlayerIsAbleToVape()
				TriggerEvent("Vape:HelpFadeIn", 0)
				Wait(8000)
				TriggerEvent("Vape:HelpFadeOut", 0)
			else
				ShowNotification("~r~Вам одного мало?")
			end
		end
	else
		ShowNotification("~r~Этим не исправить ситуацию.")
	end
end)

RegisterNetEvent("Vape:StopVaping")
AddEventHandler("Vape:StopVaping", function(source)
	if IsPlayerAbleToVape == true then
		PlayerIsUnableToVape()
	else
	end
end)

RegisterNetEvent("Vape:Drag")
AddEventHandler("Vape:Drag", function()
	if IsPlayerAbleToVape then
		local ped = GetPlayerPed(-1)
		local PedPos = GetEntityCoords(ped)
		local ad = "mp_player_inteat@burger"
		local anim = "mp_player_int_eat_burger"
		if (DoesEntityExist(ped) and not IsEntityDead(ped)) then
			while (not HasAnimDictLoaded(ad)) do
				RequestAnimDict(ad)
			  Wait(1)
			end
			local VapeFail = math.random(1,10594)
			if VapeFail == 1 then
			else
				TaskPlayAnim(ped, ad, anim, 8.00, -8.00, -1, (2 + 16 + 32), 0.00, 0, 0, 0)
				PlaySoundFrontend(-1, "Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS", 1)
			  		Wait(950)
				TriggerServerEvent("eff_smokes", PedToNet(ped))
                      Wait(1800)
                      ClearPedSecondaryTask(ped)
			end
		end
	else
	end
end)

AddEventHandler("Vape:HelpFadeIn", function()
	if FadeIn == false then
		FadeIn = true
		DisplayText = true
		while FadeIn == true do
			if Config.HelpTextStartingAlpha <= 255 then
				Config.HelpTextStartingAlpha = Config.HelpTextStartingAlpha+5
				if Config.HelpTextStartingAlpha >= 255 then
					FadeIn = false
					break
				end
			end
		  Wait(1)
		end
	end
end)
AddEventHandler("Vape:HelpFadeOut", function()
	if FadeOut == false then
		FadeOut = true
		while FadeOut == true do
			if Config.HelpTextStartingAlpha >= 1 then
				Config.HelpTextStartingAlpha = Config.HelpTextStartingAlpha-5
				if Config.HelpTextStartingAlpha <= 0 then
					FadeOut = false
					DisplayText = false
					break
				end
			end
		  Wait(1)
		end
	end
end)

p_smoke_location = {
	20279,
}
p_smoke_particle = "exp_grd_bzgas_smoke"
p_smoke_particle_asset = "core"
RegisterNetEvent("c_eff_smokes")
AddEventHandler("c_eff_smokes", function(c_ped)
	for _,bones in pairs(p_smoke_location) do
		if DoesEntityExist(NetToPed(c_ped)) and not IsEntityDead(NetToPed(c_ped)) then
			createdSmoke = UseParticleFxAssetNextCall(p_smoke_particle_asset)
			createdPart = StartParticleFxLoopedOnEntityBone(p_smoke_particle, NetToPed(c_ped), 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, GetPedBoneIndex(NetToPed(c_ped), bones), 0.5, 0.0, 0.0, 0.0)
			Wait(2800)
			while DoesParticleFxLoopedExist(createdSmoke) do
				StopParticleFxLooped(createdSmoke, 1)
			  Wait(0)
			end
			while DoesParticleFxLoopedExist(createdPart) do
				StopParticleFxLooped(createdPart, 1)
			  Wait(0)
			end
			while DoesParticleFxLoopedExist(p_smoke_particle) do
				StopParticleFxLooped(p_smoke_particle, 1)
			  Wait(0)
			end
			while DoesParticleFxLoopedExist(p_smoke_particle_asset) do
				StopParticleFxLooped(p_smoke_particle_asset, 1)
			  Wait(0)
			end
			Wait(8000)
			RemoveParticleFxFromEntity(NetToPed(c_ped))
			break
		end
	end
end)

Citizen.CreateThread(function()
	while true do
		local ped = GetPlayerPed(-1)
		if IsPlayerAbleToVape then
			if IsControlPressed(0, 38) then
				if IsControlPressed(0, 38) then
                    TriggerEvent("Vape:Drag", 0)
                    TriggerEvent("esx_basicneeds:vape")
				end
			  Wait(4000)
			end
		end
	  Wait(1)
	end
end)

function PlayerIsAbleToVape()
	IsPlayerAbleToVape = true
	local ped = GetPlayerPed(-1)
	local ad = "anim@heists@humane_labs@finale@keycards"
	local anim = "ped_a_enter_loop"

	while (not HasAnimDictLoaded(ad)) do
		RequestAnimDict(ad)
	  Wait(100)
	end
	TaskPlayAnim(ped, ad, anim, 8.00, -8.00, -1, (2 + 16 + 32), 0.00, 0, 0, 0)

	local x,y,z = table.unpack(GetEntityCoords(ped))
	local prop_name = "ba_prop_battle_vape_01"
	VapeMod = CreateObject(GetHashKey(prop_name), x, y, z+0.2,  true,  true, true)
	AttachEntityToEntity(VapeMod, ped, GetPedBoneIndex(ped, 18905), 0.08, -0.00, 0.03, -150.0, 90.0, -10.0, true, true, false, true, 1, true)
end
function PlayerIsEnteringVehicle()
	IsPlayerAbleToVape = false
	local ped = GetPlayerPed(-1)
	local ad = "anim@heists@humane_labs@finale@keycards"
	DeleteObject(VapeMod)
	TaskPlayAnim(ped, ad, "exit", 8.00, -8.00, -1, (2 + 16 + 32), 0.00, 0, 0, 0)
end
function PlayerIsUnableToVape()
	IsPlayerAbleToVape = false
	local ped = GetPlayerPed(-1)
	DeleteObject(VapeMod)
	ClearPedTasks(ped)
	ClearPedSecondaryTask(ped)
end
function ShowNotification( text )
    SetNotificationTextEntry( "STRING" )
    AddTextComponentString( text )
    DrawNotification( false, false )
end

Citizen.CreateThread(function()
	while true do
		if IsPlayerAbleToVape then
			if DisplayText then
				local ped = GetPlayerPed(-1)
				local pedPos = GetEntityCoords(ped)
				ShowNotification("Нажмите ~b~Е~r~ что бы затянуться паром.")
			end
		end
	  Wait(1)
	end
end)
