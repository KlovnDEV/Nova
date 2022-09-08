// import { Entity } from './Entity';

// export type LiquidInfo = {
//   name: string;
//   amount: number;
// }

// export class VehicleLiquid {
//   vehicle: Entity;
//   max: number;

//   constructor(vehicle: Entity) {
//     this.vehicle = vehicle;

//     const model = this.vehicle.model;
//     if (model == GetHashKey('tanker')) this.max = 11000;
//     else this.max = 0;
//   }

//   get current(): LiquidInfo {
//     return this.vehicle.state['liquid'] || { name: 'none', amount: 0 };
//   }

//   set(name: string, amount: number) {
//     this.vehicle.state['liquid'] = { name, amount };
//   }

//   add(name: string, amount: number): boolean {
//     if (amount < 0) return false;

//     const current = this.current;

//     if (current.name != name && current.amount > 0) {
//         return false;
//     }

//     if (current.amount + amount > this.max) return false;

//     this.set(name, amount + current.amount);
//     return true;
//   }

//   sub(name: string, amount: number): boolean {
//     if (amount < 0) return false;

//     const current = this.current;

//     if (current.amount < amount) return false;

//     this.set(name, current.amount - amount);
//     return true;
//   }

// }
