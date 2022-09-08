import { Vector3 } from '../../shared/Math';
import { Entity } from '../Game/Entity';

type BlipSprite = number;

export class Blip {
  handle: number;

  constructor(opts: Partial<Blip> & { entity?: Entity, radius?: number, area?: { width: number, height: number}}) {

    if (opts.entity) {
      this.handle = AddBlipForEntity(opts.entity.handle);
    } else if (opts.radius) {
      this.handle = AddBlipForRadius(opts.coords.x, opts.coords.y, opts.coords.z, opts.radius);
    } else if (opts.area) {
      this.handle = AddBlipForArea(opts.coords.x, opts.coords.y, opts.coords.z, opts.area.width, opts.area.height);
    } else if (opts.coords) {
      this.handle = AddBlipForCoord(opts.coords.x, opts.coords.y, opts.coords.z);
    } else {
      throw new Error('Incorrect blip constructor usage!');
    }

    if (!this.exist) throw new Error('Unable to create blip!');

    // default values
    opts.display = 4;
    opts.shortRange = true;

    Object.assign(this, opts);
  }

  get coords(): Vector3 {
    return Vector3.FromArray(GetBlipCoords(this.handle))
  }

  set coords(coords: Vector3) {
    SetBlipCoords(this.handle, coords.x, coords.y, coords.z)
  }

  get sprite(): BlipSprite {
    return GetBlipSprite(this.handle);
  }

  set sprite(sprite: BlipSprite) {
    SetBlipSprite(this.handle, sprite);
  }

  get exist() {
    return DoesBlipExist(this.handle);
  }

  get color(): number {
    return GetBlipColour(this.handle);
  }

  set color(color: number) {
    SetBlipColour(this.handle, color)
  }

  get alpha(): number {
    return GetBlipAlpha(this.handle)
  }

  set alpha(alpha: number) {
    SetBlipAlpha(this.handle, alpha)
  }

  set display(display: number) {
    SetBlipDisplay(this.handle, display)
  }

  set scale(scale: number) {
    SetBlipScale(this.handle, scale)
  }

  set friendly(friendly: boolean) {
    SetBlipFriendly(this.handle, friendly)
  }

  set bright(bright: boolean) {
    SetBlipBright(this.handle, bright)
  }

  set category(category: number) {
    SetBlipCategory(this.handle, category)
  }

  set displayIndicator(display: boolean) {
    SetBlipDisplayIndicatorOnBlip(this.handle, display)
  }

  set hiddenOnLegend(hidden: boolean) {
    SetBlipHiddenOnLegend(this.handle, hidden)
  }

  set rotation(rotation: number) {
    SetBlipRotation(this.handle, Math.ceil(rotation))
  }

  get shortRange(): boolean {
    return IsBlipShortRange(this.handle)
  }

  set shortRange(shortRange: boolean) {
    SetBlipAsShortRange(this.handle, shortRange)
  }

  set text(text: string) {
    BeginTextCommandSetBlipName('STRING')
		AddTextComponentSubstringPlayerName(text)
		EndTextCommandSetBlipName(this.handle)
  }

  set showHeading(show: boolean) {
    ShowHeadingIndicatorOnBlip(this.handle, show)
  }

  remove(): boolean {
    if (!this.exist) return false;
    RemoveBlip(this.handle);
    return true;
  }
}
