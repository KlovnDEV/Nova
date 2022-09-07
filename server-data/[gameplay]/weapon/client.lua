ESX = nil
local currentWeapon = nil
local ammoCount = {-1, -1}

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end

	while true do
		local ped = PlayerPedId()
		local weapon = GetSelectedPedWeapon(ped)
		local retval, ammoClip = GetAmmoInClip(ped, weapon)
		local ammoWeapon = GetAmmoInPedWeapon(ped, weapon) - ammoClip

		if currentWeapon == weapon and ammoClip < ammoCount[1] or ammoWeapon < ammoCount[2] then
			TriggerServerEvent('weapon:updateAmmo', weapon, ammoClip, ammoWeapon)
		end

		currentWeapon = weapon
		ammoCount = { ammoClip, ammoWeapon }

		Citizen.Wait(50)
	end
end)


RegisterNetEvent('weapon:setWeapon')
AddEventHandler('weapon:setWeapon', function(weaponHash, ammoClip, ammoWeapon)
--	print('setWeapon', weaponHash, ammoClip, ammoWeapon)
	local ped = PlayerPedId()

	if weaponHash then
		GiveWeaponToPed(ped, weaponHash, ammoClip, false, false)
		SetPedAmmo(ped, weaponHash, ammoClip + ammoWeapon)
	else
		RemoveAllPedWeapons(ped)
--		RemoveWeaponFromPed(ped, GetHashKey('WEAPON_PISTOL'))
--		SetPedAmmo(ped, GetHashKey('WEAPON_PISTOL'), 0)
	end
end)
