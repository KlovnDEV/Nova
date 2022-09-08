ESX.Health = {}

ESX.Health.Get = function()
	local health = GetEntityHealth(PlayerPedId())
	if health < 100 then
		return 0
	end

	return health - 100
end

ESX.Health.Set = function(value)
	assert(value ~= nil)

	if value > 0 then
		value = value + 100
	end

	if value > 200 then
		value = 200
	end

	SetEntityHealth(PlayerPedId(), value)
end

ESX.Health.Heal = function(amount)
	if not amount then
		amount = 100
	end

	local health = ESX.Health.Get()
	local newHealth = math.min(100, math.floor(health + amount))
	ESX.Health.Set(newHealth)
end

ESX.Health.Revive = function(coords, heading)

	ped = GetPlayerPed(-1)

	if not coords then
		coords = GetEntityCoords(ped)
	end

	if not heading then
		heading = 0.0
	end

	SetEntityCoordsNoOffset(ped, coords.x, coords.y, coords.z, false, false, false, true)
	SetPlayerInvincible(ped, false)
	NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, heading, true, false)
	TriggerEvent('playerSpawned', coords.x, coords.y, coords.z)
	ClearPedBloodDamage(ped)

	ESX.UI.Menu.CloseAll()
end

RegisterNetEvent('esx:revive')
AddEventHandler('esx:revive', function()
	ESX.Health.Revive()
	AnimpostfxStop('DeathFailOut', 0)
end)

RegisterNetEvent('esx:heal')
AddEventHandler('esx:heal', function(amount)
	ESX.Health.Heal(amount)
end)
