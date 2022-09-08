import { Command } from '@nova/engine-lib/server/Admin';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { showNotification } from '@nova/engine-lib/server/UI';
import { clamp, Delay, Log, Random } from '@nova/engine-lib/shared';
import { sprintf } from 'sprintf-js';
import Config from '../../config/weather';

import { Blackout } from './blackout';
import { Weather } from './weather';
import { Time } from './time';

onNet('weather:requestSync', function () {
  TriggerClientEvent('weather:updateWeather', -1, Weather.current, Blackout.enabled);
  TriggerClientEvent('weather:updateTime', -1, Time.baseTime, Time.timeOffset, Time.freeze);
});

setTick(async () => {
  await Delay(5000);
  TriggerClientEvent('weather:updateTime', -1, Time.baseTime, Time.timeOffset, Time.freeze);
});

setTick(async () => {
  await Delay(300000);
  TriggerClientEvent('weather:updateWeather', -1, Weather.current, Blackout.enabled);
});
