import { Control, Controls } from '../Input';
import { Vector3 } from '../../shared';
import { LocalPlayer } from '../Game';

export class Spot {
  private _entered = false;
  private _lazy = 0;
  private _distance = 10000;

  constructor(props: Partial<Spot>) {
    Object.assign(this, props);
  }

  radius: number;
  notificationText: string;
  onEnter: () => void;
  onExit: () => void;
  onPress: () => void;
  onTick: (coords: Vector3) => void;

  get entered(): boolean {
    return this._entered;
  }

  update(coords: Vector3): void {
    if (this._lazy > 0) {
      this._lazy -= 1;
    } else {
      this._distance = LocalPlayer.coords.distanceTo(coords);
      this._lazy = 10;
    }
    
    const distance = this._distance;

    // События входа-выхода из спота
    if (distance < this.radius) {
      if (this.onTick) this.onTick(coords);

      if (!this._entered) {
        this._entered = true;
        if (this.onEnter) this.onEnter();
      }

      if (this.notificationText) {
        AddTextEntry('spotHelpNotification', this.notificationText)
        DisplayHelpTextThisFrame('spotHelpNotification', false)
      }

      if (Control.JustReleased(Controls.PICKUP)) {
        if (this.onPress) this.onPress();
      }
    } else {
      if (this._entered) {
        this._entered = false;
        if (this.onExit) this.onExit();
      }
    }

  }
}
