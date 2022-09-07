ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function registerTrunk(uid, plate)
	assert(uid ~= nil)
	assert(plate ~= nil)

	local disposable = false

	if uid == 0 then
		uid = plate
		disposable = true
	end

	local inv = ESX.Custom.Inventory.Create('car', uid, false, {
		title = "Багажник",
		maxWeight = 5000,
		actionGroup = 'container',
		disposable = disposable,
		width = 25,
		height = 15,
	})

	return inv
end

ESX.RegisterServerCallback('trunks:registerTrunk', function(source, cb, uid, plate)
	assert(cb)
	assert(uid ~= nil)
	assert(plate ~= nil)

	cb(registerTrunk(uid, plate))
--	local xPlayer = ESX.GetPlayerFromId(source)
end)
