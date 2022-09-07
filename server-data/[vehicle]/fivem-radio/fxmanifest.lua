fx_version 'adamant'
game 'gta5'

client_scripts {
	'config.lua',
	'client.lua'
}

ui_page "index.html"

-- Example custom radios
supersede_radio "RADIO_01_CLASS_ROCK" { url = "https://vip2.fastcast4u.com/proxy/classicrockdoug?mp=/1", volume = 0.2, name = "Classic Rock Radio" }
supersede_radio "RADIO_02_POP" { url = "https://jfm1.hostingradio.ru:14536/rcstream.mp3", volume = 0.2, name = "Clasic Radio" }
supersede_radio "RADIO_03_HIPHOP_NEW" { url = "https://play.global.audio/radio164", volume = 0.2, name = "Bulgarian Radio One" }
supersede_radio "RADIO_04_PUNK" { url = "https://air.radiorecord.ru:805/pump_320", volume = 0.2, name = "Old School Evening" }
supersede_radio "RADIO_09_HIPHOP_OLD" { url = "https://live.powerhitz.com/hot108?aw_0_req.gdpr=true&esPlayer&cb=86641.mp3", volume = 0.2, name = "Hot108 Hip-Hop Radio" }
supersede_radio "RADIO_06_COUNTRY" { url = "http://us3.internet-radio.com:8297/stream", volume = 0.2, name = 'The Ranch Rebel' }
supersede_radio "RADIO_14_DANCE_02" { url = "http://204.12.193.98:8415/listen.pls?sid=1", volume = 0.2, name = 'Jang Dong K-Pop' }
supersede_radio "RADIO_08_MEXICAN" { url = "https://s3-webradio.antenne.de/chillout", volume = 0.2, name = "ChillOut" }
--supersede_radio "RADIO_05_TALK_01 " { url = "URL online station", volume = 0.2, name = "Name Station" }
supersede_radio "RADIO_12_REGGAE" { url = "ttps://113fm.cdnstream1.com/1816_128", volume = 0.2, name = 'BluesVill' }
supersede_radio "RADIO_13_JAZZ" { url = "https://nashe1.hostingradio.ru:80/jazz-128.mp3", volume = 0.2, name = 'Jazz Radio' }
supersede_radio "RADIO_07_DANCE_01" { url = "https://mp3.stream.tb-group.fm/tb.mp3?/;stream.mp3", volume = 0.2, name = 'TechnoBase' }
supersede_radio "RADIO_15_MOTOWN" { url = "https://arabellawien.stream.arabella.at/arabellavie", volume = 0.2, name = "Arabella FM old hits"}
supersede_radio "RADIO_16_SILVERLAKE" { url = "https://retro.hostingradio.ru:8043/retro128", volume = 0.2, name = 'RetroFM'}
supersede_radio "RADIO_17_FUNK" { url = "https://streamingp.shoutcast.com/hotmixradio-80-128.mp3", volume = 0.2, name = "Old School Hotmix Radio"}
supersede_radio "RADIO_18_90S_ROCK" { url = "http://icecast.argovia.ch/radio24rock", volume = 0.2, name = "Radio 24 Rock" }
--supersede_radio "RADIO_19_USER" { url = "http://curiosity.shoutca.st:6383/;stream.nsv", volume = 0.2, name = 'Neo Radio' }
supersede_radio "RADIO_20_THELAB" { url = "https://live.powerhitz.com/hot108?aw_0_req.gdpr=true&esPlayer&cb=297791.mp3", volume = 0.2, name = 'Hip-Hop Radio' }
--supersede_radio "RADIO_11_TALK_02" { url = "http://curiosity.shoutca.st:6383/;stream.nsv", volume = 0.2, name = 'Neo Radio' }
supersede_radio "RADIO_21_DLC_XM17" { url = "https://ecast.myautodj.com/public1channel", volume = 0.2, name = "Radio Syntwave" }
supersede_radio "RADIO_22_DLC_BATTLE_MIX1_RADIO" { url = "https://listen.181fm.com/181-awesome80s_128k.mp3?noPreRoll=true", volume = 0.2, name = "Awesome 80s" }

--supersede_radio "name station game" { url = "URL online station", volume = 0.2, name = "Name Station" } 

files {
	"index.html"
}

client_scripts {
	"data.js",
	"client.js"
}
