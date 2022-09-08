import { Delay } from '../../shared';
import { Sprite } from './Sprite';

export class CircularProgress extends Sprite {
  value: number = 0;
  private duiObj = null;

  constructor(props: Partial<Sprite>) {
    super(props);
    this.init();
  }

  async init() {
    this.duiObj = CreateDui('nui://EngineLib/html/progress.html', 256, 256);
    for (let i = 1; i < 60; i+=1) {
		if (IsDuiAvailable(this.duiObj)) break;
		await Delay(1)
    }

	if (!IsDuiAvailable(this.duiObj)) throw new Error('DUI unavailable');

    const handle = GetDuiHandle(this.duiObj)

    const txdHandle = CreateRuntimeTxd(this.textureDict)
    CreateRuntimeTextureFromDuiHandle(txdHandle, this.textureName, handle)

  }

  destroy() {
    SetStreamedTextureDictAsNoLongerNeeded(this.textureDict)
	DestroyDui(this.duiObj)
  }

}
