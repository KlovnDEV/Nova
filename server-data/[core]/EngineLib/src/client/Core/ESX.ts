import { Delay, Static } from "../../shared";

export class ESX extends Static {
  static instance = undefined;

  static async init() {
    while (!this.instance) {
      emit('esx:getSharedObject', obj => { this.instance = obj; });
      await Delay(100);
    }

    return this.instance;
  }
}

let instance = null;
(async () => {
    instance = await ESX.init();
})();

export default instance;