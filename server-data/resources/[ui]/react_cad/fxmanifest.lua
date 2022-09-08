fx_version 'bodacious'
game 'gta5'

client_scripts {
    '@oop/Class.lua',
    '@oop/visual/Markers.lua',
    '@oop/visual/Sprite3D.lua',
    'config.lua',
    'client/main.lua',
    'client/markers.lua',
}

server_scripts{
        'config.lua',
	'server/main.lua',
	'server/api.lua',
	'server/**/*',
}

files {
	'html/index.html',
	'html/**/*',
}

ui_page "html/index.html"
