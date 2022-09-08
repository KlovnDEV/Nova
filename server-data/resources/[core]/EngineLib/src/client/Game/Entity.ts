import { Delay } from '../../shared';
import { Vector3 } from '../../shared/Math';
import { Decor } from './Decor';

export class Entity {
  handle: number;
  decor: Decor;
  // state: StateBagInterface;

  constructor(handle: number) {
    this.handle = handle;
    this.decor = new Decor(this.handle);
    // this.state = global.Entity(this.handle).state;
  }

  get state(): StateBagInterface {
    return global.Entity(this.handle).state;
  }

  remove(): void {
    throw new Error('Method not implemented!');
  }

  get exist(): boolean {
    return !!DoesEntityExist(this.handle);
  }

  get coords(): Vector3 {
    const coords = GetEntityCoords(this.handle, false);
    if (!coords) return null;
    return new Vector3(coords[0], coords[1], coords[2]);
  }

  set coords(coords: Vector3) {
    SetEntityCoords(this.handle, coords.x, coords.y, coords.z, true, false, false, false);
  }

  setCoordsNoOffset(coords: Vector3) {
    SetEntityCoordsNoOffset(this.handle, coords.x, coords.y, coords.z, true, false, false);
  }

  async fadeIn(normal: boolean = true, slow: boolean = false) {
    Citizen.invokeNative('0x1F4ED342ACEFE62D', this.handle, normal, slow);
    // В типах не хватает аргумента
    //NetworkFadeInEntity(this.handle, normal);

    // время анимации зависит от флагов
    if (normal) {
      await Delay(slow ? 3500 : 600);
    } else {
      await Delay(slow ? 3600 : 400);
    }
  }

  async fadeOut(normal: boolean = true, slow: boolean = false) {
    NetworkFadeOutEntity(this.handle, normal, slow);

    if (normal) {
      await Delay(slow ? 900 : 1000);
    } else {
      await Delay(slow ? 500 : 500);
    }
  }

  set freezePosition(value: boolean) {
    FreezeEntityPosition(this.handle, value);
  }

  get rotation(): Vector3 {
    return Vector3.FromArray(GetEntityRotation(this.handle, 0));
  }

  set rotation(rotation: Vector3) {
    SetEntityRotation(this.handle, rotation.x, rotation.y, rotation.z, 0, false);
  }

  get alpha(): number {
    return GetEntityAlpha(this.handle);
  }

  set alpha(value: number) {
    this.setAlpha(value, true);
  }

  setAlpha(value: number, skin: boolean = false) {
    SetEntityAlpha(this.handle, value, skin);
  }

  set invincible(value: boolean) {
    SetEntityInvincible(this.handle, value);
  }

  get dynamic(): boolean {
    return !IsEntityStatic(this.handle);
  }

  set dynamic(dynamic: boolean) {
    SetEntityDynamic(this.handle, dynamic);
  }

  get heading(): number {
    return GetEntityHeading(this.handle);
  }

  set heading(heading: number) {
    SetEntityHeading(this.handle, heading);
  }

  get health(): number {
    return GetEntityHealth(this.handle);
  }

  set health(health: number) {
    SetEntityHealth(this.handle, health);
  }

  get speed(): number {
    return GetEntitySpeed(this.handle);
  }

  get boneCount(): number {
    return GetEntityBoneCount(this.handle);
  }

  get canBeDamaged(): boolean {
    return GetEntityCanBeDamaged(this.handle);
  }

  get collisionDisabled(): boolean {
    return GetEntityCollisionDisabled(this.handle);
  }

  get heightAboveGround(): number {
    return GetEntityHeightAboveGround(this.handle);
  }

  get lodDist(): number {
    return GetEntityLodDist(this.handle);
  }

  get maxHealth(): number {
    return GetEntityMaxHealth(this.handle);
  }

  set maxHealth(health: number) {
    SetEntityMaxHealth(this.handle, health * 1.0);
  }

  get model(): number {
    return GetEntityModel(this.handle);
  }

  get physicsHeading(): number {
    return GetEntityPhysicsHeading(this.handle);
  }

  get pitch(): number {
    return GetEntityPitch(this.handle);
  }

  get populationType(): number {
    return GetEntityPopulationType(this.handle);
  }

  get roll(): number {
    return GetEntityRoll(this.handle);
  }

  get submergedLevel(): number {
    return GetEntitySubmergedLevel(this.handle);
  }

  get entityType(): number {
    return GetEntityType(this.handle);
  }

  get uprightValue(): number {
    return GetEntityUprightValue(this.handle);
  }

  get visible(): boolean {
    return IsEntityVisible(this.handle);
  }

  set visible(value: boolean) {
    SetEntityVisible(this.handle, value, false);
  }

  get isUpsidedown() {
    return IsEntityUpsidedown(this.handle);
  }

  get isInWater(): boolean {
    return IsEntityInWater(this.handle);
  }

  get isOnScreen(): boolean {
    return IsEntityOnScreen(this.handle);
  }

  get isDead(): boolean {
    return IsEntityDead(this.handle);
  }

  get isInAir(): boolean {
    return IsEntityInAir(this.handle);
  }

  get isAttached(): boolean {
    return IsEntityAttached(this.handle);
  }

  isAttachedToEntity(entity: Entity): boolean {
    return IsEntityAttachedToEntity(this.handle, entity.handle);
  }

  attachToEntity(
    entity: Entity,
    boneIndex: number,
    pos: Vector3,
    rot: Vector3,
    useSoftPinning: boolean,
    collision: boolean,
    isPed: boolean,
    vertexIndex: number,
    fixedRot: boolean,
  ): void {
    AttachEntityToEntity(
      this.handle,
      entity.handle,
      boneIndex,
      pos.x,
      pos.y,
      pos.z,
      rot.x,
      rot.y,
      rot.z,
      true,
      useSoftPinning,
      collision,
      isPed,
      vertexIndex,
      fixedRot,
    );
  }

  get isAttachedToAnyVehicle(): boolean {
    return IsEntityAttachedToAnyVehicle(this.handle);
  }

  get isAttachedToAnyPed(): boolean {
    return IsEntityAttachedToAnyPed(this.handle);
  }

  get isAttachedToAnyObject(): boolean {
    return IsEntityAttachedToAnyObject(this.handle);
  }

  get forwardVector(): Vector3 {
    return Vector3.FromArray(GetEntityForwardVector(this.handle));
  }

  get hasCollidedWithAnything(): boolean {
    return HasEntityCollidedWithAnything(this.handle);
  }

  get velocity(): Vector3 {
    return Vector3.FromArray(GetEntityVelocity(this.handle));
  }

  requestControl(): boolean {
    return NetworkRequestControlOfEntity(this.handle);
  }

  static get None(): Entity {
    return new Entity(0);
  }
}
