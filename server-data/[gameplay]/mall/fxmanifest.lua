fx_version 'adamant'
game 'gta5'

description 'Mall by Fellini'
version '1.0'

ui_page 'html/ui.html'

client_scripts {
    '@oop/Class.lua',
	'@oop/visual/Markers.lua',
	'@oop/visual/Sprite3D.lua',
	'@oop/visual/Blips.lua',
    '@es_extended/locale.lua',
    'locales/en.lua',
    'locales/ru.lua',
    'Client/App.lua',
    'Config.lua'
}

server_scripts {
    '@mysql-async/lib/MySQL.lua',
    '@es_extended/locale.lua',
    'locales/en.lua',
    'locales/ru.lua',
    'Config.lua',
    'Server/Main.lua'
}

files {
    'html/ui.html',
    'html/css/reset.css',
    'html/css/app.css',
    'html/js/app.js',
    'html/font/dejavu.ttf'
}
