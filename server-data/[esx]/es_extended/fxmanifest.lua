fx_version 'adamant'

game 'gta5'

description 'ES Extended'

version '1.2.0'

server_scripts {
	'@async/async.lua',
	'@mysql-async/lib/MySQL.lua',

	'locale.lua',
	'locales/de.lua',
	'locales/br.lua',
	'locales/fr.lua',
	'locales/en.lua',
	'locales/fi.lua',
	'locales/sv.lua',
	'locales/pl.lua',
	'locales/cs.lua',
	'locales/sc.lua',
	'locales/tc.lua',

	'config.lua',
	'config.weapons.lua',

	'server/custom/Constants.lua',

	'server/common.lua',
	'server/classes/player.lua',
	'server/functions.lua',
	'server/paycheck.lua',
	'server/CustomTables.lua',
	'server/main.lua',
	'server/commands.lua',

	'common/modules/math.lua',
	'common/modules/table.lua',
	'common/functions.lua',
	'common/custom/functions.lua',
	'server/custom/helper/**/*',
	'server/custom/sync/Sync.lua',
	'server/custom/roles/Main.lua',
	'server/custom/roles/Commands.lua',
	'server/custom/inventory/Inventory.lua',
	'server/custom/inventory/Item.lua',
	'server/custom/inventory/Collision.lua',
	'server/custom/inventory/Cash.lua',
	'server/custom/inventory/Keys.lua',
	'server/custom/inventory/Commands.lua',
	'server/custom/license/*.lua',
	'server/custom/money/Provider.lua',
	'server/custom/money/Commands.lua',
	'server/custom/tax/Provider.lua',
	'server/custom/tax/Calculation.lua',
	'server/custom/salary/Provider.lua',
	'server/custom/health/Provider.lua',
	'server/custom/health/Commands.lua',
	'server/custom/identity/Main.lua',
}

client_scripts {
	'locale.lua',
	'locales/de.lua',
	'locales/br.lua',
	'locales/fr.lua',
	'locales/en.lua',
	'locales/fi.lua',
	'locales/sv.lua',
	'locales/pl.lua',
	'locales/cs.lua',
	'locales/sc.lua',
	'locales/tc.lua',

	'config.lua',
	'config.weapons.lua',

	'client/common.lua',
	'client/entityiter.lua',
	'client/functions.lua',
	'client/wrapper.lua',
	'client/main.lua',
	'client/commands.lua',

	'client/modules/death.lua',
	'client/modules/scaleform.lua',
	'client/modules/streaming.lua',

	'common/modules/math.lua',
	'common/modules/table.lua',
	'common/functions.lua',
	'client/custom/sync/Sync.lua',
	'common/custom/functions.lua',

	'client/custom/roles/Main.lua',
	'client/custom/inventory/*',
	'client/custom/inventory/**/*',
	'client/custom/**/*',
}

shared_scripts {
	'@oop/Class.lua',
	'models/*',
}

ui_page {
	'html/ui.html'
}

files {
	'locale.js',
	'html/ui.html',

	'html/css/app.css',

	'html/js/mustache.min.js',
	'html/js/wrapper.js',
	'html/js/app.js',

	'html/fonts/pdown.ttf',
	'html/fonts/bankgothic.ttf',

	'html/img/accounts/bank.png',
	'html/img/accounts/black_money.png',
	'html/img/accounts/money.png'
}

exports {
	'getSharedObject'
}

server_exports {
	'getSharedObject'
}

dependencies {
	'mysql-async',
	'async'
}
