/* Не расходует деньги */
import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { showNotification } from '@nova/engine-lib/client/UI';
import Config from '../../config/carwash';

import Markers from './markers';

async function wash() {
  const { vehicle } = LocalPlayer.ped;
  if (!vehicle || !vehicle.isDriver(LocalPlayer.ped)) return false;

  if (vehicle.dirtLevel <= 2) {
    showNotification('Ваш транспорт уже чист!');
    return false;
  }

  const success = await LocalPlayer.pay(['cash', 'bank'], Config.Price, 'carwash');

  if (!success) {
    showNotification('Недостаточно средств!');
    return false;
  }

  vehicle.dirtLevel = 0.1;

  showNotification(`Ваш транспорт был помыт за ~g~$${Config.Price}~s~`);

  return true;
}

const markers = new Markers(wash);

setTick(async () => {
  markers.draw();
});
