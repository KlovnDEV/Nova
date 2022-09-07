import { Control, Controls } from '../Input';
import { Log, Vector3 } from '../../shared';
import { LocalPlayer } from '../Game';

const markerTypeOffsets = {
  1: -0.96,
  8: -0.96,
  9: -0.96,
  23: -0.96,
  25: -0.96,
  26: -0.96,
  27: -0.96,
  43: -0.96,
};

export class Marker {
  private coordZOffset = 0;
  private _alpha = 0;
  private _markerType = 1;
  private _entered = false;
  private _lazy = 0;
  private _distance = 10000;

  static _playerPos: Vector3;

  constructor(props: Partial<Marker>) {
    props.markerType ??= 1
    Object.assign(this, props);
  }

  get entered(): boolean {
    return this._entered;
  }

  get markerType(): number {
    return this._markerType;
  }

  set markerType(markerType: number) {
    this._markerType = (markerType >= 0 && markerType <= 43) ? markerType : 1;
    this.coordZOffset = markerTypeOffsets[this._markerType] || 0;
  }

  coords: Vector3;
  direction: Vector3 = new Vector3(0, 0, 0);
  rotation: Vector3 = new Vector3(0, 0, 0);
  scale: Vector3 = new Vector3(1, 1, 1);
  color: [number, number, number] = [0, 64, 255];
  alpha = 100;
  bob = false;
  faceCamera = true;
  rotate = false;
  textureDict: string = null;
  textureName: string = null;
  drawOnEntities: boolean = false;
  drawDistance: number = 20;
  notificationText: string;
  onEnter: () => void;
  onExit: () => void;
  onPress: () => void;

  //   triggerDistance: number;
  //   skipFrames: number;

  draw(): void {
    let desiredAlpha = this.alpha;
    // Плавно уводим альфу в 0 при выходе из drawDistance

    if (this._lazy > 0) {
      this._lazy -= 1;
    } else {
      this._distance = LocalPlayer.coords.distanceTo(this.coords);
      this._lazy = 10;
    }

    const distance = this._distance;

    if (this.drawDistance && distance > this.drawDistance) {
      desiredAlpha = 0;
    }

    this._alpha = this._alpha * 0.98 + desiredAlpha * 0.02;

    // События входа-выхода из маркера
    if (distance < this.scale.x) {
      if (!this._entered) {
        this._entered = true;
        if (this.onEnter) this.onEnter();
      }

      if (this.notificationText) {
        AddTextEntry('markerHelpNotification', this.notificationText)
        DisplayHelpTextThisFrame('markerHelpNotification', false)
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

    if (this._alpha < 0.001) return;

    DrawMarker(
      this.markerType,

      this.coords.x,
      this.coords.y,
      this.coords.z + this.coordZOffset,

      this.direction.x,
      this.direction.y,
      this.direction.z,

      this.rotation.x,
      this.rotation.y,
      this.rotation.z,

      this.scale.x,
      this.scale.y,
      this.scale.z,

      this.color[0],
      this.color[1],
      this.color[2],

      Math.floor(this._alpha),
      this.bob,

      this.faceCamera,
      2, // p19
      this.rotate,

      this.textureDict,
      this.textureName,
      this.drawOnEntities,
    );
  }
}
