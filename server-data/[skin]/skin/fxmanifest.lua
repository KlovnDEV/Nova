fx_version 'adamant'

game 'gta5'

description 'Skin Changer'

version '1.0.3'

client_scripts {
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'client/main.lua',
	'client/skin_menu.lua',
}

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'server/main.lua',
}
