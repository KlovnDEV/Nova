ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

local DynamicWeather = Config.DynamicWeather

-------------------- DON'T CHANGE THIS --------------------
AvailableWeatherTypes = {
	'EXTRASUNNY',
	'CLEAR',
	'NEUTRAL',
	'SMOG',
	'FOGGY',
	'OVERCAST',
	'CLOUDS',
	'CLEARING',
	'RAIN',
	'THUNDER',
	'SNOW',
	'BLIZZARD',
	'SNOWLIGHT',
	'XMAS',
	'HALLOWEEN',
}
CurrentWeather = "CLEAR"
local baseTime = 0
local timeOffset = 0
local freezeTime = false
local blackout = false
local newWeatherTimer = Config.WeatherDuration

function getWeatherDuration(weather)
	local mult = 1
	if Config.WeatherDurationMult[weather] ~= nil then
		local minmax = Config.WeatherDurationMult[weather]
		if minmax ~= nil then
			if type(minmax) == "number" then
				mult = minmax
			elseif #minmax >= 2 then
				mult = math.random(minmax[1],minmax[2])
			elseif #minmax > 0 then
				mult = minmax[1]
			else
				mult = 1
			end
		end
	end
	return Config.WeatherDuration * mult
end

RegisterServerEvent('es_wsync:requestSync')
AddEventHandler('es_wsync:requestSync', function()
	TriggerClientEvent('es_wsync:updateWeather', -1, CurrentWeather, blackout)
	TriggerClientEvent('es_wsync:updateTime', -1, baseTime, timeOffset, freezeTime)
end)

RegisterServerEvent('es_wsync:freeze_time')
AddEventHandler('es_wsync:freeze_time', function(source)
	-- check for console user
	if source ~= 0 then
		freezeTime = not freezeTime
		if freezeTime then
			TriggerClientEvent('esx:showNotification', source, 'Time is now ~b~frozen~s~.')
		else
			TriggerClientEvent('esx:showNotification', source, 'Time is ~y~no longer frozen~s~.')
		end
	else
		freezeTime = not freezeTime
		if freezeTime then
			print("Time is now frozen.")
		else
			print("Time is no longer frozen.")
		end
	end
end)

RegisterServerEvent('es_wsync:freeze_weather')
AddEventHandler('es_wsync:freeze_weather', function(source)
	if source ~= 0 then
		DynamicWeather = not DynamicWeather
		if not DynamicWeather then
			TriggerClientEvent('esx:showNotification', source, 'Dynamic weather changes are now ~r~disabled~s~.')
		else
			TriggerClientEvent('esx:showNotification', source, 'Dynamic weather changes are now ~b~enabled~s~.')
		end
	else
		DynamicWeather = not DynamicWeather
		if not DynamicWeather then
			print("Weather is now frozen.")
		else
			print("Weather is no longer frozen.")
		end
	end
end)

ESX.RegisterCommand('weather', 'admin', function(xPlayer, args, showError)
	args[1] = args.weatherType

	if xPlayer.source == 0 then
		local validWeatherType = false
		if args[1] == nil then
			print("Invalid syntax, correct syntax is: /weather <weathertype> ")
			return
		else
			local wtype = ""
			for i,wtype in ipairs(AvailableWeatherTypes) do
				if wtype == string.upper(args[1]) then
					validWeatherType = true
					break
				end
			end
			if validWeatherType then
				print("Weather has been updated.")
				CurrentWeather = string.upper(args[1])
				newWeatherTimer = getWeatherDuration(wtype)
				TriggerEvent('es_wsync:requestSync')
			else
				print("Invalid weather type, valid weather types are: \nEXTRASUNNY CLEAR NEUTRAL SMOG FOGGY OVERCAST CLOUDS CLEARING RAIN THUNDER SNOW BLIZZARD SNOWLIGHT XMAS HALLOWEEN ")
			end
		end
	else
		local validWeatherType = false
		if args[1] == nil then
			TriggerClientEvent('chatMessage', xPlayer.source, '', {255,255,255}, '^8Error: ^1Invalid syntax, use ^0/weather <weatherType> ^1instead!')
		else
			if args[1] == "next" then
				NextWeatherStage()
				TriggerClientEvent('esx:showNotification', xPlayer.source, 'Weather will change to: ~y~' .. string.lower(CurrentWeather) .. "~s~.")
				return
			end

			local wtype = ""
			for i,wtype in ipairs(AvailableWeatherTypes) do
				if wtype == string.upper(args[1]) then
					validWeatherType = true
					break
				end
			end
			if validWeatherType then
				TriggerClientEvent('esx:showNotification', xPlayer.source, 'Weather will change to: ~y~' .. string.lower(args[1]) .. "~s~.")
				CurrentWeather = string.upper(args[1])
				newWeatherTimer = getWeatherDuration(wtype)
				TriggerEvent('es_wsync:requestSync')
			else
				TriggerClientEvent('chatMessage', xPlayer.source, '', {255,255,255}, '^8Error: ^1Invalid weather type, valid weather types are: ^0\nEXTRASUNNY CLEAR NEUTRAL SMOG FOGGY OVERCAST CLOUDS CLEARING RAIN THUNDER SNOW BLIZZARD SNOWLIGHT XMAS HALLOWEEN ')
			end
		end
	end

end, true, {help = "Изменить текущую погоду", validate = false, arguments = {
	{name = 'weatherType', help = '"Available types: extrasunny, clear, neutral, smog, foggy, overcast, clouds, clearing, rain, thunder, snow, blizzard, snowlight, xmas & halloween"', type = 'string'}
}})

RegisterServerEvent('es_wsync:blackout')
AddEventHandler('es_wsync:blackout', function(source)
	if source == 0 then
		blackout = not blackout
		if blackout then
			print("Blackout is now enabled.")
		else
			print("Blackout is now disabled.")
		end
	else
		blackout = not blackout
		if blackout then
			TriggerClientEvent('esx:showNotification', source, 'Blackout is now ~b~enabled~s~.')
		else
			TriggerClientEvent('esx:showNotification', source, 'Blackout is now ~r~disabled~s~.')
		end
		TriggerEvent('es_wsync:requestSync')
	end
end)

ESX.RegisterCommand('blackout', 'admin', function(xPlayer, args, showError)
	TriggerEvent('es_wsync:blackout', xPlayer.source)
end, true, {help = "Включить блэкаут", validate = true, arguments = {}})

ESX.RegisterCommand('freeze_time', 'admin', function(xPlayer, args, showError)
	TriggerEvent('es_wsync:freeze_time', xPlayer.source)
end, true, {help = "Остановить погоду", validate = true, arguments = {}})

RegisterServerEvent('es_wsync:set_time')
AddEventHandler('es_wsync:set_time', function(hh, mm, cb)
	hh = tonumber(hh)
	mm = tonumber(mm)

	if mm > 60 or mm < 0 then
		mm = 0
	end

	if hh > 23 or hh < 0 then
		hh = 0
	end

	ShiftToMinute(mm)
	ShiftToHour(hh)
	TriggerEvent('es_wsync:requestSync')

	print(string.format("Time has changed to %02d:%02d.", hh, mm))

	if cb ~= nil then
		cb()
	end
end)

function ShiftToMinute(minute)
	timeOffset = timeOffset - (( ( math.floor(baseTime+timeOffset)/60) % 60 ) - minute ) * 60
end

function ShiftToHour(hour)
	timeOffset = timeOffset - ( ( math.floor((baseTime+timeOffset)/3600) % 24 ) - hour ) * 3600
end

ESX.RegisterCommand('time', 'admin', function(xPlayer, args, showError)

	args[1] = args.hours
	args[2] = args.minutes
	if args[2] == nil and args[1] ~= nil then
		args = string.split(args[1], ":")

	elseif args[1] == nil then
		local hour, minute, second = timeToHMS(baseTime+timeOffset)
		if xPlayer.source == 0 then
			print(string.format("Current time %02i:%02i",hour,minute))
		else
			TriggerClientEvent('esx:showNotification', xPlayer.source, 'Time is: ~y~' .. string.format("%2i:%02i",hour,minute) .. "~s~")
		end

		return
	end

	if xPlayer.source == 0 then
		if tonumber(args[1]) ~= nil and tonumber(args[2]) ~= nil then
			local argh = tonumber(args[1])
			local argm = tonumber(args[2])
			TriggerEvent('es_wsync:set_time', argh, argm)
		else
			print("Invalid syntax, correct syntax is: time <hour> <minute> !")
		end
	elseif xPlayer.source ~= 0 then
		if tonumber(args[1]) ~= nil and tonumber(args[2]) ~= nil then
			local argh = tonumber(args[1])
			local argm = tonumber(args[2])

			TriggerEvent('es_wsync:set_time', argh, argm, function()
				local h, m, _ = timeToHMS(baseTime+timeOffset)
				TriggerClientEvent('esx:showNotification', xPlayer.source, string.format('Time has changed to: ~y~%02d:%02d~s~!', h, m))
			end)
		else
			TriggerClientEvent('chatMessage', xPlayer.source, '', {255,255,255}, '^8Error: ^1Invalid syntax. Use ^0/time <hour> <minute> ^1instead!')
		end
	end

end, true, {help = "Изменить текущее время", validate = false, arguments = {
	{name = 'hours', help = 'Часы от 0 до 23', type = 'string'},
	{name = 'minutes', help = 'Минуты от 0 до 59', type = 'string'}
}})

Citizen.CreateThread(function()
	local currentTimeScale = Config.DayTimeScale
	baseTime = 129600
	local newBaseTime = baseTime

	while true do
		Citizen.Wait(500)
		newBaseTime = baseTime + currentTimeScale / 2.0

		if freezeTime then
			timeOffset = timeOffset + baseTime - newBaseTime
		end

		local h1,_,_ = timeToHMS(baseTime+timeOffset)
		local h2,_,_ = timeToHMS(newBaseTime+timeOffset)
--		print(string.format("%02i:%02i:%02i",h2,m2,s2))

		if h2 >= 6 and h2 < 22 then
			currentTimeScale = Config.DayTimeScale
		else
			currentTimeScale = Config.NightTimeScale
		end

		if h2 ~= h1 then
			TriggerEvent('es_wsync:hour_started', h2)
			TriggerClientEvent('es_wsync:hour_started', -1, h2)
		end

		baseTime = newBaseTime
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(5000)
		TriggerClientEvent('es_wsync:updateTime', -1, baseTime, timeOffset, freezeTime)
	end
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(300000)
		TriggerClientEvent('es_wsync:updateWeather', -1, CurrentWeather, blackout)
	end
end)

Citizen.CreateThread(function()
	while true do
		newWeatherTimer = newWeatherTimer - 1
		Citizen.Wait(60000)
		if newWeatherTimer == 0 then
			if DynamicWeather then
				NextWeatherStage()
			end
			newWeatherTimer = getWeatherDuration(CurrentWeather)

			if Config.Debug then
				print("[es_wsync] New random weather type has been generated: " .. CurrentWeather .. ".\n")
				print("[es_wsync] Resetting timer to "..newWeatherTimer.." min.\n")
			end
		end
	end
end)

function NextWeatherStage()
	if CurrentWeather == "CLEAR" or CurrentWeather == "CLOUDS" or CurrentWeather == "EXTRASUNNY"  then
		local new = math.random(1,2)
		if new == 1 then
			CurrentWeather = "CLEARING"
		else
			CurrentWeather = "OVERCAST"
		end
	elseif CurrentWeather == "CLEARING" or CurrentWeather == "OVERCAST" then
		local new = math.random(1,6)
		if new == 1 then
			if CurrentWeather == "CLEARING" then CurrentWeather = "FOGGY" else CurrentWeather = "RAIN" end
		elseif new == 2 then
			CurrentWeather = "CLOUDS"
		elseif new == 3 then
			CurrentWeather = "CLEAR"
		elseif new == 4 then
			CurrentWeather = "EXTRASUNNY"
		elseif new == 5 then
			CurrentWeather = "SMOG"
		else
			CurrentWeather = "FOGGY"
		end
	elseif CurrentWeather == "THUNDER" or CurrentWeather == "RAIN" then
		CurrentWeather = "CLEARING"
	elseif CurrentWeather == "SMOG" or CurrentWeather == "FOGGY" then
		CurrentWeather = "CLEAR"
	end
	TriggerEvent("es_wsync:requestSync")
end
