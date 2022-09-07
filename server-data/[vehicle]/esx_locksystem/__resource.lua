resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

description 'ESX Car Lock System'

version '1.0.4'

server_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'server/main.lua',
	'config.lua'
}

client_scripts {
	'@es_extended/locale.lua',
	'locales/en.lua',
	'config.lua',
	'client/main.lua',
	'client/lock_cars.lua'
}

ui_page 'html/index.html'

files {
    'html/index.html',
    'html/sounds/lock.ogg',
    'html/sounds/unlock.ogg'
}