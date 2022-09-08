import { loadModel } from '../Utils';
import { Vector2, Vector3 } from '../../shared/Math';
import { Delay, promiseTimeout } from '../../shared/Utils';
import { Vehicle, VehicleSeat } from './Vehicle';
import { Entity } from './Entity';
import { PedTasks } from './PedTasks';
import { PedWeapon } from './PedWeapon';
import { PedDecoration } from './PedDecoration';

export * from './PedTasks';

export enum PedTypes {
  PLAYER_0 = 0,
  PLAYER_1 = 1,
  PLAYER_2 = 3,
  CIVMALE = 4,
  CIVFEMALE = 5,
  COP = 6,
  UNKNOWN_7 = 7,
  UNKNOWN_12 = 12,
  UNKNOWN_19 = 19,
  MEDIC = 20,
  FIREMAN = 21,
  UNKNOWN_22 = 22,
  UNKNOWN_25 = 25,
  UNKNOWN_26 = 26,
  SWAT = 27,
  ANIMAL = 28,
  ARMY = 29,
};

export enum ParachuteState {
  NORMAL = -1,
  WEAR = 0,
  OPENING = 1,
  OPEN = 2,
  FALL = 3,
};

export enum PedConfigFlag {
  NoCriticalHits = 2,
	DrownsInWater = 3,
	DisableReticuleFixedLockon = 4,
	UpperBodyDamageAnimsOnly = 7,
	NeverLeavesGroup = 13,
	BlockNonTemporaryEvents = 17,
	IgnoreSeenMelee = 24,
	DieWhenRagdoll = 33,
	HasHelmet = 34,
	UseHelmet = 35,
	DisableEvasiveDives = 39,
	DontInfluenceWantedLevel = 42,
	DisablePlayerLockon = 43,
	DisableLockonToRandomPeds = 44,
	PedBeingDeleted = 47,
	BlockWeaponSwitching = 48,
	IsFiring = 58,
	WasFiring = 59,
	IsStanding = 60,
	WasStanding = 61,
	InVehicle = 62,
	OnMount = 63,
	AttachedToVehicle = 64,
	IsSwimming = 65,
	WasSwimming = 66,
	IsSkiing = 67,
	IsSitting = 68,
	KilledByStealth = 69,
	KilledByTakedown = 70,
	Knockedout = 71,
	UsingCoverPoint = 75,
	IsInTheAir = 76,
	IsAimingGun = 78,
	ForcePedLoadCover = 93,
	VaultFromCover = 97,
	ForcedAim = 101,
	ForceReload = 105,
	BumpedByPlayer = 117,
	IsHandCuffed = 120,
	IsAnkleCuffed = 121,
	DisableMelee = 122,
	CanBeAgitated = 128,
	IsScuba = 135,
	WillArrestRatherThanJack = 136,
	RidingTrain = 138,
	ArrestResult = 139,
	CanAttackFriendly = 140,
	ShootingAnimFlag = 145,
	DisableLadderClimbing = 146,
	StairsDetected = 147,
	SlopeDetected = 148,
	CanPerformArrest = 155,
	CanPerformUncuff = 156,
	CanBeArrested = 157,
	IsInjured = 166,
	IsInCustody = 180,
	IsAgitated = 183,
	PreventAutoShuffleToDriversSeat = 184,
	EnableWeaponBlocking = 186,
	HasHurtStarted = 187,
	DisableHurt = 188,
	PlayerIsWeird = 189,
	UsingScenario = 194,
	VisibleOnScreen = 195,
	DisableExplosionReactions = 208,
	DodgedPlayer = 209,
	DontEnterLeadersVehicle = 220,
	DisablePotentialToBeWalkedIntoResponse = 225,
	DisablePedAvoidance = 226,
	DisablePanicInVehicle = 229,
	IsHoldingProp = 236,
	OnStairs = 253,
	OnStairSlope = 270,
	DontBlipCop = 272,
	ClimbedShiftedFence = 273,
	EdgeDetected = 276,
	AvoidTearGas = 279,
	RagdollingOnBoat = 287,
	HasBrandishedWeapon = 288,
	DisableShockingEvents = 294,
	DisablePedConstraints = 301,
	IsInCluster = 310,
	HasHighHeels = 322,
	DisableTalkTo = 329,
	DontBlip = 330,
	IsSwitchingWeapon = 331,
	EquipJetpack = 349,
	IsDuckingInVehicle = 359,
	HasReserveParachute = 362,
	UseReserveParachute = 363,
	NeverLeaveTrain = 374,
	IsClimbingLadder = 388,
	HasBareFeet = 389,
	IsHolsteringWeapon = 413,
	IsSwitchingHelmetVisor = 418,
	DisableVehicleCombat = 422,
	FallsLikeAircraft = 424,
	DisableStartEngine = 429,
	IgnoreBeingOnFire = 430,
	DisableHomingMissileLockon = 434,
	DisableHelmetArmor = 438,
	PedIsArresting = 450,
	IsDecoyPed = 451,
	CanBeIncapacitated = 456,
}

export class Ped extends Entity {
  public tasks: PedTasks;
  public weapon: PedWeapon;
  public decoration: PedDecoration;
  
  constructor(handle: number) {
    super(handle);
    this.tasks = new PedTasks(handle);
    this.weapon = new PedWeapon(handle);
    this.decoration = new PedDecoration(handle);
  }

  static FromEntity(entity: Entity): Ped {
    if (!IsEntityAPed(entity.handle)) {
      throw new Error('Unable to cast Entity to Ped!');
    }

    return new Ped(entity.handle);
  }

  async remove(): Promise<boolean> {
    if (!this.exist) return false;

    this.freezePosition = false;
    this.blockNonTemporaryEvents = false;
    this.invincible = false;

    this.fadeOut(true, false);

    await Delay(1000);

    DeletePed(this.handle);

    for (let i = 0; i < 1000; i++) {
      if (!this.exist) break;
      await Delay(10);
    }

    return true;
  }

  async teleport(coords: Vector3, heading?: number): Promise<boolean> {
    if (!this.exist) return;

    RequestCollisionAtCoord(coords.x, coords.y, coords.z);
    this.freezePosition = true;
    this.coords = coords;
    if (heading !== undefined) {
      this.heading = heading;
    }

    for (let i = 0; i < 30; i += 1) {
      if (HasCollisionLoadedAroundEntity(this.handle)) break;
      await Delay(0)
    }

    this.freezePosition = false;
  }

  async teleportXY(coords: Vector2, heading?: number): Promise<void> {
    const initialCoords = this.coords;

    for (let z = 1000; z > 1; z -= 10) {
      const targetCoords = coords.toVector3(z);
      await this.teleport(targetCoords);
  
      const [foundGround, foundZ] = GetGroundZFor_3dCoord(targetCoords.x, targetCoords.y, targetCoords.z, false);
  
      if (foundGround) {
        await this.teleport(coords.toVector3(foundZ), heading);
        return;
      }
    }

    this.coords = initialCoords;
    throw new Error(`Unable to locate Z-coord to teleport into: ${coords.toString()}`)
  }

  get alive(): boolean {
    return !IsPedDeadOrDying(this.handle, true);
  }

  get isOnFoot(): boolean {
    return IsPedOnFoot(this.handle);
  }

  get isSwimming(): boolean {
    return IsPedSwimming(this.handle);
  }

  get isSprinting(): boolean {
    return IsPedSprinting(this.handle);
  }

  get isRunning(): boolean {
    return IsPedRunning(this.handle);
  }

  get isStunned(): boolean {
    return IsPedBeingStunned(this.handle, 0);
  }

  get isFalling(): boolean {
    return IsPedFalling(this.handle);
  }
  
  get isDiving(): boolean {
    return IsPedDiving(this.handle);
  }

  get isLocal(): boolean {
    return this.handle == PlayerPedId();
  }
  
  isInCover(exceptUseWeapon: boolean = false): boolean {
    return IsPedInCover(this.handle, exceptUseWeapon);
  }

  get vehicle(): Vehicle {
    return this.getVehiclePedIsIn();
  }

  isInAnyVehicle(atGetIn: boolean = false): boolean {
    return IsPedInAnyVehicle(this.handle, atGetIn)
  }

  getVehiclePedIsIn(): Vehicle {
    return new Vehicle(GetVehiclePedIsIn(this.handle, false));
  }

  getVehiclePedWasIn(): Vehicle {
    return new Vehicle(GetVehiclePedIsIn(this.handle, true));
  }

  getVehiclePedIsTryingToEnter(): Vehicle {
    return new Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
  }

  setIntoVehicle(vehicle: Vehicle, seatIndex = VehicleSeat.ANY_PASSENGER) {
    SetPedIntoVehicle(this.handle, vehicle.handle, seatIndex);
  }

  public get health(): number {
    const health = super.health;
    if (health < 100) return 0;
    return health - 100;
  }

  public set health(health: number) {
    let value = health;
    if (value <= 0) value = -100;
    if (value > 100) value = 100;
    super.health = value + 100;
  }

  get injured(): boolean {
    return IsPedInjured(this.handle);
  }

  get isPlayer(): boolean {
    return IsPedAPlayer(this.handle);
  }

  get stealth(): boolean {
    return GetPedStealthMovement(this.handle);
  }

  set stealth(value: boolean) {
    SetPedStealthMovement(this.handle, value, null);
  }

  set blockNonTemporaryEvents(value: boolean) {
    SetBlockingOfNonTemporaryEvents(this.handle, value);
  }

  get parachuteState(): ParachuteState {
    return GetPedParachuteState(this.handle);
  }

  get isInParachuteFreeFall(): boolean {
    return IsPedInParachuteFreeFall(this.handle);
  }

  isHeadingTowardsPosition(coords: Vector3, angle: number) {
    return IsPedHeadingTowardsPosition(this.handle, coords.x, coords.y, coords.z, angle);
  }

  getBoneIndex(boneId: number) {
    return GetPedBoneIndex(this.handle, boneId);
  }

  getConfigFlag(flagId: PedConfigFlag): boolean {
    return GetPedConfigFlag(this.handle, flagId, false);
  }

  setConfigFlag(flagId: PedConfigFlag, value: boolean) {
    return SetPedConfigFlag(this.handle, flagId, value);
  }

  static async Spawn(
    model: string,
    coords: Vector3,
    heading = 0,
    pedType: PedTypes = PedTypes.CIVMALE,
    isNetwork = true,
    netMissionEntity = false,
  ): Promise<Ped> {
    const promise = new Promise<Ped>((resolve, reject) => {
      setImmediate(async () => {
        await loadModel(model);

        const ped = new Ped(
          CreatePed(pedType, model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity),
        );

        SetModelAsNoLongerNeeded(model);

        if (!ped.exist) reject(new Error(`Ped не создан!`));

        resolve(ped);
      });
    });

    return promiseTimeout<Ped>(promise, 10000);
  }

  static get None(): Ped {
    return new Ped(0);
  }
}
