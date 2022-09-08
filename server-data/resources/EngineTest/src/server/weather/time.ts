import { showNotification } from '@nova/engine-lib/server/UI';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { clamp, Delay, Log, Random } from '@nova/engine-lib/shared';
import { Command } from '@nova/engine-lib/server/Admin';
import { sprintf } from 'sprintf-js';
import Config from '../../config/weather';

export class Time {
  static baseTime = 50000;
  static timeOffset = 0;
  static freeze = false;
}

function timeToHMS(time) {
  const hour = Math.floor((time / 3600) % 24);
  const minute = Math.floor((time / 60) % 60);
  const second = Math.floor(time) % 60;

  return [hour, minute, second];
}

function doFreezeTime(player: Player) {
  Time.freeze = !Time.freeze;
  if (player) {
    showNotification(player, Time.freeze ? 'Time is now ~b~frozen~s~.' : 'Time is ~y~no longer frozen~s~.');
  } else {
    Log.info(Time.freeze ? 'Time is now frozen.' : 'Time is no longer frozen.');
  }
}

onNet('weather:freeze_time', function () {
  const player = Players.ByHandle(source);
  doFreezeTime(player);
});

new Command('freeze_time', ['admin'], (player: Player) => {
  doFreezeTime(player);
})
  .setSuggestion({ help: 'Остановить время' })
  .register();

function ShiftToMinute(minute) {
  Time.timeOffset -= (((Math.floor(Time.baseTime + Time.timeOffset) / 60) % 60) - minute) * 60;
}

function ShiftToHour(hour) {
  Time.timeOffset -= ((Math.floor((Time.baseTime + Time.timeOffset) / 3600) % 24) - hour) * 3600;
}

onNet('weather:set_time', function (hh, mm, cb) {
  const h = clamp(parseInt(hh, 10), 0, 23);
  const m = clamp(parseInt(mm, 10), 0, 59);

  ShiftToMinute(m);
  ShiftToHour(h);
  TriggerEvent('weather:requestSync');

  Log.info(`Time has changed to ${sprintf('%02d:%02d', h, m)}.`);

  if (cb) cb();
});

new Command('time', ['admin'], (player: Player, args, rawCommand) => {
  if (args[0] && !args[1]) {
    args = args[0].split(':');
  } else if (!args[0]) {
    const [hour, minute, second] = timeToHMS(Time.baseTime + Time.timeOffset);
    const timeStr = sprintf('%02d:%02d', hour, minute);
    if (!player) {
      Log.info(`Current time ${timeStr}`);
    } else {
      showNotification(player, `Time is: ~y~${timeStr}~s~`);
    }

    return;
  }

  if (!player) {
    if (args.length == 2 && !Number.isNaN(+args[0]) && !Number.isNaN(+args[1])) {
      const argh = +args[0];
      const argm = +args[1];
      TriggerEvent('weather:set_time', argh, argm);
    } else {
      Log.error('Invalid syntax, correct syntax is: time <hour> <minute> !');
    }
  } else if (args.length == 2 && !Number.isNaN(+args[0]) && !Number.isNaN(+args[1])) {
    const argh = +args[0];
    const argm = +args[1];

    TriggerEvent('weather:set_time', argh, argm, function () {
      const [h, m] = timeToHMS(Time.baseTime + Time.timeOffset);
      showNotification(player, `Time has changed to: ~y~${sprintf('%02d:%02d', h, m)}~s~!`);
    });
  } else {
    emitNet(
      'chatMessage',
      player.handle,
      '',
      [255, 255, 255],
      '^8Error: ^1Invalid syntax. Use ^0/time <hour> <minute> ^1instead!',
    );
  }
})
  .setSuggestion({ help: 'Изменить текущее время' })
  .register();

let currentTimeScale = Config.DayTimeScale;

setTick(async () => {
  await Delay(500);
  const newBaseTime = Time.baseTime + currentTimeScale / 2.0;

  if (Time.freeze) {
    Time.timeOffset = Time.timeOffset + Time.baseTime - newBaseTime;
  }

  const [h1, ,] = timeToHMS(Time.baseTime + Time.timeOffset);
  const [h2, ,] = timeToHMS(newBaseTime + Time.timeOffset);
  //		print(string.format("%02i:%02i:%02i",h2,m2,s2))

  if (h2 >= 6 && h2 < 22) {
    currentTimeScale = Config.DayTimeScale;
  } else {
    currentTimeScale = Config.NightTimeScale;
  }

  if (h2 != h1) {
    TriggerEvent('weather:hour_started', h2);
    TriggerClientEvent('weather:hour_started', -1, h2);
  }

  Time.baseTime = newBaseTime;
});
