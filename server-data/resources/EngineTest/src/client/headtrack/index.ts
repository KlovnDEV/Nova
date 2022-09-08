import { PedConfigFlag, Players } from '@nova/engine-lib/client/Game';
import { Delay, Vector3 } from '@nova/engine-lib/shared';

const PlayerTargets = {};

let myheading = 0;
let mypitch = 0;

setTick(async () => {
  await Delay(100);
  const heading = GetGameplayCamRelativeHeading();
  const pitch = GetGameplayCamRelativePitch();

  if (Math.abs(heading - myheading) > 5.0 || Math.abs(pitch - mypitch) > 1.0) {
    myheading = heading;
    mypitch = pitch;
    TriggerServerEvent('headtrack:update', -Sin(heading) * 10, Cos(heading) * 10, pitch);
  }
});

setTick(() => {
  Players.All().forEach(player => {
    const { ped } = player;
    const target = PlayerTargets[player.handle];

    if (ped.exist && target) {
      const isAiming = ped.getConfigFlag(PedConfigFlag.IsAimingGun);
      if (!isAiming) {
        SetIkTarget(ped.handle, 1, PlayerPedId(), 0, target.x, target.y, target.z, 0, 100, 100);
      }
    }
  });
});

onNet('headtrack:update', function (serverid, x, y, z) {
  const player = GetPlayerFromServerId(serverid);
  PlayerTargets[player] = new Vector3(x, y, z);
});
