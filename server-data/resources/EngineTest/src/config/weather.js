const Config = {};

Config.Locale = 'ru';
Config.Debug = false;
Config.DynamicWeather = true;  // set this to false if you don't want the weather to change automatically
Config.WeatherDuration = 30; // how many minutes single weather stage goes
Config.WeatherDurationMult = { // min and max multiplier for certain stages
    ['EXTRASUNNY']: [2, 3],
    ['CLEAR']: [2, 5],
    ['NEUTRAL']: 1,
    ['SMOG']: [1, 4],
    ['FOGGY']: [1, 2],
    ['OVERCAST']: [1, 2],
    ['CLOUDS']: [1, 3],
    ['CLEARING']: [1, 2],
    ['RAIN']: 1,
    ['THUNDER']: 1,
    ['SNOW']: 1,
    ['BLIZZARD']: 1,
    ['SNOWLIGHT']: 1,
    ['XMAS']: 1,
    ['HALLOWEEN']: 1
};

Config.DayTimeScale = 8;    // day time speedup,   1 = realtime, 8  =  2 real hours   per game day   (06:00 - 22:00)
Config.NightTimeScale = 12; // night time speedup, 1 = realtime, 12 = 40 real minutes per game night (22:00 - 06:00)

export default Config;