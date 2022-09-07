fx_version 'adamant'
game 'gta5'

author 'Dan Sadler'
verison '1.0'

client_scripts {
	'@oop/Class.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'@oop/visual/Blips.lua',
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'client/main.lua',
}

server_scripts {
	'@oop/Class.lua',
	'@es_extended/locale.lua',
	'config.lua',
	'locales/ru.lua',
	'server/main.lua',
}