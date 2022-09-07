fx_version 'bodacious'
game 'gta5'

client_scripts {
    '@oop/Class.lua',
    'config.lua',
    'config.animations.lua',

    'client.lua',

    'util.lua',
    'client/inventory/util.lua',
    'client/inventory/main.lua',
    'client/skin/camera.js',
    'client/skin/main.js',
    'client/bank/main.lua',
    'client/chat/main.lua',
    'client/craft/main.lua',
    'client/menu/main.lua',
    'client/menu/vehicle.lua',
    'client/playerinfo/main.lua',
    'client/indicators/main.lua',
    'client/indicators/speedometer.lua',
    'client/indicators/location.lua',
    'client/indicators/voice.lua',
    'client/indicators/buffs.lua',
    'client/notifications/main.lua',
    'client/clothesshop/main.lua',
    'client/carshop/main.lua',
    'client/gasstations/main.lua',
    'client/shop/main.lua',
    'client/health/main.lua',
    'client/animations/**/*',
}

server_scripts{
        'config.lua',
	'config.animations.lua',
	'server/craft/main.lua',
	'server/craft/tasks.lua',
	'server/api.lua',
	'server/chat/**/*',
	'server/inventory/**/*',
	'server/skin/**/*',
	'server/indicators/**/*',
	'server/animations/**/*',
	'server/menu/**/*'
}

files {
	'html/index.html',
	'html/**/*',
}

ui_page "html/index.html"
