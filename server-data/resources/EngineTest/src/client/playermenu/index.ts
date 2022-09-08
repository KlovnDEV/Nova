import { LocalPlayer, Vehicle } from '@nova/engine-lib/client/Game';
import { Menu, MenuElement, showNotification } from '@nova/engine-lib/client/UI';
import { Control, Keys } from '@nova/engine-lib/client/Input';
import { Vector2 } from '@nova/engine-lib/shared';

async function teleportToWaypoint() {
  const blip = GetFirstBlipInfoId(8);
  const { ped } = LocalPlayer;
  if (blip > 0) {
    await ped.fadeOut();

    const coords = GetBlipInfoIdCoord(blip);
    await ped.teleportXY(new Vector2(coords[0], coords[1]));

    await ped.fadeIn();
  } else {
    showNotification('Точка не установлена');
  }
}

function openAdminMenuVehicle() {
  let { vehicle } = LocalPlayer.ped;
  if (!vehicle.exist) {
    vehicle = Vehicle.getClosest(LocalPlayer.ped.coords, 5.0);
    if (!vehicle.exist) return;
  }

  const { handle } = vehicle;
  // const plate = vehicle.plateText;

  const elements = [
    { label: 'Починить', value: 'repair' },
    { label: 'Вскрыть замки', value: 'unlock' },
  ];

  const menu = new Menu({
    name: 'admin_menu_vehicle',
    title: 'Администрирование: Транспорт',
    position: 'tr',
    elements,
    onBack: () => {
      menu.hide();
    },
    onClick: cmd => {
      menu.hide();
      if (cmd == 'repair') {
        SetVehicleFixed(handle);
        SetVehicleDeformationFixed(handle);
        SetVehicleUndriveable(handle, false);
        SetVehicleEngineOn(handle, true, true, false);
      } else if (cmd == 'unlock') {
        SetVehicleDoorsLocked(handle, 1);
        SetVehicleDoorsLockedForAllPlayers(handle, false);
      }
    },
  }).show();
}

function openAdminMenu() {
  const elements: MenuElement[] = [];

  elements.push({ label: 'Телепорт', value: 'teleport' });
  elements.push({ label: 'Транспорт', value: 'transport' });

  const menu = new Menu({
    name: 'admin_menu',
    title: 'Администрирование',
    position: 'tr',
    elements,

    onClick: cmd => {
      menu.hide();

      if (cmd == 'teleport') {
        teleportToWaypoint().catch(() => {
          LocalPlayer.ped.fadeIn();
          showNotification('Перемещение не удалось!');
        });
      }

      if (cmd == 'transport') {
        openAdminMenuVehicle();
      }
    },

    onBack: () => {
      TriggerEvent('nova-ui:menu_hide');
    },
  });

  menu.show();
}

setTick(() => {
  if (Control.JustReleased(Keys.F11)) {
    openAdminMenu();
  }
});
