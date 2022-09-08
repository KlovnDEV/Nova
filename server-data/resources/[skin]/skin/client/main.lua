ESX = nil
local lastSkin, playerLoaded
local firstSpawn = true

Citizen.CreateThread(function()
	while ESX == nil do
		TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
		Citizen.Wait(0)
	end
end)

local Components = {
	{label = _U('sex'),					name = 'sex',				value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('face'),					name = 'face',				value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('face_2'),					name = 'face_2',			value = -1,		min = -1,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('face_blend'),				name = 'face_blend',			value = 5,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('skin'),					name = 'skin',				value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('hair_1'),					name = 'hair_1',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('hair_2'),					name = 'hair_2',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('hair_color_1'),				name = 'hair_color_1',		value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('hair_color_2'),				name = 'hair_color_2',		value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('tshirt_1'),				name = 'tshirt_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('tshirt_2'),				name = 'tshirt_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'tshirt_1'},
	{label = _U('torso_1'),					name = 'torso_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('torso_2'),					name = 'torso_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'torso_1'},
	{label = _U('decals_1'),				name = 'decals_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('decals_2'),				name = 'decals_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'decals_1'},
	{label = _U('arms'),					name = 'arms',				value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('arms_2'),					name = 'arms_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('pants_1'),					name = 'pants_1',			value = 0,		min = 0,	zoomOffset = 0.8,		camOffset = -0.5, clothes = 1},
	{label = _U('pants_2'),					name = 'pants_2',			value = 0,		min = 0,	zoomOffset = 0.8,		camOffset = -0.5, clothes = 1,	textureof	= 'pants_1'},
	{label = _U('shoes_1'),					name = 'shoes_1',			value = 0,		min = 0,	zoomOffset = 0.8,		camOffset = -0.8, clothes = 1},
	{label = _U('shoes_2'),					name = 'shoes_2',			value = 0,		min = 0,	zoomOffset = 0.8,		camOffset = -0.8, clothes = 1,	textureof	= 'shoes_1'},
	{label = _U('mask_1'),					name = 'mask_1',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1},
	{label = _U('mask_2'),					name = 'mask_2',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1,	textureof	= 'mask_1'},
	{label = _U('bproof_1'),				name = 'bproof_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('bproof_2'),				name = 'bproof_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'bproof_1'},
	{label = _U('chain_1'),					name = 'chain_1',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1},
	{label = _U('chain_2'),					name = 'chain_2',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1,	textureof	= 'chain_1'},
	{label = _U('helmet_1'),				name = 'helmet_1',			value = -1,		min = -1,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1,	componentId	= 0 },
	{label = _U('helmet_2'),				name = 'helmet_2',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1,	textureof	= 'helmet_1'},
	{label = _U('glasses_1'),				name = 'glasses_1',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1},
	{label = _U('glasses_2'),				name = 'glasses_2',			value = 0,		min = 0,	zoomOffset = 0.6,		camOffset = 0.65, clothes = 1,	textureof	= 'glasses_1'},
	{label = _U('watches_1'),				name = 'watches_1',			value = -1,		min = -1,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('watches_2'),				name = 'watches_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'watches_1'},
	{label = _U('bracelets_1'),				name = 'bracelets_1',		value = -1,		min = -1,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('bracelets_2'),				name = 'bracelets_2',		value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'bracelets_1'},
	{label = _U('bag'),						name = 'bags_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1},
	{label = _U('bag_color'),				name = 'bags_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15, clothes = 1,	textureof	= 'bags_1'},
	{label = _U('eye_color'),				name = 'eye_color',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('eyebrow_size'),			name = 'eyebrows_2',		value = 10,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('eyebrow_type'),			name = 'eyebrows_1',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('eyebrow_color_1'),			name = 'eyebrows_3',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('eyebrow_color_2'),			name = 'eyebrows_4',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('makeup_type'),				name = 'makeup_1',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('makeup_thickness'),		name = 'makeup_2',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('makeup_color_1'),			name = 'makeup_3',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('makeup_color_2'),			name = 'makeup_4',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('lipstick_type'),			name = 'lipstick_1',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('lipstick_thickness'),		name = 'lipstick_2',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('lipstick_color_1'),		name = 'lipstick_3',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('lipstick_color_2'),		name = 'lipstick_4',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('ear_accessories'),			name = 'ears_1',			value = -1,		min = -1,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('ear_accessories_color'),	name = 'ears_2',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65,	textureof	= 'ears_1'},
	{label = _U('chest_hair'),				name = 'chest_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15},
	{label = _U('chest_hair_1'),			name = 'chest_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15},
	{label = _U('chest_color'),				name = 'chest_3',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15},
	{label = _U('bodyb'),					name = 'bodyb_1',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15},
	{label = _U('bodyb_size'),				name = 'bodyb_2',			value = 0,		min = 0,	zoomOffset = 0.75,		camOffset = 0.15},
	{label = _U('acne_1'),				name = 'acne_1',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('acne_2'),				name = 'acne_2',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('wrinkles'),				name = 'age_1',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('wrinkle_thickness'),		name = 'age_2',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('blemishes'),				name = 'blemishes_1',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('blemishes_size'),			name = 'blemishes_2',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('blush'),					name = 'blush_1',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('blush_1'),					name = 'blush_2',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('blush_color'),				name = 'blush_3',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('complexion'),				name = 'complexion_1',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('complexion_1'),			name = 'complexion_2',		value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('sun'),						name = 'sun_1',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('sun_1'),					name = 'sun_2',				value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('freckles'),				name = 'moles_1',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('freckles_1'),				name = 'moles_2',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('beard_type'),				name = 'beard_1',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('beard_size'),				name = 'beard_2',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('beard_color_1'),			name = 'beard_3',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('beard_color_2'),			name = 'beard_4',			value = 0,		min = 0,	zoomOffset = 0.4,		camOffset = 0.65},
	{label = _U('nose_width'),			name = 'nose_width',			value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('nose_peak_height'),		name = 'nose_peak_height',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('nose_peak_length'),		name = 'nose_peak_length',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('nose_bone_height'),		name = 'nose_bone_height',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('nose_peak_lowering'),		name = 'nose_peak_lowering',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('nose_peak_twist'),			name = 'nose_peak_twist',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('eyebrow_height'),			name = 'eyebrow_height',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('eyebrow_forward'),			name = 'eyebrow_forward',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('cheeks_bone_height'),		name = 'cheeks_bone_height',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('cheeks_bone_width'),		name = 'cheeks_bone_width',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('cheeks_width'),			name = 'cheeks_width',			value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('eyes_opening'),			name = 'eyes_opening',			value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('lips_thickness'),			name = 'lips_thickness',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('jaw_bone_width'),			name = 'jaw_bone_width',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('jaw_bone_back_length'),		name = 'jaw_bone_back_length',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('chimp_bone_lowering'),		name = 'chimp_bone_lowering',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('chimp_bone_length'),		name = 'chimp_bone_length',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('chimp_bone_width'),		name = 'chimp_bone_width',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('chimp_hole'),			name = 'chimp_hole',			value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
	{label = _U('neck_thickness'),			name = 'neck_thickness',		value = 0,		min = -10,	zoomOffset = 0.6,		camOffset = 0.65},
}

local LastSex		= -1
local LoadSkin		= nil
local LoadClothes	= nil
local Character		= {}

for i=1, #Components, 1 do
	Character[Components[i].name] = Components[i].value
end

function PlayerCreateCharacter()
--	print('PlayerCreateCharacter')
	TriggerServerEvent('skin:createCharacter')
end

function LoadDefaultCharacter(sex, cb)
	if sex == 0 then
		TriggerServerEvent('skin:save', Config.defaultSkin_m)
		TriggerEvent('skin:loadSkinAndClothes', Config.defaultSkin_m, Config.defaultSkin_m, cb)
	else
		TriggerServerEvent('skin:save', Config.defaultSkin_f)
		TriggerEvent('skin:loadSkinAndClothes', Config.defaultSkin_f, Config.defaultSkin_f, cb)
	end
end

AddEventHandler('skin:loadDefaultCharacter', function(sex, cb)
--	print('skin:loadDefaultCharacter', sex)
	LoadDefaultCharacter(sex, cb)
end)

AddEventHandler('playerSpawned', function()
	Citizen.CreateThread(function()
		while not playerLoaded do
			Citizen.Wait(100)
		end

		if firstSpawn then
			ESX.TriggerServerCallback('skin:getPlayerSkin', function(skin)
				if skin == nil then
					LoadDefaultCharacter(0, PlayerCreateCharacter)
				else
					TriggerEvent('skin:loadSkinAndClothes', skin, skin)
				end
			end)

			firstSpawn = false
		end
	end)
end)

RegisterNetEvent('esx:playerLoaded')
AddEventHandler('esx:playerLoaded', function(xPlayer)
	playerLoaded = true
end)

AddEventHandler('skin:getLastSkin', function(cb)
	cb(lastSkin)
end)

AddEventHandler('skin:setLastSkin', function(skin)
	lastSkin = skin
end)

RegisterNetEvent('skin:requestSaveSkin')
AddEventHandler('skin:requestSaveSkin', function()
	TriggerEvent('skin:getSkin', function(skin)
		TriggerServerEvent('skin:responseSaveSkin', skin)
	end)
end)

function GetComponentByName(name)
	for i=1, #Components, 1 do
		if Components[i].name == name then
			return Components[i], i
		end
	end

	return nil, nil
end

function isDefaultModel()
	local model =GetEntityModel(PlayerPedId())
	return model == GetHashKey('mp_m_freemode_01') or model == GetHashKey('mp_f_freemode_01')
end

function LoadDefaultModel(malePed, cb)
	local playerPed = PlayerPedId()
	local characterModel

	if malePed then
		characterModel = GetHashKey('mp_m_freemode_01')
	else
		characterModel = GetHashKey('mp_f_freemode_01')
	end

	RequestModel(characterModel)

	Citizen.CreateThread(function()
		while not HasModelLoaded(characterModel) do
			RequestModel(characterModel)
			Citizen.Wait(0)
		end

		if IsModelInCdimage(characterModel) and IsModelValid(characterModel) then
			SetPlayerModel(PlayerId(), characterModel)
			SetPedDefaultComponentVariation(playerPed)
		end

		SetModelAsNoLongerNeeded(characterModel)

		if cb ~= nil then
			cb()
		end

		TriggerEvent('skin:modelLoaded', characterModel)
	end)
end

function GetMaxVals()
	local playerPed = PlayerPedId()

	local data = {
		sex				= 1,
		face			= GetNumberOfPedDrawableVariations		(playerPed, 0) - 1,
		face_2			= GetNumberOfPedDrawableVariations		(playerPed, 0) - 1,
		face_blend		= 10,
		skin			= GetNumberOfPedDrawableVariations		(playerPed, 0) - 1,
		age_1			= GetNumHeadOverlayValues(3)-1,
		age_2			= 10,
		acne_1			= GetNumHeadOverlayValues(0)-1,
		acne_2			= 10,
		beard_1			= GetNumHeadOverlayValues(1)-1,
		beard_2			= 10,
		beard_3			= GetNumHairColors()-1,
		beard_4			= GetNumHairColors()-1,
		hair_1			= GetNumberOfPedDrawableVariations		(playerPed, 2) - 1,
		hair_2			= GetNumberOfPedTextureVariations		(playerPed, 2, Character['hair_1']) - 1,
		hair_color_1	= GetNumHairColors()-1,
		hair_color_2	= GetNumHairColors()-1,
		eye_color		= 31,
		eyebrows_1		= GetNumHeadOverlayValues(2)-1,
		eyebrows_2		= 10,
		eyebrows_3		= GetNumHairColors()-1,
		eyebrows_4		= GetNumHairColors()-1,
		makeup_1		= GetNumHeadOverlayValues(4)-1,
		makeup_2		= 10,
		makeup_3		= GetNumHairColors()-1,
		makeup_4		= GetNumHairColors()-1,
		lipstick_1		= GetNumHeadOverlayValues(8)-1,
		lipstick_2		= 10,
		lipstick_3		= GetNumHairColors()-1,
		lipstick_4		= GetNumHairColors()-1,
		blemishes_1		= GetNumHeadOverlayValues(0)-1,
		blemishes_2		= 10,
		blush_1			= GetNumHeadOverlayValues(5)-1,
		blush_2			= 10,
		blush_3			= GetNumHairColors()-1,
		complexion_1	= GetNumHeadOverlayValues(6)-1,
		complexion_2	= 10,
		sun_1			= GetNumHeadOverlayValues(7)-1,
		sun_2			= 10,
		moles_1			= GetNumHeadOverlayValues(9)-1,
		moles_2			= 10,
		chest_1			= GetNumHeadOverlayValues(10)-1,
		chest_2			= 10,
		chest_3			= GetNumHairColors()-1,
		bodyb_1			= GetNumHeadOverlayValues(11)-1,
		bodyb_2			= 10,
		ears_1			= GetNumberOfPedPropDrawableVariations	(playerPed, 1) - 1,
		ears_2			= GetNumberOfPedPropTextureVariations	(playerPed, 1, Character['ears_1'] - 1),
		tshirt_1		= GetNumberOfPedDrawableVariations		(playerPed, 8) - 1,
		tshirt_2		= GetNumberOfPedTextureVariations		(playerPed, 8, Character['tshirt_1']) - 1,
		torso_1			= GetNumberOfPedDrawableVariations		(playerPed, 11) - 1,
		torso_2			= GetNumberOfPedTextureVariations		(playerPed, 11, Character['torso_1']) - 1,
		decals_1		= GetNumberOfPedDrawableVariations		(playerPed, 10) - 1,
		decals_2		= GetNumberOfPedTextureVariations		(playerPed, 10, Character['decals_1']) - 1,
		arms			= GetNumberOfPedDrawableVariations		(playerPed, 3) - 1,
		arms_2			= 10,
		pants_1			= GetNumberOfPedDrawableVariations		(playerPed, 4) - 1,
		pants_2			= GetNumberOfPedTextureVariations		(playerPed, 4, Character['pants_1']) - 1,
		shoes_1			= GetNumberOfPedDrawableVariations		(playerPed, 6) - 1,
		shoes_2			= GetNumberOfPedTextureVariations		(playerPed, 6, Character['shoes_1']) - 1,
		mask_1			= GetNumberOfPedDrawableVariations		(playerPed, 1) - 1,
		mask_2			= GetNumberOfPedTextureVariations		(playerPed, 1, Character['mask_1']) - 1,
		bproof_1		= GetNumberOfPedDrawableVariations		(playerPed, 9) - 1,
		bproof_2		= GetNumberOfPedTextureVariations		(playerPed, 9, Character['bproof_1']) - 1,
		chain_1			= GetNumberOfPedDrawableVariations		(playerPed, 7) - 1,
		chain_2			= GetNumberOfPedTextureVariations		(playerPed, 7, Character['chain_1']) - 1,
		bags_1			= GetNumberOfPedDrawableVariations		(playerPed, 5) - 1,
		bags_2			= GetNumberOfPedTextureVariations		(playerPed, 5, Character['bags_1']) - 1,
		helmet_1		= GetNumberOfPedPropDrawableVariations	(playerPed, 0) - 1,
		helmet_2		= GetNumberOfPedPropTextureVariations	(playerPed, 0, Character['helmet_1']) - 1,
		glasses_1		= GetNumberOfPedPropDrawableVariations	(playerPed, 1) - 1,
		glasses_2		= GetNumberOfPedPropTextureVariations	(playerPed, 1, Character['glasses_1'] - 1),
		watches_1		= GetNumberOfPedPropDrawableVariations	(playerPed, 6) - 1,
		watches_2		= GetNumberOfPedPropTextureVariations	(playerPed, 6, Character['watches_1']) - 1,
		bracelets_1		= GetNumberOfPedPropDrawableVariations	(playerPed, 7) - 1,
		bracelets_2		= GetNumberOfPedPropTextureVariations	(playerPed, 7, Character['bracelets_1'] - 1),

		nose_width = 10,
		nose_peak_height = 10,
		nose_peak_length = 10,
		nose_bone_height = 10,
		nose_peak_lowering = 10,
		nose_peak_twist = 10,
		eyebrow_height = 10,
		eyebrow_forward = 10,
		cheeks_bone_height = 10,
		cheeks_bone_width = 10,
		cheeks_width = 10,
		eyes_opening = 10,
		lips_thickness = 10,
		jaw_bone_width = 10,
		jaw_bone_back_length = 10,
		chimp_bone_lowering = 10,
		chimp_bone_length = 10,
		chimp_bone_width = 10,
		chimp_hole = 10,
		neck_thickness = 10,
	}

	return data
end

function ApplySkin(skin, clothes)
	local playerPed = PlayerPedId()

	if skin ~= nil then
		for k,v in pairs(skin) do
			local comp, compId = GetComponentByName(k)
			if comp and not comp.clothes then
--				print(k, v)
				Character[k] = v
			end
		end
	end

	if clothes ~= nil then
		for k,v in pairs(clothes) do
			local comp, compId = GetComponentByName(k)
			if comp and comp.clothes then
				Character[k] = v
			end
		end
	end

	if Character['face_2'] == -1 then
		SetPedHeadBlendData			(playerPed, Character['face'], Character['face'], Character['face'], Character['skin'], Character['skin'], Character['skin'], 1.0, 1.0, 1.0, true)
	else
		SetPedHeadBlendData			(playerPed, Character['face'], Character['face_2'], Character['face'], Character['skin'], Character['skin'], Character['skin'], 1-Character['face_blend']*0.1, Character['face_blend']*0.1, 0.0, true)
	end

	SetPedHairColor				(playerPed,			Character['hair_color_1'],		Character['hair_color_2'])					-- Hair Color
	SetPedHeadOverlay			(playerPed, 3,		Character['age_1'],				(Character['age_2'] / 10) + 0.0)			-- Age + opacity
	SetPedHeadOverlay			(playerPed, 0,		Character['acne_1'],				(Character['acne_2'] / 10) + 0.0)			-- Acne
	SetPedHeadOverlay			(playerPed, 1,		Character['beard_1'],			(Character['beard_2'] / 10) + 0.0)			-- Beard + opacity
	SetPedEyeColor				(playerPed,			Character['eye_color'], 0, 1)												-- Eyes color
	SetPedHeadOverlay			(playerPed, 2,		Character['eyebrows_1'],		(Character['eyebrows_2'] / 10) + 0.0)		-- Eyebrows + opacity
	SetPedHeadOverlay			(playerPed, 4,		Character['makeup_1'],			(Character['makeup_2'] / 10) + 0.0)			-- Makeup + opacity
	SetPedHeadOverlay			(playerPed, 8,		Character['lipstick_1'],		(Character['lipstick_2'] / 10) + 0.0)		-- Lipstick + opacity
	SetPedComponentVariation	(playerPed, 2,		Character['hair_1'],			Character['hair_2'], 2)						-- Hair
	SetPedHeadOverlayColor		(playerPed, 1, 1,	Character['beard_3'],			Character['beard_4'])						-- Beard Color
	SetPedHeadOverlayColor		(playerPed, 2, 1,	Character['eyebrows_3'],		Character['eyebrows_4'])					-- Eyebrows Color
	SetPedHeadOverlayColor		(playerPed, 4, 1,	Character['makeup_3'],			Character['makeup_4'])						-- Makeup Color
	SetPedHeadOverlayColor		(playerPed, 8, 1,	Character['lipstick_3'],		Character['lipstick_4'])					-- Lipstick Color
	SetPedHeadOverlay			(playerPed, 5,		Character['blush_1'],			(Character['blush_2'] / 10) + 0.0)			-- Blush + opacity
	SetPedHeadOverlayColor		(playerPed, 5, 2,	Character['blush_3'])														-- Blush Color
	SetPedHeadOverlay			(playerPed, 6,		Character['complexion_1'],		(Character['complexion_2'] / 10) + 0.0)		-- Complexion + opacity
	SetPedHeadOverlay			(playerPed, 7,		Character['sun_1'],				(Character['sun_2'] / 10) + 0.0)			-- Sun Damage + opacity
	SetPedHeadOverlay			(playerPed, 9,		Character['moles_1'],			(Character['moles_2'] / 10) + 0.0)			-- Moles/Freckles + opacity
	SetPedHeadOverlay			(playerPed, 10,		Character['chest_1'],			(Character['chest_2'] / 10) + 0.0)			-- Chest Hair + opacity
	SetPedHeadOverlayColor		(playerPed, 10, 1,	Character['chest_3'])														-- Torso Color
	SetPedHeadOverlay			(playerPed, 11,		Character['bodyb_1'],			(Character['bodyb_2'] / 10) + 0.0)			-- Body Blemishes + opacity

	if Character['ears_1'] == -1 then
		ClearPedProp(playerPed, 2)
	else
		SetPedPropIndex			(playerPed, 2,		Character['ears_1'],			Character['ears_2'], 2)						-- Ears Accessories
	end

	SetPedComponentVariation	(playerPed, 8,		Character['tshirt_1'],			Character['tshirt_2'], 2)					-- Tshirt
	SetPedComponentVariation	(playerPed, 11,		Character['torso_1'],			Character['torso_2'], 2)					-- torso parts
	SetPedComponentVariation	(playerPed, 3,		Character['arms'],			Character['arms_2'], 2)						-- Arms
	SetPedComponentVariation	(playerPed, 10,		Character['decals_1'],			Character['decals_2'], 2)					-- decals
	SetPedComponentVariation	(playerPed, 4,		Character['pants_1'],			Character['pants_2'], 2)					-- pants
	SetPedComponentVariation	(playerPed, 6,		Character['shoes_1'],			Character['shoes_2'], 2)					-- shoes
	SetPedComponentVariation	(playerPed, 1,		Character['mask_1'],			Character['mask_2'], 2)						-- mask
	SetPedComponentVariation	(playerPed, 9,		Character['bproof_1'],			Character['bproof_2'], 2)					-- bulletproof
	SetPedComponentVariation	(playerPed, 7,		Character['chain_1'],			Character['chain_2'], 2)					-- chain
	SetPedComponentVariation	(playerPed, 5,		Character['bags_1'],			Character['bags_2'], 2)						-- Bag

	if Character['helmet_1'] == -1 then
		ClearPedProp(playerPed, 0)
	else
		SetPedPropIndex			(playerPed, 0,		Character['helmet_1'],			Character['helmet_2'], 2)					-- Helmet
	end

	if Character['glasses_1'] == -1 then
		ClearPedProp(playerPed, 1)
	else
		SetPedPropIndex			(playerPed, 1,		Character['glasses_1'],			Character['glasses_2'], 2)					-- Glasses
	end

	if Character['watches_1'] == -1 then
		ClearPedProp(playerPed, 6)
	else
		SetPedPropIndex			(playerPed, 6,		Character['watches_1'],			Character['watches_2'], 2)					-- Watches
	end

	if Character['bracelets_1'] == -1 then
		ClearPedProp(playerPed,	7)
	else
		SetPedPropIndex			(playerPed, 7,		Character['bracelets_1'],		Character['bracelets_2'], 2)				-- Bracelets
	end

	SetPedFaceFeature( playerPed,  0  , Character['nose_width'] / 10.0)
	SetPedFaceFeature( playerPed,  1  , Character['nose_peak_height'] / 10.0)
	SetPedFaceFeature( playerPed,  2  , Character['nose_peak_length'] / 10.0)
	SetPedFaceFeature( playerPed,  3  , Character['nose_bone_height'] / 10.0)
	SetPedFaceFeature( playerPed,  4  , Character['nose_peak_lowering'] / 10.0)
	SetPedFaceFeature( playerPed,  5  , Character['nose_peak_twist'] / 10.0)
	SetPedFaceFeature( playerPed,  6  , Character['eyebrow_height'] / 10.0)
	SetPedFaceFeature( playerPed,  7  , Character['eyebrow_forward'] / 10.0)
	SetPedFaceFeature( playerPed,  8  , Character['cheeks_bone_height'] / 10.0)
	SetPedFaceFeature( playerPed,  9  , Character['cheeks_bone_width'] / 10.0)
	SetPedFaceFeature( playerPed,  10 , Character['cheeks_width'] / 10.0)
	SetPedFaceFeature( playerPed,  11 , Character['eyes_opening'] / 10.0)
	SetPedFaceFeature( playerPed,  12 , Character['lips_thickness'] / 10.0)
	SetPedFaceFeature( playerPed,  13 , Character['jaw_bone_width'] / 10.0)
	SetPedFaceFeature( playerPed,  14 , Character['jaw_bone_back_length'] / 10.0)
	SetPedFaceFeature( playerPed,  15 , Character['chimp_bone_lowering'] / 10.0)
	SetPedFaceFeature( playerPed,  16 , Character['chimp_bone_length'] / 10.0)
	SetPedFaceFeature( playerPed,  17 , Character['chimp_bone_width'] / 10.0)
	SetPedFaceFeature( playerPed,  18 , Character['chimp_hole'] / 10.0)
	SetPedFaceFeature( playerPed,  19 , Character['neck_thickness'] / 10.0)

	local overlays = Config.HairOverlays_M[Character['hair_1']]
	if Character['sex'] ~= 0 then
		overlays = Config.HairOverlays_F[Character['hair_1']]
	end

--	print(json.encode(overlays))
	ClearPedDecorations(playerPed)

	if overlays ~= nil then
		local ovr1 = overlays[1]
		local ovr2 = overlays[2]
		local variation = Config.HairVariations[Character['hair_color_1']]

		if variation ~= nil then
			ovr2 = string.gsub(ovr2, "~v~", variation)
		else
			ovr2 = nil
		end

		if ovr2 ~= nil then
			ApplyPedOverlay(playerPed, GetHashKey(ovr1), GetHashKey(ovr2))
		end
	end

	TriggerEvent('skin:skinApplied', Character)
end

AddEventHandler('skin:loadDefaultModel', function(loadMale, cb)
	LoadDefaultModel(loadMale, cb)
end)

AddEventHandler('skin:getData', function(cb)
	local components = json.decode(json.encode(Components))

	for k,v in pairs(Character) do
		for i=1, #components, 1 do
			if k == components[i].name then
				components[i].value = v
				--components[i].zoomOffset = Components[i].zoomOffset
				--components[i].camOffset = Components[i].camOffset
			end
		end
	end

	cb(components, GetMaxVals())
end)

AddEventHandler('skin:change', function(key, val)
	Character[key] = val

	if key == 'sex' then
		TriggerEvent('skin:loadSkin', Character)
	else
		ApplySkin(Character)
	end
end)

AddEventHandler('skin:getSkin', function(cb)
	cb(Character)
end)

AddEventHandler('skin:modelLoaded', function()
--	print('skin', 'modelLoaded', json.encode(LoadSkin), json.encode(LoadClothes))
	ClearPedProp(PlayerPedId(), 0)

	if LoadSkin ~= nil then
		ApplySkin(LoadSkin)
		LoadSkin = nil
	end

	if LoadClothes ~= nil then
		ApplySkin({}, LoadClothes)
		LoadClothes = nil
	end

	TriggerServerEvent('clothes:update')
end)

RegisterNetEvent('skin:loadSkin')
AddEventHandler('skin:loadSkin', function(skin, cb)
--	print('skin', 'loadSkin', json.encode(skin))
	if skin['sex'] ~= LastSex then
		LoadSkin = skin

		if skin['sex'] == 0 then
			TriggerEvent('skin:loadDefaultModel', true, cb)
		else
			TriggerEvent('skin:loadDefaultModel', false, cb)
		end
	else
		ApplySkin(skin)
	end

	if cb ~= nil then
		cb()
	end

	LastSex = skin['sex']
end)

RegisterNetEvent('skin:loadClothes')
AddEventHandler('skin:loadClothes', function(clothesSkin, cb)
--	print('skin', 'loadClothes', json.encode(skin))
	ApplySkin({}, clothesSkin)

	if cb ~= nil then
		cb()
	end
end)


RegisterNetEvent('skin:loadSkinAndClothes')
AddEventHandler('skin:loadSkinAndClothes', function(playerSkin, clothesSkin, cb)
--	print('skin', 'loadSkinAndClothes', 'start')
	if playerSkin and playerSkin['sex'] ~= LastSex then
--		print('skin', 'loadSkinAndClothes', 'sex changed', playerSkin['sex'], LastSex)
		LoadSkin = playerSkin
		LoadClothes = clothesSkin

		if playerSkin['sex'] == 0 then
--			print('skin', 'loadSkinAndClothes', 'sex is 0')
			TriggerEvent('skin:loadDefaultModel', true)
		else
--			print('skin', 'loadSkinAndClothes', 'sex is 1')
			TriggerEvent('skin:loadDefaultModel', false)
		end
	else
--		print('skin', 'loadSkinAndClothes', 'sex not changed')
		ApplySkin(playerSkin, clothesSkin)
--		print('skin', 'loadSkinAndClothes', json.encode(playerSkin), json.encode(clothesSkin))

--		print('skin', 'loadSkinAndClothes', 'cb', cb)
	end


	if cb ~= nil then
		cb()
	end

--	print('skin', 'loadSkinAndClothes', 'done', json.encode(playerSkin))
        if playerSkin then
	    LastSex = playerSkin['sex']
        end
end)

RegisterNetEvent('skin:loadClothesClean')
AddEventHandler('skin:loadClothesClean', function(clothesSkin, cb)
	local defaultSkin = {}

	local model = GetEntityModel(PlayerPedId())
	if model == GetHashKey('mp_m_freemode_01') then
		defaultSkin = Config.defaultSkin_m
	elseif model == GetHashKey('mp_f_freemode_01') then
		defaultSkin = Config.defaultSkin_f
	else
		-- do not change clothes on non-default hashes
		return
	end

	for k,v in pairs(defaultSkin) do
		if clothesSkin[k] == nil then
			clothesSkin[k] = v
		end
	end

	TriggerEvent('skin:loadClothes', clothesSkin, cb)
end)