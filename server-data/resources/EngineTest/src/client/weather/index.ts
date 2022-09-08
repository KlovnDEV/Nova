/* eslint-disable no-await-in-loop */
import { Delay } from '@nova/engine-lib/shared';
import Config from '../../config/weather';

let CurrentWeather = 'CLEAR';
let lastWeather = '';
let serverTime = 0;
let clientTime = 0;
let freezeTime = false;
let blackout = false;

SetBlackout(blackout);

function timeToHMS(time) {
  const hour = Math.floor((time / 3600) % 24);
  const minute = Math.floor((time / 60) % 60);
  const second = Math.floor(time) % 60;

  return [hour, minute, second];
}

onNet('weather:updateWeather', function (NewWeather, newblackout) {
  if (newblackout != blackout) {
    SetBlackout(newblackout);
    blackout = newblackout;
  }

  CurrentWeather = NewWeather;
  TriggerEvent('carhud:SetWeather', NewWeather);
});

async function changeWeather(weather) {
  if (lastWeather == weather) return;

  SetWeatherTypeOverTime(weather, 15.0);
  const timerStart = GetGameTimer();
  let timerLastFrame = timerStart;
  let timerDelta = 50;

  // strange, but 5 secs works best
  while (GetGameTimer() - timerStart < 5000 - timerDelta && GetGameTimer() >= timerStart) {
    timerDelta = GetGameTimer() - timerLastFrame;

    if (timerDelta < 50) {
      timerDelta = 50;
    }
    if (timerDelta > 100) {
      timerDelta = 100;
    }

    timerLastFrame = GetGameTimer();
    await Delay(0);
  }

  SetOverrideWeather(weather);

  if (CurrentWeather == 'XMAS') {
    SetForceVehicleTrails(true);
    SetForcePedFootstepsTracks(true);
    //		N_0xc54a08c85ae4d410(3.0)
  } else {
    SetForceVehicleTrails(false);
    SetForcePedFootstepsTracks(false);
    //		N_0xc54a08c85ae4d410(0.0)
  }

  lastWeather = weather;
}

setTick(async () => {
  await Delay(100);
  await changeWeather(CurrentWeather);
});

onNet('weather:updateTime', function (base, offset, freeze) {
  freezeTime = freeze;
  serverTime = base + offset;
});

let timer = GetGameTimer();

setTick(async () => {
  let currentTimeScale = Config.DayTimeScale;

  if (serverTime == 0) return;

  let deltaTime = 0;
  let spd = 1;

  if (!freezeTime) {
    deltaTime = ((GetGameTimer() - timer) / 1000.0) * currentTimeScale;
    timer = GetGameTimer();
    serverTime += deltaTime;
  }

  // instant change for large amounts of time
  if (Math.abs(serverTime - clientTime) > 10.0) {
    clientTime = serverTime;
  }

  spd = 1 - (clientTime - serverTime) * 0.02;

  if (spd < 0.5) spd = 0.5;
  if (spd > 2.0) spd = 2.0;

  clientTime += deltaTime * spd;

  const [hour, minute, second] = timeToHMS(clientTime);
  if (hour >= 6 && hour < 22) {
    currentTimeScale = Config.DayTimeScale;
  } else {
    currentTimeScale = Config.NightTimeScale;
  }

  NetworkOverrideClockTime(hour, minute, second);
});

on('playerSpawned', function () {
  TriggerServerEvent('weather:requestSync');
});
