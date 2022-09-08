import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { NUI } from '@nova/engine-lib/client/UI';
import { playATMAnimIn, playATMAnimOut } from './anims';
import State from './State';

export function showBank(zone): void {
  if (State.isShown) return;
  State.isShown = true;
  State.ATMEntity = zone.atm;

  if (zone.atm) {
    playATMAnimIn(LocalPlayer.ped, zone.atm).then(() => {
      TriggerEvent('nova-ui:showBank', null);
    });
  } else {
    TriggerEvent('nova-ui:showBank', zone);
  }
  /*
      TriggerScreenblurFadeIn(500.0)
      SetNuiFocus(true, true)
  
      ESX.TriggerServerCallback('esx:getPlayerData', function(data)
          SendNUIMessage({
              showMenu = true,
              player = {
                  money = data.money,
                  accounts = data.accounts,
              }
          })
  
          ESX.TriggerServerCallback("atm:get_transactions", function(transactions)
              SendNUIMessage({
                  setTransactions = true,
                  transactions = transactions,
              })
          end)
      end)
  */
}

export function hideBank(): void {
  if (!State.isShown) return;

  TriggerEvent('nova-ui:CloseScreen', 'bank');

  if (State.ATMEntity) {
    playATMAnimOut(LocalPlayer.ped);
  }

  State.isShown = false;
  State.ATMEntity = null;
  State.BankZone = null;

  TriggerScreenblurFadeOut(500.0);
}

// close the menu when script is stopping to avoid being stuck in NUI focus
on('onResurceStop', resource => {
  if (resource == GetCurrentResourceName()) {
    hideBank();
  }
});

on('nova-ui:change_screen', screen => {
  if (!screen) {
    hideBank();
  }
});
