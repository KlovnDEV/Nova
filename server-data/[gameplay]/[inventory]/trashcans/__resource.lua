resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'Trashcans'
author 'Dan Sadler'

version '1.0.0'

server_scripts {
	'@mysql-async/lib/MySQL.lua',
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'server/main.lua',
}

client_scripts {
	'@oop/Class.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'client/main.lua',
}

dependency 'es_extended'
