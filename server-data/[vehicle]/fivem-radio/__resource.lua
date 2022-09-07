resource_manifest_version "44febabe-d386-4d18-afbe-5e627f4af937"

ui_page "index.html"

-- Example custom radios
supersede_radio "RADIO_12_REGGAE" { url = "https://icecast-studio21.cdnvideo.ru/S21cl_1s", volume = 0.2, name = 'STUDIO 21' }
supersede_radio "RADIO_09_HIPHOP_OLD" { url = "http://retroserver.streamr.ru:8043/retro256.mp3", volume = 0.2, name = 'RetroFM' }
supersede_radio "RADIO_13_JAZZ" { url = "https://nashe1.hostingradio.ru:80/jazz-128.mp3", volume = 0.2, name = 'Jazz Radio' }
supersede_radio "RADIO_14_DANCE_02" { url = "https://mp3.stream.tb-group.fm/tb.mp3?/;stream.nsv", volume = 0.2, name = 'TechnoBase' }
supersede_radio "RADIO_16_SILVERLAKE" { url = "http://cast.magicstreams.gr:9125/;stream.nsv", volume = 0.2, name = 'Psyndora Chillout' }
supersede_radio "RADIO_18_90S_ROCK" { url = "http://curiosity.shoutca.st:6383/;stream.nsv", volume = 0.2, name = 'Neo Radio' }
supersede_radio "RADIO_07_DANCE_01" { url = "http://204.12.193.98:8415/listen.pls?sid=1", volume = 0.2, name = 'Jang Dong K-Pop' }
supersede_radio "RADIO_06_COUNTRY" { url = "http://us3.internet-radio.com:8297/stream", volume = 0.2, name = 'The Ranch Rebel' }
--supersede_radio "RADIO_02_POP" { url = "https://revolutionradio.ru:8443/live.ogg", volume = 0.2 }
--supersede_radio "RADIO_03_HIPHOP_NEW" { url = "http://stream.radioreklama.bg/nrj.ogg", volume = 0.2 }

files {
	"index.html"
}

client_scripts {
	"data.js",
	"client.js"
}
