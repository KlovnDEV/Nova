local Keys = {
    ['ESC'] = 322,
    ['F1'] = 288,
    ['F2'] = 289,
    ['F3'] = 170,
    ['F5'] = 166,
    ['F6'] = 167,
    ['F7'] = 168,
    ['F8'] = 169,
    ['F9'] = 56,
    ['F10'] = 57,
    ['~'] = 243,
    ['1'] = 157,
    ['2'] = 158,
    ['3'] = 160,
    ['4'] = 164,
    ['5'] = 165,
    ['6'] = 159,
    ['7'] = 161,
    ['8'] = 162,
    ['9'] = 163,
    ['-'] = 84,
    ['='] = 83,
    ['BACKSPACE'] = 177,
    ['TAB'] = 37,
    ['Q'] = 44,
    ['W'] = 32,
    ['E'] = 38,
    ['R'] = 45,
    ['T'] = 245,
    ['Y'] = 246,
    ['U'] = 303,
    ['P'] = 199,
    ['['] = 39,
    [']'] = 40,
    ['ENTER'] = 18,
    ['CAPS'] = 137,
    ['A'] = 34,
    ['S'] = 8,
    ['D'] = 9,
    ['F'] = 23,
    ['G'] = 47,
    ['H'] = 74,
    ['K'] = 311,
    ['L'] = 182,
    ['LEFTSHIFT'] = 21,
    ['Z'] = 20,
    ['X'] = 73,
    ['C'] = 26,
    ['V'] = 0,
    ['B'] = 29,
    ['N'] = 249,
    ['M'] = 244,
    [','] = 82,
    ['.'] = 81,
    ['LEFTCTRL'] = 36,
    ['LEFTALT'] = 19,
    ['SPACE'] = 22,
    ['RIGHTCTRL'] = 70,
    ['HOME'] = 213,
    ['PAGEUP'] = 10,
    ['PAGEDOWN'] = 11,
    ['DELETE'] = 178,
    ['LEFT'] = 174,
    ['RIGHT'] = 175,
    ['TOP'] = 27,
    ['DOWN'] = 173,
    ['NENTER'] = 201,
    ['N4'] = 108,
    ['N5'] = 60,
    ['N6'] = 107,
    ['N+'] = 96,
    ['N-'] = 97,
    ['N7'] = 117,
    ['N8'] = 61,
    ['N9'] = 118
}
local PlayerData = {}
local HasAlreadyEnteredMarker = false
local LastZone = nil
local CurrentAction = nil
local CurrentActionMsg = ''
local CurrentActionData = {}
local Blips = {}
local dancing = false
local dancefloorPos = vector3(-1597.0, -3012.5, -79.0)
local lib = nil
local anim = nil
local isBarman = false
local selectedCraft
local isSecurity = false
local isInMarker = false
local isInPublicMarker = false
local hintIsShowed = false
local hintToDisplay = 'no hint to display'

-- DRIVE JOB --
local drivingStarted = false
local carClub = GetHashKey('patriot2')
local busClub = GetHashKey('pbus2')
local carOut = false
local StarPos
local SpawnedStar
local TargetVehicle
local StarGOTOCar
local StarType
local timerDrive
local randEvent
local carHealth
local initTimer
local timerEnabled = false
local failedMission = false
local deliveryPos = { x = 188.46, y = -3169.48, z = 5.52}
local endPosVIP = { x = 194.92, y = -3167.32, z = 5.79}
local posDrugDealerVipZone = vector3(-770, -1304.21, 5)
local drugDealerVip = -1660909656
local drugDealerVipSpawned = false
local SpawnedDrugDealer = nil
local dealerSpawnPed = {x=-762.05,y=-1309.91,z=9.6,h=331.29}
local posDealDealer = {x=-766.67,y=-1305.6,z=6.2,h=49.07}
local posDealVip = {x=-767.58,y=-1304.62,z=5.13,h=227.92}
local posDealerEnd = vector3(-747.67,-1321.4,9.6)
local spawnCar = {
    ['limo'] = 'patriot2',
    ['bus'] = 'pbus2',
    coord = vector3(165.42, -3164.68, 5.62),
    h = 269.08
}
local timerDrivePassed = false
local missionWorked = nil
local speedLimitVIP = 80
local countAlertSpeed = 5
local countCurrentAlertSpeed = 0
local Star = {
    modelType = {
        {
            type = 'fast',
            models = {
                -96953009,
                -628553422,
                -1519253631
            }
        },
        {
            type = 'lower',
            models = {
                848542158,
                1633872967,
                1744231373,
            }
        }
    }
}
local coordMissionClub = {
    {
        vector3(-104.99, -607.66, 36.06),
        143
    },
    {
        vector3(67.18, -280.5, 47.14),
        155
    },
    {
        vector3(286.16, -229.69, 53.95),
        180
    },
    {
        vector3(320.61, 165.72, 103.55),
        217
    },
    {
        vector3(-104.19, 427.56, 113.19),
        222
    },
    {
        vector3(-776.77, 295.68, 85.76),
        233
    }
}

-- SECURITY JOB --
local BONUSMAX = 10
local BASERATE = 100
local BASECHANCE = 1
local MAXCUSTOMERGROUP = 8
local MINCUSTOMERGROUP = 2
local JOBTIME = 600 --seconds

local missionStarted = false
local waiting = false
local girlsTotal = 0
local badguysTotal = 0
local guysTotal = 0
local workTimer

local MAXDISTANCE = 15.0
local CLOSE = 1.5
local WORKPOS = {x = 193.36, y = -3169.6, z = 5.79}
local GOTOPED = vector3(192.89, -3164.49, 5.79)
local CLUBGATE = vector3(195.47, -3167.24, 5.79)
local INCLUB = {x = -1569.37, y = -3017.49, z = -74.30}
local incomingCustomer = false
local goingToClub = false
local customerSellDrug = false
local customerOfferMoney = false
local fighting = false
local NoSpawnCustomerCount = 0
local spawnRate
local spawnChance

local diceSellDrug
local diceOfferMoney
local diceHowMuch
local diceBadAngry
local dicePoorAngry
local diceNbCustomers
local diceIsFamous
local diceDefaultIsBad
local diceBadIsBad
local dicePoorIsBad

local type
local models
local model
local clib
local canim

SpawnedCustomers = {}
local Customer = {
    type = {
        {
            name = 'rich',
            models = {
                1423699487,
                1982350912,
                1068876755,
                1720428295,
                -1697435671,
                2120901815,
                -912318012,
                -1280051738,
                -1589423867,
                1048844220,
                -1852518909,
                1561705728,
                1264851357,
                534725268,
                835315305,
                1299424319
                -- DJ reject malus ?
            },
            anims = {
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_partying_male_partying_beer_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_drinking_beer_male_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_hang_out_street_male_c_base"
                }
            }
        },
        {
            name = 'default',
            models = {
                -900269486,
                -1481174974,
                -1029146878,
                -812470807,
                -1976105999,
                -417940021,
                -1538846349,
                -92584602,
                68070371,
                2114544056,
                377976310,
                891398354,
                587703123,
                349505262,
                1443057394,
                2145639711,
                1443057394,
                2145639711,
                919005580,
                605602864,
                718836251,
                2064532783,
                321657486
            },
            anims = {
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_partying_male_partying_beer_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_drinking_beer_male_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_hang_out_street_male_c_base"
                }
            }
        },
        {
            name = 'bad',
            models = {
                --gang
                -198252413,
                588969535,
                -1492432238,
                599294057,
                -1109568186,
                1226102803,
                832784782,
                -1773333796,
                -1872961334,
                663522487,
                846439045,
                62440720,
                --misc
                -521758348,
                -150026812,
                -459818001,
                -1023672578,
                -1948675910,
                -1643617475,
                -396800478,
                -48477765,
                -1398552374,
                1750583735,
                1161072059,
                653210662,
                228715206
            },
            anims = {
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_partying_male_partying_beer_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_drinking_beer_male_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_hang_out_street_male_c_base"
                }
            }
        },
        {
            name = 'poor',
            models = {
                1430544400,
                -1251702741,
                1268862154,
                -2132435154,
                1191548746,
                1787764635,
                516505552,
                390939205,
                1404403376,
                2097407511,
                1768677545,
                -264140789,
                1082572151,
                -2077764712,
                -681546704,
                1984382277,
                1626646295,
                1328415626
            },
            anims = {
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_partying_male_partying_beer_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_drinking_beer_male_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_hang_out_street_male_c_base"
                }
            }
        },
        {
            name = 'girl',
            models = {
                -1106743555,
                1146800212,
                -1606864033,
                -625565461,
                1546450936,
                549978415,
                920595805,
                -85696186,
                933092024,
                435429221,
                -1366884940,
                -1211756494,
                826475330,
                532905404,
                -1054459573,
                -1007230075,
                1744231373,
                357447289,
                222643882,
                -1394433551,
                130590395,
                70821038,
                -1745486195,
                -1514497514,
                429425116,
                -1768198658,
                -619494093
                -- Add Stripper ?
                -- vagos
                --1520708641,
                -- ballas
                --361513884,
                -- biker
                --96953009, -44746786,
                -- fat
                -- 951767867, -1244692252, -88831029,
                -- hooker
                -- 42647445, 348382215, 51789996,
                -- tramp
                -- 1224306523, -1935621530
            },
            anims = {
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "mini_strip_club_lap_dance_ld_girl_a_song_a_p1"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_partying_female_partying_beer_base"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "mini_strip_club_private_dance_idle_priv_dance_idle"
                },
                {
                    lib = "mini@strip_club@idles@stripper",
                    anim = "stripper_idle_01"
                },
                {
                    lib = "anim@amb@nightclub@peds@",
                    anim = "amb_world_human_cheering_female_c"
                }
            }
        }
    },
    pos = vector3(207.2, -3134.89, 5.79),
    h = 35.71
}
local CustomersInClub = {
    {
        pos = {x = -1590.66, y = -3014.35, z = -79.01, h = 68.51},
        ped,
        id = 01
    },
    {
        pos = {x = -1599.47, y = -3013.96, z = -79.01, h = 73.78},
        ped,
        id = 02
    },
    {
        pos = {x = -1579.83, y = -3014.81, z = -79.01, h = 217.33},
        ped,
        id = 03
    },
    {
        pos = {x = -1587.11, y = -3010.42, z = -79.01, h = 220.38},
        ped,
        id = 04
    },
    {
        pos = {x = -1588.15, y = -3014.23, z = -76.01, h = 2.23},
        ped,
        id = 05
    },
    {
        pos = {x = -1589.82, y = -3005.39, z = -76.01, h = 141.94},
        ped,
        id = 06
    },
    {
        pos = {x = -1600.95, y = -3007.78, z = -76.01, h = 209.77},
        ped,
        id = 07
    },
    {
        pos = {x = -1596.34, y = -3010.38, z = -79.01, h = 118.11},
        ped,
        id = 08
    },
    {
        pos = {x = -1591.04, y = -3009.25, z = -76.01, h = 101.24},
        ped,
        id = 09
    },
    {
        pos = {x = -1593.89, y = -3008.52, z = -80.01, h = 209.22},
        ped,
        id = 10
    },
    {
        pos = {x = -1587.04, y = -3005.37, z = -80.01, h = 137.55},
        ped,
        id = 11
    },
    {
        pos = {x = -1576.61, y = -3014.49, z = -80.01, h = 168.78},
        ped,
        id = 12
    },
    {
        pos = {x = -1590.54, y = -3018.24, z = -77.00, h = 317.10},
        ped,
        id = 13
    },
    {
        pos = {x = -1585.82, y = -3008.32, z = -77.00, h = 218.75},
        ped,
        id = 14
    },
    {
        pos = {x = -1599.40, y = -3000.15, z = -76.81, h = 233.95},
        ped,
        id = 15
    },
    {
        pos = {x = -1594.81, y = -3014.21, z = -80.01, h = 71.46},
        ped,
        id = 16
    },
    {
        pos = {x = -1597.48, y = -3010.60, z = -80.01, h = 104.40},
        ped,
        id = 17
    },
    {
        pos = {x = -1595.69, y = -3015.98, z = -78.81, h = 7.77},
        ped,
        id = 18
    },
    {
        pos = {x = -1590.34, y = -3012.13, z = -77.00, h = 92.40},
        ped,
        id = 19
    },
    {
        pos = {x = -1605.82, y = -3011.27, z = -78.80, h = 244.36},
        ped,
        id = 20
    },
    {
        pos = {x = -1589.85, y = -3017.03, z = -76.01, h = 178.08},
        ped,
        id = 21
    },
    {
        pos = {x = -1597.33, y = -3009.50, z = -80.01, h = 170.30},
        ped,
        id = 22
    },
    {
        pos = {x = -1588.78, y = -3017.87, z = -77.01, h = 65.83},
        ped,
        id = 23
    },
    {
        pos = {x = -1597.09, y = -3000.30, z = -76.81, h = 145.02},
        ped,
        id = 24
    },
    {
        pos = {x = -1577.94, y = -3014.36, z = -80.01, h = 225.58},
        ped,
        id = 25
    },
    {
        pos = {x = -1596.56, y = -3013.57, z = -80.01, h = 65.55},
        ped,
        id = 26
    },
    {
        pos = {x = -1591.78, y = -3010.03, z = -80.01, h = 116.30},
        ped,
        id = 27
    },
    {
        pos = {x = -1587.04, y = -3011.44, z = -77.00, h = 101.45},
        ped,
        id = 28
    },
    {
        pos = {x = -1598.90, y = -3006.84, z = -77.00, h = 268.78},
        ped,
        id = 29
    },
    {
        pos = {x = -1575.12, y = -3006.97, z = -80.01, h = 157.70},
        ped,
        id = 30
    },
    {
        pos = {x = -1599.30, y = -3012.06, z = -80.01, h = 316.20},
        ped,
        id = 31
    },
    {
        pos = {x = -1587.75, y = -3007.00, z = -80.01, h = 354.15},
        ped,
        id = 32
    },
    {
        pos = {x = -1575.79, y = -3008.55, z = -80.01, h = 324.48},
        ped,
        id = 33
    },
    {
        pos = {x = -1592.69, y = -3008.70, z = -80.01, h = 133.05},
        ped,
        id = 34
    },
    {
        pos = {x = -1606.27, y = -3014.39, z = -78.80, h = 337.85},
        ped,
        id = 35
    },
    {
        pos = {x = -1575.75, y = -3012.27, z = -80.01, h = 135.35},
        ped,
        id = 36
    },
    {
        pos = {x = -1588.74, y = -3011.59, z = -77.00, h = 277.38},
        ped,
        id = 37
    },
    {
        pos = {x = -1599.36, y = -3002.17, z = -76.81, h = 325.15},
        ped,
        id = 38
    },
    {
        pos = {x = -1597.49, y = -3006.86, z = -77.00, h = 93.60},
        ped,
        id = 39
    },
    {
        pos = {x = -1596.35, y = -3011.46, z = -80.01, h = 107.00},
        ped,
        id = 40
    },
    {
        pos = {x = -1611.66, y = -3009.90, z = -80.01, h = 119.85},
        ped,
        id = 41
    },
    {
        pos = {x = -1598.52, y = -3019.05, z = -79.01, h = 3.79},
        ped,
        id = 42
    },
    {
        pos = {x = -1600.6, y = -3018.87, z = -79.01, h = 340.41},
        ped,
        id = 43
    },
    {
        pos = {x = -1584.99, y = -3018.54, z = -76.01, h = 50.9},
        ped,
        id = 44
    },
    {
        pos = {x = -1591.38, y = -3005.38, z = -76.01, h = 141.94},
        ped,
        id = 45
    }
}
local FightsInClub = {
    {
        pos1 = {x = -1586.83, y = -3018.63, z = -79.01, h = 14.28},
        pos2 = {x = -1588.17, y = -3015.51, z = -79.01, h = 186.13},
        ped1,
        ped2,
        id = 01
    },
    {
        pos1 = {x = -1591.47, y = -3008.86, z = -79.01, h = 121.2},
        pos2 = {x = -1590.83, y = -3010.53, z = -79.01, h = 82.2},
        ped1,
        ped2,
        id = 02
    },
    {
        pos1 = {x = -1588.56, y = -3005.49, z = -79.01, h = 236.13},
        pos2 = {x = -1587.01, y = -3008.83, z = -79.01, h = 92.46},
        ped1,
        ped2,
        id = 03
    },
    {
        pos1 = {x = -1581.41, y = -3013.9, z = -79.01, h = 267.56},
        pos2 = {x = -1576.28, y = -3011.53, z = -79.01, h = 137.85},
        ped1,
        ped2,
        id = 04
    },
    {
        pos1 = {x = -1595.71, y = -3001.57, z = -75.81, h = 186.11},
        pos2 = {x = -1598.14, y = -3002.19, z = -75.81, h = 22.93},
        ped1,
        ped2,
        id = 05
    }
}
local DancersInClub = {
--     {
--         pos = {x = -1598.59, y = -3015.69, z = -80.21, h = 282.30},
--         lib = "anim@amb@nightclub@peds@",
--         anim = "mini_strip_club_lap_dance_ld_girl_a_song_a_p1",
--         ped
--     },
--     {
--         pos = { x = -1596.21, y = -3007.97, z = -80.21, h = 151.05 },
--         lib = "anim@amb@nightclub@peds@",
--         anim = "mini_strip_club_lap_dance_ld_girl_a_song_a_p1",
--         ped
--     }
}

ESX = nil
Citizen.CreateThread(
    function()
        while ESX == nil do
            TriggerEvent(
                'esx:getSharedObject',
                function(obj)
                    ESX = obj
                end
            )
            Citizen.Wait(0)
        end
    end
)

function IsJobTrue()
    if PlayerData ~= nil then
        local IsJobTrue = false
        if PlayerData.job ~= nil and PlayerData.job.name == 'nightclub' then
            IsJobTrue = true
        end
        return IsJobTrue
    end
end

function IsEmployed()
    if PlayerData ~= nil then
        local IsEmployed = false
        if PlayerData.job.grade_name ~= 'interim' then
            IsEmployed = true
        end
        return IsEmployed
    end
end

function IsSecurity()
    if PlayerData ~= nil then
        local IsSecurity = false
        if PlayerData.job.grade_name == 'security' or PlayerData.job.grade_name == 'chefsecurity' then
            IsSecurity = true
        end
        return IsSecurity
    end
end

function IsGradeBoss()
    if PlayerData ~= nil then
        local IsGradeBoss = false
        if PlayerData.job.grade_name == 'boss' or PlayerData.job.grade_name == 'viceboss' then
            IsGradeBoss = true
        end
        return IsGradeBoss
    end
end

function cleanPlayer(playerPed)
    ClearPedBloodDamage(playerPed)
    ResetPedVisibleDamage(playerPed)
    ClearPedLastWeaponDamage(playerPed)
    ResetPedMovementClipset(playerPed, 0)
end

function setUniform(job, playerPed)
    TriggerEvent(
        'skinchanger:getSkin',
        function(skin)
            if skin.sex == 0 then
                if Config.Uniforms[job].male ~= nil then
                    TriggerEvent('skinchanger:loadClothes', skin, Config.Uniforms[job].male)
                else
                    ESX.ShowNotification(_U('no_outfit'))
                end
            else
                if Config.Uniforms[job].female ~= nil then
                    TriggerEvent('skinchanger:loadClothes', skin, Config.Uniforms[job].female)
                else
                    ESX.ShowNotification(_U('no_outfit'))
                end
            end
        end
    )
end

function OpenCloakroomMenu()
    local playerPed = GetPlayerPed(-1)

    local elements = {
        {label = _U('citizen_wear'), value = 'citizen_wear'},
        {label = _U('security_outfit'), value = 'security_outfit'},
        {label = _U('barman_outfit'), value = 'barman_outfit'},
        {label = _U('dancer_outfit_1'), value = 'dancer_outfit_1'},
        {label = _U('dancer_outfit_2'), value = 'dancer_outfit_2'},
        {label = _U('dancer_outfit_3'), value = 'dancer_outfit_3'}
    }

    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default',
        GetCurrentResourceName(),
        'cloakroom',
        {
            title = _U('cloakroom'),
            align = 'bottom-right',
            elements = elements
        },
        function(data, menu)
            isBarman = false
            isSecurity = false
            cleanPlayer(playerPed)

            if data.current.value == 'citizen_wear' then
                ESX.TriggerServerCallback(
                    'esx_skin:getPlayerSkin',
                    function(skin)
                        TriggerEvent('skinchanger:loadSkin', skin)
                    end
                )
            end

            if data.current.value == 'barman_outfit' then
                setUniform(data.current.value, playerPed)
                isBarman = true
            end

            if data.current.value == 'security_outfit' then
                setUniform(data.current.value, playerPed)
                isSecurity = true
            end

            if data.current.value == 'dancer_outfit_1' or data.current.value == 'dancer_outfit_2' or data.current.value == 'dancer_outfit_3' then
                setUniform(data.current.value, playerPed)
            end

            CurrentAction = 'menu_cloakroom'
            CurrentActionMsg = _U('open_cloackroom')
            CurrentActionData = {}
        end,
        function(data, menu)
            menu.close()
            CurrentAction = 'menu_cloakroom'
            CurrentActionMsg = _U('open_cloackroom')
            CurrentActionData = {}
        end
    )
end

function OpenVaultMenu()
    if Config.EnableVaultManagement then
        local elements = {
            {label = _U('get_weapon'), value = 'get_weapon'},
            {label = _U('put_weapon'), value = 'put_weapon'},
            {label = _U('get_object'), value = 'get_stock'},
            {label = _U('put_object'), value = 'put_stock'}
        }

        ESX.UI.Menu.CloseAll()

        ESX.UI.Menu.Open(
            'default',
            GetCurrentResourceName(),
            'vault',
            {
                title = _U('vault'),
                align = 'bottom-right',
                elements = elements
            },
            function(data, menu)
                if data.current.value == 'get_weapon' then
			TriggerEvent('esx_stockmenu:OpenGetWeaponMenu', 'society_nightclub')
                end

                if data.current.value == 'put_weapon' then
			TriggerEvent('esx_stockmenu:OpenPutWeaponMenu', 'society_nightclub')
                end

                if data.current.value == 'put_stock' then
			TriggerEvent('esx_stockmenu:OpenPutStocksMenu', 'stock', 'society_nightclub')
                end

                if data.current.value == 'get_stock' then
			TriggerEvent('esx_stockmenu:OpenGetStocksMenu', 'stock', 'society_nightclub')
                end
            end,
            function(data, menu)
                menu.close()

                CurrentAction = 'menu_vault'
                CurrentActionMsg = _U('open_vault')
                CurrentActionData = {}
            end
        )
    end
end

function OpenFridgeMenu()
    local elements = {
        {label = _U('get_object'), value = 'get_stock'},
        {label = _U('put_object'), value = 'put_stock'}
    }

    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default',
        GetCurrentResourceName(),
        'fridge',
        {
            title = _U('fridge'),
            align = 'bottom-right',
            elements = elements
        },
        function(data, menu)
            if data.current.value == 'put_stock' then
		TriggerEvent('esx_stockmenu:OpenPutStocksMenu', 'stock', 'society_nightclub_fridge')
            end

            if data.current.value == 'get_stock' then
		TriggerEvent('esx_stockmenu:OpenGetStocksMenu', 'stock', 'society_nightclub_fridge')
            end
        end,
        function(data, menu)
            menu.close()

            CurrentAction = 'menu_fridge'
            CurrentActionMsg = _U('open_fridge')
            CurrentActionData = {}
        end
    )
end

function OpenSocietyActionsMenu()
    local elements = {}

    table.insert(elements, {label = _U('billing'), value = 'billing'})
    table.insert(elements, {label = _U('mission'), value = 'mission'})
    if isBarman or IsGradeBoss() then
        table.insert(elements, {label = _U('crafting'), value = 'menu_crafting'})
    end
    if IsGradeBoss() or IsSecurity() then
        table.insert(elements, {label = _U('search'), value = 'body_search'})
    end

    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default',
        GetCurrentResourceName(),
        'nightclub_actions',
        {
            title = _U('nightclub'),
            align = 'top-left',
            elements = elements
        },
        function(data, menu)
            if data.current.value == 'billing' then
                OpenBillingMenu()
            elseif data.current.value == 'mission' then
                if not drivingStarted then
                    StartMission()
                    menu.close()
                else
                    StopMission()
                    menu.close()
                end
            elseif data.current.value == 'menu_crafting' then
                ESX.UI.Menu.Open(
                    'default',
                    GetCurrentResourceName(),
                    'menu_crafting',
                    {
                        title = _U('crafting'),
                        align = 'top-left',
                        elements = {
                            {label = _U('jagerbomb'), value = 'jagerbomb'},
                            {label = _U('whiskycoca'), value = 'whiskycoca'},
                            {label = _U('vodkaenergy'), value = 'vodkaenergy'},
                            {label = _U('vodkafruit'), value = 'vodkafruit'},
                            {label = _U('rhumfruit'), value = 'rhumfruit'},
                            {label = _U('teqpaf'), value = 'teqpaf'},
                            {label = _U('rhumcoca'), value = 'rhumcoca'},
                            {label = _U('mojito'), value = 'mojito'}
                        }
                    },
                    function(data2, menu2)
                        selectedCraft = data2.current.value
                        TriggerEvent("mythic_progbar:client:progress", {
                            name = "nc_barman",
                            duration = 5000,
                            label = "Préparation en cours...",
                            useWhileDead = false,
                            canCancel = true,
                            controlDisables = {
                                disableMovement = true,
                                disableCarMovement = true,
                                disableMouse = false,
                                disableCombat = true,
                            },
                            animation = {
                                animDict = 'mini@drinking',
                                anim = 'shots_barman_b',
                            },
                            --[[prop = {
                                model = "prop_paper_bag_small",
                            }]]
                        }, function(status)
                            if not status then
                                TriggerServerEvent('esx_nightclub:craftingCoktails', selectedCraft)
                            end
                        end)
                    end,
                    function(data2, menu2)
                        menu2.close()
                    end
                )

            elseif data.current.value == 'body_search' then
                local closestPlayer, closestDistance = ESX.Game.GetClosestPlayer()
                if closestPlayer ~= -1 and closestDistance <= 3.0 then
                    TriggerServerEvent('esx_nightclub:message', GetPlayerServerId(closestPlayer))
                    OpenBodySearchMenu(closestPlayer)
                end
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function OpenBillingMenu()
    ESX.UI.Menu.Open(
        'dialog',
        GetCurrentResourceName(),
        'billing',
        {
            title = _U('billing_amount')
        },
        function(data, menu)
            local amount = tonumber(data.value)
            local player, distance = ESX.Game.GetClosestPlayer()

            if player ~= -1 and distance <= 3.0 then
                menu.close()
                if amount == nil or amount < 0 then
                    ESX.ShowNotification(_U('amount_invalid'))
                else
                    TriggerServerEvent('esx_billing:sendBill', GetPlayerServerId(player), 'society_nightclub', _U('billing'), amount)
                end
            else
                ESX.ShowNotification(_U('no_players_nearby'))
            end
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function OpenShopMenu(zone)
    local elements = {}
    for i = 1, #Config.Zones[zone].Items, 1 do
        local item = Config.Zones[zone].Items[i]

        table.insert(
            elements,
            {
                label = item.label .. ' - <span style="color:green;">$' .. item.price .. ' </span>',
                realLabel = item.label,
                value = item.name,
                price = item.price
            }
        )
    end

    ESX.UI.Menu.CloseAll()

    ESX.UI.Menu.Open(
        'default',
        GetCurrentResourceName(),
        'nightclub_shop',
        {
            title = _U('shop'),
            align = 'bottom-right',
            elements = elements
        },
        function(data, menu)
            TriggerServerEvent('esx_nightclub:buyItem', data.current.value, data.current.price, data.current.realLabel)
        end,
        function(data, menu)
            menu.close()
        end
    )
end

function TPClub(enter)
    local pos
    local playerPed = GetPlayerPed(-1)
    if enter then
        pos = Config.Zones.Exit.Pos
    elseif not enter then
        pos = Config.Zones.Entry.Pos
    end
    DoScreenFadeOut(500)
    Citizen.Wait(500)
    ESX.Game.Teleport(playerPed, pos)
    CurrentAction = nil
    Citizen.Wait(1000)
    DoScreenFadeIn(1000)
end

----------------
--SECURITY JOB--
----------------

function startSecurity()
    if isSecurity then
        missionStarted = true
        local maxTimer = JOBTIME * 100
        workTimer = maxTimer
        ESX.ShowNotification('Внимательно выбирайте ~y~Клиентов~w~ чтобы ваш клуб заработал ~p~Прибыль~w~.')
        Citizen.Wait(5000)
        -- ESX.ShowNotification('~r~Ne prenez pas n\'importe qui~w~, sinon vous risquez d\'attirer des ennuis au ~p~Club~w~.')
        while workTimer > 0 and missionStarted do
            Citizen.Wait(0)
            if (workTimer < maxTimer) and not waiting  then
                if workTimer % spawnRate == 0 then
                    local rollCustomer = math.random(0, spawnChance)
                    if rollCustomer == 0 then
                        spawnCustomers()
                    else
                        NoSpawnCustomerCount = NoSpawnCustomerCount + 1
                        if NoSpawnCustomerCount > 3 then
                            NoSpawnCustomerCount = 0
                            spawnCustomers()
                        end
                    end
                end
            end
            if not waiting then
                workTimer = workTimer - 1
            end
        end
        resetWork()
    else
        ESX.ShowNotification('~r~Вы одеты не по форме.')
    end
end

function spawnCustomers()
    rollDice()
    if not waiting then
        spawnCustomerGroup()
    end
    waiting = true
    incomingCustomers()
end

function rollDice()
    if (girlsTotal >= MINCUSTOMERGROUP) and (girlsTotal <= MAXCUSTOMERGROUP) then
        diceNbCustomers = math.random(1, girlsTotal)
    else
        diceNbCustomers = 1
    end
    diceSellDrug = math.random(0, 5)
    diceOfferMoney = math.random(0, 1)
    diceHowMuch = math.random(50, 100)
    diceBadAngry = math.random(0, 2)
    dicePoorAngry = math.random(0, 4)
    diceIsFamous = math.random(0, 9)
    diceDefaultIsBad = math.random(0, 9)
    diceBadIsBad = math.random(0, 1)
    dicePoorIsBad = math.random(0, 3)
end

function spawnCustomerGroup()
    local count = diceNbCustomers
    while count > 0 do
        loadModel()
        SpawnedCustomers[count] = {
            ped = CreatePed(2, model, Customer.pos, Customer.h, true, true),
            name = Customer.type[type].name
        }
        for i, v in pairs(SpawnedCustomers) do
            SetEntityAsMissionEntity(v.ped)
        end
        count = count - 1
    end
end

function incomingCustomers()
    for i, v in pairs(SpawnedCustomers) do
        TaskGoToCoordAnyMeans(v.ped, GOTOPED, 1.0, 0, 0, 0, 0)
        incomingCustomer = true
    end
    ESX.ShowNotification("Приближается ~y~клиент~w~.")
end

function rejectCustomer()
    ESX.ShowNotification('Вы ~r~отказали~w~.')
    incomingCustomer = false
    for i, v in pairs(SpawnedCustomers) do
        if ((v.name == 'bad') and (diceBadAngry == 0)) then
            TaskCombatPed(v.ped, GetPlayerPed(-1), 0, 16)
        elseif ((v.name == 'poor') and (dicePoorAngry == 0)) then
            TaskCombatPed(v.ped, GetPlayerPed(-1), 0, 16)
        elseif (v.name ~= 'poor') or (v.name ~= 'bad') or ((v.name == 'poor') and (dicePoorAngry > 0)) or ((v.name == 'bad') and (diceBadAngry == 0)) then
            resetCustomer(v.ped)
        end
    end
end

function acceptCustomer()
    goingToClub = true
    incomingCustomer = false
    for i, v in pairs(SpawnedCustomers) do
        if v.ped ~= nil then
            ESX.ShowNotification('Вы ~g~пропустили~w~.')
            if ((v.name == 'rich') and (diceIsFamous > 0)) or ((v.name == 'default') and (diceDefaultIsBad > 0)) or ((v.name == 'bad') and (diceBadIsBad > 0)) or ((v.name == 'poor') and (dicePoorIsBad > 0)) then
                TriggerServerEvent('esx_nightclub:sellEntry', v.name, 'good')
            elseif ((v.name == 'default') and (diceDefaultIsBad == 0)) or ((v.name == 'bad') and (diceBadIsBad == 0)) or ((v.name == 'poor') and (dicePoorIsBad == 0)) then
                TriggerServerEvent('esx_nightclub:sellEntry', v.name, 'bad')
            elseif (v.name == 'rich') and (diceIsFamous == 0) then
                TriggerServerEvent('esx_nightclub:sellEntry', v.name, 'famous')
            elseif v.name == 'girl' then
                TriggerServerEvent('esx_nightclub:sellEntry', v.name, 'girl')
            end
            if v.name == 'bad' and customerSellDrug then
                TriggerServerEvent('esx_nightclub:buyDrug')
                customerSellDrug = false
            elseif v.name == 'bad' and customerOfferMoney then
                TriggerServerEvent('esx_nightclub:takeMoneyCustomer', diceHowMuch)
                customerOfferMoney = false
            end
            TaskGoToCoordAnyMeans(v.ped, CLUBGATE, 1.0, 0, 0, 0, 0)
        end
    end
end

function resetCustomer(customer)
    for i, v in pairs(SpawnedCustomers) do
        if v.ped == customer then
            SetPedAsNoLongerNeeded(customer)
            SetModelAsNoLongerNeeded(customer)
            v.ped = nil
        end
    end
    local keepWaiting = false
    for i, v in pairs(SpawnedCustomers) do
        if v.ped ~= nil then
            keepWaiting = true
            break
        end
    end
    if not keepWaiting then
        SpawnedCustomers = {}
        waiting = false
        incomingCustomer = false
        goingToClub = false
        TriggerServerEvent('esx_nightclub:getPay')
    end
end

function resetWork()
    for i, v in pairs(SpawnedCustomers) do
        SetPedAsNoLongerNeeded(v.ped)
        SetModelAsNoLongerNeeded(v.ped)
    end
    SpawnedCustomers = {}
    waiting = false
    incomingCustomer = false
    goingToClub = false
    customerSellDrug = false
    customerOfferMoney = false
    missionStarted = false
    workTimer = 0
    TriggerServerEvent('esx_nightclub:serviceOFF')
end

function spawnCustomerInClub(type, id)
    for i, v in pairs(CustomersInClub) do
        if v.id == id then
            loadModel(type)
            loadAnim(type)
            v.ped = CreatePed(2, model, v.pos.x, v.pos.y, v.pos.z, v.pos.h, true, true)
            ESX.Streaming.RequestAnimDict(
                clib,
                function()
                    TaskPlayAnim(v.ped, clib, canim, 8.0, -8.0, -1, 1, 0, false, false, false)
                end
            )
            SetEntityHeading(v.ped, v.pos.h)
            SetEntityInvincible(v.ped, true)
            SetEntityAsMissionEntity(v.ped)
            SetBlockingOfNonTemporaryEvents(v.ped, true)
            Wait(5000)
            FreezeEntityPosition(v.ped, true)
            break
        end
    end
end

function spawnBadGuy(type, id)
    for i, v in pairs(FightsInClub) do
        if v.id == id then
            loadModel(type)
            loadAnim(type)
            v.ped1 = CreatePed(2, model, v.pos1.x, v.pos1.y, v.pos1.z, v.pos1.h, true, true)
            ESX.Streaming.RequestAnimDict(
                clib,
                function()
                    TaskPlayAnim(v.ped1, clib, canim, 8.0, -8.0, -1, 1, 0, false, false, false)
                end
            )
            loadModel(type)
            loadAnim(type)
            v.ped2 = CreatePed(2, model, v.pos2.x, v.pos2.y, v.pos2.z, v.pos2.h, true, true)
            ESX.Streaming.RequestAnimDict(
                clib,
                function()
                    TaskPlayAnim(v.ped2, clib, canim, 8.0, -8.0, -1, 1, 0, false, false, false)
                end
            )
            SetEntityHeading(v.ped1, v.pos1.h)
            SetEntityHeading(v.ped2, v.pos2.h)
            SetEntityInvincible(v.ped1, true)
            SetEntityInvincible(v.ped2, true)
            SetEntityAsMissionEntity(v.ped1)
            SetEntityAsMissionEntity(v.ped2)
            SetBlockingOfNonTemporaryEvents(v.ped1, true)
            SetBlockingOfNonTemporaryEvents(v.ped2, true)
            Wait(5000)
            FreezeEntityPosition(v.ped1, true)
            FreezeEntityPosition(v.ped2, true)
            break
        end
    end
end

function removeGirl(id)
    for i, v in pairs(CustomersInClub) do
        if v.id == id then
            deletePed(v.ped)
            v.ped = nil
            break
        end
    end
end

function startFightInClub()
    fighting = true
    for i, v in pairs(FightsInClub) do
        FreezeEntityPosition(v.ped1, false)
        FreezeEntityPosition(v.ped2, false)
        SetEntityInvincible(v.ped1, false)
        SetEntityInvincible(v.ped2, false)
        TaskCombatPed(v.ped1, v.ped2, 0, 16)
        TaskCombatPed(v.ped2, v.ped1, 0, 16)
    end
    removeCustomer()
    removeDancer()
end

function spawnDancer()
    for i, v in pairs(DancersInClub) do
        local dancerModel = 0x303638a7
        RequestModel(dancerModel)
        while not HasModelLoaded(dancerModel) do
            Citizen.Wait(1)
        end
        v.ped = CreatePed(2, dancerModel, v.pos.x, v.pos.y, v.pos.z, v.pos.h, true, true)
        ESX.Streaming.RequestAnimDict(
            v.lib,
            function()
                TaskPlayAnim(v.ped, v.lib, v.anim, 8.0, -8.0, -1, 1, 0, false, false, false)
            end
        )
        SetEntityHeading(v.ped, v.pos.h)
        SetEntityInvincible(v.ped, true)
        SetEntityAsMissionEntity(v.ped)
        SetBlockingOfNonTemporaryEvents(v.ped, true)
        FreezeEntityPosition(v.ped, true)
    end
end

function removeDancer()
    for i, v in pairs(DancersInClub) do
        deletePed(v.ped)
    end
end

function removeCustomer()
    for i, v in pairs(CustomersInClub) do
        deletePed(v.ped)
        v.ped = nil
    end
end

function deletePed(ped)
    if IsEntityAPed(ped) then
        FreezeEntityPosition(ped, false)
        SetBlockingOfNonTemporaryEvents(ped, false)
        SetEntityInvincible(ped, false)
        SetEntityAsNoLongerNeeded(ped)
        SetModelAsNoLongerNeeded(ped)
        Citizen.Wait(5000)
        DeleteEntity(ped)
    end
end

function loadAnim(customerType)
    if customerType == nil then
        type = math.random(1, #Customer.type)
    else
        type = customerType
    end
    anims = Customer.type[type].anims
    customerAnim = anims[math.random(1, #anims)]
    clib = customerAnim.lib
    canim = customerAnim.anim
end

function loadModel(customerType)
    if customerType == nil then
        type = math.random(1, #Customer.type)
    else
        type = customerType
    end
    models = Customer.type[type].models
    model = models[math.random(1, #models)]
    RequestModel(model)
    while not HasModelLoaded(model) do
        Citizen.Wait(1)
    end
end

function showTextHUD(x,y, width, height, scale, text, r,g,b,a, outline)
	SetTextFont(0)
	SetTextProportional(0)
	SetTextScale(scale, scale)
	SetTextColour(r, g, b, a)
	SetTextDropShadow(0, 0, 0, 0,255)
	SetTextEdge(1, 0, 0, 0, 255)
	SetTextDropShadow()
	if outline then SetTextOutline() end
	BeginTextCommandDisplayText('STRING')
	AddTextComponentSubstringPlayerName(text)
	EndTextCommandDisplayText(x - width/2, y - height/2 + 0.005)
end

function OpenBodySearchMenu(player)
	ESX.TriggerServerCallback('esx_nightclub:getOtherPlayerData', function(data)
		local elements = {}

		for i=1, #data.accounts, 1 do
			if data.accounts[i].name == 'black_money' and data.accounts[i].money > 0 then
				table.insert(elements, {
					label    = _U('confiscate_dirty', ESX.Math.Round(data.accounts[i].money)),
					value    = 'black_money',
					itemType = 'item_account',
					amount   = data.accounts[i].money
				})

				break
			end
		end

		table.insert(elements, {label = _U('guns_label')})

		for i=1, #data.weapons, 1 do
			table.insert(elements, {
				label    = _U('confiscate_weapon', ESX.GetWeaponLabel(data.weapons[i].name), data.weapons[i].ammo),
				value    = data.weapons[i].name,
				itemType = 'item_weapon',
				amount   = data.weapons[i].ammo
			})
		end

		table.insert(elements, {label = _U('inventory_label')})

		for i=1, #data.inventory, 1 do
			if data.inventory[i].count > 0 then
				table.insert(elements, {
					label    = _U('confiscate_inv', data.inventory[i].count, data.inventory[i].label),
					value    = data.inventory[i].name,
					itemType = 'item_standard',
					amount   = data.inventory[i].count
				})
			end
		end

		ESX.UI.Menu.Open('default', GetCurrentResourceName(), 'body_search', {
			title    = _U('search'),
			align    = 'top-left',
			elements = elements
		}, function(data, menu)
			if data.current.value then
				TriggerServerEvent('esx_nightclub:confiscatePlayerItem', GetPlayerServerId(player), data.current.itemType, data.current.value, data.current.amount)
				OpenBodySearchMenu(player)
			end
		end, function(data, menu)
			menu.close()
		end)
	end, GetPlayerServerId(player))
end

-------------
--DRIVE JOB--
-------------

function SpawnCarNightClub()
    if not carOut and not IsGradeBoss() then
        TriggerServerEvent('esx_nightclub:driverCaution', 'limo')
    elseif not carOut and IsGradeBoss() then
        ESX.UI.Menu.CloseAll()
        ESX.UI.Menu.Open(
            "default",
            GetCurrentResourceName(),
            "veh_nc_menu",
            {
                title = "Транспорт клуба",
                elements = {
                    {label = "Лемузин", value = 'limo'},
                    {label = "Автобус", value = 'bus'}
                }
            },
            function(data, menu)
                local val = data.current.value
                menu.close()
                TriggerServerEvent('esx_nightclub:driverCaution', val)
            end,
            function(data, menu)
                menu.close()
            end
        )
    else
        ESX.ShowNotification('~r~Вы уже выгнали транспорт.')
    end
end

function DespawnCarNightClub()
    if IsInCarClub() or IsInBusClub() then
        local vehiclehealth = GetEntityHealth(TargetVehicle)
        local maxhealth = GetEntityMaxHealth(TargetVehicle)
        local diff = maxhealth - vehiclehealth
        if diff <= 50 then
            if IsInCarClub() then
                TriggerServerEvent('esx_nightclub:returnCar', 'limo')
            elseif IsInBusClub() then
                TriggerServerEvent('esx_nightclub:returnCar', 'bus')
            end
            ESX.Game.DeleteVehicle(TargetVehicle)
            carOut = false
        else
            ESX.UI.Menu.CloseAll()
            ESX.UI.Menu.Open(
                'default',
                GetCurrentResourceName(),
                'caution',
                {
                    title = 'Perdre la caution ?',
                    align = 'top-left',
                    elements = {
                        {label = 'Oui', value = 'yes'},
                        {label = 'Non', value = 'no'}
                    }
                },
                function(data, menu)
                    local choice = data.current.value
                    if choice == 'yes' then
                        ESX.Game.DeleteVehicle(TargetVehicle)
                        carOut = false
                        menu.close()
                    elseif choice == 'no' then
                        menu.close()
                    end
                end,
                function(data, menu)
                    menu.close()
                end
            )
            ESX.ShowNotification('Автомобиль в плохом состоянии, вы потеряете залог.')
        end
    else
        ESX.ShowNotification('~r~Это не тот автомобиль!')
    end
end

function StartMission()
    local playerPed = GetPlayerPed(-1)
    if IsInCarClub() then
        local star = math.random(1, #coordMissionClub)
        StarPos = coordMissionClub[star][1]
        ClearGpsPlayerWaypoint(playerPed)
        SetNewWaypoint(StarPos)
        drivingStarted = true
        ESX.ShowNotification("~y~VIP~w~ нуждается в лимузине, заберите его и отвезите в ~p~Клуб~w~.")
    else
        ESX.ShowNotification(_U('not_in_vehicle'))
    end
end

function StopMission()
    drivingStarted = false
    DeletePed(SpawnedStar)
    local playerPed = GetPlayerPed(-1)
    StarPos = nil
    StarType = nil
    missionWorked = false
    SpawnedStar = nil
    SetWaypointOff()
end

function IsInCarClub()
    local IsInCarClub = false
    local playerPed = GetPlayerPed(-1)
    local playerCar = GetVehiclePedIsIn(playerPed, false)
    if IsPedInAnyVehicle(playerPed, false) and IsVehicleModel(playerCar, carClub) then
        IsInCarClub = true
        TargetVehicle = playerCar
    else
        TargetVehicle = nil
    end
    return IsInCarClub
end

function IsInBusClub()
    local IsInBusClub = false
    local playerPed = GetPlayerPed(-1)
    local playerCar = GetVehiclePedIsIn(playerPed, false)
    if IsPedInAnyVehicle(playerPed, false) and IsVehicleModel(playerCar, busClub) then
        IsInBusClub = true
        TargetVehicle = playerCar
    else
        TargetVehicle = nil
    end
    return IsInBusClub
end

function driveVIP()
    -- le vip vien de rentrer dans la limousine
    SetNewWaypoint(deliveryPos.x , deliveryPos.y)
    if StarType == 'fast' then
        for i = 1, #coordMissionClub, 1 do
            if StarPos == coordMissionClub[i][1] then
                timerDrive = coordMissionClub[i][2]
                initTimer = timerDrive
                --timeRemaining = timerDrive - (os.time() - startTimer)
                ESX.ShowNotification('Привет, поехали в ~p~Клуб~w~ и ~r~быстро~w~. У нас есть ~y~' .. timerDrive .. '~w~.')
                missionWorked = true
                timerEnabled = true
                break
            end
        end
    elseif StarType == 'lower' then
        ESX.ShowNotification('Здравствуйте, я хочу насладиться лимузином, не торопитесь.')
        ESX.ShowNotification('Не превышайте  ~r~'..speedLimitVIP..'~w~км/ч.')
        carHealth = GetEntityHealth(TargetVehicle)
        missionWorked = true
    elseif StarType == 'tourist' then
        -- statements
    elseif StarType == 'drug' then
        ESX.ShowNotification('Привет чувак, мне нужно забрать пару вещей прежде чем поехать в клуб. Чаевыми не обижу.')
        ESX.ShowNotification('Отвези его к ~y~дилеру~w~, или сразу в  ~p~Клуб~w~.')
        local blipDrugZone = AddBlipForCoord(posDrugDealerVipZone)
        missionWorked = true
    elseif StarType == 'default' then
        missionWorked = true
    end
end

function DrawHudText(text, colour, coordsx, coordsy, scalex, scaley)
    local colourr, colourg, colourb, coloura = table.unpack(colour)
    SetTextFont(7)
    SetTextProportional(7)
    SetTextScale(scalex, scaley)
    SetTextColour(colourr, colourg, colourb, coloura)
    SetTextDropshadow(0, 0, 0, 0, coloura)
    SetTextEdge(1, 0, 0, 0, coloura)
    SetTextDropShadow()
    SetTextOutline()
    SetTextEntry('STRING')
    AddTextComponentString(text)
    DrawText(coordsx, coordsy)
end

-- EVENT
AddEventHandler(
    'esx_nightclub:hasEnteredMarker',
    function(zone)
        if zone == 'BossActions' and IsGradeBoss() then
            CurrentAction = 'menu_boss_actions'
            CurrentActionMsg = _U('open_bossmenu')
            CurrentActionData = {}
        end

        if zone == 'Cloakrooms' then
            CurrentAction = 'menu_cloakroom'
            CurrentActionMsg = _U('open_cloackroom')
            CurrentActionData = {}
        end

        if zone == 'Security' and not missionStarted and IsEmployed() then
            CurrentAction = 'job_security'
            CurrentActionMsg = _U('start_security')
            CurrentActionData = {}
        end

        if zone == 'Entry' then
            CurrentAction = 'entry_club'
            CurrentActionMsg = _U('enter_club')
            CurrentActionData = {}
        end

        if zone == 'Exit' then
            CurrentAction = 'exit_club'
            CurrentActionMsg = _U('exit_club')
            CurrentActionData = {}
        end

        if zone == 'SpawnCar' then
            CurrentAction = 'spawn_car'
            CurrentActionMsg = _U('spawn_car')
            CurrentActionData = {}
        end

        if zone == 'DespawnCar' then
            CurrentAction = 'despawn_car'
            CurrentActionMsg = _U('despawn_car')
            CurrentActionData = {}
        end

        if Config.EnableVaultManagement then
            if zone == 'Vaults' then
                CurrentAction = 'menu_vault'
                CurrentActionMsg = _U('open_vault')
                CurrentActionData = {}
            end
        end

        if zone == 'Fridge' then
            CurrentAction = 'menu_fridge'
            CurrentActionMsg = _U('open_fridge')
            CurrentActionData = {}
        end

        if zone == 'Flacons' or zone == 'NoAlcool' or zone == 'Apero' or zone == 'Ice' then
            CurrentAction = 'menu_shop'
            CurrentActionMsg = _U('shop_menu')
            CurrentActionData = {zone = zone}
        end
    end
)

AddEventHandler(
    'esx_nightclub:hasExitedMarker',
    function(zone)
        CurrentAction = nil
        ESX.UI.Menu.CloseAll()
    end
)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler(
    'esx:playerLoaded',
    function(xPlayer)
        PlayerData = xPlayer
    end
)

RegisterNetEvent('esx:setJob')
AddEventHandler(
    'esx:setJob',
    function(job)
        PlayerData.job = job
    end
)

-- Create blips
Citizen.CreateThread(
    function()
        local blipMarker = Config.Blips.Blip
        local blipCoord = AddBlipForCoord(blipMarker.Pos.x, blipMarker.Pos.y, blipMarker.Pos.z)

        SetBlipSprite(blipCoord, blipMarker.Sprite)
        SetBlipDisplay(blipCoord, blipMarker.Display)
        SetBlipScale(blipCoord, blipMarker.Scale)
        SetBlipColour(blipCoord, blipMarker.Colour)
        SetBlipAsShortRange(blipCoord, true)

        BeginTextCommandSetBlipName('STRING')
        AddTextComponentString(_U('map_blip'))
        EndTextCommandSetBlipName(blipCoord)
    end
)

-- Display markers
Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)

            local coords = GetEntityCoords(GetPlayerPed(-1))
            local isInMarker = false
            local currentZone = nil
            local letSleep = true

            for k, v in pairs(Config.Zones) do
                if (v.open == true) or IsJobTrue() then
                    if (v.Type ~= -1 and GetDistanceBetweenCoords(coords, v.Pos.x, v.Pos.y, v.Pos.z, true) < Config.DrawDistance) then
                        DrawMarker(v.Type, v.Pos.x, v.Pos.y, v.Pos.z, 0.0, 0.0, 0.0, 0, 0.0, 0.0, v.Size.x, v.Size.y, v.Size.z, v.Color.r, v.Color.g, v.Color.b, 100, false, false, 2, true, false, false, false)
                        letSleep = false
                    end

                    if (GetDistanceBetweenCoords(coords, v.Pos.x, v.Pos.y, v.Pos.z, true) < 2.0) then
                        isInMarker = true
                        currentZone = k
                    end
                end
            end

            if (isInMarker and not HasAlreadyEnteredMarker) or (isInMarker and LastZone ~= currentZone) then
                HasAlreadyEnteredMarker = true
                LastZone = currentZone
                TriggerEvent('esx_nightclub:hasEnteredMarker', currentZone)
            end

            if not isInMarker and HasAlreadyEnteredMarker then
                HasAlreadyEnteredMarker = false
                TriggerEvent('esx_nightclub:hasExitedMarker', LastZone)
            end

            if letSleep then
                Citizen.Wait(500)
            end
        end
    end
)

-- Key Controls
Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(10)

            if CurrentAction ~= nil then
                SetTextComponentFormat('STRING')
                AddTextComponentString(CurrentActionMsg)
                DisplayHelpTextFromStringLabel(0, 0, 1, -1)

                if IsControlJustReleased(0, Keys['E']) then
                    if CurrentAction == 'entry_club' then
                        ESX.TriggerServerCallback(
                            'esx_nightclub:isOpen',
                            function(isOpen)
                                if isOpen then
                                    TPClub(true)
                                elseif IsJobTrue() and IsEmployed() then
                                    TPClub(true)
                                else
                                    ESX.ShowNotification("~r~Клуб закрыт.")
                                end
                            end
                        )
                    end

                    if CurrentAction == 'exit_club' then
                        TPClub(false)
                    end
                end

                if IsControlJustReleased(0, Keys['E']) and IsJobTrue() then
                    if CurrentAction == 'menu_cloakroom' and IsEmployed() then
                        OpenCloakroomMenu()
                    end

                    if CurrentAction == 'job_security' and IsEmployed() then
                        if not missionStarted then
                            TriggerServerEvent('esx_nightclub:StartMissionSecurity')
                        end
                    end

                    if CurrentAction == 'menu_vault' and IsEmployed() then
                        OpenVaultMenu()
                    end

                    if CurrentAction == 'spawn_car' then
                        SpawnCarNightClub()
                    end

                    if CurrentAction == 'despawn_car' then
                        DespawnCarNightClub()
                    end

                    if CurrentAction == 'menu_fridge' and IsEmployed() then
                        OpenFridgeMenu()
                    end

                    if CurrentAction == 'menu_shop' and IsEmployed() then
                        OpenShopMenu(CurrentActionData.zone)
                    end

                    if CurrentAction == 'menu_boss_actions' and IsGradeBoss() then
                        local options = {
                            wash = Config.EnableMoneyWash
                        }

                        ESX.UI.Menu.CloseAll()

                        TriggerEvent('esx_bossmenu:show', 'nightclub', options)
                    end

                    CurrentAction = nil
                end
            end
        end
    end
)
exports(
    'menujob_ni',
    function()
        if not isDead and IsJobTrue() and not ESX.UI.Menu.IsOpen('default', GetCurrentResourceName(), 'nightclub_actions') then
            OpenSocietyActionsMenu()
        end
    end
)

-- Dancing
-- Citizen.CreateThread(
--     function()
--         while true do
--             Citizen.Wait(0)
--             local player = GetPlayerPed(-1)
--             local playerPos = GetEntityCoords(player, false)
--             local distance = Vdist(playerPos.x, playerPos.y, playerPos.z, dancefloorPos.x, dancefloorPos.y, dancefloorPos.z)

--             if distance <= 8.5 then
--                 if dancing then
--                     ESX.ShowHelpNotification('~INPUT_CONTEXT~ ~y~Changer~w~ de dance | ~INPUT_VEH_DUCK~ ~r~Arrêter~w~')
--                 else
--                     ESX.ShowHelpNotification('Appuyez sur ~INPUT_CONTEXT~ pour ~g~dancer~w~.')
--                 end
--                 if IsControlJustReleased(0, Keys['E']) and not IsControlPressed(0, Keys['LEFTSHIFT']) then
--                     if dancing then
--                         local stance = math.random(1, 42)
--                         for i, dance in pairs(Config.Dance) do
--                             if dance.id == stance then
--                                 lib = dance.lib
--                                 anim = dance.anim
--                             end
--                         end
--                         ESX.Streaming.RequestAnimDict(
--                             lib,
--                             function()
--                                 TaskPlayAnim(player, lib, anim, 8.0, -8.0, -1, 1, 0, false, false, false)
--                             end
--                         )
--                     else
--                         ESX.Streaming.RequestAnimDict(
--                             Config.Dance.dance1.lib,
--                             function()
--                                 TaskPlayAnim(player, Config.Dance.dance1.lib, Config.Dance.dance1.anim, 8.0, -8.0, -1, 1, 0, false, false, false)
--                             end
--                         )
--                         dancing = true
--                     end
--                 elseif IsControlJustPressed(0, Keys['X']) then
--                     dancing = false
--                     ClearPedTasksImmediately(playerPed)
--                 end
--             else
--                 Citizen.Wait(500)
--             end
--         end
--     end
-- )

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if dancing then
                local player = GetPlayerPed(-1)
                local playerPos = GetEntityCoords(player, false)
                local distance = Vdist(playerPos.x, playerPos.y, playerPos.z, dancefloorPos.x, dancefloorPos.y, dancefloorPos.z)
                if distance > 8.5 then
                    dancing = false
                    ClearPedTasksImmediately(playerPed)
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

-- SecurityJob Player
Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if missionStarted then
                local player = PlayerPedId()
                local playerPos = GetEntityCoords(player)
                showTextHUD(0.66, 1.40, 1.0, 1.0, 0.4, '~p~Охрана', 0, 0, 0, 255)
                showTextHUD(0.66, 1.43, 1.0, 1.0, 0.4, '~p~Девушки :' .. girlsTotal .. ' ~g~Мужчины :' .. guysTotal .. ' ~r~Дебоширы :' .. badguysTotal, 0, 0, 0, 255)
                if Vdist(playerPos.x, playerPos.y, playerPos.z, WORKPOS.x, WORKPOS.y, WORKPOS.z) > (MAXDISTANCE - 2) then
                    ESX.ShowNotification("Оставайтесь у ~y~входа~w~ иначе ~y~работа~w~ будет ~r~прекращена~w~.")
                end
                if Vdist(playerPos.x, playerPos.y, playerPos.z, WORKPOS.x, WORKPOS.y, WORKPOS.z) > MAXDISTANCE then
                    ESX.ShowNotification('~y~Вы~w~ прекратили ~r~охранять~w~ вход!')
                    resetWork()
                end
                if IsPedDeadOrDying(player) ~= false then
                    resetWork()
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(500)
            if missionStarted then
                TriggerServerEvent('esx_nightclub:callData')
                local bonus = 1
                if girlsTotal <= BONUSMAX then
                    bonus = BONUSMAX
                elseif girlsTotal == 0 then
                    bonus = 1
                else
                    bonus = girlCount
                end
                spawnRate = BASERATE * bonus
                spawnChance = BASECHANCE * bonus
            end
        end
    end
)

-- SecurityJob Customers
Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if missionStarted then
                for i, v in pairs(SpawnedCustomers) do
                    if v ~= nil then
                        local player = PlayerPedId()
                        local playerPos = GetEntityCoords(player)
                        local pedPos = GetEntityCoords(v.ped)
                        local distancePlayer = GetDistanceBetweenCoords(pedPos.x, pedPos.y, pedPos.z, playerPos.x, playerPos.y, playerPos.z, true)
                        local distancePlace = GetDistanceBetweenCoords(pedPos.x, pedPos.y, pedPos.z, WORKPOS.x, WORKPOS.y, WORKPOS.z, true)
                        local distanceClub = GetDistanceBetweenCoords(pedPos.x, pedPos.y, pedPos.z, CLUBGATE.x, CLUBGATE.y, CLUBGATE.z, true)

                        if distancePlace < (MAXDISTANCE * 4) then
                            if IsPedDeadOrDying(v.ped) == false then
                                if incomingCustomer then
                                    if distancePlayer < CLOSE then
                                        ESX.ShowHelpNotification('~INPUT_CONTEXT~ ~g~Пропустить~w~ или ~INPUT_CREATOR_LT~ ~r~Отказать~w~.')
                                        if v.name == 'bad' then
                                            if diceSellDrug == 0 then
                                                ESX.ShowNotification("~y~Клиент~w~ предлагает купить ~r~наркотики~w~.")
                                                customerSellDrug = true
                                            else
                                                if diceOfferMoney == 0 then
                                                    ESX.ShowNotification("~y~Клиент~w~ предлагает вам ~g~" .. diceHowMuch .. "~w~$ чтобы вы его впустили.")
                                                    customerOfferMoney = true
                                                end
                                            end
                                        end
                                        if IsControlJustPressed(1, 38) and GetLastInputMethod(2) then
                                            acceptCustomer()
                                        elseif IsControlJustPressed(1, 73) and GetLastInputMethod(2) then
                                            rejectCustomer()
                                        end
                                    end
                                elseif goingToClub then
                                    if distanceClub < 1.0 then
                                        SetEntityCoordsNoOffset(v.ped, INCLUB.x, INCLUB.y, INCLUB.z, false, false, false, false)
                                        resetCustomer(v.ped)
                                    end
                                end
                            else
                                deletePed(v.ped)
                                resetCustomer(v.ped)
                            end
                        else
                            resetCustomer(v.ped)
                        end
                    end
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if fighting then
                local keepFighting = false
                for i, v in pairs(FightsInClub) do
                    if v.ped1 ~= nil then
                        keepFighting = true
                        if IsPedDeadOrDying(v.ped1, 1) then
                            deletePed(v.ped1)
                            v.ped1 = nil
                        end
                    end
                    if v.ped2 ~= nil then
                        keepFighting = true
                        if IsPedDeadOrDying(v.ped2, 1) then
                            deletePed(v.ped2)
                            v.ped2 = nil
                        end
                    end
                end
                if not keepFighting then
                    fighting = false
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

-- DriveJob Threads

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(1000)
            if timerEnabled then
                if timerDrive > 0 then
                    timerDrive = timerDrive - 1
                    if timerDrive == 0 then
                        failedMission = true
                    end
                end
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if timerEnabled then
                if timerDrive >= (initTimer/2) then
                    DrawHudText(math.floor(timerDrive), {0, 255, 0, 255}, 0.43, 0.05, 3.0, 3.0)
                elseif (timerDrive <= (initTimer/2)) and (timerDrive >= (initTimer/3)) then
                    DrawHudText(math.floor(timerDrive), {255, 191, 0, 255}, 0.43, 0.05, 3.0, 3.0)
                elseif timerDrive <= (initTimer/3) then
                    DrawHudText(math.floor(timerDrive), {255, 0, 0, 255}, 0.43, 0.05, 3.0, 3.0)
                end
                if timerDrive == (initTimer / 2) then
                    ESX.ShowNotification('~r~Внимание!~w~ Вы опаздываете!')
                end
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if missionWorked then
                local player = GetPlayerPed(-1)
                local playerPos = GetEntityCoords(player, false)
                local distance = Vdist(playerPos.x, playerPos.y, playerPos.z, deliveryPos.x, deliveryPos.y, deliveryPos.z)
                if StarType == 'fast' and failedMission then
                    randEvent = math.random( 0, 2)
                    print(randEvent)
                    if randEvent == 0 then
                        ESX.ShowNotification('~r~Остановитесь!~w~ Лучше я возьму такси...')
                        TaskLeaveVehicle(SpawnedStar, TargetVehicle, 0)
                        Citizen.Wait(300)
                        TaskGoStraightToCoord(SpawnedStar, endPosVIP.x, endPosVIP.y, endPosVIP.z, 1.0, -1, 0.0, 0.0)
                        DeletePed(SpawnedStar)
                        StopMission()
                        failedMission = false
                        timerEnabled  = false
                        missionWorked = nil
                        starType = 'fastFail'
                    elseif randEvent >= 1 then
                        ESX.ShowNotification('Мы опаздываем, ~r~не расчитывайте на чаевые~w~.')
                        starType = 'fastFail2'
                        failedMission = false
                    end
                elseif StarType == 'lower' then
                    local vehiclePlayerTransporter = GetVehiclePedIsIn(player, false)
                    local speedVIPVeh = GetEntitySpeed(vehiclePlayerTransporter) * 3.6
                    if speedVIPVeh > speedLimitVIP then
                        countCurrentAlertSpeed = countCurrentAlertSpeed + 1
                        if countCurrentAlertSpeed <= countAlertSpeed then
                            ESX.ShowNotification('~r~Не гоните, пожалуйста.')
                            ESX.ShowNotification('Внимание°'..countCurrentAlertSpeed..'/'..countAlertSpeed..'.')
                        else
                            ESX.ShowNotification('~r~Вы слишком быстро едете~w~, я не буду давать вам чаевые...')
                            StarType = 'lowerFail'
                        end
                    end
                    if carHealth < GetEntityHealth(TargetVehicle) then
                        if countCurrentAlertSpeed <= countAlertSpeed then
                            carHealth = GetEntityHealth(TargetVehicle)
                            ESX.ShowNotification('~r~Внимание!~w~ Вы слишком быстро едeте.')
                            ESX.ShowNotification('Внимание°'..countCurrentAlertSpeed..'/'..countAlertSpeed..'.')
                        else
                            ESX.ShowNotification('~r~Вы слишком плохо водите~w~, я не буду давать вам чаевые...')
                            StarType = 'lowerFail'
                        end
                    end
                    Citizen.Wait(3000)
                elseif StarType == 'drug' then
                    local distanceDrugDealer = Vdist(playerPos.x, playerPos.y, playerPos.z, posDrugDealerVip)
                    if (distanceDrugDealer < 60) and IsInCarClub() and drugDealerVipSpawned == false then
                        ESX.ShowNotification('Остановись. Я поговорю со своим другом.')
                        RequestModel(drugDealerVip)
                        while not HasModelLoaded(drugDealerVip) do
                            Citizen.Wait(1)
                        end
                        SpawnedDrugDealer = CreatePed(2, drugDealerVip, dealerSpawnPed.x,dealerSpawnPed.y,dealerSpawnPed.z, dealerSpawnPed.h, true, true)
                        drugDealerVipSpawned = true
                    end
                    if drugDealerVipSpawned == true and (distanceDrugDealer < 6) and IsInCarClub() then
                        ESX.ShowNotification('Остановись, не двигайся. Я возьму посылку.')
                        TaskLeaveVehicle(SpawnedStar, TargetVehicle, 0)
                        Citizen.Wait(100)
                        TaskGoStraightToCoord(SpawnedStar, posDealVip.x, posDealVip.y, posDealVip.z, 1.0, -1, posDealVip.h, 0.0)
                        TaskGoStraightToCoord(SpawnedDrugDealer, posDealDealer.x, posDealDealer.y, posDealDealer.z, 1.0, -1, posDealDealer.h, 0.0)
                        Citizen.Waint(2500)
                        TaskGoStraightToCoord(SpawnedDrugDealer, posDealerEnd, 1.0, -1, 0.0, 0.0)
                        TaskEnterVehicle(SpawnedStar, TargetVehicle, -1, math.random(1, 2), 2.0, 1, 0)
                        Citizen.Wait(3000)
                        ESX.ShowNotification('Сходи за коробкой.')
                        DeletePed(SpawnedDrugDealer)
                        RemoveBlip(blipDrugZone)
                    end
                elseif StarType == 'default' then
                    ESX.ShowNotification('Отвезете меня в ~p~Клуб~w~?')
                end
                if (distance < 15.0) and IsInCarClub() then
                    if StarType == 'fastFail2' then
                        failedMission = false
                        timerEnabled  = false
                        timerDrive = 0
                        ESX.ShowNotification('Спасибо за опоздание.')
                        TriggerServerEvent('esx_nightclub:driverMissionCompleted', StarType)
                    elseif StarType == 'lowerFail' then
                        ESX.ShowNotification('Надеюсь в следующий раз будет лучше.')
                        TriggerServerEvent('esx_nightclub:driverMissionCompleted', StarType)
                    elseif StarType == 'fast' then
                        failedMission = false
                        timerEnabled  = false
                        timerDrive = 0
                        ESX.ShowNotification('Спасибо за адскую поездку!')
                        ESX.ShowNotification('Я добавлю чаевые.')
                        TriggerServerEvent('esx_nightclub:driverMissionCompleted', StarType)
                    elseif StarType == 'lower' then
                        ESX.ShowNotification('Это было очень приятно, спасибо, я добавляю чаевые.')
                        TriggerServerEvent('esx_nightclub:driverMissionCompleted', StarType)
                    elseif StarType == 'default' then
                        ESX.ShowNotification('Спасибо за поездку, хорошего дня.')
                        TriggerServerEvent('esx_nightclub:driverMissionCompleted', StarType)
                    end
                    missionWorked = false
                    TaskLeaveVehicle(SpawnedStar, TargetVehicle, 0)
                    Citizen.Wait(100)
                    TaskGoStraightToCoord(SpawnedStar, endPosVIP.x, endPosVIP.y, endPosVIP.z, 1.0, -1, 0.0, 0.0)
                    Citizen.Wait(20000)
                    SetPedCoordsNoGang(SpawnedStar, -198.74, -732.25, 216.91)
                    DeletePed(SpawnedStar)
                end
            else
                TriggerEvent('esx_jb_dj:enabledjbooth', true)
                Citizen.Wait(500)
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if drivingStarted then
                local player = GetPlayerPed(-1)
                local playerPos = GetEntityCoords(player)
                local distance = Vdist(playerPos.x, playerPos.y, playerPos.z, StarPos.x, StarPos.y, StarPos.z)
                if IsInCarClub() then
                    if (distance < 60) and SpawnedStar == nil then
                        local type = math.random(1, #Star.modelType)
                        local models = Star.modelType[type].models
                        local model = models[math.random(1, #models)]
                        print("--DEBUG 1--", model)
                        RequestModel(model)
                        while not HasModelLoaded(model) do
                            Citizen.Wait(1)
                        end
                        SpawnedStar = CreatePed(2, model, StarPos, 0.0, true, true)
                        SetEntityAsMissionEntity(SpawnedStar)
                        StarType = Star.modelType[type].type
                    elseif (distance < 10) then
                        if TargetVehicle ~= nil then
                            TaskEnterVehicle(SpawnedStar, TargetVehicle, -1, math.random(1, 2), 1.0, 1, 0)
                            drivingStarted = false
                            StarGOTOCar = true
                        else
                            ESX.ShowNotification(_U('not_in_vehicle'))
                        end
                    end
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

Citizen.CreateThread(
    function()
        while true do
            Citizen.Wait(0)
            if StarGOTOCar then
                local player = GetPlayerPed(-1)
                local playerPos = GetEntityCoords(player, false)
                local currentStarPos = GetEntityCoords(SpawnedStar, false)
                local distanceStarPlayer = Vdist(playerPos.x, playerPos.y, playerPos.z, currentStarPos.x, currentStarPos.y, currentStarPos.z)
                if (distanceStarPlayer > 20.0) then
                    StopMission()
                    ESX.ShowNotification('Вы далеко от звезды!')
                    StarGOTOCar = false
                elseif (IsPedDeadOrDying(SpawnedStar)) then
                    StopMission()
                    ESX.ShowNotification('Звезда мертва!')
                    StarGOTOCar = false
                elseif IsPedInAnyVehicle(SpawnedStar, false) and IsInCarClub() then
                    driveVIP()
                    StarGOTOCar = false
                end
            else
                Citizen.Wait(500)
            end
        end
    end
)

--Phone
RegisterNetEvent('esx_phone:loaded')
AddEventHandler(
    'esx_phone:loaded',
    function(phoneNumber, contacts)
        local specialContact = {
            name = _U('phone_nightclub'),
            number = 'nightclub',
            base64Icon = 'data:image/png;base64, aVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQVJnQUFBQzBDQU1BQUFCNCtjT2ZBQUFBbVZCTVZFVUFBQURLQUlZQUFRQUFBd0RTQVkzT0FZclBBWXZVQVkvTEFJYktBWWpTQVl6V0FaRFBBb3pKQVlpOEFuL0ZBb1dKQWwya0FtK1dBbWFDQWxoREFpNnpBbmw1QWxKeUFrNnFBbk82QW42U0FtTm1Ba2JCQW9LeEFYaGZBa0dWQW1WTUFqUXdBaUpYQWp3M0FpWWRBaFVuQVJ0MUFsQTVBU2dNQXdrVEF3NUhBekZzQWtyZkFwWWhBUmRqQWtReEFTSVpBaE1oQWhjbkF4cTZnQ2U5QUFBZHpVbEVRVlI0bk8wOUNYdmlPTStnMkRGT0Fra0lSNEJBT1VxQk10TjI1Ly8vdU0rNUxjY08wRWxuM3YyMjJtZDNac2xseTdKdXliM2VOM3pETjN6RE4zekROM3pETjN6RE4zekROL3dKQUV2OEMzOTdGUDk3QUxNSWV0Yjdmd3N6OTh4Mng5eW9GMjcrVzRpeGZwNmZqUmRoOTM0K24rWkp2Mis3by84U1hnQ3NjTFY5TTF6c1BRM0pqN2ZRSlgwQlpQWGZRUXpBN0MwWVFielJYNzBrQWlOVHkrbnpGREg4MzRTWFlxendPWUVCbHlramlmWDZZNnQ5M3BwU3NZTm1KNWJoaFk3L1BHSTB3NElTZEhjTHNMSXJ6NnZyZGY0eWU3bSs3U2NmajM5Mndpbm41MS9jRG9KZm1pSHNXVVlvb3d3dmZiSjkrQU8vRFhqNmtOSUJYSGFiMlRnY1QrcGZlNzFzN3ZCcjh2WVNoRlBmOHp4R0NQRm5tOG12eTgvSlNqTzM5cTlPUE5xbjRkenVjL3ZIcm5uZGltbGZBdC82eE14K0V5Q01qN3RaOFdITGVsOHQ0OFJ6aytYZTJ1MDMrODFzR1U1SGNSZ0V5LzBwbWc0Wkk1NU5LUzhHUEFyRDhkTnlHVjMzdTRjd1kvM2lZdUtjMmdQeEV0WlVVV0RIWkx6UWNUZHpWYi95REJmdHJqaWNMcjM5MktFZUs5WnNOL1lKb2VsYXhVRThKQ2w0ZERDZ3krdHN1UjR5RzYxaUJnTkt4VTB1VzYvWFB4OFowaUovVllaZzl0b2MzZEtXdjBMMm41dDU2eERnWXpkOVgwS3VXTXNYVmtQaXZ2bE1qSkNHK1ozd3hNckI5dW1nejlPL1pmK2hqZ1luT2RpQ2FKYkJScytSaklPS2lQUUt0bTNjWUNHOGNQcFoxcHNQU3NNeUFmWWozNzc0VDNCK1dWN2xTM0IxK3p6ZWtXcko0UDFwNUJsbWJ3WTZuandMWnZ3Z0MvaEFHNFc4cWZPR0ZkNUo0ZU1zSnBzckNQVXdpb0pvdVlqSFVTVHRkbmlkdW4xNkNzazY5QWgxbjZRckYxdVFBcDFtaE9DbmVObTZsUFArWTBDSnZ3NkQyZm5SUVk4UlFkanpCbUttaUVDZHEwNXl0cVBsc0JkQ1lpUjRvaC90RDgvcDNUTEpnRStGeEp2YS9ZeGRrcGNhOFFVeFo1aXdnL1N4MFlOSVNmRXlQbGlmSWZJTHBrdzdVbDRDVzRKdWNHdk13M21YYWdzQTY2TVJKNzNOY3NFSnNXM0JIdnYyMitSMXU5MEtPYkxkblV2VXdNcEozenNvM3M4djB1UEQrcnRza2dwcFBKYjdFQk90OXVsWEwvb2htZ0JtRGlMTmh2YW1FQXlkU2t1OWNjY2h4SXZBMVNGR0lPenlzaGJ5STU5dmpuYVNnME5jbDhZdjUyeUxJU3B3QXVuOWUya1RaenZwK0RoaXVQaW9HN3hzSmc5dUpVZ1UvTWJLOVEzaU1JaWlZRTBwWFR2YzF2QmpvWG51WStiUXZzb1JPT2VVMm5TMTMyL21xV29BTCtnRFhIN0h1bDZUYk1GZ2NqZGljbUZGczVYZzhXejNxRVdBRmlXREJML0JTdkRNMks2UUxSODlPQWdUSVIwQWIxamJBaTJ6aEdtRkovRVhRaE9yT2RrejJzcE01bUJiYVd3a3MrSW0rbmMyUUNndUFpVjBOSTdlTmtLcmcwY0ZVcXBScXNLUDRFbk9HRVpNamdNWWNlcnRsOFd6emUwSHM2RmhiZjEva0tnR01RRDVBd3VKVDFvTENRdjhuQ2s1dS9pV1RCSzZIT09MK0NuYVRENStRMFUvMitxTDJWRWV0NldNd3d1eUllOVpxbG1WZ3BNb2dncmVmQU5heEliMzErTkk0b05iUkxIdVFYckxSbG9UR2hjWWc3Q0Zaamh4dmNYVGFsZUl2ZCt3ZFdIV21BR1RGVnU0S3RkSlpqRmtvNnYwQ2M1a3ZnYldjYzFNeThyOE1GaE5qdExOaVBQYVQ5S0wwQ1l1WFVEV3NudzNGN1JoTzBRbWVKNnNEajNyTWZYV2hKaWtNUVVIS1RJelphZXRzNHYvSUhUeE5jTEwzTWdIQm91dG92UXF5cU10T1FiZ0tsM2lKVSsyVXB2WkVlS2YrbE9oNU04M0s0bms3WEZYWG5yQmVodUlzUU9FR0x6VldPN2h3K1FzTy9RRXp6Q1NTNzgvblc5UHgxK1hHamN3a20rbS9rbDZrUytwdUhSY0d0YmkyZWZEWkxLN0ZKYkZXQm9LMDd2WlBnSFd0RGtKR3NvcnVzYXI3MmM3L1JWTE1pcXQweTVwTUMwWkhNYm9OQXlpMStMMU1sWDA3Yldzb2I3SVZPbStHbWF3aysraW5mbER0cXFzVHQrK2tGVHlBNzdCaTlJZkxhenkyY3ZxZG5pMUIzMFRwS0pkS0RCdjB1eGwzWTVUWDc1aXlTWlJVeDhvd0pJSkpqZS91d0JZYTZiQmZXbDRZOHhpU0NwTzRBMWppNVM4VkJqSnJtRWJwVnFGWjN0SkdGM24rK3I5TUpIZnhFN3k3T2N5S1pDR0FWZkFVWDZCTzlIZjlEaGVYalVFSTFhdWtqSEN1TVhUQ3pNNWlBMjVRVnk1bXpmYTkvV3A0eTJpeWVIbk9XZThrcUlpZXdhRkxTQ3pLbG1INlhNOVV3VnNBQys2Y2tWRHJCTWZRMXJGbG9RZGhTNjVCNnRKTVBhc0dJKzFieW92Z2xMWU1Kd2Z0Uk9EaVV4Z3c0b2hwM3J6U21iaG5tcllsbmVla1NlcHN5amd1MVlMNDNhbFppam1BTTFrTlY3TGRBY1VkeDhhRGlUSzR0bmJ4Q1JDaFZFdTR6ZXlVbWZ1ZWJKZnphT25VS2FFZ2EzemVhWnZDT1JQSmwyeFhzVVJVNjlQcFgwcXdweGszT0hnNHR0TEFyYUdmUVhJK3RDMmhvQll2M09ZWEovV1E4SXlEeTdDdmJjMDRBV0dFbzlrWFVVQjRjT2d0cE9TaHlsYlRZaUdsRU1zTWNFVVNneW9ncjFQeWJ6VlB3U0tQNE9rcG5qNUtmUW14K0R0UVdvNVQ3cFM3cXpBb0hGVVlhT2RJbjB5aThqeTBhaExEM0REdGhES1dydmZUTFhyalI1THBGaWhOeXprMFhWR01HRFN4Q3AzT0E0T0ZNcWQ0aEVwREd2WUVUeXZnWDhydUtVUWpCbVlTUXFqb1hSSE1JckVxY0VwRkd2TFExb09tV1cvcWpaQ3JwVTBOcEozRXk4NjVWSUxVd05UeGRaQXc0Zi9XUURmUkxwa2xkOHd4N1NSNnhLcWlMZXo4VmlLQ0RldmN2MTlGWlVHNEs0cGpIV1dIRG1EemhKVFlHNGltRUxORkVZY0dsK2hTMWg0UGpUWDdpQlJSUGo4NXZjbmluQXpnVzNLSUVBellQdXVPSXlWR0lmaVpCb2JEc09WcENHc0ovUnpnVVNGdUdoY0RUTlZkZ3REK09jdlNSM1JLNWNhR0JyVm9LbDhWMmZtNDBiWkp6SUtNc1FjbGFoS1VId2E4eGoybkVzcVBCbjdaM3B6S3R2UCsyVVlIZUYwSFM5R3dVejhyWnptVVVNd1BETTA4Vy9reFVRS1A2WGQyMkZpaWlJUzVQL0xJMXZLaXBMQ0c0azlib05wTmxIVnFzeU5CSmhFYStJdXI4dTFsOGJnUnpFWGY1WitsU2RQNC9BUTlnTlRmcmVmVFZPTzZwWGo3R1M0NlZGUVJjSXdwUFY0YktGb1lsdWwzdW1LM1psSktrRDZSS1pxcFJnTXZDenZnTnFsY0J1a2Y1SThNdDlUekljVVozNGNYTGNYSE03aFU5Tkdza2ExektSZlpUNE9GaXRwWndtNnRCVDlucE04QXdNN3pNUTBmNlUvbmpDV1dacFVVRVVRRkNoU0ZyQ3VRTmtvMkQ5bjdtdEFucWZhUW0zQXUvUlJabkpqUFl5WGQwUVBuQzdsTUN3TlErc0Z5NnhTK1lSbnBOdmtURlkxRW9Ua2hLVkw5ZHBBbmx5RHlZS05EN1VuR0RtWnVmZVBhUXBSeGVzNE0yTHZZY1FvNWlQYnloNERUaDAxUEVsS0h4SUtHdkI4cGJCR3hGTzNNQmpRa2hyUjZSUElRZUZzcEhBWUxPUW5CN0ZKdVlOUnRScGllYnBDekVYeFZ5ZHdSUlJDRkJaVWhXM3hGaXdJQnJPZHpBRjRNa1ZTZVpaMWhGNkRkRlpBdGp0SG9SeUVHT2tMOW9QUmVqT281cU1UQ2NLVVVlVW9tNE50U3llZGJPY1hzZ0E3UlhLWnRqR0dtR242eUQ5bzQ2TGx4clJzelBZRGFRcHJ3ejJQQXd3eHdYaG53VlBSVHdyckhaVlJRT1NqTGJWZXBBdG4ySUs5WjFEZmN1ZG96WG81cDJjVXNFVWNoaGlaaCtRdEkwdkRQWS9qUmVHc3FYaHUxVU9kVXNsQ3ZnWHU1bTRvd0VqTVhPbGdoUktpNjNmelRIV1grRU9mcldTaVVGUm8yNGlYOThxWWw3VHMzMFlNZGxoeUl0WnNaSTU2eUdIK1NDTDBNbGlocEhSbU93UGUyTEJNaUhGNVhMMDhVM0hndmVZanlyUXc2L1VDSTJKcW10UGtESDRXTm9yRE1xWFh0Z3l1S2dyWUExbmRJVVVXSGVZbmVSelR1azZKUS91VUpFK3JuMVpRRVVqR2FHWCtvRGpuSm1ob25zSFZLKzhrT3VyTVNsTENaVFJ6V0U1YjRtUzFDMEdLQTNDN3lQWlZOcWJ6VXZ6OHo4dDZ1SGhOMzMydUprdEgyVnRxWGFER2VmNSt4SHB0ZzZ0WFFKMVl4VFFaZ1o4RE5aaVVlM2hidHBLc2IwTWQwcldMSUF0Z0VWZWxCQlFoSlBGUEhXdk5uUU9IaWl4VUcrY2lpNEFCL1REdnBQS2JIZW93aWpXUXA3eTFKVVBLMlE5MXNxQlRobm9BNi83TjNNYWExZWJoRjZ0bVZQa1A5YTJJOWRwTFkzNUxuUXJnR1czTWgyR0g3SDFhSkphWnZUTjlXdTkwaWRxcThGZ1A2endOejNWdHIvTE1OU2dITXNrSzd5UTV6c1NKMlRsYU9ybTRZd3JkUGc2S0ZlaE84cUdaRVNQUHRNNW1Jdk9LSVdQRThFUkZUSzF4Wk1pVUV5ODl2QTkrSVMycHhjVlMrUUpZWjNqcFhaQU1LWE5IUWZFMFNVQzI5Y2MvcW15bU92Q3ZJa2J4OWtvNW1UbW5sVmlPcDh4ZFZnYjZ6SlE2TEY1UmJsNXFja284RGhiNk9LMld0eEZGTE9mSkUybEFGWjkxNmlBT0tEbFhXRE94M3Vxd1NtNzRTSXF5aStzNUVLTnJTOHl2RkFTM0swK3ZhZ2xYUnZPRm1xU1NJMm5sdFpORzNpK3FYY1NxcklVMDMwbFNUUEtkOUZHdkRONTEyRDN1dGtSM3k4VmxobGovWi9DQ1V0N3FtUENIeVNMSTFPSVNxdEFoS2lkUTRwVzhUK0pENFhOYXlpYVRtL3ZOaFk1WU1vZ1hQRFk1dnRlbTZKZHMwdXZPR0ZDVU8xN0ptNSttcUNRU01oWGZUdVRnYXpPL2tiSWtISS9qaE1rbU84blp2T0RmbzRLaEthWXppa3pxcXFhcUczT2xTL0NCN2lydHNIVzhyRjVzcEJnNVNhbmNTWnlncFZhenJ2SjMyNnA5WGJndXdQZHliczFWSTBkMmFTZ0tqZ0k4dXpFdHV1Z01ubVRLSUZLNnJZbjVTdmw0dlNwZmFvaDV3MzJ4VmpkRERPeFlNaDVrMkYwcUJDTm5qYlhGeitCWHRoREdRTnduQUpBamhzdHVRNE1lZzNKT2lwM0VIY3p6UU0wazBnRzM5M21FOTgwZFp6dUpxa0Y0a09WbFc4QVZjbTVQakJibTQ0RFhGbVZtNlcwbE9VK3hkbUJ6Wld2RC9uYTAxU2xKSUdDNXpHZUsxSkdUZ0xpdVZxeStNMGd6UTUzdUpKSjQ1WlBFRFZCcG95RmdLbnZRQU1yQ2dabUttRHZDcmVXV3RNSWtJendTcVdPVDNlejJ1UTB4NElkVDJsMU1ObjJsbkp1RFZlNVE1OWJuUTFUN2xCUS9OZ2Q5dVZXK1NjcVViVmdFcVJwSEYycFNrUnlKSHNSdEtVZEMzd0ZlbXlRZGdJVTBLQ1FRVlo5dnNYQ1lYQmU1TU5ob2h2UktUT0dTSEpsVjNpRDRyNTVZSHRJb0RQOUh3bTJSaDJJQUdNK2ZYZFVpK3kxQURnTEYyTk9tbmRtNFdDN1Q1YmxXa01LK0RUT2NWVVl3Yk4vY2tOdE5uK1hLcmNQNUdwcVU0ZEtidVoyNXA3SkJ5ZVlBd2RRdzB5REdWaXJ5TTA3Q3R0b2h3ZFkyeHRqa0pIeGhKUEF4cGMzeXhDQ0Nrc25jekhXQnFkOHBYaWJTcW5JYmQ5QlJ5NUt5QVI3d0N6S2Z3OVN3L2VIWFZGRm5xRWNXdVk1TFRsS2tjZmlTMk12bWJnU2h4K1FzMEppTFdOLzZvOVArTlpaa2kzQ2xIZ0dpWmxaR3c2WlBkeUl4Rjc3QWpCS2FnMjNiekE5bnAyZmlwQXhGM2pqdjRZbXdkOTNqZSthZGZENWMyTSszK09xK3MrU0dES3lFMTFKSnpRL1lOaW1HWEpVWEJHS3pKQzN5QXM2emNMME9sMEV3SHIvc3hJMFF1WnVRTXNTVnpoQVFyUmNGeHU0ZWZMYmZCN2NtQXJQdS9Ka3BIQWhmbElrc3FpMmlGcDJuWUtzTDkwUzVNMnYxUFVPdkxFWE1pL0c5T1NUZUJqRVVvU2U3MnB6L001dkJXYWdubStQTldYZmNiRzVPdk1xblpLczl1aHBSZUc2UFZUMU9XTC9lSTBYZHNBOTdGcnNxTlBiczZUTnlYMlBvN1g1c2VtYkgzUmVCRlZLL2pIemh1R2dLemNJUk5TRTFyYXh5aktGQkhZQ2dqTk5DUmUvckQ3M1FTYkYxNkZMUHZ4Y2dzU00vTjBlYVhpQjRhaWoxS29PRG84dTloOGQ5VWpVNXVENloyZFJmYWNqNDdKRWliTU41STZFRVlqV1R2NWt0K2U1MkVmV0R0MGU3bFh3MWJOMXBRUmFhZ2lkUWJTWGVMQkg2K0JGMlVjLzhPMVhpWHdKemQrYVhDbFFUTVVxbWtDYXFBOUFlM01weW5NOGZIeDlwZ2QvSDluaitLL3ZpRXhDd0RjbTdPZWxvK1UxMTlXdjhobTBXcitBbXEyVThvc3gxdlZFY2h2RjRPZXR1N0Y4S1lad0phMzNOZ3BKRSttRGlyTFVOcGpRdG5uZW4wZjU0eVhydGREWHNyNGZwWkoweVdLcXFKd1ZnajhwOVpYUUFsM25zSjhtUVpjWUdUOTZ6VnIvL3NuNi9HOHVqZ3NWU3c1aHg5cGwvYzJacHg4WlZUQnlKTjlINFpSWXN4MklmaWIyMG5PMlBWbnBUZHpNd1IwdktSbW1mU3QrRXZSdkdBNkpYb2VCTVpOdVl6RzkwNDlwdDMyWkxUbFNPTFl4SFdvTEhtTDhJbC9QSGVoVWF2eWdHZE5CcEN5aytKdGZvYVJ5dUYrTmpZWlU4SlBsZzZRcURpT3U5cVFMWnI2bHZNVmNBZVh2UFNJQ0FNZExpZjhsZndvZGlsNDJTZStQdVpyNlVFY05TRUtnaUtUTUVuRGNoVHdkRFI3UHRkaldmejFkdm0vMzI5QUNYZ3lUY0VQcGt2RjlJN0FHSlU0Y3NaMjl0aUlIejRtYWpLRXB0OTFWc0pFdHNwVHVkczhhcHdNUUQ2KzNINmh6Z0ppaVFGZnNRVWl6UU1PMUc1VGdPY2JJV2svSGQxZW5ISWNTVW1FUGxRc2Rqa1RXbVlvTzBoZ0d0MDdBMUpwQzJoa3JXNCtERm1DaW1mYXNWVE5UQVFUa3dFc0tIMTNlZndySGtrb0NOejF6UG1JdlFwNjYvdlc5Sm5uK0JUYWRtQ3JOR1pKejJTdkJmN1Jaa0E3eTB0SWRKSlZPd1B4Wk9CL1ZSWTB3RTRCRFB3dFc2WjhGUHF4RStDTjF0MmdPQzdFZmMzVmEvdG1jbXB5T0p1Y1pScVAzNkcxRjdTY2x3Wm9uWXMwL3U0WU8wNE1VSzIrT3g5aFY2YWl1azdIOCtCT1pOZStXeUpMYi9iSThoOHNsQ2FiZ0ZHK1piYWZXanZ5VzE3eGdnYm0xVDA4L0s1eWQ2LzNUaisyTnFyQzhVTVBtUkpzdU14N0ExNTZuRHliODFIbWZ4Tkp1L3lISVQwa3FrOVFGK01vT3dpR3k3YjU5RzNpaHRoRVlwTnRJT0RvK3pDdkZSd21zakQ1YXRkSnNCTmJtbkc5TktsSVFVRExPMDZVUXZlTzQxaUxrQ2EzNHJmQy8wWDViRVM3bUdGdVkvbnEzQVhRUWJIL1FPNDlSUzRXbTd6WFN1YXF4K1RYbVN4Y1k1bHlJKzE5dDQ2WE55MDBtYXd6TnBEVHBrSHNWV0tXZTFkWi9LUnNMRDYwbU4xVStFVWI1eE9RMERQOVRXaVFTWkg3N2tvZ1R4N0t6L1JPa1JxUTNiTzR2ODdaOTNrVXphS1AzbVRTM3M1VGpTMUhmS2VQSG56VVpyWVBuczhETU5MMHdTaVhmS2QrQW15b3JwS1lkMWFnNnBLOEhWSWVZK2tyays1SmRVaHc5YmU5Qk92dmE4cUNsR2owMmRkZFlBY1JIWTJ2UXhKWENqVkFiQVdycFlkc1lHTUxYclVJRGVGOGpkdDZVUTNBQ0FPM2ExSGM0MnIrKzczZk81VXNxdHFVM0hRV3FIY2FxdEFhNXlLSXE1WTM4d3lKbS9nekp5QzJxWmR3YTgyVTNFWjNmWkk3OWp6MEZnNnNxRlZzZ203TWNQNWcyVGRhWkNDT0h1cGI4V1YzVVJSdHhkaFNyOUxXQ21LUVBxYVNzdUIxellaMGpkNC9iZVdEbllFWUExdnJkekI5OUtiZ2RoVTBtWEhEV0FsOTBpeDlPNUhNdk5yc3JsUzFVQUVKZTYwdFFFb1A0b0hpK25RMlRXT3ZOVmR4bjFlcnpjME9xeVNRbDdtcmlNVGFPcXZ6M090T0t1am1Cd2c4QWw1dDBXcWh3dGEvWnhxMGx2T1h0N1Rkc29acGNtOGlhalMrdExEL1VCQ0Z1TnhsUjNFVEFLbzdmSjd2aStyU3FsY1Nxb05yMGRkWlRrbmhJR1JIVVB0TWlyQnBTbGxEcXdKVkVJYjFJNzYzVHZmaUZpaE1YZmt2c3lvR3l4aGZOMi85RTRoVVJwcU5LbzEwbGhqd2xHdWZwVFRzOG9UMFBBWElrb3B1cEJjcmgxMTBoUkN4QVo5dEhBSVR5Snh4dFRYb2pTSVJuM1JjekJrcVZ4MVZlamVzTlNTcURtWmRJZElySkdtYTJjd0VTZmVsOEpqZGJaK1RpcHM3Z0tVOWo4M0E0N1N4dmxPaWtjSkZuSGJYVWVaeGxyVmJiMnE0eHZYMWtWUzI0YjYzeGxuQUtPMnJ4RFRyTE92QzNQcVoyV2RENVYzTXlacUlrR2VNOFVLb25NZHpoVGo4bTZvQmQyMVhwVEEyQ050RllKYTA4SFVjVk5Pb2xtTkF0UTdWUWoweHYxbDZpMFprdCtSblZrUUNDUjZRMEg3ZThCQkRxQlJKTmJ6ZXdCMUVvQ1RkTXhpR1JxZEpSamJIQkgweUxIRkZDdmhVYnJ1d09SMUY5ejFYWUhjTkl4R0h0OWN5bVVDbExPZElORXlwMnRlcU5CN3NGTUM5cEF6ZnU0a2dRTkI5UUMyRFdmMC9mYkFMcU5aSnRhbDBqUEtlMENXYVI1QkpFRTkzNHBWMUZTY21WWXkzd0h4OWV0QzI3YzhabXphKzRGSzlLMGhMTmIvTWJWZzdpbnVLTjF2cUpFK3lhSFFhL2dKY0hJZktjNjEwZFlJYnRyNk9IRGpvam1aTEd1NEplT3dkd09VcVpOUXhEQmFIUExoTHpUdUJTcXE4K29GSytzYVVXNkF6bGxTdVZ4RThSK0ZoSkZTdEVYSm1kcGF5ZnNPeXg1NVVGOVFqTXFXMjI0YWl6VTU3T1U1UGpGUEZuSFU1KzU2VGxjcXMrQnJyOHVmQTZ2R2o4WmEwM3pMeDlrc2wvQTRKUkd1OEp0T0JkUlE2WlN0ejlpMXBXZUxtUG82ZXAzMW9WSU0vS21ZNVhiNFcydkRsaHJGa2djd3BCa2o5cGlOOUtIWDJRVWxGblhxTmFyRGJqM2hReEdXOUYzVDVXUWtDZUpWRXBuU0xXeDVIUklvb1l2bEdaNDVWZEhabXRXQmtxNjZoZW9uWitHdzl4VkFBNnh1NWZTaGcwTmlKRkxzOUZaQ0RIWnF0ZmM2VDRmdU9mclV2Szdna2JuNHY2OXFzR3pPNVdQVVRDY1d5dlRZL01Vb2pYcUVWWTZITnJPeWFtQmRaRkRhUWJRZEQ0MDk3MlVINXo5bUVoOVlBemRjYkF0cUZDK2NuNUdHUTc3dUNQSzFuZVMvZGVlZTZycGczeGZmU1pNMXhMQmNHMmxpZUxvYjJTUG8wcnV5dUd3dEc4aWhwdGJVSFlGeldOMHVPcjgwTU9IZTZwYkNwa3F5OUZaYkdvVEdEakxCTVBkZ3A0dVhsdURzUnpzbGdML2JrQ3puN1ZlL3VhRDg2bTFxR2ZRUEk0enYwc09tYWs5dWxDVGgvbzhtRUFKaFBMOFNERE55UWxmQ1kzU2ZjN3ZLN2VEeFVRMkRrMzVGVktqV3pYZUJHZmNBTGJZSERneWx4N254NGkvR0NWRCtaZ3IwbVZiQXkwME8zbzNkQTA5SE5aeS8zQ1RUMFErNlU5TjJyRUMzUGZ6bzRpTXlOMHNxUmRIcTIzYWRNUTZiNlVnUm9ldG1Rd1FOUmhkU3pxUkJGYTRsWFNRQVRmMEdaRDFGUElQdmdlNWVtdDZtc2krbHFGOGtxM1VoSzY3anNjbWlGVkdkMjlYN3IwMXJYZWhLZDFBNWlJRFpZc3F2bzd5M0lNUDJTakNUVlJBWW9pZHRnalJqYnloeE56NVJVQ1doR25MeTIweVZNTWFWLzN6d3N1QlVzdFU1NDBVNHU2eVI0Z09kaXFMdWR1empNU1pxU2VrekY0cDFnQ3hTTXI3SXZkdWlUSEp1THhSelA2YmdIcHE1c00zSndqako1RWxZZXFkTHhzOVdDVlRUdUd0UFo0U1lwb1dSRzNXNlpPVE9vTm1abzZqNitpZ0FleGdNdXcvM01zVWVYaVVjRlJsbmNtZGI1cDVObktVN1Q3aCtWbG9XTmJrNSsySFVzRDZqMEgxUVhFVFpIM0RCdS9oc2p3YytUUWJra2Z1NjIwYjBxaTdnV2JyVGYvT0oxRkxYSk1rUTN6RWszdlVuQldIWE5WMlJpSWtOZktLN1M1Nlo2cm01d0M0S3EzdjFROFFxWm42SGVEMERnbDdscExXWFBoL0FIWVN2ckg3SDVTRHZld3ZMYXk3cUdHVFFXdDVRVDNLWjJ6K21SNlNFY05yWW9SSThlbVdpUUN5MDR6TDUzdW1SekRpbzB6YmU4LzhKalFQYUIvYzJja2RPV1h0SitPSlViS3VRbDVLQmp0VG5LbGw0MHFrRzlWNU5tQmQ5a0dpK05QY0wvU0NheG9hM0VjeEFMNjhCWTBxaGRRcnU1LzFrcmNzTWNzUE5kR3ZqTXRpM2NnUjFzRHphWCtOd2lsM2lTbzkyeXRuZmhjMEo5ZFA3M3B1cjRuRDYrNVQrcFk2UEY0dTE0MUpsdkVvZUVjWVcvaHBycDlqVTExTlRuZUhhR3FoaVpoN2ZBNDRKNmFsRHdRMHpuTklhd1hWVDFaZHIwK3FINlk0aWFrSnZMc2o3dlFEYjU3UTBkS091WHJxN1NEdjk3WktsK01kMmJGVjhQbmVQUERVdG5hL2t2V21lbjFqNEhlY3duZ09aTmJSMmxCSmN5NTdFeTlsaG9SeWVsTUxzTlY5M3RmUHc2VkJNVGNiUi9WNis2c1VEOHQ2UGFVOURaNTNwOWY5YWo2YlJVR3dYQVpCbE1ZbGxmN2NPcWpQRzJnWXRHWlVCcDJka0c2QXBvTFhKeCszSG9wQ1JBYUw2Mnk1SG1aSjBZdzR0Z0NQMm5HMFNxc3kxVU5GTlVESzZBSUVkMFdUTWlkVnAwM2d0SWhwZHVPbjQxdlBoRFppaU55Ukc5ZG1mdXUrdjR3eVVRVzlHMXVKMXgxWnNBclFBdmI3SCtnUG9Pa3dtU2FjeU9aZUFiMnlicUI1ZUxFR2FKcHpsajRUT2Eyb1lVL1ZKQ2Z0VFJtTDl6b2RIaTNhQXRxMEFqS1YweFl1azFVVUxoWnhHTXd5dm94UEdES0Q2d1pwdnpPcmxhTVNLYW1pMlF1cEFaeUZXL2ZMSTIwWllyUzlpem56QlJwZVp0RlR1T0I1clQ2bmxCWGV4THNPeE9SSjJiUHN2WVdsRWluTHo5aUN1UVluMmNLdS9RanB6aEFEaHVXbjFQUFNCZzVTRStzOGhLNmVxR0o0M0hPSDQ5eXpZd1g2TGVMUVBwTWFsb0RtT0hvWk9IZG9aQW5wOTRmNmo5eDdnbTZWQzNWUCthWkQ0MmkvSzZRYm9QTThxbHRHdTVqSkhUY2FFVkdldHRZbzFXUnFNeis2L05HZUxQT2I3UnN5R1BqUmUwWXcyenNxQXpkeXd4M1l2cW0rRFo1bGNJeVBhRlA0ZFdDV1p5U1hidWZsTkJrT2s5RTBqQ2JRWWF2NWUrQjhxM1Z4RHBYRFpIbGJiZWZEYVJoVWlmT3dXek9GR0R3MlUzdGtwRWMrT0pSUXdjL1NuaFprR3UyczdNaURyS3ZSMzJqZlk5M1dUYk81bkhwRjJPZU8yeWx4azNkcGwrd1hwQ0lIYnJNazBOcGpsM2k4T1orZTRmazAyZTcrTEhYb1FEbTlXVXNCZlp1NWJuamRiM1U4aVdjV2N6cnZyRnNyWVdTNERpYktHbTlETzIzb0tvaGhFV3pONjU4ZFg1WHQyTDlBSWlxa2ltdzdzSFcwZno4ZTMwOG5rT28zTTI4MlpZeFB3M2c5WFNUSllocU9nOWwxZXdUTnZPQ3lXbzdIMGVibjM5a1hud0g1OEJZdHZZeGtKZ21ubkdGUTZoQlg4SkxYY3paVEMyb3dmUWZhK3liODcwR2o0Z2dEeFFXTWNBcVRKQkhjOWJxOS9MdTZ2VDBPRUxaS0psdnRSMnY5LzBaSERRQ2pWc3lReGV5RWEzdi81bWovSk1BNWFSWENRaWl4NGVLMkIrdi9IOEM1aldhRUNocTlyRloveEtyOVg0TzI1Z1hPM3ZydmJKNEdBTXhJM2xPL3hNZUEybDdhc1lEYzIram8veWNJSmVNWWhiRlExVWFFZVVLQmRZZHg4TExaYmsvSEx3MkYvaHVnY0YrQ3RabEYwZHN4bDBQL0hrWDE2K0V2V2JQZjhBM2Y4QTNmOEEzZjhBM2ZnT0QvQUhqZm9ZZ3QyMDhZQUFBQUFFbEZUa1N1UW1DQw=='
        }

        TriggerEvent('esx_phone:addSpecialContact', specialContact.name, specialContact.number, specialContact.base64Icon)
    end
)

AddEventHandler(
    'onResourceStop',
    function(resource)
        if resource == GetCurrentResourceName() then
            TriggerEvent('esx_phone:removeSpecialContact', 'nightclub')
        end
    end
)

-- SecurityJob
RegisterNetEvent('esx_nightclub:StartSecurity')
AddEventHandler(
    'esx_nightclub:StartSecurity',
    function()
        startSecurity()
    end
)

RegisterNetEvent('esx_nightclub:SpawnCustomerInClub')
AddEventHandler(
    'esx_nightclub:SpawnCustomerInClub',
    function(type, id)
        spawnCustomerInClub(type, id)
    end
)

RegisterNetEvent('esx_nightclub:SpawnBadGuy')
AddEventHandler(
    'esx_nightclub:SpawnBadGuy',
    function(type, id)
        spawnBadGuy(type, id)
    end
)

RegisterNetEvent('esx_nightclub:RemoveGirl')
AddEventHandler(
    'esx_nightclub:RemoveGirl',
    function(id)
        removeGirl(id)
    end
)

RegisterNetEvent('esx_nightclub:StopSecurity')
AddEventHandler(
    'esx_nightclub:StopSecurity',
    function()
        resetWork()
        startFightInClub()
    end
)

RegisterNetEvent('esx_nightclub:ClubOpen')
AddEventHandler(
    'esx_nightclub:ClubOpen',
    function()
        spawnDancer()
    end
)

RegisterNetEvent('esx_nightclub:ClubClosed')
AddEventHandler(
    'esx_nightclub:ClubClosed',
    function()
        removeDancer()
    end
)

RegisterNetEvent('esx_nightclub:getData')
AddEventHandler(
    'esx_nightclub:getData',
    function(girlCount, badguyCount, guyCount)
        girlsTotal = girlCount
        badguysTotal = badguyCount
        guysTotal = guyCount
    end
)

-- DriverJob
RegisterNetEvent('esx_nightclub:spawnDriverCar')
AddEventHandler(
    'esx_nightclub:spawnDriverCar',
    function(vehicleType)
        local car = spawnCar[vehicleType]
        ESX.Game.SpawnVehicle(car, spawnCar.coord, spawnCar.h, cb)
        carOut = true
    end
)

-- Cops
RegisterNetEvent('esx_nightclub:setcopblip')
AddEventHandler(
    'esx_nightclub:setcopblip',
    function(x, y, z)
        Citizen.CreateThread(
            function()
                local copblip = AddBlipForCoord(x, y, z)
                SetBlipSprite(copblip, 161)
                SetBlipScale(copblip, 2.0)
                SetBlipColour(copblip, 8)
                PulseBlip(copblip)
                ESX.ShowNotification('~r~Оповезение:~w~ Началась драка в ночном клубе!')
                Wait(60000)
                RemoveBlip(copblip)
            end
        )
    end
)

AddEventHandler('esx_nightclub:OpenSocietyActionsMenu', function()
    if not isDead and IsJobTrue() and not ESX.UI.Menu.IsOpen('default', GetCurrentResourceName(), 'nightclub_actions') then
        OpenSocietyActionsMenu()
    end
end)


--[[RegisterNetEvent('esx_nightclub:test')
AddEventHandler(
    'esx_nightclub:test',
    function()
    end
)]]
