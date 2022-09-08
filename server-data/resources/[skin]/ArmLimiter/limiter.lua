function Set (list)
  local set = {}
  for _, l in ipairs(list) do set[l] = true end
  return set
end

function getComponentTags(ped, cid, drawable, texture)

	local hash = GetHashNameForComponent(ped, cid, drawable, texture)
	local tags = {}

	for _,v in pairs(ALL_TAGS) do
		if DoesShopPedApparelHaveRestrictionTag(hash, GetHashKey(v)) then
			table.insert(tags, v)
		end
	end

	return tags
end

function getSex(ped)
	local model = GetEntityModel(ped)

	if model == `mp_m_freemode_01` then
		return "m"
	end

	if model == `mp_f_freemode_01` then
		return "f"
	end

	return nil
end

function getCompHash(ped, cid, draw, tex)
	local hash = GetHashNameForComponent(ped, cid, draw, tex)
	if hash == 0 then
		return draw
	end

	return hash
end

function limitPantsAndShoes(playerPed, sex)
	local pants1 = GetPedDrawableVariation(playerPed, 4)
	local pants2 = GetPedTextureVariation(playerPed, 4)
	local shoes1 = GetPedDrawableVariation(playerPed, 6)
	local shoes2 = GetPedTextureVariation(playerPed, 6)

	local pantsTags = getComponentTags(playerPed, 4, pants1, pants2)
	local shoesTags = getComponentTags(playerPed, 6, shoes1, shoes2)

	local pantsTagDict = Set(pantsTags)
	local shoesTagDict = Set(shoesTags)

	local pantsHash = getCompHash(playerPed, 4, pants1, pants2)
--	print('pants', json.encode(pantsTags), pantsHash)
--	print('shoes', json.encode(shoesTags))

	local needAltFeet

	if sex == 'f' then
		needAltFeet = NEED_ALT_FEET_FEMALE
		sexInt = 1
	else
		needAltFeet = NEED_ALT_FEET_MALE
	end

	if pantsTagDict['HAS_ALT_VERSION'] and not pantsTagDict['ALT_LEGS'] and (shoesTagDict['HAS_ALT_VERSION'] or shoesTagDict['COWBOY_BOOTS']) and not shoesTagDict['ALT_FEET'] then
		pants1 = pants1+1
		SetPedComponentVariation(playerPed, 4, pants1, pants2, 0)		
	end

--[[
	if not pantsTagDict['HAS_ALT_VERSION'] and shoesTagDict['HAS_ALT_VERSION'] and shoesTagDict['ALT_FEET'] then
		shoes1 = shoes1-1
		SetPedComponentVariation(playerPed, 6, shoes1, shoes2, 0)
	end
]]--
	if shoesTagDict['HAS_ALT_VERSION'] then
		if shoesTagDict['ALT_FEET'] and needAltFeet[pantsHash] ~= true then
			shoes1 = shoes1-1
			SetPedComponentVariation(playerPed, 6, shoes1, shoes2, 0)
		elseif not shoesTagDict['ALT_FEET'] and needAltFeet[pantsHash] == true then
			shoes1 = shoes1+1
			SetPedComponentVariation(playerPed, 6, shoes1, shoes2, 0)
		end
	end
end

function limitArms(playerPed, sex)
	local torso1 = GetPedDrawableVariation(playerPed, 11)
	local torso2 = GetPedTextureVariation(playerPed, 11)
	local tshirt1 = GetPedDrawableVariation(playerPed, 8)
	local tshirt2 = GetPedTextureVariation(playerPed, 8)

	local tshirtColorNum = GetNumberOfPedTextureVariations(playerPed, 8, tshirt1)
	local torsoColorNum = GetNumberOfPedTextureVariations(playerPed, 11, torso1)

	if tshirt2 >= tshirtColorNum then
		SetPedComponentVariation(playerPed, 8, tshirt1, 0, 0)
		tshirt2 = 0
	end

	if torso2 >= torsoColorNum then
		SetPedComponentVariation(playerPed, 8, torso1, 0, 0)
		torso2 = 0
	end

	local isFemale = sex == "f"
	local sexInt = 0

	local armsFallbackMale = {
		[0] = {"DRAW_0"},
		[1] = {"DRAW_0"},
		[2] = {"DRAW_11"},
		[3] = {"OPEN_JACKET"},
		[4] = {"OPEN_JACKET"},
		[5] = {"DRAW_5"},
		[6] = {"OPEN_JACKET"},
		[7] = {"OPEN_JACKET"},
		[8] = {"DRAW_8"},
		[9] = {"DRAW_0"},
		[10] = {"OPEN_JACKET"},
		[11] = {"DRAW_5"},
		[12] = {"DRAW_12"},
		[13] = {"DRAW_13"},
		[14] = {"DRAW_4"},
		[15] = {"DRAW_15"},
		[16] = {"DRAW_0"},
				}

	local armsFallbackFemale = {
		[0] = {"DRAW_0"},
		[1] = {"DRAW_1"},
		[2] = {"DRAW_2"},
		[3] = {"DRAW_3"},
		[4] = {"DRAW_5"},
		[5] = {"DRAW_5"},
		[6] = {"DRAW_6"},
		[7] = {"OPEN_JACKET"},
		[8] = {"DRAW_8"},
		[9] = {"DRAW_9"},
		[10] = {"DRAW_1"},
		[11] = {"DRAW_5"},
		[12] = {"DRAW_12"},
		[13] = {"DRAW_13"},
		[14] = {"DRAW_14"},
		[15] = {"DRAW_15"},
		[16] = {"DRAW_15"},
	}

	local torsoTags = getComponentTags(playerPed, 11, torso1, torso2)
	local tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)

	local tshirtHash = getCompHash(playerPed, 8, tshirt1, tshirt2)

--	print('tshirt', json.encode(tshirtTags), tshirtHash)

	if isFemale and armsFallbackFemale[torso1] ~= nil then
		for a,b in pairs(armsFallbackFemale[torso1]) do
			table.insert(torsoTags, b)
		end					
	end

	if not isFemale and armsFallbackMale[torso1] ~= nil then
		for a,b in pairs(armsFallbackMale[torso1]) do
			table.insert(torsoTags, b)
		end					
	end

	local torsoTagDict = Set(torsoTags)
	local tshirtTagDict = Set(tshirtTags)

	if not isFemale and torsoTagDict['HEIST_DRAW_7'] and tshirt1 == 15 then
		tshirt1 = 0
		tshirt2=  0
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
		tshirtTagDict = Set(tshirtTags)
	end

	if torsoTagDict['OPEN_JACKET'] and tshirtTagDict['ALT_SPECIAL'] then
		tshirt1 = tshirt1 - 1
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
		tshirtTagDict = Set(tshirtTags)
	end
--[[
	if not isFemale and torsoTagDict['JACKET'] and (

	tshirtTagDict['VEST_SHIRT'] 
	or tshirtTagDict['HEIST_GEAR']
	or tshirtTagDict['APART_DRAW_1']
	or tshirtTagDict['APART_DRAW_2']
	or tshirtTagDict['STUNT_DRAW_0']
	or tshirtTagDict['AIR_DRAW_0']
	or tshirtTagDict['ALT_SPECIAL_4']
	or tshirtTagDict['ALT_SPECIAL_5']
	or tshirtTagDict['ALT_SPECIAL_6']
	or tshirtTagDict['X17_DRAW_2']
	or tshirtTagDict['X17_DRAW_3']
	or tshirtTagDict['H3_DRAW_0']
	or tshirtTagDict['H3_DRAW_2']
	or tshirtTagDict['H3_DRAW_3']
	or tshirtTagDict['ARENA_DRAW_5']
	or tshirtTagDict['VWD_DRAW_1']
	or tshirtTagDict['ALT_VEST']
	or tshirtHash == 639825431
	or tshirtHash == -214764024
	or tshirtHash == -1457519396
	or tshirtHash == -323011037
	or tshirtHash == 54863373
	or (not tshirtTagDict['UNDER_JACKET'] and not tshirtTagDict['OVER_JACKET'])
	) then

		tshirt1 = 15
		tshirt2=  0
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
		tshirtTagDict = Set(tshirtTags)
	end
]]
	local tshirtTagAllow = {


		['DRAW_0'] = { "DRAW_4", "DRAW_6", "SMUG_DRAW_0", "HEIST_DRAW_9", "DRAW_10", "APART_DRAW_15", "APART_DRAW_24", "OPEN_SHORT", "LOW2_DRAW_3", "LOW2_DRAW_6", "BIKER_DRAW_13", "BIKER_DRAW_0", "BIKER_DRAW_2", "BIKER_DRAW_3", -622061415, 10, 7, 4, 3 },

		['DRAW_1'] = { "DRAW_4", "DRAW_6", "SMUG_DRAW_0", "HEIST_DRAW_9", "DRAW_10", "APART_DRAW_15", "APART_DRAW_24", "OPEN_SHORT", "LOW2_DRAW_3", "LOW2_DRAW_6", "BIKER_DRAW_13", "BIKER_DRAW_0", "BIKER_DRAW_2", "BIKER_DRAW_3", -622061415, 10, 7, 4, 3 },

		['STUNT_DRAW_1'] = { "DRAW_4", "SMUG_DRAW_0", "HEIST_DRAW_9", "DRAW_10", "APART_DRAW_15", "APART_DRAW_24", "OPEN_SHORT", "LOW2_DRAW_3", "LOW2_DRAW_6", "BIKER_DRAW_13", "BIKER_DRAW_0", "BIKER_DRAW_2", "BIKER_DRAW_3", -622061415, 10, 7, 4, 3 },


		[0] = { "HEIST_DRAW_9" },
		[6] = { "DRAW_11" },
		[7] = { "DRAW_11" },
		[1385848084] = { "DRAW_11" },

		[-768922553] = { "DRAW_4" },
		[738127742] = { "DRAW_4" },

		['TUX_SHIRT'] = { "DRAW_4", "APART_DRAW_15" },
		['TUX_VEST'] = { "DRAW_6", "TUX_JACKET", "APART_DRAW_15" },

		['STUNT_DRAW_2'] = { "DRAW_6","DRAW_11" },
		['APART_DRAW_2'] = { "DRAW_6", "DRAW_10","DRAW_11", "SMOKING_JACKET", "APART_DRAW_9", "LOW_DRAW_9", "APART_DRAW_21", "APART_DRAW_22", "LOW2_DRAW_0", "BIKER_DRAW_1", "BIKER_DRAW_2", "BIKER_DRAW_4", "BIKER_DRAW_5" },
		['APART_DRAW_3'] = { "DRAW_6","DRAW_11", "SMOKING_JACKET" },
		['DRAW_2'] = { "DRAW_2" },
		['DRAW_3'] = { "DRAW_3", "DRAW_4", "DRAW_6" },
--		['HEIST_DRAW_3'] = { "DRAW_11" },

		['HEIST_DRAW_7'] = {},
		['DRAW_4'] = { "DRAW_4", "DRAW_6", "DRAW_10", "HEIST_DRAW_9", "HEIST_DRAW_15", "HEIST_DRAW_16", "APART_DRAW_15", "APART_DRAW_24", "BIKER_DRAW_0", "BIKER_DRAW_1", "BIKER_DRAW_2", "BIKER_DRAW_3", "BIKER_DRAW_4", "BIKER_DRAW_13", "BIKER_DRAW_20", "LOW2_DRAW_6", "OPEN_SHORT" },

		['DRAW_5'] = { "DRAW_4", "DRAW_5", "HEIST_DRAW_9" },
		['HEIST_DRAW_5'] = { "DRAW_4", "DRAW_6", "TUX_JACKET", "APART_DRAW_15" },

		['DRAW_6'] = { "DRAW_6", "DRAW_11" },
		['ALT_SPECIAL_6'] = { "DRAW_6" },

		['DRAW_7'] = { "DRAW_7", "DRAW_11" },
		['DRAW_8'] = { "DRAW_8", "APART_DRAW_15" },
		['DRAW_9'] = { "DRAW_4", "DRAW_6", "DRAW_9", "APART_DRAW_15" },
		['DRAW_10'] = { "DRAW_10" },

		['HEIST_DRAW_9'] = { "DRAW_0", "DRAW_4", "DRAW_9" },

		['CUFFED_SHIRT'] = { "DRAW_6" },
		['VEST_SHIRT'] = { "DRAW_11", "HEIST_DRAW_16", "DRAW_6" },
		['DRAW_11'] = { "DRAW_11", "HEIST_DRAW_16", "DRAW_6", "BIKER_DRAW_4", "BIKER_DRAW_1" },

		['DRAW_12'] = { "DRAW_4", "DRAW_12", "TUX_JACKET" },
		['DRAW_13'] = { "DRAW_4", "DRAW_6", "DRAW_13", "APART_DRAW_15" },
		['DRAW_14'] = { "DRAW_6", "DRAW_14" },

		['DRAW_15'] = { "DRAW_4", "DRAW_6", "SMUG_DRAW_0", "HEIST_DRAW_9", "DRAW_10", "APART_DRAW_15", "APART_DRAW_24", "OPEN_SHORT", "LOW2_DRAW_3", "LOW2_DRAW_6", "BIKER_DRAW_13", "BIKER_DRAW_0", "BIKER_DRAW_2", "BIKER_DRAW_3", -622061415, 10, 7, 4, 3 },
	}

--[[
0,19,23,37,47,53,65,67,76,101,106,115,120,135,141,168,176	кривая без рукавов				DRAW_0, DRAW_15
1,16,38,79							длинный прямой					DRAW_1, STUNT_DRAW_1,
2,14,18,20,24,30,39,44,48,54,66,68,71,74,77,80,102,107,116,121,136,142,169,177	половина без рукавов		ALT_SPECIAL
3,4,13,25,26,27,31,32,45,46,51,52,69,75,90,96,146,148,150,159,160		худой с манжетой		DRAW_3, DRAW_4, DRAW_13
33,34														TUX_VEST
5,9,17,40,42,109,111				широкий прямой							DRAW_5, DRAW_6
6,7,22,49,50,93,144				Д-образная с рукавами						DRAW_11
8,41
10,11,60,94					полный без манжеты
12,29,43,64					очень длинный
15,55,56,57,58,59,61,62,97,122,123,124,125,126,127,128,129,130,131,145,151,152,153,154,155,156,163,164,170,171,172,178		special
21,28,95					полный с манжетой
35,36,147,149					худой фрак с манжетой и линией
63,91,92					очень длинный полный
70,73						М-образная длинные рукава
72,75						худой без манжеты
78,108,137,143					пустая без рукавов
113,118						пустая с короткими рукавами
81,82,87,98,103,132,138,165,173			кривая с рукавами
83,84,88,99,104,133,139,166,174			прямая пустая с рукавами
85,86,89,100,105,134,140,167,175		половина с рукавами
110						заправленный широкий
112,117						кривая с короткими рукавами
114,119						половина с короткими рукавами
157,158						Д-образная с длинными рукавами
161,162
]]

--[[
	if not isFemale and torsoTagDict['TUX_JACKET'] and not tshirtTagDict['TUX_SHIRT'] then
		tshirt1 = 31
		tshirt2=  0
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
	end

	if not isFemale and torsoTagDict['VEST'] and tshirt1 == 15 then
		tshirt1 = 24
		tshirt2=  0
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
	end
]]--
	local limitedArms 

	if isFemale then
		limitedArms = armLimiter_female(torsoTags, torsoTagDict, tshirtTags, tshirtTagDict, tshirt1) or 1
	else
		limitedArms = armLimiter_male(torsoTags, torsoTagDict, tshirtTags, tshirtTagDict, tshirtHash) or 1
	end

	local torsoHash = getCompHash(playerPed, 11, torso1, torso2)

--[[
	if not isFemale and tshirtTagAllow[tshirtHash] ~= nil then
		local res = false

		for k,v in pairs(tshirtTagAllow[tshirtHash]) do
			if torsoTagDict[v] or v == torsoHash then
				res = true
				break
			end
		end

		if res == false then
			DrawRect(1.0, 1.0, 0.1, 0.1, 255, 255, 0, 255)
		else
			DrawRect(1.0, 1.0, 0.1, 0.1, 0, 0, 255, 255)
		end

		if res == false then
			tshirt1 = 15
			tshirt2=  0
			SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
			tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
			tshirtTagDict = Set(tshirtTags)
		end
	end
]]--

	-- процессим ограничения футболок
	local limitTags = nil

	for k,v in pairs(tshirtTags) do
		if tshirtTagAllow[v] ~= nil then
			limitTags = Set(tshirtTagAllow[v])
			break
		end
	end

	local res = false
	if limitTags ~= nil then
		for k,v in pairs(torsoTags) do
			if limitTags[v] ~= nil then
				res = true
				break
			end
		end		
	end

	local id = tostring(sexInt).."/"..tostring(torsoHash).."/"..tostring(tshirtHash)
--	print(id)
	if torsoshirt[id] ~= nil then
		res = torsoshirt[id]
	end


	-- отключаем неподходящие футболки
	if res == false then
		DrawRect(1.0, 1.0, 0.1, 0.1, 255, 0, 0, 255)
	else
		DrawRect(1.0, 1.0, 0.1, 0.1, 0, 255, 0, 255)
	end

--[[
	if res == false then
		tshirt1 = 15
		tshirt2=  0
		SetPedComponentVariation(playerPed, 8, tshirt1, tshirt2, 0)
		tshirtTags = getComponentTags(playerPed, 8, tshirt1, tshirt2)
		tshirtTagDict = Set(tshirtTags)
	end
]]
	-- То, что не имеет тегов

	if ARM_COLLATION[torsoHash] ~= nil then
		limitedArms = ARM_COLLATION[torsoHash]
	end

--	print(torso1, json.encode(torsoTags), limitedArms, torsoHash)

	if limitedArms ~= nil then
		SetPedComponentVariation(playerPed, 3, limitedArms, 0, 0)
	end

end


function armLimiter_female(torsoTags, torsoTagDict, tshirtTags, tshirtTagDict, tshirt1)
	local armArr = {}
	for i = 0,167 do
		armArr[i] = true
	end

	tags = {
		["PILOT_SUIT"] = 3,
		["COMBAT_GEAR"] = 3,
		["SILK_PYJAMAS"] = 6,
		["VEST_SHIRT"] = 0,
		["OPEN_SHORT"] = 9,
--		["VEST"] = 0,
		["SWEAT_VEST"] = 4,
		["DRESS"] = 4,
		["HIPSTER_DRESS"] = 11,
		["MORPH_SUIT"] = 13,
		["CAT_SUIT"] = 7,

		["DRAW_0"] = 0, --
		["LOW_DRAW_0"] = 14,--
		["LOW2_DRAW_0"] = 11,--
		["BIKER_DRAW_0"] = 15,
		["STUNT_DRAW_0"] = 3,
		["AIR_DRAW_0"] = 0,
		["ARENA_DRAW_0"] = 14,--
		["HEIST_DRAW_0"] = 3, --
		             
		["DRAW_1"] = 5, --
		["LOW_DRAW_1"] = 4,--
		["LOW2_DRAW_1"] = 11,--
		["JAN_DRAW_1"] = 3,
		["BIKER_DRAW_1"] = 15,

		["DRAW_2"] = 2, --
		["BIKER_DRAW_2"] = 15,--
		["HEIST_DRAW_2"] = 14,--
		["LOW_DRAW_2"] = 1,--
		["GUN_DRAW_2"] = 14,
		["AIR_DRAW_2"] = 14,--
		["STUNT_DRAW_2"] = 4,--
		["SMUG_DRAW_2"] = 14,--
		["X17_DRAW_2"] = 3,--
		["LUXE2_DRAW_2"] = 1,--
		["LOW2_DRAW_2"] = 14,

		["DRAW_3"] = 3,--
		["BIKER_DRAW_3"] = 15,--
		["HEIST_DRAW_3"] = 14,--
		["LOW_DRAW_3"] = 14,--
		["LOW2_DRAW_3"] = 6,--
		["ARENA_DRAW_3"] = 14,
		["STUNT_DRAW_3"] = 14,
		["HEIST_DRAW_4"] = 3,--

		["DRAW_4"] = 4, --
		["LOW2_DRAW_4"] = 6,--
		["ARENA_DRAW_4"] = 6,
		["STUNT_DRAW_4"] = 6,
		["BIKER_DRAW_4"] = 6,--

		["DRAW_5"] = 4, --
		["BIKER_DRAW_5"] = 15,--
		["LOW2_DRAW_5"] = 3,--
		["STUNT_DRAW_5"] = 3,
		["APART_DRAW_5"] = 3,
		["HEIST_DRAW_5"] = 15,--
		["SMUG_DRAW_5"] = 11,--

		["DRAW_6"] = 5, --
		["H3_DRAW_6"] = 5,
		["SMUG_DRAW_6"] = 5,
		["X17_DRAW_6"] = 11,

		["DRAW_7"] = 6, --
		["STUNT_DRAW_7"] = 6,
		["HEIST_DRAW_7"] = 15, --
		["LOW_DRAW_7"] = 6,
		["LOW2_DRAW_7"] = 14,--
		["X17_DRAW_7"] = 6,

		["DRAW_8"] = 5, --
		["STUNT_DRAW_8"] = 5,
		["BIKER_DRAW_8"] = 5,
		["APART_DRAW_8"] = 4,
		["LOW2_DRAW_8"] = 14,--

		["DRAW_9"] = 9, --
		["LOW_DRAW_9"] = 6,
		["APART_DRAW_9"] = 6,--
		["H3_DRAW_9"] = 11,--

		["DRAW_10"] = 14,
		["HEIST_DRAW_10"] = 14,--
		["APART_DRAW_10"] = 5,--

		["DRAW_11"] = 4, --
		["HEIST_DRAW_11"] = 5,--
		["APART_DRAW_11"] = 5,--

		["DRAW_12"] = 12, --
		["ARENA_DRAW_12"] = 3,--
		["HEIST_DRAW_12"] = 5, --
		["APART_DRAW_12"] = 5,--

		["DRAW_13"] = 4, --
		["HEIST_DRAW_13"] = 3,--
		["BIKER_DRAW_13"] = 15,--
		["GUN_DRAW_13"] = 4,
		["APART_DRAW_13"] = 5,--

		["DRAW_14"] = 14,--
		["GUN_DRAW_14"] = 14,
		["HEIST_DRAW_14"] = 3,--

		["DRAW_15"] = 15, --
		["HEIST_DRAW_15"] = 3,--
		["APART_DRAW_15"] = 5,--
		["GUN_DRAW_15"] = 1,

		["HEIST_DRAW_16"] = 9,--
		["GUN_DRAW_16"] = 11,

		["BIKER_DRAW_17"] = 15,--
		["HEIST_DRAW_17"] = 9,--
		["ARENA_DRAW_17"] = 4,--

		["APART_DRAW_18"] = 15,--
		["GUN_DRAW_18"] = 1,

		["GUN_DRAW_19"] = 15,--
		["BIKER_DRAW_19"] = 15,--

		["APART_DRAW_20"] = 3,--
		["BIKER_DRAW_20"] = 15,

		["APART_DRAW_21"] = 3,--
		["GUN_DRAW_21"] = 3,--

		["GUN_DRAW_22"] = 14,--
		["APART_DRAW_22"] = 6,

		["GUN_DRAW_23"] = 11,--
		["APART_DRAW_23"] = 4,

		["APART_DRAW_24"] = 6,--

		["BIKER_DRAW_25"] = 11,--
	}

	local arm = nil

	for k,v in pairs(torsoTags) do
		if tags[v] then
			arm = tags[v]
		end
	end

--	if arm ~= 5 and arm ~= 15 and (torsoTagDict["OPEN_JACKET"] or torsoTagDict["SMOKING_JACKET"]) then
--		arm = 6
--	end

	if arm == nil and torsoTagDict["CLOSED_JACKET"] and torsoTagDict["LONG_SLEEVE"] then
		arm = 5
	end

	if tshirtTagDict["HEIST_DRAW_5"] or tshirtTagDict["LUXE_DRAW_5"] or tshirtTagDict["BIKER_DRAW_12"] 
		or tshirtTagDict["LOW2_DRAW_2"] or tshirtTagDict["LOW2_DRAW_0"] or tshirtTagDict["LOW_DRAW_0"]
		or tshirtTagDict["BIKER_DRAW_9"] or tshirtTagDict["HEIST_DRAW_6"] or tshirtTagDict["BIKER_DRAW_6"]
		or tshirtTagDict["APART_DRAW_3"] or tshirtTagDict["LOW2_DRAW_5"] or tshirtTagDict["APART_DRAW_0"]
		or tshirtTagDict["LOW_DRAW_6"] or tshirtTagDict["LOW_DRAW_4"] or tshirtTagDict["LOW_DRAW_2"]
		or tshirtTagDict["LUXE_DRAW_7"] or tshirtTagDict["HEIST_DRAW_9"] or tshirtTagDict["HEIST_DRAW_8"] or tshirtTagDict["HEIST_DRAW_7"]
	then

		if arm == 6 then
			arm = 3
		end

		if arm == 5 then
			arm = 3
		end

		if arm == 15 then
			arm = 2
		end
	end


	return arm
end

function armLimiter_male(torsoTags, torsoTagDict, tshirtTags, tshirtTagDict, tshirtHash)
	local armArr = {}
	for i = 0,167 do
		armArr[i] = true
	end

	tags = {
		["PILOT_SUIT"] = 4,
		["SILK_PYJAMAS"] = 6,
		["OPEN_SHORT"] = 11,

		["DRAW_0"] = 0,
		["LOW_DRAW_0"] = 0,
		["LOW2_DRAW_0"] = 0,
		["ASSAULT_DRAW_0"] = 4,
		["BIKER_DRAW_0"] = 15,
		["STUNT_DRAW_0"] = 4,
		["AIR_DRAW_0"] = 4,
		["ARENA_DRAW_0"] = 4,
		["HEIST_DRAW_0"] = 4,

		["DRAW_1"] = 0,
		["LOW_DRAW_1"] = 0,
		["JAN_DRAW_1"] = 1,
		["BIKER_DRAW_1"] = 15,

		["DRAW_2"] = 2,
		["BIKER_DRAW_2"] = 15,--0
		["HEIST_DRAW_2"] = 0,
		["LOW_DRAW_2"] = 0,
		["GUN_DRAW_2"] = 0,
		["STUNT_DRAW_2"] = 14,
		["SMUG_DRAW_2"] = 11,
		["X17_DRAW_2"] = 11,
		["LUXE2_DRAW_2"] = 11,
		["LOW2_DRAW_2"] = 11,

		["DRAW_3"] = 0,
		["BIKER_DRAW_3"] = 15,--0
		["HEIST_DRAW_3"] = 0,
		["LOW_DRAW_3"] = 0,
		["ARENA_DRAW_3"] = 0,
		["STUNT_DRAW_3"] = 4,
		["HEIST_DRAW_4"] = 4,

		["DRAW_4"] = 4,
		["LOW2_DRAW_4"] = 4,
		["ARENA_DRAW_4"] = 4,
		["STUNT_DRAW_4"] = 4,
		["BIKER_DRAW_4"] = 6,

		["DRAW_5"] = 5,
		["BIKER_DRAW_5"] = 5,--15
		["LOW2_DRAW_5"] = 4,
		["STUNT_DRAW_5"] = 4,
		["APART_DRAW_5"] = 1,

		["DRAW_6"] = 14,
		["H3_DRAW_6"] = 14,
		["SMUG_DRAW_6"] = 5,

		["DRAW_7"] = 14,
		["STUNT_DRAW_7"] = 14,
		["HEIST_DRAW_7"] = 8,
		["LOW_DRAW_7"] = 1,
		["X17_DRAW_7"] = 1,

		["DRAW_8"] = 8,
		["STUNT_DRAW_8"] = 14,
		["BIKER_DRAW_8"] = 8,

		["DRAW_9"] = 0,
		["LOW_DRAW_9"] = 6,

		["DRAW_10"] = 14,
		["HEIST_DRAW_10"] = 0,

		["DRAW_11"] = 15,

		["DRAW_12"] = 12,
		["ARENA_DRAW_12"] = 12,
		["HEIST_DRAW_12"] = 12,

		["DRAW_13"] = 11,
		["HEIST_DRAW_13"] = 15,--11
		["BIKER_DRAW_13"] = 15,
		["GUN_DRAW_13"] = 2,
		["HEIST_DRAW_13"] = 4,

		["HEIST_DRAW_14"] = 12,
		["GUN_DRAW_14"] = 1,

		["DRAW_15"] = 15,
		["HEIST_DRAW_15"] = 14,
		["APART_DRAW_15"] = 14,
		["GUN_DRAW_15"] = 1,

		["HEIST_DRAW_16"] = 14,
		["GUN_DRAW_16"] = 11,
		["IE_DRAW_16"] = 15,

		["ARENA_DRAW_17"] = 15,

		["APART_DRAW_18"] = 5,
		["GUN_DRAW_18"] = 1,

		["IE_DRAW_19"] = 15,

		["APART_DRAW_20"] = 4,
		["BIKER_DRAW_20"] = 15,

		["APART_DRAW_21"] = 14,

		["APART_DRAW_22"] = 6,

		["DRAW_81"] = 8,
	}

	local arm = nil

	for k,v in pairs(torsoTags) do
		if tags[v] then
			arm = tags[v]
		end
	end

	if (torsoTagDict["MORPH_SUIT"]) then
		arm = 3
	end


	if torsoTagDict["TUX_JACKET"] then
		arm = 6
	end

	if arm ~= 15 and arm ~= 11 and (torsoTagDict["OPEN_JACKET"]  or torsoTagDict["SMOKING_JACKET"] or torsoTagDict["SILK_ROBE"]) then
		arm = 14
	end


	if arm == 14 and tshirtHash ~= 15 then
		arm = 6
	end

	if arm == 15 and tshirtHash ~= 15 then
		arm = 5
	end


	if torsoTagDict["TUX_JACKET"] and torsoTagDict["OPEN_JACKET"] then
		arm = 6
	end

	-- под жилетом
	if torsoTagDict['DRAW_11'] then

		-- безрукавка
--		if tshirtTagDict['APART_DRAW_2'] then
--			arm = 5
--		end

		if tshirtHash == 1385848084 or tshirtHash == 6 or tshirtHash == 7 then
			arm = 11
		end

		-- закатанный рукав
		if tshirtTagDict['DRAW_7'] then

			if tshirtTagDict['LONG_SLEEVE'] then
				arm = 1
			else
				arm = 11
			end
		-- длинный рукав, либо закатанный рукав
		elseif tshirtTagDict['VEST_SHIRT'] or tshirtTagDict['LONG_SLEEVE']  or tshirtTagDict['DRAW_6'] then
			if tshirtTagDict['ALT_SPECIAL'] then
				arm = 11
			else
				arm = 1
			end
		end
	end

	return arm
end
