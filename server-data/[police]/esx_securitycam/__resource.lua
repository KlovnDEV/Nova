resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'ESX Security Cam'

version '1.2.0'

server_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'locales/sv.lua',
	'locales/ru.lua',
	'config.lua',
	'server/main.lua'
}

client_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'locales/sv.lua',
	'locales/ru.lua',
	'config.lua',
	'client/main.lua',
	'client/broken_cameras.lua',
}

ui_page 'ui/index.html'

files {
	'ui/index.html',
	'ui/vue.min.js',
	'ui/script.js'
}
