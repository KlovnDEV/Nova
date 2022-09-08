-- BOTTOM PANEL

local directions = { [0] = 'С', [45] = 'СЗ', [90] = 'З', [135] = 'ЮЗ', [180] = 'Ю', [225] = 'ЮВ', [270] = 'В', [315] = 'СВ', [360] = 'С', }
local locationText = ''
local timeText = ''
local weatherHash = ''
local directionText = ''

RegisterNetEvent('carhud:SetWeather')
AddEventHandler('carhud:SetWeather', function(weather)
    weatherHash = weather
end)

Citizen.CreateThread(function()
	while true do
		Citizen.Wait(1000)

		local days = { 'Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' }
		local day = days[GetClockDayOfWeek()+1]

		timeText = string.format('%02d:%02d', GetClockHours(), GetClockMinutes())

		local weatherTypes = {
			['EXTRASUNNY'] = 'Солнечно',
			['CLEAR'] = 'Ясно',
			['NEUTRAL'] = 'Пасмурно',
			['SMOG'] = 'Смог',
			['FOGGY'] = 'Дымка',
			['OVERCAST'] = 'Пасмурно',
			['CLOUDS'] = 'Облачно',
			['CLEARING'] = 'Дождь',
			['RAIN'] = 'Дождь',
			['THUNDER'] = 'Ураган',
			['BLIZZARD'] = 'Метель',
			['SNOWLIGHT'] = 'Снег',
			['XMAS'] = 'Ясно',
			['HALLOWEEN'] = '???',
		}

		local weather = weatherTypes[weatherHash] or ''

		local pos = GetEntityCoords(GetPlayerPed(-1))
		local var1, var2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z, Citizen.ResultAsInteger(), Citizen.ResultAsInteger())

		for k,v in pairs(directions)do
			direction = GetEntityHeading(GetPlayerPed(-1))
			if(math.abs(direction - k) < 22.5)then
				directionText = v
				break;
			end
		end

		if(GetStreetNameFromHashKey(var1) and GetNameOfZone(pos.x, pos.y, pos.z)) then
			if( tostring(GetStreetNameFromHashKey(var1))) then
				locationText = tostring(GetStreetNameFromHashKey(var1))
			end
		end

		MakeDifferentialQuery({
			query = "indicators/location",
			time = timeText,
			day = day,
			weather = weather,
			direction = directionText,
			street = locationText
		})
	end
end)
