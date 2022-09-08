import { DB } from '@nova/engine-lib/server/DB';
import { Log } from '@nova/engine-lib/shared';

let tattooList;

(async () => {
  tattooList = await DB.Query('tattoo/list', {});
})();

onNet('engine:openTattooShop', shopid => {
  emitNet('engine:openTattooShop', source, shopid, tattooList);
});
