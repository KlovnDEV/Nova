Citizen.CreateThread(function()
	while true do
		if IsControlJustReleased(0, 243) and (CURRENT_SCREEN == nil or CURRENT_SCREEN == 'playerinfo') then -- TILDE

			if not PLAYER_INFO_SHOWN then
				OpenScreen('playerinfo')
				SendNUIMessage({
					query = 'playerinfo/show',
				})
				PLAYER_INFO_SHOWN = true
			else
				CloseScreen('playerinfo')
				SendNUIMessage({
					query = 'playerinfo/hide',
				})
				PLAYER_INFO_SHOWN = false
			end
		end

		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()
	while LocalPlayer.state.money == nil do
		Citizen.Wait(1000)
	end

	while true do
		local bank = LocalPlayer.state.money.bank or 0
		local cash = LocalPlayer.state['money:cash'] or 0
		local status = LocalPlayer.state['status'] or {}

		SendNUIMessage({
			query = 'playerinfo/update',
			bank = bank,
			cash = cash,
			phone = LocalPlayer.state.phone,
		})

		local skills = {
			{
				name = "strength",
				label = "Сила",
				value = 0,
			},
			{
				name = "agility",
				label = "Ловкость",
				value = 0,
			},
			{
				name = "endurance",
				label = "Выносливость",
				value = 0,
			},
			{
				name = "intelligence",
				label = "Интеллект",
				value = 0,
			},

		}

		for k,skill in pairs(skills) do
			local st = status[skill.name]
			if st then
				skill.value = st
			end
		end

		SendNUIMessage({
			query = 'playerinfo/updateSkills',
			skills = skills,
		})

		Citizen.Wait(1000)
	end
end)
