
export class Entity {
  handle: number;
  state: StateBagInterface;

  constructor(handle: number) {
    this.handle = handle;
    this.state = global.Entity(this.handle).state;
  }

  get exist(): boolean {
    return !!DoesEntityExist(this.handle);
  }

  static get None(): Entity {
    return new Entity(0);
  }
}
