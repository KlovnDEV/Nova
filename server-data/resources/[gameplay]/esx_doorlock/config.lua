Config = {}
Config.Locale = 'en'

Config.DoorList = {

	--
	-- Mission Row First Floor
	--

	-- Entrance Doors
	["lspd_ent"] = {
		textCoords = vector3(434.7, -981.93, 30.9),
		authorizedRoles = { 'police' },
		locked = false,
		distance = 2.5,

		doors = {
			{
				objName = 'v_ilev_ph_door01',
				objCoords = vector3(434.6813, -980.6288, 30.8451)
			},

			{
				objName = 'v_ilev_ph_door002',
				objCoords = vector3(434.6813, -983.2438, 30.8451)
			}
		}
	},

	-- To locker room & roof
	["lspd_locker"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor004',
		objCoords  = vector3(450.0936, -985.7114, 30.82878),
		textCoords = vector3(450.1, -986.9, 30.8),
		authorizedRoles = { 'police' },
		distance = 2.3,
		locked = true
	},

	-- Rooftop
	["lspd_roof"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor02',
		objCoords  = vector3(464.3, -984.6, 43.8),
		textCoords = vector3(464.3, -984.0, 44.8),
		authorizedRoles = { 'police' },
		locked = true
	},

	-- Hallway to roof
	["lspd_roofhall"] = {
		group = "lspd",
		objName = 'v_ilev_arm_secdoor',
		objCoords  = vector3(461.2, -985.3, 30.8),
		textCoords = vector3(461.2, -986.5, 30.7),
		authorizedRoles = { 'police' },
		distance = 2.5,
		locked = true
	},

	-- Armory
	-- ["lspd_armory"] = {
	-- 	objName = 'v_ilev_arm_secdoor',
	-- 	objCoords  = vector3(452.6, -982.7, 30.6),
	-- 	textCoords = vector3(453.0, -982.6, 31.7),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },

	-- Captain Office
	["lspd_captain"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor002',
		objCoords  = vector3(446.5732, -980.0388, 30.87032),
		textCoords = vector3(447.8, -980.0, 30.7),
		authorizedRoles = { 'police' },
		difficulty = 10,
		distance = 2.5,
		locked = true
	},

	["lspd_chief"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor002',
		objCoords  = vector3(462.77, -1000.99, 35.93),
		textCoords = vector3(462.77, -1000.99, 35.93),
		authorizedRoles = { 'police' },
		difficulty = 10,
		locked = true
	},
	-- To downstairs (double doors)
	["lspd_down"] = {
		group = "lspd",
		textCoords = vector3(444.7, -989.4, 31.0),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2.5,
		difficulty = 10,
		doors = {
			{
				objName = 'v_ilev_ph_gendoor005',
				objCoords = vector3(443.3697, -989.5233, 30.92709)
			},

			{
				objName = 'v_ilev_ph_gendoor005',
				objCoords = vector3(446.0056, -989.5233, 30.92709)
			}
		}
	},
-- Допросные
	["lspd_stuff"] = {
		group = "lspd",
		textCoords = vector3(460.9, -990.88, 30.7),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_ph_gendoor006',
				objCoords = vector3(461.3, -992.1, 30.6)
			},

			{
				objName = 'v_ilev_ph_gendoor006',
				objCoords = vector3(461.32, -989.77, 30.6)
			}
		}
	},

	-- STORAGE
	["lspd_storage1"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor006',
		objCoords  = vector3(471.41, -985.37, 24.91),
		textCoords = vector3(471.41, -985.37, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	["lspd_storage2"] = {
		group = "lspd",
		objName = 'prop_fnclink_02gate7',
		objCoords  = vector3(475.44, -986.87, 24.91),
		textCoords = vector3(475.51, -985.89, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
-- SERVER
	["lspd_server"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor006',
		objCoords  = vector3(468.25, -977.83, 24.91),
		textCoords = vector3(468.25, -977.83, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
-- laba
	["lspd_lab"] = {
		group = "lspd",
		objName = 'v_ilev_ph_gendoor006',
		objCoords  = vector3(463.67, -981.24, 24.91),
		textCoords = vector3(463.67, -981.24, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	["lspd_inter1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(467.91, -1003.38, 24.91),
		textCoords = vector3(467.91, -1003.38, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	["lspd_inter2"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(476.4, -1003.43, 24.91),
		textCoords = vector3(476.4, -1003.43, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	--
	-- Mission Row Cells
	--

	-- Main Cells
	["lspd_cells"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(463.8, -992.6, 24.9),
		textCoords = vector3(463.3, -992.6, 25.1),
		authorizedRoles = { 'police' },
		locked = true
	},

	-- Cell 1
	["lspd_cell1"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(462.3, -993.6, 24.9),
		textCoords = vector3(461.8, -993.3, 25.0),
		authorizedRoles = { 'police' },
		locked = true
	},

	-- Cell 2
	["lspd_cell2"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(462.3, -998.1, 24.9),
		textCoords = vector3(461.8, -998.8, 25.0),
		authorizedRoles = { 'police' },
		locked = true
	},

	-- Cell 3
	["lspd_cell3"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(461.7523, -1001.3, 25.03753),
		textCoords = vector3(461.7523, -1002.444, 25.03753),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- Cell 4
	["lspd_cell4"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(472.2, -996.35, 24.91),
		textCoords = vector3(472.2, -996.35, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- Cell 5
	["lspd_cell5"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(467.83, -996.64, 24.91),
		textCoords = vector3(467.83, -996.64, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- Cell 6
	["lspd_cell6"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(476.4, -996.5, 24.91),
		textCoords = vector3(476.4, -996.5, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- Cell 7
	["lspd_cell7"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(480.75, -996.42, 24.91),
		textCoords = vector3(480.75, -996.42, 24.91),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- To Back
	["lspd_back1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(463.5221, -1003.583, 25.00726),
		textCoords = vector3(464.6827, -1003.583, 24.98337),
		authorizedRoles = { 'police' },
		locked = true
	},


	-- {
	-- 	objName = 'v_ilev_ph_cellgate',
	-- 	objCoords  = vector3(481.9, -988.73, 25.0),
	-- 	textCoords = vector3(481.8, -988.13, 25.5),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },
	-- {
	-- 	objName = 'v_ilev_ph_cellgate',
	-- 	objCoords  = vector3(482.1, -991.1, 25.0),
	-- 	textCoords = vector3(482.1, -991.8, 25.5),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },
	-- Balk


	--
	-- Mission Row Back
	--

	-- Back (double doors)
	["lspd_back2"] = {
		group = "lspd",
		textCoords = vector3(468.6712, -1014.491, 26.54721),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2.5,
		doors = {
			{
				objName = 'v_ilev_rc_door2',
				objCoords  = vector3(467.3945, -1014.491, 26.54721)
			},

			{
				objName = 'v_ilev_rc_door2',
				objCoords  = vector3(469.9337, -1014.491, 26.54721)
			}
		}
	},
	["lspd_back3"] = {
		group = "lspd",
		textCoords = vector3(445.9, -999.1, 30.7),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2.5,
		doors = {
			{
				objName = 'v_ilev_gtdoor',
				objCoords  = vector3(444.75, -999.36, 30.7),
			},

			{
				objName = 'v_ilev_gtdoor',
				objCoords  = vector3(446.85, -999.54, 30.7)
			}
		}
	},

	-- {
	-- 	objName = 'v_ilev_ph_cellgate',
	-- 	objCoords  = vector3(481.9, -988.73, 25.0),
	-- 	textCoords = vector3(481.8, -988.13, 25.5),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },
	-- {
	-- 	objName = 'v_ilev_ph_cellgate',
	-- 	objCoords  = vector3(482.1, -991.1, 25.0),
	-- 	textCoords = vector3(482.1, -991.8, 25.5),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },
	-- Balk

	--
	-- Mission Row Back
	--

	-- Back (double doors)

	-- Back Gate
	{
		objName = 'hei_prop_station_gate',
		objCoords  = vector3(488.8948, -1017.212, 27.14935),
		textCoords = vector3(488.8009, -1019.99, 28.60564),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 14,
		size = 2
	},

	--
	--VinewoodPD
	--
	--Mainshell
	["lobby_to_stuff"] = {
		group = "lspd",
		textCoords = vector3(624.40, -7.47, 82.895),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(623.17334, -7.03775, 82.895)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(625.6068725, -7.9257, 82.895)
			}
		}
	},
	["lobbystairsdowna"] = {
		group = "lspd",
		textCoords = vector3(614.57, -7.89, 79.43),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(614.17, -9.07, 79.895)
			},

			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(614.91, -6.85, 79.895)
			}
		}
	},
    ["vwpd_storage"] = {
		group = "lspd",
		textCoords = vector3(596.32, 3.94, 79.43),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(595.28, 4.25, 79.895)
			},

			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(597.49, 3.59, 79.895)
			}
		}
	},
    ["vwpd_swat"] = {
		group = "lspd",
		textCoords = vector3(606.33, -1.14, 79.43),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(607.4, -1.41, 79.895)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(605.41, -0.77, 79.895)
			}
		}
	},
	["lobby_closed"] = {
		textCoords = vector3(620.70, 8.15, 82.75),
		locked = true,
		distance = 2,
		doors = {}
	},
	["lobbystairs1"] = {
		group = "lspd",
		textCoords = vector3(623.7, 0.57, 82.74),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(623.34, 1.19, 82.74)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(624.31, -0.47, 82.74)
			}
		}
	},
    ["dispach_vpd"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor002',
		objCoords  = vector3(622.71, -16.8, 82.75),
		textCoords = vector3(622.71, -16.8, 82.75),
		authorizedRoles = { 'police' },
		locked = true
	},
	["arch1"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor002',
		objCoords  = vector3(630.18, -9.04, 82.75),
		textCoords = vector3(629.77, -9.59, 82.95),
		authorizedRoles = { 'police' },
		locked = true
	},
    ["arch2"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor002',
		objCoords  = vector3(630.18, -9.04, 82.75),
		textCoords = vector3(629.77, -9.59, 82.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["dispach"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor002',
		objCoords  = vector3(623.79, -13.88, 82.75),
		textCoords = vector3(623.71, -14.33, 82.75),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cloakroomvine"] = {
		group = "lspd",
		objName = 'v_ilev_door_orangesolid',
		objCoords  = vector3(614.71, -15.56, 82.75),
		textCoords = vector3(614.63, -15.01, 82.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cloackroomvine_closed1"] = {
		objCoords  = vector3(610.55, -6.41, 82.89),
		textCoords  = vector3(610.55, -5.20, 82.89),
		locked = true,
		doors = {},
		distance = 2,
	},
	["cloackroomvine_closed2"] = {
		objCoords  = vector3(607.3, -5.37, 82.89),
		textCoords  = vector3(607.8, -4.20, 82.89),
		locked = true,
		doors = {},
		distance = 2,
	},
	["armory1"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor01',
		objCoords  = vector3(608.872, -17.130, 82.897),
		textCoords = vector3(609.86, -17.55, 82.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["armoryin"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor01',
		objCoords  = vector3(608.81, -22.94, 82.75),
		textCoords = vector3(609.5, -22.92, 82.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["hallwaytostairs"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(604.202, -11.1634, 82.899),
		textCoords = vector3(603.22, -10.87, 82.75),
		authorizedRoles = { 'police' },
		locked = true
	},
	["stairstocell1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(605.66369628, -7.15039157, 87.9671936),
		textCoords = vector3(604.71, -6.74, 87.82),
		authorizedRoles = { 'police' },
		locked = true
	},
	["stairstocell2"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor01',
		objCoords  = vector3(613.63, -6.42, 87.82),
		textCoords = vector3(613.05, -6.43, 87.82),
		authorizedRoles = { 'police' },
		locked = true
	},
	["stairstosecfl"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(595.34, -7.8817, 91.08),
		textCoords = vector3(596.34, -8.18, 90.93),
		authorizedRoles = { 'police' },
		locked = true
	},
	["stairs2tosecfl"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(618.685, 1.296, 91.08),
		textCoords = vector3(618.38, 0.3, 90.93),
		authorizedRoles = { 'police' },
		locked = true
	},
	--Secondfloor
	["secfloorlab"] = {
		group = "lspd",
		textCoords = vector3(622.91, 7.79, 90.93),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 1.7,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(624.706, 7.5, 90.93)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(621.87, 8.19, 90.93)
			}
		}
	},
	["capoffice1"] = {
		group = "lspd",
		textCoords = vector3(629.58, 1.05, 90.93),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'prop_ld_bankdoors_02',
				objCoords = vector3(629.87, 1.39, 90.93)
			},

			{
				objName = 'prop_ld_bankdoors_02',
				objCoords = vector3(629.29, 0.36, 90.93)
			}
		}
	},
	-- ["mainoffice1"] = {
	-- 	group = "lspd",
	-- 	textCoords = vector3(618.54, -9.16, 90.93),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true,
	-- 	distance = 2,
	-- 	doors = {
	-- 		{
	-- 			objName = 'v_ilev_fib_door3',
	-- 			objCoords = vector3(618.85, -8.8, 90.93)
	-- 		},

	-- 		{
	-- 			objName = 'v_ilev_fib_door3',
	-- 			objCoords = vector3(618.43, -9.74, 90.93)
	-- 		}
	-- 	}
	-- },
	-- ["sergdoor1"] = {
	-- 	group = "lspd",
	-- 	objName = 'v_ilev_cf_officedoor',
	-- 	objCoords  = vector3(624.455, -7.959, 91.089),
	-- 	textCoords = vector3(625.37, -7.47, 90.93),
	-- 	authorizedRoles = { 'police' },
	-- 	locked = true
	-- },
	["sergdoor2"] = {
		group = "lspd",
		objName = 'v_ilev_cf_officedoor',
		objCoords  = vector3(622.842, -15.053, 91.089),
		textCoords = vector3(622.3, -14.22, 90.93),
		authorizedRoles = { 'police' },
		locked = true
	},
	["detectiveffice1"] = {
		group = "lspd",
		textCoords = vector3(613.25, -18.7, 90.93),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_fib_door1',
				objCoords = vector3(612.42, -18.71, 90.93)
			},

			{
				objName = 'v_ilev_fib_door1',
				objCoords = vector3(613.93, -19.03, 90.93)
			}
		}
	},
	--Mainshell2
	["lobbycells"] = {
		group = "lspd",
		textCoords = vector3(619.54, 16.54, 87.82),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_prop_ph_door01',
				objCoords = vector3(620.872, 16.226, 87.969)
			},

			{
				objName = 'leb_prop_ph_door002',
				objCoords = vector3(618.426, 17.118259, 87.969)
			}
		}
	},
	["lobbytohall"] = {
		group = "lspd",
		textCoords = vector3(617.14, 9.96, 87.95),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(615.9564819, 10.338897705, 87.968223)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(618.389648, 9.45201683, 87.968223)
			}
		}
	},
	["hallwaytoint"] = {
		group = "lspd",
		textCoords = vector3(613.13, 4.22, 87.95),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_vinepd_secdoor01',
				objCoords = vector3(613.731445, 5.42362, 87.95768)
			},

			{
				objName = 'leb_vinepd_secdoor002',
				objCoords = vector3(612.844238, 2.9889183, 87.9684143)
			}
		}
	},
	["hallcelldoor"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(614.21643, 1.20881652, 87.96688),
		textCoords = vector3(613.10, 1.58, 88.0),
		authorizedRoles = { 'police' },
		locked = true
	},
	["storageroomcell"] = {
		group = "lspd",
		objName = 'leb_vinepd_secdoor01',
		objCoords  = vector3(609.552, 7.389, 87.97),
		textCoords = vector3(608.6, 7.73, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["identification1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(604.34, 5.64, 87.967),
		textCoords = vector3(603.4, 6.07, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["interrogation1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(606.19, 8.66, 87.82),
		textCoords = vector3(606.19, 8.66, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["interrogation2"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(599.299, 11.135, 87.97),
		textCoords = vector3(598.33, 11.62, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["interrogation3"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(591.554, 13.942, 87.967),
		textCoords = vector3(590.37, 14.32, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	--Cells
	["inttocells1"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(580.60, 13.818, 87.97),
		textCoords = vector3(579.49, 14.09, 87.95),
		authorizedRoles = { 'police' },
		locked = true
	},
	["inttocells2"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(579.2, 15.42, 84.82),
		textCoords = vector3(579.2, 15.60, 84.75),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cellbig1"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(581.84, 16.42, 84.67),
		textCoords = vector3(582.92, 16.10, 84.65),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cellsmall1"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(588.99, 13.82, 84.67),
		textCoords = vector3(588.04, 14.24, 84.65),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cellsmall2"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(591.12, 13.1, 84.82),
		textCoords = vector3(590.95, 13.1, 84.65),
		authorizedRoles = { 'police' },
		locked = true
	},
	["cellsmall3"] = {
		group = "lspd",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(594.99, 11.63, 84.67),
		textCoords = vector3(593.95, 12.01, 84.65),
		authorizedRoles = { 'police' },
		locked = true
	},
	["closecells1"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(586.589, 9.92, 84.67),
		textCoords = vector3(586.24, 8.93, 84.52),
		authorizedRoles = { 'police' },
		locked = true
	},
	["closecells2"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(585.16, 6.03, 84.67),
		textCoords = vector3(584.85, 5.05, 84.52),
		authorizedRoles = { 'police' },
		locked = true
	},
	["closecells3"] = {
		group = "lspd",
		objName = 'v_ilev_gtdoor',
		objCoords  = vector3(583.76, 2.16, 84.67),
		textCoords = vector3(583.46, 1.1, 84.52),
		authorizedRoles = { 'police' },
		locked = true
	},
	--Garage--
	["lspd_pillar"] = {
		group = "lspd",
		objName = 'leb_vinepd_prop_pillardoor01',
		forceCoords = vector3(545.5344,-51.35389, 69.998),
		forceRot = vector3(180, 0, -120),

		objCoords  = vector3(545.5344,-51.35389, 69.998),
		textCoords = vector3(545.5344,-51.35389, 71.000),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 10,
		size = 1,
		openRatioThreshold = 1.0,
	},
	["garage_door"] = {
		group = "police",
		objName = 'V_ILev_CT_Door03',
		objCoords  = vector3(535.87, -21.4, 70.63),
		textCoords = vector3(536.4, -21.4, 71.00),
		authorizedRoles = { 'police' },
		locked = true
	},
	["car_garagedoor_1"] = {
	        group = "police",
	        objName = 'leb_vinepd_garagedoor_v2',

	        objCoords  = vector3(527.2, -24.84, 70.63),
	        textCoords = vector3(527.2, -24.84, 71.63),
	        authorizedRoles = { 'police' },
	        locked = true,
	        distance = 8,
	        size = 1,
		openRatioThreshold = 1.0,
	},
    ["car_garagedoor_2"] = {
        group = "police",
        objName = 'leb_vinepd_garagedoor_v2',

        objCoords  = vector3(531.56, -22.15, 70.63),
        textCoords = vector3(531.56, -22.15, 71.63),
        authorizedRoles = { 'police' },
        locked = true,
        distance = 8,
        size = 1,
	openRatioThreshold = 1.0,
    },
	--
	-- Sandy Shores
	--

	-- Entrance
	["shpd_ent"] = {
		group = "sheriff",
		objName = 'v_ilev_shrfdoor',
		objCoords  = vector3(1855.1, 3683.5, 34.2),
		textCoords = vector3(1855.1, 3683.5, 35.0),
		authorizedRoles = { 'police' },
		locked = false
	},
	["shpd_cell1"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(1848.07, 3681.55, 34.29),
		textCoords = vector3(1848.35, 3681.08, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},
	["shpd_cell2"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_cellgate',
		objCoords  = vector3(1846.44, 3684.47, 34.29),
		textCoords = vector3(1846.1, 3685.02, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},
	["shpd_cells"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_gendoor004',
		objCoords  = vector3(1850.76, 3682.88, 34.29),
		textCoords = vector3(1850.76, 3682.88, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},
	["shpd_stuff1"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_gendoor004',
		objCoords  = vector3(1856.66, 3689.87, 34.29),
		textCoords = vector3(1856.66, 3689.87, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},
	["shpd_stuff2"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_gendoor004',
		objCoords  = vector3(1848.69, 3690.91, 34.29),
		textCoords = vector3(1848.69, 3690.91, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},
	["shpd_stuff3"] = {
		group = "sheriff",
		objName = 'v_ilev_ph_gendoor004',
		objCoords  = vector3(1845.67, 3688.84, 34.29),
		textCoords = vector3(1845.67, 3688.84, 34.29),
		authorizedRoles = { 'police' },
		locked = true
	},


	--
	-- Paleto Bay
	--

	-- Entrance (double doors)
	["palpd_ent"] = {
		textCoords = vector3(-443.5, 6016.3, 32.0),
		authorizedRoles = { 'police' },
		locked = false,
		distance = 2.5,
		doors = {
			{
				objName = 'v_ilev_shrf2door',
				objCoords  = vector3(-443.1, 6015.6, 31.7),
			},

			{
				objName = 'v_ilev_shrf2door',
				objCoords  = vector3(-443.9, 6016.6, 31.7)
			}
		}
    },

    -- Zonah Hospital
    ["operating_room1"] = {
		group = "zonah",
		textCoords = vector3(-438.26, -315.34, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 1,
		doors = {
			{
				objName = 'v_ilev_cor_darkdoor',
				objCoords = vector3(-438.43, -316.42, 34.6)
			},

			{
				objName = 'v_ilev_cor_darkdoor',
				objCoords = vector3(-438.18, -314.08, 34.6)
			}
		}
    },
    ["operating_room2"] = {
		group = "zonah",
		textCoords = vector3(-437.68, -311.43, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 1,
		doors = {
			{
				objName = 'v_ilev_cor_darkdoor',
				objCoords = vector3(-437.99, -312.55, 34.6)
			},

			{
				objName = 'v_ilev_cor_darkdoor',
				objCoords = vector3(-437.55, -310.22, 34.6)
			}
		}
    },
    ["morg1"] = {
		group = "zonah",
		textCoords = vector3(-441.81, -302.29, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_hospital_secdoor002',
				objCoords = vector3(-442.62, -302.33, 34.6)
			},

			{
				objName = 'leb_hospital_secdoor01',
				objCoords = vector3(-440.49, -302.54, 34.6)
			}
		}
    },
    ["morg2"] = {
		group = "zonah",
		textCoords = vector3(-442.79, -294.52, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_doorglassb',
				objCoords = vector3(-442.88, -295.41, 34.6)
			},

			{
				objName = 'v_ilev_cor_doorglassa',
				objCoords = vector3(-442.46, -293.42, 34.6)
			}
		}
    },
    ["exit_n"] = {
		group = "zonah",
		textCoords = vector3(-468.24, -281.21, 35.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(-469.34, -281.69, 35.6)
			},

			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(-467.24, -280.72, 35.6)
			}
		}
    },
    ["exit_e"] = {
		group = "zonah",
		textCoords = vector3(-431.56, -328.93, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(-431.27, -327.78, 34.6)
			},

			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(-431.55, -330.13, 34.6)
			}
		}
    },
    ["exit_s1"] = {
		group = "zonah",
		textCoords = vector3(-441.93, -329.66, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-443.08, -329.48, 34.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-440.77, -329.85, 34.6)
			}
		}
    },
    ["exit_s2"] = {
		group = "zonah",
		textCoords = vector3(-437.66, -326.06, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 1.5,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-438.86, -325.76, 34.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-436.82, -326.08, 34.6)
			}
		}
    },
    ["ward_group"] = {
		group = "zonah",
		textCoords = vector3(-433.96, -313.94, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-433.79, -312.75, 34.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-434.11, -315.16, 34.6)
			}
		}
    },
    ["coridor1"] = {
		group = "zonah",
		textCoords = vector3(-436.81, -305.16, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-437.1, -306.2, 34.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-436.89, -304.31, 34.6)
			}
		}
    },
    ["coridor2"] = {
		group = "zonah",
		textCoords = vector3(-451.59, -303.14, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-451.63, -304.25, 34.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-451.44, -301.9, 34.6)
			}
		}
    },
    ["meeting"] = {
		group = "zonah",
		textCoords = vector3(-458.92, -303.58, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_door_orangesolid',
				objCoords = vector3(-458.53, -304.54, 34.6)
			},

			{
				objName = 'v_ilev_door_orangesolid',
				objCoords = vector3(-459.3, -302.57, 34.6)
			}
		}
    },
    ["boss"] = {
		group = "zonah",
		textCoords = vector3(-455.14, -313.15, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_fib_door1',
				objCoords = vector3(-454.51, -313.98, 34.6)
			},

			{
				objName = 'v_ilev_fib_door1',
				objCoords = vector3(-455.61, -312.04, 34.6)
			}
		}
    },
    ["garage"] = {
		group = "zonah",
		textCoords = vector3(-458.18, -328.16, 26.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-458.63, -327.22, 26.6)
			},

			{
				objName = 'v_ilev_cor_firedoorwide_edit01',
				objCoords = vector3(-457.93, -329.22, 26.6)
			}
		}
    },
    ["lab"] = {
		group = "zonah",
		textCoords = vector3(-444.47, -306.36, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_hospital_secdoor002',
				objCoords = vector3(-443.37, -306.37, 34.6)
			},

			{
				objName = 'leb_hospital_secdoor01',
				objCoords = vector3(-445.58, -305.98, 34.6)
			}
		}
    },
    ["zonah_garage"] = {
		group = "zonah",
		objName = 'leb_hospital_garagedoor01',

		objCoords  = vector3(-459.06, -276.55, 38.04),
		textCoords = vector3(-459.06, -276.55, 36.6),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 8,
		size = 1,
		openRatioThreshold = 1.0,
	},
    ["oper_r"] = {
		group = "zonah",
		objName = 'leb_hospital_secdoor01',
		objCoords  = vector3(-443.37, -311.25, 34.6),
		textCoords = vector3(-443.61, -312.14, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["oper_l"] = {
		group = "zonah",
		objName = 'leb_hospital_secdoor01',
		objCoords  = vector3(-443.64, -312.98, 34.6),
		textCoords = vector3(-443.81, -314.04, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["ward_solo"] = {
		group = "zonah",
		objName = 'v_ilev_cor_firedoorwide_edit01',
		objCoords  = vector3(-433.14, -308.88, 34.6),
		textCoords = vector3(-433.58, -309.66, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["stairs1"] = {
		group = "zonah",
		objName = 'v_ilev_cor_firedoorwide_edit01',
		objCoords  = vector3(-449.56, -325.98, 34.6),
		textCoords = vector3(-449.13, -325.23, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["stairs2"] = {
		group = "zonah",
		objName = 'v_ilev_cor_firedoorwide_edit01',
		objCoords  = vector3(-449.49, -325.75, 26.6),
		textCoords = vector3(-449.3, -325.19, 26.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["psycho"] = {
		group = "zonah",
		objName = 'v_ilev_fib_door1',
		objCoords  = vector3(-456.24, -310.33, 34.6),
		textCoords = vector3(-456.51, -309.51, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["chillroom1"] = {
		group = "zonah",
		objName = 'v_ilev_door_orangesolid',
		objCoords  = vector3(-434.25, -344.58, 34.6),
		textCoords = vector3(-434.17, -343.78, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["chillroom2"] = {
		group = "zonah",
		objName = 'v_ilev_door_orangesolid',
		objCoords  = vector3(-435.99, -330.33, 34.6),
		textCoords = vector3(-435.42, -330.52, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
    },
    ["lookout"] = {
		group = "zonah",
		objName = 'v_ilev_door_orangesolid',
		objCoords  = vector3(-439.47, -324.28, 34.6),
		textCoords = vector3(-439.33, -323.27, 34.6),
		authorizedRoles = { 'ambulance' },
		locked = true
	},
-- BANKS

	--
	["bank_pacific_vault"] = {
		objName = 'hei_v_ilev_bk_gate2_pris',
		objCoords  = vector3(262.0, 221.91, 106.2),
		textCoords = vector3(261.9, 221.94, 106.2),
		authorizedRoles = { 'police' },
		locked = true
	},

	["bank_blane_vault"] = {
		objName = 'v_ilev_cbankvaulgate01',
		objCoords  = vector3(-104.92, 6473.58, 31.63),
		textCoords = vector3(-105.25, 6472.83, 31.63),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- Bolingbroke Penitentiary
	--

	-- Entrance (Two big gates)
	["bank3"] = {
		objName = 'prop_gate_prison_01',
		objCoords  = vector3(1844.9, 2604.8, 44.6),
		textCoords = vector3(1844.9, 2608.5, 48.0),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 12,
		size = 2
	},

	["bank4"] = {
		objName = 'prop_gate_prison_01',
		objCoords  = vector3(1818.5, 2604.8, 44.6),
		textCoords = vector3(1818.5, 2608.4, 48.0),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 12,
		size = 2
	},

	["bank5"] = {
		objName = 'prop_gate_prison_01',
		objCoords  = vector3(1799.8, 2617.7, 44.6),
		textCoords = vector3(1796.99, 2617.51, 48.6),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 12,
		size = 2
	},

	["bank6"] = {
		objName = 'prop_fnclink_03gate5',
		objCoords  = vector3(1797.5, 2591.72, 45.8),
		textCoords = vector3(1797.17, 2591.55, 45.8),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- PRISON
	["prison1"] = {
		textCoords = vector3(1705.99, 2498.73, -78.0),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(1705.5, 2498.01, -78.6)
			},

			{
				objName = 'v_ilev_gtdoor02',
				objCoords = vector3(1705.59, -2499.49, -78.6)
			}
		}
	},
	["prison2"] = {
		objName = 'v_ilev_cd_entrydoor',
		objCoords  = vector3(1722.39, 2500.33, -78.0),
		textCoords = vector3(1722.68, 2501.8, -77.5),
		authorizedRoles = { 'police' },
		locked = true
	},
	-- PILLBOX HILL
	["pill1"] = {
		group = "ambu",
		objName = 'v_ilev_cor_firedoorwide',
		objCoords  = vector3(337.83, -583.62, 28.8),
		textCoords = vector3(337.83, -583.62, 29.5),
		authorizedRoles = { 'ambulance' },
		locked = true
	},
	["pill2"] = {
		group = "ambu",
		objName = 'v_ilev_cor_firedoorwide',
		distance = 2,
		objCoords  = vector3(333.63, -576.91, 28.8),
		textCoords = vector3(333.41, -577.17, 29.5),
		authorizedRoles = { 'ambulance' },
		locked = true
	},
	["pill3"] = {
		group = "ambu",
		objName = 'v_ilev_cor_firedoorwide',
		objCoords  = vector3(330.94, -576.16, 28.8),
		textCoords = vector3(330.94, -576.16, 29.5),
		authorizedRoles = { 'ambulance' },
		locked = true
	},
	["pill4"] = {
		group = "ambu",
		textCoords = vector3(334.21, -592.43, 28.79),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(334.32, -593.24, 28.79)
			},

			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(334.97, -591.56, 28.79)
			}
		}
	},
	["pill5"] = {
		group = "ambu",
		textCoords = vector3(341.88, -571.4, 28.79),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(341.72, -572.6, 28.79)
			},

			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(342.22, -570.52, 28.79)
			}
		}
	},
	["pill6"] = {
		group = "ambu",
		textCoords = vector3(319.89, -560.58, 28.79),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'hei_prop_heist_cutscene_doorc_r',
				objCoords = vector3(319.17, -561.2, 28.78)
			},

			{
				objName = 'hei_prop_heist_cutscene_doorc_r',
				objCoords = vector3(320.9, -560.13, 28.78)
			}
		}
	},

	["pill7"] = {
		group = "ambu",
		textCoords = vector3(346.1, -568.33, 28.79),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(344.91, -568.34, 28.78)
			},

			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(347.02, -569.14, 28.78)
			}
		}
	},

	["pill8"] = {
		group = "ambu",
		textCoords = vector3(251.91, -1366.43, -28.79),
		authorizedRoles = { 'ambulance' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(252.98, -1366.69, 24.54)
			},

			{
				objName = 'v_ilev_cor_firedoor',
				objCoords = vector3(251.31, -1365.49, 24.54)
			}
		}
	},

	-- UNICORN
	["uni1"] = {
		group = "unicorn",
		objName = 'prop_strip_door_01',
		objCoords  = vector3(128.54, -1298.93, 29.23),
		textCoords = vector3(128.54, -1298.19, 29.50),
		authorizedRoles = { 'unicorn' },
		locked = true
	},
	["uni2"] = {
		group = "unicorn",
		objName = 'prop_magenta_door',
		objCoords  = vector3(95.48, -1285.14, 29.50),
		textCoords = vector3(95.48, -1285.14, 29.50),
		authorizedRoles = { 'unicorn' },
		locked = true
	},
	["uni3"] = {
		group = "unicorn",
		objName = 'v_ilev_roc_door2',
		objCoords  = vector3(99.64, -1293.47, 29.50),
		textCoords = vector3(99.64, -1293.47, 29.50),
		authorizedRoles = { 'unicorn' },
		locked = true
	},

	["uni4"] = {
		group = "unicorn",
		objName = 'v_ilev_door_orangesolid',
		objCoords  = vector3(133.49, -1293.50, 29.50),
		textCoords = vector3(133.49, -1293.50, 29.50),
		authorizedRoles = { 'unicorn' },
		locked = true
	},
		-- Tequila
	["teq1"] = {
		group = "tequila",
		objName = 'v_ilev_roc_door4',
		objCoords  = vector3(-564.49, 276.61, 83.11),
		textCoords = vector3(-564.49, 276.61, 83.11),
		authorizedRoles = { 'tequila' },
		locked = true
	},
	["teq2"] = {
		group = "tequila",
		objName = 'v_ilev_roc_door4',
		objCoords  = vector3(-561.94, 293.73, 87.6),
		textCoords = vector3(-561.94, 293.73, 87.6),
		authorizedRoles = { 'tequila' },
		locked = true
	},
	["teq3"] = {
		group = "tequila",
		objName = 'v_ilev_roc_door2',
		objCoords  = vector3(-560.19, 292.33, 82.18),
		textCoords = vector3(-560.19, 292.33, 82.18),
		authorizedRoles = { 'tequila' },
		locked = true
	},

	-- BAGAMA
	["bagama_ent"] = {
		group = "bagama",
		textCoords = vector3(-1388.01, -587.23, 30.22),
		authorizedRoles = { 'bagama' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_ph_gendoor006',
				objCoords = vector3(-1387.14, -586.67, 30.22)
			},

			{
				objName = 'v_ilev_ph_gendoor006',
				objCoords = vector3(-1389.05, -587.76, 30.22)
			}
		}
	},


-- LS CUSTOMS
	["lsc_ent"] = {
		group = "lsk",
		objName = 'prop_com_ls_door_01',

		objCoords  = vector3(-356.09, -134.77, 40.01),
		textCoords = vector3(-355.02698, -135.1586, 39),
		authorizedRoles = { 'mechanic' },
		locked = true,
		distance = 8,
		size = 1,
		openRatioThreshold = 1.0,
	},
-- Benny's
	["bennys_ent"] = {
		group = "benny",
		objName = 'lr_prop_supermod_door_01',

		objCoords  = vector3(-205.7007, -1310.692, 30.2957),
		textCoords = vector3(-205.68283081055,-1310.6826171875,32.297708511353),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true,
		distance = 8,
		size = 1,
		openRatioThreshold = 1.0,
	},
    ["bennys_paint"] = {
		group = "benny",
		objName = 'leb_painting_door_bennys',

		objCoords  = vector3(-201.6319, -1324.334, 32.6444),
		textCoords = vector3(-202.48, -1324.43, 30.88),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true,
		distance = 5,
		size = 1,
		openRatioThreshold = 1.0,
	},
    ["bennys_chill"] = {
		group = "benny",
		textCoords = vector3(-213.86, -1334.76, 30.91),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_bennys_door01',
				objCoords = vector3(-213.02, -1334.84, 30.91)
			},

			{
				objName = 'leb_bennys_door01',
				objCoords = vector3(-214.9, -1334.68, 30.91)
			}
		}
	},
    ["bennys_chill2"] = {
		group = "benny",
		objName = 'leb_bennys_door01',
		objCoords  = vector3(-206.45, -1328.03, 30.91),
		textCoords = vector3(-205.86, -1328.1, 30.91),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true
	},
    ["bennys_chill3"] = {
		group = "benny",
		objName = 'leb_bennys_door01',
		objCoords  = vector3(-207.22, -1335.93, 30.91),
		textCoords = vector3(-207.22, -1335.93, 30.91),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true
	},
    ["bennys_office"] = {
		group = "benny",
		objName = 'leb_bennys_door01',
		objCoords  = vector3(-206.27, -1341.67, 34.89),
		textCoords = vector3(-206.27, -1341.67, 34.89),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true
	},
    ["bennys_office2"] = {
		group = "benny",
		objName = 'leb_bennys_door01',
		objCoords  = vector3(-206.24, -1331.53, 34.89),
		textCoords = vector3(-206.24, -1331.53, 34.89),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true
	},
    ["bennys_boss"] = {
		group = "benny",
		objName = 'leb_bennys_door01',
		objCoords  = vector3(-202.82, -1337.85, 34.9),
		textCoords = vector3(-202.82, -1337.85, 34.9),
		authorizedRoles = { 'mechanic-bennys' },
		locked = true
	},
-- Taxi
	["taxi_ent1"] = {
		group = "taxi",
		textCoords = vector3(907.0, -160.5, 74.5),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_taxipark_prop_slidedoor_r',
				objCoords = vector3(906.216, -162.110, 74.558)
			},

			{
				objName = 'leb_taxipark_prop_slidedoor_l',
				objCoords = vector3(908.085, -159.025, 74.558)
			}
		}
	},
    ["taxi_ent2"] = {
		group = "taxi",
		textCoords = vector3(894.5, -178.9, 75),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'v_ilev_roc_door2',
				objCoords = vector3(895.440, -177.471, 74.946)
			},

			{
				objName = 'v_ilev_roc_door2',
				objCoords = vector3(893.675, -180.334, 74.946)
			}
		}
	},
    ["taxi_in1b"] = {
		group = "taxi",
		textCoords = vector3(901.39, -163.73, 74.14),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'ba_prop_door_club_glam_generic',
				objCoords = vector3(902.3, -163.91, 74.14)
			},

			{
				objName = 'ba_prop_door_club_glam_generic',
				objCoords = vector3(900.65, -162.9, 74.14)
			}
		}
	},
    ["taxi_ent3"] = {
		group = "taxi",
		objName = 'v_ilev_roc_door2',
		objCoords  = vector3(895.73, -145.28, 76.94),
		textCoords = vector3(895.73, -145.28, 76.94),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_ent4"] = {
		group = "taxi",
		objName = 'v_ilev_roc_door2',
		objCoords  = vector3(883.06, -160.41, 77.12),
		textCoords = vector3(883.06, -160.41, 77.12),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in1"] = {
		group = "taxi",
		objName = 'ba_prop_door_club_glam_generic',
		objCoords  = vector3(897.63, -159.62, 78.17),
		textCoords = vector3(897.63, -159.62, 78.17),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in2"] = {
		group = "taxi",
		objName = 'ba_prop_door_club_glam_generic',
		objCoords  = vector3(892.48, -162.86, 76.94),
		textCoords = vector3(892.48, -162.86, 76.94),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in3"] = {
		group = "taxi",
		objName = 'ba_prop_door_club_glam_generic',
		objCoords  = vector3(897.7, -156.27, 74.14),
		textCoords = vector3(897.7, -156.27, 74.14),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in4"] = {
		group = "taxi",
		objName = 'ba_prop_door_club_glam_generic',
		objCoords  = vector3(898.07, -158.9, 74.14),
		textCoords = vector3(898.07, -158.9, 74.14),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in5"] = {
		group = "taxi",
		objName = 'leb_taxipark_prop_slidedoor2_r',
		objCoords  = vector3(902.42, -164.08, 78.17),
		textCoords = vector3(902.42, -164.08, 78.17),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_in6"] = {
		group = "taxi",
		objName = 'V_iLev_FIB_door2',
		objCoords  = vector3(902.81, -158.23, 78.17),
		textCoords = vector3(902.81, -158.23, 78.17),
		authorizedRoles = { 'taxi' },
		locked = true
	},
    ["taxi_ent_gar1"] = {
		group = "taxi",
		objName = 'leb_taxipark_garagedoor_b',

		objCoords  = vector3(899.76, -148.09, 78.7),
		textCoords = vector3(899.76, -148.09, 76.93),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 4,
		size = 1,
		openRatioThreshold = 1.0,
	},
	["repair_ent_gar1"] = {
		group = "taxi",
		objName = 'leb_taxipark_garagedoor_s',

		objCoords  = vector3(898.76, -172.27, 75.5),
		textCoords = vector3(898.76, -172.27, 74.5),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 4,
		size = 1,
		openRatioThreshold = 1.0,
	},
    ["repair_ent_gar2"] = {
		group = "taxi",
		objName = 'leb_taxipark_garagedoor_s',

		objCoords  = vector3(901.2, -168.59, 75.5),
		textCoords = vector3(901.2, -168.59, 74.5),
		authorizedRoles = { 'taxi' },
		locked = true,
		distance = 4,
		size = 1,
		openRatioThreshold = 1.0,
	},
-- BeanMachine
    ["bm_back"] = {
		group = "bm",
		objName = 'leb_beanmachine_backdoor01',

		objCoords  = vector3(-814.27, -586.12, 30.67),
		textCoords = vector3(-813.8, -586.49, 30.67),
		authorizedRoles = { 'bean_machine' },
		locked = true,
		distance = 2,
		size = 1,
		openRatioThreshold = 1.0,
	},
    ["bm_main1"] = {
		group = "bm",
		textCoords = vector3(-835.47, -609.92, 29.03),
		authorizedRoles = { 'bean_machine' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_beanmachine_maindoor_l',
				objCoords = vector3(-834.48, -610.48, 29.03)
			},

			{
				objName = 'leb_beanmachine_maindoor_r',
				objCoords = vector3(-836.35, -609.2, 29.03)
			}
		}
	},
    ["bm_main2"] = {
		group = "bm",
		textCoords = vector3(-837.49, -607.81, 29.03),
		authorizedRoles = { 'bean_machine' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'leb_beanmachine_maindoor_l',
				objCoords = vector3(-836.59, -608.68, 29.03)
			},

			{
				objName = 'leb_beanmachine_maindoor_r',
				objCoords = vector3(-838.53, -606.87, 29.03)
			}
		}
	},
    ["bm_stuff"] = {
		group = "bm",
		textCoords = vector3(-830.02, -594.22, 29.03),
		authorizedRoles = { 'bean_machine' },
		locked = true,
		distance = 2,
		doors = {
			{
				objName = 'prop_ld_bankdoors_02',
				objCoords = vector3(-830.71, -593.89, 29.03)
			},

			{
				objName = 'prop_ld_bankdoors_02',
				objCoords = vector3(-829.18, -595.03, 29.03)
			}
		}
	},
-- Gangs basses
["fam_hide"] = {
    group = "families",
    objName = 'v_ilev_janitor_frontdoor',
    objCoords  = vector3(-136.2, -1602.77, 35.03),
    textCoords = vector3(-136.43, -1603.33, 35.03),
    authorizedRoles = { 'families' },
    locked = true
},
["fam_wind"] = {
    group = "families",
    objName = 'prop_gang_door_02',
    objCoords  = vector3(-157.65, -1596.46, 35.11),
    textCoords = vector3(-157.37, -1595.86, 35.11),
    authorizedRoles = { 'families' },
    locked = true
},
["fam_main1"] = {
    group = "families",
    objName = 'prop_gang_door_01',
    objCoords  = vector3(-139.97, -1600.21, 35.03),
    textCoords = vector3(-140.49, -1599.91, 35.03),
    authorizedRoles = { 'families' },
    locked = true
},
["fam_main2"] = {
    group = "families",
    objName = 'prop_gang_door_01',
    objCoords  = vector3(-148.7, -1596.76, 35.03),
    textCoords = vector3(-148.16, -1596.24, 35.03),
    authorizedRoles = { 'families' },
    locked = true
},
["vag_main1"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(344.48, -2028.26, 22.39),
    textCoords = vector3(345.12, -2028.64, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main2"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(344.11, -2027.67, 22.39),
    textCoords = vector3(343.77, -2027.37, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main3"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(335.99, -2020.81, 22.39),
    textCoords = vector3(336.38, -2021.28, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main4"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(360.72, -2041.67, 22.39),
    textCoords = vector3(361.14, -2041.93, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main5"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(352.69, -2034.95, 22.39),
    textCoords = vector3(352.36, -2034.68, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main6"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(353.52, -2035.47, 22.39),
    textCoords = vector3(353.87, -2035.96, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main7"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(364.55, -2044.74, 22.39),
    textCoords = vector3(364.75, -2045.23, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main8"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(371.51, -2040.1, 22.39),
    textCoords = vector3(371.22, -2040.63, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main9"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(365.22, -2032.55, 22.39),
    textCoords = vector3(364.83, -2032.45, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main10"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(361.4, -2029.76, 22.39),
    textCoords = vector3(361.85, -2030.16, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main11"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(356.82, -2025.62, 22.39),
    textCoords = vector3(356.55, -2025.47, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main12"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(353.16, -2022.63, 22.39),
    textCoords = vector3(353.58, -2022.78, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_main13"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(344.86, -2015.61, 22.39),
    textCoords = vector3(345.18, -2015.93, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_hide1"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(332.4, -2017.9, 22.39),
    textCoords = vector3(332.7, -2018.24, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_hide2"] = {
    group = "vagos",
    objName = 'prop_door_vagos_gang',
    objCoords  = vector3(336.56, -2011.01, 22.39),
    textCoords = vector3(336.0, -2011.23, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
["vag_hide3"] = {
    group = "vagos",
    objName = 'p_cut_door_01',
    objCoords  = vector3(338.52, -2017.12, 22.39),
    textCoords = vector3(338.97, -2016.73, 22.39),
    authorizedRoles = { 'vagos' },
    locked = true
},
-- ["bal_garage_back"] = {
--     group = "ballas",
--     objName = 'p_cut_door_01',
--     objCoords  = vector3(338.52, -2017.12, 22.39),
--     textCoords = vector3(338.97, -2016.73, 22.39),
--     authorizedRoles = { 'ballas' },
--     locked = true
-- },
["bal_garage"] = {
    group = "ballas",
    objName = 'prop_garagel_door_02',

    objCoords  = vector3(102.73, -1960.23, 21.45),
    textCoords = vector3(102.73, -1960.23, 20.85),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 6,
    size = 1,
    openRatioThreshold = 1.0,
},
["bal_lab1"] = {
    group = "ballas",
    textCoords = vector3(92.25, -1982.37, 20.47),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'prop_garagel_door_01_l',
            objCoords = vector3(92.78, -1983.35, 20.44)
        },

        {
            objName = 'prop_garagel_door_01_r',
            objCoords = vector3(91.35, -1981.63, 20.44)
        }
    }
},
["bal_lab2"] = {
    group = "ballas",
    textCoords = vector3(94.87, -1985.27, 20.47),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'prop_garagel_door_01_l',
            objCoords = vector3(95.82, -1986.2, 20.44)
        },

        {
            objName = 'prop_garagel_door_01_r',
            objCoords = vector3(94.16, -1984.7, 20.44)
        }
    }
},
["bal_gun1"] = {
    group = "ballas",
    textCoords = vector3(107.88, -1975.97, 20.96),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'prop_garagel_door_01m_l',
            objCoords = vector3(109.17, -1975.53, 20.96)
        },

        {
            objName = 'prop_garagel_door_01m_r',
            objCoords = vector3(106.74, -1976.42, 20.96)
        }
    }
},
["bal_gun2"] = {
    group = "ballas",
    objName = 'ball_prop_sync_door03g_r',

    objCoords  = vector3(104.83, -1977.12, 20.96),
    textCoords = vector3(105.26, -1977.05, 20.85),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},
["bal_gun3"] = {
    group = "ballas",
    objName = 'ball_prop_sync_door03g_l',

    objCoords  = vector3(111.45, -1979.05, 20.96),
    textCoords = vector3(111.26, -1978.64, 20.85),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},
["bal_main1"] = {
    group = "ballas",
    objName = 'ball_prop_sync_door03_r',

    objCoords  = vector3(114.77, -1961.52, 21.33),
    textCoords = vector3(114.48, -1961.59, 21.33),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},
["bal_main2"] = {
    group = "ballas",
    objName = 'ball_prop_sync_door03_l',

    objCoords  = vector3(113.5, -1973.58, 21.33),
    textCoords = vector3(113.23, -1973.71, 21.33),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},
["bal_main3"] = {
    group = "ballas",
    textCoords = vector3(118.16, -1973.98, 21.33),
    authorizedRoles = { 'ballas' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'ball_prop_sync_door03m_r',
            objCoords = vector3(118.93, -1973.51, 21.32)
        },

        {
            objName = 'ball_prop_sync_door03m_l',
            objCoords = vector3(117.15, -1974.31, 21.32)
        }
    }
},
["mar_main1"] = {
    group = "marabunta",
    textCoords = vector3(1437.58, -1491.5, 63.72),
    authorizedRoles = { 'marabunta' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'bunt_prop_sync_door02a_r',
            objCoords = vector3(1436.99, -1491.46, 63.72)
        },

        {
            objName = 'bunt_prop_sync_door02a_l',
            objCoords = vector3(1438.45, -1491.75, 63.72)
        }
    }
},
["mar_main2"] = {
    group = "marabunta",
    textCoords = vector3(1446.58, -1482.84, 63.7),
    authorizedRoles = { 'marabunta' },
    locked = true,
    distance = 2,
    doors = {
        {
            objName = 'bunt_prop_sync_door02a_r',
            objCoords = vector3(1447.01, -1482.97, 63.72)
        },

        {
            objName = 'bunt_prop_sync_door02a_l',
            objCoords = vector3(1445.83, -1482.56, 63.72)
        }
    }
},
["mar_main3"] = {
    group = "marabunta",
    objName = 'bunt_prop_sync_door03_l',

    objCoords  = vector3(1439.81, -1480.63, 63.7),
    textCoords = vector3(1439.81, -1480.63, 63.7),
    authorizedRoles = { 'marabunta' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},
["mar_hide"] = {
    group = "marabunta",
    objName = 'p_cut_door_01',

    objCoords  = vector3(1439.24, -1488.51, 66.6),
    textCoords = vector3(1439.24, -1488.51, 66.6),
    authorizedRoles = { 'marabunta' },
    locked = true,
    distance = 2,
    size = 1,
    openRatioThreshold = 1.0,
},

-- open interriors

["forum_drive"] = {
	group = "forum",
	objName = 'ball_prop_sync_door03g_r',
	objCoords  = vector3(105.94, -1964.09, 20.87),
	textCoords = vector3(105.64,-1964.42, 20.87),
	authorizedRoles = { 'ballas' },
	locked = true
},

["beatch"] = {
	group = "beatch",
	objName = 'v_ilev_trev_doorfront',
	objCoords  = vector3(-1150.14, -1521.53, 10.63),
	textCoords = vector3(-1150.14, -1521.53, 10.63),
	authorizedRoles = { 'house_beach' },
	locked = true
},

["vinewoodfrank"] = {
	group = "vinewoodfrank",
	objName = 'v_ilev_fh_frontdoor',
	objCoords  = vector3(8.12, 539.08, 176.03),
	textCoords = vector3(8.12, 539.08, 176.03),
	authorizedRoles = { 'house_franklin' },
	locked = true
},

["laslagoonas"] = {
	group = "laslagoonas",
	objName = 'v_ilev_janitor_frontdoor',
	objCoords  = vector3(-107.32, -8.37, 70.52),
	textCoords = vector3(-107.32, -8.37, 70.52),
	locked = true
},

["trevor"] = {
	group = "trevor",
	objName = 'v_ilev_trevtraildr',
	objCoords  = vector3(1973.32, 3815.76, 33.51),
	textCoords = vector3(1973.32, 3815.76, 33.51),
	authorizedRoles = { 'house_trevor' },
	locked = true
},

["lester"] = {
	group = "lester",
	objName = 'v_ilev_lester_doorfront',
	objCoords  = vector3(1274.33, -1720.43, 54.77),
	textCoords = vector3(1274.33, -1720.43, 54.77),
	authorizedRoles = { 'house_lester' },
	locked = true
},
--ДОМ МАЙКЛА
["mikle1"] = {
	group = "mikle",
	objName = 'v_ilev_mm_door',
	objCoords  = vector3(-806.82, 185.82, 72.48),
	textCoords = vector3(-806.82, 185.82, 72.48),
	authorizedRoles = { 'house_michael' },
	locked = true
},

["mikle2"] = {
	group = "mikle",
	textCoords = vector3(-816.39, 178.26, 72.23),
	authorizedRoles = { 'house_michael' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'v_ilev_mm_doorm_l',
			objCoords = vector3(-816.42, 178.74, 72.22)
		},

		{
			objName = 'v_ilev_mm_doorm_r',
			objCoords = vector3(-816.16, 177.6, 72.22)
		}
	}
},

["mikle3"] = {
	group = "mikle",
	textCoords = vector3(-795.35, 177.34, 72.84),
	authorizedRoles = { 'house_michael' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'prop_bh1_48_backdoor_r',
			objCoords = vector3(-794.62, 178.04, 72.83)
		},

		{
			objName = 'prop_bh1_48_backdoor_l',
			objCoords = vector3(-796.44, 177.27, 72.83)
		}
	}
},

["mikle4"] = {
	group = "mikle",
	textCoords = vector3(-793.65, 181.67, 72.84),
	authorizedRoles = { 'house_michael' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'prop_bh1_48_backdoor_r',
			objCoords = vector3(-794.12, 182.15, 72.83)
		},

		{
			objName = 'prop_bh1_48_backdoor_l',
			objCoords = vector3(-793.53, 180.7, 72.83)
		}
	}
},

["weazel"] = {
	group = "weazel",
	textCoords = vector3(-247.58, -2005.15, -24.69),
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'v_ilev_serv_door01',
			objCoords = vector3(-243.16, -2007.66, 24.69)
		},

		{
			objName = 'v_ilev_serv_door01',
			objCoords = vector3(-242.69, -2005.75, 24.69)
		}
	}
},

["druglabs"] = {
	group = "druglabs",
	textCoords = vector3(3005.0, 5994.0, 100.0),
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'prop_door_01',
			objCoords = vector3(3005.0, 5994.0, 101.0)
		},
		{
			objName = 'prop_door_01',
			objCoords = vector3(3005.0, 5994.0, 91.0)
		},
		{
			objName = 'prop_door_01',
			objCoords = vector3(3005.0, 5994.0, 81.0)
		},
		{
			objName = 'prop_door_01',
			objCoords = vector3(3005.0, 5994.0, 71.0)
		},
	}
},
-- Mercinaries
["main_merc_gar_1"] = {
    group = "mercinaries",
    objName = 'slth_warehouse_door02',

    objCoords  = vector3(935.78, -1489.67, 32.76),
    textCoords = vector3(935.78, -1489.67, 30.3),
    authorizedRoles = { 'mercinaries' },
    locked = true,
    distance = 8,
    size = 1,
    openRatioThreshold = 1.0,
},
["main_merc_gar_2"] = {
    group = "mercinaries",
    objName = 'slth_warehouse_door02',

    objCoords  = vector3(943.36, -1489.7, 33.3),
    textCoords = vector3(943.36, -1489.7, 30.3),
    authorizedRoles = { 'mercinaries' },
    locked = true,
    distance = 8,
    size = 1,
    openRatioThreshold = 1.0,
},
["main_merc_door"] = {
	group = "mercinaries",
	objName = 'slth_warehouse_door',
	objCoords  = vector3(939.54, -1489.47, 30.22),
	textCoords = vector3(939.54, -1489.47, 30.22),
	authorizedRoles = { 'mercinaries' },
	locked = true
},

-- BurgerShot
["burger_shot_back"] = {
	group = "burger_shot",
	objName = 'p_bs_map_door_01_s',
	objCoords  = vector3(-1179.0, -892.02, 13.97),
	textCoords = vector3(-1179.0, -892.02, 13.97),
	authorizedRoles = { 'burgershot' },
	locked = true
},
["burger_shot_main1"] = {
	group = "burger_shot",
	textCoords = vector3(-1183.97, -884.65, 14.0),
    authorizedRoles = { 'burgershot' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'bs_cj_bs_door_l',
			objCoords = vector3(-1183.13, -885.7, 14.0)
		},

		{
			objName = 'bs_cj_bs_door_r',
			objCoords = vector3(-1184.59, -883.64, 14.0)
		}
	}
},
["burger_shot_main2"] = {
	group = "weazel",
	textCoords = vector3(-1197.82, -884.3, 14.0),
    authorizedRoles = { 'burgershot' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'bs_cj_bs_door_l',
			objCoords = vector3(-1196.78, -883.45, 14.0)
		},

		{
			objName = 'bs_cj_bs_door_r',
			objCoords = vector3(-1198.65, -884.87, 14.0)
		}
	}
},

-- CARSHOP
["carshop_main1"] = {
	group = "carshop",
	textCoords = vector3(-777.18, -243.75, 37.16),
    authorizedRoles = { 'carshop' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'leb_carshop_glassdoor01',
			objCoords = vector3(-777.72, -243.88, 37.16)
		},

		{
			objName = 'leb_carshop_glassdoor01',
			objCoords = vector3(-776.57, -243.67, 37.13)
		}
	}
},
["carshop_main2"] = {
	group = "carshop",
	textCoords = vector3(-802.59, -223.65, 37.25),
    authorizedRoles = { 'carshop' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'v_ilev_ch_glassdoor',
			objCoords = vector3(-802.01, -223.98, 37.25)
		},

		{
			objName = 'v_ilev_ch_glassdoor',
			objCoords = vector3(-802.92, -222.79, 37.25)
		}
	}
},
["carshop_stuff1"] = {
	group = "carshop",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-782.81, -224.03, 37.25),
	textCoords = vector3(-782.81, -224.03, 37.25),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_stuff2"] = {
	group = "carshop",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-791.68, -222.47, 37.25),
	textCoords = vector3(-791.68, -222.47, 37.25),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_stuff3"] = {
	group = "carshop",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-796.19, -216.85, 37.25),
	textCoords = vector3(-796.19, -216.85, 37.25),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_stuff4"] = {
	group = "carshop",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-797.6, -212.16, 37.25),
	textCoords = vector3(-797.6, -212.16, 37.25),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_boss"] = {
	group = "carshop",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-791.66, -217.15, 37.25),
	textCoords = vector3(-791.66, -217.15, 37.25),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_backdoor1"] = {
	group = "carshop",
	objName = 'leb_carshop_metaldoor01',
	objCoords  = vector3(-770.2, -224.0, 37.47),
	textCoords = vector3(-770.2, -224.0, 37.47),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_backdoor2"] = {
	group = "carshop",
	objName = 'leb_carshop_metaldoor01',
	objCoords  = vector3(-780.92, -205.54, 37.47),
	textCoords = vector3(-780.92, -205.54, 37.47),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_backdoor3"] = {
	group = "carshop",
	objName = 'leb_carshop_metaldoor01',
	objCoords  = vector3(-795.2, -198.42, 37.29),
	textCoords = vector3(-795.2, -198.42, 37.29),
	authorizedRoles = { 'carshop' },
	locked = true
},
["carshop_back_garage"] = {
    group = "carshop",
    objName = 'leb_carshop_garage_door02',

    objCoords  = vector3(-793.58, -201.44, 39.19),
    textCoords = vector3(-793.58, -201.44, 37.86),
    authorizedRoles = { 'carshop' },
    locked = true,
    distance = 3,
    size = 1,
    openRatioThreshold = 1.0,
},
["carshop_front_garage1"] = {
    group = "carshop",
    objName = 'leb_carshop_garage_door01',

    objCoords  = vector3(-765.53, -237.91, 38.68),
    textCoords = vector3(-765.53, -237.91, 37.67),
    authorizedRoles = { 'carshop' },
    locked = true,
    distance = 3,
    size = 1,
    openRatioThreshold = 1.0,
},
["carshop_front_garage2"] = {
    group = "carshop",
    objName = 'leb_carshop_garage_door01',

    objCoords  = vector3(-770.5, -239.86, 38.68),
    textCoords = vector3(-770.5, -239.86, 37.67),
    authorizedRoles = { 'carshop' },
    locked = true,
    distance = 3,
    size = 1,
    openRatioThreshold = 1.0,
},
["carshop_hall_garage"] = {
    group = "carshop",
    objName = 'leb_carshop_glassgarage_door01',

    objCoords  = vector3(-779.78, -229.48, 38.64),
    textCoords = vector3(-781.42, -226.61, 37.30),
    authorizedRoles = { 'carshop' },
    locked = true,
    distance = 3,
    size = 1,
    openRatioThreshold = 1.0,
},
--==============================[МОТЕЛИ]==============================
--АЛЬТЬ СТРИТ
["alta_st1"] = {
	group = "altast1",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(311.25, -218.63, 54.23),
	textCoords = vector3(311.25, -218.63, 54.23),
	authorizedRoles = { 'altast1' },
	locked = true
},
["alta_st2"] = {
	group = "altast2",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(307.19, -212.85, 54.23),
	textCoords = vector3(307.19, -212.85, 54.23),
	authorizedRoles = { 'altast2' },
	locked = true
},
["alta_st3"] = {
	group = "altast3",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(311.19, -202.67, 54.23),
	textCoords = vector3(311.19, -202.67, 54.23),
	authorizedRoles = { 'altast3' },
	locked = true
},
["alta_st4"] = {
	group = "altast4",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(317.2, -194.96, 54.23),
	textCoords = vector3(317.2, -194.96, 54.23),
	authorizedRoles = { 'altast4' },
	locked = true
},
["alta_st5"] = {
	group = "altast5",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(311.25, -218.63, 58.02),
	textCoords = vector3(311.25, -218.63, 58.02),
	authorizedRoles = { 'altast5' },
	locked = true
},
["alta_st6"] = {
	group = "altast6",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(307.19, -212.85, 58.02),
	textCoords = vector3(307.19, -212.85, 58.02),
	authorizedRoles = { 'altast6' },
	locked = true
},
["alta_st7"] = {
	group = "altast7",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(311.19, -202.67, 58.02),
	textCoords = vector3(311.19, -202.67, 58.02),
	authorizedRoles = { 'altast7' },
	locked = true
},
["alta_st8"] = {
	group = "altast8",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(317.2, -194.96, 58.02),
	textCoords = vector3(317.2, -194.96, 58.02),
	authorizedRoles = { 'altast8' },
	locked = true
},
["alta_st9"] = {
	group = "altast9",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(335.07, -227.85, 54.23),
	textCoords = vector3(335.07, -227.85, 54.23),
	authorizedRoles = { 'altast9' },
	locked = true
},
["alta_st10"] = {
	group = "altast10",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(339.1, -220.73, 54.23),
	textCoords = vector3(339.1, -220.73, 54.23),
	authorizedRoles = { 'altast10' },
	locked = true
},
["alta_st11"] = {
	group = "altast11",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(343.1, -210.35, 54.23),
	textCoords = vector3(343.1, -210.35, 54.23),
	authorizedRoles = { 'altast11' },
	locked = true
},
["alta_st12"] = {
	group = "altast12",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(347.06, -200.29, 54.23),
	textCoords = vector3(347.06, -200.29, 54.23),
	authorizedRoles = { 'altast12' },
	locked = true
},
["alta_st13"] = {
	group = "altast13",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(335.07, -227.85, 58.02),
	textCoords = vector3(335.07, -227.85, 58.02),
	authorizedRoles = { 'altast13' },
	locked = true
},
["alta_st14"] = {
	group = "altast14",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(339.1, -220.73, 58.02),
	textCoords = vector3(339.1, -220.73, 58.02),
	authorizedRoles = { 'altast14' },
	locked = true
},
["alta_st15"] = {
	group = "altast15",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(343.1, -210.35, 58.02),
	textCoords = vector3(343.1, -210.35, 58.02),
	authorizedRoles = { 'altast15' },
	locked = true
},
["alta_st16"] = {
	group = "altast16",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(347.06, -200.29, 58.02),
	textCoords = vector3(347.06, -200.29, 58.02),
	authorizedRoles = { 'altast16' },
	locked = true
},
--ЭЛЬ РАНЧО
["rancho_st1"] = {
	group = "ranchost1",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(548.68, -1777.91, 29.3),
	textCoords = vector3(548.68, -1777.91, 29.3),
	authorizedRoles = { 'ranchost1' },
	locked = true,
    distance = 1,
},
["rancho_st2"] = {
	group = "ranchost2",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(551.83, -1771.26, 29.3),
	textCoords = vector3(551.83, -1771.26, 29.3),
	authorizedRoles = { 'ranchost2' },
	locked = true,
    distance = 1,
},
["rancho_st3"] = {
	group = "ranchost3",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(554.98, -1764.65, 29.3),
	textCoords = vector3(554.98, -1764.65, 29.3),
	authorizedRoles = { 'ranchost3' },
	locked = true,
    distance = 1,
},
["rancho_st4"] = {
	group = "ranchost4",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(558.04, -1758.04, 29.3),
	textCoords = vector3(558.04, -1758.04, 29.3),
	authorizedRoles = { 'ranchost4' },
	locked = true,
    distance = 1,
},
["rancho_st5"] = {
	group = "ranchost5",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(561.09, -1751.47, 29.3),
	textCoords = vector3(561.09, -1751.47, 29.3),
	authorizedRoles = { 'ranchost5' },
	locked = true,
    distance = 1,
},
["rancho_st6"] = {
	group = "ranchost6",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(558.74, -1777.55, 33.44),
	textCoords = vector3(558.74, -1777.55, 33.44),
	authorizedRoles = { 'ranchost6' },
	locked = true,
    distance = 1,
},
["rancho_st7"] = {
	group = "ranchost7",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(552.12, -1774.54, 33.44),
	textCoords = vector3(552.12, -1774.54, 33.44),
	authorizedRoles = { 'ranchost7' },
	locked = true,
    distance = 1,
},
["rancho_st8"] = {
	group = "ranchost8",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(549.76, -1770.19, 33.44),
	textCoords = vector3(549.76, -1770.19, 33.44),
	authorizedRoles = { 'ranchost8' },
	locked = true,
    distance = 1,
},
["rancho_st9"] = {
	group = "ranchost9",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(552.88, -1763.61, 33.44),
	textCoords = vector3(552.88, -1763.61, 33.44),
	authorizedRoles = { 'ranchost9' },
	locked = true,
    distance = 1,
},
["rancho_st10"] = {
	group = "ranchost10",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(555.98, -1756.97, 33.44),
	textCoords = vector3(555.98, -1756.97, 33.44),
	authorizedRoles = { 'ranchost10' },
	locked = true,
    distance = 1,
},
["rancho_st11"] = {
	group = "ranchost11",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(559.12, -1750.36, 33.44),
	textCoords = vector3(559.12, -1750.36, 33.44),
	authorizedRoles = { 'ranchost11' },
	locked = true,
    distance = 1,
},
["rancho_st12"] = {
	group = "ranchost12",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(562.27, -1746.87, 33.44),
	textCoords = vector3(562.27, -1746.87, 33.44),
	authorizedRoles = { 'ranchost12' },
	locked = true,
    distance = 1,
},
-- КЛИНТОН АВЕНЮ
["klinton_1"] = {
	group = "klinton1",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(488.94, 200.15, 104.75),
	textCoords = vector3(488.94, 200.15, 104.75),
	authorizedRoles = { 'klinton1' },
	locked = true,
    distance = 1,
},
["klinton_2"] = {
	group = "klinton2",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(481.6, 205.96, 104.75),
	textCoords = vector3(481.6, 205.96, 104.75),
	authorizedRoles = { 'klinton2' },
	locked = true,
    distance = 1,
},
["klinton_3"] = {
	group = "klinton3",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(486.96, 220.65, 104.75),
	textCoords = vector3(486.96, 220.65, 104.75),
	authorizedRoles = { 'klinton3' },
	locked = true,
    distance = 1,
},
["klinton_4"] = {
	group = "klinton4",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(491.2, 232.33, 104.75),
	textCoords = vector3(491.2, 232.33, 104.75),
	authorizedRoles = { 'klinton4' },
	locked = true,
    distance = 1,
},
["klinton_5"] = {
	group = "klinton5",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(502.57, 235.77, 104.75),
	textCoords = vector3(502.57, 235.77, 104.75),
	authorizedRoles = { 'klinton5' },
	locked = true,
    distance = 1,
},
["klinton_6"] = {
	group = "klinton6",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(520.69, 229.19, 104.75),
	textCoords = vector3(520.69, 229.19, 104.75),
	authorizedRoles = { 'klinton6' },
	locked = true,
    distance = 1,
},
["klinton_7"] = {
	group = "klinton7",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(529.98, 216.46, 104.75),
	textCoords = vector3(529.98, 216.46, 104.75),
	authorizedRoles = { 'klinton7' },
	locked = true,
    distance = 1,
},
["klinton_8"] = {
	group = "klinton8",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(523.65, 199.23, 104.75),
	textCoords = vector3(523.65, 199.23, 104.75),
	authorizedRoles = { 'klinton8' },
	locked = true,
    distance = 1,
},
["klinton_9"] = {
	group = "klinton9",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(513.14, 191.22, 104.75),
	textCoords = vector3(513.14, 191.22, 104.75),
	authorizedRoles = { 'klinton9' },
	locked = true,
    distance = 1,
},
["klinton_10"] = {
	group = "klinton10",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(488.94, 200.15, 108.31),
	textCoords = vector3(488.94, 200.15, 108.31),
	authorizedRoles = { 'klinton10' },
	locked = true,
    distance = 1,
},
["klinton_11"] = {
	group = "klinton11",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(481.6, 205.96, 108.31),
	textCoords = vector3(481.6, 205.96, 108.31),
	authorizedRoles = { 'klinton11' },
	locked = true,
    distance = 1,
},
["klinton_12"] = {
	group = "klinton12",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(486.96, 220.65, 108.31),
	textCoords = vector3(486.96, 220.65, 108.31),
	authorizedRoles = { 'klinton12' },
	locked = true,
    distance = 1,
},
["klinton_13"] = {
	group = "klinton13",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(491.2, 232.33, 108.31),
	textCoords = vector3(491.2, 232.33, 108.31),
	authorizedRoles = { 'klinton13' },
	locked = true,
    distance = 1,
},
["klinton_14"] = {
	group = "klinton14",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(497.52, 237.52, 108.31),
	textCoords = vector3(497.52, 237.52, 108.31),
	authorizedRoles = { 'klinton14' },
	locked = true,
    distance = 1,
},
["klinton_15"] = {
	group = "klinton15",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(509.32, 233.3, 108.31),
	textCoords = vector3(509.32, 233.3, 108.31),
	authorizedRoles = { 'klinton15' },
	locked = true,
    distance = 1,
},
["klinton_16"] = {
	group = "klinton16",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(521.32, 228.94, 108.31),
	textCoords = vector3(521.32, 228.94, 108.31),
	authorizedRoles = { 'klinton16' },
	locked = true,
    distance = 1,
},
["klinton_17"] = {
	group = "klinton17",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(532.02, 222.31, 108.31),
	textCoords = vector3(532.02, 222.31, 108.31),
	authorizedRoles = { 'klinton17' },
	locked = true,
    distance = 1,
},
["klinton_18"] = {
	group = "klinton18",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(527.73, 210.7, 108.31),
	textCoords = vector3(527.73, 210.7, 108.31),
	authorizedRoles = { 'klinton18' },
	locked = true,
    distance = 1,
},
["klinton_19"] = {
	group = "klinton19",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(523.37, 198.81, 108.31),
	textCoords = vector3(523.37, 198.81, 108.31),
	authorizedRoles = { 'klinton19' },
	locked = true,
    distance = 1,
},
["klinton_20"] = {
	group = "klinton20",
	objName = 'v_ilev_fa_frontdoor',
	objCoords  = vector3(513.06, 191.18, 108.31),
	textCoords = vector3(513.06, 191.18, 108.31),
	authorizedRoles = { 'klinton20' },
	locked = true,
    distance = 1,
},
-- NIGHTCLUB
["nightclub_main"] = {
	group = "nightclub",
	textCoords = vector3(-1203.09, -1329.14, 1.05),
    authorizedRoles = { 'nightclub' },
	locked = true,
	distance = 2,
	doors = {
		{
			objName = 'leb_prop_door_nightclub_l',
			objCoords = vector3(-1203.46, -1328.1, 1.05)
		},

		{
			objName = 'leb_prop_door_nightclub_r',
			objCoords = vector3(-1202.65, -1330.2, 1.05)
		}
	}
},
["nightclub_stuff1"] = {
	group = "nightclub",
	objName = 'ba_prop_door_club_edgy_generic',
	objCoords  = vector3(-1203.68, -1283.88, -4.77),
	textCoords = vector3(-1203.68, -1283.88, -4.77),
	authorizedRoles = { 'nightclub' },
	locked = true,
    distance = 1,
},
["nightclub_stuff2"] = {
	group = "nightclub",
	objName = 'ba_prop_door_club_edgy_generic',
	objCoords  = vector3(-1192.78, -1309.04, -1.77),
	textCoords = vector3(-1192.78, -1309.04, -1.77),
	authorizedRoles = { 'nightclub' },
	locked = true,
    distance = 1,
},
["nightclub_ofice_vip1"] = {
	group = "nightclub",
	objName = 'ba_prop_door_club_generic_vip',
	objCoords  = vector3(-1203.49, -1287.46, -0.97),
	textCoords = vector3(-1203.49, -1287.46, -0.97),
	authorizedRoles = { 'nightclub' },
	locked = true,
    distance = 1,
},
["nightclub_ofice_vip2"] = {
	group = "nightclub",
	objName = 'ba_prop_door_club_glass',
	objCoords  = vector3(-1218.38, -1278.54, -0.97),
	textCoords = vector3(-1218.38, -1278.54, -0.97),
	authorizedRoles = { 'nightclub' },
	locked = true,
    distance = 1,
},
["nightclub_ofice_vip3"] = {
	group = "nightclub",
	objName = 'ba_prop_door_club_glam_generic',
	objCoords  = vector3(-1220.83, -1280.35, -0.97),
	textCoords = vector3(-1220.83, -1280.35, -0.97),
	authorizedRoles = { 'nightclub' },
	locked = true,
    distance = 1,
},
	--
	-- Addons
	--

	--[[
	-- Entrance Gate (Mission Row mod) https://www.gta5-mods.com/maps/mission-row-pd-ymap-fivem-v1
	{
		objName = 'prop_gate_airport_01',
		objCoords  = vector3(420.1, -1017.3, 28.0),
		textCoords = vector3(420.1, -1021.0, 32.0),
		authorizedRoles = { 'police' },
		locked = true,
		distance = 14,
		size = 2
	}
	--]]
}
