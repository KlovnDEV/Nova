import { Input } from '../';
import { Vector2 } from '../../shared';
import { Vector3 } from '../../shared/Math/Vector3';
import { LocalPlayer } from '../Game';
import { loadTextureDict } from '../Utils';

export class Sprite {
  private _alpha = 0.0;
  private _lazy = false;
  private _lazy_skip = 0;

  constructor(props: Partial<Sprite>) {
    Object.assign(this, props);
  }

  coords: Vector3;
  heading: number = 0.0;
  scale: Vector2 = Vector2.FromArray([1.0, 1.0]);
  color: [number, number, number] = [255, 255, 255];
  alpha = 255;

  textureDict: string = null;
  textureName: string = null;

  //   distanceFade: boolean = false;
  drawDistance: number = 20;

  /*
  function Sprite3DClass:alphaDefault(dist, speed)
	if dist < self.drawDistance then
		if (self.actualAlpha+speed) <= self.alpha then
			self.actualAlpha = self.actualAlpha + speed
		elseif (self.actualAlpha-speed) >= self.alpha then
			self.actualAlpha = self.actualAlpha - speed
		else
			self.actualAlpha = self.alpha
		end
	else
		if self.actualAlpha >= speed then
			self.actualAlpha = self.actualAlpha - speed
		else
			self.actualAlpha = 0
		end
	end
	return self.actualAlpha
end

function Sprite3DClass:alphaDistanceFade(dist)
	self.actualAlpha = math.ceil((1-dist/self.drawDistance)*self.alpha)
	return self.actualAlpha
end

  */

  draw(): void {
    let desiredAlpha = this.alpha;

    // Плавно уводим альфу в 0 при выходе из drawDistance
    const distance = LocalPlayer.coords.distanceTo(this.coords);
    if (this.drawDistance && distance > this.drawDistance) {
      desiredAlpha = 0;
    }

    this._alpha = this._alpha * 0.98 + desiredAlpha * 0.02;

    if (!this._alpha) return;

    // assert(playerCoords)

    if (this._lazy && this._lazy_skip > 0) {
      this._lazy_skip = this._lazy_skip - 1;
      return;
    }

    // if (this.distanceFade) {
    // 	self:alphaDistanceFade(dist)
    // } else {
    // 	self:alphaDefault(dist, 10)
    // }

    if (this._alpha <= 0) {
      this._lazy = true;
      this._lazy_skip = 5;
      return;
    }

    loadTextureDict(this.textureDict).then(() => {
      const aspect = GetAspectRatio(true);

      let scalex = this.scale.x / (1 + distance);
      let scaley = (this.scale.y * aspect) / (1 + distance);
  
      if (scalex < 0.001) {
        return;
      }

      //		const onscreen, x, y = GetScreenCoordFromWorldCoord(this.pos.x, this.pos.y, this.pos.z)
  
      //		if not onscreen) {
      //			return
      //		}
      const x = 0;
      const y = 0;
  
      // SetDrawOrigin allows to draw up to 32 sprites at the time
      SetDrawOrigin(this.coords.x, this.coords.y, this.coords.z, 0);
  
      DrawSprite(
        this.textureDict,
        this.textureName,
        x, // offsetx
        y, // offsety
        scalex,
        scaley,
        this.heading,
        this.color[0],
        this.color[1],
        this.color[2],
        Math.ceil(this._alpha),
      );
  
      ClearDrawOrigin();
    })


  }
}
