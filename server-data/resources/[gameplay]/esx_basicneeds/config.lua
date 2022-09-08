Config = {}
Config.Locale = 'ru'
Config.DistanceChillZone = 120.0
Config.ChillZones = {
-- Миррор Парк
    {
        Pos    = vector3(1081.5, -651.57, 54.0),
        Radius = 120.0,
        Chill  = 15000
    },
-- Клуб Текила-ла
    {
        Pos    = vector3(-558.62, 285.7, 82.18),
        Radius = 11.0,
        Chill  = 15000
    },
-- Клуб Багама-Мама
{
    Pos    = vector3(-1393.8, -613.3, 30.18),
    Radius = 25.0,
    Chill  = 15000
},
-- Елоу Джек
{
    Pos    = vector3(1987.61, 3049.17, 47.22),
    Radius = 9.0,
    Chill  = 15000
},
-- Юникорн
{
    Pos    = vector3(116.99, -1290.34, 28.22),
    Radius = 20.0,
    Chill  = 15000
},
-- Психолог
{
    Pos    = vector3(-459.52, -308.94, 34.6),
    Radius = 4.0,
    Chill  = 30000
},
-- Пляж Дель Пьеро
    {
        Pos    = vector3(-1736.91, -1115.91, 13.00),
        Radius = 190.0,
        Chill  = 15000
    },
-- Северный Пляж
    {
        Pos    = vector3(1530.95, 6621.25, 2.0),
        Radius = 90.0,
        Chill  = 15000
    },
-- Северный Пляж(2)
    {
        Pos    = vector3(1284.63, 6584.38, 2.0),
        Radius = 90.0,
        Chill  = 15000
    },
-- Северный Пляж(3)
    {
        Pos    = vector3(142.95, 7047.72, 2.0),
        Radius = 90.0,
        Chill  = 15000
    },
-- Северный Пляж(4)
    {
        Pos    = vector3(-360.1, 6484.26, 2.0),
        Radius = 70.0,
        Chill  = 15000
    },
-- Северный Пляж(5)
    {
        Pos    = vector3(-842.39, 5895.17, 2.0),
        Radius = 70.0,
        Chill  = 15000
    },
-- Северный Пляж(6)
    {
        Pos    = vector3(-1720.44, 4965.18, 2.0),
        Radius = 70.0,
        Chill  = 15000
    },
-- Восточный Пляж
    {
        Pos    = vector3(2820.27, -651.65, 2.0),
        Radius = 90.0,
        Chill  = 15000
    },

-- Зоны стресса (Гетто)
    {
        Pos    = vector3(103.78, -1939.01, 20.8),
        Radius = 30.0,
        Chill  = -100000
    },
    {
        Pos    = vector3(-183.49, -1608.24, 33.99),
        Radius = 100.0,
        Chill  = -100000
    },
    {
        Pos    = vector3(340.17, -2045.87, 21.28),
        Radius = 100.0,
        Chill  = -100000
    },



}

Config.Power = 12000
Config.RandomVehicleInteraction = {
	{interaction = 27, time = 1500},
	{interaction = 6, time = 1000},
	{interaction = 7, time = 800},
	{interaction = 8, time = 800},
	{interaction = 10, time = 800},
	{interaction = 11, time = 800},
	{interaction = 23, time = 2000},
	{interaction = 31, time = 2000}
}
