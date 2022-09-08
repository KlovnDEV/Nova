local function endsWith(str, ending)
   return ending == "" or str:sub(-#ending) == ending
end

local damageTitles = {
	['trauma-fracture-lleg'] = 'Перелом левой ноги',
	['trauma-fracture-rleg'] = 'Перелом правой ноги',
	['trauma-fracture-larm'] = 'Перелом левой руки',
	['trauma-fracture-rarm'] = 'Перелом правой руки',

	['trauma-dislocation-lleg'] = 'Вывих левой ноги',
	['trauma-dislocation-rleg'] = 'Вывих правой ноги',
	['trauma-dislocation-larm'] = 'Вывих левой руки',
	['trauma-dislocation-rarm'] = 'Вывих правой руки',
}

RegisterNetEvent('nova-ui:player_search')
AddEventHandler('nova-ui:player_search', function(target)
	local xPlayer = ESX.GetPlayerFromId(source)
	local xTarget = ESX.GetPlayerFromId(target)

	assert(xPlayer)
	assert(xTarget)

	TriggerEvent('inventory:openInventories', {
		{ category = "player-inventory", identifier = xPlayer.identifier },
		{ category = "player-inventory", identifier = xTarget.identifier },
	}, source)
end)

function addToDamageStatus(damageStatus, k, v, suffix, bucket)
	if v > 0 and endsWith(k, suffix) then
		if damageStatus[bucket] == nil then
			damageStatus[bucket] = {}
		end

		table.insert(damageStatus[bucket], {
			["name"] = damageTitles[k] or k,
			["description"] = "",
			["icon"] = k
		})
		return true
	end

	return false
end

RegisterNetEvent('nova-ui:player_health')
AddEventHandler('nova-ui:player_health', function(target)
	local xPlayer = ESX.GetPlayerFromId(source)
	local xTarget = ESX.GetPlayerFromId(target)

	assert(xPlayer)
	assert(xTarget)

	if not ESX.Roles.HasRole(xPlayer.identifier, 'ambulance') then
		ESX.Error('Trying to use health check without ambulance role! Identifier: ' .. xPlayer.identifier)
		return
	end

	local identity = ESX.Identity.Get(xTarget.identifier)
	local playerStatus = Player(xTarget.source).state.status

	local targetHealth = GetEntityHealth(GetPlayerPed(xTarget.source))
	if targetHealth > 100 then
		identity['status'] = 0
	else
		identity['status'] = 1
	end

	local damageStatus = {}

	for k,v in pairs(playerStatus) do
		local res = false
		res = res or addToDamageStatus(damageStatus, k, v, "-rarm", "handR")
		res = res or addToDamageStatus(damageStatus, k, v, "-larm", "handL")
		res = res or addToDamageStatus(damageStatus, k, v, "-rleg", "legR")
		res = res or addToDamageStatus(damageStatus, k, v, "-lleg", "legL")
		res = res or addToDamageStatus(damageStatus, k, v, "-head", "head")
		res = res or addToDamageStatus(damageStatus, k, v, "-torso", "torso")
	end


	TriggerClientEvent('nova-ui:showPlayerHealth', xPlayer.source, identity, damageStatus)
end)
