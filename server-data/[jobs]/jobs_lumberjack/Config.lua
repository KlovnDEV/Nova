---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
Config = {}
Config.Locale = 'ru'

Config.DisableKeys = {0, 22, 23, 24, 29, 30, 31, 37, 38, 44, 56, 82, 140, 166, 167, 168, 170, 288, 289, 311, 323}

Config.Items = {
    rawWood = {itemName = 'wood', itemTable = 'item_custom', getQty = 1, reqItemName =  nil, reqItemTable = nil, reqQty = nil},
    --woodBoard = {name = 'wood_board', qty = 20, reqName = 'raw_wood', reqQty = 1},
    --woodPackage = {name = 'wood_package', qty = 1, reqName = 'wood_board', reqQty = 20},
    --charcoalSack = {name = 'charcoal_sack', qty = 1, reqName = 'raw_wood', reqQty = 1},
    --sawdustSack = {name = 'sawdust_sack', qty = 1, reqName = 'raw_wood', reqQty = 1},
}

Config.Blips = {
    collect = {title = 'Cut wood', colour = 69, id = 285, x = -576.54, y = 5456.27, z = 59.84},
    --saw = {title = _U('blip_saw_wood'), colour = 69, id = 285, x = -530.86, y = 5286.34, z = 74.17},
    --pack = {title = _U('blip_pack_wood'), colour = 69, id = 285, x = -506.38, y = 5270.07, z = 80.61},
    --burn = {title = _U('blip_burn_wood'), colour = 69, id = 285, x = -594.98, y = 5345.22, z = 70.37},
    --crush = {title = _U('blip_crush_wood'), colour = 69, id = 285, x = -552.31, y = 5328.19, z = 72.68}
}

Config.Collect = {
    {x = -558.48, y = 5419.19, z = 63.30},
    {x = -561.75, y = 5420.27, z = 62.17},
    {x = -578.68, y = 5426.97, z = 59.06},
    {x = -586.34, y = 5447.23, z = 60.30},
    {x = -586.12, y = 5447.83, z = 60.32},
    {x = -591.61, y = 5449.70, z = 59.60},
    {x = -594.04, y = 5451.61, z = 59.44},
    {x = -582.08, y = 5470.29, z = 59.48},
    {x = -577.10, y = 5468.90, z = 60.75},
    {x = -572.57, y = 5468.12, z = 61.43},
    {x = -560.16, y = 5460.29, z = 63.63},
    {x = -563.14, y = 5457.28, z = 63.15},
    {x = -552.73, y = 5445.78, z = 63.28}
}
