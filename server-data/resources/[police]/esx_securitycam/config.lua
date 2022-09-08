Config = {}
Config.DrawDistance = 20.0
Config.HideRadar = true
Config.AnimTime = 60

Config.Locale = 'ru'
Config.pNotify = false
Config.Hacking = true
Config.HackingTimeout = 20

Config.CameraMaxDistance = 100
Config.CameraBreakTimer = 600


--Терминал камер
Config.Zones = {
	Cameras = {
		Pos   = {x = 622.43, y = -20.7, z = 81.75},
		Size  = {x = 1.7, y = 1.7, z = 0.5},
		Color = {r = 26, g = 55, b = 186},
		Type = 27,
	}
}

-- Config.HackingPolice = {
-- 	HackingPolice = {
-- 		Pos   = {x = 454.77, y = -979.484, z = -28.69},
-- 		Size  = {x = 1.7, y = 1.7, z = 0.5},
-- 		Color = {r = 26, g = 55, b = 186},
-- 		Type = 27,
-- 	}
-- }

-- Config.UnHackPolice = {
-- 	UnHackPolice = {
-- 		Pos   = {x = 454.77, y = -979.484, z = -28.69},
-- 		Size  = {x = 1.7, y = 1.7, z = 0.5},
-- 		Color = {r = 26, g = 55, b = 186},
-- 		Type = 27,
-- 	}
-- }

-- Config.HackingBank = {
-- 	HackingBank = {
-- 		Pos   = {x = 264.87, y = 219.93, z = 100.68},
-- 		Size  = {x = 1.7, y = 1.7, z = 0.5},
-- 		Color = {r = 26, g = 55, b = 186},
-- 		Type = 27,
-- 	}
-- }

-- Config.UnHackBank = {
-- 	UnHackBank = {
-- 		Pos   = {x = 264.87, y = 219.93, z = 100.68},
-- 		Size  = {x = 1.7, y = 1.7, z = 0.5},
-- 		Color = {r = 26, g = 55, b = 186},
-- 		Type = 27,
-- 	}
-- }

-- Камеры
Config.Locations = {
	-- ["bank"] = {
	-- 	label = _U('pacific_standard_bank'),
	-- 	Cameras = {
	-- 		{label = _U('bcam'), x = 232.68, y = 221.86, z = 108.45, r = {x = -25.0, y = 0.0, z = -140.91}, canRotate = true},
	-- 		{label = _U('bcam2'), x = 257.45, y = 210.07, z = 109.08, r = {x = -25.0, y = 0.0, z = 28.05}, canRotate = true},
	-- 		{label = _U('bcam3'), x = 266.86, y = 216.04, z = 108.55, r = {x = -25.0, y = 0.0, z = -220.49}, canRotate = true},
	-- 		{label = _U('bcam4'), x = 241.64, y = 233.83, z = 111.48, r = {x = -35.0, y = 0.0, z = 120.46}, canRotate = true},
	-- 		{label = _U('bcam5'), x = 269.66, y = 223.67, z = 114.60, r = {x = -30.0, y = 0.0, z = 111.29}, canRotate = true},
	-- 		{label = _U('bcam6'), x = 261.90, y = 218.28, z = 113.85, r = {x = -40.0, y = 0.0, z = -159.49}, canRotate = true},
	-- 		{label = _U('bcam7'), x = 258.70, y = 204.40, z = 113.85, r = {x = -30.0, y = 0.0, z = 10.50}, canRotate = true},
	-- 		{label = _U('bcam8'), x = 235.33, y = 227.67, z = 113.75, r = {x = -35.0, y = 0.0, z = -160.29}, canRotate = true},
	-- 		{label = _U('bcam9'), x = 255.12, y = 205.67, z = 113.78, r = {x = -35.0, y = 0.0, z = 44.70}, canRotate = true},
	-- 		{label = _U('bcam10'), x = 269.89, y = 223.76, z = 108.30, r = {x = -35.0, y = 0.0, z = 112.62}, canRotate = true},
	-- 		{label = _U('bcam11'), x = 251.77, y = 225.42, z = 104.50, r = {x = -35.0, y = 0.0, z = -74.87}, canRotate = true},
	-- 	},
	-- },

	["police"] = {
		label = _U('police_station'),
		Cameras = {
			{label = _U('pcam'), x = 619.39, y = -24.84, z = 84.55, r = {x = -25.0, y = 0.0, z = 18.05}, canRotate = true},
			{label = _U('pcam3'), x = 600.94, y = -13.62, z = 84.5, r = {x = -25.0, y = 0.0, z = 290.01}, canRotate = true},
			{label = _U('pcam2'), x = 606.15, y = -22.89, z = 85.0, r = {x = -35.0, y = 0.0, z = -80.46}, canRotate = true},
			{label = _U('pcam4'), x = 615.3, y = -26.16, z = 84.9, r = {x = -30.0, y = 0.0, z = 40.29}, canRotate = true},
            {label = _U('pcam5'), x = 619.03, y = 9.67, z = 90.60, r = {x = -45.0, y = 0.0, z = -05.95}, canRotate = true},
            {label = _U('pcam6'), x = 608.48, y = 8.34, z = 89.60, r = {x = -40.0, y = 0.0, z = -70.49}, canRotate = true},
            {label = _U('pcam7'), x = 623.59, y = 15.01, z = 86.20, r = {x = -30.0, y = 0.0, z = 200.50}, canRotate = true},
            {label = _U('pcam12'), x = 639.86, y = 9.14, z = 86.20, r = {x = -30.0, y = 0.0, z = 100.50}, canRotate = true},
			{label = _U('pcam8'), x = 618.21, y = 9.01, z = 89.60, r = {x = -30.0, y = 0.0, z = 110.29}, canRotate = true},
			{label = _U('pcam9'), x = 610.57, y = -12.00, z = 89.60, r = {x = -40.0, y = 0.0, z = 10.29}, canRotate = true},
			{label = _U('pcam11'), x = 580.46, y = 17.56, z = 89.60, r = {x = -40.0, y = 0.0, z = 200.50}, canRotate = true},
            {label = _U('pcam10'), x = 605.44, y = 15.3, z = 89.60, r = {x = -30.0, y = 0.0, z = 200.29}, canRotate = true},
            {label = _U('pcam13'), x = 589.91, y = 21.01, z = 89.60, r = {x = -30.0, y = 0.0, z = 200.29}, canRotate = true},
            {label = _U('pcam14'), x = 597.76, y = 18.27, z = 89.60, r = {x = -30.0, y = 0.0, z = 200.29}, canRotate = true},
            {label = _U('pcam15'), x = 579.2, y = 16.89, z = 86.30, r = {x = -30.0, y = 0.0, z = 100.29}, canRotate = true},
            {label = _U('pcam16'), x = 594.61, y = 8.68, z = 86.30, r = {x = -30.0, y = 0.0, z = 50.29}, canRotate = true},
            {label = _U('pcam18'), x = 579.3, y = 14.26, z = 86.30, r = {x = -30.0, y = 0.0, z = -80.29}, canRotate = true},
            {label = _U('pcam17'), x = 579.76, y = -0.26, z = 86.30, r = {x = -30.0, y = 0.0, z = -70.29}, canRotate = true},
            {label = _U('pcam19'), x = 638.37, y = -5.37, z = 87.0, r = {x = -40.0, y = 0.0, z = -70.29}, canRotate = true},
            {label = _U('pcam20'), x = 622.4, y = 17.00, z = 90.90, r = {x = -40.0, y = 0.0, z = 30.29}, canRotate = true},
            {label = _U('pcam21'), x = 530.41, y = -38.27, z = 74.9, r = {x = -30.0, y = 0.0, z = -90.29}, canRotate = true},
            {label = _U('pcam22'), x = 557.28, y = -66.08, z = 74.9, r = {x = -30.0, y = 0.0, z = 10.29}, canRotate = true},



		},
	},

	["ambulance"] = {
		label = _U('ambulance'),
		Cameras = {
			{label = _U('acam'), x = -449.58, y = -347.91, z = 38.3, r = {x = -30.0, y = 0.0, z = 50.50}, canRotate = true},
			{label = _U('acam2'), x = -482.43, y = -322.14, z = 38.65, r = {x = -30.0, y = 0.0, z = 220.50}, canRotate = true},
			-- {label = _U('acam3'), x = 344.59, y = -594.359, z = 30.53, r = {x = -30.0, y = 0.0, z = 30.50}, canRotate = true},
			-- {label = _U('acam4'), x = 312.42, y = -546.159, z = 39.73, r = {x = -40.0, y = 0.0, z = -90.50}, canRotate = true},

		},
	},
}
