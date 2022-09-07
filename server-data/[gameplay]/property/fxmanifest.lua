fx_version 'bodacious'
game 'gta5'

description 'Property'

version '1.0.0'

client_scripts {
	'@oop/Class.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'config.lua',
	'client/main.lua'
}

server_scripts {
	'config.lua',
	'util.lua',
	'server/db_properties.lua',
	'server/db_property_markers.lua',
	'server/main.lua',
}
