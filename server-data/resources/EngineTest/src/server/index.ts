import '@citizenfx/server';
import { Players } from '@nova/engine-lib/server/Game';
import { Delay } from '@nova/engine-lib/shared';

import './atm';
import './forges';
import './itemmarkers';
import './gatherables';
// import './lumberjack';
import './lockers';
import './doorlock';
import './headtrack';
import './weather';
import './trunks';
import './tattoo';
import './slashtires';
import './jobs-oil';
import './health';
import './effects';

// Players.onJoin.subscribe(player => {
//   Log.error('PLAYER JOIN', player);
// });

// (async () => {
//   await Delay(1000);
//   const player = Players.All()[0];

//   await player.inventory.update();
//   Log.info(player.inventory.weight);
//   Log.info(player.inventory.search({ name: 'apple' }, true));
//   // Log.warn(player.inventory.addItem(InventoryItem.Create('apple'), 2));
//   // inv.addItem(InventoryItem.Create('apple'), 2);
// })();

// let money;

// (async () => {
//   await Delay(1000);
//   const player = Players.All()[0];
//   emit('engine:status:add', player.handle, 'strength', 3);
// })();

(async () => {
  await Delay(1000);

  const player = Players.All()[0];
  if (player) {
    player.money.set('bank', 23456);
  }
})();

// (async () => {
//   await Delay(1000);
//   console.log('before bank get');
//   const player = Players.All()[0];

//   let money;
//   player.money.set('bank', 23456);

//   money = await player.money.get('bank');
//   Log.info(`Player bank amount: ${money}`);

//   player.money.add('bank', 12);

//   money = await player.money.get('bank');
//   console.log('after bank get', money);

//   player.money.sub('bank', 13);

//   money = await player.money.get('bank');
//   console.log('after bank get', money);

//   player.money
//     .pay(['cash', 'bank'], 2500, 'buy clothes', 'trading')
//     .then(() => {
//       Log.info('Success!');
//     })
//     .catch(() => {
//       Log.info('Not enough money!');
//     });

//   money = await player.money.get('bank');
//   console.log('after pay', money);
// })();

//   await player.money.add('bank', 12);
//   bankAmount = await player.money.get('bank');
//   Log.info(`Player bank amount: ${bankAmount}`);

//   await player.money.sub('bank', 13);
//   bankAmount = await player.money.get('bank');
//   Log.info(`Player bank amount: ${bankAmount}`);

// // console.log('SERVER TEST IS STARTING!');

// Server.Core.ServerCallback.Register('test_callback111', () => {
//   return 'SUCCESS';
// });

// setTick(async () => {
//   await Delay(1000);

//   Server.Core.Players.All().forEach(player => {
//     // player.setRole('ambulance', Random.randint(1, 5));
//     player.coords = Vector3.FromArray([-276, 135, 73]);
//     // console.log(player.name, player.roles);
//   });
// });
