const Config = {};

Config.Marker = {
    markerType: 27,
    scale: [1.5, 1.5, 1.5],
    color: [255, 255, 255],
    alpha: 100,
    drawDistance: 8,
};

Config.Teleporters = {
    'EclipseTowers': {
        job: 'police',
        enter: {
            x: 1690.84,
            y: 2591.98,
            z: 44.70,

        },
        exit: {
            x: 1722.48,
            y: 2493.45,
            z: -78.70,

        }
    },

    'VinewoodPDtoGarage': {
        job: 'none',
        enter: {
            x: 591.99,
            y: -4.51,
            z: 78.43,

        },
        exit: {
            x: 563.32,
            y: 12.65,
            z: 69.63,

        }
    },

    'VinewoodPDtoHelipad': {
        job: 'none',
        enter: {
            x: 604.91,
            y: -9.28,
            z: 92.81,

        },
        exit: {
            x: 566.21,
            y: 4.87,
            z: 102.32,

        }
    },

    'Coke': {
        job: 'none',
        enter: {
            x: 2890.6,
            y: 4391.8,
            z: 49.5,

        },

        exit: {
            x: 1088.6,
            y: -3188.2,
            z: -39.9,

        }
    },

    'Weed': {
        job: 'none',
        enter: {
            x: 930.85,
            y: -1547.02,
            z: 29.9,

        },

        exit: {
            x: 1065.51,
            y: -3183.39,
            z: -40.1,

        }
    },

    /*
    'MotelPink': {
        job:'none',
        enter: {
            x: 333.22,
            y: -225.53,
            z: 57.12,
            
        },

        'Blip': {
            'sprite': 40,
            'color': 50,
            'text': "Мотель",
        },

        exit: {
            x: 151.32,
            y: -1007.23,
            z: -100.0,
            
        },
    },
*/

    //Next here

    'home1': {
        job: 'none',
        enter: {
            x: 323.19,
            y: 426.49,
            z: 148.05,

        },

        exit: {
            x: 325.03,
            y: 427.41,
            z: 147.97,

        }
    },

    'home2': {
        job: 'none',
        enter: {
            x: 368.83,
            y: 401.98,
            z: 144.51,

        },

        exit: {
            x: 369.2,
            y: 403.86,
            z: 144.5,

        }
    },

    'home3': {
        job: 'none',
        enter: {
            x: 120.21,
            y: 537.47,
            z: 182.9,

        },

        exit: {
            x: 119.95,
            y: 539.75,
            z: 182.9,

        }
    },

    'home4': {
        job: 'none',
        enter: {
            x: -168.44,
            y: 476.69,
            z: 136.25,

        },

        exit: {
            x: -168.82,
            y: 478.62,
            z: 136.24,

        }
    },

    'home5': {
        job: 'none',
        enter: {
            x: -666.73,
            y: 577.02,
            z: 143.98,

        },

        exit: {
            x: -668.06,
            y: 578.6,
            z: 143.97,

        }
    },

    'home6': {
        job: 'none',
        enter: {
            x: -779.02,
            y: 610.23,
            z: 142.8,

        },

        exit: {
            x: -776.57,
            y: 611.06,
            z: 142.73,

        }
    },

    'home7': {
        job: 'none',
        enter: {
            x: -857.55,
            y: 669.27,
            z: 151.45,

        },

        exit: {
            x: -857.66,
            y: 670.91,
            z: 151.45,

        }
    },

    'home8': {
        job: 'none',
        enter: {
            x: -1289.23,
            y: 426.96,
            z: 96.58,

        },

        exit: {
            x: -1289.21,
            y: 429.36,
            z: 96.5,

        }
    },

    'homebitch': {
        job: 'none',
        enter: {
            x: -1159.73,
            y: -1525.63,
            z: 9.63,

        },

        exit: {
            x: -1158.43,
            y: -1524.65,
            z: 9.63,

        }
    },
    //Тюрьма
    'prison': {
        job: 'none',
        enter: {
            x: 1820.59,
            y: 2567.87,
            z: 44.6,

        },

        exit: {
            x: 1825.39,
            y: 2585.86,
            z: 44.6,

        }
    },
    'diamondroof': {
        job: 'none',
        enter: {
            x: 948.28,
            y: 50.83,
            z: 74.12,
            information: 'Нажмите ~INPUT_PICKUP~ чтобы подняться'
        },

        exit: {
            x: 964.62,
            y: 58.86,
            z: 111.55,
            information: 'Нажмите ~INPUT_PICKUP~ чтобы cпуститься'
        }
    },

    'Biker': {
        job: 'none',
        enter: {
            x: 46.11,
            y: 2788.5,
            z: 56.88,

        },

        exit: {
            x: 997.49,
            y: -3158.08,
            z: -39.91,

        }
    },

    'Skater': {
        job: 'none',
        enter: {
            x: -174.43,
            y: -1289.52,
            z: 30.20,

        },

        exit: {
            x: -153.84,
            y: -1266.33,
            z: -100.31,

        }
    },

    'Weazel': {
        job: 'none',
        enter: {
            x: -598.07,
            y: -929.88,
            z: 22.85,

        },

        exit: {
            x: -229.63,
            y: -2009.2,
            z: 23.67,

        }
    },


    // #### ROOFS #####

    'Generic_Hotel': {
        job: 'none',
        enter: {
            x: -476.81,
            y: 218.22,
            z: 82.8,

        },

        exit: {
            x: -484.19,
            y: 198.16,
            z: 82.26,

        }
    },

    'Vinewood1': {
        job: 'none',
        enter: {
            x: -60.15,
            y: 359.85,
            z: 112.16,

        },

        exit: {
            x: -84.45,
            y: 326.1,
            z: 141.7,

        }
    },

    'Archipelago': {
        job: 'none',
        enter: {
            x: -1097.48,
            y: -324.46,
            z: 36.92,

        },

        exit: {
            x: -1113.12,
            y: -335.61,
            z: 49.12,

        }
    },

    'AltaHavik': {
        job: 'none',
        enter: {
            x: 418.56,
            y: -207.83,
            z: 59.01,

        },

        exit: {
            x: 419.33,
            y: -192.85,
            z: 73.36,

        }
    },


    'ElginHouse': {
        job: 'none',
        enter: {
            x: -71.53,
            y: 142.86,
            z: 80.6,

        },

        exit: {
            x: -72.5,
            y: 137.57,
            z: 126.78,

        }
    },

    'ClockTower': {
        job: 'none',
        enter: {
            x: -1232.77,
            y: -856.16,
            z: 12.21,

        },

        exit: {
            x: -1253.84,
            y: -842.38,
            z: 64.43,

        }
    },

    'BeachHouse1': {
        job: 'none',
        enter: {
            x: -1384.77,
            y: -976.1,
            z: 8.04,

        },

        exit: {
            x: -1399.31,
            y: -986.15,
            z: 18.48,

        }
    },


    'ArcadiusRoof': {
        job: 'none',
        enter: {
            x: -139.2,
            y: -620.63,
            z: 167.82,
            information: '~INPUT_PICKUP~ выйти на крышу'
        },

        exit: {
            x: -155.85,
            y: -602.82,
            z: 200.84,

        }
    },

    'ArcadiusMech': {
        job: 'none',
        enter: {
            x: -144.15,
            y: -576.77,
            z: 31.52,
            information: '~INPUT_PICKUP~ В мастерскую'
        },

        exit: {
            x: -143.3,
            y: -591.81,
            z: 166.1,

        }
    },

    'MazeBank': {
        job: 'none',
        enter: {
            x: -71.0,
            y: -799.68,
            z: 43.33,
            information: '~INPUT_PICKUP~ На крышу'
        },

        exit: {
            x: -66.78,
            y: -822.04,
            z: 320.39,

        }
    },

    //'Comedy': {
    //job:'none',
    //enter: {
    //x: -458.47,
    //y: 263.44,
    //z: 82.01,
    //
    // 	},

    //exit: {
    //x: -458.73,
    //y: 284.55,
    //z: 77.52,
    //
    // 	}
    // },

    'HumanLabsLift': {
        job: 'none',
        enter: {
            x: 3540.65,
            y: 3676.01,
            z: 19.90,
            information: '~INPUT_PICKUP~ Подняться'
        },

        exit: {
            x: 3540.65,
            y: 3676.01,
            z: 27.10,
            information: '~INPUT_PICKUP~ Спуститься'
        }
    },
    'HumanLabs': {
        job: 'none',
        enter: {
            x: 3574.04,
            y: 3736.31,
            z: 35.50,

        },

        exit: {
            x: 3559.6,
            y: 3695.94,
            z: 29.10,

        }
    },

};

export default Config;