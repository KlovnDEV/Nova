Config = {}
Config.Locale = 'ru'

Config.OilStoreCapacity = 3000 -- м^3
Config.TankerCapacity = 30.0 -- м^3


Config.Zones = {
    {
        Type = 'extract',
        Position = { x = 578.44, y = 2914.3, z = 40.26 },
        Store = { max = 3000.0, current = 1000.0 }
    },
    {
        Type = 'store',
        Position = { x = 1717.27, y = -1653.59, z = 112.52 },
        Store = { max = 3000.0, current = 1000.0 }
    },
    {
        Type = 'gas-store',
        Description = 'Бензохранилище',
        Position = { x = 1732.66, y = -1572.62, z = 112.69 },
        Store = { max = 3000.0, current = 1000.0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ltd',
        Index = 1,
        Description = 'Заправка на Цирк Линдсей',
        Position = { x = -719.88, y = -934.87, z = 19.02 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ltd',
        Index = 2,
        Description = 'Заправка на Грейпсид-Мэйн-стрит',
        Position = { x = 1688.44, y = 4933.9, z = 42.05 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ltd',
        Index = 3,
        Description = 'Заправка на Бэнхэм-Каньон-драйв',
        Position = { x = -1800.63, y = 804.22, z = 138.60 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ltd',
        Index = 4,
        Description = 'Заправка на Гроув-стрит',
        Position = { x = -70.41, y = -1760.26, z = 29.1 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ltd',
        Index = 5,
        Description = 'Заправка на Бульвар Миррор-Парк',
        Position = { x = 1180.33, y = -329.71, z = 69.3 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 1,
        Description = 'Заправка на Бульвар Палето',
        Position = { x = 179.82, y = 6602.9, z = 31.8 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 2,
        Description = 'Заправка на Юго-западе Шоссе 68',
        Position = { x = -2555.03, y = 2334.46, z = 33.05 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 3,
        Description = 'Заправка на Саут-Рокфорд-драйв',
        Position = { x = -1436.24, y = -277.42, z = 46.20 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 4,
        Description = 'Заправка на Попьюлар-стрит',
        Position = { x = 819.69, y = -1028.65, z = 26.4 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 5,
        Description = 'Заправка на Бульвар Капитал',
        Position = { x = 1208.27, y = -1401.55, z = 35.2 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 6,
        Description = 'Заправка на Шоссе Паломино',
        Position = { x = 2580.67, y = 361.95, z = 108.4 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'ron',
        Index = 7,
        Description = 'Заправка на Шоссе Паломино',
        Position = { x = 175.61, y = -1561.38, z = 29.2 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 1,
        Description = 'Заправка на Альта-стрит',
        Position = { x = -322.34, y = -1473.43, z = 30.5 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 2,
        Description = 'Заправка на Севере Шоссе 68',
        Position = { x = 260.05, y = 2599.16, z = 44.5 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 3,
        Description = 'Заправка на Юге Шоссе 68',
        Position = { x = 1039.61, y = 2671.37, z = 39.5 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 4,
        Description = 'Заправка на Северо-востоке Шоссе 68',
        Position = { x = 1204.24, y = 2658.37, z = 37.8 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 5,
        Description = 'Заправка на Севере Сенора-вэй',
        Position = { x = 2540.78, y = 2593.83, z = 37.9 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 6,
        Description = 'Заправка на Юге Шосса Сенора',
        Position = { x = 1702.86, y = 6420.71, z = 32.5 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 7,
        Description = 'Заправка на Панорама-драйв',
        Position = { x = 1779.49, y = 3328.0, z = 41.2 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'globe',
        Index = 8,
        Description = 'Заправка на Клинтон-авеню',
        Position = { x = 625.34, y = 269.78, z = 103.14 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 1,
        Description = 'Заправка на Капитал-бульваре',
        Position = { x = 268.87, y = -1261.56, z = 28.62 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 2,
        Description = 'Заправка на Шоссе 68',
        Position = { x = 51.81, y = 2784.64, z = 57.80 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 3,
        Description = 'Заправка на Шоссе Сенора',
        Position = { x = 2685.58, y = 3263.38, z = 55.29 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 4,
        Description = 'Заправка на Марина-драйв',
        Position = { x = 2003.15, y = 3778.22, z = 32.15 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 5,
        Description = 'Заправка на Cевере Бульвара Палето',
        Position = { x = -93.23, y = 6418.34, z = 31.4 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 6,
        Description = 'Заправка на Западном Шоссе Дель-Перро',
        Position = { x = -2096.6, y = -318.15, z = 13.15 },
        Store = { max = 50.0, current = 0 }
    },
    {
        Type = 'gas-station',
        Brand = 'xero',
        Index = 7,
        Description = 'Заправка на Кале-авеню',
        Position = { x = -524.79, y = -1210.6, z = 18.14 },
        Store = { max = 50.0, current = 0 }
    },

}
