Config = {}
Config.Locale = 'ru'

Config.Zones = {
	{
		Role = "police",
		Title = 'Кабинет шефа',
--		Position = { x = 447.98, y = -973.37, z = 30.69 },
		Position = { x = 638.52, y = 8.57, z = 90.93 },
		DrawDistance = 2.5,
		Blip = {
			pos = vector3(576.2, -7.5, 101.25),
			sprite  = 60,
			display = 4,
			scale   = 1.2,
			color   = 29,
		},
	},

	{
		Role = "taxi",
		Title = 'Начальник таксопарка',
		Position = { x = 901.61, y = -154.26, z = 78.17 },
		DrawDistance = 2.5,
		Blip = {
			pos = vector3(891.24, -158.86, 81.6),
			sprite = 198,
			display = 4,
			scale = 1.0,
			color = 5,
			shortRange = true,
			text = "Таксопарк",
		}
	},


	{
		Role = "ambulance",
		Title = 'Главный врач',
		Position = { x = -456.59, y = -318.68, z = 34.6 },
		DrawDistance = 2.5,
		Blip = {
			pos = vector3(-456.59, -318.68, 34.6),
			sprite = 61,
			scale  = 1.2,
			color  = 2,
		},
	},


}
