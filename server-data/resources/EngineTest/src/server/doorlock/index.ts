import { Players } from '@nova/engine-lib/server/Game';
import { Log } from '@nova/engine-lib/shared';
// import Config from '../../config/doorlock';

const doorInfo = {};

onNet('doorlock:updateState', (doorID, state) => {
  // FIXME: door filter
  // const player = Players.ByHandle(source);

  // if (!Config.DoorList[doorID]) {
  //   Log.error(`doorlock: ${player.identifier} attempted to update invalid door ${doorID}!`);
  //   return;
  // }

  doorInfo[doorID] = !!state;

  emitNet('doorlock:setState', -1, { [doorID]: state });
});

onNet('doorlock:getDoorInfo', () => {
  emitNet('doorlock:setState', source, doorInfo);
});
