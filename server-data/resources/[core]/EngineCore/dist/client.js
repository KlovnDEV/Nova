/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Utils/index.js
class TimeoutError extends Error {
    constructor(message = 'Timeout error occurred') {
        super(message);
        this.name = "TimeoutError";
    }
}
const Utils_promiseTimeout = function (promise, ms = 10000) {
    // Create a promise that rejects in <ms> milliseconds
    const timeout = new Promise((resolve, reject) => {
        const id = setTimeout(() => {
            clearTimeout(id);
            reject(new Error(`Timed out in ${ms}ms.`));
        }, ms);
    });
    // Returns a race between our timeout and the passed in promise
    return Promise.race([promise, timeout]);
};
// export const Loop = function<T = any>(callback: () => any, step: number = 0, timeout: number = 0): Promise<T> {
//   let promiseResolve;
//   let promiseReject;
//   let tickId;
//   let timeoutId;
//   const lp = new Promise<T>((resolve, reject) => {
//     promiseResolve = resolve;
//     promiseReject = reject;
//   });
//   tickId = setTick(async() => {
//     if (step > 0) await Delay(step);
//     const res = await callback();
//     if (res !== undefined) {
//       if (timeoutId !== undefined) clearTimeout(timeoutId);
//       clearTick(tickId);
//       promiseResolve(res);
//     }
//   })
//   if (timeout > 0) {
//     timeoutId = setTimeout(() => {
//       if (tickId !== undefined) clearTick(tickId);
//       promiseReject();
//     }, timeout);
//   }
//   return lp;
// }
const Utils_assert = (value, message = '') => {
    if (!value)
        throw new Error(`ASSERT! ${message}`);
};
function Utils_Delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
async function WaitFor(func, pollDelay = 100, timeout = undefined) {
    let res = undefined;
    let timeSpent = 0;
    do {
        res = await func();
    } while (res === undefined);
    {
        await Utils_Delay(pollDelay);
        timeSpent += pollDelay;
        if (timeSpent >= timeout)
            throw new TimeoutError();
    }
    return res;
}
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Utils.js


async function loadAnimDict(dict) {
    if (!HasAnimDictLoaded(dict)) {
        RequestAnimDict(dict);
        while (!HasAnimDictLoaded(dict)) {
            // eslint-disable-next-line no-await-in-loop
            await Utils_Delay(0);
        }
    }
}
async function loadAnimSet(dict) {
    if (!HasAnimSetLoaded(dict)) {
        RequestAnimSet(dict);
        while (!HasAnimSetLoaded(dict)) {
            // eslint-disable-next-line no-await-in-loop
            await Delay(0);
        }
    }
}
async function loadTextureDict(dict) {
    if (HasStreamedTextureDictLoaded(dict))
        return;
    RequestStreamedTextureDict(dict, true);
    while (!HasStreamedTextureDictLoaded(dict)) {
        // eslint-disable-next-line no-await-in-loop
        await Delay(0);
    }
}
async function Utils_loadModel(model) {
    RequestModel(model);
    while (!HasModelLoaded(model)) {
        // eslint-disable-next-line no-await-in-loop
        await Utils_Delay(0);
    }
}
function Utils_findIterator(First, Next, End) {
    const objects = [];
    let iterator;
    let veh;
    [iterator, veh] = First();
    if (!veh) {
        End(iterator);
        return [];
    }
    let success = true;
    do {
        objects.push(veh);
        [success, veh] = Next(iterator);
    } while (success);
    End(iterator);
    return objects;
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Model.js

class Model {
    constructor(name) {
        this.hash = typeof (name) == 'string' ? GetHashKey(name) : name;
    }
    /**
     *
     * @param timeout in ms
     */
    async load(timeout = 0) {
        const time1 = GetGameTimer();
        if (!this.exist)
            return false;
        while (!this.loaded) {
            RequestModel(this.hash);
            if (timeout && GetGameTimer() - time1 > timeout)
                await Utils_Delay(0);
        }
        return this.valid;
    }
    get exist() {
        return IsModelInCdimage(this.hash);
    }
    get loaded() {
        return HasModelLoaded(this.hash);
    }
    get valid() {
        return IsModelValid(this.hash);
    }
    noLongerNeeded() {
        SetModelAsNoLongerNeeded(this.hash);
    }
}
Model.prototype.toString = function () {
    return this.hash;
};

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/Static.js
class Static {
    constructor() {
        throw new Error('Static class instancing!');
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/Log.js
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["NONE"] = 0] = "NONE";
    LogLevel[LogLevel["ERROR"] = 1] = "ERROR";
    LogLevel[LogLevel["WARN"] = 2] = "WARN";
    LogLevel[LogLevel["INFO"] = 3] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 4] = "DEBUG";
})(LogLevel || (LogLevel = {}));
;
class Log {
    static write(...args) {
        console.log(...args);
    }
    static error(...args) {
        if (Log.logLevel < LogLevel.ERROR)
            return;
        console.log('^1', ...args, '^0');
    }
    static info(...args) {
        if (Log.logLevel < LogLevel.INFO)
            return;
        console.log('^2', ...args, '^0');
    }
    static warn(...args) {
        if (Log.logLevel < LogLevel.WARN)
            return;
        console.log('^3', ...args, '^0');
    }
    static debug(...args) {
        if (Log.logLevel < LogLevel.DEBUG)
            return;
        console.log('^4', ...args, '^0');
    }
}
Log.logLevel = LogLevel.DEBUG;

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/SubscribeTarget.js
class SubscribeTarget {
    constructor() {
        this.subscribers = [];
    }
    subscribe(func) {
        this.subscribers.push(func);
    }
    unsubscribe(func) {
        const index = this.subscribers.indexOf(func);
        if (index == -1)
            return false;
        this.subscribers.splice(index, 1);
        return true;
    }
    emit(...args) {
        this.subscribers.forEach((sub) => { sub(...args); });
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/index.js




;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Math/Vector3.js

class Vector3 {
    constructor(x, y, z) {
        this.x = x * 1.0;
        this.y = y * 1.0;
        this.z = z * 1.0;
    }
    /**
     * Длина вектора от точки 0
     */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }
    /**
     * Расстояние между точками
     */
    distanceTo(v) {
        return this.sub(v).length;
    }
    /**
     * Сложение двух векторов
     */
    add(v) {
        return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    /**
     * Сложение вектора и скаляра
     */
    addXYZ(x, y, z) {
        return new Vector3(this.x + x, this.y + y, this.z + z);
    }
    /**
     * Умножение вектора на скаляр
     */
    mul(m) {
        return new Vector3(this.x * m, this.y * m, this.z * m);
    }
    /**
     * Умножение вектора на скаляр покоординатно
     */
    mulXYZ(x, y, z) {
        return new Vector3(this.x * x, this.y * y, this.z * z);
    }
    /**
     * Вычитание векторов
     */
    sub(v) {
        return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
    }
    /**
     * Сформировать новый вектор (x,y)
     */
    xy() {
        return new Vector2(this.x, this.y);
    }
    toArray() {
        return [this.x, this.y, this.z];
    }
    static FromArray(arr) {
        return new Vector3(arr[0], arr[1], arr[2]);
    }
    static FromObject(dict) {
        return new Vector3(dict.x, dict.y, dict.z);
    }
    static get Zero() {
        return new Vector3(0, 0, 0);
    }
    toString() {
        return `vector3(${this.x}, ${this.y}, ${this.z})`;
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Math/Vector2.js

class Vector2 {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    /**
     * Длина вектора от точки 0
     */
    get length() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    /**
     * Расстояние между точками
     */
    distanceTo(v) {
        return this.sub(v).length;
    }
    /**
     * Сложение векторов
     */
    add(v) {
        return new Vector2(this.x + v.x, this.y + v.y);
    }
    /**
     * Сложение вектора и скаляра
     */
    addXYZ(x, y, z) {
        return new Vector2(this.x + x, this.y + y);
    }
    /**
     * Вычитание векторов
     */
    sub(v) {
        return new Vector2(this.x - v.x, this.y - v.y);
    }
    /**
      * Умножение вектора на скаляр
      */
    mul(m) {
        return new Vector2(this.x * m, this.y * m);
    }
    /**
     * Умножение вектора на скаляр покоординатно
     */
    mulXY(x, y) {
        return new Vector2(this.x * x, this.y * y);
    }
    toArray() {
        return [this.x, this.y];
    }
    static FromArray(arr) {
        return new Vector2(arr[0], arr[1]);
    }
    static FromObject(dict) {
        return new Vector2(dict.x, dict.y);
    }
    static get Zero() {
        return new Vector2(0, 0);
    }
    toString() {
        return `vector2(${this.x}, ${this.y})`;
    }
    toVector3(z) {
        return new Vector3(this.x, this.y, z);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Math/Random.js

class Random {
    /**
     * Возвращает псевдослучайное число N в диапазоне [0, 1)
     */
    static random() {
        return Math.random();
    }
    /**
     * Возвращает псевдослучайное целое число
     * @return {number} целое N в диапазоне [a, b)
     * @return {number} Если b не задано, целое N в диапазоне [0, a)
     */
    static randint(a, b) {
        let minval, maxval;
        if (b !== undefined) {
            minval = a;
            maxval = b;
        }
        else {
            minval = 0;
            maxval = a;
        }
        assert(maxval >= minval);
        return minval + Math.floor(Random.random() * (maxval - minval));
    }
    /**
     * Выбирает псевдослучайный элемент из входящего массива
     */
    static choice(arr) {
        assert(arr.length > 0, 'Nothing to choose! Array is empty.');
        const index = Random.randint(arr.length);
        return arr[index];
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Math/index.js




;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/types.js
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
})(Sex || (Sex = {}));

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/index.js





;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared.js



;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Decor.js
var DecorType;
(function (DecorType) {
    DecorType[DecorType["FLOAT"] = 1] = "FLOAT";
    DecorType[DecorType["BOOL"] = 2] = "BOOL";
    DecorType[DecorType["INT"] = 3] = "INT";
    DecorType[DecorType["Unk"] = 4] = "Unk";
    DecorType[DecorType["Time"] = 5] = "Time";
})(DecorType || (DecorType = {}));
;
class Decor {
    constructor(handle) {
        this.handle = handle;
    }
    exist(name) {
        return DecorExistOn(this.handle, name);
    }
    static register(name, decorType) {
        DecorRegister(name, decorType);
    }
    remove(name) {
        return DecorRemove(this.handle, name);
    }
    getBool(name) {
        return DecorGetBool(this.handle, name);
    }
    setBool(name, value) {
        return DecorSetBool(this.handle, name, value);
    }
    getFloat(name) {
        return DecorGetFloat(this.handle, name);
    }
    setFloat(name, value) {
        return DecorSetFloat(this.handle, name, value);
    }
    getInt(name) {
        return DecorGetInt(this.handle, name);
    }
    setInt(name, value) {
        return DecorSetInt(this.handle, name, Math.round(value));
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Entity.js



class Entity_Entity {
    // state: StateBagInterface;
    constructor(handle) {
        this.handle = handle;
        this.decor = new Decor(this.handle);
        // this.state = global.Entity(this.handle).state;
    }
    get state() {
        return __webpack_require__.g.Entity(this.handle).state;
    }
    remove() {
        throw new Error('Method not implemented!');
    }
    get exist() {
        return !!DoesEntityExist(this.handle);
    }
    get coords() {
        const coords = GetEntityCoords(this.handle, false);
        if (!coords)
            return null;
        return new Vector3(coords[0], coords[1], coords[2]);
    }
    set coords(coords) {
        SetEntityCoords(this.handle, coords.x, coords.y, coords.z, true, false, false, false);
    }
    setCoordsNoOffset(coords) {
        SetEntityCoordsNoOffset(this.handle, coords.x, coords.y, coords.z, true, false, false);
    }
    async fadeIn(normal = true, slow = false) {
        Citizen.invokeNative('0x1F4ED342ACEFE62D', this.handle, normal, slow);
        // В типах не хватает аргумента
        //NetworkFadeInEntity(this.handle, normal);
        // время анимации зависит от флагов
        if (normal) {
            await Utils_Delay(slow ? 3500 : 600);
        }
        else {
            await Utils_Delay(slow ? 3600 : 400);
        }
    }
    async fadeOut(normal = true, slow = false) {
        NetworkFadeOutEntity(this.handle, normal, slow);
        if (normal) {
            await Utils_Delay(slow ? 900 : 1000);
        }
        else {
            await Utils_Delay(slow ? 500 : 500);
        }
    }
    set freezePosition(value) {
        FreezeEntityPosition(this.handle, value);
    }
    get rotation() {
        return Vector3.FromArray(GetEntityRotation(this.handle, 0));
    }
    set rotation(rotation) {
        SetEntityRotation(this.handle, rotation.x, rotation.y, rotation.z, 0, false);
    }
    get alpha() {
        return GetEntityAlpha(this.handle);
    }
    set alpha(value) {
        this.setAlpha(value, true);
    }
    setAlpha(value, skin = false) {
        SetEntityAlpha(this.handle, value, skin);
    }
    set invincible(value) {
        SetEntityInvincible(this.handle, value);
    }
    get dynamic() {
        return !IsEntityStatic(this.handle);
    }
    set dynamic(dynamic) {
        SetEntityDynamic(this.handle, dynamic);
    }
    get heading() {
        return GetEntityHeading(this.handle);
    }
    set heading(heading) {
        SetEntityHeading(this.handle, heading);
    }
    get health() {
        return GetEntityHealth(this.handle);
    }
    set health(health) {
        SetEntityHealth(this.handle, health);
    }
    get speed() {
        return GetEntitySpeed(this.handle);
    }
    get boneCount() {
        return GetEntityBoneCount(this.handle);
    }
    get canBeDamaged() {
        return GetEntityCanBeDamaged(this.handle);
    }
    get collisionDisabled() {
        return GetEntityCollisionDisabled(this.handle);
    }
    get heightAboveGround() {
        return GetEntityHeightAboveGround(this.handle);
    }
    get lodDist() {
        return GetEntityLodDist(this.handle);
    }
    get maxHealth() {
        return GetEntityMaxHealth(this.handle);
    }
    set maxHealth(health) {
        SetEntityMaxHealth(this.handle, health * 1.0);
    }
    get model() {
        return GetEntityModel(this.handle);
    }
    get physicsHeading() {
        return GetEntityPhysicsHeading(this.handle);
    }
    get pitch() {
        return GetEntityPitch(this.handle);
    }
    get populationType() {
        return GetEntityPopulationType(this.handle);
    }
    get roll() {
        return GetEntityRoll(this.handle);
    }
    get submergedLevel() {
        return GetEntitySubmergedLevel(this.handle);
    }
    get entityType() {
        return GetEntityType(this.handle);
    }
    get uprightValue() {
        return GetEntityUprightValue(this.handle);
    }
    get visible() {
        return IsEntityVisible(this.handle);
    }
    set visible(value) {
        SetEntityVisible(this.handle, value, false);
    }
    get isUpsidedown() {
        return IsEntityUpsidedown(this.handle);
    }
    get isInWater() {
        return IsEntityInWater(this.handle);
    }
    get isOnScreen() {
        return IsEntityOnScreen(this.handle);
    }
    get isDead() {
        return IsEntityDead(this.handle);
    }
    get isInAir() {
        return IsEntityInAir(this.handle);
    }
    get isAttached() {
        return IsEntityAttached(this.handle);
    }
    isAttachedToEntity(entity) {
        return IsEntityAttachedToEntity(this.handle, entity.handle);
    }
    attachToEntity(entity, boneIndex, pos, rot, useSoftPinning, collision, isPed, vertexIndex, fixedRot) {
        AttachEntityToEntity(this.handle, entity.handle, boneIndex, pos.x, pos.y, pos.z, rot.x, rot.y, rot.z, true, useSoftPinning, collision, isPed, vertexIndex, fixedRot);
    }
    get isAttachedToAnyVehicle() {
        return IsEntityAttachedToAnyVehicle(this.handle);
    }
    get isAttachedToAnyPed() {
        return IsEntityAttachedToAnyPed(this.handle);
    }
    get isAttachedToAnyObject() {
        return IsEntityAttachedToAnyObject(this.handle);
    }
    get forwardVector() {
        return Vector3.FromArray(GetEntityForwardVector(this.handle));
    }
    get hasCollidedWithAnything() {
        return HasEntityCollidedWithAnything(this.handle);
    }
    get velocity() {
        return Vector3.FromArray(GetEntityVelocity(this.handle));
    }
    requestControl() {
        return NetworkRequestControlOfEntity(this.handle);
    }
    static get None() {
        return new Entity_Entity(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Vehicle.js



var VehicleSeat;
(function (VehicleSeat) {
    VehicleSeat[VehicleSeat["ANY_PASSENGER"] = -2] = "ANY_PASSENGER";
    VehicleSeat[VehicleSeat["DRIVER"] = -1] = "DRIVER";
    VehicleSeat[VehicleSeat["FRONT_PASSENGER"] = 0] = "FRONT_PASSENGER";
    VehicleSeat[VehicleSeat["REAR_LEFT"] = 1] = "REAR_LEFT";
    VehicleSeat[VehicleSeat["REAR_RIGHT"] = 2] = "REAR_RIGHT";
})(VehicleSeat || (VehicleSeat = {}));
var VehicleDoor;
(function (VehicleDoor) {
    VehicleDoor[VehicleDoor["DOOR_DSIDE_F"] = 0] = "DOOR_DSIDE_F";
    VehicleDoor[VehicleDoor["DOOR_DSIDE_R"] = 1] = "DOOR_DSIDE_R";
    VehicleDoor[VehicleDoor["DOOR_PSIDE_F"] = 2] = "DOOR_PSIDE_F";
    VehicleDoor[VehicleDoor["DOOR_PSIDE_R"] = 3] = "DOOR_PSIDE_R";
    VehicleDoor[VehicleDoor["BONNET"] = 4] = "BONNET";
    VehicleDoor[VehicleDoor["BOOT"] = 5] = "BOOT";
})(VehicleDoor || (VehicleDoor = {}));
class Vehicle_Vehicle extends Entity_Entity {
    get liquid() {
        return this.state['liquid'] || { name: 'none', amount: 0 };
    }
    static FromEntity(entity) {
        if (!IsEntityAVehicle(entity.handle)) {
            throw new Error('Unable to cast Entity to Vehicle!');
        }
        return new Vehicle_Vehicle(entity.handle);
    }
    get vehicleClass() {
        return GetVehicleClass(this.handle);
    }
    static getClosest(coords, radius = 5.0, model, flags = 70) {
        const modelHash = model ? GetHashKey(model) : 0;
        return new Vehicle_Vehicle(GetClosestVehicle(coords.x, coords.y, coords.z, radius, modelHash, flags));
    }
    remove() {
        SetEntityAsMissionEntity(this.handle, false, true);
        DeleteVehicle(this.handle);
    }
    get networkId() {
        return NetworkGetNetworkIdFromEntity(this.handle);
    }
    isEmpty() {
        return this.numberOfPassengers == 0 && this.isSeatFree(-1);
    }
    isSeatFree(seatId = VehicleSeat.ANY_PASSENGER) {
        return !!IsVehicleSeatFree(this.handle, seatId);
    }
    isDoorDamaged(doorId) {
        return IsVehicleDoorDamaged(this.handle, doorId);
    }
    getDoorAngleRatio(doorId) {
        return GetVehicleDoorAngleRatio(this.handle, doorId);
    }
    getPedInVehicleSeat(seatId) {
        return new Entity_Entity(GetPedInVehicleSeat(this.handle, seatId));
    }
    isDriver(ped) {
        const vehPed = this.getPedInVehicleSeat(VehicleSeat.DRIVER);
        if (!vehPed || !vehPed.exist)
            return false;
        return vehPed.handle == ped.handle;
    }
    get plateText() {
        return GetVehicleNumberPlateText(this.handle).trim();
    }
    set plateText(value) {
        SetVehicleNumberPlateText(this.handle, value);
    }
    get dirtLevel() {
        return GetVehicleDirtLevel(this.handle);
    }
    set dirtLevel(dirtLevel) {
        SetVehicleDirtLevel(this.handle, dirtLevel);
    }
    get numberOfPassengers() {
        return GetVehicleNumberOfPassengers(this.handle);
    }
    get engineHealth() {
        return GetVehicleEngineHealth(this.handle);
    }
    set engineHealth(value) {
        SetVehicleEngineHealth(this.handle, value);
    }
    set hasMutedSirens(value) {
        SetVehicleHasMutedSirens(this.handle, value);
    }
    get isSirenOn() {
        return IsVehicleSirenOn(this.handle);
    }
    /**
     * in meters per second
     */
    set forwardSpeed(value) {
        SetVehicleForwardSpeed(this.handle, value);
    }
    static async Spawn(model, coords, heading = 0.0, isNetwork = true, netMissionEntity = false) {
        const promise = new Promise((resolve, reject) => {
            setImmediate(async () => {
                await Utils_loadModel(model);
                const vehicle = new Vehicle_Vehicle(CreateVehicle(model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity));
                SetModelAsNoLongerNeeded(model);
                if (!vehicle.exist)
                    reject(new Error(`Транспорт не создан!`));
                const { networkId } = vehicle;
                const { handle } = vehicle;
                SetNetworkIdCanMigrate(networkId, true);
                SetEntityAsMissionEntity(handle, true, false);
                SetVehicleHasBeenOwnedByPlayer(handle, true);
                SetVehicleNeedsToBeHotwired(handle, false);
                SetVehRadioStation(handle, 'OFF');
                RequestCollisionAtCoord(coords.x, coords.y, coords.z);
                resolve(vehicle);
            });
        });
        return Utils_promiseTimeout(promise, 10000);
    }
    static get None() {
        return new Vehicle_Vehicle(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/PedTasks.js


var AnimationFlags;
(function (AnimationFlags) {
    AnimationFlags[AnimationFlags["NORMAL"] = 0] = "NORMAL";
    AnimationFlags[AnimationFlags["REPEAT"] = 1] = "REPEAT";
    AnimationFlags[AnimationFlags["STOP_LAST_FRAME"] = 2] = "STOP_LAST_FRAME";
    AnimationFlags[AnimationFlags["UPPERBODY"] = 16] = "UPPERBODY";
    AnimationFlags[AnimationFlags["ENABLE_PLAYER_CONTROL"] = 32] = "ENABLE_PLAYER_CONTROL";
    AnimationFlags[AnimationFlags["CANCELABLE"] = 120] = "CANCELABLE";
})(AnimationFlags || (AnimationFlags = {}));
;
class PedTasks {
    constructor(handle) {
        this.handle = handle;
    }
    clear(immediately = false) {
        if (immediately) {
            ClearPedTasksImmediately(this.handle);
        }
        else {
            ClearPedTasks(this.handle);
        }
    }
    clearSecondary() {
        ClearPedSecondaryTask(this.handle);
    }
    isPlayingAnim(dict, name, flag = 3) {
        return IsEntityPlayingAnim(this.handle, dict, name, flag);
    }
    getAnimCurrentTime(dict, name) {
        return GetEntityAnimCurrentTime(this.handle, dict, name);
    }
    setAnimCurrentTime(dict, name, time) {
        SetEntityAnimCurrentTime(this.handle, dict, name, time);
    }
    stopAnimTask(dict, name) {
        StopAnimTask(this.handle, dict, name, 2);
    }
    async playAnim(props) {
        const defaultProps = {
            animDictionary: undefined,
            animationName: undefined,
            blendInSpeed: 8.0,
            blendOutSpeed: -8.0,
            duration: -1,
            flags: AnimationFlags.NORMAL,
            playbackRate: 0,
            lockX: false,
            lockY: false,
            lockZ: false,
            wait: 0,
            waitForEnd: false,
        };
        const p = Object.assign({}, defaultProps);
        Object.assign(p, props);
        await loadAnimDict(props.animDictionary);
        TaskPlayAnim(this.handle, p.animDictionary, p.animationName, p.blendInSpeed, p.blendOutSpeed, p.duration, p.flags, p.playbackRate, p.lockX, p.lockY, p.lockZ);
        if (p.waitForEnd) {
            do {
                await Utils_Delay(0);
            } while (this.isPlayingAnim(p.animDictionary, p.animationName));
        }
        if (p.wait)
            await Utils_Delay(p.wait);
    }
    startScenario(name, playEnterAnim = true) {
        TaskStartScenarioInPlace(this.handle, name, 0, playEnterAnim);
    }
    startScenarioAtPosition(name, coords, heading, duration, sittingScenario = false, teleport = false) {
        TaskStartScenarioAtPosition(this.handle, name, coords.x, coords.y, coords.z, heading, duration, sittingScenario, teleport);
    }
    turnToFaceEntity(entity, duration = -1) {
        return TaskTurnPedToFaceEntity(this.handle, entity.handle, duration);
    }
    turnToFaceCoord(coords, duration = -1) {
        return TaskTurnPedToFaceCoord(this.handle, coords.x, coords.y, coords.z, duration);
    }
    goToEntity(entity, duration, distance, speed) {
        TaskGoToEntity(this.handle, entity.handle, duration, distance, speed, 0, 0);
    }
    setPropertyFloat(signalName, value) {
        SetTaskPropertyFloat(this.handle, signalName, value);
    }
    setPropertyBool(signalName, value) {
        SetTaskPropertyBool(this.handle, signalName, value);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/PedWeapon.js
var Weapon;
(function (Weapon) {
    Weapon[Weapon["DAGGER"] = GetHashKey('WEAPON_DAGGER')] = "DAGGER";
    Weapon[Weapon["BAT"] = GetHashKey('WEAPON_BAT')] = "BAT";
    Weapon[Weapon["BOTTLE"] = GetHashKey('WEAPON_BOTTLE')] = "BOTTLE";
    Weapon[Weapon["CROWBAR"] = GetHashKey('WEAPON_CROWBAR')] = "CROWBAR";
    Weapon[Weapon["UNARMED"] = GetHashKey('WEAPON_UNARMED')] = "UNARMED";
    Weapon[Weapon["FLASHLIGHT"] = GetHashKey('WEAPON_FLASHLIGHT')] = "FLASHLIGHT";
    Weapon[Weapon["GOLFCLUB"] = GetHashKey('WEAPON_GOLFCLUB')] = "GOLFCLUB";
    Weapon[Weapon["HAMMER"] = GetHashKey('WEAPON_HAMMER')] = "HAMMER";
    Weapon[Weapon["HATCHET"] = GetHashKey('WEAPON_HATCHET')] = "HATCHET";
    Weapon[Weapon["KNUCKLE"] = GetHashKey('WEAPON_KNUCKLE')] = "KNUCKLE";
    Weapon[Weapon["KNIFE"] = GetHashKey('WEAPON_KNIFE')] = "KNIFE";
    Weapon[Weapon["MACHETE"] = GetHashKey('WEAPON_MACHETE')] = "MACHETE";
    Weapon[Weapon["SWITCHBLADE"] = GetHashKey('WEAPON_SWITCHBLADE')] = "SWITCHBLADE";
    Weapon[Weapon["NIGHTSTICK"] = GetHashKey('WEAPON_NIGHTSTICK')] = "NIGHTSTICK";
    Weapon[Weapon["WRENCH"] = GetHashKey('WEAPON_WRENCH')] = "WRENCH";
    Weapon[Weapon["BATTLEAXE"] = GetHashKey('WEAPON_BATTLEAXE')] = "BATTLEAXE";
    Weapon[Weapon["POOLCUE"] = GetHashKey('WEAPON_POOLCUE')] = "POOLCUE";
    Weapon[Weapon["STONE_HATCHET"] = GetHashKey('WEAPON_STONE_HATCHET')] = "STONE_HATCHET";
    Weapon[Weapon["PISTOL"] = GetHashKey('WEAPON_PISTOL')] = "PISTOL";
    Weapon[Weapon["PISTOL_MK2"] = GetHashKey('WEAPON_PISTOL_MK2')] = "PISTOL_MK2";
    Weapon[Weapon["COMBATPISTOL"] = GetHashKey('WEAPON_COMBATPISTOL')] = "COMBATPISTOL";
    Weapon[Weapon["APPISTOL"] = GetHashKey('WEAPON_APPISTOL')] = "APPISTOL";
    Weapon[Weapon["STUNGUN"] = GetHashKey('WEAPON_STUNGUN')] = "STUNGUN";
    Weapon[Weapon["PISTOL50"] = GetHashKey('WEAPON_PISTOL50')] = "PISTOL50";
    Weapon[Weapon["SNSPISTOL"] = GetHashKey('WEAPON_SNSPISTOL')] = "SNSPISTOL";
    Weapon[Weapon["SNSPISTOL_MK2"] = GetHashKey('WEAPON_SNSPISTOL_MK2')] = "SNSPISTOL_MK2";
    Weapon[Weapon["HEAVYPISTOL"] = GetHashKey('WEAPON_HEAVYPISTOL')] = "HEAVYPISTOL";
    Weapon[Weapon["VINTAGEPISTOL"] = GetHashKey('WEAPON_VINTAGEPISTOL')] = "VINTAGEPISTOL";
    Weapon[Weapon["FLAREGUN"] = GetHashKey('WEAPON_FLAREGUN')] = "FLAREGUN";
    Weapon[Weapon["MARKSMANPISTOL"] = GetHashKey('WEAPON_MARKSMANPISTOL')] = "MARKSMANPISTOL";
    Weapon[Weapon["REVOLVER"] = GetHashKey('WEAPON_REVOLVER')] = "REVOLVER";
    Weapon[Weapon["REVOLVER_MK2"] = GetHashKey('WEAPON_REVOLVER_MK2')] = "REVOLVER_MK2";
    Weapon[Weapon["DOUBLEACTION"] = GetHashKey('WEAPON_DOUBLEACTION')] = "DOUBLEACTION";
    Weapon[Weapon["RAYPISTOL"] = GetHashKey('WEAPON_RAYPISTOL')] = "RAYPISTOL";
    Weapon[Weapon["CERAMICPISTOL"] = GetHashKey('WEAPON_CERAMICPISTOL')] = "CERAMICPISTOL";
    Weapon[Weapon["NAVYREVOLVER"] = GetHashKey('WEAPON_NAVYREVOLVER')] = "NAVYREVOLVER";
    Weapon[Weapon["MICROSMG"] = GetHashKey('WEAPON_MICROSMG')] = "MICROSMG";
    Weapon[Weapon["SMG"] = GetHashKey('WEAPON_SMG')] = "SMG";
    Weapon[Weapon["SMG_MK2"] = GetHashKey('WEAPON_SMG_MK2')] = "SMG_MK2";
    Weapon[Weapon["ASSAULTSMG"] = GetHashKey('WEAPON_ASSAULTSMG')] = "ASSAULTSMG";
    Weapon[Weapon["COMBATPDW"] = GetHashKey('WEAPON_COMBATPDW')] = "COMBATPDW";
    Weapon[Weapon["MACHINEPISTOL"] = GetHashKey('WEAPON_MACHINEPISTOL')] = "MACHINEPISTOL";
    Weapon[Weapon["MINISMG"] = GetHashKey('WEAPON_MINISMG')] = "MINISMG";
    Weapon[Weapon["RAYCARBINE"] = GetHashKey('WEAPON_RAYCARBINE')] = "RAYCARBINE";
    Weapon[Weapon["PUMPSHOTGUN"] = GetHashKey('WEAPON_PUMPSHOTGUN')] = "PUMPSHOTGUN";
    Weapon[Weapon["PUMPSHOTGUN_MK2"] = GetHashKey('WEAPON_PUMPSHOTGUN_MK2')] = "PUMPSHOTGUN_MK2";
    Weapon[Weapon["SAWNOFFSHOTGUN"] = GetHashKey('WEAPON_SAWNOFFSHOTGUN')] = "SAWNOFFSHOTGUN";
    Weapon[Weapon["ASSAULTSHOTGUN"] = GetHashKey('WEAPON_ASSAULTSHOTGUN')] = "ASSAULTSHOTGUN";
    Weapon[Weapon["BULLPUPSHOTGUN"] = GetHashKey('WEAPON_BULLPUPSHOTGUN')] = "BULLPUPSHOTGUN";
    Weapon[Weapon["MUSKET"] = GetHashKey('WEAPON_MUSKET')] = "MUSKET";
    Weapon[Weapon["HEAVYSHOTGUN"] = GetHashKey('WEAPON_HEAVYSHOTGUN')] = "HEAVYSHOTGUN";
    Weapon[Weapon["DBSHOTGUN"] = GetHashKey('WEAPON_DBSHOTGUN')] = "DBSHOTGUN";
    Weapon[Weapon["AUTOSHOTGUN"] = GetHashKey('WEAPON_AUTOSHOTGUN')] = "AUTOSHOTGUN";
    Weapon[Weapon["ASSAULTRIFLE"] = GetHashKey('WEAPON_ASSAULTRIFLE')] = "ASSAULTRIFLE";
    Weapon[Weapon["ASSAULTRIFLE_MK2"] = GetHashKey('WEAPON_ASSAULTRIFLE_MK2')] = "ASSAULTRIFLE_MK2";
    Weapon[Weapon["CARBINERIFLE"] = GetHashKey('WEAPON_CARBINERIFLE')] = "CARBINERIFLE";
    Weapon[Weapon["CARBINERIFLE_MK2"] = GetHashKey('WEAPON_CARBINERIFLE_MK2')] = "CARBINERIFLE_MK2";
    Weapon[Weapon["ADVANCEDRIFLE"] = GetHashKey('WEAPON_ADVANCEDRIFLE')] = "ADVANCEDRIFLE";
    Weapon[Weapon["SPECIALCARBINE"] = GetHashKey('WEAPON_SPECIALCARBINE')] = "SPECIALCARBINE";
    Weapon[Weapon["SPECIALCARBINE_MK2"] = GetHashKey('WEAPON_SPECIALCARBINE_MK2')] = "SPECIALCARBINE_MK2";
    Weapon[Weapon["BULLPUPRIFLE"] = GetHashKey('WEAPON_BULLPUPRIFLE')] = "BULLPUPRIFLE";
    Weapon[Weapon["BULLPUPRIFLE_MK2"] = GetHashKey('WEAPON_BULLPUPRIFLE_MK2')] = "BULLPUPRIFLE_MK2";
    Weapon[Weapon["COMPACTRIFLE"] = GetHashKey('WEAPON_COMPACTRIFLE')] = "COMPACTRIFLE";
    Weapon[Weapon["MG"] = GetHashKey('WEAPON_MG')] = "MG";
    Weapon[Weapon["COMBATMG"] = GetHashKey('WEAPON_COMBATMG')] = "COMBATMG";
    Weapon[Weapon["COMBATMG_MK2"] = GetHashKey('WEAPON_COMBATMG_MK2')] = "COMBATMG_MK2";
    Weapon[Weapon["GUSENBERG"] = GetHashKey('WEAPON_GUSENBERG')] = "GUSENBERG";
    Weapon[Weapon["SNIPERRIFLE"] = GetHashKey('WEAPON_SNIPERRIFLE')] = "SNIPERRIFLE";
    Weapon[Weapon["HEAVYSNIPER"] = GetHashKey('WEAPON_HEAVYSNIPER')] = "HEAVYSNIPER";
    Weapon[Weapon["HEAVYSNIPER_MK2"] = GetHashKey('WEAPON_HEAVYSNIPER_MK2')] = "HEAVYSNIPER_MK2";
    Weapon[Weapon["MARKSMANRIFLE"] = GetHashKey('WEAPON_MARKSMANRIFLE')] = "MARKSMANRIFLE";
    Weapon[Weapon["MARKSMANRIFLE_MK2"] = GetHashKey('WEAPON_MARKSMANRIFLE_MK2')] = "MARKSMANRIFLE_MK2";
    Weapon[Weapon["RPG"] = GetHashKey('WEAPON_RPG')] = "RPG";
    Weapon[Weapon["GRENADELAUNCHER"] = GetHashKey('WEAPON_GRENADELAUNCHER')] = "GRENADELAUNCHER";
    Weapon[Weapon["GRENADELAUNCHER_SMOKE"] = GetHashKey('WEAPON_GRENADELAUNCHER_SMOKE')] = "GRENADELAUNCHER_SMOKE";
    Weapon[Weapon["MINIGUN"] = GetHashKey('WEAPON_MINIGUN')] = "MINIGUN";
    Weapon[Weapon["FIREWORK"] = GetHashKey('WEAPON_FIREWORK')] = "FIREWORK";
    Weapon[Weapon["RAILGUN"] = GetHashKey('WEAPON_RAILGUN')] = "RAILGUN";
    Weapon[Weapon["HOMINGLAUNCHER"] = GetHashKey('WEAPON_HOMINGLAUNCHER')] = "HOMINGLAUNCHER";
    Weapon[Weapon["COMPACTLAUNCHER"] = GetHashKey('WEAPON_COMPACTLAUNCHER')] = "COMPACTLAUNCHER";
    Weapon[Weapon["RAYMINIGUN"] = GetHashKey('WEAPON_RAYMINIGUN')] = "RAYMINIGUN";
    Weapon[Weapon["GRENADE"] = GetHashKey('WEAPON_GRENADE')] = "GRENADE";
    Weapon[Weapon["BZGAS"] = GetHashKey('WEAPON_BZGAS')] = "BZGAS";
    Weapon[Weapon["SMOKEGRENADE"] = GetHashKey('WEAPON_SMOKEGRENADE')] = "SMOKEGRENADE";
    Weapon[Weapon["FLARE"] = GetHashKey('WEAPON_FLARE')] = "FLARE";
    Weapon[Weapon["MOLOTOV"] = GetHashKey('WEAPON_MOLOTOV')] = "MOLOTOV";
    Weapon[Weapon["STICKYBOMB"] = GetHashKey('WEAPON_STICKYBOMB')] = "STICKYBOMB";
    Weapon[Weapon["PROXMINE"] = GetHashKey('WEAPON_PROXMINE')] = "PROXMINE";
    Weapon[Weapon["SNOWBALL"] = GetHashKey('WEAPON_SNOWBALL')] = "SNOWBALL";
    Weapon[Weapon["PIPEBOMB"] = GetHashKey('WEAPON_PIPEBOMB')] = "PIPEBOMB";
    Weapon[Weapon["BALL"] = GetHashKey('WEAPON_BALL')] = "BALL";
    Weapon[Weapon["PETROLCAN"] = GetHashKey('WEAPON_PETROLCAN')] = "PETROLCAN";
    Weapon[Weapon["FIREEXTINGUISHER"] = GetHashKey('WEAPON_FIREEXTINGUISHER')] = "FIREEXTINGUISHER";
    Weapon[Weapon["PARACHUTE"] = GetHashKey('WEAPON_PARACHUTE')] = "PARACHUTE";
    Weapon[Weapon["HAZARDCAN"] = GetHashKey('WEAPON_HAZARDCAN')] = "HAZARDCAN";
})(Weapon || (Weapon = {}));
class PedWeapon {
    constructor(handle) {
        this.handle = handle;
    }
    get isSwapping() {
        return IsPedSwappingWeapon(this.handle);
    }
    set canSwitch(value) {
        SetPedCanSwitchWeapon(this.handle, true);
    }
    get selected() {
        return GetSelectedPedWeapon(this.handle);
    }
    getCurrent() {
        return GetCurrentPedWeapon(this.handle, true);
    }
    setCurrent(weapon, equipNow = true) {
        SetCurrentPedWeapon(this.handle, weapon, equipNow);
    }
    setCurrentWeaponVisible(visible, deselectWeapon = false) {
        SetPedCurrentWeaponVisible(this.handle, visible, deselectWeapon, false, false);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/PedDecoration.js
var PedDecorationZone;
(function (PedDecorationZone) {
    PedDecorationZone[PedDecorationZone["TORSO"] = 0] = "TORSO";
    PedDecorationZone[PedDecorationZone["HEAD"] = 1] = "HEAD";
    PedDecorationZone[PedDecorationZone["LEFT_ARM"] = 2] = "LEFT_ARM";
    PedDecorationZone[PedDecorationZone["RIGHT_ARM"] = 3] = "RIGHT_ARM";
    PedDecorationZone[PedDecorationZone["LEFT_LEG"] = 4] = "LEFT_LEG";
    PedDecorationZone[PedDecorationZone["RIGHT_LEG"] = 5] = "RIGHT_LEG";
    PedDecorationZone[PedDecorationZone["UNKNOWN"] = 6] = "UNKNOWN";
    PedDecorationZone[PedDecorationZone["NONE"] = 7] = "NONE";
})(PedDecorationZone || (PedDecorationZone = {}));
class PedDecoration {
    constructor(handle) {
        this.handle = handle;
    }
    clearAll(leaveScars = false) {
        if (leaveScars) {
            ClearPedDecorationsLeaveScars(this.handle);
        }
        else {
            ClearPedDecorations(this.handle);
        }
    }
    add(collection, overlay) {
        AddPedDecorationFromHashes(this.handle, collection, overlay);
    }
    getZone(collection, overlay) {
        return GetPedDecorationZoneFromHashes(collection, overlay);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Ped.js








var PedTypes;
(function (PedTypes) {
    PedTypes[PedTypes["PLAYER_0"] = 0] = "PLAYER_0";
    PedTypes[PedTypes["PLAYER_1"] = 1] = "PLAYER_1";
    PedTypes[PedTypes["PLAYER_2"] = 3] = "PLAYER_2";
    PedTypes[PedTypes["CIVMALE"] = 4] = "CIVMALE";
    PedTypes[PedTypes["CIVFEMALE"] = 5] = "CIVFEMALE";
    PedTypes[PedTypes["COP"] = 6] = "COP";
    PedTypes[PedTypes["UNKNOWN_7"] = 7] = "UNKNOWN_7";
    PedTypes[PedTypes["UNKNOWN_12"] = 12] = "UNKNOWN_12";
    PedTypes[PedTypes["UNKNOWN_19"] = 19] = "UNKNOWN_19";
    PedTypes[PedTypes["MEDIC"] = 20] = "MEDIC";
    PedTypes[PedTypes["FIREMAN"] = 21] = "FIREMAN";
    PedTypes[PedTypes["UNKNOWN_22"] = 22] = "UNKNOWN_22";
    PedTypes[PedTypes["UNKNOWN_25"] = 25] = "UNKNOWN_25";
    PedTypes[PedTypes["UNKNOWN_26"] = 26] = "UNKNOWN_26";
    PedTypes[PedTypes["SWAT"] = 27] = "SWAT";
    PedTypes[PedTypes["ANIMAL"] = 28] = "ANIMAL";
    PedTypes[PedTypes["ARMY"] = 29] = "ARMY";
})(PedTypes || (PedTypes = {}));
;
var ParachuteState;
(function (ParachuteState) {
    ParachuteState[ParachuteState["NORMAL"] = -1] = "NORMAL";
    ParachuteState[ParachuteState["WEAR"] = 0] = "WEAR";
    ParachuteState[ParachuteState["OPENING"] = 1] = "OPENING";
    ParachuteState[ParachuteState["OPEN"] = 2] = "OPEN";
    ParachuteState[ParachuteState["FALL"] = 3] = "FALL";
})(ParachuteState || (ParachuteState = {}));
;
var PedConfigFlag;
(function (PedConfigFlag) {
    PedConfigFlag[PedConfigFlag["NoCriticalHits"] = 2] = "NoCriticalHits";
    PedConfigFlag[PedConfigFlag["DrownsInWater"] = 3] = "DrownsInWater";
    PedConfigFlag[PedConfigFlag["DisableReticuleFixedLockon"] = 4] = "DisableReticuleFixedLockon";
    PedConfigFlag[PedConfigFlag["UpperBodyDamageAnimsOnly"] = 7] = "UpperBodyDamageAnimsOnly";
    PedConfigFlag[PedConfigFlag["NeverLeavesGroup"] = 13] = "NeverLeavesGroup";
    PedConfigFlag[PedConfigFlag["BlockNonTemporaryEvents"] = 17] = "BlockNonTemporaryEvents";
    PedConfigFlag[PedConfigFlag["IgnoreSeenMelee"] = 24] = "IgnoreSeenMelee";
    PedConfigFlag[PedConfigFlag["DieWhenRagdoll"] = 33] = "DieWhenRagdoll";
    PedConfigFlag[PedConfigFlag["HasHelmet"] = 34] = "HasHelmet";
    PedConfigFlag[PedConfigFlag["UseHelmet"] = 35] = "UseHelmet";
    PedConfigFlag[PedConfigFlag["DisableEvasiveDives"] = 39] = "DisableEvasiveDives";
    PedConfigFlag[PedConfigFlag["DontInfluenceWantedLevel"] = 42] = "DontInfluenceWantedLevel";
    PedConfigFlag[PedConfigFlag["DisablePlayerLockon"] = 43] = "DisablePlayerLockon";
    PedConfigFlag[PedConfigFlag["DisableLockonToRandomPeds"] = 44] = "DisableLockonToRandomPeds";
    PedConfigFlag[PedConfigFlag["PedBeingDeleted"] = 47] = "PedBeingDeleted";
    PedConfigFlag[PedConfigFlag["BlockWeaponSwitching"] = 48] = "BlockWeaponSwitching";
    PedConfigFlag[PedConfigFlag["IsFiring"] = 58] = "IsFiring";
    PedConfigFlag[PedConfigFlag["WasFiring"] = 59] = "WasFiring";
    PedConfigFlag[PedConfigFlag["IsStanding"] = 60] = "IsStanding";
    PedConfigFlag[PedConfigFlag["WasStanding"] = 61] = "WasStanding";
    PedConfigFlag[PedConfigFlag["InVehicle"] = 62] = "InVehicle";
    PedConfigFlag[PedConfigFlag["OnMount"] = 63] = "OnMount";
    PedConfigFlag[PedConfigFlag["AttachedToVehicle"] = 64] = "AttachedToVehicle";
    PedConfigFlag[PedConfigFlag["IsSwimming"] = 65] = "IsSwimming";
    PedConfigFlag[PedConfigFlag["WasSwimming"] = 66] = "WasSwimming";
    PedConfigFlag[PedConfigFlag["IsSkiing"] = 67] = "IsSkiing";
    PedConfigFlag[PedConfigFlag["IsSitting"] = 68] = "IsSitting";
    PedConfigFlag[PedConfigFlag["KilledByStealth"] = 69] = "KilledByStealth";
    PedConfigFlag[PedConfigFlag["KilledByTakedown"] = 70] = "KilledByTakedown";
    PedConfigFlag[PedConfigFlag["Knockedout"] = 71] = "Knockedout";
    PedConfigFlag[PedConfigFlag["UsingCoverPoint"] = 75] = "UsingCoverPoint";
    PedConfigFlag[PedConfigFlag["IsInTheAir"] = 76] = "IsInTheAir";
    PedConfigFlag[PedConfigFlag["IsAimingGun"] = 78] = "IsAimingGun";
    PedConfigFlag[PedConfigFlag["ForcePedLoadCover"] = 93] = "ForcePedLoadCover";
    PedConfigFlag[PedConfigFlag["VaultFromCover"] = 97] = "VaultFromCover";
    PedConfigFlag[PedConfigFlag["ForcedAim"] = 101] = "ForcedAim";
    PedConfigFlag[PedConfigFlag["ForceReload"] = 105] = "ForceReload";
    PedConfigFlag[PedConfigFlag["BumpedByPlayer"] = 117] = "BumpedByPlayer";
    PedConfigFlag[PedConfigFlag["IsHandCuffed"] = 120] = "IsHandCuffed";
    PedConfigFlag[PedConfigFlag["IsAnkleCuffed"] = 121] = "IsAnkleCuffed";
    PedConfigFlag[PedConfigFlag["DisableMelee"] = 122] = "DisableMelee";
    PedConfigFlag[PedConfigFlag["CanBeAgitated"] = 128] = "CanBeAgitated";
    PedConfigFlag[PedConfigFlag["IsScuba"] = 135] = "IsScuba";
    PedConfigFlag[PedConfigFlag["WillArrestRatherThanJack"] = 136] = "WillArrestRatherThanJack";
    PedConfigFlag[PedConfigFlag["RidingTrain"] = 138] = "RidingTrain";
    PedConfigFlag[PedConfigFlag["ArrestResult"] = 139] = "ArrestResult";
    PedConfigFlag[PedConfigFlag["CanAttackFriendly"] = 140] = "CanAttackFriendly";
    PedConfigFlag[PedConfigFlag["ShootingAnimFlag"] = 145] = "ShootingAnimFlag";
    PedConfigFlag[PedConfigFlag["DisableLadderClimbing"] = 146] = "DisableLadderClimbing";
    PedConfigFlag[PedConfigFlag["StairsDetected"] = 147] = "StairsDetected";
    PedConfigFlag[PedConfigFlag["SlopeDetected"] = 148] = "SlopeDetected";
    PedConfigFlag[PedConfigFlag["CanPerformArrest"] = 155] = "CanPerformArrest";
    PedConfigFlag[PedConfigFlag["CanPerformUncuff"] = 156] = "CanPerformUncuff";
    PedConfigFlag[PedConfigFlag["CanBeArrested"] = 157] = "CanBeArrested";
    PedConfigFlag[PedConfigFlag["IsInjured"] = 166] = "IsInjured";
    PedConfigFlag[PedConfigFlag["IsInCustody"] = 180] = "IsInCustody";
    PedConfigFlag[PedConfigFlag["IsAgitated"] = 183] = "IsAgitated";
    PedConfigFlag[PedConfigFlag["PreventAutoShuffleToDriversSeat"] = 184] = "PreventAutoShuffleToDriversSeat";
    PedConfigFlag[PedConfigFlag["EnableWeaponBlocking"] = 186] = "EnableWeaponBlocking";
    PedConfigFlag[PedConfigFlag["HasHurtStarted"] = 187] = "HasHurtStarted";
    PedConfigFlag[PedConfigFlag["DisableHurt"] = 188] = "DisableHurt";
    PedConfigFlag[PedConfigFlag["PlayerIsWeird"] = 189] = "PlayerIsWeird";
    PedConfigFlag[PedConfigFlag["UsingScenario"] = 194] = "UsingScenario";
    PedConfigFlag[PedConfigFlag["VisibleOnScreen"] = 195] = "VisibleOnScreen";
    PedConfigFlag[PedConfigFlag["DisableExplosionReactions"] = 208] = "DisableExplosionReactions";
    PedConfigFlag[PedConfigFlag["DodgedPlayer"] = 209] = "DodgedPlayer";
    PedConfigFlag[PedConfigFlag["DontEnterLeadersVehicle"] = 220] = "DontEnterLeadersVehicle";
    PedConfigFlag[PedConfigFlag["DisablePotentialToBeWalkedIntoResponse"] = 225] = "DisablePotentialToBeWalkedIntoResponse";
    PedConfigFlag[PedConfigFlag["DisablePedAvoidance"] = 226] = "DisablePedAvoidance";
    PedConfigFlag[PedConfigFlag["DisablePanicInVehicle"] = 229] = "DisablePanicInVehicle";
    PedConfigFlag[PedConfigFlag["IsHoldingProp"] = 236] = "IsHoldingProp";
    PedConfigFlag[PedConfigFlag["OnStairs"] = 253] = "OnStairs";
    PedConfigFlag[PedConfigFlag["OnStairSlope"] = 270] = "OnStairSlope";
    PedConfigFlag[PedConfigFlag["DontBlipCop"] = 272] = "DontBlipCop";
    PedConfigFlag[PedConfigFlag["ClimbedShiftedFence"] = 273] = "ClimbedShiftedFence";
    PedConfigFlag[PedConfigFlag["EdgeDetected"] = 276] = "EdgeDetected";
    PedConfigFlag[PedConfigFlag["AvoidTearGas"] = 279] = "AvoidTearGas";
    PedConfigFlag[PedConfigFlag["RagdollingOnBoat"] = 287] = "RagdollingOnBoat";
    PedConfigFlag[PedConfigFlag["HasBrandishedWeapon"] = 288] = "HasBrandishedWeapon";
    PedConfigFlag[PedConfigFlag["DisableShockingEvents"] = 294] = "DisableShockingEvents";
    PedConfigFlag[PedConfigFlag["DisablePedConstraints"] = 301] = "DisablePedConstraints";
    PedConfigFlag[PedConfigFlag["IsInCluster"] = 310] = "IsInCluster";
    PedConfigFlag[PedConfigFlag["HasHighHeels"] = 322] = "HasHighHeels";
    PedConfigFlag[PedConfigFlag["DisableTalkTo"] = 329] = "DisableTalkTo";
    PedConfigFlag[PedConfigFlag["DontBlip"] = 330] = "DontBlip";
    PedConfigFlag[PedConfigFlag["IsSwitchingWeapon"] = 331] = "IsSwitchingWeapon";
    PedConfigFlag[PedConfigFlag["EquipJetpack"] = 349] = "EquipJetpack";
    PedConfigFlag[PedConfigFlag["IsDuckingInVehicle"] = 359] = "IsDuckingInVehicle";
    PedConfigFlag[PedConfigFlag["HasReserveParachute"] = 362] = "HasReserveParachute";
    PedConfigFlag[PedConfigFlag["UseReserveParachute"] = 363] = "UseReserveParachute";
    PedConfigFlag[PedConfigFlag["NeverLeaveTrain"] = 374] = "NeverLeaveTrain";
    PedConfigFlag[PedConfigFlag["IsClimbingLadder"] = 388] = "IsClimbingLadder";
    PedConfigFlag[PedConfigFlag["HasBareFeet"] = 389] = "HasBareFeet";
    PedConfigFlag[PedConfigFlag["IsHolsteringWeapon"] = 413] = "IsHolsteringWeapon";
    PedConfigFlag[PedConfigFlag["IsSwitchingHelmetVisor"] = 418] = "IsSwitchingHelmetVisor";
    PedConfigFlag[PedConfigFlag["DisableVehicleCombat"] = 422] = "DisableVehicleCombat";
    PedConfigFlag[PedConfigFlag["FallsLikeAircraft"] = 424] = "FallsLikeAircraft";
    PedConfigFlag[PedConfigFlag["DisableStartEngine"] = 429] = "DisableStartEngine";
    PedConfigFlag[PedConfigFlag["IgnoreBeingOnFire"] = 430] = "IgnoreBeingOnFire";
    PedConfigFlag[PedConfigFlag["DisableHomingMissileLockon"] = 434] = "DisableHomingMissileLockon";
    PedConfigFlag[PedConfigFlag["DisableHelmetArmor"] = 438] = "DisableHelmetArmor";
    PedConfigFlag[PedConfigFlag["PedIsArresting"] = 450] = "PedIsArresting";
    PedConfigFlag[PedConfigFlag["IsDecoyPed"] = 451] = "IsDecoyPed";
    PedConfigFlag[PedConfigFlag["CanBeIncapacitated"] = 456] = "CanBeIncapacitated";
})(PedConfigFlag || (PedConfigFlag = {}));
class Ped extends Entity_Entity {
    constructor(handle) {
        super(handle);
        this.tasks = new PedTasks(handle);
        this.weapon = new PedWeapon(handle);
        this.decoration = new PedDecoration(handle);
    }
    static FromEntity(entity) {
        if (!IsEntityAPed(entity.handle)) {
            throw new Error('Unable to cast Entity to Ped!');
        }
        return new Ped(entity.handle);
    }
    async remove() {
        if (!this.exist)
            return false;
        this.freezePosition = false;
        this.blockNonTemporaryEvents = false;
        this.invincible = false;
        this.fadeOut(true, false);
        await Utils_Delay(1000);
        DeletePed(this.handle);
        for (let i = 0; i < 1000; i++) {
            if (!this.exist)
                break;
            await Utils_Delay(10);
        }
        return true;
    }
    async teleport(coords, heading) {
        if (!this.exist)
            return;
        RequestCollisionAtCoord(coords.x, coords.y, coords.z);
        this.freezePosition = true;
        this.coords = coords;
        if (heading !== undefined) {
            this.heading = heading;
        }
        for (let i = 0; i < 30; i += 1) {
            if (HasCollisionLoadedAroundEntity(this.handle))
                break;
            await Utils_Delay(0);
        }
        this.freezePosition = false;
    }
    async teleportXY(coords, heading) {
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
        throw new Error(`Unable to locate Z-coord to teleport into: ${coords.toString()}`);
    }
    get alive() {
        return !IsPedDeadOrDying(this.handle, true);
    }
    get isOnFoot() {
        return IsPedOnFoot(this.handle);
    }
    get isSwimming() {
        return IsPedSwimming(this.handle);
    }
    get isSprinting() {
        return IsPedSprinting(this.handle);
    }
    get isRunning() {
        return IsPedRunning(this.handle);
    }
    get isStunned() {
        return IsPedBeingStunned(this.handle, 0);
    }
    get isFalling() {
        return IsPedFalling(this.handle);
    }
    get isDiving() {
        return IsPedDiving(this.handle);
    }
    get isLocal() {
        return this.handle == PlayerPedId();
    }
    isInCover(exceptUseWeapon = false) {
        return IsPedInCover(this.handle, exceptUseWeapon);
    }
    get vehicle() {
        return this.getVehiclePedIsIn();
    }
    isInAnyVehicle(atGetIn = false) {
        return IsPedInAnyVehicle(this.handle, atGetIn);
    }
    getVehiclePedIsIn() {
        return new Vehicle_Vehicle(GetVehiclePedIsIn(this.handle, false));
    }
    getVehiclePedWasIn() {
        return new Vehicle_Vehicle(GetVehiclePedIsIn(this.handle, true));
    }
    getVehiclePedIsTryingToEnter() {
        return new Vehicle_Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
    }
    setIntoVehicle(vehicle, seatIndex = VehicleSeat.ANY_PASSENGER) {
        SetPedIntoVehicle(this.handle, vehicle.handle, seatIndex);
    }
    get health() {
        const health = super.health;
        if (health < 100)
            return 0;
        return health - 100;
    }
    set health(health) {
        let value = health;
        if (value <= 0)
            value = -100;
        if (value > 100)
            value = 100;
        super.health = value + 100;
    }
    get injured() {
        return IsPedInjured(this.handle);
    }
    get isPlayer() {
        return IsPedAPlayer(this.handle);
    }
    get stealth() {
        return GetPedStealthMovement(this.handle);
    }
    set stealth(value) {
        SetPedStealthMovement(this.handle, value, null);
    }
    set blockNonTemporaryEvents(value) {
        SetBlockingOfNonTemporaryEvents(this.handle, value);
    }
    get parachuteState() {
        return GetPedParachuteState(this.handle);
    }
    get isInParachuteFreeFall() {
        return IsPedInParachuteFreeFall(this.handle);
    }
    isHeadingTowardsPosition(coords, angle) {
        return IsPedHeadingTowardsPosition(this.handle, coords.x, coords.y, coords.z, angle);
    }
    getBoneIndex(boneId) {
        return GetPedBoneIndex(this.handle, boneId);
    }
    getConfigFlag(flagId) {
        return GetPedConfigFlag(this.handle, flagId, false);
    }
    setConfigFlag(flagId, value) {
        return SetPedConfigFlag(this.handle, flagId, value);
    }
    static async Spawn(model, coords, heading = 0, pedType = PedTypes.CIVMALE, isNetwork = true, netMissionEntity = false) {
        const promise = new Promise((resolve, reject) => {
            setImmediate(async () => {
                await Utils_loadModel(model);
                const ped = new Ped(CreatePed(pedType, model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity));
                SetModelAsNoLongerNeeded(model);
                if (!ped.exist)
                    reject(new Error(`Ped не создан!`));
                resolve(ped);
            });
        });
        return Utils_promiseTimeout(promise, 10000);
    }
    static get None() {
        return new Ped(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Core/ServerCallback.js

class ServerCallback extends Static {
    static async Trigger(name, ...args) {
        let promiseResolve;
        const promise = new Promise(resolve => {
            promiseResolve = resolve;
        });
        emit('engine:triggerServerCallback', promiseResolve, name, ...args);
        return promise;
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Core/ESX.js

class ESX extends Static {
    static async init() {
        while (!this.instance) {
            emit('esx:getSharedObject', obj => { this.instance = obj; });
            await Utils_Delay(100);
        }
        return this.instance;
    }
}
ESX.instance = undefined;
let instance = null;
(async () => {
    instance = await ESX.init();
})();
/* harmony default export */ const Core_ESX = ((/* unused pure expression or super */ null && (instance)));

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Core/index.js





;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Player.js




class Player_Player {
    constructor(handle) {
        this.handle = +handle;
        Utils_assert(this.handle, 'Invalid player handle!');
        this.name = GetPlayerName(this.handle);
        Utils_assert(this.name && this.name !== '**Invalid**', 'Invalid player name!');
        this.state = __webpack_require__.g.Player(this.serverId).state;
        Utils_assert(this.state, 'Invalid player state!');
        this.identifier = this.state.identifier;
    }
    get serverId() {
        return GetPlayerServerId(this.handle);
    }
    get identity() {
        const data = this.state.identity;
        if (!data)
            return { firstname: '', lastname: '', sex: Sex.MALE, age: 0, height: 0 };
        return data;
    }
    get ped() {
        const pedHandle = GetPlayerPed(this.handle);
        if (!DoesEntityExist(pedHandle))
            return null;
        return new Ped(pedHandle);
    }
    isFreeAimingAtEntity(entity) {
        return IsPlayerFreeAimingAtEntity(this.handle, entity.handle);
    }
    /* Extension: roles */
    get roles() {
        return this.state['roles'] || {};
    }
    /* Extension: licenses */
    get licenses() {
        return this.state['licenses'] || {};
    }
    set invincible(value) {
        SetPlayerInvincible(this.handle, value);
    }
    disableFiringThisFrame() {
        DisablePlayerFiring(this.handle, true);
    }
    async setModel(hash) {
        const success = await new Model(hash).load(10000);
        if (success) {
            SetPlayerModel(this.handle, hash);
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/LocalPlayer.js




class LocalPlayerProto extends Player_Player {
    constructor() {
        super(PlayerId().toString());
        this.onMoneySet = new SubscribeTarget();
        this.onMoneyAdd = new SubscribeTarget();
        this.onMoneySub = new SubscribeTarget();
    }
    revive(coords = this.ped.coords, heading = 0.0) {
        this.ped.coords = new Vector3(coords.x, coords.y, coords.z);
        SetPlayerInvincible(this.handle, false);
        NetworkResurrectLocalPlayer(coords.x, coords.y, coords.z, heading, true, false);
        TriggerEvent('playerSpawned', coords.x, coords.y, coords.z);
        ClearPedBloodDamage(this.handle);
    }
    // Кэшированные параметры, не рушащие производительность вызовами API
    get coords() {
        return LocalPlayerProto._coords;
    }
    get roles() {
        return LocalPlayerProto._roles;
    }
    get money() {
        return LocalPlayerProto._money;
    }
    get status() {
        return LocalPlayerProto._status;
    }
    async pay(accounts, amount, description, tax) {
        return ServerCallback.Trigger('engine:pay', accounts, amount, description, tax);
    }
}
LocalPlayerProto._roles = {};
LocalPlayerProto._money = {};
LocalPlayerProto._status = {};
LocalPlayerProto._coords = new Vector3(0, 0, 0);
const LocalPlayer_LocalPlayer = new LocalPlayerProto();
/* Кэшируем нужные поля state локального игрока,
   чтобы к ним можно было обращаться в setTick
   без потери производительности, но с задержкой в 0.1 сек */
setInterval(() => {
    LocalPlayerProto._roles = LocalPlayer_LocalPlayer.state['roles'] || {};
    LocalPlayerProto._money = LocalPlayer_LocalPlayer.state['money'] || {};
    LocalPlayerProto._status = LocalPlayer_LocalPlayer.state['status'] || {};
}, 100);
onNet('engine:onPlayerMoneySet', (account, amount) => {
    LocalPlayer_LocalPlayer.onMoneySet.emit(account, amount);
});
onNet('engine:onPlayerMoneyAdd', (account, amount, newValue) => {
    LocalPlayer_LocalPlayer.onMoneyAdd.emit(account, amount, newValue);
});
onNet('engine:onPlayerMoneySub', (account, amount, newValue) => {
    LocalPlayer_LocalPlayer.onMoneySub.emit(account, amount, newValue);
});
setTick(() => {
    LocalPlayerProto._coords = LocalPlayer_LocalPlayer.ped.coords;
});

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Vehicles.js



class Vehicles {
    static get() {
        const vehicles = findIterator(FindFirstVehicle, FindNextVehicle, EndFindVehicle);
        return vehicles.map((id) => new Vehicle(id)).filter((veh) => veh.exist);
    }
    static getClosest(coords = LocalPlayer.coords, filter = null) {
        let vehicles = Vehicles.get();
        if (filter)
            vehicles = vehicles.filter(filter);
        if (vehicles.length == 0)
            return [Vehicle.None, Infinity];
        const distances = vehicles.map((veh) => coords.distanceTo(veh.coords));
        const minDist = Math.min(...distances);
        const index = distances.findIndex((dist) => dist == minDist);
        return [vehicles[index], minDist];
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Players.js

class Players {
    static All() {
        return GetActivePlayers().map((handle) => new Player(handle));
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Prop.js



class Prop extends (/* unused pure expression or super */ null && (Entity)) {
    static FromEntity(entity) {
        if (!IsEntityAnObject(entity.handle)) {
            throw new Error('Unable to cast Entity to Prop!');
        }
        return new Prop(entity.handle);
    }
    static async Spawn(model, coords, heading = 0, isNetwork = true, netMissionEntity = false, dynamic = false) {
        const promise = new Promise((resolve, reject) => {
            setImmediate(async () => {
                await loadModel(model);
                const prop = new Prop(CreateObjectNoOffset(model, coords.x, coords.y, coords.z, isNetwork, netMissionEntity, dynamic));
                SetModelAsNoLongerNeeded(model);
                if (!prop.exist)
                    reject(new Error(`Prop не создан!`));
                prop.heading = heading;
                ActivatePhysics(prop.handle);
                resolve(prop);
            });
        });
        return promiseTimeout(promise, 10000);
    }
    static getClosestOfType(coords, radius, model, isMission = false) {
        return new Prop(GetClosestObjectOfType(coords.x, coords.y, coords.z, radius, model, isMission, false, false));
    }
    remove() {
        DeleteObject(this.handle);
    }
    static get None() {
        return new Prop(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/types.js
var types_InputGroups;
(function (InputGroups) {
    InputGroups[InputGroups["INPUTGROUP_MOVE"] = 0] = "INPUTGROUP_MOVE";
    InputGroups[InputGroups["INPUTGROUP_LOOK"] = 1] = "INPUTGROUP_LOOK";
    InputGroups[InputGroups["INPUTGROUP_WHEEL"] = 2] = "INPUTGROUP_WHEEL";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE"] = 3] = "INPUTGROUP_CELLPHONE_NAVIGATE";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE_UD"] = 4] = "INPUTGROUP_CELLPHONE_NAVIGATE_UD";
    InputGroups[InputGroups["INPUTGROUP_CELLPHONE_NAVIGATE_LR"] = 5] = "INPUTGROUP_CELLPHONE_NAVIGATE_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_ALL"] = 6] = "INPUTGROUP_FRONTEND_DPAD_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_UD"] = 7] = "INPUTGROUP_FRONTEND_DPAD_UD";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_DPAD_LR"] = 8] = "INPUTGROUP_FRONTEND_DPAD_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_LSTICK_ALL"] = 9] = "INPUTGROUP_FRONTEND_LSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_RSTICK_ALL"] = 10] = "INPUTGROUP_FRONTEND_RSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_UD"] = 11] = "INPUTGROUP_FRONTEND_GENERIC_UD";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_LR"] = 12] = "INPUTGROUP_FRONTEND_GENERIC_LR";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_GENERIC_ALL"] = 13] = "INPUTGROUP_FRONTEND_GENERIC_ALL";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_BUMPERS"] = 14] = "INPUTGROUP_FRONTEND_BUMPERS";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_TRIGGERS"] = 15] = "INPUTGROUP_FRONTEND_TRIGGERS";
    InputGroups[InputGroups["INPUTGROUP_FRONTEND_STICKS"] = 16] = "INPUTGROUP_FRONTEND_STICKS";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_ALL"] = 17] = "INPUTGROUP_SCRIPT_DPAD_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_UD"] = 18] = "INPUTGROUP_SCRIPT_DPAD_UD";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_DPAD_LR"] = 19] = "INPUTGROUP_SCRIPT_DPAD_LR";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_LSTICK_ALL"] = 20] = "INPUTGROUP_SCRIPT_LSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_RSTICK_ALL"] = 21] = "INPUTGROUP_SCRIPT_RSTICK_ALL";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_BUMPERS"] = 22] = "INPUTGROUP_SCRIPT_BUMPERS";
    InputGroups[InputGroups["INPUTGROUP_SCRIPT_TRIGGERS"] = 23] = "INPUTGROUP_SCRIPT_TRIGGERS";
    InputGroups[InputGroups["INPUTGROUP_WEAPON_WHEEL_CYCLE"] = 24] = "INPUTGROUP_WEAPON_WHEEL_CYCLE";
    InputGroups[InputGroups["INPUTGROUP_FLY"] = 25] = "INPUTGROUP_FLY";
    InputGroups[InputGroups["INPUTGROUP_SUB"] = 26] = "INPUTGROUP_SUB";
    InputGroups[InputGroups["INPUTGROUP_VEH_MOVE_ALL"] = 27] = "INPUTGROUP_VEH_MOVE_ALL";
    InputGroups[InputGroups["INPUTGROUP_CURSOR"] = 28] = "INPUTGROUP_CURSOR";
    InputGroups[InputGroups["INPUTGROUP_CURSOR_SCROLL"] = 29] = "INPUTGROUP_CURSOR_SCROLL";
    InputGroups[InputGroups["INPUTGROUP_SNIPER_ZOOM_SECONDARY"] = 30] = "INPUTGROUP_SNIPER_ZOOM_SECONDARY";
    InputGroups[InputGroups["INPUTGROUP_VEH_HYDRAULICS_DisabledControl"] = 31] = "INPUTGROUP_VEH_HYDRAULICS_DisabledControl";
    InputGroups[InputGroups["MAX_INPUTGROUPS"] = 32] = "MAX_INPUTGROUPS";
    InputGroups[InputGroups["INPUTGROUP_INVALID"] = 33] = "INPUTGROUP_INVALID";
})(types_InputGroups || (types_InputGroups = {}));
var types_Controls;
(function (Controls) {
    Controls[Controls["NEXT_CAMERA"] = 0] = "NEXT_CAMERA";
    Controls[Controls["LOOK_LR"] = 1] = "LOOK_LR";
    Controls[Controls["LOOK_UD"] = 2] = "LOOK_UD";
    Controls[Controls["LOOK_UP_ONLY"] = 3] = "LOOK_UP_ONLY";
    Controls[Controls["LOOK_DOWN_ONLY"] = 4] = "LOOK_DOWN_ONLY";
    Controls[Controls["LOOK_LEFT_ONLY"] = 5] = "LOOK_LEFT_ONLY";
    Controls[Controls["LOOK_RIGHT_ONLY"] = 6] = "LOOK_RIGHT_ONLY";
    Controls[Controls["CINEMATIC_SLOWMO"] = 7] = "CINEMATIC_SLOWMO";
    Controls[Controls["SCRIPTED_FLY_UD"] = 8] = "SCRIPTED_FLY_UD";
    Controls[Controls["SCRIPTED_FLY_LR"] = 9] = "SCRIPTED_FLY_LR";
    Controls[Controls["SCRIPTED_FLY_ZUP"] = 10] = "SCRIPTED_FLY_ZUP";
    Controls[Controls["SCRIPTED_FLY_ZDOWN"] = 11] = "SCRIPTED_FLY_ZDOWN";
    Controls[Controls["WEAPON_WHEEL_UD"] = 12] = "WEAPON_WHEEL_UD";
    Controls[Controls["WEAPON_WHEEL_LR"] = 13] = "WEAPON_WHEEL_LR";
    Controls[Controls["WEAPON_WHEEL_NEXT"] = 14] = "WEAPON_WHEEL_NEXT";
    Controls[Controls["WEAPON_WHEEL_PREV"] = 15] = "WEAPON_WHEEL_PREV";
    Controls[Controls["SELECT_NEXT_WEAPON"] = 16] = "SELECT_NEXT_WEAPON";
    Controls[Controls["SELECT_PREV_WEAPON"] = 17] = "SELECT_PREV_WEAPON";
    Controls[Controls["SKIP_CUTSCENE"] = 18] = "SKIP_CUTSCENE";
    Controls[Controls["CHARACTER_WHEEL"] = 19] = "CHARACTER_WHEEL";
    Controls[Controls["MULTIPLAYER_INFO"] = 20] = "MULTIPLAYER_INFO";
    Controls[Controls["SPRINT"] = 21] = "SPRINT";
    Controls[Controls["JUMP"] = 22] = "JUMP";
    Controls[Controls["ENTER"] = 23] = "ENTER";
    Controls[Controls["ATTACK"] = 24] = "ATTACK";
    Controls[Controls["AIM"] = 25] = "AIM";
    Controls[Controls["LOOK_BEHIND"] = 26] = "LOOK_BEHIND";
    Controls[Controls["PHONE"] = 27] = "PHONE";
    Controls[Controls["SPECIAL_ABILITY"] = 28] = "SPECIAL_ABILITY";
    Controls[Controls["SPECIAL_ABILITY_SECONDARY"] = 29] = "SPECIAL_ABILITY_SECONDARY";
    Controls[Controls["MOVE_LR"] = 30] = "MOVE_LR";
    Controls[Controls["MOVE_UD"] = 31] = "MOVE_UD";
    Controls[Controls["MOVE_UP_ONLY"] = 32] = "MOVE_UP_ONLY";
    Controls[Controls["MOVE_DOWN_ONLY"] = 33] = "MOVE_DOWN_ONLY";
    Controls[Controls["MOVE_LEFT_ONLY"] = 34] = "MOVE_LEFT_ONLY";
    Controls[Controls["MOVE_RIGHT_ONLY"] = 35] = "MOVE_RIGHT_ONLY";
    Controls[Controls["DUCK"] = 36] = "DUCK";
    Controls[Controls["SELECT_WEAPON"] = 37] = "SELECT_WEAPON";
    Controls[Controls["PICKUP"] = 38] = "PICKUP";
    Controls[Controls["SNIPER_ZOOM"] = 39] = "SNIPER_ZOOM";
    Controls[Controls["SNIPER_ZOOM_IN_ONLY"] = 40] = "SNIPER_ZOOM_IN_ONLY";
    Controls[Controls["SNIPER_ZOOM_OUT_ONLY"] = 41] = "SNIPER_ZOOM_OUT_ONLY";
    Controls[Controls["SNIPER_ZOOM_IN_SECONDARY"] = 42] = "SNIPER_ZOOM_IN_SECONDARY";
    Controls[Controls["SNIPER_ZOOM_OUT_SECONDARY"] = 43] = "SNIPER_ZOOM_OUT_SECONDARY";
    Controls[Controls["COVER"] = 44] = "COVER";
    Controls[Controls["RELOAD"] = 45] = "RELOAD";
    Controls[Controls["TALK"] = 46] = "TALK";
    Controls[Controls["DETONATE"] = 47] = "DETONATE";
    Controls[Controls["HUD_SPECIAL"] = 48] = "HUD_SPECIAL";
    Controls[Controls["ARREST"] = 49] = "ARREST";
    Controls[Controls["ACCURATE_AIM"] = 50] = "ACCURATE_AIM";
    Controls[Controls["CONTEXT"] = 51] = "CONTEXT";
    Controls[Controls["CONTEXT_SECONDARY"] = 52] = "CONTEXT_SECONDARY";
    Controls[Controls["WEAPON_SPECIAL"] = 53] = "WEAPON_SPECIAL";
    Controls[Controls["WEAPON_SPECIAL_TWO"] = 54] = "WEAPON_SPECIAL_TWO";
    Controls[Controls["DIVE"] = 55] = "DIVE";
    Controls[Controls["DROP_WEAPON"] = 56] = "DROP_WEAPON";
    Controls[Controls["DROP_AMMO"] = 57] = "DROP_AMMO";
    Controls[Controls["THROW_GRENADE"] = 58] = "THROW_GRENADE";
    Controls[Controls["VEH_MOVE_LR"] = 59] = "VEH_MOVE_LR";
    Controls[Controls["VEH_MOVE_UD"] = 60] = "VEH_MOVE_UD";
    Controls[Controls["VEH_MOVE_UP_ONLY"] = 61] = "VEH_MOVE_UP_ONLY";
    Controls[Controls["VEH_MOVE_DOWN_ONLY"] = 62] = "VEH_MOVE_DOWN_ONLY";
    Controls[Controls["VEH_MOVE_LEFT_ONLY"] = 63] = "VEH_MOVE_LEFT_ONLY";
    Controls[Controls["VEH_MOVE_RIGHT_ONLY"] = 64] = "VEH_MOVE_RIGHT_ONLY";
    Controls[Controls["VEH_SPECIAL"] = 65] = "VEH_SPECIAL";
    Controls[Controls["VEH_GUN_LR"] = 66] = "VEH_GUN_LR";
    Controls[Controls["VEH_GUN_UD"] = 67] = "VEH_GUN_UD";
    Controls[Controls["VEH_AIM"] = 68] = "VEH_AIM";
    Controls[Controls["VEH_ATTACK"] = 69] = "VEH_ATTACK";
    Controls[Controls["VEH_ATTACK2"] = 70] = "VEH_ATTACK2";
    Controls[Controls["VEH_ACCELERATE"] = 71] = "VEH_ACCELERATE";
    Controls[Controls["VEH_BRAKE"] = 72] = "VEH_BRAKE";
    Controls[Controls["VEH_DUCK"] = 73] = "VEH_DUCK";
    Controls[Controls["VEH_HEADLIGHT"] = 74] = "VEH_HEADLIGHT";
    Controls[Controls["VEH_EXIT"] = 75] = "VEH_EXIT";
    Controls[Controls["VEH_HANDBRAKE"] = 76] = "VEH_HANDBRAKE";
    Controls[Controls["VEH_HOTWIRE_LEFT"] = 77] = "VEH_HOTWIRE_LEFT";
    Controls[Controls["VEH_HOTWIRE_RIGHT"] = 78] = "VEH_HOTWIRE_RIGHT";
    Controls[Controls["VEH_LOOK_BEHIND"] = 79] = "VEH_LOOK_BEHIND";
    Controls[Controls["VEH_CIN_CAM"] = 80] = "VEH_CIN_CAM";
    Controls[Controls["VEH_NEXT_RADIO"] = 81] = "VEH_NEXT_RADIO";
    Controls[Controls["VEH_PREV_RADIO"] = 82] = "VEH_PREV_RADIO";
    Controls[Controls["VEH_NEXT_RADIO_TRACK"] = 83] = "VEH_NEXT_RADIO_TRACK";
    Controls[Controls["VEH_PREV_RADIO_TRACK"] = 84] = "VEH_PREV_RADIO_TRACK";
    Controls[Controls["VEH_RADIO_WHEEL"] = 85] = "VEH_RADIO_WHEEL";
    Controls[Controls["VEH_HORN"] = 86] = "VEH_HORN";
    Controls[Controls["VEH_FLY_THROTTLE_UP"] = 87] = "VEH_FLY_THROTTLE_UP";
    Controls[Controls["VEH_FLY_THROTTLE_DOWN"] = 88] = "VEH_FLY_THROTTLE_DOWN";
    Controls[Controls["VEH_FLY_YAW_LEFT"] = 89] = "VEH_FLY_YAW_LEFT";
    Controls[Controls["VEH_FLY_YAW_RIGHT"] = 90] = "VEH_FLY_YAW_RIGHT";
    Controls[Controls["VEH_PASSENGER_AIM"] = 91] = "VEH_PASSENGER_AIM";
    Controls[Controls["VEH_PASSENGER_ATTACK"] = 92] = "VEH_PASSENGER_ATTACK";
    Controls[Controls["VEH_SPECIAL_ABILITY_FRANKLIN"] = 93] = "VEH_SPECIAL_ABILITY_FRANKLIN";
    Controls[Controls["VEH_STUNT_UD"] = 94] = "VEH_STUNT_UD";
    Controls[Controls["VEH_CINEMATIC_UD"] = 95] = "VEH_CINEMATIC_UD";
    Controls[Controls["VEH_CINEMATIC_UP_ONLY"] = 96] = "VEH_CINEMATIC_UP_ONLY";
    Controls[Controls["VEH_CINEMATIC_DOWN_ONLY"] = 97] = "VEH_CINEMATIC_DOWN_ONLY";
    Controls[Controls["VEH_CINEMATIC_LR"] = 98] = "VEH_CINEMATIC_LR";
    Controls[Controls["VEH_SELECT_NEXT_WEAPON"] = 99] = "VEH_SELECT_NEXT_WEAPON";
    Controls[Controls["VEH_SELECT_PREV_WEAPON"] = 100] = "VEH_SELECT_PREV_WEAPON";
    Controls[Controls["VEH_ROOF"] = 101] = "VEH_ROOF";
    Controls[Controls["VEH_JUMP"] = 102] = "VEH_JUMP";
    Controls[Controls["VEH_GRAPPLING_HOOK"] = 103] = "VEH_GRAPPLING_HOOK";
    Controls[Controls["VEH_SHUFFLE"] = 104] = "VEH_SHUFFLE";
    Controls[Controls["VEH_DROP_PROJECTILE"] = 105] = "VEH_DROP_PROJECTILE";
    Controls[Controls["VEH_MOUSE_CONTROL_OVERRIDE"] = 106] = "VEH_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["VEH_FLY_ROLL_LR"] = 107] = "VEH_FLY_ROLL_LR";
    Controls[Controls["VEH_FLY_ROLL_LEFT_ONLY"] = 108] = "VEH_FLY_ROLL_LEFT_ONLY";
    Controls[Controls["VEH_FLY_ROLL_RIGHT_ONLY"] = 109] = "VEH_FLY_ROLL_RIGHT_ONLY";
    Controls[Controls["VEH_FLY_PITCH_UD"] = 110] = "VEH_FLY_PITCH_UD";
    Controls[Controls["VEH_FLY_PITCH_UP_ONLY"] = 111] = "VEH_FLY_PITCH_UP_ONLY";
    Controls[Controls["VEH_FLY_PITCH_DOWN_ONLY"] = 112] = "VEH_FLY_PITCH_DOWN_ONLY";
    Controls[Controls["VEH_FLY_UNDERCARRIAGE"] = 113] = "VEH_FLY_UNDERCARRIAGE";
    Controls[Controls["VEH_FLY_ATTACK"] = 114] = "VEH_FLY_ATTACK";
    Controls[Controls["VEH_FLY_SELECT_NEXT_WEAPON"] = 115] = "VEH_FLY_SELECT_NEXT_WEAPON";
    Controls[Controls["VEH_FLY_SELECT_PREV_WEAPON"] = 116] = "VEH_FLY_SELECT_PREV_WEAPON";
    Controls[Controls["VEH_FLY_SELECT_TARGET_LEFT"] = 117] = "VEH_FLY_SELECT_TARGET_LEFT";
    Controls[Controls["VEH_FLY_SELECT_TARGET_RIGHT"] = 118] = "VEH_FLY_SELECT_TARGET_RIGHT";
    Controls[Controls["VEH_FLY_VERTICAL_FLIGHT_MODE"] = 119] = "VEH_FLY_VERTICAL_FLIGHT_MODE";
    Controls[Controls["VEH_FLY_DUCK"] = 120] = "VEH_FLY_DUCK";
    Controls[Controls["VEH_FLY_ATTACK_CAMERA"] = 121] = "VEH_FLY_ATTACK_CAMERA";
    Controls[Controls["VEH_FLY_MOUSE_CONTROL_OVERRIDE"] = 122] = "VEH_FLY_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["VEH_SUB_TURN_LR"] = 123] = "VEH_SUB_TURN_LR";
    Controls[Controls["VEH_SUB_TURN_LEFT_ONLY"] = 124] = "VEH_SUB_TURN_LEFT_ONLY";
    Controls[Controls["VEH_SUB_TURN_RIGHT_ONLY"] = 125] = "VEH_SUB_TURN_RIGHT_ONLY";
    Controls[Controls["VEH_SUB_PITCH_UD"] = 126] = "VEH_SUB_PITCH_UD";
    Controls[Controls["VEH_SUB_PITCH_UP_ONLY"] = 127] = "VEH_SUB_PITCH_UP_ONLY";
    Controls[Controls["VEH_SUB_PITCH_DOWN_ONLY"] = 128] = "VEH_SUB_PITCH_DOWN_ONLY";
    Controls[Controls["VEH_SUB_THROTTLE_UP"] = 129] = "VEH_SUB_THROTTLE_UP";
    Controls[Controls["VEH_SUB_THROTTLE_DOWN"] = 130] = "VEH_SUB_THROTTLE_DOWN";
    Controls[Controls["VEH_SUB_ASCEND"] = 131] = "VEH_SUB_ASCEND";
    Controls[Controls["VEH_SUB_DESCEND"] = 132] = "VEH_SUB_DESCEND";
    Controls[Controls["VEH_SUB_TURN_HARD_LEFT"] = 133] = "VEH_SUB_TURN_HARD_LEFT";
    Controls[Controls["VEH_SUB_TURN_HARD_RIGHT"] = 134] = "VEH_SUB_TURN_HARD_RIGHT";
    Controls[Controls["VEH_SUB_MOUSE_CONTROL_OVERRIDE"] = 135] = "VEH_SUB_MOUSE_CONTROL_OVERRIDE";
    Controls[Controls["VEH_PUSHBIKE_PEDAL"] = 136] = "VEH_PUSHBIKE_PEDAL";
    Controls[Controls["VEH_PUSHBIKE_SPRINT"] = 137] = "VEH_PUSHBIKE_SPRINT";
    Controls[Controls["VEH_PUSHBIKE_FRONT_BRAKE"] = 138] = "VEH_PUSHBIKE_FRONT_BRAKE";
    Controls[Controls["VEH_PUSHBIKE_REAR_BRAKE"] = 139] = "VEH_PUSHBIKE_REAR_BRAKE";
    Controls[Controls["MELEE_ATTACK_LIGHT"] = 140] = "MELEE_ATTACK_LIGHT";
    Controls[Controls["MELEE_ATTACK_HEAVY"] = 141] = "MELEE_ATTACK_HEAVY";
    Controls[Controls["MELEE_ATTACK_ALTERNATE"] = 142] = "MELEE_ATTACK_ALTERNATE";
    Controls[Controls["MELEE_BLOCK"] = 143] = "MELEE_BLOCK";
    Controls[Controls["PARACHUTE_DEPLOY"] = 144] = "PARACHUTE_DEPLOY";
    Controls[Controls["PARACHUTE_DETACH"] = 145] = "PARACHUTE_DETACH";
    Controls[Controls["PARACHUTE_TURN_LR"] = 146] = "PARACHUTE_TURN_LR";
    Controls[Controls["PARACHUTE_TURN_LEFT_ONLY"] = 147] = "PARACHUTE_TURN_LEFT_ONLY";
    Controls[Controls["PARACHUTE_TURN_RIGHT_ONLY"] = 148] = "PARACHUTE_TURN_RIGHT_ONLY";
    Controls[Controls["PARACHUTE_PITCH_UD"] = 149] = "PARACHUTE_PITCH_UD";
    Controls[Controls["PARACHUTE_PITCH_UP_ONLY"] = 150] = "PARACHUTE_PITCH_UP_ONLY";
    Controls[Controls["PARACHUTE_PITCH_DOWN_ONLY"] = 151] = "PARACHUTE_PITCH_DOWN_ONLY";
    Controls[Controls["PARACHUTE_BRAKE_LEFT"] = 152] = "PARACHUTE_BRAKE_LEFT";
    Controls[Controls["PARACHUTE_BRAKE_RIGHT"] = 153] = "PARACHUTE_BRAKE_RIGHT";
    Controls[Controls["PARACHUTE_SMOKE"] = 154] = "PARACHUTE_SMOKE";
    Controls[Controls["PARACHUTE_PRECISION_LANDING"] = 155] = "PARACHUTE_PRECISION_LANDING";
    Controls[Controls["MAP"] = 156] = "MAP";
    Controls[Controls["SELECT_WEAPON_UNARMED"] = 157] = "SELECT_WEAPON_UNARMED";
    Controls[Controls["SELECT_WEAPON_MELEE"] = 158] = "SELECT_WEAPON_MELEE";
    Controls[Controls["SELECT_WEAPON_HANDGUN"] = 159] = "SELECT_WEAPON_HANDGUN";
    Controls[Controls["SELECT_WEAPON_SHOTGUN"] = 160] = "SELECT_WEAPON_SHOTGUN";
    Controls[Controls["SELECT_WEAPON_SMG"] = 161] = "SELECT_WEAPON_SMG";
    Controls[Controls["SELECT_WEAPON_AUTO_RIFLE"] = 162] = "SELECT_WEAPON_AUTO_RIFLE";
    Controls[Controls["SELECT_WEAPON_SNIPER"] = 163] = "SELECT_WEAPON_SNIPER";
    Controls[Controls["SELECT_WEAPON_HEAVY"] = 164] = "SELECT_WEAPON_HEAVY";
    Controls[Controls["SELECT_WEAPON_SPECIAL"] = 165] = "SELECT_WEAPON_SPECIAL";
    Controls[Controls["SELECT_CHARACTER_MICHAEL"] = 166] = "SELECT_CHARACTER_MICHAEL";
    Controls[Controls["SELECT_CHARACTER_FRANKLIN"] = 167] = "SELECT_CHARACTER_FRANKLIN";
    Controls[Controls["SELECT_CHARACTER_TREVOR"] = 168] = "SELECT_CHARACTER_TREVOR";
    Controls[Controls["SELECT_CHARACTER_MULTIPLAYER"] = 169] = "SELECT_CHARACTER_MULTIPLAYER";
    Controls[Controls["SAVE_REPLAY_CLIP"] = 170] = "SAVE_REPLAY_CLIP";
    Controls[Controls["SPECIAL_ABILITY_PC"] = 171] = "SPECIAL_ABILITY_PC";
    Controls[Controls["CELLPHONE_UP"] = 172] = "CELLPHONE_UP";
    Controls[Controls["CELLPHONE_DOWN"] = 173] = "CELLPHONE_DOWN";
    Controls[Controls["CELLPHONE_LEFT"] = 174] = "CELLPHONE_LEFT";
    Controls[Controls["CELLPHONE_RIGHT"] = 175] = "CELLPHONE_RIGHT";
    Controls[Controls["CELLPHONE_SELECT"] = 176] = "CELLPHONE_SELECT";
    Controls[Controls["CELLPHONE_CANCEL"] = 177] = "CELLPHONE_CANCEL";
    Controls[Controls["CELLPHONE_OPTION"] = 178] = "CELLPHONE_OPTION";
    Controls[Controls["CELLPHONE_EXTRA_OPTION"] = 179] = "CELLPHONE_EXTRA_OPTION";
    Controls[Controls["CELLPHONE_SCROLL_FORWARD"] = 180] = "CELLPHONE_SCROLL_FORWARD";
    Controls[Controls["CELLPHONE_SCROLL_BACKWARD"] = 181] = "CELLPHONE_SCROLL_BACKWARD";
    Controls[Controls["CELLPHONE_CAMERA_FOCUS_LOCK"] = 182] = "CELLPHONE_CAMERA_FOCUS_LOCK";
    Controls[Controls["CELLPHONE_CAMERA_GRID"] = 183] = "CELLPHONE_CAMERA_GRID";
    Controls[Controls["CELLPHONE_CAMERA_SELFIE"] = 184] = "CELLPHONE_CAMERA_SELFIE";
    Controls[Controls["CELLPHONE_CAMERA_DOF"] = 185] = "CELLPHONE_CAMERA_DOF";
    Controls[Controls["CELLPHONE_CAMERA_EXPRESSION"] = 186] = "CELLPHONE_CAMERA_EXPRESSION";
    Controls[Controls["FRONTEND_DOWN"] = 187] = "FRONTEND_DOWN";
    Controls[Controls["FRONTEND_UP"] = 188] = "FRONTEND_UP";
    Controls[Controls["FRONTEND_LEFT"] = 189] = "FRONTEND_LEFT";
    Controls[Controls["FRONTEND_RIGHT"] = 190] = "FRONTEND_RIGHT";
    Controls[Controls["FRONTEND_RDOWN"] = 191] = "FRONTEND_RDOWN";
    Controls[Controls["FRONTEND_RUP"] = 192] = "FRONTEND_RUP";
    Controls[Controls["FRONTEND_RLEFT"] = 193] = "FRONTEND_RLEFT";
    Controls[Controls["FRONTEND_RRIGHT"] = 194] = "FRONTEND_RRIGHT";
    Controls[Controls["FRONTEND_AXIS_X"] = 195] = "FRONTEND_AXIS_X";
    Controls[Controls["FRONTEND_AXIS_Y"] = 196] = "FRONTEND_AXIS_Y";
    Controls[Controls["FRONTEND_RIGHT_AXIS_X"] = 197] = "FRONTEND_RIGHT_AXIS_X";
    Controls[Controls["FRONTEND_RIGHT_AXIS_Y"] = 198] = "FRONTEND_RIGHT_AXIS_Y";
    Controls[Controls["FRONTEND_PAUSE"] = 199] = "FRONTEND_PAUSE";
    Controls[Controls["FRONTEND_PAUSE_ALTERNATE"] = 200] = "FRONTEND_PAUSE_ALTERNATE";
    Controls[Controls["FRONTEND_ACCEPT"] = 201] = "FRONTEND_ACCEPT";
    Controls[Controls["FRONTEND_CANCEL"] = 202] = "FRONTEND_CANCEL";
    Controls[Controls["FRONTEND_X"] = 203] = "FRONTEND_X";
    Controls[Controls["FRONTEND_Y"] = 204] = "FRONTEND_Y";
    Controls[Controls["FRONTEND_LB"] = 205] = "FRONTEND_LB";
    Controls[Controls["FRONTEND_RB"] = 206] = "FRONTEND_RB";
    Controls[Controls["FRONTEND_LT"] = 207] = "FRONTEND_LT";
    Controls[Controls["FRONTEND_RT"] = 208] = "FRONTEND_RT";
    Controls[Controls["FRONTEND_LS"] = 209] = "FRONTEND_LS";
    Controls[Controls["FRONTEND_RS"] = 210] = "FRONTEND_RS";
    Controls[Controls["FRONTEND_LEADERBOARD"] = 211] = "FRONTEND_LEADERBOARD";
    Controls[Controls["FRONTEND_SOCIAL_CLUB"] = 212] = "FRONTEND_SOCIAL_CLUB";
    Controls[Controls["FRONTEND_SOCIAL_CLUB_SECONDARY"] = 213] = "FRONTEND_SOCIAL_CLUB_SECONDARY";
    Controls[Controls["FRONTEND_DELETE"] = 214] = "FRONTEND_DELETE";
    Controls[Controls["FRONTEND_ENDSCREEN_ACCEPT"] = 215] = "FRONTEND_ENDSCREEN_ACCEPT";
    Controls[Controls["FRONTEND_ENDSCREEN_EXPAND"] = 216] = "FRONTEND_ENDSCREEN_EXPAND";
    Controls[Controls["FRONTEND_SELECT"] = 217] = "FRONTEND_SELECT";
    Controls[Controls["SCRIPT_LEFT_AXIS_X"] = 218] = "SCRIPT_LEFT_AXIS_X";
    Controls[Controls["SCRIPT_LEFT_AXIS_Y"] = 219] = "SCRIPT_LEFT_AXIS_Y";
    Controls[Controls["SCRIPT_RIGHT_AXIS_X"] = 220] = "SCRIPT_RIGHT_AXIS_X";
    Controls[Controls["SCRIPT_RIGHT_AXIS_Y"] = 221] = "SCRIPT_RIGHT_AXIS_Y";
    Controls[Controls["SCRIPT_RUP"] = 222] = "SCRIPT_RUP";
    Controls[Controls["SCRIPT_RDOWN"] = 223] = "SCRIPT_RDOWN";
    Controls[Controls["SCRIPT_RLEFT"] = 224] = "SCRIPT_RLEFT";
    Controls[Controls["SCRIPT_RRIGHT"] = 225] = "SCRIPT_RRIGHT";
    Controls[Controls["SCRIPT_LB"] = 226] = "SCRIPT_LB";
    Controls[Controls["SCRIPT_RB"] = 227] = "SCRIPT_RB";
    Controls[Controls["SCRIPT_LT"] = 228] = "SCRIPT_LT";
    Controls[Controls["SCRIPT_RT"] = 229] = "SCRIPT_RT";
    Controls[Controls["SCRIPT_LS"] = 230] = "SCRIPT_LS";
    Controls[Controls["SCRIPT_RS"] = 231] = "SCRIPT_RS";
    Controls[Controls["SCRIPT_PAD_UP"] = 232] = "SCRIPT_PAD_UP";
    Controls[Controls["SCRIPT_PAD_DOWN"] = 233] = "SCRIPT_PAD_DOWN";
    Controls[Controls["SCRIPT_PAD_LEFT"] = 234] = "SCRIPT_PAD_LEFT";
    Controls[Controls["SCRIPT_PAD_RIGHT"] = 235] = "SCRIPT_PAD_RIGHT";
    Controls[Controls["SCRIPT_SELECT"] = 236] = "SCRIPT_SELECT";
    Controls[Controls["CURSOR_ACCEPT"] = 237] = "CURSOR_ACCEPT";
    Controls[Controls["CURSOR_CANCEL"] = 238] = "CURSOR_CANCEL";
    Controls[Controls["CURSOR_X"] = 239] = "CURSOR_X";
    Controls[Controls["CURSOR_Y"] = 240] = "CURSOR_Y";
    Controls[Controls["CURSOR_SCROLL_UP"] = 241] = "CURSOR_SCROLL_UP";
    Controls[Controls["CURSOR_SCROLL_DOWN"] = 242] = "CURSOR_SCROLL_DOWN";
    Controls[Controls["ENTER_CHEAT_CODE"] = 243] = "ENTER_CHEAT_CODE";
    Controls[Controls["INTERACTION_MENU"] = 244] = "INTERACTION_MENU";
    Controls[Controls["MP_TEXT_CHAT_ALL"] = 245] = "MP_TEXT_CHAT_ALL";
    Controls[Controls["MP_TEXT_CHAT_TEAM"] = 246] = "MP_TEXT_CHAT_TEAM";
    Controls[Controls["MP_TEXT_CHAT_FRIENDS"] = 247] = "MP_TEXT_CHAT_FRIENDS";
    Controls[Controls["MP_TEXT_CHAT_CREW"] = 248] = "MP_TEXT_CHAT_CREW";
    Controls[Controls["PUSH_TO_TALK"] = 249] = "PUSH_TO_TALK";
    Controls[Controls["CREATOR_LS"] = 250] = "CREATOR_LS";
    Controls[Controls["CREATOR_RS"] = 251] = "CREATOR_RS";
    Controls[Controls["CREATOR_LT"] = 252] = "CREATOR_LT";
    Controls[Controls["CREATOR_RT"] = 253] = "CREATOR_RT";
    Controls[Controls["CREATOR_MENU_TOGGLE"] = 254] = "CREATOR_MENU_TOGGLE";
    Controls[Controls["CREATOR_ACCEPT"] = 255] = "CREATOR_ACCEPT";
    Controls[Controls["CREATOR_DELETE"] = 256] = "CREATOR_DELETE";
    Controls[Controls["ATTACK2"] = 257] = "ATTACK2";
    Controls[Controls["RAPPEL_JUMP"] = 258] = "RAPPEL_JUMP";
    Controls[Controls["RAPPEL_LONG_JUMP"] = 259] = "RAPPEL_LONG_JUMP";
    Controls[Controls["RAPPEL_SMASH_WINDOW"] = 260] = "RAPPEL_SMASH_WINDOW";
    Controls[Controls["PREV_WEAPON"] = 261] = "PREV_WEAPON";
    Controls[Controls["NEXT_WEAPON"] = 262] = "NEXT_WEAPON";
    Controls[Controls["MELEE_ATTACK1"] = 263] = "MELEE_ATTACK1";
    Controls[Controls["MELEE_ATTACK2"] = 264] = "MELEE_ATTACK2";
    Controls[Controls["WHISTLE"] = 265] = "WHISTLE";
    Controls[Controls["MOVE_LEFT"] = 266] = "MOVE_LEFT";
    Controls[Controls["MOVE_RIGHT"] = 267] = "MOVE_RIGHT";
    Controls[Controls["MOVE_UP"] = 268] = "MOVE_UP";
    Controls[Controls["MOVE_DOWN"] = 269] = "MOVE_DOWN";
    Controls[Controls["LOOK_LEFT"] = 270] = "LOOK_LEFT";
    Controls[Controls["LOOK_RIGHT"] = 271] = "LOOK_RIGHT";
    Controls[Controls["LOOK_UP"] = 272] = "LOOK_UP";
    Controls[Controls["LOOK_DOWN"] = 273] = "LOOK_DOWN";
    Controls[Controls["SNIPER_ZOOM_IN"] = 274] = "SNIPER_ZOOM_IN";
    Controls[Controls["SNIPER_ZOOM_OUT"] = 275] = "SNIPER_ZOOM_OUT";
    Controls[Controls["SNIPER_ZOOM_IN_ALTERNATE"] = 276] = "SNIPER_ZOOM_IN_ALTERNATE";
    Controls[Controls["SNIPER_ZOOM_OUT_ALTERNATE"] = 277] = "SNIPER_ZOOM_OUT_ALTERNATE";
    Controls[Controls["VEH_MOVE_LEFT"] = 278] = "VEH_MOVE_LEFT";
    Controls[Controls["VEH_MOVE_RIGHT"] = 279] = "VEH_MOVE_RIGHT";
    Controls[Controls["VEH_MOVE_UP"] = 280] = "VEH_MOVE_UP";
    Controls[Controls["VEH_MOVE_DOWN"] = 281] = "VEH_MOVE_DOWN";
    Controls[Controls["VEH_GUN_LEFT"] = 282] = "VEH_GUN_LEFT";
    Controls[Controls["VEH_GUN_RIGHT"] = 283] = "VEH_GUN_RIGHT";
    Controls[Controls["VEH_GUN_UP"] = 284] = "VEH_GUN_UP";
    Controls[Controls["VEH_GUN_DOWN"] = 285] = "VEH_GUN_DOWN";
    Controls[Controls["VEH_LOOK_LEFT"] = 286] = "VEH_LOOK_LEFT";
    Controls[Controls["VEH_LOOK_RIGHT"] = 287] = "VEH_LOOK_RIGHT";
    Controls[Controls["REPLAY_START_STOP_RECORDING"] = 288] = "REPLAY_START_STOP_RECORDING";
    Controls[Controls["REPLAY_START_STOP_RECORDING_SECONDARY"] = 289] = "REPLAY_START_STOP_RECORDING_SECONDARY";
    Controls[Controls["SCALED_LOOK_LR"] = 290] = "SCALED_LOOK_LR";
    Controls[Controls["SCALED_LOOK_UD"] = 291] = "SCALED_LOOK_UD";
    Controls[Controls["SCALED_LOOK_UP_ONLY"] = 292] = "SCALED_LOOK_UP_ONLY";
    Controls[Controls["SCALED_LOOK_DOWN_ONLY"] = 293] = "SCALED_LOOK_DOWN_ONLY";
    Controls[Controls["SCALED_LOOK_LEFT_ONLY"] = 294] = "SCALED_LOOK_LEFT_ONLY";
    Controls[Controls["SCALED_LOOK_RIGHT_ONLY"] = 295] = "SCALED_LOOK_RIGHT_ONLY";
    Controls[Controls["REPLAY_MARKER_DELETE"] = 296] = "REPLAY_MARKER_DELETE";
    Controls[Controls["REPLAY_CLIP_DELETE"] = 297] = "REPLAY_CLIP_DELETE";
    Controls[Controls["REPLAY_PAUSE"] = 298] = "REPLAY_PAUSE";
    Controls[Controls["REPLAY_REWIND"] = 299] = "REPLAY_REWIND";
    Controls[Controls["REPLAY_FFWD"] = 300] = "REPLAY_FFWD";
    Controls[Controls["REPLAY_NEWMARKER"] = 301] = "REPLAY_NEWMARKER";
    Controls[Controls["REPLAY_RECORD"] = 302] = "REPLAY_RECORD";
    Controls[Controls["REPLAY_SCREENSHOT"] = 303] = "REPLAY_SCREENSHOT";
    Controls[Controls["REPLAY_HIDEHUD"] = 304] = "REPLAY_HIDEHUD";
    Controls[Controls["REPLAY_STARTPOINT"] = 305] = "REPLAY_STARTPOINT";
    Controls[Controls["REPLAY_ENDPOINT"] = 306] = "REPLAY_ENDPOINT";
    Controls[Controls["REPLAY_ADVANCE"] = 307] = "REPLAY_ADVANCE";
    Controls[Controls["REPLAY_BACK"] = 308] = "REPLAY_BACK";
    Controls[Controls["REPLAY_TOOLS"] = 309] = "REPLAY_TOOLS";
    Controls[Controls["REPLAY_RESTART"] = 310] = "REPLAY_RESTART";
    Controls[Controls["REPLAY_SHOWHOTKEY"] = 311] = "REPLAY_SHOWHOTKEY";
    Controls[Controls["REPLAY_CYCLEMARKERLEFT"] = 312] = "REPLAY_CYCLEMARKERLEFT";
    Controls[Controls["REPLAY_CYCLEMARKERRIGHT"] = 313] = "REPLAY_CYCLEMARKERRIGHT";
    Controls[Controls["REPLAY_FOVINCREASE"] = 314] = "REPLAY_FOVINCREASE";
    Controls[Controls["REPLAY_FOVDECREASE"] = 315] = "REPLAY_FOVDECREASE";
    Controls[Controls["REPLAY_CAMERAUP"] = 316] = "REPLAY_CAMERAUP";
    Controls[Controls["REPLAY_CAMERADOWN"] = 317] = "REPLAY_CAMERADOWN";
    Controls[Controls["REPLAY_SAVE"] = 318] = "REPLAY_SAVE";
    Controls[Controls["REPLAY_TOGGLETIME"] = 319] = "REPLAY_TOGGLETIME";
    Controls[Controls["REPLAY_TOGGLETIPS"] = 320] = "REPLAY_TOGGLETIPS";
    Controls[Controls["REPLAY_PREVIEW"] = 321] = "REPLAY_PREVIEW";
    Controls[Controls["REPLAY_TOGGLE_TIMELINE"] = 322] = "REPLAY_TOGGLE_TIMELINE";
    Controls[Controls["REPLAY_TIMELINE_PICKUP_CLIP"] = 323] = "REPLAY_TIMELINE_PICKUP_CLIP";
    Controls[Controls["REPLAY_TIMELINE_DUPLICATE_CLIP"] = 324] = "REPLAY_TIMELINE_DUPLICATE_CLIP";
    Controls[Controls["REPLAY_TIMELINE_PLACE_CLIP"] = 325] = "REPLAY_TIMELINE_PLACE_CLIP";
    Controls[Controls["REPLAY_CTRL"] = 326] = "REPLAY_CTRL";
    Controls[Controls["REPLAY_TIMELINE_SAVE"] = 327] = "REPLAY_TIMELINE_SAVE";
    Controls[Controls["REPLAY_PREVIEW_AUDIO"] = 328] = "REPLAY_PREVIEW_AUDIO";
    Controls[Controls["VEH_DRIVE_LOOK"] = 329] = "VEH_DRIVE_LOOK";
    Controls[Controls["VEH_DRIVE_LOOK2"] = 330] = "VEH_DRIVE_LOOK2";
    Controls[Controls["VEH_FLY_ATTACK2"] = 331] = "VEH_FLY_ATTACK2";
    Controls[Controls["RADIO_WHEEL_UD"] = 332] = "RADIO_WHEEL_UD";
    Controls[Controls["RADIO_WHEEL_LR"] = 333] = "RADIO_WHEEL_LR";
    Controls[Controls["VEH_SLOWMO_UD"] = 334] = "VEH_SLOWMO_UD";
    Controls[Controls["VEH_SLOWMO_UP_ONLY"] = 335] = "VEH_SLOWMO_UP_ONLY";
    Controls[Controls["VEH_SLOWMO_DOWN_ONLY"] = 336] = "VEH_SLOWMO_DOWN_ONLY";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_TOGGLE"] = 337] = "VEH_HYDRAULICS_CONTROL_TOGGLE";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_LEFT"] = 338] = "VEH_HYDRAULICS_CONTROL_LEFT";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_RIGHT"] = 339] = "VEH_HYDRAULICS_CONTROL_RIGHT";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_UP"] = 340] = "VEH_HYDRAULICS_CONTROL_UP";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_DOWN"] = 341] = "VEH_HYDRAULICS_CONTROL_DOWN";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_UD"] = 342] = "VEH_HYDRAULICS_CONTROL_UD";
    Controls[Controls["VEH_HYDRAULICS_CONTROL_LR"] = 343] = "VEH_HYDRAULICS_CONTROL_LR";
    Controls[Controls["SWITCH_VISOR"] = 344] = "SWITCH_VISOR";
    Controls[Controls["VEH_MELEE_HOLD"] = 345] = "VEH_MELEE_HOLD";
    Controls[Controls["VEH_MELEE_LEFT"] = 346] = "VEH_MELEE_LEFT";
    Controls[Controls["VEH_MELEE_RIGHT"] = 347] = "VEH_MELEE_RIGHT";
    Controls[Controls["MAP_POI"] = 348] = "MAP_POI";
    Controls[Controls["REPLAY_SNAPMATIC_PHOTO"] = 349] = "REPLAY_SNAPMATIC_PHOTO";
    Controls[Controls["VEH_CAR_JUMP"] = 350] = "VEH_CAR_JUMP";
    Controls[Controls["VEH_ROCKET_BOOST"] = 351] = "VEH_ROCKET_BOOST";
    Controls[Controls["VEH_FLY_BOOST"] = 352] = "VEH_FLY_BOOST";
    Controls[Controls["VEH_PARACHUTE"] = 353] = "VEH_PARACHUTE";
    Controls[Controls["VEH_BIKE_WINGS"] = 354] = "VEH_BIKE_WINGS";
    Controls[Controls["VEH_FLY_BOMB_BAY"] = 355] = "VEH_FLY_BOMB_BAY";
    Controls[Controls["VEH_FLY_COUNTER"] = 356] = "VEH_FLY_COUNTER";
    Controls[Controls["VEH_TRANSFORM"] = 357] = "VEH_TRANSFORM";
    Controls[Controls["QUAD_LOCO_REVERSE"] = 358] = "QUAD_LOCO_REVERSE";
    Controls[Controls["RESPAWN_FASTER"] = 359] = "RESPAWN_FASTER";
    Controls[Controls["HUDMARKER_SELECT"] = 360] = "HUDMARKER_SELECT";
})(types_Controls || (types_Controls = {}));
const Keys = {
    ESC: types_Controls.REPLAY_TOGGLE_TIMELINE,
    F1: types_Controls.REPLAY_START_STOP_RECORDING,
    F2: types_Controls.REPLAY_START_STOP_RECORDING_SECONDARY,
    F3: types_Controls.SAVE_REPLAY_CLIP,
    F5: types_Controls.SELECT_CHARACTER_MICHAEL,
    F6: types_Controls.SELECT_CHARACTER_FRANKLIN,
    F7: types_Controls.SELECT_CHARACTER_TREVOR,
    F8: types_Controls.SELECT_CHARACTER_MULTIPLAYER,
    F9: types_Controls.DROP_WEAPON,
    F10: types_Controls.DROP_AMMO,
    F11: types_Controls.SWITCH_VISOR,
    '~': types_Controls.ENTER_CHEAT_CODE,
    '1': types_Controls.SELECT_WEAPON_UNARMED,
    '2': types_Controls.SELECT_WEAPON_MELEE,
    '3': types_Controls.SELECT_WEAPON_SHOTGUN,
    '4': types_Controls.SELECT_WEAPON_HEAVY,
    '5': types_Controls.SELECT_WEAPON_SPECIAL,
    '6': types_Controls.SELECT_WEAPON_HANDGUN,
    '7': types_Controls.SELECT_WEAPON_SMG,
    '8': types_Controls.SELECT_WEAPON_AUTO_RIFLE,
    '9': types_Controls.SELECT_WEAPON_SNIPER,
    '-': types_Controls.VEH_PREV_RADIO_TRACK,
    '=': types_Controls.VEH_NEXT_RADIO_TRACK,
    BACKSPACE: types_Controls.CELLPHONE_CANCEL,
    TAB: types_Controls.SELECT_WEAPON,
    Q: types_Controls.COVER,
    W: types_Controls.MOVE_UP_ONLY,
    E: types_Controls.PICKUP,
    R: types_Controls.RELOAD,
    T: types_Controls.MP_TEXT_CHAT_ALL,
    Y: types_Controls.MP_TEXT_CHAT_TEAM,
    U: types_Controls.REPLAY_SCREENSHOT,
    P: types_Controls.FRONTEND_PAUSE,
    '[': types_Controls.SNIPER_ZOOM,
    ']': types_Controls.SNIPER_ZOOM_IN_ONLY,
    ENTER: types_Controls.SKIP_CUTSCENE,
    CAPS: types_Controls.VEH_PUSHBIKE_SPRINT,
    A: types_Controls.MOVE_LEFT_ONLY,
    S: types_Controls.SCRIPTED_FLY_UD,
    D: types_Controls.SCRIPTED_FLY_LR,
    F: types_Controls.ENTER,
    G: types_Controls.DETONATE,
    H: types_Controls.VEH_HEADLIGHT,
    K: types_Controls.REPLAY_SHOWHOTKEY,
    L: types_Controls.CELLPHONE_CAMERA_FOCUS_LOCK,
    LEFTSHIFT: types_Controls.SPRINT,
    Z: types_Controls.MULTIPLAYER_INFO,
    X: types_Controls.VEH_DUCK,
    C: types_Controls.LOOK_BEHIND,
    V: types_Controls.NEXT_CAMERA,
    B: types_Controls.SPECIAL_ABILITY_SECONDARY,
    N: types_Controls.PUSH_TO_TALK,
    M: types_Controls.INTERACTION_MENU,
    ',': types_Controls.VEH_PREV_RADIO,
    '.': types_Controls.VEH_NEXT_RADIO,
    LEFTCTRL: types_Controls.DUCK,
    LEFTALT: types_Controls.CHARACTER_WHEEL,
    SPACE: types_Controls.JUMP,
    RIGHTCTRL: types_Controls.VEH_ATTACK2,
    HOME: types_Controls.FRONTEND_SOCIAL_CLUB_SECONDARY,
    PAGEUP: types_Controls.SCRIPTED_FLY_ZUP,
    PAGEDOWN: types_Controls.SCRIPTED_FLY_ZDOWN,
    DELETE: types_Controls.CELLPHONE_OPTION,
    LEFT: types_Controls.CELLPHONE_LEFT,
    RIGHT: types_Controls.CELLPHONE_RIGHT,
    TOP: types_Controls.PHONE,
    DOWN: types_Controls.CELLPHONE_DOWN,
    NENTER: types_Controls.FRONTEND_ACCEPT,
    N4: types_Controls.VEH_FLY_ROLL_LEFT_ONLY,
    N5: types_Controls.VEH_MOVE_UD,
    N6: types_Controls.VEH_FLY_ROLL_LR,
    'N+': types_Controls.VEH_CINEMATIC_UP_ONLY,
    'N-': types_Controls.VEH_CINEMATIC_DOWN_ONLY,
    N7: types_Controls.VEH_FLY_SELECT_TARGET_LEFT,
    N8: types_Controls.VEH_MOVE_UP_ONLY,
    N9: types_Controls.VEH_FLY_SELECT_TARGET_RIGHT,
};

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/DisabledControl.js

class DisabledControl_DisabledControl {
    constructor() {
        throw new Error('Static class DisabledControl should not be instantiated!');
    }
    static JustReleased(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsDisabledControlJustReleased(inputGroup, control);
    }
    static JustPressed(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsDisabledControlJustPressed(inputGroup, control);
    }
    static Released(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsDisabledControlReleased(inputGroup, control);
    }
    static Pressed(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsDisabledControlPressed(inputGroup, control);
    }
    static Normal(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return GetDisabledControlNormal(inputGroup, control);
    }
    static Enable(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        DisableControlAction(inputGroup, control, false);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/Control.js


class Control_Control {
    constructor() {
        this.Disabled = DisabledControl;
        throw new Error('Static class Control should not be instantiated!');
    }
    static JustReleased(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsControlJustReleased(inputGroup, control);
    }
    static JustPressed(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsControlJustPressed(inputGroup, control);
    }
    static Released(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsControlReleased(inputGroup, control);
    }
    static Pressed(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsControlPressed(inputGroup, control);
    }
    static Enabled(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return !!IsControlEnabled(inputGroup, control);
    }
    static Normal(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        return GetControlNormal(inputGroup, control);
    }
    static Disable(control, inputGroup = InputGroups.INPUTGROUP_MOVE) {
        DisableControlAction(inputGroup, control, true);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/index.js



const InstructionalButtonText = {
    100: 'LEFT CLICK',
    101: 'RIGHT CLICK',
    102: 'MIDDLE MOUSE',
    103: 'MOUSE 4',
    104: 'MOUSE 5',
    108: 'MOUSE LEFT',
    109: 'MOUSE RIGHT',
    110: 'MOUSE UP',
    111: 'MOUSE DOWN',
    112: 'MOUSE R/L',
    113: 'MOUSE U/D',
    115: 'MOUSE WHEEL UP',
    116: 'MOUSE WHEEL DOWN',
    117: 'MOUSE WHEEL UP/DOWN',
    130: 'NUM -',
    131: 'NUM +',
    132: 'NUM .',
    134: 'NUM *',
    135: 'NUM ENTER',
    136: 'NUM 0',
    137: 'NUM 1',
    138: 'NUM 2',
    139: 'NUM 3',
    140: 'NUM 4',
    141: 'NUM 5',
    142: 'NUM 6',
    143: 'NUM 7',
    144: 'NUM 8',
    145: 'NUM 9',
    170: 'F1',
    171: 'F2',
    172: 'F3',
    173: 'F4',
    174: 'F5',
    175: 'F6',
    176: 'F7',
    177: 'F8',
    178: 'F9',
    179: 'F10',
    180: 'F11',
    181: 'F12',
    194: 'UP ARROW',
    195: 'DOWN ARROW',
    196: 'LEFT ARROW',
    197: 'RIGHT ARROW',
    198: 'DEL',
    199: 'ESC',
    200: 'INSERT',
    201: 'END',
    995: '???',
    1000: 'LEFT SHIFT',
    1001: 'RIGHT SHIFT',
    1002: 'TAB',
    1003: 'ENTER',
    1004: 'BACKSPACE',
    1006: 'SCROLL LOCK',
    1007: 'PAUSE',
    1008: 'HOME',
    1009: 'PG UP',
    1010: 'PG DN',
    1011: 'NUM LOCK',
    1012: 'CAPS',
    1013: 'LEFT CTRL',
    1014: 'RIGHT CTRL',
    1015: 'LEFT ALT',
    2000: 'SPACE',
};
function getInstructionalButtonText(keymap) {
    const val = GetControlInstructionalButton(2, GetHashKey('+inventory') | 0x80000000, true);
    return val
        .split('%')
        .map(part => {
        if (part.startsWith('t_'))
            return part.substr(2);
        if (part.startsWith('b_'))
            return InstructionalButtonText[part.substr(2)] || part;
        return part;
    })
        .filter(v => v)
        .join(' / ');
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/Spot.js


class Spot {
    constructor(props) {
        this._entered = false;
        this._lazy = 0;
        this._distance = 10000;
        Object.assign(this, props);
    }
    get entered() {
        return this._entered;
    }
    update(coords) {
        if (this._lazy > 0) {
            this._lazy -= 1;
        }
        else {
            this._distance = LocalPlayer.coords.distanceTo(coords);
            this._lazy = 10;
        }
        const distance = this._distance;
        // События входа-выхода из спота
        if (distance < this.radius) {
            if (this.onTick)
                this.onTick(coords);
            if (!this._entered) {
                this._entered = true;
                if (this.onEnter)
                    this.onEnter();
            }
            if (this.notificationText) {
                AddTextEntry('spotHelpNotification', this.notificationText);
                DisplayHelpTextThisFrame('spotHelpNotification', false);
            }
            if (Control.JustReleased(Controls.PICKUP)) {
                if (this.onPress)
                    this.onPress();
            }
        }
        else {
            if (this._entered) {
                this._entered = false;
                if (this.onExit)
                    this.onExit();
            }
        }
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Game/index.js












// export * from './CulledProp';

;// CONCATENATED MODULE: ./client/Core/ClientCallback.ts
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

const _ClientCallback = class extends Static {
  static Register(name, callback) {
    _ClientCallback.ClientCallbacks[name] = callback;
    console.info(`^3Client callback registered: ${name}`);
  }
  static Trigger(name, ...args) {
    return __async(this, null, function* () {
      console.debug("^3Client triggered client callback: ", name, args);
      if (!_ClientCallback.ClientCallbacks[name])
        throw new Error(`Client callback with name ${name} not found!`);
      const ret = _ClientCallback.ClientCallbacks[name](...args);
      return Promise.resolve(ret);
    });
  }
};
let ClientCallback = _ClientCallback;
ClientCallback.ClientCallbacks = {};
onNet(`engine:triggerClientCallback`, (cid, name, ...args) => __async(undefined, null, function* () {
  console.debug("^3Client retrieved client callback: ", cid, name, args);
  ClientCallback.Trigger(name, ...args).then((result) => {
    console.debug("^3Client sending client callback result: ", result);
    emitNet(`engine:triggerClientCallbackResult`, cid, result);
  });
}));
on(`engine:registerClientCallback`, (name, callback) => {
  ClientCallback.Register(name, callback);
});

;// CONCATENATED MODULE: ./client/Core/ServerCallback.ts
var ServerCallback_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

const _ServerCallback = class extends Static {
  static Trigger(name, ...args) {
    return ServerCallback_async(this, null, function* () {
      const cid = _ServerCallback.GLOBAL_ID;
      _ServerCallback.GLOBAL_ID += 1;
      if (_ServerCallback.GLOBAL_ID > 65535)
        _ServerCallback.GLOBAL_ID = 1;
      emitNet(`engine:triggerServerCallback`, cid, name, ...args);
      let promiseResolve;
      let promiseReject;
      const promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });
      _ServerCallback.ServerCallbacks[cid] = [promiseResolve, promiseReject];
      return promise;
    });
  }
};
let ServerCallback_ServerCallback = _ServerCallback;
ServerCallback_ServerCallback.GLOBAL_ID = 0;
ServerCallback_ServerCallback.ServerCallbacks = {};
on(`engine:triggerServerCallback`, (cb, name, ...args) => ServerCallback_async(undefined, null, function* () {
  ServerCallback_ServerCallback.Trigger(name, ...args).then(cb);
}));
onNet(`engine:triggerServerCallbackResult`, (cid, result) => {
  if (ServerCallback_ServerCallback.ServerCallbacks[cid]) {
    ServerCallback_ServerCallback.ServerCallbacks[cid][0](result);
    delete ServerCallback_ServerCallback.ServerCallbacks[cid];
  }
});

;// CONCATENATED MODULE: ./client/Core/index.ts



;// CONCATENATED MODULE: ./client/Game/Player.ts
var Player_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};



ClientCallback.Register("engine:teleport", (coords) => Player_async(undefined, null, function* () {
  const handle = GetPlayerPed(PlayerId());
  SetEntityCoords(handle, coords.x, coords.y, coords.z, true, false, false, false);
}));
let playerLoaded = false;
onNet("skin:modelLoaded", () => Player_async(undefined, null, function* () {
  if (playerLoaded)
    return;
  yield Utils_Delay(1e3);
  if (LocalPlayer_LocalPlayer.state.status.health) {
    LocalPlayer_LocalPlayer.ped.health = LocalPlayer_LocalPlayer.state.status.health - 1;
  }
  playerLoaded = true;
}));
setTick(() => Player_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const {ped} = LocalPlayer_LocalPlayer;
  const {coords} = ped;
  const forward = ped.forwardVector;
  if (!LocalPlayer_LocalPlayer.state.coords || Vector3.FromArray(LocalPlayer_LocalPlayer.state.coords).distanceTo(coords) > 0.1) {
    LocalPlayer_LocalPlayer.state.set("coords", coords.toArray(), true);
  }
  if (!LocalPlayer_LocalPlayer.state.forward || Vector3.FromArray(LocalPlayer_LocalPlayer.state.forward).distanceTo(forward) > 0.1) {
    LocalPlayer_LocalPlayer.state.set("forward", forward.toArray(), true);
  }
  LocalPlayer_LocalPlayer.state.set("health", LocalPlayer_LocalPlayer.ped.health, true);
}));

;// CONCATENATED MODULE: ./client/Game/CulledProp.ts
var CulledProp_async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};


const culledProps = {};
class CulledProp {
  constructor(init, understandTheConsequences = false) {
    this.heading = 0;
    this.cullDistance = 200;
    this.prop = 0;
    this._currentDistance = 99999;
    if (!understandTheConsequences)
      throw new Error("Attempt to instance class CulledProp!");
    Object.assign(this, init);
  }
  spawn() {
    return CulledProp_async(this, null, function* () {
      if (DoesEntityExist(this.prop))
        return false;
      yield Utils_loadModel(this.model);
      this.prop = CreateObjectNoOffset(this.model, this.coords.x, this.coords.y, this.coords.z, false, false, false);
      SetEntityAlpha(this.prop, 0, false);
      FreezeEntityPosition(this.prop, true);
      for (let i = 0; i < 255; i += 51) {
        SetEntityAlpha(this.prop, i, false);
        yield Utils_Delay(0);
      }
      SetEntityAlpha(this.prop, 255, false);
      SetModelAsNoLongerNeeded(this.model);
      const success = DoesEntityExist(this.prop);
      if (success) {
        emit("engineCore:CulledProp:spawn", this.id);
      }
      return success;
    });
  }
  despawn() {
    return CulledProp_async(this, null, function* () {
      Log.info("despawn", this.id, this.prop);
      if (!DoesEntityExist(this.prop))
        return false;
      for (let i = 255; i > 0; i -= 51) {
        SetEntityAlpha(this.prop, i, false);
        yield Utils_Delay(0);
      }
      SetEntityAlpha(this.prop, 0, false);
      DeleteObject(this.prop);
      emit("engineCore:CulledProp:despawn", this.id);
      return true;
    });
  }
  tick(playerCoords) {
    return CulledProp_async(this, null, function* () {
      const distance = playerCoords.distanceTo(this.coords);
      this._currentDistance = distance;
      if (DoesEntityExist(this.prop)) {
        if (!this.spawned) {
          yield this.despawn();
        } else if (distance > this.cullDistance + 1 && !IsEntityOnScreen(this.prop)) {
          yield this.despawn();
        }
      } else if (distance < this.cullDistance && this.spawned) {
        yield this.spawn();
      }
    });
  }
  get distance() {
    return this._currentDistance;
  }
}
setTick(() => CulledProp_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const coords = Vector3.FromArray(GetEntityCoords(PlayerPedId(), true));
  Object.values(culledProps).forEach((prop) => {
    prop.tick(coords);
  });
}));
onNet("engineCore:CulledProp:update", (resourceName, propInfo) => {
  if (!culledProps[propInfo.id]) {
    culledProps[propInfo.id] = new CulledProp(propInfo, true);
  } else {
    Object.assign(culledProps[propInfo.id], propInfo);
  }
});

;// CONCATENATED MODULE: ./client/Game/index.ts



;// CONCATENATED MODULE: ./client/index.ts





console.log("CLIENT CORE IS STARTING");
ClientCallback.Register("engine:teleport", (coords) => {
  LocalPlayer_LocalPlayer.ped.coords = coords;
});
ClientCallback.Register("engine:teleportXY", (x, y, heading) => {
  LocalPlayer_LocalPlayer.ped.teleportXY(new Vector2(x, y), heading);
});
ClientCallback.Register("engine:setHealth", (health) => {
  LocalPlayer_LocalPlayer.ped.health = health;
});
ClientCallback.Register("engine:revive", () => {
  LocalPlayer_LocalPlayer.revive();
});

/******/ })()
;