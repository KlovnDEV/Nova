Config = {}

Config.Zones = {
	["ID Card Photo"] = {
		Position = vector3(597.56, 4.55, 87.82),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},

    ["Lobby Computer"] = {
		Position = vector3(631.64, -5.4, 81.96),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},
  ["Oficer Computer"] = {
		Position = vector3(617.32, -16.75, 89.99),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},
  ["Detective Computer"] = {
		Position = vector3(617.38, -22.32, 89.99),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},
  ["Cells Computer"] = {
		Position = vector3(575.15, 12.42, 83.62),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},
  ["Lab Computer"] = {
		Position = vector3(632.51, 10.73, 89.99),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},
    ["Arhive Computer"] = {
		Position = vector3(630.92, -14.31, 81.96),
		HomePage = "/police/search",
		Permissions = {
      police = {
        certificates = {
          edit = true,
        },

        persons = {},
      },
	},
	},

	["Police Chief Computer"] = {
		Position = vector3(447.9, -973.36, 30.69),
		HomePage = "/police/manage",
		Permissions = {
      police = {
        manage = {
          employees = {
            edit = true,
          },
          grades = {
            edit = true,
          },
        },

        cases = {
          edit = {
            archive = true,
          },
        },

        certificates = {
          edit = true,
        },

        persons = {
          edit = true,
          remove = true,
        },
      },
	},
},


	["Government Computer"] = {
		Position = vector3(408.61, -974.46, 29.42),
		HomePage = "/government",

Permissions = {

      ambulance = {
        manage = {
          leader = true,
          employees = {
            edit = false,
          },
          grades = {
            edit = false,
          },
        },
      },

      police = {
        manage = {
          leader = true,
          employees = {
            edit = false,
          },
          grades = {
            edit = false,
          },
        },
      },

      oil = {
        manage = {
          leader = true,
          employees = {
            edit = false,
          },
          grades = {
            edit = false,
          },
        },
      },

      government = {
        certificates = {
          edit = true,
        },

        manage = {
          leader = true,
          employees = {
            edit = true,
          },

          grades = {
            edit = true,
          },
        },
      },

},

	},

}
