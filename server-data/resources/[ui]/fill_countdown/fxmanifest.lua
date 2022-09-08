fx_version 'adamant'
game 'gta5'

description 'Countdown by Fill'
version '1.0'

ui_page 'html/ui.html'

client_script 'Client/App.lua'

files {
    'html/ui.html',
    'html/**/*',
}

exports {
    "StartCountdown",
    "StopCountdown"
} 
