import './arcade';
import './atm';
import './tattoo';
import './carwash';
import './itemmarkers';
import './pillbox_beds';
import './pointfinger';
import './lockers';
import './forges';
import './doorlock';
import './playermenu';
import './holsterweapon';
import './gatherables';
import './teleports';
import './seatshuffle';
import './ragdoll';
import './crouchandprone';
import './headtrack';
import './timertazer';
import './vehiclepush';
import './policesiren';
import './weather';
import './trunks';
import './health';
import './slashtires';
import './jobs-oil';
import './skills';
import './effects';
import { Delay, Log } from '@nova/engine-lib/shared';
import { LocalPlayer } from '@nova/engine-lib/client/Game';

// setTick(async () => {
//   await Delay(100);
//   // Log.debug(LocalPlayer.status);

//   RestorePlayerStamina(LocalPlayer.handle, (0.007 / 100.0) * LocalPlayer.status.endurance);
// });

// const progress = new CircularProgress({
//   coords: new Vector3(166.68, -1037.54, 29.32),
//   scale: new Vector2(0.2, 0.2),
//   textureDict: 'progressbars',
//   textureName: 'progress',
//   alpha: 255,
//   color: [255, 255, 255],
//   drawDistance: 5.0,
//   // distanceFade: false,
// });

// const cam = new Camera({});
// let camCoords: Vector3 = Client.Camera.gameplayCamCoords;

// const camera = new TargettedCamera({
//   target: LocalPlayer.ped.coords,
//   heading: LocalPlayer.ped.heading + 90.0,
//   minDistance: 1.0,
//   maxDistance: 3.0,
//   controlsEnabled: true,
// });

// setTick(() => {
//   const { coords } = LocalPlayer;
//   progress.draw();

//   if (camera.isActive) {
//     DisableAllControlActions(0);
//     camera.target = coords;
//     camera.update();
//   }

//   const newCoords = Client.Camera.gameplayCamCoords;
//   camCoords = camCoords.mul(0.9).add(newCoords.mul(0.1));

//   cam.coords = camCoords;
//   cam.rotation = Client.Camera.gameplayCamRot;
// });

// (async () => {
// const ESX = await Core.ESX.init();

// LocalPlayer.events.on('money-set', (account, amount) => {
//   Log.warn(`Money set ${account}: ${amount}`);
// });

// LocalPlayer.events.on('money-add', (account, amount, newAmount) => {
//   Log.info(`Money add ${account}: ${amount} ${newAmount}`);
// });

// LocalPlayer.events.on('money-sub', (account, amount, newAmount) => {
//   Log.info(`Money sub ${account}: ${amount} ${newAmount}`);
// });

// setTick(async () => {
//   await Delay(1000);
//   Log.debug(getInstructionalButtonText('+inventory'));
// });

// Delay(1000).then(async () => {
// ESX.ShowNotification('ESX запущен!');

// const val = GetControlInstructionalButton(2, GetHashKey('+inventory') | 0x80000000, true);
// Log.debug('VALUE', val);

// for (let i = 0; i < 100; i += 1) {
//   await LocalPlayer.ped.fadeOut(true, false);
//   await LocalPlayer.ped.fadeIn(true, false);
// }
// camera.start();

// cam.coords = LocalPlayer.ped.coords.addXYZ(0.1, 0.1, 0.1);
// cam.coords = camCoords;
// cam.start();
// await Delay(10000);
// cam.stop();
//  });
// })();
