import { Players } from '@nova/engine-lib/server/Game';

onNet('engine:effects:smokeTick', (val: number) => {
  const player = Players.ByHandle(source);
  TriggerEvent('engine:status:add', player.handle, 'smoking', val);
  TriggerEvent('engine:status:sub', player.handle, 'stress', val / 3.0);
});
