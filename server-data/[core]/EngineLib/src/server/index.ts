import '@citizenfx/server';

export * as Admin from './Admin';
export * as Core from './Core';
export * as DB from './DB';
export * as Graphics from './Graphics';
export * as Game from './Game';
export * as Inventory from './Inventory';
export * as UI from './UI';

// declare const shared: { Engine: ServerEngine };

console.log('SERVER IS STARTING!');

// setTimeout(() => {
//   const player = Engine.Core.Players.All()[0];
//   Engine.Core.ClientCallback.Trigger(player, 'client_callback', 'аргумент 1', [222, '333']).then(res => {
//     console.log('AFTER CLIENT CALLBACK', res);
//   });
// }, 1000);

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
