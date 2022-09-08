import { assert } from '../../shared';
import { Vector3 } from '../../shared/Math/Vector3';
export class Camera {
  handle: number = -1;

  private _coords: Vector3;
  private _rot: Vector3;

  constructor(props: Partial<Camera>) {}

  start() {

    assert(this.coords, 'Camera coordinates must be provided');

    if (!this.isActive) {
      this.handle = CreateCam('DEFAULT_SCRIPTED_CAMERA', true)
    }
  
    SetCamCoord(this.handle, this._coords.x, this._coords.y, this._coords.z);
    RenderScriptCams(true, true, 0, true, true)
    SetCamActive(this.handle, true)
  }

  stop() {
    if (this.isActive) {
      SetCamActive(this.handle, false)
      RenderScriptCams(false, true, 500, true, true)
      DestroyCam(this.handle, true)
      this.handle = -1;
    }
  }

  get isActive() {
    return this.handle >= 0 && DoesCamExist(this.handle)
  }

  get coords(): Vector3 {
    return this._coords;
  }

  set coords(coords: Vector3) {
    this._coords = coords;
    if (this.isActive) SetCamCoord(this.handle, coords.x, coords.y, coords.z);
  }

  get rotation(): Vector3 {
    return this._rot;
  }

  set rotation(rotation: Vector3) {
    this._rot = rotation;
    if (this.isActive) SetCamRot(this.handle, rotation.x, rotation.y, rotation.z, 0);
  }

  static get gameplayCamCoords() {
    const v3 = GetGameplayCamCoord()
    return new Vector3(v3[0], v3[1], v3[2]);
  }
  
  static get gameplayCamRot(): Vector3 {
    return Vector3.FromArray(GetGameplayCamRot(0));
  }

}
