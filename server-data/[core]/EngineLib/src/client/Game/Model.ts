import { Delay } from "../Utils";

export class Model {
  hash: number;

  constructor(name: string| number) {
    this.hash = typeof(name) == 'string' ? GetHashKey(name) : name;
  }

  /**
   * 
   * @param timeout in ms
   */
  async load(timeout: number = 0): Promise<boolean> {

    const time1 = GetGameTimer();

    if (!this.exist) return false;

    while (!this.loaded) {
      RequestModel(this.hash)
      if (timeout && GetGameTimer() - time1 > timeout)
      await Delay(0);
    }

    return this.valid;
  }

  get exist() {
    return IsModelInCdimage(this.hash);
  }

  get loaded() {
    return HasModelLoaded(this.hash);
  }

  get valid(): boolean {
    return IsModelValid(this.hash);
  }

  noLongerNeeded() {
    SetModelAsNoLongerNeeded(this.hash);
  }
}

Model.prototype.toString = function(): string {
  return this.hash;
}