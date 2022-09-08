import { Vector3 } from '../../shared/Math/Vector3';
import { Camera } from './Camera';
import { Controls, DisabledControl } from '../Input';

export class TargettedCamera {
  target: Vector3;
  camera: Camera;

  minDistance = 0.0;
  maxDistance = 1.0;
  heading = 0.0;
  camZoom = 0.5;
  controlsEnabled = false;

  get isActive(): boolean {
    return this.camera?.isActive;
  }

  constructor(props: Partial<Camera | TargettedCamera>) {
    this.camera = new Camera(props);
    Object.assign(this, props);
  }

  start() {
    //const startAngle = Camera.gameplayCamRot.z - this.target.rotation.z - 90;
    this.camera.coords = this.target;

    this.camera.start();
  }

  stop() {
    this.camera.stop();
  }

  skinCamControls() {
    var frameTime = GetFrameTime();

    if (DisabledControl.Pressed(Controls.WEAPON_WHEEL_NEXT, 24)) {
      this.camZoom += 20.0 * frameTime;
    } else if (DisabledControl.Pressed(Controls.WEAPON_WHEEL_PREV, 24)) {
      this.camZoom -= 20.0 * frameTime;
    }

    if (DisabledControl.Pressed(Controls.AIM)) {
      this.heading -= DisabledControl.Normal(Controls.LOOK_LR) * frameTime * 2000.0;
    }

    if (DisabledControl.Pressed(Controls.MOVE_LEFT_ONLY)) {
      this.heading -= frameTime * 200.0;
    } else if (DisabledControl.Pressed(Controls.MOVE_RIGHT_ONLY)) {
      this.heading += frameTime * 200.0;
    }
  }

  update() {
    if (!this.camera.isActive) return;

    if (this.controlsEnabled) {
      this.skinCamControls();
    }

    if (this.heading > 360) this.heading -= 360;
    if (this.heading < 0) this.heading += 360;

    if (this.camZoom < 0) this.camZoom = 0;
    else if (this.camZoom > 1) this.camZoom = 1;

    var angle = (this.heading * Math.PI) / 180.0;
    var theta = [Math.cos(angle), Math.sin(angle), 0];

    var distance = this.minDistance + (this.maxDistance - this.minDistance) * this.camZoom;

    this.camera.coords = this.target.addXYZ(distance * theta[0], distance * theta[1], 0);
    
    PointCamAtCoord(this.camera.handle, this.target.x, this.target.y, this.target.z);
  }
}
