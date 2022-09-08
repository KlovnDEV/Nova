ESX = nil

GLOBAL_TXD_COUNTER = 0

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

Citizen.CreateThread(function()

while GetIsLoadingScreenActive() do
--	print('predelay')
	Citizen.Wait(1000)
end

Citizen.Wait(1000)

while true do
	Citizen.Wait(100)

	local coords = GetEntityCoords(PlayerPedId())

	for name, info in pairs(Config.DUI) do
		local dist = getDistance(coords, info.Positions)
		local hasDui = Config.DUI[name].DuiObj ~= nil

		if dist < info.Distance and not hasDui then
--			print('load', name)
			loadDUI(name)
		elseif dist > info.Distance and hasDui then
			if Config.DUI[name].TOL > 0 then
				Config.DUI[name].TOL = Config.DUI[name].TOL - 100
--				print('discharging', name, Config.DUI[name].TOL)
			else
				unloadDUI(name)
--				print('destroy', name)
			end
		elseif dist < info.Distance and hasDui then
			Config.DUI[name].TOL = Config.TimeOfLife
		end
	end
end
end)

function getDistance(playerPos, positions)
	local minDist = 9999.9

	for k, pos in pairs(positions) do
		local dist = #(playerPos-pos)
		if dist < minDist then
			minDist = dist
		end
	end

	return minDist
end


function loadDUI(name)
	local dui = Config.DUI[name]
	assert(dui)

	local duiObj = CreateDui(dui.Url, dui.Width or 800, dui.Height or 600)

	for i = 1, 60 do
		if IsDuiAvailable(duiObj) then
			break
		end

		Citizen.Wait(0)
	end

	if not IsDuiAvailable(duiObj) then
		ESX.Error('DUI unavailable: '..name)
		return
	end

	local handle = GetDuiHandle(duiObj)
--	print(handle)

	local txdName = 'dui_replace_'..tostring(GLOBAL_TXD_COUNTER)
	local txdHandle = CreateRuntimeTxd(txdName)
	GLOBAL_TXD_COUNTER = GLOBAL_TXD_COUNTER + 1

	local runtimeTex = CreateRuntimeTextureFromDuiHandle(txdHandle, name, handle)
	AddReplaceTexture(dui.Txd, dui.Txn, txdName, name)

	Config.DUI[name].DuiObj = duiObj
	Config.DUI[name].TxdName = txdName
	Config.DUI[name].TxdHandle = txdHandle
	Config.DUI[name].Texture = runtimeTex
	Config.DUI[name].Handle = handle
	Config.DUI[name].TOL = Config.TimeOfLife
end

function unloadDUI(name)
	local info = Config.DUI[name]

	if not info.Texture then
		return
	end

	SetStreamedTextureDictAsNoLongerNeeded(Config.DUI[name].TxdName)
	RemoveReplaceTexture(info.Txd, info.Txn)
	DestroyDui(info.DuiObj)

	Config.DUI[name].DuiObj = nil
	Config.DUI[name].Texture = nil
	Config.DUI[name].TxdName = nil
	Config.DUI[name].Handle = nil
end
