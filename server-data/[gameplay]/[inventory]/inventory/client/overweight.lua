pocketWeight = 0.0
movementSpeed = 1.0
disableOverweight = false

Citizen.CreateThread(function()
	while true do
		if movementSpeed < 0.9 then
			DisableControlAction(0, 22, true) -- Jump
		end

		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()
	while true do
		movementSpeed = 1.0
		while ESX == nil do
			Citizen.Wait(100)
		end

		local pocketWeightLimit = Config.PocketWeightLimit

		if ESX.PlayerData and ESX.PlayerData.skills and ESX.PlayerData.skills.strength then
			pocketWeightLimit = pocketWeightLimit + ESX.PlayerData.skills.strength / 100.0 * Config.StrengthExtraWeight
		end

--[[
		if inventories["player-inventory"] ~= nil then
			for k,v in pairs(inventories["player-inventory"].items) do
				if v.name == "esx_item" and v.extra.name == "bag" then
					pocketWeightLimit = pocketWeightLimit + 10.0
					break
				end
			end
		end
]]--

		if pocketWeight > pocketWeightLimit and not disableOverweight then
			local speed = 1.0 - (pocketWeight-pocketWeightLimit)/10.0
			if speed < 0.1 then
				speed = 0.1
			end
			movementSpeed = speed

			while pocketWeight > pocketWeightLimit*2 do
				SetPedToRagdoll(PlayerPedId(), 5000, 5000, 0, 0, 0, 0)
				Citizen.Wait(1000)
			end
--[[
			local hurt = 0
			if pocketWeight > pocketWeightLimit+30 then
				hurt = 5
			elseif pocketWeight > pocketWeightLimit+20 then
				hurt = 3
			elseif pocketWeight > pocketWeightLimit+10 then
				hurt = 2
			end

			if hurt > 0 then
				local health = GetEntityHealth(PlayerPedId())
				health = health - hurt
				if health < 0 then
					health = 0
				end
				SetEntityHealth(PlayerPedId(), health)
			end
]]--
		else
			movementSpeed = 1.0
		end

		Citizen.Wait(100)
	end
end)

Citizen.CreateThread(function()
	while true do
		SetPedMoveRateOverride(PlayerPedId(), movementSpeed)
		Citizen.Wait(0)
	end
end)

RegisterNetEvent('esx_inventory:_onInventoryUpdate')
AddEventHandler('esx_inventory:_onInventoryUpdate', function(inventory)
	if inventory.category == "player-inventory" then
		pocketWeight = inventory.weight or 0
	end
end)
