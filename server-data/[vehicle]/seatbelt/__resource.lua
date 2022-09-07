resource_manifest_version '44febabe-d386-4d18-afbe-5e627f4af937'

client_scripts {
	'@es_extended/locale.lua',
	'locales/ru.lua',
	'config.lua',
	'client/main.lua'
}

ui_page 'html/ui.html'

files {
	'html/ui.html',
	'html/app.js',
	'html/style.css',
	'html/sounds/buckle.ogg',
	'html/sounds/unbuckle.ogg',
	'html/sounds/chime.ogg'
}


exports {
       'isBeltOn',
}
