local firstSpawn = true

AddEventHandler("playerSpawned", function ()
	if firstSpawn then
		ShutdownLoadingScreenNui()
		firstSpawn = false
	end

	local ypos = 0.05
	local indent = 0.04

	SetHudComponentPosition(6, 0, -(ypos + indent*2) )
	SetHudComponentPosition(7, 0, -(ypos + indent*1) )
	SetHudComponentPosition(9, 0, -(ypos + indent*0) )
end)

AddEventHandler('onClientMapStart', function()
  exports.spawnmanager:setAutoSpawn(false)
  exports.spawnmanager:forceRespawn()
end)

Citizen.CreateThread(function()
    while true do
      Citizen.Wait(100)
      SetPlayerHealthRechargeMultiplier(PlayerId(), 0)
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(50)
        if IsEntityDead(PlayerPedId()) then
             StartScreenEffect("DeathFailOut", 0, 0)
         else
             if AnimpostfxIsRunning("DeathFailOut") then
                 StopScreenEffect("DeathFailOut")
             end
         end
     end
 end)

-- отключаем городские службы
for i = 1, 14 do
	if i ~= 11 then
		EnableDispatchService(i, not DisableServices)
	end
end

Citizen.CreateThread(function()
	while true do
		local playerId = PlayerId()
		local playerPed = GetPlayerPed(-1)

		-- скрываем прицел
		if HideScope then
			HideHudComponentThisFrame(14)
		end

		-- скрываем дефолтный счётчик наличных
		if HideCash then
			HideHudComponentThisFrame(3)
			HideHudComponentThisFrame(4)
		end

		if DisableLooting then
			-- отключаем лут из авто
			DisablePlayerVehicleRewards(playerId)

			-- отключаем лут с педов
			RemoveAllPickupsOfType(`PICKUP_WEAPON_CARBINERFILE`)
			RemoveAllPickupsOfType(`PICKUP_WEAPON_PISTOL`)
			RemoveAllPickupsOfType(`PICKUP_WEAPON_PUMPSHOTGUN`)
		end

		-- удаляем авто копов-npc
		if DisableNPCCops then
			local pos = GetEntityCoords(playerPed)
			ClearAreaOfCops(pos.x, pos.y, pos.z, 400.0)
		end

		-- устанавливаем урон оружия
		for hash, modifier in pairs(WeaponDamage) do
			SetWeaponDamageModifierThisFrame(hash, modifier)
		end

		-- снижаем количество транспорта (значения в конфиге)
		SetVehicleDensityMultiplierThisFrame(Amounts.Traffic)
		SetPedDensityMultiplierThisFrame(Amounts.Pedestrian)
		SetRandomVehicleDensityMultiplierThisFrame(Amounts.Traffic)
		SetParkedVehicleDensityMultiplierThisFrame(Amounts.Parked)
		SetScenarioPedDensityMultiplierThisFrame(Amounts.Pedestrian, Amounts.Pedestrian)

		Citizen.Wait(0)
	end
end)
