import { LocalPlayer, PedConfigFlag, VehicleSeat } from '@nova/engine-lib/client/Game';
import { Delay } from '@nova/engine-lib/shared';

let disableShuffle = true;

function disableSeatShuffle(flag) {
  disableShuffle = flag;
}

setTick(() => {
  const { ped } = LocalPlayer;

  if (ped.isInAnyVehicle() && disableShuffle) {
    const { vehicle } = ped;
    if (vehicle.getPedInVehicleSeat(VehicleSeat.FRONT_PASSENGER)) {
      if (GetIsTaskActive(ped.handle, 165)) {
        ped.setIntoVehicle(vehicle, VehicleSeat.FRONT_PASSENGER);
        ped.setConfigFlag(PedConfigFlag.PreventAutoShuffleToDriversSeat, true);
      }
    }
  }
});

onNet('SeatShuffle', async () => {
  const { ped } = LocalPlayer;
  if (ped.isInAnyVehicle(false)) {
    ped.setConfigFlag(PedConfigFlag.PreventAutoShuffleToDriversSeat, false);
    disableSeatShuffle(false);
    await Delay(5000);
    disableSeatShuffle(true);
  } else {
    CancelEvent();
  }
});

// FIXME: shuff command
// RegisterCommand("shuff", function(source, args, raw) --change command here
//     TriggerEvent("SeatShuffle")
// end, false) //False, allow everyone to run it
