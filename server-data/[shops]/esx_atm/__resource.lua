resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'ESX ATM'

version '1.1.0'

server_scripts {
	'@async/async.lua',
	'@mysql-async/lib/MySQL.lua',
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'server/main.lua'
}

client_scripts {
	'@oop/Class.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'@oop/visual/Blips.lua',
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'client/main.lua'
}

ui_page 'html/ui.html'

files {
	'html/ui.html',
	'html/roboto.ttf',
	'html/img/fleeca.png',
	'html/css/app.css',
	'html/scripts/app.js'
}

dependency 'es_extended'
