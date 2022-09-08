// import { Delay, Log } from "../../shared";
// import { Vector3 } from "../../shared";
// import { loadModel } from "../Utils";
// import { LocalPlayer } from "./LocalPlayer";
// import { Prop } from "./Prop";

// // const culledProps = {};

// export class CulledProp {
//   model: string;
//   coords: Vector3;
//   heading: number = 0;
//   cullDistance: number = 200;
//   spawned: boolean;
//   registered: boolean;

//   prop: Prop = new Prop(0);
//   private _currentDistance: number = 99999;

//   constructor(init: Partial<CulledProp>, understandTheConsequences = false) {
//     if (!understandTheConsequences) throw new Error('Attempt to instance class Player!');
//     Object.assign(this, init);
//   }

//   async spawn(): Promise<boolean> {
//     if (this.prop.exist) return false;
//     await loadModel(this.model);
  
//     this.prop = new Prop(CreateObjectNoOffset(this.model, this.coords.x, this.coords.y, this.coords.z, false, false, false));
//     this.prop.alpha = 0;
//     this.prop.freezePosition = true;

//     for (let i = 0; i < 255; i += 51) {
//       this.prop.alpha = i;
//       await Delay(0)
//     }

//     this.prop.alpha = 255;

//     SetModelAsNoLongerNeeded(this.model);
//     // await this.prop.fadeIn(false);

//     return this.prop.exist;
//   }

//   async despawn(): Promise<boolean> {
//     if (!this.prop.exist) return false;
//     // await this.prop.fadeOut(true, true);

//     for (let i = 255; i > 0; i -= 51) {
//       this.prop.alpha = i;
//       await Delay(0)
//     }

//     this.prop.alpha = 0;

//     this.prop.remove();

//     return true;
//   } 

//   async tick(playerCoords: Vector3) {
//     const distance = playerCoords.distanceTo(this.coords)
//     this._currentDistance = distance;

//     if (this.prop.exist) {
//       if (distance > this.cullDistance + 1 && !this.prop.isOnScreen) {
//         await this.despawn();
//       }  

//     } else {
//       if (distance < this.cullDistance) {
//         await this.spawn();
//       }
//     }
//   }

//   get distance() {
//     return this._currentDistance;
//   }

// }

// setTick(async () => {
//   await Delay(1000)
//   const coords = LocalPlayer.ped.coords;

//   Object.values<CulledProp>(culledProps).forEach(prop => {
//     prop.tick(coords);
//   });
// })

// onNet('engineLib:CulledProp:update', (resourceName, propInfo) => {
//   if (resourceName != GetCurrentResourceName()) return;

//   if (!culledProps[propInfo.id]) {
//     culledProps[propInfo.id] = new CulledProp(propInfo, true);
//   } else {
//     Object.assign(culledProps[propInfo.id], propInfo);
//   }

  
// })