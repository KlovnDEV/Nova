fx_version 'bodacious'
games { 'gta5' }

description 'Inventory'
provide 'inventory'

author 'Dan Sadler'
version '1.5.0'

server_scripts {
	'@es_extended/locale.lua',
	'@async/async.lua',
	'@mysql-async/lib/MySQL.lua',
	'locales/en.lua',
	'config.lua',
	'common.lua',
	'server/main.lua',
	'server/pickups.lua',
	'server/actions.lua',
	'server/actions.js',
	'server/items/custom.lua',
	'server/items/**/*',
    'server/hands.lua',
}

client_scripts {
    '@oop/Class.lua',
    '@oop/visual/Markers.lua',
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'common.lua',
	'client/main.lua',
	'client/pickups.lua',
	'client/actions.lua',
	'client/overweight.lua',
	'client/ui.lua',
	'client/items/**/*',
    'client/hands.lua',
}

ui_page 'html/index.html'

files {
	'html/**/*',
}

dependency 'es_extended'
