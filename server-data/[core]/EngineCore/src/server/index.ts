import '@citizenfx/server';
import Player from '@nova/engine-lib/server/Game';
import * as Admin from './Admin';
import './Admin';
import './Core';
import './Game';

import { Inventory } from './Inventory';

console.log('SERVER CORE IS STARTING!');

const cmd = new Admin.Command('test', (player: Player) => {
  console.log('AAA');
  const inv = new Inventory('abc', 'def');
  inv.Update();
  console.log('BBB');
});

// new ServerAdmin.Command('tp', (player: ServerCore.Player, x: number, y: number, z: number) => {
//   player.coords = new SharedMath.Vector3(x, y, z);
// })
//   .setSuggestion({
//     help: 'teleports player to position',
//     arguments: [
//       {
//         name: 'x',
//         help: 'x coordinate',
//         type: 'number',
//       },
//       {
//         name: 'y',
//         help: 'y coordinate',
//         type: 'number',
//       },
//       {
//         name: 'z',
//         help: 'z coordinate',
//         type: 'number',
//       },
//     ],
//   })
//   .register();
