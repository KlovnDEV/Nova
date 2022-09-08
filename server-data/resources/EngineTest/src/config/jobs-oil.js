const Config = {};
Config.Locale = 'ru';

Config.OilStoreCapacity = 3000; // м^3
Config.TankerCapacity = 30.0; // м^3


Config.Zones = [
    {
        type: 'extract',
        coords: { x: 578.44, y: 2914.3, z: 40.26 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'store',
        coords: { x: 1717.27, y: -1653.59, z: 112.52 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'gas-store',
        description: 'Бензохранилище',
        coords: { x: 1732.66, y: -1572.62, z: 112.69 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 1,
        description: 'Заправка на Цирк Линдсей',
        coords: { x: -719.88, y: -934.87, z: 19.02 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 2,
        description: 'Заправка на Грейпсид-Мэйн-стрит',
        coords: { x: 1688.44, y: 4933.9, z: 42.05 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 3,
        description: 'Заправка на Бэнхэм-Каньон-драйв',
        coords: { x: -1800.63, y: 804.22, z: 138.60 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 4,
        description: 'Заправка на Гроув-стрит',
        coords: { x: -70.41, y: -1760.26, z: 29.1 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 5,
        description: 'Заправка на Бульвар Миррор-Парк',
        coords: { x: 1180.33, y: -329.71, z: 69.3 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 1,
        description: 'Заправка на Бульвар Палето',
        coords: { x: 179.82, y: 6602.9, z: 31.8 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 2,
        description: 'Заправка на Юго-западе Шоссе 68',
        coords: { x: -2555.03, y: 2334.46, z: 33.05 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 3,
        description: 'Заправка на Саут-Рокфорд-драйв',
        coords: { x: -1436.24, y: -277.42, z: 46.20 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 4,
        description: 'Заправка на Попьюлар-стрит',
        coords: { x: 819.69, y: -1028.65, z: 26.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 5,
        description: 'Заправка на Бульвар Капитал',
        coords: { x: 1208.27, y: -1401.55, z: 35.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 6,
        description: 'Заправка на Шоссе Паломино',
        coords: { x: 2580.67, y: 361.95, z: 108.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 7,
        description: 'Заправка на Шоссе Паломино',
        coords: { x: 175.61, y: -1561.38, z: 29.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 1,
        description: 'Заправка на Альта-стрит',
        coords: { x: -322.34, y: -1473.43, z: 30.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 2,
        description: 'Заправка на Севере Шоссе 68',
        coords: { x: 260.05, y: 2599.16, z: 44.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 3,
        description: 'Заправка на Юге Шоссе 68',
        coords: { x: 1039.61, y: 2671.37, z: 39.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 4,
        description: 'Заправка на Северо-востоке Шоссе 68',
        coords: { x: 1204.24, y: 2658.37, z: 37.8 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 5,
        description: 'Заправка на Севере Сенора-вэй',
        coords: { x: 2540.78, y: 2593.83, z: 37.9 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 6,
        description: 'Заправка на Юге Шосса Сенора',
        coords: { x: 1702.86, y: 6420.71, z: 32.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 7,
        description: 'Заправка на Панорама-драйв',
        coords: { x: 1779.49, y: 3328.0, z: 41.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 8,
        description: 'Заправка на Клинтон-авеню',
        coords: { x: 625.34, y: 269.78, z: 103.14 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 1,
        description: 'Заправка на Капитал-бульваре',
        coords: { x: 268.87, y: -1261.56, z: 28.62 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 2,
        description: 'Заправка на Шоссе 68',
        coords: { x: 51.81, y: 2784.64, z: 57.80 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 3,
        description: 'Заправка на Шоссе Сенора',
        coords: { x: 2685.58, y: 3263.38, z: 55.29 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 4,
        description: 'Заправка на Марина-драйв',
        coords: { x: 2003.15, y: 3778.22, z: 32.15 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 5,
        description: 'Заправка на Cевере Бульвара Палето',
        coords: { x: -93.23, y: 6418.34, z: 31.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 6,
        description: 'Заправка на Западном Шоссе Дель-Перро',
        coords: { x: -2096.6, y: -318.15, z: 13.15 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 7,
        description: 'Заправка на Кале-авеню',
        coords: { x: -524.79, y: -1210.6, z: 18.14 },
        store: { max: 50.0, current: 0 }
    },
];

export default Config;