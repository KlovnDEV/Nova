import { LocalPlayer } from '@nova/engine-lib/client/Game';
import { Log, Static } from '@nova/engine-lib/shared';
import Config from '../../config/tattoo';

export class Skin extends Static {
  static setNaked(): void {
    const { sex } = LocalPlayer.identity;
    // emit('skin:getSkin', skin => {
    emit('skin:loadClothes', sex == 0 ? Config.Skin.male : Config.Skin.female);
    // });
  }

  static reset(): void {
    Log.info('reset');
    emitNet('clothes:update');
    // emit('skin:getSkin', skin => {
    //   Log.info(skin);
    //   emitNet('skin:loadSkinAndClothes', skin, skin);
    //   // emit('skin:loadClothes', null);
    // });
  }
}
