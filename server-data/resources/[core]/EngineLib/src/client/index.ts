import '@citizenfx/client/';

export * as Core from './Core';
export * as Game from './Game';
export * as Graphics from './Graphics';
export * as Input from './Input';
export * as UI from './UI';
export * as Utils from './Utils';

console.log('CLIENT LIB IS STARTING');


// setTick(async () => {
//   await Engine.Utils.Delay(0);

//   if (Engine.Input.Control.JustReleased(38)) {
//     console.log('CLIENT CLICK E');
//     // emit(
//     //   'engine:triggerServerCallbac',
//     //   function (a) {k
//     //     console.log('return from callback', JSON.stringify(a));
//     //   },
//     //   'test_callback',
//     //   'arg1',
//     //   'arg2',
//     // );

//     Engine.Core.ServerCallback.Trigger('test_callback', 123, 456).then(args => {
//       console.log('AFTER SERVER CALLBACK', args);
//     });
//   }

//   // const { ped } = Engine.Core.LocalPlayer;

//   // if (ped.exist) {
//   //   console.log('CLIENT 3');
//   //   console.log('COORDS', ped.coords);
//   // }
// });
