import { Vector3 } from '@nova/engine-lib/shared';

const Config = {};
Config.Locale = 'ru';

Config.Blip = {
    text: "Тату-салон",
    color: 1,
    sprite: 75,
};

Config.Shops = {
    ['central']: {
        coords: new Vector3(322.1, 180.4, 103.5),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(319.72, 180.94, 102.59),
            heading: 254.5,
        },

        player: {
            coords: new Vector3(323.48, 179.79, 102.6),
            heading: 70.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 156,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90.0,
                angle: -30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 156,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        },
    },
    ['paleto']: {
        coords: new Vector3(-293.7, 6200, 31.4),

        ped: {
            shop: 'paleto',
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-291.92, 6199.84, 30.5),
            heading: 231.5,
        },

        player: {
            coords: new Vector3(-294.05, 6200.04, 30.51),
            heading: 222.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 300,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 120,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 300,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['sandy']: {
        coords: new Vector3(1865, 3747.7, 33),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(1862.38, 3748.32, 32.07),
            heading: 32.0,
        },

        player: {
            coords: new Vector3(1864.25, 3747.77, 32.04),
            heading: 21.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 110,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 290,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 110,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['chumash']: {
        coords: new Vector3(-3170, 1075, 20.8),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-3170.45, 1072.95, 19.84),
            heading: 332.5,
        },

        player: {
            coords: new Vector3(-3168.93, 1077.06, 19.85),
            heading: 158.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 240,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 60,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 240,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['vespucci']: {
        coords: new Vector3(-1153.6, -1425.6, 4.9),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-1152.18, -1423.85, 4.0),
            heading: 123.0,
        },

        player: {
            coords: new Vector3(-1155.54, -1426.46, 3.98),
            heading: 302.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 210,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 30,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['innocence']: {
        coords: new Vector3(1322.60, -1651.90, 51.20),

        ped: {
            shop: 'innocence',
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(1324.58, -1650.21, 51.3),
            heading: 126.5,
        },

        player: {
            coords: new Vector3(1321.42, -1652.88, 51.3),
            heading: 308.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 210,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 30,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    }
};

Config.Skin = {
    male: {
        sex: 0,
        tshirt_1: 15,
        tshirt_2: 0,
        arms: 15,
        torso_1: 15,
        torso_2: 0,
        pants_1: 21,
        pants_2: 0,
        shoes_1: 34,
        shoes_2: 0,
        chain_1: 0,
        chain_2: 0
    },
    female: {
        sex: 1,
        tshirt_1: 15,
        tshirt_2: 0,
        arms: 15,
        torso_1: 15,
        torso_2: 0,
        pants_1: 15,
        pants_2: 0,
        shoes_1: 35,
        shoes_2: 0,
        chain_1: 0,
        chain_2: 0
    }
};

export default Config;