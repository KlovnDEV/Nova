import { showNotification } from '@nova/engine-lib/server/UI';
import { Player, Players } from '@nova/engine-lib/server/Game';
import { Delay, Log, Random } from '@nova/engine-lib/shared';
import { Command } from '@nova/engine-lib/server/Admin';
import Config from '../../config/weather';

let newWeatherTimer = Config.WeatherDuration;

const AvailableWeatherTypes = [
  'EXTRASUNNY',
  'CLEAR',
  'NEUTRAL',
  'SMOG',
  'FOGGY',
  'OVERCAST',
  'CLOUDS',
  'CLEARING',
  'RAIN',
  'THUNDER',
  'SNOW',
  'BLIZZARD',
  'SNOWLIGHT',
  'XMAS',
  'HALLOWEEN',
];

export class Weather {
  private static _current = 'CLEAR';
  private static _frozen = false;

  static get current(): string {
    return this._current;
  }

  static set current(value: string) {
    this._current = value;
  }

  static get frozen(): boolean {
    return this._frozen;
  }

  static set frozen(value: boolean) {
    this._frozen = value;
  }

  static getDuration(stage: string = this.current): number {
    let mult = 1;
    if (Config.WeatherDurationMult[stage]) {
      const minmax = Config.WeatherDurationMult[stage];
      if (minmax) {
        if (Array.isArray(minmax)) {
          mult = Random.randint(minmax[0], minmax[1]);
        } else {
          mult = minmax;
        }
      }
    }
    return Config.WeatherDuration * mult;
  }

  static next(): void {
    switch (this.current) {
      case 'CLEAR':
      case 'CLOUDS':
      case 'EXTRASUNNY':
        this.current = Random.choice(['CLEARING', 'OVERCAST']);
        break;

      case 'CLEARING':
      case 'OVERCAST':
        this.current = Random.choice(['FOGGY', 'RAIN', 'SMOG', 'EXTRASUNNY', 'CLEAR', 'CLOUDS']);
        break;

      case 'THUNDER':
      case 'RAIN':
        this.current = 'CLEARING';
        break;

      case 'SMOG':
      case 'FOGGY':
        this.current = 'CLEAR';
        break;

      default:
        this.current = 'CLEAR';
    }

    TriggerEvent('weather:requestSync');
  }
}

new Command('weather', ['admin'], function (player: Player, args: any[], rawCommand: string) {
  const nextWeatherType: string = args[0].toUpperCase();

  const validWeatherType = AvailableWeatherTypes.includes(nextWeatherType);

  if (!player) {
    if (!args[0]) {
      Log.error('Invalid syntax, correct syntax is: /weather <weathertype> ');
    } else if (validWeatherType) {
      Log.info('Weather has been updated.');
      Weather.current = args[0].toUpperCase();
      newWeatherTimer = Weather.getDuration(nextWeatherType);
      TriggerEvent('weather:requestSync');
    } else {
      Log.error(`Invalid weather type, valid weather types are: \n${AvailableWeatherTypes.join(' ')}`);
    }
  } else if (!args[0]) {
    TriggerClientEvent(
      'chatMessage',
      player.handle,
      '',
      [255, 255, 255],
      '^8Error: ^1Invalid syntax, use ^0/weather <weatherType> ^1instead!',
    );
  } else {
    if (args[0] == 'next') {
      Weather.next();
      showNotification(player, `Weather will change to: ~y~${Weather.current.toLowerCase()}~s~.`);
      return;
    }

    if (validWeatherType) {
      Log.debug(player);
      showNotification(player, `Weather will change to: ~y~${nextWeatherType.toLowerCase()}~s~.`);
      Weather.current = nextWeatherType;
      newWeatherTimer = Weather.getDuration(nextWeatherType);
      TriggerEvent('weather:requestSync');
    } else {
      TriggerClientEvent(
        'chatMessage',
        player.handle,
        '',
        [255, 255, 255],
        '^8Error: ^1Invalid weather type, valid weather types are: ^0\nEXTRASUNNY CLEAR NEUTRAL SMOG FOGGY OVERCAST CLOUDS CLEARING RAIN THUNDER SNOW BLIZZARD SNOWLIGHT XMAS HALLOWEEN ',
      );
    }
  }
})
  .setSuggestion({
    help: 'Изменить текущую погоду',
    arguments: [
      {
        name: 'weatherType',
        help: `Available types: ${AvailableWeatherTypes.join(', ')}`,
        type: 'string',
      },
    ],
  })
  .register();

onNet('weather:freeze_weather', function (source) {
  Weather.frozen = !Weather.frozen;

  if (source) {
    const player = Players.ByHandle(source);
    showNotification(player, `Weather is now ${Weather.frozen ? '~b~frozen' : '~r~not frozen'}~s~.`);
  } else {
    Log.info(Weather.frozen ? 'Weather is now frozen.' : 'Weather is no longer frozen.');
  }
});

setTick(async () => {
  await Delay(60000);
  if (newWeatherTimer == 0) {
    if (!Weather.frozen) {
      Weather.next();
    }
    newWeatherTimer = Weather.getDuration(Weather.current);

    if (Config.Debug) {
      Log.debug(`[es_wsync] New random weather type has been generated: ${Weather.current}.`);
      Log.debug(`[es_wsync] Resetting timer to ${newWeatherTimer} min.`);
    }

    newWeatherTimer -= 1;
  }
});
