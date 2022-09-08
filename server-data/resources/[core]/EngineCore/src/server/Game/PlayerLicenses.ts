// import { Player } from 'server/Core/Player';
// import { DB } from 'server/DB';
// import { Players } from './Players';

// export class PlayerLicenses {
//   private player: Player;
//   private licenses;

//   constructor(player: Player) {
//     this.player = player;
//     this.GetFromDB().then(response => {
//       this.player.state.set('licenses', response, true);
//     });
//   }

//   async GetFromDB() {
//     return DB.Query('licenses/get', { identifier: this.player.identifier }).then(response => {
//       this.licenses = response;
//     });
//   }

//   async Get() {
//     if (this.licenses) return this.licenses;

//     await this.GetFromDB();
//     return this.licenses;
//   }

//   async Set(data: Record<string, any>) {
//     const newLicenses = { identifier: this.player.identifier, ...data };
//     return DB.Query('licenses/update', { identifier: this.player.identifier, ...data }).then(() => {
//       this.licenses = newLicenses;
//       this.player.state.licenses = newLicenses;
//     });
//   }
// }

// on('engine:setPlayerLicenses', (handle, value) => {
//   const player = Players.ByHandle(handle);
//   if (!player) return;

//   player.licenses.Set(value);
// });
