ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function isClothes(category)
    if category == "tshirt" then return true end
    if category == "belts" then return true end
    if category == "chain" then return true end
    if category == "chest" then return true end
    if category == "dress" then return true end
    if category == "glasses" then return true end
    if category == "helmet" then return true end
    if category == "jacket" then return true end
    if category == "pants" then return true end
    if category == "sets" then return true end
    if category == "shoes" then return true end
    if category == "tokens" then return true end
    if category == "underwear" then return true end
    return false
end
--[[
function getClothById(id, female)
	if female then
		return female_cloth_ids[id]
	else
		return male_cloth_ids[id]
	end
end

function clothToComponents(cloth)
	local adapt = {
		[1] = { "mask_1", "mask_2" },
		[2] = { "hair_1", "hair_2" },
		[3] = { "arms", "arms_2" },
		[4] = { "pants_1", "pants_2" },
		[5] = { "bags_1", "bags_2" },
		[6] = { "shoes_1", "shoes_2" },
		[7] = { "chain_1", "chain_2" },
		[8] = { "tshirt_1", "tshirt_2" },
		[9] = { "bproof_1", "bproof_2" },
		[10] = { "decals_1", "decals_2" },
		[11] = { "torso_1", "torso_2" },
	}
	local ct = adapt[cloth.cid]

	assert(ct)

	local res = {}
	res[ ct[1] ] = cloth.compid - 1
	res[ ct[2] ] = cloth.texid

	return res
end
]]

RegisterServerEvent('clothes:update')
AddEventHandler('clothes:update', function()
    local xPlayer = ESX.GetPlayerFromId(source)
    local inv = ESX.Custom.Inventory.Get('player-inventory', xPlayer.identifier)
    local skin = {}

    local identity = ESX.Identity.Get(xPlayer.identifier)
    local sex = -1

    local player = Player(source)
    if player and player.state.identity and player.state.identity.sex ~= nil then
	    sex = player.state.identity.sex
    end
--[[
    if identity.sex == 0 then
        skin = Config.MaleSkin
    elseif identity.sex == 1 then
        skin = Config.FemaleSkin
    end
]]--
    if not inv then
        print('Inventory not found!')
        return
    end

    local components = {}
    local props = {}

    for k,item in pairs(inv.items) do
        if isClothes(item.category) and item.extra ~= nil and (tostring(item.sex) == tostring(sex) or tostring(item.sex) == "-1") then

		if item.extra['components'] ~= nil then
	                for k,v in pairs(item.extra.components) do
				table.insert(components, v)
        		end
		end

		if item.extra['props'] ~= nil then
	                for k,v in pairs(item.extra.props) do
				table.insert(props, v)
        		end
		end

        end
    end

    -- Перчатки нужно всегда обрабатывать после верхней одежды
    local gloves_1 = 0
    local gloves_2 = 0

    for k,item in pairs(inv.items) do
        if item.category == 'gloves' and item.extra then
            gloves_1 = item.extra['gloves_1']
            gloves_2 = item.extra['gloves_2']
            break
        end
    end

    TriggerClientEvent('clothes:update', xPlayer.source, components, props, gloves_1, gloves_2)
--[[
    local arms = tonumber(skin['arms']) or 15

    if arms and arms < 16 and arms ~= 3 and arms ~= 7 and arms ~= 9 then

        local gloves_offsets = {
            { -- муж
                [0] = { 19, 30, 41, 52, 63, 74, 85 },
                [1] = { 20, 31, 42, 53, 64, 75, 86 },
                [2] = { 21, 32, 43, 54, 65, 76, 87 },
                [4] = { 22, 33, 44, 55, 66, 77, 88 },
                [5] = { 23, 34, 45, 56, 67, 78, 89 },
                [6] = { 24, 35, 46, 57, 68, 79, 90 },
                [8] = { 25, 36, 47, 58, 69, 80, 91 },
                [11] = { 26, 37, 48, 59, 70, 81, 92 },
                [12] = { 27, 38, 49, 60, 71, 82, 93 },
                [14] = { 28, 39, 50, 61, 72, 83, 94 },
                [15] = { 29, 40, 51, 62, 73, 84, 95 },
            },
            { -- жен
                [0] = { 20, 33, 46, 59, 72, 85, 98 },
                [1] = { 21, 34, 47, 60, 73, 86, 99 },
                [2] = { 22, 35, 48, 61, 74, 87, 100 },
                [3] = { 23, 36, 49, 62, 75, 88, 101 },
                [4] = { 24, 37, 50, 63, 76, 89, 102 },
                [5] = { 25, 38, 51, 64, 77, 90, 103 },
                [6] = { 26, 39, 52, 65, 78, 91, 104 },
                [7] = { 27, 40, 53, 66, 79, 92, 105 },
                [9] = { 28, 41, 54, 67, 80, 93, 106 },
                [11] = { 29, 42, 55, 68, 81, 94, 107 },
                [12] = { 30, 43, 56, 69, 82, 95, 108 },
                [14] = { 31, 44, 57, 70, 83, 96, 109 },
                [15] = { 32, 45, 58, 71, 84, 97, 110 },
            }
        }

        if gloves_1 > 0 then
            skin['arms'] = gloves_offsets[sex + 1][arms][gloves_1]
            skin['arms_2'] = gloves_2
        end
    end

    TriggerClientEvent('skin:loadClothesClean', xPlayer.source, skin, nil)
]]--
end)
