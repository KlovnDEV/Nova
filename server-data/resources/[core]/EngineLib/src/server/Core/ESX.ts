import { Delay, Static } from "../../shared";

export let ESX = null;

export async function ESXInit() {
    while (!ESX) {
      emit('esx:getSharedObject', obj => { ESX = obj; });
      await Delay(100);
    }

    return ESX;
  }

