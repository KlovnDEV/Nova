fx_version 'bodacious'
game 'gta5'

client_scripts {
	'@oop/Class.lua',
	'@oop/visual/Blips.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'utils.lua',
	'client.lua',
}

server_scripts{
    'server.lua',
}

exports {
	'getClothesByGXT',
	'getClothesVariations',
}