resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'ESX Paper'

version '0.1.0'

server_scripts {
	'@async/async.lua',
	'@mysql-async/lib/MySQL.lua',
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'server/main.lua'
}

client_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'client/main.lua'
}

ui_page 'html/ui.html'

files {
	'html/ui.html',
	'html/roboto.ttf',
	'html/css/app.css',
	'html/scripts/app.js',
	'html/tinymce/**/*',
}

dependency 'es_extended'
