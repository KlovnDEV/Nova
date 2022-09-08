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

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Utils/index.js
class TimeoutError extends Error {
    constructor(message = 'Timeout error occurred') {
        super(message);
        this.name = "TimeoutError";
    }
}
const promiseTimeout = function (promise, ms = 10000) {
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
const assert = (value, message = '') => {
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




;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/Blip.js

class Blip {
    constructor(opts) {
        if (opts.entity) {
            this.handle = AddBlipForEntity(opts.entity.handle);
        }
        else if (opts.radius) {
            this.handle = AddBlipForRadius(opts.coords.x, opts.coords.y, opts.coords.z, opts.radius);
        }
        else if (opts.area) {
            this.handle = AddBlipForArea(opts.coords.x, opts.coords.y, opts.coords.z, opts.area.width, opts.area.height);
        }
        else if (opts.coords) {
            this.handle = AddBlipForCoord(opts.coords.x, opts.coords.y, opts.coords.z);
        }
        else {
            throw new Error('Incorrect blip constructor usage!');
        }
        if (!this.exist)
            throw new Error('Unable to create blip!');
        // default values
        opts.display = 4;
        opts.shortRange = true;
        Object.assign(this, opts);
    }
    get coords() {
        return Vector3.FromArray(GetBlipCoords(this.handle));
    }
    set coords(coords) {
        SetBlipCoords(this.handle, coords.x, coords.y, coords.z);
    }
    get sprite() {
        return GetBlipSprite(this.handle);
    }
    set sprite(sprite) {
        SetBlipSprite(this.handle, sprite);
    }
    get exist() {
        return DoesBlipExist(this.handle);
    }
    get color() {
        return GetBlipColour(this.handle);
    }
    set color(color) {
        SetBlipColour(this.handle, color);
    }
    get alpha() {
        return GetBlipAlpha(this.handle);
    }
    set alpha(alpha) {
        SetBlipAlpha(this.handle, alpha);
    }
    set display(display) {
        SetBlipDisplay(this.handle, display);
    }
    set scale(scale) {
        SetBlipScale(this.handle, scale);
    }
    set friendly(friendly) {
        SetBlipFriendly(this.handle, friendly);
    }
    set bright(bright) {
        SetBlipBright(this.handle, bright);
    }
    set category(category) {
        SetBlipCategory(this.handle, category);
    }
    set displayIndicator(display) {
        SetBlipDisplayIndicatorOnBlip(this.handle, display);
    }
    set hiddenOnLegend(hidden) {
        SetBlipHiddenOnLegend(this.handle, hidden);
    }
    set rotation(rotation) {
        SetBlipRotation(this.handle, Math.ceil(rotation));
    }
    get shortRange() {
        return IsBlipShortRange(this.handle);
    }
    set shortRange(shortRange) {
        SetBlipAsShortRange(this.handle, shortRange);
    }
    set text(text) {
        BeginTextCommandSetBlipName('STRING');
        AddTextComponentSubstringPlayerName(text);
        EndTextCommandSetBlipName(this.handle);
    }
    set showHeading(show) {
        ShowHeadingIndicatorOnBlip(this.handle, show);
    }
    remove() {
        if (!this.exist)
            return false;
        RemoveBlip(this.handle);
        return true;
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/Static.js
class Static_Static {
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




;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/types.js
var Sex;
(function (Sex) {
    Sex[Sex["MALE"] = 0] = "MALE";
    Sex[Sex["FEMALE"] = 1] = "FEMALE";
})(Sex || (Sex = {}));

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/index.js





;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared.js



;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/Camera.js


class Camera {
    constructor(props) {
        this.handle = -1;
    }
    start() {
        assert(this.coords, 'Camera coordinates must be provided');
        if (!this.isActive) {
            this.handle = CreateCam('DEFAULT_SCRIPTED_CAMERA', true);
        }
        SetCamCoord(this.handle, this._coords.x, this._coords.y, this._coords.z);
        RenderScriptCams(true, true, 0, true, true);
        SetCamActive(this.handle, true);
    }
    stop() {
        if (this.isActive) {
            SetCamActive(this.handle, false);
            RenderScriptCams(false, true, 500, true, true);
            DestroyCam(this.handle, true);
            this.handle = -1;
        }
    }
    get isActive() {
        return this.handle >= 0 && DoesCamExist(this.handle);
    }
    get coords() {
        return this._coords;
    }
    set coords(coords) {
        this._coords = coords;
        if (this.isActive)
            SetCamCoord(this.handle, coords.x, coords.y, coords.z);
    }
    get rotation() {
        return this._rot;
    }
    set rotation(rotation) {
        this._rot = rotation;
        if (this.isActive)
            SetCamRot(this.handle, rotation.x, rotation.y, rotation.z, 0);
    }
    static get gameplayCamCoords() {
        const v3 = GetGameplayCamCoord();
        return new Vector3(v3[0], v3[1], v3[2]);
    }
    static get gameplayCamRot() {
        return Vector3.FromArray(GetGameplayCamRot(0));
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/types.js
var InputGroups;
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
})(InputGroups || (InputGroups = {}));
var Controls;
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
})(Controls || (Controls = {}));
const Keys = {
    ESC: Controls.REPLAY_TOGGLE_TIMELINE,
    F1: Controls.REPLAY_START_STOP_RECORDING,
    F2: Controls.REPLAY_START_STOP_RECORDING_SECONDARY,
    F3: Controls.SAVE_REPLAY_CLIP,
    F5: Controls.SELECT_CHARACTER_MICHAEL,
    F6: Controls.SELECT_CHARACTER_FRANKLIN,
    F7: Controls.SELECT_CHARACTER_TREVOR,
    F8: Controls.SELECT_CHARACTER_MULTIPLAYER,
    F9: Controls.DROP_WEAPON,
    F10: Controls.DROP_AMMO,
    F11: Controls.SWITCH_VISOR,
    '~': Controls.ENTER_CHEAT_CODE,
    '1': Controls.SELECT_WEAPON_UNARMED,
    '2': Controls.SELECT_WEAPON_MELEE,
    '3': Controls.SELECT_WEAPON_SHOTGUN,
    '4': Controls.SELECT_WEAPON_HEAVY,
    '5': Controls.SELECT_WEAPON_SPECIAL,
    '6': Controls.SELECT_WEAPON_HANDGUN,
    '7': Controls.SELECT_WEAPON_SMG,
    '8': Controls.SELECT_WEAPON_AUTO_RIFLE,
    '9': Controls.SELECT_WEAPON_SNIPER,
    '-': Controls.VEH_PREV_RADIO_TRACK,
    '=': Controls.VEH_NEXT_RADIO_TRACK,
    BACKSPACE: Controls.CELLPHONE_CANCEL,
    TAB: Controls.SELECT_WEAPON,
    Q: Controls.COVER,
    W: Controls.MOVE_UP_ONLY,
    E: Controls.PICKUP,
    R: Controls.RELOAD,
    T: Controls.MP_TEXT_CHAT_ALL,
    Y: Controls.MP_TEXT_CHAT_TEAM,
    U: Controls.REPLAY_SCREENSHOT,
    P: Controls.FRONTEND_PAUSE,
    '[': Controls.SNIPER_ZOOM,
    ']': Controls.SNIPER_ZOOM_IN_ONLY,
    ENTER: Controls.SKIP_CUTSCENE,
    CAPS: Controls.VEH_PUSHBIKE_SPRINT,
    A: Controls.MOVE_LEFT_ONLY,
    S: Controls.SCRIPTED_FLY_UD,
    D: Controls.SCRIPTED_FLY_LR,
    F: Controls.ENTER,
    G: Controls.DETONATE,
    H: Controls.VEH_HEADLIGHT,
    K: Controls.REPLAY_SHOWHOTKEY,
    L: Controls.CELLPHONE_CAMERA_FOCUS_LOCK,
    LEFTSHIFT: Controls.SPRINT,
    Z: Controls.MULTIPLAYER_INFO,
    X: Controls.VEH_DUCK,
    C: Controls.LOOK_BEHIND,
    V: Controls.NEXT_CAMERA,
    B: Controls.SPECIAL_ABILITY_SECONDARY,
    N: Controls.PUSH_TO_TALK,
    M: Controls.INTERACTION_MENU,
    ',': Controls.VEH_PREV_RADIO,
    '.': Controls.VEH_NEXT_RADIO,
    LEFTCTRL: Controls.DUCK,
    LEFTALT: Controls.CHARACTER_WHEEL,
    SPACE: Controls.JUMP,
    RIGHTCTRL: Controls.VEH_ATTACK2,
    HOME: Controls.FRONTEND_SOCIAL_CLUB_SECONDARY,
    PAGEUP: Controls.SCRIPTED_FLY_ZUP,
    PAGEDOWN: Controls.SCRIPTED_FLY_ZDOWN,
    DELETE: Controls.CELLPHONE_OPTION,
    LEFT: Controls.CELLPHONE_LEFT,
    RIGHT: Controls.CELLPHONE_RIGHT,
    TOP: Controls.PHONE,
    DOWN: Controls.CELLPHONE_DOWN,
    NENTER: Controls.FRONTEND_ACCEPT,
    N4: Controls.VEH_FLY_ROLL_LEFT_ONLY,
    N5: Controls.VEH_MOVE_UD,
    N6: Controls.VEH_FLY_ROLL_LR,
    'N+': Controls.VEH_CINEMATIC_UP_ONLY,
    'N-': Controls.VEH_CINEMATIC_DOWN_ONLY,
    N7: Controls.VEH_FLY_SELECT_TARGET_LEFT,
    N8: Controls.VEH_MOVE_UP_ONLY,
    N9: Controls.VEH_FLY_SELECT_TARGET_RIGHT,
};

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Input/DisabledControl.js

class DisabledControl {
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


class Control {
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

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/TargettedCamera.js


class TargettedCamera {
    constructor(props) {
        this.minDistance = 0.0;
        this.maxDistance = 1.0;
        this.heading = 0.0;
        this.camZoom = 0.5;
        this.controlsEnabled = false;
        this.camera = new Camera(props);
        Object.assign(this, props);
    }
    get isActive() {
        var _a;
        return (_a = this.camera) === null || _a === void 0 ? void 0 : _a.isActive;
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
        }
        else if (DisabledControl.Pressed(Controls.WEAPON_WHEEL_PREV, 24)) {
            this.camZoom -= 20.0 * frameTime;
        }
        if (DisabledControl.Pressed(Controls.AIM)) {
            this.heading -= DisabledControl.Normal(Controls.LOOK_LR) * frameTime * 2000.0;
        }
        if (DisabledControl.Pressed(Controls.MOVE_LEFT_ONLY)) {
            this.heading -= frameTime * 200.0;
        }
        else if (DisabledControl.Pressed(Controls.MOVE_RIGHT_ONLY)) {
            this.heading += frameTime * 200.0;
        }
    }
    update() {
        if (!this.camera.isActive)
            return;
        if (this.controlsEnabled) {
            this.skinCamControls();
        }
        if (this.heading > 360)
            this.heading -= 360;
        if (this.heading < 0)
            this.heading += 360;
        if (this.camZoom < 0)
            this.camZoom = 0;
        else if (this.camZoom > 1)
            this.camZoom = 1;
        var angle = (this.heading * Math.PI) / 180.0;
        var theta = [Math.cos(angle), Math.sin(angle), 0];
        var distance = this.minDistance + (this.maxDistance - this.minDistance) * this.camZoom;
        this.camera.coords = this.target.addXYZ(distance * theta[0], distance * theta[1], 0);
        PointCamAtCoord(this.camera.handle, this.target.x, this.target.y, this.target.z);
    }
}

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
            await Utils_Delay(0);
        }
    }
}
async function loadTextureDict(dict) {
    if (HasStreamedTextureDictLoaded(dict))
        return;
    RequestStreamedTextureDict(dict, true);
    while (!HasStreamedTextureDictLoaded(dict)) {
        // eslint-disable-next-line no-await-in-loop
        await Utils_Delay(0);
    }
}
async function loadModel(model) {
    RequestModel(model);
    while (!HasModelLoaded(model)) {
        // eslint-disable-next-line no-await-in-loop
        await Utils_Delay(0);
    }
}
function findIterator(First, Next, End) {
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



class Entity {
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
        return new Entity(0);
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
class Vehicle extends Entity {
    get liquid() {
        return this.state['liquid'] || { name: 'none', amount: 0 };
    }
    static FromEntity(entity) {
        if (!IsEntityAVehicle(entity.handle)) {
            throw new Error('Unable to cast Entity to Vehicle!');
        }
        return new Vehicle(entity.handle);
    }
    get vehicleClass() {
        return GetVehicleClass(this.handle);
    }
    static getClosest(coords, radius = 5.0, model, flags = 70) {
        const modelHash = model ? GetHashKey(model) : 0;
        return new Vehicle(GetClosestVehicle(coords.x, coords.y, coords.z, radius, modelHash, flags));
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
        return new Entity(GetPedInVehicleSeat(this.handle, seatId));
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
                await loadModel(model);
                const vehicle = new Vehicle(CreateVehicle(model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity));
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
        return promiseTimeout(promise, 10000);
    }
    static get None() {
        return new Vehicle(0);
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
class Ped extends Entity {
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
        return new Vehicle(GetVehiclePedIsIn(this.handle, false));
    }
    getVehiclePedWasIn() {
        return new Vehicle(GetVehiclePedIsIn(this.handle, true));
    }
    getVehiclePedIsTryingToEnter() {
        return new Vehicle(GetVehiclePedIsTryingToEnter(this.handle));
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
                await loadModel(model);
                const ped = new Ped(CreatePed(pedType, model, coords.x, coords.y, coords.z, heading, isNetwork, netMissionEntity));
                SetModelAsNoLongerNeeded(model);
                if (!ped.exist)
                    reject(new Error(`Ped не создан!`));
                resolve(ped);
            });
        });
        return promiseTimeout(promise, 10000);
    }
    static get None() {
        return new Ped(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Core/ServerCallback.js

class ServerCallback extends Static_Static {
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

class ESX extends Static_Static {
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




class Player {
    constructor(handle) {
        this.handle = +handle;
        assert(!Number.isNaN(this.handle), 'Invalid player handle!');
        this.name = GetPlayerName(this.handle);
        assert(this.name && this.name !== '**Invalid**', 'Invalid player name!');
        this.state = __webpack_require__.g.Player(this.serverId).state;
        assert(this.state, 'Invalid player state!');
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




class LocalPlayerProto extends Player {
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
const LocalPlayer = new LocalPlayerProto();
/* Кэшируем нужные поля state локального игрока,
   чтобы к ним можно было обращаться в setTick
   без потери производительности, но с задержкой в 0.1 сек */
setInterval(() => {
    LocalPlayerProto._roles = LocalPlayer.state['roles'] || {};
    LocalPlayerProto._money = LocalPlayer.state['money'] || {};
    LocalPlayerProto._status = LocalPlayer.state['status'] || {};
}, 100);
onNet('engine:onPlayerMoneySet', (account, amount) => {
    LocalPlayer.onMoneySet.emit(account, amount);
});
onNet('engine:onPlayerMoneyAdd', (account, amount, newValue) => {
    LocalPlayer.onMoneyAdd.emit(account, amount, newValue);
});
onNet('engine:onPlayerMoneySub', (account, amount, newValue) => {
    LocalPlayer.onMoneySub.emit(account, amount, newValue);
});
setTick(() => {
    LocalPlayerProto._coords = LocalPlayer.ped.coords;
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



class Prop extends Entity {
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

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/Sprite.js



class Sprite_Sprite {
    constructor(props) {
        this._alpha = 0.0;
        this._lazy = false;
        this._lazy_skip = 0;
        this.heading = 0.0;
        this.scale = Vector2.FromArray([1.0, 1.0]);
        this.color = [255, 255, 255];
        this.alpha = 255;
        this.textureDict = null;
        this.textureName = null;
        //   distanceFade: boolean = false;
        this.drawDistance = 20;
        Object.assign(this, props);
    }
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
    draw() {
        let desiredAlpha = this.alpha;
        // Плавно уводим альфу в 0 при выходе из drawDistance
        const distance = LocalPlayer.coords.distanceTo(this.coords);
        if (this.drawDistance && distance > this.drawDistance) {
            desiredAlpha = 0;
        }
        this._alpha = this._alpha * 0.98 + desiredAlpha * 0.02;
        if (!this._alpha)
            return;
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
            DrawSprite(this.textureDict, this.textureName, x, // offsetx
            y, // offsety
            scalex, scaley, this.heading, this.color[0], this.color[1], this.color[2], Math.ceil(this._alpha));
            ClearDrawOrigin();
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/CircularProgress.js


class CircularProgress extends (/* unused pure expression or super */ null && (Sprite)) {
    constructor(props) {
        super(props);
        this.value = 0;
        this.duiObj = null;
        this.init();
    }
    async init() {
        this.duiObj = CreateDui('nui://EngineLib/html/progress.html', 256, 256);
        for (let i = 1; i < 60; i += 1) {
            if (IsDuiAvailable(this.duiObj))
                break;
            await Delay(1);
        }
        if (!IsDuiAvailable(this.duiObj))
            throw new Error('DUI unavailable');
        const handle = GetDuiHandle(this.duiObj);
        const txdHandle = CreateRuntimeTxd(this.textureDict);
        CreateRuntimeTextureFromDuiHandle(txdHandle, this.textureName, handle);
    }
    destroy() {
        SetStreamedTextureDictAsNoLongerNeeded(this.textureDict);
        DestroyDui(this.duiObj);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/Marker.js



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
class Marker {
    constructor(props) {
        var _a;
        this.coordZOffset = 0;
        this._alpha = 0;
        this._markerType = 1;
        this._entered = false;
        this._lazy = 0;
        this._distance = 10000;
        this.direction = new Vector3(0, 0, 0);
        this.rotation = new Vector3(0, 0, 0);
        this.scale = new Vector3(1, 1, 1);
        this.color = [0, 64, 255];
        this.alpha = 100;
        this.bob = false;
        this.faceCamera = true;
        this.rotate = false;
        this.textureDict = null;
        this.textureName = null;
        this.drawOnEntities = false;
        this.drawDistance = 20;
        (_a = props.markerType) !== null && _a !== void 0 ? _a : (props.markerType = 1);
        Object.assign(this, props);
    }
    get entered() {
        return this._entered;
    }
    get markerType() {
        return this._markerType;
    }
    set markerType(markerType) {
        this._markerType = (markerType >= 0 && markerType <= 43) ? markerType : 1;
        this.coordZOffset = markerTypeOffsets[this._markerType] || 0;
    }
    //   triggerDistance: number;
    //   skipFrames: number;
    draw() {
        let desiredAlpha = this.alpha;
        // Плавно уводим альфу в 0 при выходе из drawDistance
        if (this._lazy > 0) {
            this._lazy -= 1;
        }
        else {
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
                if (this.onEnter)
                    this.onEnter();
            }
            if (this.notificationText) {
                AddTextEntry('markerHelpNotification', this.notificationText);
                DisplayHelpTextThisFrame('markerHelpNotification', false);
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
        if (this._alpha < 0.001)
            return;
        DrawMarker(this.markerType, this.coords.x, this.coords.y, this.coords.z + this.coordZOffset, this.direction.x, this.direction.y, this.direction.z, this.rotation.x, this.rotation.y, this.rotation.z, this.scale.x, this.scale.y, this.scale.z, this.color[0], this.color[1], this.color[2], Math.floor(this._alpha), this.bob, this.faceCamera, 2, // p19
        this.rotate, this.textureDict, this.textureName, this.drawOnEntities);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/Utils.js

function chatMessage(...args) {
    TriggerEvent('chat:addMessage', { args });
}
function drawText3D(coords, text, size = 1, font = 0) {
    const camCoords = Vector3.FromArray(GetGameplayCamCoords());
    const distance = coords.distanceTo(camCoords);
    let scale = (size / distance) * 2;
    const fov = (1 / GetGameplayCamFov()) * 100;
    scale *= fov;
    SetTextScale(0.0 * scale, 0.55 * scale);
    SetTextFont(font);
    SetTextColour(255, 255, 255, 255);
    SetTextDropshadow(0, 0, 0, 0, 255);
    SetTextDropShadow();
    SetTextOutline();
    SetTextCentre(true);
    SetDrawOrigin(coords.x, coords.y, coords.z, 0);
    BeginTextCommandDisplayText('STRING');
    AddTextComponentSubstringPlayerName(text);
    EndTextCommandDisplayText(0.0, 0.0);
    ClearDrawOrigin();
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/Graphics/index.js








;// CONCATENATED MODULE: ./client/arcade/index.ts


const blips = [];
blips.push(new Blip({
  sprite: 740,
  color: 83,
  coords: new Vector3(756.25, -816.23, 26.52)
}));

;// CONCATENATED MODULE: ./client/atm/anims.ts
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



function headTowardsEntity(ped, entity, timeout) {
  return __async(this, null, function* () {
    for (let k = 1; k < timeout * 10; k += 1) {
      const {coords} = entity;
      if (ped.isHeadingTowardsPosition(coords, 10)) {
        break;
      }
      ped.tasks.turnToFaceEntity(entity, 200);
      yield Utils_Delay(100);
    }
  });
}
function moveTowardsEntity(ped, entity, minDist = 0, timeout = 1e4) {
  return __async(this, null, function* () {
    for (let k = 1; k < timeout * 10; k += 1) {
      const curDist = ped.coords.distanceTo(entity.coords);
      if (curDist <= minDist + 0.01) {
        break;
      }
      ped.tasks.goToEntity(entity, 200, 0, 4);
      yield Utils_Delay(100);
    }
  });
}
function playATMAnimIn(ped, atmEntity) {
  return __async(this, null, function* () {
    const boneIndex = ped.getBoneIndex(57005);
    const prop = yield Prop.Spawn("prop_cs_credit_card", ped.coords, 0, true, false, true);
    prop.setAlpha(0);
    prop.attachToEntity(ped, boneIndex, new Vector3(0.162, 0.038, -0.021), new Vector3(10, 175, 0), true, false, true, 1, true);
    if (atmEntity) {
      ped.tasks.clear();
      yield Utils_Delay(0);
      yield moveTowardsEntity(ped, atmEntity, 1.16, 5);
      ped.tasks.clear();
      yield headTowardsEntity(ped, atmEntity, 5);
      ped.tasks.clear();
    }
    prop.setAlpha(255);
    yield ped.tasks.playAnim({
      animDictionary: "anim@mp_atm@enter",
      animationName: "enter",
      flags: AnimationFlags.STOP_LAST_FRAME,
      wait: 1300
    });
    prop.remove();
    yield Utils_Delay(2700);
    yield ped.tasks.playAnim({
      animDictionary: "anim@mp_atm@base",
      animationName: "base",
      flags: AnimationFlags.REPEAT
    });
  });
}
function playATMAnimOut(ped) {
  return __async(this, null, function* () {
    const boneIndex = ped.getBoneIndex(57005);
    const prop = yield Prop.Spawn("prop_cs_credit_card", ped.coords, 0, true, false, true);
    prop.setAlpha(0);
    prop.attachToEntity(ped, boneIndex, new Vector3(0.162, 0.038, -0.021), new Vector3(10, 175, 0), true, true, false, 1, true);
    yield ped.tasks.playAnim({
      animDictionary: "amb@prop_human_atm@male@exit",
      animationName: "exit",
      wait: 3e3
    });
    prop.setAlpha(255);
    yield Utils_Delay(2e3);
    prop.remove();
  });
}

;// CONCATENATED MODULE: ./config/atm.js


const Config = {};

Config.ZDiff        = 2.0;
Config.BlipSprite   = 431;

Config.Locale = 'ru';

Config.InterestInterval = 60 * 60000;
Config.InterestRate = 0.003;

Config.Zones = [
	{ 
		Position: new Vector3(148.78, -1039.67, 29.38),
	},
	{ 
		Position: new Vector3(-2963.18, 483.00, 15.7),
	},
	{
		Position: new Vector3(314.43, -278.53, 54.17),
	},
	{
		Position: new Vector3(-350.68, -49.37, 49.04),
	},
	{
		Position: new Vector3(-350.68, -49.37, 49.04),
	},
	{
		Position: new Vector3(1175.0, 2706.16, 38.06),
	},
	{
		Position: new Vector3(-111.30, 6467.703, 31.5),
	},
	{
		Position: new Vector3(246.40, 222.99, 106.27),
	},
	{
		Position: new Vector3(-1212.96, -330.3, 37.881),
	}
];

/* harmony default export */ const atm = (Config);
;// CONCATENATED MODULE: ./client/atm/State.ts
class State {
  constructor() {
    this.isShown = false;
    this.ATMEntity = null;
    this.BankZone = null;
  }
}
/* harmony default export */ const atm_State = (new State());

;// CONCATENATED MODULE: ./client/atm/ui.ts



function showBank(zone) {
  if (atm_State.isShown)
    return;
  atm_State.isShown = true;
  atm_State.ATMEntity = zone.atm;
  if (zone.atm) {
    playATMAnimIn(LocalPlayer.ped, zone.atm).then(() => {
      TriggerEvent("nova-ui:showBank", null);
    });
  } else {
    TriggerEvent("nova-ui:showBank", zone);
  }
}
function hideBank() {
  if (!atm_State.isShown)
    return;
  TriggerEvent("nova-ui:CloseScreen", "bank");
  if (atm_State.ATMEntity) {
    playATMAnimOut(LocalPlayer.ped);
  }
  atm_State.isShown = false;
  atm_State.ATMEntity = null;
  atm_State.BankZone = null;
  TriggerScreenblurFadeOut(500);
}
on("onResurceStop", (resource) => {
  if (resource == GetCurrentResourceName()) {
    hideBank();
  }
});
on("nova-ui:change_screen", (screen) => {
  if (!screen) {
    hideBank();
  }
});

;// CONCATENATED MODULE: ./client/atm/markers.ts
var markers_async = (__this, __arguments, generator) => {
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





atm.Zones.forEach((zone, index) => {
  zone.sprite = new Sprite_Sprite({
    coords: zone.Position,
    scale: new Vector2(0.1, 0.1),
    textureDict: "spritedict",
    textureName: "locker",
    alpha: 255,
    color: [255, 255, 255],
    drawDistance: 5
  });
  zone.marker = new Marker({
    markerType: 1,
    coords: zone.Position,
    color: [55, 100, 255],
    scale: Vector3.FromArray([2, 2, 1]),
    drawDistance: zone.DrawDistance || 20,
    notificationText: "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0431\u0430\u043D\u043A\u0443",
    onPress: () => {
      showBank(zone);
    },
    onEnter: () => {
      atm_State.ATMEntity = null;
      atm_State.BankZone = zone;
    },
    onExit: () => {
      hideBank();
    }
  });
  const blip = new Blip({
    coords: zone.Position,
    sprite: 108,
    display: 4,
    scale: 0.7,
    color: 30,
    shortRange: true,
    text: "\u0411\u0430\u043D\u043A"
  });
  zone.blip = blip;
  zone.id = index;
});
Utils_Delay(1e3).then(() => setTick(() => markers_async(undefined, null, function* () {
  atm.Zones.forEach((zone) => {
    zone.marker.draw();
    zone.sprite.draw();
  });
})));

;// CONCATENATED MODULE: ./client/atm/index.ts
var atm_async = (__this, __arguments, generator) => {
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







function getClosestATM(dist) {
  const modelNames = ["prop_fleeca_atm", "prop_atm_02", "prop_atm_01", "prop_atm_03"];
  const {coords} = LocalPlayer;
  for (const model of modelNames) {
    return Prop.getClosestOfType(coords, dist, model);
  }
  return null;
}
setTick(() => atm_async(undefined, null, function* () {
  if (Control.JustReleased(Keys.E)) {
    if (atm_State.BankZone)
      return;
    const atmEntity = getClosestATM(1);
    if (atmEntity.exist) {
      showBank({atm: atmEntity});
    }
  }
}));

;// CONCATENATED MODULE: ./config/tattoo.js


const tattoo_Config = {};
tattoo_Config.Locale = 'ru';

tattoo_Config.Blip = {
    text: "Тату-салон",
    color: 1,
    sprite: 75,
};

tattoo_Config.Shops = {
    ['central']: {
        coords: new Vector3(322.1, 180.4, 103.5),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(319.72, 180.94, 102.59),
            heading: 254.5,
        },

        player: {
            coords: new Vector3(323.48, 179.79, 102.6),
            heading: 70.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 156,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90.0,
                angle: -30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 156,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        },
    },
    ['paleto']: {
        coords: new Vector3(-293.7, 6200, 31.4),

        ped: {
            shop: 'paleto',
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-291.92, 6199.84, 30.5),
            heading: 231.5,
        },

        player: {
            coords: new Vector3(-294.05, 6200.04, 30.51),
            heading: 222.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 300,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 120,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 300,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['sandy']: {
        coords: new Vector3(1865, 3747.7, 33),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(1862.38, 3748.32, 32.07),
            heading: 32.0,
        },

        player: {
            coords: new Vector3(1864.25, 3747.77, 32.04),
            heading: 21.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 110,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 290,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 110,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['chumash']: {
        coords: new Vector3(-3170, 1075, 20.8),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-3170.45, 1072.95, 19.84),
            heading: 332.5,
        },

        player: {
            coords: new Vector3(-3168.93, 1077.06, 19.85),
            heading: 158.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 240,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 60,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 240,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['vespucci']: {
        coords: new Vector3(-1153.6, -1425.6, 4.9),

        ped: {
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(-1152.18, -1423.85, 4.0),
            heading: 123.0,
        },

        player: {
            coords: new Vector3(-1155.54, -1426.46, 3.98),
            heading: 302.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 210,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 30,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    },
    ['innocence']: {
        coords: new Vector3(1322.60, -1651.90, 51.20),

        ped: {
            shop: 'innocence',
            model: 'u_m_y_tattoo_01',
            coords: new Vector3(1324.58, -1650.21, 51.3),
            heading: 126.5,
        },

        player: {
            coords: new Vector3(1321.42, -1652.88, 51.3),
            heading: 308.5
        },

        cameras: {
            torso: {
                heading: 90.0,
                angle: 30,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            back: {
                heading: 90,
                angle: 210,
                camOffset: 0.35,
                zoomOffset: 1.2
            },
            legs: {
                heading: 90.0,
                angle: 30,
                camOffset: -0.5,
                zoomOffset: 1.2
            }
        }
    }
};

tattoo_Config.Skin = {
    male: {
        sex: 0,
        tshirt_1: 15,
        tshirt_2: 0,
        arms: 15,
        torso_1: 15,
        torso_2: 0,
        pants_1: 21,
        pants_2: 0,
        shoes_1: 34,
        shoes_2: 0,
        chain_1: 0,
        chain_2: 0
    },
    female: {
        sex: 1,
        tshirt_1: 15,
        tshirt_2: 0,
        arms: 15,
        torso_1: 15,
        torso_2: 0,
        pants_1: 15,
        pants_2: 0,
        shoes_1: 35,
        shoes_2: 0,
        chain_1: 0,
        chain_2: 0
    }
};

/* harmony default export */ const tattoo = (tattoo_Config);
;// CONCATENATED MODULE: ./client/tattoo/peds.ts
var peds_async = (__this, __arguments, generator) => {
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



function spawnShopPed(shopId, shop) {
  return peds_async(this, null, function* () {
    const p = shop.ped;
    const {instance} = p;
    if (instance) {
      if (instance.exist && instance.alive && instance.coords.distanceTo(p.coords) < 3) {
        return instance;
      }
      yield instance.remove();
    }
    if (!instance || !instance.exist) {
      const ped = yield Ped.Spawn(p.model, p.coords, p.heading, PedTypes.CIVMALE, false, false);
      ped.dynamic = false;
      ped.freezePosition = true;
      ped.blockNonTemporaryEvents = true;
      ped.invincible = true;
      ped.tasks.startScenario("WORLD_HUMAN_GUARD_STAND");
      return ped;
    }
    return instance;
  });
}
function pedUpdate(shop, ped) {
  return peds_async(this, null, function* () {
    if (LocalPlayer.isFreeAimingAtEntity(ped)) {
      ped.tasks.clear();
      ped.tasks.playAnim({
        animDictionary: "missminuteman_1ig_2",
        animationName: "handsup_base",
        flags: AnimationFlags.REPEAT | AnimationFlags.UPPERBODY
      });
      while (LocalPlayer.isFreeAimingAtEntity(ped)) {
        yield Utils_Delay(1e3);
      }
      ped.tasks.clear();
      ped.tasks.startScenario("WORLD_HUMAN_GUARD_STAND");
    }
  });
}
setTick(() => peds_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  yield Promise.all(Object.entries(tattoo.Shops).map((_0) => peds_async(this, [_0], function* ([shopId, shopConfig]) {
    const ped = yield spawnShopPed(shopId, shopConfig);
    shopConfig.ped.instance = ped;
    yield pedUpdate(shopConfig, ped);
  })));
}));

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/UI/NUI.js

class NUI extends (/* unused pure expression or super */ null && (Static)) {
    static send(message) {
        return !!SendNuiMessage(JSON.stringify(message));
    }
    static on(message, callback) {
        RegisterNuiCallbackType(message);
        on(`__cfx_nui:${message}`, callback);
    }
    static setFocus(hasFocus, hasCursor) {
        SetNuiFocus(hasFocus, hasCursor);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/UI/Menu.js
class Menu {
    constructor(obj) {
        if (obj)
            Object.assign(this, obj);
    }
    show() {
        TriggerEvent('nova-ui:menu_show', this.name, {
            name: this.name,
            title: this.title,
            position: this.position,
            elements: this.elements
        }, {
            click: this.onClick,
            back: this.onBack,
            change: this.onChange,
        });
        return this;
    }
    hide() {
        TriggerEvent('nova-ui:menu_hide');
        return this;
    }
    static hideAll() {
        TriggerEvent('nova-ui:menu_hide');
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/client/UI/index.js


function showNotification(text) {
    emit('ui:showNotification', { text });
}

;// CONCATENATED MODULE: ./client/tattoo/markers.ts
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var tattoo_markers_async = (__this, __arguments, generator) => {
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



class Markers {
  constructor(onPress) {
    this.blips = [];
    this.markers = [];
    Object.values(tattoo.Shops).forEach((shopConfig) => tattoo_markers_async(this, null, function* () {
      this.blips.push(this.createBlip(shopConfig));
      this.markers.push(this.createMarker(shopConfig, onPress));
    }));
  }
  createBlip(shopConfig) {
    return new Blip(__spreadProps(__spreadValues(__spreadValues({}, tattoo.Blip), shopConfig), {
      coords: shopConfig.coords
    }));
  }
  createMarker(shopConfig, onPress) {
    return new Marker({
      alpha: 0,
      coords: shopConfig.ped.coords,
      scale: new Vector3(3, 3, 3),
      notificationText: "\u041D\u0430\u0436\u043C\u0438 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B ~y~\u043E\u0442\u043A\u0440\u044B\u0442\u044C ~w~\u043C\u0435\u043D\u044E",
      onPress: () => {
        onPress(shopConfig);
      }
    });
  }
  update() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
  }
}
/* harmony default export */ const markers = ((/* unused pure expression or super */ null && (Markers)));

;// CONCATENATED MODULE: ./client/tattoo/skin.ts



class Skin extends Static_Static {
  static setNaked() {
    const {sex} = LocalPlayer.identity;
    emit("skin:loadClothes", sex == 0 ? tattoo.Skin.male : tattoo.Skin.female);
  }
  static reset() {
    Log.info("reset");
    emitNet("clothes:update");
  }
}

;// CONCATENATED MODULE: ./client/tattoo/index.ts








const camera = new TargettedCamera({
  minDistance: 1,
  maxDistance: 3,
  controlsEnabled: false
});
function openShop(shop) {
  LocalPlayer.ped.coords = shop.player.coords;
  const camInfo = shop.cameras.legs;
  camera.target = LocalPlayer.ped.coords.addXYZ(0, 0, camInfo.camOffset);
  camera.heading = camInfo.angle;
  camera.minDistance = 1 * camInfo.zoomOffset;
  camera.maxDistance = 2 * camInfo.zoomOffset;
  camera.controlsEnabled = true;
  camera.start();
  Skin.setNaked();
  const insideShop = setTick(() => {
    if (DisabledControl.JustReleased(Keys.ESC)) {
      Skin.reset();
      camera.stop();
      clearTick(insideShop);
    }
  });
  emitNet("engine:openTattooShop", 1);
}
const tattoo_markers = new Markers(openShop);
setTick(() => {
  tattoo_markers.update();
  if (camera.isActive) {
    DisableAllControlActions(0);
    camera.target = LocalPlayer.ped.coords;
    camera.update();
  }
});
function openShopMenuCategory(shopid, tattooList, category) {
  const elements = [];
  tattooList.filter((info) => info.category == category).forEach((info) => {
    elements.push({label: `${info.collection}/${info.name}`, value: `${info.collection}/${info.name}`});
  });
  const menu = new Menu({
    name: "tattoo_menu_cat",
    title: "\u0422\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0430",
    position: "tr",
    elements,
    onClick: (cmd) => {
      const [collection, tattooName] = cmd.split("/");
      LocalPlayer.ped.decoration.add(collection, tattooName);
    },
    onChange: (cmd) => {
      Log.debug("on change", cmd);
      LocalPlayer.ped.decoration.clearAll(true);
      const [collection, tattooName] = cmd.split("/");
      LocalPlayer.ped.decoration.add(collection, tattooName);
    },
    onBack: () => {
      menu.hide();
      openShopMenu(shopid, tattooList);
    }
  });
  menu.show();
}
function openShopMenu(shopid, tattooList) {
  const elements = [];
  const categories = [...new Set(tattooList.map((item) => item.category))];
  categories.forEach((cat) => {
    elements.push({label: cat, value: cat});
  });
  const menu = new Menu({
    name: "tattoo_menu",
    title: "\u0422\u0430\u0442\u0443\u0438\u0440\u043E\u0432\u043A\u0430",
    position: "tr",
    elements,
    onClick: (cmd) => {
      menu.hide();
      openShopMenuCategory(shopid, tattooList, cmd);
    },
    onBack: () => {
      TriggerEvent("nova-ui:menu_hide");
    }
  });
  menu.show();
}
onNet("engine:openTattooShop", (shopid, tattooList) => {
  openShopMenu(shopid, tattooList);
});

;// CONCATENATED MODULE: ./config/carwash.js


const carwash_Config = {};

carwash_Config.Locale = 'en';

carwash_Config.Price = 20;

carwash_Config.Locations = [
    new Vector3(26.5906, -1392.0261, 27.3634),
    new Vector3(167.1034, -1719.4704, 27.2916),
    new Vector3(-74.5693, 6427.8715, 29.4400),
    new Vector3(-699.6325, -932.7043, 17.0139)
];


/* harmony default export */ const carwash = (carwash_Config);
;// CONCATENATED MODULE: ./client/carwash/markers.ts



class markers_Markers {
  constructor(onPress) {
    this.onPress = () => {
    };
    this.blips = [];
    this.markers = [];
    this.onPress = onPress;
    carwash.Locations.forEach((coords) => {
      this.createBlip(coords);
      this.createMarker(coords);
    });
  }
  createBlip(coords) {
    const blip = new Blip({
      coords,
      sprite: 100,
      text: "\u0410\u0432\u0442\u043E\u043C\u043E\u0439\u043A\u0430"
    });
    this.blips.push(blip);
  }
  createMarker(coords) {
    const marker = new Marker({
      coords,
      scale: new Vector3(5, 5, 2),
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_CONTEXT~ \u0447\u0442\u043E\u0431\u044B \u043F\u043E\u043C\u044B\u0442\u044C \u043C\u0430\u0448\u0438\u043D\u0443 \u0437\u0430 ~g~$${carwash.Price}~s~`,
      onPress: this.onPress
    });
    this.markers.push(marker);
  }
  draw() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
  }
}
/* harmony default export */ const carwash_markers = (markers_Markers);

;// CONCATENATED MODULE: ./client/carwash/index.ts
var carwash_async = (__this, __arguments, generator) => {
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




function wash() {
  return carwash_async(this, null, function* () {
    const {vehicle} = LocalPlayer.ped;
    if (!vehicle || !vehicle.isDriver(LocalPlayer.ped))
      return false;
    if (vehicle.dirtLevel <= 2) {
      showNotification("\u0412\u0430\u0448 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0443\u0436\u0435 \u0447\u0438\u0441\u0442!");
      return false;
    }
    const success = yield LocalPlayer.pay(["cash", "bank"], carwash.Price, "carwash");
    if (!success) {
      showNotification("\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432!");
      return false;
    }
    vehicle.dirtLevel = 0.1;
    showNotification(`\u0412\u0430\u0448 \u0442\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u0431\u044B\u043B \u043F\u043E\u043C\u044B\u0442 \u0437\u0430 ~g~$${carwash.Price}~s~`);
    return true;
  });
}
const client_carwash_markers = new carwash_markers(wash);
setTick(() => carwash_async(undefined, null, function* () {
  client_carwash_markers.draw();
}));

;// CONCATENATED MODULE: ./config/itemmarkers.js


const itemmarkers_Config = {};
itemmarkers_Config.Locale = 'ru';

itemmarkers_Config.Zones = [
    {
        coords: new Vector3(1422.74, 3851.65, 31.78),
        Item: { name: "fish", amount: 1 },
        Interval: 10,
        Blip: 68,
        Notification: "чтобы поймать рыбу",
        Label: "Рыбалка",
    },
    {
        coords: new Vector3(1501.65, 3924.22, 31.94),
        Item: { name: "seaweeds", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Водоросли",
        Label: "Водоросли",
    },

    {
        coords: new Vector3(1103.71, -2010.64, 30.87),
        Item: { name: "steel", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Сталь",
        Label: "Сталь",
    },
    {
        coords: new Vector3(1107.53, -2008.7, 30.94),
        Item: { name: "iron_plate", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Железная плита",
        Label: "Железная плита",
    },
    {
        coords: new Vector3(1109.47, -2006.16, 30.94),
        Item: { name: "nickel_tube", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Никелевая трубка",
        Label: "Никелевая трубка",
    },

    {
        coords: new Vector3(1108.51, -1999.0, 30.94),
        Item: { name: "glass", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Стекло",
        Label: "Стекло",
    },
    {
        coords: new Vector3(1106.47, -1997.05, 30.94),
        Item: { name: "steel_plate", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Стальная плита",
        Label: "Стальная плита",
    },
    {
        coords: new Vector3(-600.61, 2091.6, 131.45),
        Item: { name: "copper", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Медь",
        Label: "Медь",
    },
    {
        coords: new Vector3(-595.2, 2092.84, 131.48),
        Item: { name: "iron", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Железо",
        Label: "Железо",
    },
    {
        coords: new Vector3(-598.14, 2092.8, 131.59),
        Item: { name: "coal", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Уголь",
        Label: "Уголь",
    },
    {
        coords: new Vector3(2619.92, 2877.23, 36.91),
        Item: { name: "quartz", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Кварцовый песок",
        Label: "Кварцовый песок",
    },
    {
        coords: new Vector3(2945.38, 2746.14, 43.3),
        Item: { name: "nickel", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Никель",
        Label: "Никель",
    },
    {
        coords: new Vector3(2927.65, 2793.88, 40.63),
        Item: { name: "salt", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Соль",
        Label: "Соль",
    },
    {
        coords: new Vector3(363.38, 6482.66, 29.23),
        Item: { name: "tomato", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Помидор",
        Label: "Помидор",
    },
    {
        coords: new Vector3(2597.74, 4478.9, 37.37),
        Item: { name: "spice", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Специи",
        Label: "Специи",
    },
    {
        coords: new Vector3(2251.59, 4787.79, 40.07),
        Item: { name: "rise", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Рис",
        Label: "Рис",
    },
    {
        coords: new Vector3(371.11, 6518.73, 28.38),
        Item: { name: "orange", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Апельсин",
        Label: "Апельсин",
    },
    {
        coords: new Vector3(362.5, 6530.88, 28.38),
        Item: { name: "apple", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Яблоко",
        Label: "Яблоко",
    },
    {
        coords: new Vector3(438.29, 6455.65, 28.74),
        Item: { name: "milk", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Молоко",
        Label: "Молоко",
    },
    {
        coords: new Vector3(2459.78, 4745.72, 34.3),
        Item: { name: "raw_beef", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Говядина",
        Label: "Говядина",
    },
    {
        coords: new Vector3(2438.3, 4772.45, 34.34),
        Item: { name: "raw_pork", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Свиная вырезка",
        Label: "Свиная вырезка",
    },
    {
        coords: new Vector3(-84.78, 6234.3, 31.09),
        Item: { name: "raw_chicken", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Мясо птицы",
        Label: "Мясо птицы",
    },
    {
        coords: new Vector3(1899.85, 4921.0, 48.77),
        Item: { name: "egg", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Яйцо",
        Label: "Яйцо",
    },
    {
        coords: new Vector3(1982.53, 5028.4, 41.03),
        Item: { name: "flour", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Мука",
        Label: "Мука",
    },
    {
        coords: new Vector3(2309.86, 4826.01, 40.78),
        Item: { name: "water", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Чистую воду",
        Label: "Чистая Вода",
    },
    {
        coords: new Vector3(2330.25, 4852.55, 41.8),
        Item: { name: "yeast", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Дрожжи",
        Label: "Дрожжи",
    },
    {
        coords: new Vector3(2341.26, 4862.97, 41.8),
        Item: { name: "dough", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Тесто",
        Label: "Тесто",
    },
    {
        coords: new Vector3(-727.75, 5939.21, 16.33),
        Item: { name: "mushrooms", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Грибы",
        Label: "Грибы",
    },
    {
        coords: new Vector3(89.23, 6367.0, 31.22),
        Item: { name: "vegetable_oil", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Растительное масло",
        Label: "Растительное масло",
    },
    {
        coords: new Vector3(976.15, -1828.78, 31.17),
        Item: { name: "becon", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Бекон",
        Label: "Бекон",
    },
    {
        coords: new Vector3(-142.82, 1912.47, 197.32),
        Item: { name: "becon", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Бекон",
        Label: "Бекон",
    },
    {
        coords: new Vector3(853.25, -2096.23, 30.27),
        Item: { name: "cheese", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Сыр",
        Label: "Сыр",
    },
    {
        coords: new Vector3(2862.23, 4578.03, 47.34),
        Item: { name: "potato", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Картофель",
        Label: "Картофель",
    },
    {
        coords: new Vector3(2641.38, 4695.86, 35.62),
        Item: { name: "potato", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Картофель",
        Label: "Картофель",
    },
    {
        coords: new Vector3(-1898.85, 2035.51, 140.74),
        Item: { name: "grapes", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Виноград",
        Label: "Виноград",
    },
    {
        coords: new Vector3(-1895.0, 2034.41, 140.74),
        Item: { name: "olive_oil", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить оливковое масло",
        Label: "Оливковое масло",
    },
    {
        coords: new Vector3(-1891.02, 2033.32, 140.73),
        Item: { name: "moonshine", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Самогон",
        Label: "Самогон",
    },
    {
        coords: new Vector3(2641.36, 4597.29, 36.89),
        Item: { name: "wheat", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Пшеница",
        Label: "Пшеница",
    },
    {
        coords: new Vector3(3550.19, 3763.2, 29.92),
        Item: { name: "plastic", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Пластик",
        Label: "Пластик",
    },
    {
        coords: new Vector3(3554.82, 3763.01, 29.92),
        Item: { name: "acid", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Кислота",
        Label: "Кислота",
    },
    {
        coords: new Vector3(3557.8, 3762.19, 29.92),
        Item: { name: "rubber", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Резина",
        Label: "Резина",
    },
    {
        coords: new Vector3(3562.79, 3761.56, 29.92),
        Item: { name: "phone", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Телефон",
        Label: "Телефон",
    },
    {
        coords: new Vector3(3565.65, 3761.46, 29.92),
        Item: { name: "sim", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Sim карта",
        Label: "Sim карта",
    },
    {
        coords: new Vector3(1586.94, -1838.67, 94.33),
        Item: { name: "masut", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Мазут",
        Label: "Мазут",
    },
    {
        coords: new Vector3(1575.74, -1837.99, 93.13),
        Item: { name: "gas", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Газ",
        Label: "Газ",
    },
    {
        coords: new Vector3(-81.29, 1906.52, 196.72),
        Item: { name: "strawberry", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Клубника",
        Label: "Клубника",
    },
    {
        coords: new Vector3(1780.32, 4945.97, 43.85),
        Item: { name: "strawberry", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Клубника",
        Label: "Клубника",
    },
    {
        coords: new Vector3(-129.55, 1923.87, 197.29),
        Item: { name: "tomato_paste", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Томатная паста",
        Label: "Томатная паста",
    },
    {
        coords: new Vector3(-1154.76, 2754.97, 1.04),
        Item: { name: "dirty_water", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Грязная вода",
        Label: "Грязная вода",
    },
    {
        coords: new Vector3(1061.82, -608.28, 56.75),
        Item: { name: "dirty_water", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Грязная вода",
        Label: "Грязная вода",
    },
    {
        coords: new Vector3(1190.93, -208.51, 54.31),
        Item: { name: "dirty_water", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Грязная вода",
        Label: "Грязная вода",
    },
    {
        coords: new Vector3(2705.63, 1552.98, 24.52),
        Item: { name: "fertilizer", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Удобрение",
        Label: "Удобрение",
    },
    {
        coords: new Vector3(2703.92, 1549.53, 24.53),
        Item: { name: "nitrates", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Нитраты",
        Label: "Нитраты",
    },
    {
        coords: new Vector3(1930.16, 4636.09, 40.45),
        Item: { name: "butter", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Сливочное масло",
        Label: "Сливочное масло",
    },
    {
        coords: new Vector3(1956.79, 4647.68, 40.74),
        Item: { name: "cream", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Сливки",
        Label: "Сливки",
    },
    {
        coords: new Vector3(-493.8, 3074.84, 36.1),
        Item: { name: "banana", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Банан",
        Label: "Банан",
    },
    {
        coords: new Vector3(244.6, 6460.25, 31.37),
        Item: { name: "onion", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Лук",
        Label: "Лук",
    },
    {
        coords: new Vector3(-1546.92, -470.32, 35.45),
        Item: { name: "meal_wings", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Острые Куриные крылышки",
        Label: "Острые Куриные крылышки",
    },
    {
        coords: new Vector3(162.54, -1810.82, 28.72),
        Item: { name: "spring", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Пружина",
        Label: "Пружина",
    },
    {
        coords: new Vector3(164.58, -1813.52, 28.67),
        Item: { name: "steel_tube", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Стальная трубка",
        Label: "Стальная трубка",
    },
    {
        coords: new Vector3(-28.52, -1673.48, 29.49),
        Item: { name: "hand_grip", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Рукоятка",
        Label: "Рукоятка",
    },
    {
        coords: new Vector3(-28.52, -1673.48, 29.49),
        Item: { name: "hand_grip", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Рукоятка",
        Label: "Рукоятка",
    },
    {
        coords: new Vector3(36.76, -1747.69, 29.3),
        Item: { name: "hammer", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Молоток",
        Label: "Молоток",
    },
    {
        coords: new Vector3(6.6, -1599.45, 29.29),
        Item: { name: "tako", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Тако",
        Label: "Тако",
    },
    {
        coords: new Vector3(124.52, -1539.9, 29.25),
        Item: { name: "tea", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Чай",
        Label: "Чай",
    },
    {
        coords: new Vector3(69.58, -1468.31, 29.29),
        Item: { name: "radio", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Рация",
        Label: "Рация",
    },
    {
        coords: new Vector3(154.2, -1430.49, 29.26),
        Item: { name: "cheeseburger", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Чизбургер",
        Label: "Чизбургер",
    },
    {
        coords: new Vector3(107.04, -1399.23, 29.28),
        Item: { name: "lsd", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить L.S.D.",
        Label: "L.S.D.",
    },
    {
        coords: new Vector3(126.78, -1301.83, 29.23),
        Item: { name: "juice", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Сок ",
        Label: "Сок",
    },
    {
        coords: new Vector3(-185.73, -1427.34, 31.48),
        Item: { name: "icecream", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Мороженка ",
        Label: "Мороженка",
    },
    {
        coords: new Vector3(-270.96, -1589.94, 31.84),
        Item: { name: "meth", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Метамфетамин ",
        Label: "Метамфетамин",
    },
    {
        coords: new Vector3(80.36, 272.16, 110.2),
        Item: { name: "patato_fries", amount: 1 },
        Interval: 10,
        Blip: 1,
        Notification: "Получить Картофель фри ",
        Label: "Картофель фри",
    },
];

/* harmony default export */ const itemmarkers = (itemmarkers_Config);
;// CONCATENATED MODULE: ./client/itemmarkers/index.ts
var itemmarkers_async = (__this, __arguments, generator) => {
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


(() => itemmarkers_async(undefined, null, function* () {
  itemmarkers.Zones.forEach((zone, index) => itemmarkers_async(this, null, function* () {
    const blip = new Blip({
      coords: zone.coords,
      text: zone.Label,
      sprite: zone.Blip,
      scale: 0.8,
      color: (GetHashKey(zone.Item.name) >>> 0) % 100
    });
    const marker = new Marker({
      coords: zone.coords,
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B ${zone.Notification}`,
      drawDistance: zone.DrawDistance || 20,
      onPress: () => {
        emitNet("itemmarkers:giveitem", index);
      }
    });
    Object.assign(zone, {
      blipObj: blip,
      id: index,
      marker
    });
  }));
}))();
setTick(() => itemmarkers_async(undefined, null, function* () {
  itemmarkers.Zones.forEach((zone) => {
    zone.marker.draw();
  });
}));

;// CONCATENATED MODULE: ./client/pillbox_beds/index.ts
var pillbox_beds_async = (__this, __arguments, generator) => {
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




const props = ["v_med_bed2", "v_med_bed1", "v_med_emptybed"];
const activationDistance = 0.6;
let currentBed = null;
let onBed = false;
function layOn(bed) {
  return pillbox_beds_async(this, null, function* () {
    LocalPlayer.ped.coords = bed.coords;
    LocalPlayer.ped.heading = bed.heading + 180;
    yield LocalPlayer.ped.tasks.playAnim({
      animDictionary: "missfbi1",
      animationName: "cpr_pumpchest_idle",
      flags: AnimationFlags.REPEAT
    });
    onBed = true;
  });
}
function layOff() {
  return pillbox_beds_async(this, null, function* () {
    if (!LocalPlayer.ped.tasks.isPlayingAnim("missfbi1", "cpr_pumpchest_idle"))
      return;
    LocalPlayer.ped.tasks.clear();
    onBed = false;
  });
}
setTick(() => pillbox_beds_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  if (!onBed) {
    const found = props.some((value) => {
      const closestBed = Prop.getClosestOfType(LocalPlayer.coords, activationDistance, value);
      if (closestBed.exist) {
        currentBed = closestBed;
        return true;
      }
      return false;
    });
    if (!found) {
      currentBed = null;
    }
  }
}));
setTick(() => pillbox_beds_async(undefined, null, function* () {
  if (!currentBed || !currentBed.exist)
    return;
  const {coords} = currentBed;
  if (onBed) {
    Control.Disable(Keys.X);
    drawText3D(coords.addXYZ(0, 0, 0.5), "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~g~[E]~w~ \u0447\u0442\u043E\u0431\u044B ~r~\u0432\u0441\u0442\u0430\u0442\u044C~s~", 0.55);
    if (Control.JustReleased(Keys.E) || DisabledControl.JustReleased(Keys.X)) {
      yield layOff();
    }
  } else {
    drawText3D(coords.addXYZ(0, 0, 0.5), "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~g~[E]~w~ \u0447\u0442\u043E\u0431\u044B ~b~\u043B\u0435\u0447\u044C~s~", 0.55);
    if (Control.JustReleased(Keys.E)) {
      yield layOn(currentBed);
    }
  }
}));

;// CONCATENATED MODULE: ./client/pointfinger/pointfinger.ts
var pointfinger_async = (__this, __arguments, generator) => {
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




let mpPointing = false;
function startPointing() {
  return pointfinger_async(this, null, function* () {
    const {handle} = LocalPlayer.ped;
    mpPointing = true;
    yield loadAnimDict("anim@mp_point");
    SetPedCurrentWeaponVisible(handle, false, true, true, true);
    LocalPlayer.ped.setConfigFlag(36, true);
    TaskMoveNetwork(handle, "task_mp_pointing", 0.5, false, "anim@mp_point", 24);
    RemoveAnimDict("anim@mp_point");
  });
}
function stopPointing() {
  const {ped} = LocalPlayer;
  RequestTaskMoveNetworkStateTransition(ped.handle, "Stop");
  if (!ped.injured) {
    ped.tasks.clearSecondary();
  }
  if (ped.isInAnyVehicle(true)) {
    ped.weapon.setCurrentWeaponVisible(true, true);
  }
  LocalPlayer.ped.setConfigFlag(36, false);
  ped.tasks.clearSecondary();
  mpPointing = false;
}
setTick(() => pointfinger_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  const onFoot = ped.isOnFoot;
  if (Control.JustPressed(29) && !mpPointing && onFoot) {
    startPointing();
    yield Utils_Delay(700);
  } else if (Control.JustPressed(29) && mpPointing) {
    stopPointing();
    yield Utils_Delay(700);
  } else if (!onFoot && mpPointing) {
    stopPointing();
    yield Utils_Delay(700);
  }
}));
setTick(() => pointfinger_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  if (!IsTaskMoveNetworkActive(ped.handle)) {
    return;
  }
  if (!mpPointing || !ped.isOnFoot) {
    stopPointing();
    return;
  }
  let camPitch = clamp(GetGameplayCamRelativePitch(), -70, 42);
  camPitch = (camPitch + 70) / 112;
  let camHeading = GetGameplayCamRelativeHeading();
  camHeading = clamp(camHeading, -180, 180);
  const cosCamHeading = Cos(camHeading);
  const sinCamHeading = Sin(camHeading);
  camHeading = (camHeading + 180) / 360;
  let blocked = false;
  const nn = 0;
  let coords = GetOffsetFromEntityInWorldCoords(ped.handle, cosCamHeading * -0.2 - sinCamHeading * (0.4 * camHeading + 0.3), sinCamHeading * -0.2 + cosCamHeading * (0.4 * camHeading + 0.3), 0.6);
  const ray = Cast_3dRayPointToPoint(coords[0], coords[1], coords[2] - 0.2, coords[0], coords[1], coords[2] + 0.2, 0.4, 95, ped.handle, 7);
  [, blocked, coords, coords] = GetRaycastResult(ray);
  ped.tasks.setPropertyFloat("Pitch", camPitch);
  ped.tasks.setPropertyFloat("Heading", camHeading * -1 + 1);
  ped.tasks.setPropertyBool("isBlocked", blocked);
  ped.tasks.setPropertyBool("isFirstPerson", GetCamViewModeForContext(GetCamActiveViewModeContext()) == 4);
}));

;// CONCATENATED MODULE: ./client/pointfinger/handsup.ts
var handsup_async = (__this, __arguments, generator) => {
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




let canHandsUp = true;
let handsup = false;
setTick(() => handsup_async(undefined, null, function* () {
  if (handsup && LocalPlayer.ped.isInAir) {
    handsup = false;
    LocalPlayer.ped.tasks.clearSecondary();
  }
  if (canHandsUp) {
    if (Control.JustReleased(Keys.F2)) {
      const playerPed = LocalPlayer.ped;
      yield loadAnimDict("random@mugging3");
      if (handsup) {
        handsup = false;
        playerPed.tasks.clearSecondary();
        yield Utils_Delay(500);
      } else {
        handsup = true;
        playerPed.tasks.playAnim({
          animDictionary: "random@mugging3",
          animationName: "handsup_standing_base",
          flags: AnimationFlags.REPEAT | AnimationFlags.UPPERBODY | AnimationFlags.ENABLE_PLAYER_CONTROL
        });
        yield Utils_Delay(500);
      }
    }
  }
}));
onNet("handsup:toggle", (param) => {
  canHandsUp = param;
});

;// CONCATENATED MODULE: ./client/pointfinger/index.ts



;// CONCATENATED MODULE: ./config/lockers.js

const lockers_Config = {};
lockers_Config.Locale = 'ru';

lockers_Config.Zones = [
  // LSPD
  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_chief',
  // 	title: 'Шкаф капитана',
  // 	coords: { x: 451.88, y: -972.9, z: 30.8 },
  // 	drawDistance: 5,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_armory1',
  // 	title: 'Оружейная',
  // 	coords: { x: 459.78, y: -979.19, z: 30.69 },
  // 	drawDistance: 5,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_armory2',
  // 	title: 'Оружейная',
  // 	coords: { x: 461.39, y: -982.74, z: 30.69 },
  // 	drawDistance: 5,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker1',
  // 	title: 'Шкафчик #1',
  // 	coords: { x: 459.34, y: -993.18, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker2',
  // 	title: 'Шкафчик #2',
  // 	coords: { x: 457.7, y: -988.35, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker3',
  // 	title: 'Шкафчик #3',
  // 	coords: { x: 451.65, y: -993.31, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker4',
  // 	title: 'Шкафчик #4',
  // 	coords: { x: 450.00, y: -990.49, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker5',
  // 	title: 'Шкафчик #5',
  // 	coords: { x: 456.78, y: -993.36, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // {
  // 	category: 'locker',
  // 	identifier: 'lspd_locker6',
  // 	title: 'Шкафчик #6',
  // 	coords: { x: 455.61, y: -988.51, z: 30.69 },
  // 	drawDistance: 3,
  // 	maxWeight: 60,
  // },

  // VWPD

  {
    category: 'locker',
    identifier: 'vwpd_armory1',
    title: 'Оружейная',
    coords: { x: 615.6, y: -22.32, z: 82.75 },
    drawDistance: 2,
    maxWeight: 200,
    width: 30,
    height: 20,
  },

  {
    category: 'locker',
    identifier: 'vwpd_confiscated',
    title: 'Конфисковано',
    coords: { x: 612.25, y: 16.63, z: 87.82 },
    drawDistance: 2,
    maxWeight: 600,
    width: 30,
    height: 30,
  },

  {
    category: 'locker',
    identifier: 'vwpd_armory2',
    title: 'Оружейная',
    coords: { x: 614.38, y: -24.44, z: 82.75 },
    drawDistance: 2,
    maxWeight: 200,
    width: 30,
    height: 20,
  },

  {
    category: 'locker',
    identifier: 'vwpd_storage',
    title: 'Склад Вещ.доков',
    coords: { x: 603.93, y: 7.74, z: 79.43 },
    drawDistance: 3,
    maxWeight: 1000,
    width: 40,
    height: 40,
  },

  {
    category: 'locker',
    identifier: 'vwpd_frige1',
    title: 'Холодильник',
    coords: { x: 598.37, y: -20.8, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 100,
    width: 20,
    height: 20,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker1',
    title: 'Шкафчик #1',
    coords: { x: 610.19, y: -7.74, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker3',
    title: 'Шкафчик #3',
    coords: { x: 611.19, y: -8.14, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker5',
    title: 'Шкафчик #5',
    coords: { x: 612.18, y: -8.46, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker7',
    title: 'Шкафчик #7',
    coords: { x: 613.12, y: -8.8, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker9',
    title: 'Шкафчик #9',
    coords: { x: 614.09, y: -9.15, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker11',
    title: 'Шкафчик #11',
    coords: { x: 615.07, y: -9.5, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker13',
    title: 'Шкафчик #13',
    coords: { x: 616.09, y: -9.9, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker14',
    title: 'Шкафчик #14',
    coords: { x: 609.05, y: -10.45, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker16',
    title: 'Шкафчик #16',
    coords: { x: 610.02, y: -10.84, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker18',
    title: 'Шкафчик #18',
    coords: { x: 611.0, y: -11.22, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker20',
    title: 'Шкафчик #20',
    coords: { x: 612.0, y: -11.55, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker22',
    title: 'Шкафчик #22',
    coords: { x: 613.0, y: -11.9, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker24',
    title: 'Шкафчик #24',
    coords: { x: 614.0, y: -12.25, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },

  {
    category: 'locker',
    identifier: 'vwpd_locker26',
    title: 'Шкафчик #26',
    coords: { x: 615.0, y: -12.65, z: 82.75 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'vwpd_locker_swat1',
    title: 'Шкафчик #1',
    coords: { x: 606.19, y: 1.64, z: 79.43 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'vwpd_locker_swat2',
    title: 'Шкафчик #2',
    coords: { x: 606.57, y: 2.73, z: 79.43 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'vwpd_locker_swat3',
    title: 'Оружейный шкаф',
    coords: { x: 607.44, y: 3.92, z: 79.43 },
    drawDistance: 0.5,
    maxWeight: 120,
    width: 30,
    height: 20,
  },
  // Zonah Hospital
  {
    category: 'locker',
    identifier: 'zonah_storage',
    title: 'Склад',
    coords: { x: -447.83, y: -312.04, z: 34.6 },
    drawDistance: 2,
    maxWeight: 1000,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'zonah_fridge',
    title: 'Холодильник',
    coords: { x: -435.13, y: -341.94, z: 34.6 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },

  {
    category: 'locker',
    identifier: 'zonah_locker1',
    title: 'Шкафчик #1',
    coords: { x: -434.4, y: -333.86, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker2',
    title: 'Шкафчик #2',
    coords: { x: -433.59, y: -333.96, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker3',
    title: 'Шкафчик #3',
    coords: { x: -432.67, y: -334.11, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker4',
    title: 'Шкафчик #4',
    coords: { x: -431.53, y: -334.19, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker5',
    title: 'Шкафчик #5',
    coords: { x: -430.24, y: -334.29, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker6',
    title: 'Шкафчик #6',
    coords: { x: -432.44, y: -331.53, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker7',
    title: 'Шкафчик #7',
    coords: { x: -431.27, y: -331.67, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'zonah_locker8',
    title: 'Шкафчик #8',
    coords: { x: -429.91, y: -331.74, z: 34.6 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  // Ballas
  {
    category: 'locker',
    identifier: 'ballas_storage',
    title: 'Склад',
    coords: { x: 105.73, y: -1979.3, z: 20.96 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'ballas_fridge',
    title: 'Холодильник',
    coords: { x: 113.04, y: -1968.49, z: 21.33 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // Families
  {
    category: 'locker',
    identifier: 'fam_storage',
    title: 'Склад',
    coords: { x: -130.77, y: -1606.3, z: 35.03 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'fam_fridge',
    title: 'Холодильник',
    coords: { x: -149.97, y: -1603.01, z: 35.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // Vagos
  {
    category: 'locker',
    identifier: 'vag_storage',
    title: 'Склад',
    coords: { x: 338.62, y: -2012.78, z: 22.39 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'vag_fridge',
    title: 'Холодильник',
    coords: { x: 354.01, y: -2032.6, z: 22.39 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // Marabunta
  {
    category: 'locker',
    identifier: 'mar_storage',
    title: 'Склад',
    coords: { x: 1445.58, y: -1489.06, z: 63.7 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'mar_fridge',
    title: 'Холодильник',
    coords: { x: 1438.58, y: -1484.09, z: 63.7 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // beanmachine
  {
    category: 'locker',
    identifier: 'bm_storage',
    title: 'Склад',
    coords: { x: -823.55, y: -589.95, z: 30.67 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'bm_fridge',
    title: 'Холодильник',
    coords: { x: -828.7, y: -598.73, z: 29.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'bm_locker',
    title: 'Шкафчик #1',
    coords: { x: -816.46, y: -599.73, z: 30.67 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'bm_locker2',
    title: 'Шкафчик #2',
    coords: { x: -817.32, y: -598.93, z: 30.67 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'bm_locker3',
    title: 'Шкафчик #3',
    coords: { x: -818.04, y: -598.22, z: 30.67 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  // BurgerShot
  {
    category: 'locker',
    identifier: 'bs_storage',
    title: 'Склад',
    coords: { x: -1204.56, y: -891.93, z: 14.0 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'bs_fridge',
    title: 'Готовая продукция',
    coords: { x: -1197.87, y: -894.22, z: 14.0 },
    drawDistance: 2,
    maxWeight: 300,
    width: 30,
    height: 15,
  },
  // TAXI
  {
    category: 'locker',
    identifier: 'taxi_locker',
    title: 'Шкафчик #1',
    coords: { x: 896.84, y: -153.12, z: 74.14 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'taxi_locker2',
    title: 'Шкафчик #2',
    coords: { x: 897.75, y: -151.85, z: 74.14 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'taxi_locker3',
    title: 'Шкафчик #3',
    coords: { x: 898.5, y: -150.44, z: 74.14 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  // REPAIR
  {
    category: 'locker',
    identifier: 'repair_locker',
    title: 'Шкафчик #1',
    coords: { x: 889.16, y: -178.13, z: 78.15 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'repair_locker2',
    title: 'Шкафчик #2',
    coords: { x: 889.53, y: -177.04, z: 78.15 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'repair_locker3',
    title: 'Шкафчик #3',
    coords: { x: 890.37, y: -176.22, z: 78.15 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'repair_fridge',
    title: 'Холодильник',
    coords: { x: 892.77, y: -180.27, z: 78.15 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'repair_storage',
    title: 'Склад',
    coords: { x: 890.79, y: -178.6, z: 74.71 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'repair_locker5',
    title: 'Сейф',
    coords: { x: 900.48, y: -156.0, z: 78.17 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  // LSK
  {
    category: 'locker',
    identifier: 'lsk_locker1',
    title: 'Шкафчик #1',
    coords: { x: -338.76, y: -118.37, z: 39.0 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'lsk_locker2',
    title: 'Шкафчик #2',
    coords: { x: -339.09, y: -119.68, z: 39.0 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'lsk_locker3',
    title: 'Шкафчик #3',
    coords: { x: -339.47, y: -120.6, z: 39.0 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'lsk_locker4',
    title: 'Шкафчик #4',
    coords: { x: -339.91, y: -121.64, z: 39.0 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  // CARSHOP
  {
    category: 'locker',
    identifier: 'carshop_locker',
    title: 'Шкафчик #1',
    coords: { x: -791.97, y: -215.38, z: 37.25 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'carshop_locker2',
    title: 'Шкафчик #2',
    coords: { x: -792.64, y: -214.27, z: 37.25 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  {
    category: 'locker',
    identifier: 'carshop_storage',
    title: 'Склад',
    coords: { x: -801.97, y: -201.99, z: 37.25 },
    drawDistance: 2,
    maxWeight: 600,
    width: 40,
    height: 40,
  },
  {
    category: 'locker',
    identifier: 'carshop_locker3',
    title: 'Сейф',
    coords: { x: -788.95, y: -215.04, z: 37.25 },
    drawDistance: 0.5,
    maxWeight: 60,
  },
  //= =======================================[МОТЕЛИ] ============================================
  // АЛЬТА СТРИТ
  {
    category: 'locker',
    identifier: 'alta_storage1',
    title: 'Шкаф',
    coords: { x: 306.55, y: -221.86, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge1',
    title: 'Холодильник',
    coords: { x: 311.06, y: -224.14, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage2',
    title: 'Шкаф',
    coords: { x: 304.15, y: -208.27, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge2',
    title: 'Холодильник',
    coords: { x: 301.78, y: -212.49, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage3',
    title: 'Шкаф',
    coords: { x: 307.95, y: -198.05, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge3',
    title: 'Холодильник',
    coords: { x: 305.7, y: -202.27, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage4',
    title: 'Шкаф',
    coords: { x: 321.83, y: -191.73, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge4',
    title: 'Холодильник',
    coords: { x: 317.5, y: -189.47, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage5',
    title: 'Шкаф',
    coords: { x: 306.72, y: -221.86, z: 58.03 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge5',
    title: 'Холодильник',
    coords: { x: 310.95, y: -224.12, z: 58.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage6',
    title: 'Шкаф',
    coords: { x: 304.03, y: -208.26, z: 58.03 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge6',
    title: 'Холодильник',
    coords: { x: 301.81, y: -212.58, z: 58.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage7',
    title: 'Шкаф',
    coords: { x: 307.95, y: -198.05, z: 58.03 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge7',
    title: 'Холодильник',
    coords: { x: 305.7, y: -202.27, z: 58.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage8',
    title: 'Шкаф',
    coords: { x: 321.83, y: -191.73, z: 58.03 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge8',
    title: 'Холодильник',
    coords: { x: 317.5, y: -189.47, z: 58.03 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage9',
    title: 'Шкаф',
    coords: { x: 330.47, y: -231.05, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge9',
    title: 'Холодильник',
    coords: { x: 334.64, y: -233.18, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage10',
    title: 'Шкаф',
    coords: { x: 342.3, y: -225.4, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge10',
    title: 'Холодильник',
    coords: { x: 344.56, y: -221.19, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage11',
    title: 'Шкаф',
    coords: { x: 346.31, y: -215.09, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge11',
    title: 'Холодильник',
    coords: { x: 348.52, y: -210.8, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage12',
    title: 'Шкаф',
    coords: { x: 350.13, y: -204.93, z: 54.23 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge12',
    title: 'Холодильник',
    coords: { x: 352.4, y: -200.72, z: 54.23 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage13',
    title: 'Шкаф',
    coords: { x: 330.47, y: -231.05, z: 58.02 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge13',
    title: 'Холодильник',
    coords: { x: 334.64, y: -233.18, z: 58.02 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage14',
    title: 'Шкаф',
    coords: { x: 342.3, y: -225.4, z: 58.02 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge14',
    title: 'Холодильник',
    coords: { x: 344.56, y: -221.19, z: 58.02 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage15',
    title: 'Шкаф',
    coords: { x: 346.31, y: -215.09, z: 58.02 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge15',
    title: 'Холодильник',
    coords: { x: 348.52, y: -210.8, z: 58.02 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'alta_storage16',
    title: 'Шкаф',
    coords: { x: 350.13, y: -204.93, z: 58.02 },
    drawDistance: 2,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'alta_fridge16',
    title: 'Холодильник',
    coords: { x: 352.4, y: -200.72, z: 58.02 },
    drawDistance: 2,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // ЭЛЬ РАНЧО
  {
    category: 'locker',
    identifier: 'rancho_storage1',
    title: 'Шкаф',
    coords: { x: 546.99, y: -1777.38, z: 29.29 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge1',
    title: 'Холодильник',
    coords: { x: 548.31, y: -1772.16, z: 29.29 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage2',
    title: 'Шкаф',
    coords: { x: 550.14, y: -1770.75, z: 29.29 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge2',
    title: 'Холодильник',
    coords: { x: 551.52, y: -1765.59, z: 29.29 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage3',
    title: 'Шкаф',
    coords: { x: 553.21, y: -1764.04, z: 29.29 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge3',
    title: 'Холодильник',
    coords: { x: 554.59, y: -1758.95, z: 29.29 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage4',
    title: 'Шкаф',
    coords: { x: 556.37, y: -1757.39, z: 29.29 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge4',
    title: 'Холодильник',
    coords: { x: 557.58, y: -1752.34, z: 29.29 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage5',
    title: 'Шкаф',
    coords: { x: 559.29, y: -1751.05, z: 29.29 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge5',
    title: 'Холодильник',
    coords: { x: 560.65, y: -1745.73, z: 29.29 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage6',
    title: 'Шкаф',
    coords: { x: 558.24, y: -1779.29, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge6',
    title: 'Холодильник',
    coords: { x: 553.05, y: -1778.09, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage7',
    title: 'Шкаф',
    coords: { x: 551.6, y: -1776.3, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge7',
    title: 'Холодильник',
    coords: { x: 546.44, y: -1775.04, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage8',
    title: 'Шкаф',
    coords: { x: 548.11, y: -1769.71, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge8',
    title: 'Холодильник',
    coords: { x: 549.44, y: -1764.63, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage9',
    title: 'Шкаф',
    coords: { x: 551.14, y: -1763.02, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge9',
    title: 'Холодильник',
    coords: { x: 552.43, y: -1757.96, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage10',
    title: 'Шкаф',
    coords: { x: 554.25, y: -1756.42, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge10',
    title: 'Холодильник',
    coords: { x: 555.49, y: -1751.33, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage11',
    title: 'Шкаф',
    coords: { x: 557.35, y: -1749.88, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge11',
    title: 'Холодильник',
    coords: { x: 558.58, y: -1744.84, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'rancho_storage12',
    title: 'Шкаф',
    coords: { x: 562.62, y: -1745.02, z: 33.44 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'rancho_fridge12',
    title: 'Холодильник',
    coords: { x: 567.8, y: -1746.45, z: 33.44 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  // КЛИНТОН АВЕНЮ
  {
    category: 'locker',
    identifier: 'klinton_storage1',
    title: 'Шкаф',
    coords: { x: 488.38, y: 196.72, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge1',
    title: 'Холодильник',
    coords: { x: 484.3, y: 194.41, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage2',
    title: 'Шкаф',
    coords: { x: 478.06, y: 206.16, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge2',
    title: 'Холодильник',
    coords: { x: 476.0, y: 210.45, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage3',
    title: 'Шкаф',
    coords: { x: 483.29, y: 220.89, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge3',
    title: 'Холодильник',
    coords: { x: 481.25, y: 225.08, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage4',
    title: 'Шкаф',
    coords: { x: 487.54, y: 232.41, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge4',
    title: 'Холодильник',
    coords: { x: 485.52, y: 236.62, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage5',
    title: 'Шкаф',
    coords: { x: 502.79, y: 239.29, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge5',
    title: 'Холодильник',
    coords: { x: 506.97, y: 241.34, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage6',
    title: 'Шкаф',
    coords: { x: 520.89, y: 232.52, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge6',
    title: 'Холодильник',
    coords: { x: 525.16, y: 234.71, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage7',
    title: 'Шкаф',
    coords: { x: 533.29, y: 216.37, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge7',
    title: 'Холодильник',
    coords: { x: 535.46, y: 212.06, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage8',
    title: 'Шкаф',
    coords: { x: 527.17, y: 199.02, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge8',
    title: 'Холодильник',
    coords: { x: 529.2, y: 194.84, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage9',
    title: 'Шкаф',
    coords: { x: 513.07, y: 187.69, z: 104.74 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge9',
    title: 'Холодильник',
    coords: { x: 508.79, y: 185.58, z: 104.74 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage10',
    title: 'Шкаф',
    coords: { x: 488.38, y: 196.72, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge10',
    title: 'Холодильник',
    coords: { x: 484.3, y: 194.41, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage11',
    title: 'Шкаф',
    coords: { x: 478.06, y: 206.16, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge11',
    title: 'Холодильник',
    coords: { x: 476.0, y: 210.45, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage12',
    title: 'Шкаф',
    coords: { x: 483.29, y: 220.89, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge12',
    title: 'Холодильник',
    coords: { x: 481.25, y: 225.08, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage13',
    title: 'Шкаф',
    coords: { x: 487.54, y: 232.41, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge13',
    title: 'Холодильник',
    coords: { x: 485.52, y: 236.62, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage14',
    title: 'Шкаф',
    coords: { x: 497.73, y: 241.2, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge14',
    title: 'Холодильник',
    coords: { x: 501.98, y: 243.15, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage15',
    title: 'Шкаф',
    coords: { x: 509.6, y: 236.89, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge15',
    title: 'Холодильник',
    coords: { x: 513.78, y: 238.85, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage16',
    title: 'Шкаф',
    coords: { x: 521.4, y: 232.49, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge16',
    title: 'Холодильник',
    coords: { x: 525.6, y: 234.55, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage17',
    title: 'Шкаф',
    coords: { x: 535.62, y: 222.19, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge17',
    title: 'Холодильник',
    coords: { x: 537.62, y: 218.0, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage18',
    title: 'Шкаф',
    coords: { x: 531.37, y: 210.28, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge18',
    title: 'Холодильник',
    coords: { x: 533.32, y: 206.18, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage19',
    title: 'Шкаф',
    coords: { x: 527.02, y: 198.52, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge19',
    title: 'Холодильник',
    coords: { x: 529.02, y: 194.37, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
  {
    category: 'locker',
    identifier: 'klinton_storage20',
    title: 'Шкаф',
    coords: { x: 513.02, y: 187.74, z: 108.31 },
    drawDistance: 1,
    maxWeight: 600,
    width: 20,
    height: 25,
  },
  {
    category: 'locker',
    identifier: 'klinton_fridge20',
    title: 'Холодильник',
    coords: { x: 508.79, y: 185.58, z: 108.31 },
    drawDistance: 1,
    maxWeight: 100,
    width: 20,
    height: 20,
  },
];

/* harmony default export */ const lockers = (lockers_Config);

;// CONCATENATED MODULE: ./client/lockers/markers.ts



class lockers_markers_Markers {
  constructor(onPress) {
    this.onPress = (zone) => {
    };
    this.markers = [];
    this.sprites = [];
    this.onPress = onPress;
    lockers.Zones.forEach((zone) => {
      const sprite = lockers_markers_Markers.createSprite(zone);
      this.sprites.push(sprite);
      const marker = lockers_markers_Markers.createMarker(zone, () => {
        this.onPress(zone);
      }, () => {
        sprite.textureName = "locker_e";
      }, () => {
        sprite.textureName = "locker";
      });
      this.markers.push(marker);
    });
  }
  static createSprite(zone) {
    const sprite = new Sprite_Sprite({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      scale: new Vector2(0.1, 0.1),
      textureDict: "spritedict",
      textureName: "locker",
      alpha: 255,
      color: [255, 255, 255],
      drawDistance: zone.drawDistance
    });
    return sprite;
  }
  static createMarker(zone, onPress, onEnter, onExit) {
    const marker = new Marker({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      markerType: -1,
      scale: new Vector3(2, 2, 1),
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430 \u043A \u0448\u043A\u0430\u0444\u0447\u0438\u043A\u0443`,
      drawDistance: zone.drawDistance,
      onPress,
      onEnter,
      onExit
    });
    return marker;
  }
  draw() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
    this.sprites.forEach((sprite) => {
      sprite.draw();
    });
  }
}
/* harmony default export */ const lockers_markers = (lockers_markers_Markers);

;// CONCATENATED MODULE: ./client/lockers/index.ts
var lockers_async = (__this, __arguments, generator) => {
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

let markerWorked = false;
const client_lockers_markers = new lockers_markers((zone) => {
  if (markerWorked)
    return;
  markerWorked = true;
  emitNet("inventory:openInventories", [
    {category: zone.category, identifier: zone.identifier},
    {category: "player-inventory"}
  ]);
});
setTick(() => lockers_async(undefined, null, function* () {
  markerWorked = false;
  client_lockers_markers.draw();
}));

;// CONCATENATED MODULE: ./config/forges.js
const forges_Config = {};
forges_Config.Locale = 'ru';

forges_Config.Zones = [
    {
        categories: { ['Химия']: 4, ['Медицина']: 2 },
        identifier: 'lab_forge',
        title: 'Лаборатория',
        coords: { x: -449.15, y: -307.87, z: 34.6 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, ['Напитки']: 2, ['Оружейники']: 2, ['Нефтяники']: 2, ['Приборостроение']: 2, ['Химия']: 2, ['Металлургия']: 2, ['Фермерство']: 2, ['Медицина']: 2, },
        identifier: 'master_forge',
        title: 'Тестовая',
        coords: { x: 411.2, y: -975.8, z: 29.4 },
        drawDistance: 20,
    },
    //Ballas
    {
        categories: { ['Химия']: 2, },
        identifier: 'lab_ballas',
        title: 'Лаборатория',
        coords: { x: 90.32, y: -1986.81, z: 20.42 },
        drawDistance: 1,
    },
    {
        categories: { ['Оружейники']: 2, },
        identifier: 'gun_ballas',
        title: 'Оружейная',
        coords: { x: 108.46, y: -1981.02, z: 20.96 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ballas',
        title: 'Кухня',
        coords: { x: 114.11, y: -1970.85, z: 21.33 },
        drawDistance: 1,
    },
    //Families
    {
        categories: { ['Химия']: 2, },
        identifier: 'lab_fam',
        title: 'Лаборатория',
        coords: { x: -136.42, y: -1611.67, z: 35.03 },
        drawDistance: 1,
    },
    {
        categories: { ['Оружейники']: 2, },
        identifier: 'gun_fam',
        title: 'Оружейная',
        coords: { x: -135.36, y: -1609.05, z: 35.03 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_fam',
        title: 'Кухня',
        coords: { x: -150.64, y: -1605.77, z: 35.03 },
        drawDistance: 1,
    },
    //Vagos
    {
        categories: { ['Химия']: 2, },
        identifier: 'lab_vag',
        title: 'Лаборатория',
        coords: { x: 335.84, y: -2019.19, z: 22.39 },
        drawDistance: 1,
    },
    {
        categories: { ['Оружейники']: 2, },
        identifier: 'gun_vag',
        title: 'Оружейная',
        coords: { x: 331.18, y: -2012.91, z: 22.39 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_vag',
        title: 'Кухня',
        coords: { x: 347.87, y: -2030.09, z: 22.39 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, },
        identifier: 'tinker_vag',
        title: 'Верстак',
        coords: { x: 365.56, y: -2040.94, z: 22.39 },
        drawDistance: 1,
    },
    //Marabunta
    {
        categories: { ['Химия']: 2, },
        identifier: 'lab_mar',
        title: 'Лаборатория',
        coords: { x: 1435.42, y: -1488.55, z: 66.62 },
        drawDistance: 1,
    },
    {
        categories: { ['Оружейники']: 2, },
        identifier: 'gun_mar',
        title: 'Оружейная',
        coords: { x: 1439.48, y: -1490.9, z: 66.62 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда']: 4, ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_mar',
        title: 'Кухня',
        coords: { x: 1437.64, y: -1481.33, z: 63.7 },
        drawDistance: 1,
    },
    //Bean Machine
    {
        categories: { ['Еда']: 40, ['Еда: домашняя']: 40, ['Еда: суши']: 40, ['Еда: рестораны']: 40, ['Еда: cладости']: 100, ['Напитки']: 40 },
        identifier: 'kitchen_bm',
        title: 'Кухня',
        coords: { x: -825.98, y: -599.43, z: 29.03 },
        drawDistance: 1,
    },
    //Human Labs
    {
        categories: { ['Химия']: 2, },
        identifier: 'lab_hm',
        title: 'Лаборатория',
        coords: { x: 3559.86, y: 3673.69, z: 28.12 },
        drawDistance: 1.5,
    },
    //Zonah
    {
        categories: { ['Еда']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_zh',
        title: 'Кухня',
        coords: { x: -437.0, y: -341.15, z: 34.6 },
        drawDistance: 1,
    },
    //BurgerShot
    {
        categories: { ['Еда']: 4, ['Еда: фастфуд']: 40, },
        identifier: 'kitchen_bs',
        title: 'Кухня',
        coords: { x: -1199.11, y: -901.07, z: 14.0 },
        drawDistance: 1,
    },
    {
        categories: { ['Напитки']: 2 },
        identifier: 'kitchen_bs2',
        title: 'Кухня',
        coords: { x: -1197.54, y: -897.62, z: 14.0 },
        drawDistance: 1,
    },
    //================= [МОТЕЛИ] =================
    //АЛЬТА СТРИТ
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast1',
        title: 'Кухня',
        coords: { x: 311.87, y: -222.11, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast2',
        title: 'Кухня',
        coords: { x: 303.76, y: -213.46, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast3',
        title: 'Кухня',
        coords: { x: 307.63, y: -203.26, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast4',
        title: 'Кухня',
        coords: { x: 316.59, y: -191.44, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast5',
        title: 'Кухня',
        coords: { x: 311.87, y: -222.11, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast6',
        title: 'Кухня',
        coords: { x: 303.76, y: -213.46, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast7',
        title: 'Кухня',
        coords: { x: 307.63, y: -203.26, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast8',
        title: 'Кухня',
        coords: { x: 316.59, y: -191.44, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast9',
        title: 'Кухня',
        coords: { x: 335.58, y: -231.3, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast10',
        title: 'Кухня',
        coords: { x: 342.43, y: -220.03, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast11',
        title: 'Кухня',
        coords: { x: 346.35, y: -209.86, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast12',
        title: 'Кухня',
        coords: { x: 350.23, y: -199.58, z: 54.23 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast13',
        title: 'Кухня',
        coords: { x: 335.58, y: -231.3, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast14',
        title: 'Кухня',
        coords: { x: 342.43, y: -220.03, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast15',
        title: 'Кухня',
        coords: { x: 346.35, y: -209.86, z: 58.02 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_altast16',
        title: 'Кухня',
        coords: { x: 350.23, y: -199.58, z: 58.02 },
        drawDistance: 1,
    },
    //ЭЛЬ РАНЧО
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost1',
        title: 'Кухня',
        coords: { x: 546.41, y: -1771.26, z: 29.29 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost2',
        title: 'Кухня',
        coords: { x: 549.57, y: -1764.73, z: 29.29 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost3',
        title: 'Кухня',
        coords: { x: 552.74, y: -1758.08, z: 29.29 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost4',
        title: 'Кухня',
        coords: { x: 555.77, y: -1751.5, z: 29.29 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost5',
        title: 'Кухня',
        coords: { x: 558.7, y: -1744.82, z: 29.29 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost6',
        title: 'Кухня',
        coords: { x: 552.17, y: -1780.04, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost7',
        title: 'Кухня',
        coords: { x: 545.56, y: -1776.88, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost8',
        title: 'Кухня',
        coords: { x: 547.43, y: -1763.66, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost9',
        title: 'Кухня',
        coords: { x: 550.58, y: -1757.09, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost10',
        title: 'Кухня',
        coords: { x: 553.5, y: -1750.38, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost11',
        title: 'Кухня',
        coords: { x: 556.64, y: -1743.9, z: 33.44 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_ranchost12',
        title: 'Кухня',
        coords: { x: 568.76, y: -1744.41, z: 33.44 },
        drawDistance: 1,
    },
    //КЛИНТОН АВЕНЮ
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton1',
        title: 'Кухня',
        coords: { x: 486.55, y: 193.65, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton2',
        title: 'Кухня',
        coords: { x: 475.17, y: 208.21, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton3',
        title: 'Кухня',
        coords: { x: 480.48, y: 222.86, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton4',
        title: 'Кухня',
        coords: { x: 484.74, y: 234.33, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton5',
        title: 'Кухня',
        coords: { x: 504.7, y: 242.17, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton6',
        title: 'Кухня',
        coords: { x: 523.39, y: 235.28, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton7',
        title: 'Кухня',
        coords: { x: 536.2, y: 214.28, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton8',
        title: 'Кухня',
        coords: { x: 529.9, y: 196.9, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton9',
        title: 'Кухня',
        coords: { x: 510.92, y: 184.81, z: 104.74 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton10',
        title: 'Кухня',
        coords: { x: 486.55, y: 193.65, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton11',
        title: 'Кухня',
        coords: { x: 475.17, y: 208.21, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton12',
        title: 'Кухня',
        coords: { x: 480.48, y: 222.86, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton13',
        title: 'Кухня',
        coords: { x: 484.74, y: 234.33, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton14',
        title: 'Кухня',
        coords: { x: 499.75, y: 243.92, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton15',
        title: 'Кухня',
        coords: { x: 511.41, y: 239.65, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton16',
        title: 'Кухня',
        coords: { x: 523.6, y: 235.23, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton17',
        title: 'Кухня',
        coords: { x: 538.38, y: 220.25, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton18',
        title: 'Кухня',
        coords: { x: 534.08, y: 208.41, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton19',
        title: 'Кухня',
        coords: { x: 529.72, y: 196.49, z: 108.31 },
        drawDistance: 1,
    },
    {
        categories: { ['Еда: домашняя']: 4, ['Напитки']: 2 },
        identifier: 'kitchen_klinton20',
        title: 'Кухня',
        coords: { x: 511.04, y: 184.82, z: 108.31 },
        drawDistance: 1,
    },
];

/* harmony default export */ const forges = (forges_Config);
;// CONCATENATED MODULE: ./client/forges/markers.ts



class forges_markers_Markers {
  constructor(onPress) {
    this.onPress = (zone) => {
    };
    this.markers = [];
    this.sprites = [];
    this.onPress = onPress;
    forges.Zones.forEach((zone) => {
      const sprite = forges_markers_Markers.createSprite(zone);
      this.sprites.push(sprite);
      const marker = forges_markers_Markers.createMarker(zone, () => {
        this.onPress(zone);
      }, () => {
        sprite.textureName = "craft_e";
      }, () => {
        sprite.textureName = "craft";
      });
      this.markers.push(marker);
    });
  }
  static createSprite(zone) {
    const sprite = new Sprite_Sprite({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      scale: new Vector2(0.1, 0.1),
      textureDict: "spritedict",
      textureName: "craft",
      alpha: 255,
      color: [255, 255, 255],
      drawDistance: zone.drawDistance
    });
    return sprite;
  }
  static createMarker(zone, onPress, onEnter, onExit) {
    const marker = new Marker({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      markerType: 1,
      scale: new Vector3(2, 2, 1),
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430: ~b~${zone.title}~s~`,
      drawDistance: zone.drawDistance,
      onPress,
      onEnter,
      onExit
    });
    return marker;
  }
  draw() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
    this.sprites.forEach((sprite) => {
      sprite.draw();
    });
  }
}
/* harmony default export */ const forges_markers = (forges_markers_Markers);

;// CONCATENATED MODULE: ./client/forges/index.ts
var forges_async = (__this, __arguments, generator) => {
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


let forges_markerWorked = false;
const client_forges_markers = new forges_markers((zone) => {
  if (forges_markerWorked)
    return;
  forges_markerWorked = true;
  Log.debug("Press forge", zone.title);
  emit("nova-ui:showCraft", "craft", zone.identifier, zone.categories);
});
setTick(() => forges_async(undefined, null, function* () {
  forges_markerWorked = false;
  client_forges_markers.draw();
}));

;// CONCATENATED MODULE: ./config/doorlock.js
const doorlock_Config = {};
doorlock_Config.Locale = 'en';

doorlock_Config.DoorList = {

    //
    // Mission Row First Floor
    //

    // Entrance Doors
    ["lspd_ent"]: {
        textCoords: [434.7, -981.93, 30.9],
        authorizedRoles: ['police'],
        locked: false,
        distance: 2.5,

        doors: [
            {
                objName: 'v_ilev_ph_door01',
                objCoords: [434.6813, -980.6288, 30.8451]
            },

            {
                objName: 'v_ilev_ph_door002',
                objCoords: [434.6813, -983.2438, 30.8451]
            }
        ]
    },

    // To locker room & roof
    ["lspd_locker"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor004',
        objCoords: [450.0936, -985.7114, 30.82878],
        textCoords: [450.1, -986.9, 30.8],
        authorizedRoles: ['police'],
        distance: 2.3,
        locked: true
    },

    // Rooftop
    ["lspd_roof"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor02',
        objCoords: [464.3, -984.6, 43.8],
        textCoords: [464.3, -984.0, 44.8],
        authorizedRoles: ['police'],
        locked: true
    },

    // Hallway to roof
    ["lspd_roofhall"]: {
        group: "lspd",
        objName: 'v_ilev_arm_secdoor',
        objCoords: [461.2, -985.3, 30.8],
        textCoords: [461.2, -986.5, 30.7],
        authorizedRoles: ['police'],
        distance: 2.5,
        locked: true
    },

    // Armory
    // ["lspd_armory"]: {
    // 	objName: 'v_ilev_arm_secdoor',
    // 	objCoords : [452.6, -982.7, 30.6],
    // 	textCoords: [453.0, -982.6, 31.7],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },

    // Captain Office
    ["lspd_captain"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor002',
        objCoords: [446.5732, -980.0388, 30.87032],
        textCoords: [447.8, -980.0, 30.7],
        authorizedRoles: ['police'],
        difficulty: 10,
        distance: 2.5,
        locked: true
    },

    ["lspd_chief"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor002',
        objCoords: [462.77, -1000.99, 35.93],
        textCoords: [462.77, -1000.99, 35.93],
        authorizedRoles: ['police'],
        difficulty: 10,
        locked: true
    },
    // To downstairs (double doors)
    ["lspd_down"]: {
        group: "lspd",
        textCoords: [444.7, -989.4, 31.0],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2.5,
        difficulty: 10,
        doors: [
            {
                objName: 'v_ilev_ph_gendoor005',
                objCoords: [443.3697, -989.5233, 30.92709]
            },

            {
                objName: 'v_ilev_ph_gendoor005',
                objCoords: [446.0056, -989.5233, 30.92709]
            }
        ]
    },
    // Допросные
    ["lspd_stuff"]: {
        group: "lspd",
        textCoords: [460.9, -990.88, 30.7],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_ph_gendoor006',
                objCoords: [461.3, -992.1, 30.6]
            },

            {
                objName: 'v_ilev_ph_gendoor006',
                objCoords: [461.32, -989.77, 30.6]
            }
        ]
    },

    // STORAGE
    ["lspd_storage1"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor006',
        objCoords: [471.41, -985.37, 24.91],
        textCoords: [471.41, -985.37, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    ["lspd_storage2"]: {
        group: "lspd",
        objName: 'prop_fnclink_02gate7',
        objCoords: [475.44, -986.87, 24.91],
        textCoords: [475.51, -985.89, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // SERVER
    ["lspd_server"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor006',
        objCoords: [468.25, -977.83, 24.91],
        textCoords: [468.25, -977.83, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // laba
    ["lspd_lab"]: {
        group: "lspd",
        objName: 'v_ilev_ph_gendoor006',
        objCoords: [463.67, -981.24, 24.91],
        textCoords: [463.67, -981.24, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    ["lspd_inter1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [467.91, -1003.38, 24.91],
        textCoords: [467.91, -1003.38, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    ["lspd_inter2"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [476.4, -1003.43, 24.91],
        textCoords: [476.4, -1003.43, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    //
    // Mission Row Cells
    //

    // Main Cells
    ["lspd_cells"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [463.8, -992.6, 24.9],
        textCoords: [463.3, -992.6, 25.1],
        authorizedRoles: ['police'],
        locked: true
    },

    // Cell 1
    ["lspd_cell1"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [462.3, -993.6, 24.9],
        textCoords: [461.8, -993.3, 25.0],
        authorizedRoles: ['police'],
        locked: true
    },

    // Cell 2
    ["lspd_cell2"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [462.3, -998.1, 24.9],
        textCoords: [461.8, -998.8, 25.0],
        authorizedRoles: ['police'],
        locked: true
    },

    // Cell 3
    ["lspd_cell3"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [461.7523, -1001.3, 25.03753],
        textCoords: [461.7523, -1002.444, 25.03753],
        authorizedRoles: ['police'],
        locked: true
    },
    // Cell 4
    ["lspd_cell4"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [472.2, -996.35, 24.91],
        textCoords: [472.2, -996.35, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // Cell 5
    ["lspd_cell5"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [467.83, -996.64, 24.91],
        textCoords: [467.83, -996.64, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // Cell 6
    ["lspd_cell6"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [476.4, -996.5, 24.91],
        textCoords: [476.4, -996.5, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // Cell 7
    ["lspd_cell7"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [480.75, -996.42, 24.91],
        textCoords: [480.75, -996.42, 24.91],
        authorizedRoles: ['police'],
        locked: true
    },
    // To Back
    ["lspd_back1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [463.5221, -1003.583, 25.00726],
        textCoords: [464.6827, -1003.583, 24.98337],
        authorizedRoles: ['police'],
        locked: true
    },


    // {
    // 	objName: 'v_ilev_ph_cellgate',
    // 	objCoords : [481.9, -988.73, 25.0],
    // 	textCoords: [481.8, -988.13, 25.5],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },
    // {
    // 	objName: 'v_ilev_ph_cellgate',
    // 	objCoords : [482.1, -991.1, 25.0],
    // 	textCoords: [482.1, -991.8, 25.5],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },
    // Balk


    //
    // Mission Row Back
    //

    // Back (double doors)
    ["lspd_back2"]: {
        group: "lspd",
        textCoords: [468.6712, -1014.491, 26.54721],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2.5,
        doors: [
            {
                objName: 'v_ilev_rc_door2',
                objCoords: [467.3945, -1014.491, 26.54721]
            },

            {
                objName: 'v_ilev_rc_door2',
                objCoords: [469.9337, -1014.491, 26.54721]
            }
        ]
    },
    ["lspd_back3"]: {
        group: "lspd",
        textCoords: [445.9, -999.1, 30.7],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2.5,
        doors: [
            {
                objName: 'v_ilev_gtdoor',
                objCoords: [444.75, -999.36, 30.7],
            },

            {
                objName: 'v_ilev_gtdoor',
                objCoords: [446.85, -999.54, 30.7]
            }
        ]
    },

    // {
    // 	objName: 'v_ilev_ph_cellgate',
    // 	objCoords : [481.9, -988.73, 25.0],
    // 	textCoords: [481.8, -988.13, 25.5],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },
    // {
    // 	objName: 'v_ilev_ph_cellgate',
    // 	objCoords : [482.1, -991.1, 25.0],
    // 	textCoords: [482.1, -991.8, 25.5],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },
    // Balk

    //
    // Mission Row Back
    //

    // Back (double doors)

    // Back Gate
    ['backgate']: {
        objName: 'hei_prop_station_gate',
        objCoords: [488.8948, -1017.212, 27.14935],
        textCoords: [488.8009, -1019.99, 28.60564],
        authorizedRoles: ['police'],
        locked: true,
        distance: 14,
        size: 2
    },

    //
    //VinewoodPD
    //
    //Mainshell
    ["lobby_to_stuff"]: {
        group: "lspd",
        textCoords: [624.40, -7.47, 82.895],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [623.17334, -7.03775, 82.895]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [625.6068725, -7.9257, 82.895]
            }
        ]
    },
    ["lobbystairsdowna"]: {
        group: "lspd",
        textCoords: [614.57, -7.89, 79.43],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [614.17, -9.07, 79.895]
            },

            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [614.91, -6.85, 79.895]
            }
        ]
    },
    ["vwpd_storage"]: {
        group: "lspd",
        textCoords: [596.32, 3.94, 79.43],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [595.28, 4.25, 79.895]
            },

            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [597.49, 3.59, 79.895]
            }
        ]
    },
    ["vwpd_swat"]: {
        group: "lspd",
        textCoords: [606.33, -1.14, 79.43],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [607.4, -1.41, 79.895]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [605.41, -0.77, 79.895]
            }
        ]
    },
    ["lobby_closed"]: {
        textCoords: [620.70, 8.15, 82.75],
        locked: true,
        distance: 2,
        doors: []
    },
    ["lobbystairs1"]: {
        group: "lspd",
        textCoords: [623.7, 0.57, 82.74],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [623.34, 1.19, 82.74]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [624.31, -0.47, 82.74]
            }
        ]
    },
    ["dispach_vpd"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor002',
        objCoords: [622.71, -16.8, 82.75],
        textCoords: [622.71, -16.8, 82.75],
        authorizedRoles: ['police'],
        locked: true
    },
    ["arch1"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor002',
        objCoords: [630.18, -9.04, 82.75],
        textCoords: [629.77, -9.59, 82.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["arch2"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor002',
        objCoords: [630.18, -9.04, 82.75],
        textCoords: [629.77, -9.59, 82.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["dispach"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor002',
        objCoords: [623.79, -13.88, 82.75],
        textCoords: [623.71, -14.33, 82.75],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cloakroomvine"]: {
        group: "lspd",
        objName: 'v_ilev_door_orangesolid',
        objCoords: [614.71, -15.56, 82.75],
        textCoords: [614.63, -15.01, 82.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cloackroomvine_closed1"]: {
        objCoords: [610.55, -6.41, 82.89],
        textCoords: [610.55, -5.20, 82.89],
        locked: true,
        doors: [],
        distance: 2,
    },
    ["cloackroomvine_closed2"]: {
        objCoords: [607.3, -5.37, 82.89],
        textCoords: [607.8, -4.20, 82.89],
        locked: true,
        doors: [],
        distance: 2,
    },
    ["armory1"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor01',
        objCoords: [608.872, -17.130, 82.897],
        textCoords: [609.86, -17.55, 82.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["armoryin"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor01',
        objCoords: [608.81, -22.94, 82.75],
        textCoords: [609.5, -22.92, 82.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["hallwaytostairs"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [604.202, -11.1634, 82.899],
        textCoords: [603.22, -10.87, 82.75],
        authorizedRoles: ['police'],
        locked: true
    },
    ["stairstocell1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [605.66369628, -7.15039157, 87.9671936],
        textCoords: [604.71, -6.74, 87.82],
        authorizedRoles: ['police'],
        locked: true
    },
    ["stairstocell2"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor01',
        objCoords: [613.63, -6.42, 87.82],
        textCoords: [613.05, -6.43, 87.82],
        authorizedRoles: ['police'],
        locked: true
    },
    ["stairstosecfl"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [595.34, -7.8817, 91.08],
        textCoords: [596.34, -8.18, 90.93],
        authorizedRoles: ['police'],
        locked: true
    },
    ["stairs2tosecfl"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [618.685, 1.296, 91.08],
        textCoords: [618.38, 0.3, 90.93],
        authorizedRoles: ['police'],
        locked: true
    },
    //Secondfloor
    ["secfloorlab"]: {
        group: "lspd",
        textCoords: [622.91, 7.79, 90.93],
        authorizedRoles: ['police'],
        locked: true,
        distance: 1.7,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [624.706, 7.5, 90.93]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [621.87, 8.19, 90.93]
            }
        ]
    },
    ["capoffice1"]: {
        group: "lspd",
        textCoords: [629.58, 1.05, 90.93],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_ld_bankdoors_02',
                objCoords: [629.87, 1.39, 90.93]
            },

            {
                objName: 'prop_ld_bankdoors_02',
                objCoords: [629.29, 0.36, 90.93]
            }
        ]
    },
    // ["mainoffice1"]: {
    // 	group: "lspd",
    // 	textCoords: [618.54, -9.16, 90.93],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true,
    // 	distance: 2,
    // 	doors: [
    // 		{
    // 			objName: 'v_ilev_fib_door3',
    // 			objCoords: [618.85, -8.8, 90.93]
    // 		},

    // 		{
    // 			objName: 'v_ilev_fib_door3',
    // 			objCoords: [618.43, -9.74, 90.93]
    // 		}
    // 	}
    // },
    // ["sergdoor1"]: {
    // 	group: "lspd",
    // 	objName: 'v_ilev_cf_officedoor',
    // 	objCoords : [624.455, -7.959, 91.089],
    // 	textCoords: [625.37, -7.47, 90.93],
    // 	authorizedRoles: [ 'police' ],
    // 	locked: true
    // },
    ["sergdoor2"]: {
        group: "lspd",
        objName: 'v_ilev_cf_officedoor',
        objCoords: [622.842, -15.053, 91.089],
        textCoords: [622.3, -14.22, 90.93],
        authorizedRoles: ['police'],
        locked: true
    },
    ["detectiveffice1"]: {
        group: "lspd",
        textCoords: [613.25, -18.7, 90.93],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_fib_door1',
                objCoords: [612.42, -18.71, 90.93]
            },

            {
                objName: 'v_ilev_fib_door1',
                objCoords: [613.93, -19.03, 90.93]
            }
        ]
    },
    //Mainshell2
    ["lobbycells"]: {
        group: "lspd",
        textCoords: [619.54, 16.54, 87.82],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_prop_ph_door01',
                objCoords: [620.872, 16.226, 87.969]
            },

            {
                objName: 'leb_prop_ph_door002',
                objCoords: [618.426, 17.118259, 87.969]
            }
        ]
    },
    ["lobbytohall"]: {
        group: "lspd",
        textCoords: [617.14, 9.96, 87.95],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [615.9564819, 10.338897705, 87.968223]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [618.389648, 9.45201683, 87.968223]
            }
        ]
    },
    ["hallwaytoint"]: {
        group: "lspd",
        textCoords: [613.13, 4.22, 87.95],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_vinepd_secdoor01',
                objCoords: [613.731445, 5.42362, 87.95768]
            },

            {
                objName: 'leb_vinepd_secdoor002',
                objCoords: [612.844238, 2.9889183, 87.9684143]
            }
        ]
    },
    ["hallcelldoor"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [614.21643, 1.20881652, 87.96688],
        textCoords: [613.10, 1.58, 88.0],
        authorizedRoles: ['police'],
        locked: true
    },
    ["storageroomcell"]: {
        group: "lspd",
        objName: 'leb_vinepd_secdoor01',
        objCoords: [609.552, 7.389, 87.97],
        textCoords: [608.6, 7.73, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["identification1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [604.34, 5.64, 87.967],
        textCoords: [603.4, 6.07, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["interrogation1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [606.19, 8.66, 87.82],
        textCoords: [606.19, 8.66, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["interrogation2"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [599.299, 11.135, 87.97],
        textCoords: [598.33, 11.62, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["interrogation3"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [591.554, 13.942, 87.967],
        textCoords: [590.37, 14.32, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    //Cells
    ["inttocells1"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [580.60, 13.818, 87.97],
        textCoords: [579.49, 14.09, 87.95],
        authorizedRoles: ['police'],
        locked: true
    },
    ["inttocells2"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [579.2, 15.42, 84.82],
        textCoords: [579.2, 15.60, 84.75],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cellbig1"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [581.84, 16.42, 84.67],
        textCoords: [582.92, 16.10, 84.65],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cellsmall1"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [588.99, 13.82, 84.67],
        textCoords: [588.04, 14.24, 84.65],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cellsmall2"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [591.12, 13.1, 84.82],
        textCoords: [590.95, 13.1, 84.65],
        authorizedRoles: ['police'],
        locked: true
    },
    ["cellsmall3"]: {
        group: "lspd",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [594.99, 11.63, 84.67],
        textCoords: [593.95, 12.01, 84.65],
        authorizedRoles: ['police'],
        locked: true
    },
    ["closecells1"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [586.589, 9.92, 84.67],
        textCoords: [586.24, 8.93, 84.52],
        authorizedRoles: ['police'],
        locked: true
    },
    ["closecells2"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [585.16, 6.03, 84.67],
        textCoords: [584.85, 5.05, 84.52],
        authorizedRoles: ['police'],
        locked: true
    },
    ["closecells3"]: {
        group: "lspd",
        objName: 'v_ilev_gtdoor',
        objCoords: [583.76, 2.16, 84.67],
        textCoords: [583.46, 1.1, 84.52],
        authorizedRoles: ['police'],
        locked: true
    },
    //Garage//
    ["lspd_pillar"]: {
        group: "lspd",
        objName: 'leb_vinepd_prop_pillardoor01',
        forceCoords: [545.5344, -51.35389, 69.998],
        forceRot: [180, 0, -120],

        objCoords: [545.5344, -51.35389, 69.998],
        textCoords: [545.5344, -51.35389, 71.000],
        authorizedRoles: ['police'],
        locked: true,
        distance: 10,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["garage_door"]: {
        group: "police",
        objName: 'V_ILev_CT_Door03',
        objCoords: [535.87, -21.4, 70.63],
        textCoords: [536.4, -21.4, 71.00],
        authorizedRoles: ['police'],
        locked: true
    },
    ["car_garagedoor_1"]: {
        group: "police",
        objName: 'leb_vinepd_garagedoor_v2',

        objCoords: [527.2, -24.84, 70.63],
        textCoords: [527.2, -24.84, 71.63],
        authorizedRoles: ['police'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["car_garagedoor_2"]: {
        group: "police",
        objName: 'leb_vinepd_garagedoor_v2',

        objCoords: [531.56, -22.15, 70.63],
        textCoords: [531.56, -22.15, 71.63],
        authorizedRoles: ['police'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    //
    // Sandy Shores
    //

    // Entrance
    ["shpd_ent"]: {
        group: "sheriff",
        objName: 'v_ilev_shrfdoor',
        objCoords: [1855.1, 3683.5, 34.2],
        textCoords: [1855.1, 3683.5, 35.0],
        authorizedRoles: ['police'],
        locked: false
    },
    ["shpd_cell1"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [1848.07, 3681.55, 34.29],
        textCoords: [1848.35, 3681.08, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },
    ["shpd_cell2"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_cellgate',
        objCoords: [1846.44, 3684.47, 34.29],
        textCoords: [1846.1, 3685.02, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },
    ["shpd_cells"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_gendoor004',
        objCoords: [1850.76, 3682.88, 34.29],
        textCoords: [1850.76, 3682.88, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },
    ["shpd_stuff1"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_gendoor004',
        objCoords: [1856.66, 3689.87, 34.29],
        textCoords: [1856.66, 3689.87, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },
    ["shpd_stuff2"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_gendoor004',
        objCoords: [1848.69, 3690.91, 34.29],
        textCoords: [1848.69, 3690.91, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },
    ["shpd_stuff3"]: {
        group: "sheriff",
        objName: 'v_ilev_ph_gendoor004',
        objCoords: [1845.67, 3688.84, 34.29],
        textCoords: [1845.67, 3688.84, 34.29],
        authorizedRoles: ['police'],
        locked: true
    },


    //
    // Paleto Bay
    //

    // Entrance (double doors)
    ["palpd_ent"]: {
        textCoords: [-443.5, 6016.3, 32.0],
        authorizedRoles: ['police'],
        locked: false,
        distance: 2.5,
        doors: [
            {
                objName: 'v_ilev_shrf2door',
                objCoords: [-443.1, 6015.6, 31.7],
            },

            {
                objName: 'v_ilev_shrf2door',
                objCoords: [-443.9, 6016.6, 31.7]
            }
        ]
    },

    // Zonah Hospital
    ["operating_room1"]: {
        group: "zonah",
        textCoords: [-438.26, -315.34, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 1,
        doors: [
            {
                objName: 'v_ilev_cor_darkdoor',
                objCoords: [-438.43, -316.42, 34.6]
            },

            {
                objName: 'v_ilev_cor_darkdoor',
                objCoords: [-438.18, -314.08, 34.6]
            }
        ]
    },
    ["operating_room2"]: {
        group: "zonah",
        textCoords: [-437.68, -311.43, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 1,
        doors: [
            {
                objName: 'v_ilev_cor_darkdoor',
                objCoords: [-437.99, -312.55, 34.6]
            },

            {
                objName: 'v_ilev_cor_darkdoor',
                objCoords: [-437.55, -310.22, 34.6]
            }
        ]
    },
    ["morg1"]: {
        group: "zonah",
        textCoords: [-441.81, -302.29, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_hospital_secdoor002',
                objCoords: [-442.62, -302.33, 34.6]
            },

            {
                objName: 'leb_hospital_secdoor01',
                objCoords: [-440.49, -302.54, 34.6]
            }
        ]
    },
    ["morg2"]: {
        group: "zonah",
        textCoords: [-442.79, -294.52, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_doorglassb',
                objCoords: [-442.88, -295.41, 34.6]
            },

            {
                objName: 'v_ilev_cor_doorglassa',
                objCoords: [-442.46, -293.42, 34.6]
            }
        ]
    },
    ["exit_n"]: {
        group: "zonah",
        textCoords: [-468.24, -281.21, 35.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [-469.34, -281.69, 35.6]
            },

            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [-467.24, -280.72, 35.6]
            }
        ]
    },
    ["exit_e"]: {
        group: "zonah",
        textCoords: [-431.56, -328.93, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [-431.27, -327.78, 34.6]
            },

            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [-431.55, -330.13, 34.6]
            }
        ]
    },
    ["exit_s1"]: {
        group: "zonah",
        textCoords: [-441.93, -329.66, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-443.08, -329.48, 34.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-440.77, -329.85, 34.6]
            }
        ]
    },
    ["exit_s2"]: {
        group: "zonah",
        textCoords: [-437.66, -326.06, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 1.5,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-438.86, -325.76, 34.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-436.82, -326.08, 34.6]
            }
        ]
    },
    ["ward_group"]: {
        group: "zonah",
        textCoords: [-433.96, -313.94, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-433.79, -312.75, 34.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-434.11, -315.16, 34.6]
            }
        ]
    },
    ["coridor1"]: {
        group: "zonah",
        textCoords: [-436.81, -305.16, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-437.1, -306.2, 34.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-436.89, -304.31, 34.6]
            }
        ]
    },
    ["coridor2"]: {
        group: "zonah",
        textCoords: [-451.59, -303.14, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-451.63, -304.25, 34.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-451.44, -301.9, 34.6]
            }
        ]
    },
    ["meeting"]: {
        group: "zonah",
        textCoords: [-458.92, -303.58, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_door_orangesolid',
                objCoords: [-458.53, -304.54, 34.6]
            },

            {
                objName: 'v_ilev_door_orangesolid',
                objCoords: [-459.3, -302.57, 34.6]
            }
        ]
    },
    ["boss"]: {
        group: "zonah",
        textCoords: [-455.14, -313.15, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_fib_door1',
                objCoords: [-454.51, -313.98, 34.6]
            },

            {
                objName: 'v_ilev_fib_door1',
                objCoords: [-455.61, -312.04, 34.6]
            }
        ]
    },
    ["garage"]: {
        group: "zonah",
        textCoords: [-458.18, -328.16, 26.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-458.63, -327.22, 26.6]
            },

            {
                objName: 'v_ilev_cor_firedoorwide_edit01',
                objCoords: [-457.93, -329.22, 26.6]
            }
        ]
    },
    ["lab"]: {
        group: "zonah",
        textCoords: [-444.47, -306.36, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_hospital_secdoor002',
                objCoords: [-443.37, -306.37, 34.6]
            },

            {
                objName: 'leb_hospital_secdoor01',
                objCoords: [-445.58, -305.98, 34.6]
            }
        ]
    },
    ["zonah_garage"]: {
        group: "zonah",
        objName: 'leb_hospital_garagedoor01',

        objCoords: [-459.06, -276.55, 38.04],
        textCoords: [-459.06, -276.55, 36.6],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["oper_r"]: {
        group: "zonah",
        objName: 'leb_hospital_secdoor01',
        objCoords: [-443.37, -311.25, 34.6],
        textCoords: [-443.61, -312.14, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["oper_l"]: {
        group: "zonah",
        objName: 'leb_hospital_secdoor01',
        objCoords: [-443.64, -312.98, 34.6],
        textCoords: [-443.81, -314.04, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["ward_solo"]: {
        group: "zonah",
        objName: 'v_ilev_cor_firedoorwide_edit01',
        objCoords: [-433.14, -308.88, 34.6],
        textCoords: [-433.58, -309.66, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["stairs1"]: {
        group: "zonah",
        objName: 'v_ilev_cor_firedoorwide_edit01',
        objCoords: [-449.56, -325.98, 34.6],
        textCoords: [-449.13, -325.23, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["stairs2"]: {
        group: "zonah",
        objName: 'v_ilev_cor_firedoorwide_edit01',
        objCoords: [-449.49, -325.75, 26.6],
        textCoords: [-449.3, -325.19, 26.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["psycho"]: {
        group: "zonah",
        objName: 'v_ilev_fib_door1',
        objCoords: [-456.24, -310.33, 34.6],
        textCoords: [-456.51, -309.51, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["chillroom1"]: {
        group: "zonah",
        objName: 'v_ilev_door_orangesolid',
        objCoords: [-434.25, -344.58, 34.6],
        textCoords: [-434.17, -343.78, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["chillroom2"]: {
        group: "zonah",
        objName: 'v_ilev_door_orangesolid',
        objCoords: [-435.99, -330.33, 34.6],
        textCoords: [-435.42, -330.52, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["lookout"]: {
        group: "zonah",
        objName: 'v_ilev_door_orangesolid',
        objCoords: [-439.47, -324.28, 34.6],
        textCoords: [-439.33, -323.27, 34.6],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    // BANKS

    //
    ["bank_pacific_vault"]: {
        objName: 'hei_v_ilev_bk_gate2_pris',
        objCoords: [262.0, 221.91, 106.2],
        textCoords: [261.9, 221.94, 106.2],
        authorizedRoles: ['police'],
        locked: true
    },

    ["bank_blane_vault"]: {
        objName: 'v_ilev_cbankvaulgate01',
        objCoords: [-104.92, 6473.58, 31.63],
        textCoords: [-105.25, 6472.83, 31.63],
        authorizedRoles: ['police'],
        locked: true
    },
    // Bolingbroke Penitentiary
    //

    // Entrance (Two big gates)
    ["bank3"]: {
        objName: 'prop_gate_prison_01',
        objCoords: [1844.9, 2604.8, 44.6],
        textCoords: [1844.9, 2608.5, 48.0],
        authorizedRoles: ['police'],
        locked: true,
        distance: 12,
        size: 2
    },

    ["bank4"]: {
        objName: 'prop_gate_prison_01',
        objCoords: [1818.5, 2604.8, 44.6],
        textCoords: [1818.5, 2608.4, 48.0],
        authorizedRoles: ['police'],
        locked: true,
        distance: 12,
        size: 2
    },

    ["bank5"]: {
        objName: 'prop_gate_prison_01',
        objCoords: [1799.8, 2617.7, 44.6],
        textCoords: [1796.99, 2617.51, 48.6],
        authorizedRoles: ['police'],
        locked: true,
        distance: 12,
        size: 2
    },

    ["bank6"]: {
        objName: 'prop_fnclink_03gate5',
        objCoords: [1797.5, 2591.72, 45.8],
        textCoords: [1797.17, 2591.55, 45.8],
        authorizedRoles: ['police'],
        locked: true
    },
    // PRISON
    ["prison1"]: {
        textCoords: [1705.99, 2498.73, -78.0],
        authorizedRoles: ['police'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [1705.5, 2498.01, -78.6]
            },

            {
                objName: 'v_ilev_gtdoor02',
                objCoords: [1705.59, -2499.49, -78.6]
            }
        ]
    },
    ["prison2"]: {
        objName: 'v_ilev_cd_entrydoor',
        objCoords: [1722.39, 2500.33, -78.0],
        textCoords: [1722.68, 2501.8, -77.5],
        authorizedRoles: ['police'],
        locked: true
    },
    // PILLBOX HILL
    ["pill1"]: {
        group: "ambu",
        objName: 'v_ilev_cor_firedoorwide',
        objCoords: [337.83, -583.62, 28.8],
        textCoords: [337.83, -583.62, 29.5],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["pill2"]: {
        group: "ambu",
        objName: 'v_ilev_cor_firedoorwide',
        distance: 2,
        objCoords: [333.63, -576.91, 28.8],
        textCoords: [333.41, -577.17, 29.5],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["pill3"]: {
        group: "ambu",
        objName: 'v_ilev_cor_firedoorwide',
        objCoords: [330.94, -576.16, 28.8],
        textCoords: [330.94, -576.16, 29.5],
        authorizedRoles: ['ambulance'],
        locked: true
    },
    ["pill4"]: {
        group: "ambu",
        textCoords: [334.21, -592.43, 28.79],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [334.32, -593.24, 28.79]
            },

            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [334.97, -591.56, 28.79]
            }
        ]
    },
    ["pill5"]: {
        group: "ambu",
        textCoords: [341.88, -571.4, 28.79],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [341.72, -572.6, 28.79]
            },

            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [342.22, -570.52, 28.79]
            }
        ]
    },
    ["pill6"]: {
        group: "ambu",
        textCoords: [319.89, -560.58, 28.79],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'hei_prop_heist_cutscene_doorc_r',
                objCoords: [319.17, -561.2, 28.78]
            },

            {
                objName: 'hei_prop_heist_cutscene_doorc_r',
                objCoords: [320.9, -560.13, 28.78]
            }
        ]
    },

    ["pill7"]: {
        group: "ambu",
        textCoords: [346.1, -568.33, 28.79],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [344.91, -568.34, 28.78]
            },

            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [347.02, -569.14, 28.78]
            }
        ]
    },

    ["pill8"]: {
        group: "ambu",
        textCoords: [251.91, -1366.43, -28.79],
        authorizedRoles: ['ambulance'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [252.98, -1366.69, 24.54]
            },

            {
                objName: 'v_ilev_cor_firedoor',
                objCoords: [251.31, -1365.49, 24.54]
            }
        ]
    },

    // UNICORN
    ["uni1"]: {
        group: "unicorn",
        objName: 'prop_strip_door_01',
        objCoords: [128.54, -1298.93, 29.23],
        textCoords: [128.54, -1298.19, 29.50],
        authorizedRoles: ['unicorn'],
        locked: true
    },
    ["uni2"]: {
        group: "unicorn",
        objName: 'prop_magenta_door',
        objCoords: [95.48, -1285.14, 29.50],
        textCoords: [95.48, -1285.14, 29.50],
        authorizedRoles: ['unicorn'],
        locked: true
    },
    ["uni3"]: {
        group: "unicorn",
        objName: 'v_ilev_roc_door2',
        objCoords: [99.64, -1293.47, 29.50],
        textCoords: [99.64, -1293.47, 29.50],
        authorizedRoles: ['unicorn'],
        locked: true
    },

    ["uni4"]: {
        group: "unicorn",
        objName: 'v_ilev_door_orangesolid',
        objCoords: [133.49, -1293.50, 29.50],
        textCoords: [133.49, -1293.50, 29.50],
        authorizedRoles: ['unicorn'],
        locked: true
    },
    // Tequila
    ["teq1"]: {
        group: "tequila",
        objName: 'v_ilev_roc_door4',
        objCoords: [-564.49, 276.61, 83.11],
        textCoords: [-564.49, 276.61, 83.11],
        authorizedRoles: ['tequila'],
        locked: true
    },
    ["teq2"]: {
        group: "tequila",
        objName: 'v_ilev_roc_door4',
        objCoords: [-561.94, 293.73, 87.6],
        textCoords: [-561.94, 293.73, 87.6],
        authorizedRoles: ['tequila'],
        locked: true
    },
    ["teq3"]: {
        group: "tequila",
        objName: 'v_ilev_roc_door2',
        objCoords: [-560.19, 292.33, 82.18],
        textCoords: [-560.19, 292.33, 82.18],
        authorizedRoles: ['tequila'],
        locked: true
    },

    // BAGAMA
    ["bagama_ent"]: {
        group: "bagama",
        textCoords: [-1388.01, -587.23, 30.22],
        authorizedRoles: ['bagama'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_ph_gendoor006',
                objCoords: [-1387.14, -586.67, 30.22]
            },

            {
                objName: 'v_ilev_ph_gendoor006',
                objCoords: [-1389.05, -587.76, 30.22]
            }
        ]
    },


    // LS CUSTOMS
    ["lsc_ent"]: {
        group: "lsk",
        objName: 'prop_com_ls_door_01',

        objCoords: [-356.09, -134.77, 40.01],
        textCoords: [-355.02698, -135.1586, 39],
        authorizedRoles: ['mechanic'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    // Benny's
    ["bennys_ent"]: {
        group: "benny",
        objName: 'lr_prop_supermod_door_01',

        objCoords: [-205.7007, -1310.692, 30.2957],
        textCoords: [-205.68283081055, -1310.6826171875, 32.297708511353],
        authorizedRoles: ['mechanic-bennys'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    // Taxi
    ["taxi_ent1"]: {
        group: "taxi",
        textCoords: [907.0, -160.5, 74.5],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_taxipark_prop_slidedoor_r',
                objCoords: [906.216, -162.110, 74.558]
            },

            {
                objName: 'leb_taxipark_prop_slidedoor_l',
                objCoords: [908.085, -159.025, 74.558]
            }
        ]
    },
    ["taxi_ent2"]: {
        group: "taxi",
        textCoords: [894.5, -178.9, 75],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_roc_door2',
                objCoords: [895.440, -177.471, 74.946]
            },

            {
                objName: 'v_ilev_roc_door2',
                objCoords: [893.675, -180.334, 74.946]
            }
        ]
    },
    ["taxi_in1b"]: {
        group: "taxi",
        textCoords: [901.39, -163.73, 74.14],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'ba_prop_door_club_glam_generic',
                objCoords: [902.3, -163.91, 74.14]
            },

            {
                objName: 'ba_prop_door_club_glam_generic',
                objCoords: [900.65, -162.9, 74.14]
            }
        ]
    },
    ["taxi_ent3"]: {
        group: "taxi",
        objName: 'v_ilev_roc_door2',
        objCoords: [895.73, -145.28, 76.94],
        textCoords: [895.73, -145.28, 76.94],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_ent4"]: {
        group: "taxi",
        objName: 'v_ilev_roc_door2',
        objCoords: [883.06, -160.41, 77.12],
        textCoords: [883.06, -160.41, 77.12],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in1"]: {
        group: "taxi",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [897.63, -159.62, 78.17],
        textCoords: [897.63, -159.62, 78.17],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in2"]: {
        group: "taxi",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [892.48, -162.86, 76.94],
        textCoords: [892.48, -162.86, 76.94],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in3"]: {
        group: "taxi",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [897.7, -156.27, 74.14],
        textCoords: [897.7, -156.27, 74.14],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in4"]: {
        group: "taxi",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [898.07, -158.9, 74.14],
        textCoords: [898.07, -158.9, 74.14],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in5"]: {
        group: "taxi",
        objName: 'leb_taxipark_prop_slidedoor2_r',
        objCoords: [902.42, -164.08, 78.17],
        textCoords: [902.42, -164.08, 78.17],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_in6"]: {
        group: "taxi",
        objName: 'V_iLev_FIB_door2',
        objCoords: [902.81, -158.23, 78.17],
        textCoords: [902.81, -158.23, 78.17],
        authorizedRoles: ['taxi'],
        locked: true
    },
    ["taxi_ent_gar1"]: {
        group: "taxi",
        objName: 'leb_taxipark_garagedoor_b',

        objCoords: [899.76, -148.09, 78.7],
        textCoords: [899.76, -148.09, 76.93],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 4,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["repair_ent_gar1"]: {
        group: "taxi",
        objName: 'leb_taxipark_garagedoor_s',

        objCoords: [898.76, -172.27, 75.5],
        textCoords: [898.76, -172.27, 74.5],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 4,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["repair_ent_gar2"]: {
        group: "taxi",
        objName: 'leb_taxipark_garagedoor_s',

        objCoords: [901.2, -168.59, 75.5],
        textCoords: [901.2, -168.59, 74.5],
        authorizedRoles: ['taxi'],
        locked: true,
        distance: 4,
        size: 1,
        openRatioThreshold: 1.0,
    },
    // BeanMachine
    ["bm_back"]: {
        group: "bm",
        objName: 'leb_beanmachine_backdoor01',

        objCoords: [-814.27, -586.12, 30.67],
        textCoords: [-813.8, -586.49, 30.67],
        authorizedRoles: ['bean_machine'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bm_main1"]: {
        group: "bm",
        textCoords: [-835.47, -609.92, 29.03],
        authorizedRoles: ['bean_machine'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_beanmachine_maindoor_l',
                objCoords: [-834.48, -610.48, 29.03]
            },

            {
                objName: 'leb_beanmachine_maindoor_r',
                objCoords: [-836.35, -609.2, 29.03]
            }
        ]
    },
    ["bm_main2"]: {
        group: "bm",
        textCoords: [-837.49, -607.81, 29.03],
        authorizedRoles: ['bean_machine'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_beanmachine_maindoor_l',
                objCoords: [-836.59, -608.68, 29.03]
            },

            {
                objName: 'leb_beanmachine_maindoor_r',
                objCoords: [-838.53, -606.87, 29.03]
            }
        ]
    },
    ["bm_stuff"]: {
        group: "bm",
        textCoords: [-830.02, -594.22, 29.03],
        authorizedRoles: ['bean_machine'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_ld_bankdoors_02',
                objCoords: [-830.71, -593.89, 29.03]
            },

            {
                objName: 'prop_ld_bankdoors_02',
                objCoords: [-829.18, -595.03, 29.03]
            }
        ]
    },
    // Gangs basses
    ["fam_hide"]: {
        group: "families",
        objName: 'v_ilev_janitor_frontdoor',
        objCoords: [-136.2, -1602.77, 35.03],
        textCoords: [-136.43, -1603.33, 35.03],
        authorizedRoles: ['families'],
        locked: true
    },
    ["fam_wind"]: {
        group: "families",
        objName: 'prop_gang_door_02',
        objCoords: [-157.65, -1596.46, 35.11],
        textCoords: [-157.37, -1595.86, 35.11],
        authorizedRoles: ['families'],
        locked: true
    },
    ["fam_main1"]: {
        group: "families",
        objName: 'prop_gang_door_01',
        objCoords: [-139.97, -1600.21, 35.03],
        textCoords: [-140.49, -1599.91, 35.03],
        authorizedRoles: ['families'],
        locked: true
    },
    ["fam_main2"]: {
        group: "families",
        objName: 'prop_gang_door_01',
        objCoords: [-148.7, -1596.76, 35.03],
        textCoords: [-148.16, -1596.24, 35.03],
        authorizedRoles: ['families'],
        locked: true
    },
    ["vag_main1"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [344.48, -2028.26, 22.39],
        textCoords: [345.12, -2028.64, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main2"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [344.11, -2027.67, 22.39],
        textCoords: [343.77, -2027.37, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main3"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [335.99, -2020.81, 22.39],
        textCoords: [336.38, -2021.28, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main4"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [360.72, -2041.67, 22.39],
        textCoords: [361.14, -2041.93, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main5"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [352.69, -2034.95, 22.39],
        textCoords: [352.36, -2034.68, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main6"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [353.52, -2035.47, 22.39],
        textCoords: [353.87, -2035.96, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main7"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [364.55, -2044.74, 22.39],
        textCoords: [364.75, -2045.23, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main8"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [371.51, -2040.1, 22.39],
        textCoords: [371.22, -2040.63, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main9"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [365.22, -2032.55, 22.39],
        textCoords: [364.83, -2032.45, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main10"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [361.4, -2029.76, 22.39],
        textCoords: [361.85, -2030.16, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main11"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [356.82, -2025.62, 22.39],
        textCoords: [356.55, -2025.47, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main12"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [353.16, -2022.63, 22.39],
        textCoords: [353.58, -2022.78, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_main13"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [344.86, -2015.61, 22.39],
        textCoords: [345.18, -2015.93, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_hide1"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [332.4, -2017.9, 22.39],
        textCoords: [332.7, -2018.24, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_hide2"]: {
        group: "vagos",
        objName: 'prop_door_vagos_gang',
        objCoords: [336.56, -2011.01, 22.39],
        textCoords: [336.0, -2011.23, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    ["vag_hide3"]: {
        group: "vagos",
        objName: 'p_cut_door_01',
        objCoords: [338.52, -2017.12, 22.39],
        textCoords: [338.97, -2016.73, 22.39],
        authorizedRoles: ['vagos'],
        locked: true
    },
    // ["bal_garage_back"]: {
    //     group: "ballas",
    //     objName: 'p_cut_door_01',
    //     objCoords : [338.52, -2017.12, 22.39],
    //     textCoords: [338.97, -2016.73, 22.39],
    //     authorizedRoles: [ 'ballas' ],
    //     locked: true
    // },
    ["bal_garage"]: {
        group: "ballas",
        objName: 'prop_garagel_door_02',

        objCoords: [102.73, -1960.23, 21.45],
        textCoords: [102.73, -1960.23, 20.85],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 6,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bal_lab1"]: {
        group: "ballas",
        textCoords: [92.25, -1982.37, 20.47],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_garagel_door_01_l',
                objCoords: [92.78, -1983.35, 20.44]
            },

            {
                objName: 'prop_garagel_door_01_r',
                objCoords: [91.35, -1981.63, 20.44]
            }
        ]
    },
    ["bal_lab2"]: {
        group: "ballas",
        textCoords: [94.87, -1985.27, 20.47],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_garagel_door_01_l',
                objCoords: [95.82, -1986.2, 20.44]
            },

            {
                objName: 'prop_garagel_door_01_r',
                objCoords: [94.16, -1984.7, 20.44]
            }
        ]
    },
    ["bal_gun1"]: {
        group: "ballas",
        textCoords: [107.88, -1975.97, 20.96],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_garagel_door_01m_l',
                objCoords: [109.17, -1975.53, 20.96]
            },

            {
                objName: 'prop_garagel_door_01m_r',
                objCoords: [106.74, -1976.42, 20.96]
            }
        ]
    },
    ["bal_gun2"]: {
        group: "ballas",
        objName: 'ball_prop_sync_door03g_r',

        objCoords: [104.83, -1977.12, 20.96],
        textCoords: [105.26, -1977.05, 20.85],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bal_gun3"]: {
        group: "ballas",
        objName: 'ball_prop_sync_door03g_l',

        objCoords: [111.45, -1979.05, 20.96],
        textCoords: [111.26, -1978.64, 20.85],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bal_main1"]: {
        group: "ballas",
        objName: 'ball_prop_sync_door03_r',

        objCoords: [114.77, -1961.52, 21.33],
        textCoords: [114.48, -1961.59, 21.33],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bal_main2"]: {
        group: "ballas",
        objName: 'ball_prop_sync_door03_l',

        objCoords: [113.5, -1973.58, 21.33],
        textCoords: [113.23, -1973.71, 21.33],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["bal_main3"]: {
        group: "ballas",
        textCoords: [118.16, -1973.98, 21.33],
        authorizedRoles: ['ballas'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'ball_prop_sync_door03m_r',
                objCoords: [118.93, -1973.51, 21.32]
            },

            {
                objName: 'ball_prop_sync_door03m_l',
                objCoords: [117.15, -1974.31, 21.32]
            }
        ]
    },
    ["mar_main1"]: {
        group: "marabunta",
        textCoords: [1437.58, -1491.5, 63.72],
        authorizedRoles: ['marabunta'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'bunt_prop_sync_door02a_r',
                objCoords: [1436.99, -1491.46, 63.72]
            },

            {
                objName: 'bunt_prop_sync_door02a_l',
                objCoords: [1438.45, -1491.75, 63.72]
            }
        ]
    },
    ["mar_main2"]: {
        group: "marabunta",
        textCoords: [1446.58, -1482.84, 63.7],
        authorizedRoles: ['marabunta'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'bunt_prop_sync_door02a_r',
                objCoords: [1447.01, -1482.97, 63.72]
            },

            {
                objName: 'bunt_prop_sync_door02a_l',
                objCoords: [1445.83, -1482.56, 63.72]
            }
        ]
    },
    ["mar_main3"]: {
        group: "marabunta",
        objName: 'bunt_prop_sync_door03_l',

        objCoords: [1439.81, -1480.63, 63.7],
        textCoords: [1439.81, -1480.63, 63.7],
        authorizedRoles: ['marabunta'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["mar_hide"]: {
        group: "marabunta",
        objName: 'p_cut_door_01',

        objCoords: [1439.24, -1488.51, 66.6],
        textCoords: [1439.24, -1488.51, 66.6],
        authorizedRoles: ['marabunta'],
        locked: true,
        distance: 2,
        size: 1,
        openRatioThreshold: 1.0,
    },

    // open interriors

    ["forum_drive"]: {
        group: "forum",
        objName: 'ball_prop_sync_door03g_r',
        objCoords: [105.94, -1964.09, 20.87],
        textCoords: [105.64, -1964.42, 20.87],
        authorizedRoles: ['ballas'],
        locked: true
    },

    ["beatch"]: {
        group: "beatch",
        objName: 'v_ilev_trev_doorfront',
        objCoords: [-1150.14, -1521.53, 10.63],
        textCoords: [-1150.14, -1521.53, 10.63],
        authorizedRoles: ['house_beach'],
        locked: true
    },

    ["vinewoodfrank"]: {
        group: "vinewoodfrank",
        objName: 'v_ilev_fh_frontdoor',
        objCoords: [8.12, 539.08, 176.03],
        textCoords: [8.12, 539.08, 176.03],
        authorizedRoles: ['house_franklin'],
        locked: true
    },

    ["laslagoonas"]: {
        group: "laslagoonas",
        objName: 'v_ilev_janitor_frontdoor',
        objCoords: [-107.32, -8.37, 70.52],
        textCoords: [-107.32, -8.37, 70.52],
        locked: true
    },

    ["trevor"]: {
        group: "trevor",
        objName: 'v_ilev_trevtraildr',
        objCoords: [1973.32, 3815.76, 33.51],
        textCoords: [1973.32, 3815.76, 33.51],
        authorizedRoles: ['house_trevor'],
        locked: true
    },

    ["lester"]: {
        group: "lester",
        objName: 'v_ilev_lester_doorfront',
        objCoords: [1274.33, -1720.43, 54.77],
        textCoords: [1274.33, -1720.43, 54.77],
        authorizedRoles: ['house_lester'],
        locked: true
    },
    //ДОМ МАЙКЛА
    ["mikle1"]: {
        group: "mikle",
        objName: 'v_ilev_mm_door',
        objCoords: [-806.82, 185.82, 72.48],
        textCoords: [-806.82, 185.82, 72.48],
        authorizedRoles: ['house_michael'],
        locked: true
    },

    ["mikle2"]: {
        group: "mikle",
        textCoords: [-816.39, 178.26, 72.23],
        authorizedRoles: ['house_michael'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_mm_doorm_l',
                objCoords: [-816.42, 178.74, 72.22]
            },

            {
                objName: 'v_ilev_mm_doorm_r',
                objCoords: [-816.16, 177.6, 72.22]
            }
        ]
    },

    ["mikle3"]: {
        group: "mikle",
        textCoords: [-795.35, 177.34, 72.84],
        authorizedRoles: ['house_michael'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_bh1_48_backdoor_r',
                objCoords: [-794.62, 178.04, 72.83]
            },

            {
                objName: 'prop_bh1_48_backdoor_l',
                objCoords: [-796.44, 177.27, 72.83]
            }
        ]
    },

    ["mikle4"]: {
        group: "mikle",
        textCoords: [-793.65, 181.67, 72.84],
        authorizedRoles: ['house_michael'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_bh1_48_backdoor_r',
                objCoords: [-794.12, 182.15, 72.83]
            },

            {
                objName: 'prop_bh1_48_backdoor_l',
                objCoords: [-793.53, 180.7, 72.83]
            }
        ]
    },

    ["weazel"]: {
        group: "weazel",
        textCoords: [-247.58, -2005.15, -24.69],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_serv_door01',
                objCoords: [-243.16, -2007.66, 24.69]
            },

            {
                objName: 'v_ilev_serv_door01',
                objCoords: [-242.69, -2005.75, 24.69]
            }
        ]
    },

    ["druglabs"]: {
        group: "druglabs",
        textCoords: [3005.0, 5994.0, 100.0],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'prop_door_01',
                objCoords: [3005.0, 5994.0, 101.0]
            },
            {
                objName: 'prop_door_01',
                objCoords: [3005.0, 5994.0, 91.0]
            },
            {
                objName: 'prop_door_01',
                objCoords: [3005.0, 5994.0, 81.0]
            },
            {
                objName: 'prop_door_01',
                objCoords: [3005.0, 5994.0, 71.0]
            },
        ]
    },
    // Mercinaries
    ["main_merc_gar_1"]: {
        group: "mercinaries",
        objName: 'slth_warehouse_door02',

        objCoords: [935.78, -1489.67, 32.76],
        textCoords: [935.78, -1489.67, 30.3],
        authorizedRoles: ['mercinaries'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["main_merc_gar_2"]: {
        group: "mercinaries",
        objName: 'slth_warehouse_door02',

        objCoords: [943.36, -1489.7, 33.3],
        textCoords: [943.36, -1489.7, 30.3],
        authorizedRoles: ['mercinaries'],
        locked: true,
        distance: 8,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["main_merc_door"]: {
        group: "mercinaries",
        objName: 'slth_warehouse_door',
        objCoords: [939.54, -1489.47, 30.22],
        textCoords: [939.54, -1489.47, 30.22],
        authorizedRoles: ['mercinaries'],
        locked: true
    },

    // BurgerShot
    ["burger_shot_back"]: {
        group: "burger_shot",
        objName: 'p_bs_map_door_01_s',
        objCoords: [-1179.0, -892.02, 13.97],
        textCoords: [-1179.0, -892.02, 13.97],
        authorizedRoles: ['burgershot'],
        locked: true
    },
    ["burger_shot_main1"]: {
        group: "burger_shot",
        textCoords: [-1183.97, -884.65, 14.0],
        authorizedRoles: ['burgershot'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'bs_cj_bs_door_l',
                objCoords: [-1183.13, -885.7, 14.0]
            },

            {
                objName: 'bs_cj_bs_door_r',
                objCoords: [-1184.59, -883.64, 14.0]
            }
        ]
    },
    ["burger_shot_main2"]: {
        group: "weazel",
        textCoords: [-1197.82, -884.3, 14.0],
        authorizedRoles: ['burgershot'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'bs_cj_bs_door_l',
                objCoords: [-1196.78, -883.45, 14.0]
            },

            {
                objName: 'bs_cj_bs_door_r',
                objCoords: [-1198.65, -884.87, 14.0]
            }
        ]
    },

    // CARSHOP
    ["carshop_main1"]: {
        group: "carshop",
        textCoords: [-777.18, -243.75, 37.16],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'leb_carshop_glassdoor01',
                objCoords: [-777.72, -243.88, 37.16]
            },

            {
                objName: 'leb_carshop_glassdoor01',
                objCoords: [-776.57, -243.67, 37.13]
            }
        ]
    },
    ["carshop_main2"]: {
        group: "carshop",
        textCoords: [-802.59, -223.65, 37.25],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 2,
        doors: [
            {
                objName: 'v_ilev_ch_glassdoor',
                objCoords: [-802.01, -223.98, 37.25]
            },

            {
                objName: 'v_ilev_ch_glassdoor',
                objCoords: [-802.92, -222.79, 37.25]
            }
        ]
    },
    ["carshop_stuff1"]: {
        group: "carshop",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [-782.81, -224.03, 37.25],
        textCoords: [-782.81, -224.03, 37.25],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_stuff2"]: {
        group: "carshop",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [-791.68, -222.47, 37.25],
        textCoords: [-791.68, -222.47, 37.25],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_stuff3"]: {
        group: "carshop",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [-796.19, -216.85, 37.25],
        textCoords: [-796.19, -216.85, 37.25],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_stuff4"]: {
        group: "carshop",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [-797.6, -212.16, 37.25],
        textCoords: [-797.6, -212.16, 37.25],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_boss"]: {
        group: "carshop",
        objName: 'ba_prop_door_club_glam_generic',
        objCoords: [-791.66, -217.15, 37.25],
        textCoords: [-791.66, -217.15, 37.25],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_backdoor1"]: {
        group: "carshop",
        objName: 'leb_carshop_metaldoor01',
        objCoords: [-770.2, -224.0, 37.47],
        textCoords: [-770.2, -224.0, 37.47],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_backdoor2"]: {
        group: "carshop",
        objName: 'leb_carshop_metaldoor01',
        objCoords: [-780.92, -205.54, 37.47],
        textCoords: [-780.92, -205.54, 37.47],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_backdoor3"]: {
        group: "carshop",
        objName: 'leb_carshop_metaldoor01',
        objCoords: [-795.2, -198.42, 37.29],
        textCoords: [-795.2, -198.42, 37.29],
        authorizedRoles: ['carshop'],
        locked: true
    },
    ["carshop_back_garage"]: {
        group: "carshop",
        objName: 'leb_carshop_garage_door02',

        objCoords: [-793.58, -201.44, 39.19],
        textCoords: [-793.58, -201.44, 37.86],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 3,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["carshop_front_garage1"]: {
        group: "carshop",
        objName: 'leb_carshop_garage_door01',

        objCoords: [-765.53, -237.91, 38.68],
        textCoords: [-765.53, -237.91, 37.67],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 3,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["carshop_front_garage2"]: {
        group: "carshop",
        objName: 'leb_carshop_garage_door01',

        objCoords: [-770.5, -239.86, 38.68],
        textCoords: [-770.5, -239.86, 37.67],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 3,
        size: 1,
        openRatioThreshold: 1.0,
    },
    ["carshop_hall_garage"]: {
        group: "carshop",
        objName: 'leb_carshop_glassgarage_door01',

        objCoords: [-779.78, -229.48, 38.64],
        textCoords: [-781.42, -226.61, 37.30],
        authorizedRoles: ['carshop'],
        locked: true,
        distance: 3,
        size: 1,
        openRatioThreshold: 1.0,
    },
    //==============================[МОТЕЛИ]==============================
    //АЛЬТЬ СТРИТ
    ["alta_st1"]: {
        group: "altast1",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [311.25, -218.63, 54.23],
        textCoords: [311.25, -218.63, 54.23],
        authorizedRoles: ['altast1'],
        locked: true
    },
    ["alta_st2"]: {
        group: "altast2",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [307.19, -212.85, 54.23],
        textCoords: [307.19, -212.85, 54.23],
        authorizedRoles: ['altast2'],
        locked: true
    },
    ["alta_st3"]: {
        group: "altast3",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [311.19, -202.67, 54.23],
        textCoords: [311.19, -202.67, 54.23],
        authorizedRoles: ['altast3'],
        locked: true
    },
    ["alta_st4"]: {
        group: "altast4",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [317.2, -194.96, 54.23],
        textCoords: [317.2, -194.96, 54.23],
        authorizedRoles: ['altast4'],
        locked: true
    },
    ["alta_st5"]: {
        group: "altast5",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [311.25, -218.63, 58.02],
        textCoords: [311.25, -218.63, 58.02],
        authorizedRoles: ['altast5'],
        locked: true
    },
    ["alta_st6"]: {
        group: "altast6",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [307.19, -212.85, 58.02],
        textCoords: [307.19, -212.85, 58.02],
        authorizedRoles: ['altast6'],
        locked: true
    },
    ["alta_st7"]: {
        group: "altast7",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [311.19, -202.67, 58.02],
        textCoords: [311.19, -202.67, 58.02],
        authorizedRoles: ['altast7'],
        locked: true
    },
    ["alta_st8"]: {
        group: "altast8",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [317.2, -194.96, 58.02],
        textCoords: [317.2, -194.96, 58.02],
        authorizedRoles: ['altast8'],
        locked: true
    },
    ["alta_st9"]: {
        group: "altast9",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [335.07, -227.85, 54.23],
        textCoords: [335.07, -227.85, 54.23],
        authorizedRoles: ['altast9'],
        locked: true
    },
    ["alta_st10"]: {
        group: "altast10",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [339.1, -220.73, 54.23],
        textCoords: [339.1, -220.73, 54.23],
        authorizedRoles: ['altast10'],
        locked: true
    },
    ["alta_st11"]: {
        group: "altast11",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [343.1, -210.35, 54.23],
        textCoords: [343.1, -210.35, 54.23],
        authorizedRoles: ['altast11'],
        locked: true
    },
    ["alta_st12"]: {
        group: "altast12",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [347.06, -200.29, 54.23],
        textCoords: [347.06, -200.29, 54.23],
        authorizedRoles: ['altast12'],
        locked: true
    },
    ["alta_st13"]: {
        group: "altast13",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [335.07, -227.85, 58.02],
        textCoords: [335.07, -227.85, 58.02],
        authorizedRoles: ['altast13'],
        locked: true
    },
    ["alta_st14"]: {
        group: "altast14",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [339.1, -220.73, 58.02],
        textCoords: [339.1, -220.73, 58.02],
        authorizedRoles: ['altast14'],
        locked: true
    },
    ["alta_st15"]: {
        group: "altast15",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [343.1, -210.35, 58.02],
        textCoords: [343.1, -210.35, 58.02],
        authorizedRoles: ['altast15'],
        locked: true
    },
    ["alta_st16"]: {
        group: "altast16",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [347.06, -200.29, 58.02],
        textCoords: [347.06, -200.29, 58.02],
        authorizedRoles: ['altast16'],
        locked: true
    },
    //ЭЛЬ РАНЧО
    ["rancho_st1"]: {
        group: "ranchost1",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [548.68, -1777.91, 29.3],
        textCoords: [548.68, -1777.91, 29.3],
        authorizedRoles: ['ranchost1'],
        locked: true,
        distance: 1,
    },
    ["rancho_st2"]: {
        group: "ranchost2",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [551.83, -1771.26, 29.3],
        textCoords: [551.83, -1771.26, 29.3],
        authorizedRoles: ['ranchost2'],
        locked: true,
        distance: 1,
    },
    ["rancho_st3"]: {
        group: "ranchost3",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [554.98, -1764.65, 29.3],
        textCoords: [554.98, -1764.65, 29.3],
        authorizedRoles: ['ranchost3'],
        locked: true,
        distance: 1,
    },
    ["rancho_st4"]: {
        group: "ranchost4",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [558.04, -1758.04, 29.3],
        textCoords: [558.04, -1758.04, 29.3],
        authorizedRoles: ['ranchost4'],
        locked: true,
        distance: 1,
    },
    ["rancho_st5"]: {
        group: "ranchost5",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [561.09, -1751.47, 29.3],
        textCoords: [561.09, -1751.47, 29.3],
        authorizedRoles: ['ranchost5'],
        locked: true,
        distance: 1,
    },
    ["rancho_st6"]: {
        group: "ranchost6",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [558.74, -1777.55, 33.44],
        textCoords: [558.74, -1777.55, 33.44],
        authorizedRoles: ['ranchost6'],
        locked: true,
        distance: 1,
    },
    ["rancho_st7"]: {
        group: "ranchost7",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [552.12, -1774.54, 33.44],
        textCoords: [552.12, -1774.54, 33.44],
        authorizedRoles: ['ranchost7'],
        locked: true,
        distance: 1,
    },
    ["rancho_st8"]: {
        group: "ranchost8",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [549.76, -1770.19, 33.44],
        textCoords: [549.76, -1770.19, 33.44],
        authorizedRoles: ['ranchost8'],
        locked: true,
        distance: 1,
    },
    ["rancho_st9"]: {
        group: "ranchost9",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [552.88, -1763.61, 33.44],
        textCoords: [552.88, -1763.61, 33.44],
        authorizedRoles: ['ranchost9'],
        locked: true,
        distance: 1,
    },
    ["rancho_st10"]: {
        group: "ranchost10",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [555.98, -1756.97, 33.44],
        textCoords: [555.98, -1756.97, 33.44],
        authorizedRoles: ['ranchost10'],
        locked: true,
        distance: 1,
    },
    ["rancho_st11"]: {
        group: "ranchost11",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [559.12, -1750.36, 33.44],
        textCoords: [559.12, -1750.36, 33.44],
        authorizedRoles: ['ranchost11'],
        locked: true,
        distance: 1,
    },
    ["rancho_st12"]: {
        group: "ranchost12",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [562.27, -1746.87, 33.44],
        textCoords: [562.27, -1746.87, 33.44],
        authorizedRoles: ['ranchost12'],
        locked: true,
        distance: 1,
    },
    // КЛИНТОН АВЕНЮ
    ["klinton_1"]: {
        group: "klinton1",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [488.94, 200.15, 104.75],
        textCoords: [488.94, 200.15, 104.75],
        authorizedRoles: ['klinton1'],
        locked: true,
        distance: 1,
    },
    ["klinton_2"]: {
        group: "klinton2",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [481.6, 205.96, 104.75],
        textCoords: [481.6, 205.96, 104.75],
        authorizedRoles: ['klinton2'],
        locked: true,
        distance: 1,
    },
    ["klinton_3"]: {
        group: "klinton3",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [486.96, 220.65, 104.75],
        textCoords: [486.96, 220.65, 104.75],
        authorizedRoles: ['klinton3'],
        locked: true,
        distance: 1,
    },
    ["klinton_4"]: {
        group: "klinton4",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [491.2, 232.33, 104.75],
        textCoords: [491.2, 232.33, 104.75],
        authorizedRoles: ['klinton4'],
        locked: true,
        distance: 1,
    },
    ["klinton_5"]: {
        group: "klinton5",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [502.57, 235.77, 104.75],
        textCoords: [502.57, 235.77, 104.75],
        authorizedRoles: ['klinton5'],
        locked: true,
        distance: 1,
    },
    ["klinton_6"]: {
        group: "klinton6",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [520.69, 229.19, 104.75],
        textCoords: [520.69, 229.19, 104.75],
        authorizedRoles: ['klinton6'],
        locked: true,
        distance: 1,
    },
    ["klinton_7"]: {
        group: "klinton7",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [529.98, 216.46, 104.75],
        textCoords: [529.98, 216.46, 104.75],
        authorizedRoles: ['klinton7'],
        locked: true,
        distance: 1,
    },
    ["klinton_8"]: {
        group: "klinton8",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [523.65, 199.23, 104.75],
        textCoords: [523.65, 199.23, 104.75],
        authorizedRoles: ['klinton8'],
        locked: true,
        distance: 1,
    },
    ["klinton_9"]: {
        group: "klinton9",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [513.14, 191.22, 104.75],
        textCoords: [513.14, 191.22, 104.75],
        authorizedRoles: ['klinton9'],
        locked: true,
        distance: 1,
    },
    ["klinton_10"]: {
        group: "klinton10",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [488.94, 200.15, 108.31],
        textCoords: [488.94, 200.15, 108.31],
        authorizedRoles: ['klinton10'],
        locked: true,
        distance: 1,
    },
    ["klinton_11"]: {
        group: "klinton11",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [481.6, 205.96, 108.31],
        textCoords: [481.6, 205.96, 108.31],
        authorizedRoles: ['klinton11'],
        locked: true,
        distance: 1,
    },
    ["klinton_12"]: {
        group: "klinton12",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [486.96, 220.65, 108.31],
        textCoords: [486.96, 220.65, 108.31],
        authorizedRoles: ['klinton12'],
        locked: true,
        distance: 1,
    },
    ["klinton_13"]: {
        group: "klinton13",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [491.2, 232.33, 108.31],
        textCoords: [491.2, 232.33, 108.31],
        authorizedRoles: ['klinton13'],
        locked: true,
        distance: 1,
    },
    ["klinton_14"]: {
        group: "klinton14",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [497.52, 237.52, 108.31],
        textCoords: [497.52, 237.52, 108.31],
        authorizedRoles: ['klinton14'],
        locked: true,
        distance: 1,
    },
    ["klinton_15"]: {
        group: "klinton15",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [509.32, 233.3, 108.31],
        textCoords: [509.32, 233.3, 108.31],
        authorizedRoles: ['klinton15'],
        locked: true,
        distance: 1,
    },
    ["klinton_16"]: {
        group: "klinton16",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [521.32, 228.94, 108.31],
        textCoords: [521.32, 228.94, 108.31],
        authorizedRoles: ['klinton16'],
        locked: true,
        distance: 1,
    },
    ["klinton_17"]: {
        group: "klinton17",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [532.02, 222.31, 108.31],
        textCoords: [532.02, 222.31, 108.31],
        authorizedRoles: ['klinton17'],
        locked: true,
        distance: 1,
    },
    ["klinton_18"]: {
        group: "klinton18",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [527.73, 210.7, 108.31],
        textCoords: [527.73, 210.7, 108.31],
        authorizedRoles: ['klinton18'],
        locked: true,
        distance: 1,
    },
    ["klinton_19"]: {
        group: "klinton19",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [523.37, 198.81, 108.31],
        textCoords: [523.37, 198.81, 108.31],
        authorizedRoles: ['klinton19'],
        locked: true,
        distance: 1,
    },
    ["klinton_20"]: {
        group: "klinton20",
        objName: 'v_ilev_fa_frontdoor',
        objCoords: [513.06, 191.18, 108.31],
        textCoords: [513.06, 191.18, 108.31],
        authorizedRoles: ['klinton20'],
        locked: true,
        distance: 1,
    },
    //
    // Addons
    //

    //[[
    // Entrance Gate (Mission Row mod) https://www.gta5-mods.com/maps/mission-row-pd-ymap-fivem-v1
    ['entrancegate']: {
        objName: 'prop_gate_airport_01',
        objCoords: [420.1, -1017.3, 28.0],
        textCoords: [420.1, -1021.0, 32.0],
        authorizedRoles: ['police'],
        locked: true,
        distance: 14,
        size: 2
    }
    //]]
};

/* harmony default export */ const doorlock = (doorlock_Config);
;// CONCATENATED MODULE: ./client/doorlock/doorlist.ts


const doorList = {};
function RegisterDoor(id, prop, coords) {
  RemoveDoorFromSystem(id);
  AddDoorToSystem(id, prop, coords.x, coords.y, coords.z, false, false, false);
}
Object.entries(doorlock.DoorList).forEach(([key, val]) => {
  var _a;
  const subdoors = (_a = val.doors) == null ? void 0 : _a.map((v) => {
    return {
      objName: v.objName,
      objCoords: Vector3.FromArray(v.objCoords)
    };
  });
  const door = {
    id: GetHashKey(key),
    objName: val.objName,
    objCoords: val.objCoords ? Vector3.FromArray(val.objCoords) : void 0,
    textCoords: val.textCoords ? Vector3.FromArray(val.textCoords) : void 0,
    distance: val.distance || 1.5,
    locked: val.locked || false,
    authorizedRoles: val.authorizedRoles,
    doors: subdoors,
    openRatioThreshold: val.openRatioThreshold,
    size: val.size,
    inside: false,
    sprite: void 0,
    marker: void 0
  };
  doorList[key] = door;
  if (door.objName)
    RegisterDoor(door.id, door.objName, door.objCoords);
  else if (door.doors) {
    door.doors.forEach((v, index) => {
      v.id = GetHashKey(`${door.id}#${index}`);
      RegisterDoor(v.id, v.objName, v.objCoords);
    });
  }
});

;// CONCATENATED MODULE: ./client/doorlock/markers.ts



class doorlock_markers_Markers {
  constructor(onPress) {
    this.onPress = (zoneId, zone) => {
    };
    this.markers = [];
    this.sprites = [];
    this.onPress = onPress;
    Object.entries(doorList).forEach(([zoneId, zone]) => {
      const sprite = doorlock_markers_Markers.createSprite(zone);
      this.sprites.push(sprite);
      const marker = doorlock_markers_Markers.createMarker(zone, () => {
        this.onPress(zoneId, zone);
      }, () => {
        sprite.textureName = "lock_on_e";
        zone.inside = true;
        doorlock_markers_Markers.updateDoorSpriteTexture(zone);
      }, () => {
        sprite.textureName = "lock_on";
        zone.inside = false;
        doorlock_markers_Markers.updateDoorSpriteTexture(zone);
      });
      this.markers.push(marker);
      Object.assign(zone, {
        sprite,
        marker
      });
    });
  }
  static createSprite(zone) {
    const sprite = new Sprite_Sprite({
      coords: zone.textCoords,
      scale: new Vector2(0.1, 0.1),
      textureDict: "spritedict",
      textureName: "lock_on",
      alpha: 255,
      color: [255, 255, 255],
      drawDistance: zone.distance || 2
    });
    return sprite;
  }
  static createMarker(zone, onPress, onEnter, onExit) {
    const marker = new Marker({
      coords: zone.textCoords,
      markerType: 1,
      alpha: 0,
      scale: new Vector3(2, 2, 1),
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u0434\u0432\u0435\u0440\u044C~s~`,
      drawDistance: zone.distance || 2,
      onPress,
      onEnter,
      onExit
    });
    return marker;
  }
  static getDoorSpriteIcon(zone, inside = false, authorized = false) {
    return `lock_${zone.locked ? "on" : "off"}${inside && authorized ? "_e" : ""}`;
  }
  static updateDoorSpriteTexture(zone, authorized = false) {
    zone.sprite.textureName = doorlock_markers_Markers.getDoorSpriteIcon(zone, zone.inside, authorized);
  }
  draw() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
    this.sprites.forEach((sprite) => {
      sprite.draw();
    });
  }
}
/* harmony default export */ const doorlock_markers = (doorlock_markers_Markers);

;// CONCATENATED MODULE: ./client/doorlock/index.ts
var doorlock_async = (__this, __arguments, generator) => {
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





let doorlock_markerWorked = false;
function IsAuthorized(id, door) {
  if (!door)
    return false;
  if (door.authorizedRoles) {
    const {roles} = LocalPlayer;
    if (door.authorizedRoles.some((role) => roles[role]))
      return true;
    return false;
  }
  return false;
}
function SetDoorLocked(id, val, openRatioThreshold = 0.15) {
  if (val && Math.abs(DoorSystemGetOpenRatio(id)) < openRatioThreshold) {
    if (DoorSystemGetDoorState(id) != 1) {
      DoorSystemSetDoorState(id, 1, false, false);
    }
  } else if (DoorSystemGetDoorState(id) != 0) {
    DoorSystemSetDoorState(id, 0, false, false);
  }
}
function tick() {
  return doorlock_async(this, null, function* () {
    const playerCoords = LocalPlayer.coords;
    Object.entries(doorList).forEach(([doorId, door]) => {
      const isAuthorized = IsAuthorized(doorId, door);
      door.authorized = isAuthorized;
      const distance = playerCoords.distanceTo(door.textCoords);
      if (distance < 50) {
        doorlock_markers.updateDoorSpriteTexture(door, isAuthorized);
        if (door.doors) {
          door.doors.forEach((v) => {
            SetDoorLocked(v.id, door.locked, door.openRatioThreshold);
          });
        } else {
          SetDoorLocked(door.id, door.locked, door.openRatioThreshold);
        }
      }
    });
  });
}
const client_doorlock_markers = new doorlock_markers((zoneId, zone) => {
  if (doorlock_markerWorked)
    return;
  doorlock_markerWorked = true;
  if (zone.authorized) {
    zone.locked = !zone.locked;
    emitNet("doorlock:updateState", zoneId, zone.locked);
  }
});
emitNet("doorlock:getDoorInfo");
setTick(() => doorlock_async(undefined, null, function* () {
  doorlock_markerWorked = false;
  client_doorlock_markers.draw();
}));
if (doorlock.Debug) {
  setTick(() => doorlock_async(undefined, null, function* () {
    const playerCoords = LocalPlayer.coords;
    Object.entries(doorList).forEach(([doorId, door]) => {
      const distance = playerCoords.distanceTo(door.textCoords);
      if (distance < 50) {
        if (door.doors) {
          door.doors.forEach((v) => {
            DrawBox(v.objCoords.x - 0.05, v.objCoords.y - 0.05, v.objCoords.z - 0.05, v.objCoords.x + 0.05, v.objCoords.y + 0.05, v.objCoords.z + 0.05, 50, 255, 70, 0.5);
            SetDoorLocked(v.id, door.locked, door.openRatioThreshold);
          });
        } else {
          SetDoorLocked(door.id, door.locked, door.openRatioThreshold);
        }
      }
    });
  }));
}
setTick(() => doorlock_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  yield tick();
}));
onNet("doorlock:setState", (doors) => {
  Object.entries(doors).forEach(([key, val]) => {
    doorList[key].locked = val;
  });
  tick();
});

;// CONCATENATED MODULE: ./client/playermenu/index.ts
var playermenu_async = (__this, __arguments, generator) => {
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




function teleportToWaypoint() {
  return playermenu_async(this, null, function* () {
    const blip = GetFirstBlipInfoId(8);
    const {ped} = LocalPlayer;
    if (blip > 0) {
      yield ped.fadeOut();
      const coords = GetBlipInfoIdCoord(blip);
      yield ped.teleportXY(new Vector2(coords[0], coords[1]));
      yield ped.fadeIn();
    } else {
      showNotification("\u0422\u043E\u0447\u043A\u0430 \u043D\u0435 \u0443\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430");
    }
  });
}
function openAdminMenuVehicle() {
  let {vehicle} = LocalPlayer.ped;
  if (!vehicle.exist) {
    vehicle = Vehicle.getClosest(LocalPlayer.ped.coords, 5);
    if (!vehicle.exist)
      return;
  }
  const {handle} = vehicle;
  const elements = [
    {label: "\u041F\u043E\u0447\u0438\u043D\u0438\u0442\u044C", value: "repair"},
    {label: "\u0412\u0441\u043A\u0440\u044B\u0442\u044C \u0437\u0430\u043C\u043A\u0438", value: "unlock"}
  ];
  const menu = new Menu({
    name: "admin_menu_vehicle",
    title: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435: \u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442",
    position: "tr",
    elements,
    onBack: () => {
      menu.hide();
    },
    onClick: (cmd) => {
      menu.hide();
      if (cmd == "repair") {
        SetVehicleFixed(handle);
        SetVehicleDeformationFixed(handle);
        SetVehicleUndriveable(handle, false);
        SetVehicleEngineOn(handle, true, true, false);
      } else if (cmd == "unlock") {
        SetVehicleDoorsLocked(handle, 1);
        SetVehicleDoorsLockedForAllPlayers(handle, false);
      }
    }
  }).show();
}
function openAdminMenu() {
  const elements = [];
  elements.push({label: "\u0422\u0435\u043B\u0435\u043F\u043E\u0440\u0442", value: "teleport"});
  elements.push({label: "\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442", value: "transport"});
  const menu = new Menu({
    name: "admin_menu",
    title: "\u0410\u0434\u043C\u0438\u043D\u0438\u0441\u0442\u0440\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
    position: "tr",
    elements,
    onClick: (cmd) => {
      menu.hide();
      if (cmd == "teleport") {
        teleportToWaypoint().catch(() => {
          LocalPlayer.ped.fadeIn();
          showNotification("\u041F\u0435\u0440\u0435\u043C\u0435\u0449\u0435\u043D\u0438\u0435 \u043D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C!");
        });
      }
      if (cmd == "transport") {
        openAdminMenuVehicle();
      }
    },
    onBack: () => {
      TriggerEvent("nova-ui:menu_hide");
    }
  });
  menu.show();
}
setTick(() => {
  if (Control.JustReleased(Keys.F11)) {
    openAdminMenu();
  }
});

;// CONCATENATED MODULE: ./config/holsterweapon.js
const holsterweapon_Config = {
    CooldownPolice: 700,
    cooldown: 1700,
    Weapons: [
        'WEAPON_PISTOL',
        'WEAPON_COMBATPISTOL',
        'WEAPON_APPISTOL',
        'WEAPON_PISTOL50',
        'WEAPON_SNSPISTOL',
        'WEAPON_HEAVYPISTOL',
        'WEAPON_VINTAGEPISTOL',
        'WEAPON_MARKSMANPISTOL',
        'WEAPON_MACHINEPISTOL',
        'WEAPON_VINTAGEPISTOL',
        'WEAPON_PISTOL_MK2',
        'WEAPON_SNSPISTOL_MK2',
        'WEAPON_FLAREGUN',
        'WEAPON_STUNGUN',
        'WEAPON_REVOLVER',
        'weapon_doubleaction',
    ],
};


/* harmony default export */ const holsterweapon = (holsterweapon_Config);
;// CONCATENATED MODULE: ./client/holsterweapon/anims.ts
var anims_async = (__this, __arguments, generator) => {
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




function unholsterPolice(ped) {
  return anims_async(this, null, function* () {
    yield ped.tasks.playAnim({
      animDictionary: "reaction@intimidation@cop@unarmed",
      animationName: "intro",
      blendOutSpeed: 2,
      playbackRate: 2,
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME
    });
    yield Utils_Delay(holsterweapon.CooldownPolice);
    while (ped.tasks.isPlayingAnim("reaction@intimidation@cop@unarmed", "intro") && !DisabledControl.Pressed(Controls.AIM) && !DisabledControl.Pressed(Controls.ATTACK)) {
      yield Utils_Delay(0);
    }
    ped.tasks.clear();
  });
}
function holsterPolice(ped) {
  return anims_async(this, null, function* () {
    ped.tasks.playAnim({
      animDictionary: "rcmjosh4",
      animationName: "josh_leadout_cop2",
      blendOutSpeed: 2,
      playbackRate: 10,
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY
    });
    yield Utils_Delay(500);
    ped.tasks.playAnim({
      animDictionary: "reaction@intimidation@cop@unarmed",
      animationName: "outro",
      blendOutSpeed: 2,
      playbackRate: 2,
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME
    });
    yield Utils_Delay(60);
    ped.tasks.clear();
  });
}
function unholsterCivil(ped) {
  return anims_async(this, null, function* () {
    yield ped.tasks.playAnim({
      animDictionary: "reaction@intimidation@1h",
      animationName: "intro",
      blendInSpeed: 5,
      blendOutSpeed: 1,
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME
    });
    yield Utils_Delay(holsterweapon.cooldown);
    ped.tasks.clear();
  });
}
function holsterCivil(ped) {
  return anims_async(this, null, function* () {
    ped.tasks.playAnim({
      animDictionary: "reaction@intimidation@1h",
      animationName: "outro",
      blendOutSpeed: 3,
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME
    });
    yield Utils_Delay(1700);
    ped.tasks.clear();
  });
}

;// CONCATENATED MODULE: ./client/holsterweapon/index.ts
var holsterweapon_async = (__this, __arguments, generator) => {
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





let holstered = true;
let blockKeys = false;
const allowedWeapons = new Set();
holsterweapon.Weapons.forEach((weapon) => {
  allowedWeapons.add(GetHashKey(weapon));
});
function CheckWeapon(ped) {
  return allowedWeapons.has(ped.weapon.selected);
}
setTick(() => holsterweapon_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  const isPolice = !!LocalPlayer.roles.police;
  const isOnParachute = ped.parachuteState > ParachuteState.WEAR;
  if (ped.isInAnyVehicle(true) || isOnParachute) {
    holstered = true;
    if (ped.getVehiclePedIsTryingToEnter()) {
      ped.weapon.setCurrent(Weapon.UNARMED);
    }
    return;
  }
  if (ped.isDead && !holstered) {
    blockKeys = false;
    holstered = true;
    ped.tasks.clear();
  }
  const isAllowedWeapon = CheckWeapon(ped);
  if (isAllowedWeapon && holstered) {
    blockKeys = true;
    if (isPolice)
      yield unholsterPolice(ped);
    else
      yield unholsterCivil(ped);
    blockKeys = false;
    holstered = false;
  }
  if (!isAllowedWeapon && !holstered) {
    if (isPolice)
      yield holsterPolice(ped);
    else
      yield holsterCivil(ped);
    holstered = true;
  }
}));
setTick(() => {
  if (blockKeys) {
    Control.Disable(Controls.AIM);
    Control.Disable(Controls.MELEE_ATTACK_LIGHT);
    Control.Disable(Controls.MELEE_ATTACK_HEAVY);
    Control.Disable(Controls.MELEE_ATTACK_ALTERNATE);
    Control.Disable(Controls.ENTER);
    Control.Disable(Controls.SELECT_WEAPON);
    LocalPlayer.disableFiringThisFrame();
  }
});

;// CONCATENATED MODULE: ./client/gatherables/index.ts
var gatherables_async = (__this, __arguments, generator) => {
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




function doMine(gath) {
  return gatherables_async(this, null, function* () {
    LocalPlayer.ped.tasks.playAnim({
      animDictionary: "melee@hatchet@streamed_core",
      animationName: "plyr_front_takedown_b",
      flags: AnimationFlags.REPEAT
    });
    yield Utils_Delay(2e3);
    LocalPlayer.ped.tasks.clear();
    emitNet("gatherables:gather", gath.id);
  });
}
function doCutDownTree(gath) {
  return gatherables_async(this, null, function* () {
    if (LocalPlayer.ped.tasks.isPlayingAnim("melee@hatchet@streamed_core", "plyr_front_takedown_b"))
      return;
    LocalPlayer.ped.tasks.clear();
    if (LocalPlayer.ped.weapon.selected != Weapon.HATCHET) {
      showNotification("\u041D\u0443\u0436\u043D\u043E \u0432\u0437\u044F\u0442\u044C \u0432 \u0440\u0443\u043A\u0438 \u0442\u043E\u043F\u043E\u0440!");
      return;
    }
    LocalPlayer.ped.tasks.playAnim({
      animDictionary: "melee@hatchet@streamed_core",
      animationName: "plyr_front_takedown_b",
      flags: AnimationFlags.REPEAT
    });
    yield Utils_Delay(2e3);
    emitNet("gatherables:gather", gath.id);
    yield Utils_Delay(2e3);
    LocalPlayer.ped.tasks.clear();
  });
}
class Gatherable {
  constructor(gatherable) {
    this.model = gatherable.model;
    this.category = gatherable.category;
    this.coords = Vector3.FromObject(gatherable.coords);
    this.radius = gatherable.radius;
    this.id = gatherable.id;
    this.spawned = true;
    let onPress;
    let notification;
    switch (this.category) {
      case "tree":
        onPress = doCutDownTree;
        notification = "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B \u0441\u0440\u0443\u0431\u0438\u0442\u044C \u0434\u0435\u0440\u0435\u0432\u043E";
        break;
      case "ore-iron":
        onPress = doMine;
        notification = "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B \u0434\u043E\u0431\u044B\u0442\u044C \u0436\u0435\u043B\u0435\u0437\u043E";
        break;
      default:
        Log.error("Unknown gatherable type!", this.category);
    }
    this.spot = new Spot({
      radius: this.radius,
      notificationText: notification,
      onPress: () => gatherables_async(this, null, function* () {
        if (onPress !== void 0) {
          yield onPress(this);
        } else {
          Log.error("Unknown gatherable type!", this.category);
        }
      })
    });
  }
}
const clientGatherables = {};
onNet("gatherables:sendGatherables", (serverGatherables) => {
  serverGatherables.forEach((tree) => {
    if (!clientGatherables[tree.id]) {
      clientGatherables[tree.id] = new Gatherable(tree);
    }
  });
});
onNet("engineCore:CulledProp:update", (resourceName, culledProp) => {
  if (clientGatherables[culledProp.id] !== void 0) {
    clientGatherables[culledProp.id].spawned = culledProp.spawned;
  }
});
setTick(() => {
  Object.values(clientGatherables).forEach((gatherable) => {
    if (gatherable.spawned) {
      gatherable.spot.update(gatherable.coords);
    }
  });
});

;// CONCATENATED MODULE: ./config/teleports.js
const teleports_Config = {};

teleports_Config.Marker = {
    markerType: 27,
    scale: [1.5, 1.5, 1.5],
    color: [255, 255, 255],
    alpha: 100,
    drawDistance: 8,
};

teleports_Config.Teleporters = {
    'EclipseTowers': {
        job: 'police',
        enter: {
            x: 1690.84,
            y: 2591.98,
            z: 44.70,

        },
        exit: {
            x: 1722.48,
            y: 2493.45,
            z: -78.70,

        }
    },

    'VinewoodPDtoGarage': {
        job: 'none',
        enter: {
            x: 591.99,
            y: -4.51,
            z: 78.43,

        },
        exit: {
            x: 563.32,
            y: 12.65,
            z: 69.63,

        }
    },

    'VinewoodPDtoHelipad': {
        job: 'none',
        enter: {
            x: 604.91,
            y: -9.28,
            z: 92.81,

        },
        exit: {
            x: 566.21,
            y: 4.87,
            z: 102.32,

        }
    },

    'Coke': {
        job: 'none',
        enter: {
            x: 2890.6,
            y: 4391.8,
            z: 49.5,

        },

        exit: {
            x: 1088.6,
            y: -3188.2,
            z: -39.9,

        }
    },

    'Weed': {
        job: 'none',
        enter: {
            x: 930.85,
            y: -1547.02,
            z: 29.9,

        },

        exit: {
            x: 1065.51,
            y: -3183.39,
            z: -40.1,

        }
    },

    /*
    'MotelPink': {
        job:'none',
        enter: {
            x: 333.22,
            y: -225.53,
            z: 57.12,
            
        },

        'Blip': {
            'sprite': 40,
            'color': 50,
            'text': "Мотель",
        },

        exit: {
            x: 151.32,
            y: -1007.23,
            z: -100.0,
            
        },
    },
*/

    //Next here

    'home1': {
        job: 'none',
        enter: {
            x: 323.19,
            y: 426.49,
            z: 148.05,

        },

        exit: {
            x: 325.03,
            y: 427.41,
            z: 147.97,

        }
    },

    'home2': {
        job: 'none',
        enter: {
            x: 368.83,
            y: 401.98,
            z: 144.51,

        },

        exit: {
            x: 369.2,
            y: 403.86,
            z: 144.5,

        }
    },

    'home3': {
        job: 'none',
        enter: {
            x: 120.21,
            y: 537.47,
            z: 182.9,

        },

        exit: {
            x: 119.95,
            y: 539.75,
            z: 182.9,

        }
    },

    'home4': {
        job: 'none',
        enter: {
            x: -168.44,
            y: 476.69,
            z: 136.25,

        },

        exit: {
            x: -168.82,
            y: 478.62,
            z: 136.24,

        }
    },

    'home5': {
        job: 'none',
        enter: {
            x: -666.73,
            y: 577.02,
            z: 143.98,

        },

        exit: {
            x: -668.06,
            y: 578.6,
            z: 143.97,

        }
    },

    'home6': {
        job: 'none',
        enter: {
            x: -779.02,
            y: 610.23,
            z: 142.8,

        },

        exit: {
            x: -776.57,
            y: 611.06,
            z: 142.73,

        }
    },

    'home7': {
        job: 'none',
        enter: {
            x: -857.55,
            y: 669.27,
            z: 151.45,

        },

        exit: {
            x: -857.66,
            y: 670.91,
            z: 151.45,

        }
    },

    'home8': {
        job: 'none',
        enter: {
            x: -1289.23,
            y: 426.96,
            z: 96.58,

        },

        exit: {
            x: -1289.21,
            y: 429.36,
            z: 96.5,

        }
    },

    'homebitch': {
        job: 'none',
        enter: {
            x: -1159.73,
            y: -1525.63,
            z: 9.63,

        },

        exit: {
            x: -1158.43,
            y: -1524.65,
            z: 9.63,

        }
    },
    //Тюрьма
    'prison': {
        job: 'none',
        enter: {
            x: 1820.59,
            y: 2567.87,
            z: 44.6,

        },

        exit: {
            x: 1825.39,
            y: 2585.86,
            z: 44.6,

        }
    },
    'diamondroof': {
        job: 'none',
        enter: {
            x: 948.28,
            y: 50.83,
            z: 74.12,
            information: 'Нажмите ~INPUT_PICKUP~ чтобы подняться'
        },

        exit: {
            x: 964.62,
            y: 58.86,
            z: 111.55,
            information: 'Нажмите ~INPUT_PICKUP~ чтобы cпуститься'
        }
    },

    'Biker': {
        job: 'none',
        enter: {
            x: 46.11,
            y: 2788.5,
            z: 56.88,

        },

        exit: {
            x: 997.49,
            y: -3158.08,
            z: -39.91,

        }
    },

    'Skater': {
        job: 'none',
        enter: {
            x: -174.43,
            y: -1289.52,
            z: 30.20,

        },

        exit: {
            x: -153.84,
            y: -1266.33,
            z: -100.31,

        }
    },

    'Weazel': {
        job: 'none',
        enter: {
            x: -598.07,
            y: -929.88,
            z: 22.85,

        },

        exit: {
            x: -229.63,
            y: -2009.2,
            z: 23.67,

        }
    },


    // #### ROOFS #####

    'Generic_Hotel': {
        job: 'none',
        enter: {
            x: -476.81,
            y: 218.22,
            z: 82.8,

        },

        exit: {
            x: -484.19,
            y: 198.16,
            z: 82.26,

        }
    },

    'Vinewood1': {
        job: 'none',
        enter: {
            x: -60.15,
            y: 359.85,
            z: 112.16,

        },

        exit: {
            x: -84.45,
            y: 326.1,
            z: 141.7,

        }
    },

    'Archipelago': {
        job: 'none',
        enter: {
            x: -1097.48,
            y: -324.46,
            z: 36.92,

        },

        exit: {
            x: -1113.12,
            y: -335.61,
            z: 49.12,

        }
    },

    'AltaHavik': {
        job: 'none',
        enter: {
            x: 418.56,
            y: -207.83,
            z: 59.01,

        },

        exit: {
            x: 419.33,
            y: -192.85,
            z: 73.36,

        }
    },


    'ElginHouse': {
        job: 'none',
        enter: {
            x: -71.53,
            y: 142.86,
            z: 80.6,

        },

        exit: {
            x: -72.5,
            y: 137.57,
            z: 126.78,

        }
    },

    'ClockTower': {
        job: 'none',
        enter: {
            x: -1232.77,
            y: -856.16,
            z: 12.21,

        },

        exit: {
            x: -1253.84,
            y: -842.38,
            z: 64.43,

        }
    },

    'BeachHouse1': {
        job: 'none',
        enter: {
            x: -1384.77,
            y: -976.1,
            z: 8.04,

        },

        exit: {
            x: -1399.31,
            y: -986.15,
            z: 18.48,

        }
    },


    'ArcadiusRoof': {
        job: 'none',
        enter: {
            x: -139.2,
            y: -620.63,
            z: 167.82,
            information: '~INPUT_PICKUP~ выйти на крышу'
        },

        exit: {
            x: -155.85,
            y: -602.82,
            z: 200.84,

        }
    },

    'ArcadiusMech': {
        job: 'none',
        enter: {
            x: -144.15,
            y: -576.77,
            z: 31.52,
            information: '~INPUT_PICKUP~ В мастерскую'
        },

        exit: {
            x: -143.3,
            y: -591.81,
            z: 166.1,

        }
    },

    'MazeBank': {
        job: 'none',
        enter: {
            x: -71.0,
            y: -799.68,
            z: 43.33,
            information: '~INPUT_PICKUP~ На крышу'
        },

        exit: {
            x: -66.78,
            y: -822.04,
            z: 320.39,

        }
    },

    //'Comedy': {
    //job:'none',
    //enter: {
    //x: -458.47,
    //y: 263.44,
    //z: 82.01,
    //
    // 	},

    //exit: {
    //x: -458.73,
    //y: 284.55,
    //z: 77.52,
    //
    // 	}
    // },

    'HumanLabsLift': {
        job: 'none',
        enter: {
            x: 3540.65,
            y: 3676.01,
            z: 19.90,
            information: '~INPUT_PICKUP~ Подняться'
        },

        exit: {
            x: 3540.65,
            y: 3676.01,
            z: 27.10,
            information: '~INPUT_PICKUP~ Спуститься'
        }
    },
    'HumanLabs': {
        job: 'none',
        enter: {
            x: 3574.04,
            y: 3736.31,
            z: 35.50,

        },

        exit: {
            x: 3559.6,
            y: 3695.94,
            z: 29.10,

        }
    },

};

/* harmony default export */ const teleports = (teleports_Config);
;// CONCATENATED MODULE: ./client/teleports/index.ts
var teleports_defProp = Object.defineProperty;
var teleports_defProps = Object.defineProperties;
var teleports_getOwnPropDescs = Object.getOwnPropertyDescriptors;
var teleports_getOwnPropSymbols = Object.getOwnPropertySymbols;
var teleports_hasOwnProp = Object.prototype.hasOwnProperty;
var teleports_propIsEnum = Object.prototype.propertyIsEnumerable;
var teleports_defNormalProp = (obj, key, value) => key in obj ? teleports_defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var teleports_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (teleports_hasOwnProp.call(b, prop))
      teleports_defNormalProp(a, prop, b[prop]);
  if (teleports_getOwnPropSymbols)
    for (var prop of teleports_getOwnPropSymbols(b)) {
      if (teleports_propIsEnum.call(b, prop))
        teleports_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var teleports_spreadProps = (a, b) => teleports_defProps(a, teleports_getOwnPropDescs(b));
var teleports_async = (__this, __arguments, generator) => {
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




const defaultMarker = {
  markerType: teleports.Marker.markerType,
  scale: Vector3.FromArray(teleports.Marker.scale),
  color: teleports.Marker.scale,
  alpha: teleports.Marker.alpha,
  drawDistance: teleports.Marker.drawDistance
};
function teleport(x, y, z, h) {
  return teleports_async(this, null, function* () {
    DoScreenFadeOut(200);
    yield Utils_Delay(300);
    const result = yield LocalPlayer.ped.teleport(new Vector3(x, y, z), h);
    DoScreenFadeIn(200);
    return result;
  });
}
Object.entries(teleports.Teleporters).forEach(([key, entry]) => {
  if (entry.blip) {
    entry.blip.instance = new Blip(entry.blip);
  }
  if (entry.enter) {
    entry.enter.instance = new Marker(teleports_spreadProps(teleports_spreadValues({}, defaultMarker), {
      coords: new Vector3(entry.enter.x, entry.enter.y, entry.enter.z + 0.96),
      notificationText: entry.enter.information || "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B ~b~\u0432\u043E\u0439\u0442\u0438~s~",
      onPress: () => {
        teleport(entry.exit.x, entry.exit.y, entry.exit.z);
      }
    }));
  }
  if (entry.exit) {
    entry.exit.instance = new Marker({
      markerType: 27,
      scale: new Vector3(1.5, 1.5, 1.5),
      color: [255, 255, 255],
      alpha: 100,
      coords: new Vector3(entry.exit.x, entry.exit.y, entry.exit.z + 0.96),
      notificationText: entry.exit.text || "\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0447\u0442\u043E\u0431\u044B ~g~\u0432\u044B\u0439\u0442\u0438~s~",
      onPress: () => {
        teleport(entry.enter.x, entry.enter.y, entry.enter.z);
      }
    });
  }
});
setTick(() => {
  Object.entries(teleports.Teleporters).forEach(([key, entry]) => {
    var _a, _b;
    if ((_a = entry == null ? void 0 : entry.enter) == null ? void 0 : _a.instance) {
      entry.enter.instance.draw();
    }
    if ((_b = entry == null ? void 0 : entry.exit) == null ? void 0 : _b.instance) {
      entry.exit.instance.draw();
    }
  });
});

;// CONCATENATED MODULE: ./client/seatshuffle/index.ts
var seatshuffle_async = (__this, __arguments, generator) => {
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


let disableShuffle = true;
function disableSeatShuffle(flag) {
  disableShuffle = flag;
}
setTick(() => {
  const {ped} = LocalPlayer;
  if (ped.isInAnyVehicle() && disableShuffle) {
    const {vehicle} = ped;
    if (vehicle.getPedInVehicleSeat(VehicleSeat.FRONT_PASSENGER)) {
      if (GetIsTaskActive(ped.handle, 165)) {
        ped.setIntoVehicle(vehicle, VehicleSeat.FRONT_PASSENGER);
        ped.setConfigFlag(PedConfigFlag.PreventAutoShuffleToDriversSeat, true);
      }
    }
  }
});
onNet("SeatShuffle", () => seatshuffle_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  if (ped.isInAnyVehicle(false)) {
    ped.setConfigFlag(PedConfigFlag.PreventAutoShuffleToDriversSeat, false);
    disableSeatShuffle(false);
    yield Utils_Delay(5e3);
    disableSeatShuffle(true);
  } else {
    CancelEvent();
  }
}));

;// CONCATENATED MODULE: ./client/ragdoll/index.ts
var ragdoll_async = (__this, __arguments, generator) => {
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


let ragdolled = false;
setTick(() => ragdoll_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  if (Control.JustReleased(Controls.VEH_HEADLIGHT)) {
    ragdolled = !ragdolled;
  }
  if (ragdolled) {
    if (Control.JustReleased(Keys.X)) {
      ragdolled = false;
    } else if (IsPedRunningRagdollTask(ped.handle)) {
      ResetPedRagdollTimer(ped.handle);
    } else {
      SetPedToRagdoll(ped.handle, 100, 100, 0, false, false, false);
    }
  }
}));

;// CONCATENATED MODULE: ./client/crouchandprone/dive.ts
var dive_async = (__this, __arguments, generator) => {
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


function canDive(ped) {
  return (ped.isSprinting || ped.isRunning) && ped.speed > 5 && !ped.isInAnyVehicle(true) && !ped.isFalling && !ped.isDiving && !ped.isInCover() && !ped.isInParachuteFreeFall && ped.parachuteState < ParachuteState.OPENING;
}
function pedDive(ped) {
  return dive_async(this, null, function* () {
    if (!canDive(ped))
      return false;
    ped.tasks.clear(true);
    yield ped.tasks.playAnim({
      animDictionary: "move_jump",
      animationName: "dive_start_run",
      blendOutSpeed: 1
    });
    yield Utils_Delay(1200);
    SetPedToRagdoll(ped.handle, 1e3, 1e3, 0, false, false, false);
    return true;
  });
}

;// CONCATENATED MODULE: ./client/crouchandprone/gait.ts
var gait_async = (__this, __arguments, generator) => {
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


function getGait() {
  return LocalPlayer.state.gait || "MOVE_M@TOUGH_GUY@";
}
function resetGait(ped) {
  return gait_async(this, null, function* () {
    const {handle} = ped;
    const gait = getGait();
    yield loadAnimSet(gait);
    ResetPedMovementClipset(handle, 0);
    ResetPedStrafeClipset(handle);
    SetPedMovementClipset(handle, gait, 0.5);
  });
}
function setCrouchedGait(ped) {
  return gait_async(this, null, function* () {
    yield loadAnimSet("move_ped_crouched");
    ResetPedMovementClipset(ped.handle, 0);
    ResetPedStrafeClipset(ped.handle);
    SetPedMovementClipset(ped.handle, "move_ped_crouched", 0.55);
    SetPedStrafeClipset(ped.handle, "move_ped_crouched_strafing");
  });
}

;// CONCATENATED MODULE: ./client/crouchandprone/prone.ts
var prone_async = (__this, __arguments, generator) => {
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




function headingChange(ped) {
  const frameTime = GetFrameTime();
  if (Control.Pressed(Controls.MOVE_LEFT_ONLY)) {
    ped.heading += 40 * frameTime;
  } else if (Control.Pressed(Controls.MOVE_RIGHT_ONLY)) {
    ped.heading -= 40 * frameTime;
  }
}
function proneStart(ped) {
  return prone_async(this, null, function* () {
    yield resetGait(ped);
    ped.tasks.clear();
    yield ped.tasks.playAnim({
      animDictionary: "move_crawl",
      animationName: "onfront_fwd",
      blendInSpeed: 2,
      flags: AnimationFlags.STOP_LAST_FRAME
    });
    yield Utils_Delay(100);
    ped.tasks.setAnimCurrentTime("move_crawl", "onfront_fwd", 0.99);
    yield Utils_Delay(300);
  });
}
function proneEnd(ped) {
  return prone_async(this, null, function* () {
    yield resetGait(ped);
    SetPedToRagdoll(ped.handle, 10, 10, 0, false, false, false);
    yield Utils_Delay(1e3);
    ped.tasks.clear();
    yield Utils_Delay(100);
  });
}
function proneTick(ped) {
  return prone_async(this, null, function* () {
    if (Control.Pressed(Controls.MOVE_UP_ONLY)) {
      if (!ped.tasks.isPlayingAnim("move_crawl", "onfront_fwd")) {
        yield ped.tasks.playAnim({
          animDictionary: "move_crawl",
          animationName: "onfront_fwd",
          blendInSpeed: 1,
          blendOutSpeed: 0,
          flags: AnimationFlags.STOP_LAST_FRAME
        });
      } else if (ped.tasks.getAnimCurrentTime("move_crawl", "onfront_fwd") >= 0.99) {
        ped.tasks.setAnimCurrentTime("move_crawl", "onfront_fwd", 0);
      }
      headingChange(ped);
    } else if (Control.Pressed(Controls.MOVE_DOWN_ONLY)) {
      if (!ped.tasks.isPlayingAnim("move_crawl", "onfront_bwd")) {
        yield ped.tasks.playAnim({
          animDictionary: "move_crawl",
          animationName: "onfront_bwd",
          blendInSpeed: 1,
          blendOutSpeed: 0,
          flags: AnimationFlags.STOP_LAST_FRAME
        });
      } else if (ped.tasks.getAnimCurrentTime("move_crawl", "onfront_bwd") >= 0.99) {
        ped.tasks.setAnimCurrentTime("move_crawl", "onfront_bwd", 0);
      }
      headingChange(ped);
    }
  });
}

;// CONCATENATED MODULE: ./client/crouchandprone/utils.ts
var MoveState;
(function(MoveState2) {
  MoveState2[MoveState2["STAND"] = 0] = "STAND";
  MoveState2[MoveState2["CROUCH"] = 1] = "CROUCH";
  MoveState2[MoveState2["PRONE"] = 2] = "PRONE";
})(MoveState || (MoveState = {}));

;// CONCATENATED MODULE: ./client/crouchandprone/index.ts
var crouchandprone_async = (__this, __arguments, generator) => {
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







const crouchKey = Controls.DUCK;
let currentState = MoveState.STAND;
function setState(state) {
  return crouchandprone_async(this, null, function* () {
    const {ped} = LocalPlayer;
    if (state == currentState)
      return;
    if (state == MoveState.CROUCH && currentState == MoveState.STAND) {
      yield setCrouchedGait(ped);
    }
    if (state == MoveState.STAND && currentState == MoveState.CROUCH) {
      yield resetGait(ped);
    }
    if (state == MoveState.STAND && currentState == MoveState.PRONE) {
      yield proneEnd(ped);
    }
    if (state == MoveState.PRONE && currentState == MoveState.CROUCH) {
      yield proneStart(ped);
    }
    currentState = state;
  });
}
setTick(() => crouchandprone_async(undefined, null, function* () {
  yield Utils_Delay(100);
  const {ped} = LocalPlayer;
  if (ped.isInAnyVehicle(true) || ped.isSwimming || ped.isInAir || ped.isDead || ped.isAttached) {
    setState(MoveState.STAND);
  }
}));
function pedTick(ped) {
  return crouchandprone_async(this, null, function* () {
    if (IsPauseMenuActive())
      return;
    if (Control.JustPressed(crouchKey)) {
      yield setState((currentState + 1) % 3);
      return;
    }
    if (Control.JustPressed(Controls.VEH_DUCK)) {
      yield setState(MoveState.STAND);
      return;
    }
    if (currentState == MoveState.PRONE) {
      yield proneTick(ped);
    } else if (currentState == MoveState.STAND) {
      if (Control.JustPressed(Controls.MULTIPLAYER_INFO) && Control.Pressed(Controls.SPRINT)) {
        pedDive(ped);
      }
    }
  });
}
setTick(() => crouchandprone_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  if (ped.stealth) {
    ped.stealth = false;
  }
  if (ped.exist && !ped.isDead) {
    yield pedTick(ped);
  }
}));

;// CONCATENATED MODULE: ./client/headtrack/index.ts
var headtrack_async = (__this, __arguments, generator) => {
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


const PlayerTargets = {};
let myheading = 0;
let mypitch = 0;
setTick(() => headtrack_async(undefined, null, function* () {
  yield Utils_Delay(100);
  const heading = GetGameplayCamRelativeHeading();
  const pitch = GetGameplayCamRelativePitch();
  if (Math.abs(heading - myheading) > 5 || Math.abs(pitch - mypitch) > 1) {
    myheading = heading;
    mypitch = pitch;
    TriggerServerEvent("headtrack:update", -Sin(heading) * 10, Cos(heading) * 10, pitch);
  }
}));
setTick(() => {
  Players.All().forEach((player) => {
    const {ped} = player;
    const target = PlayerTargets[player.handle];
    if (ped.exist && target) {
      const isAiming = ped.getConfigFlag(PedConfigFlag.IsAimingGun);
      if (!isAiming) {
        SetIkTarget(ped.handle, 1, PlayerPedId(), 0, target.x, target.y, target.z, 0, 100, 100);
      }
    }
  });
});
onNet("headtrack:update", function(serverid, x, y, z) {
  const player = GetPlayerFromServerId(serverid);
  PlayerTargets[player] = new Vector3(x, y, z);
});

;// CONCATENATED MODULE: ./client/timertazer/index.ts
var timertazer_async = (__this, __arguments, generator) => {
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


let isTaz = false;
setTick(() => timertazer_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  const stunned = ped.isStunned;
  if (stunned) {
    SetPedToRagdoll(ped.handle, 5e3, 5e3, 0, false, false, false);
  }
  if (stunned && !isTaz) {
    isTaz = true;
    SetTimecycleModifier("REDMIST_blend");
    ShakeGameplayCam("FAMILY5_DRUG_TRIP_SHAKE", 1);
  }
  if (!stunned && isTaz) {
    isTaz = false;
    yield Utils_Delay(5e3);
    SetTimecycleModifier("hud_def_desat_Trevor");
    yield Utils_Delay(1e4);
    SetTimecycleModifier("");
    SetTransitionTimecycleModifier("", 0);
    StopGameplayCamShaking(false);
  }
}));

;// CONCATENATED MODULE: ./client/vehiclepush/index.ts
var vehiclepush_async = (__this, __arguments, generator) => {
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




const vehiclepush_Config = {};
vehiclepush_Config.DamageNeeded = 999.8;
vehiclepush_Config.MaxWidth = 5;
vehiclepush_Config.MaxHeight = 5;
vehiclepush_Config.MaxLength = 5;
let VehData = {
  Coords: null,
  veh: null,
  Dimensions: null,
  IsInFront: false,
  Distance: null
};
setTick(() => vehiclepush_async(undefined, null, function* () {
  yield Utils_Delay(500);
  const {ped} = LocalPlayer;
  const [closestVehicle, distance] = Vehicles.getClosest();
  if (!closestVehicle)
    return;
  const vehicleCoords = closestVehicle.coords;
  const dimensions = GetModelDimensions(closestVehicle.model);
  if (distance < 4 && !ped.isInAnyVehicle()) {
    VehData.Coords = vehicleCoords;
    VehData.Dimensions = Vector3.FromArray(dimensions[0]);
    VehData.veh = closestVehicle;
    VehData.Distance = distance;
    if (closestVehicle.coords.add(closestVehicle.forwardVector).distanceTo(ped.coords) > closestVehicle.coords.add(closestVehicle.forwardVector.mul(-1)).distanceTo(ped.coords)) {
      VehData.IsInFront = false;
    } else {
      VehData.IsInFront = true;
    }
  } else {
    VehData = {Coords: null, veh: null, Dimensions: null, IsInFront: false, Distance: null};
  }
}));
function pushVehicle() {
  return vehiclepush_async(this, null, function* () {
    const {ped} = LocalPlayer;
    const vehicle = VehData.veh;
    vehicle.requestControl();
    if (VehData.IsInFront) {
      ped.attachToEntity(vehicle, ped.getBoneIndex(6286), new Vector3(0, VehData.Dimensions.y * -1 + 0.1, VehData.Dimensions.z + 1), new Vector3(0, 0, 180), false, false, true, 0, true);
    } else {
      ped.attachToEntity(vehicle, ped.getBoneIndex(6286), new Vector3(0, VehData.Dimensions.y - 0.3, VehData.Dimensions.z + 1), Vector3.Zero, false, false, true, 0, true);
    }
    ped.tasks.playAnim({
      animDictionary: "missfinale_c2ig_11",
      animationName: "pushcar_offcliff_m",
      flags: AnimationFlags.ENABLE_PLAYER_CONTROL | AnimationFlags.REPEAT,
      blendInSpeed: 2
    });
    yield Utils_Delay(200);
    const vehicleHandle = vehicle.handle;
    while (true) {
      yield Utils_Delay(0);
      if (DisabledControl.Pressed(Keys.A)) {
        TaskVehicleTempAction(PlayerPedId(), vehicleHandle, 11, 1e3);
      }
      if (DisabledControl.Pressed(Keys.D)) {
        TaskVehicleTempAction(PlayerPedId(), vehicleHandle, 10, 1e3);
      }
      vehicle.forwardSpeed = VehData.IsInFront ? -1 : 1;
      if (vehicle.hasCollidedWithAnything) {
        SetVehicleOnGroundProperly(vehicleHandle);
      }
      if (!DisabledControl.Pressed(Keys.E)) {
        DetachEntity(ped.handle, false, false);
        ped.tasks.stopAnimTask("missfinale_c2ig_11", "pushcar_offcliff_m");
        ped.freezePosition = false;
        break;
      }
    }
  });
}
setTick(() => vehiclepush_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  if (VehData.veh != null && VehData.veh.isSeatFree(VehicleSeat.DRIVER) && VehData.veh.engineHealth <= vehiclepush_Config.DamageNeeded) {
    if (Control.Pressed(Controls.SPRINT) && Control.JustPressed(Keys.E) && !ped.isAttachedToEntity(VehData.veh)) {
      if (!VehData.veh.isUpsidedown || LocalPlayer.roles.mechanic || LocalPlayer.roles["mechanic-bennys"]) {
        yield pushVehicle();
      } else {
        showNotification("~r~\u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442 \u043F\u0435\u0440\u0435\u0432\u0451\u0440\u043D\u0443\u0442!~s~");
      }
    }
  }
}));

;// CONCATENATED MODULE: ./config/policesiren.js

const policesiren_Config = {};

// SilentSiren
policesiren_Config.SILENTSIREN_PNAME = '_IS_SIREN_SILENT';
policesiren_Config.SILENTSIREN_HOTKEY = Controls.THROW_GRENADE; // G
policesiren_Config.SILENTHOTKEY_MAXTIMEOUT = 15;

// BlipSiren
policesiren_Config.BLIPSIREN_PNAME = '_IS_SIREN_BLIP';

// SirenSound
policesiren_Config.SIRENSOUND_PNAME = '_IS_SIREN_ALT_SOUND';
policesiren_Config.SIRENSOUND_HOTKEY = Controls.SPRINT; // LEFT SHIFT

/* harmony default export */ const policesiren = (policesiren_Config);
;// CONCATENATED MODULE: ./client/policesiren/index.ts
var policesiren_async = (__this, __arguments, generator) => {
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




Decor.register(policesiren.SIRENSOUND_PNAME, DecorType.BOOL);
Decor.register(policesiren.BLIPSIREN_PNAME, DecorType.BOOL);
Decor.register(policesiren.SILENTSIREN_PNAME, DecorType.BOOL);
let hotkeyTimeout = 0;
function IsDecorActive(car, decor) {
  if (!car.decor.exist(decor)) {
    return false;
  }
  return car.decor.getBool(decor);
}
function CheckForSirens() {
  Players.All().forEach((player) => {
    const playerPed = player.ped;
    const playerCar = playerPed.vehicle;
    if (playerPed && playerCar) {
      if (IsDecorActive(playerCar, policesiren.BLIPSIREN_PNAME)) {
        BlipSiren(playerCar.handle);
      }
      if (IsDecorActive(playerCar, policesiren.SIRENSOUND_PNAME)) {
        StartVehicleHorn(playerCar.handle, 1, "HELDDOWN", false);
      }
      playerCar.hasMutedSirens = IsDecorActive(playerCar, policesiren.SILENTSIREN_PNAME);
    }
  });
}
setTick(() => policesiren_async(undefined, null, function* () {
  const playerPed = LocalPlayer.ped;
  const playerCar = playerPed.vehicle;
  if (playerCar.exist) {
    if (Control.Pressed(policesiren.SILENTSIREN_HOTKEY)) {
      hotkeyTimeout += 1;
      if (hotkeyTimeout > policesiren.SILENTHOTKEY_MAXTIMEOUT) {
        playerCar.decor.setBool(policesiren.BLIPSIREN_PNAME, true);
      }
    } else {
      if (hotkeyTimeout > 0 && hotkeyTimeout < policesiren.SILENTHOTKEY_MAXTIMEOUT) {
        playerCar.decor.setBool(policesiren.SILENTSIREN_PNAME, !IsDecorActive(playerCar, policesiren.SILENTSIREN_PNAME));
      }
      playerCar.decor.setBool(policesiren.BLIPSIREN_PNAME, false);
      hotkeyTimeout = 0;
    }
    if (playerCar.isSirenOn && !IsDecorActive(playerCar, policesiren.SILENTSIREN_PNAME)) {
      if (Control.JustPressed(policesiren.SIRENSOUND_HOTKEY)) {
        playerCar.decor.setBool(policesiren.SIRENSOUND_PNAME, !IsDecorActive(playerCar, policesiren.SIRENSOUND_PNAME));
      }
    } else {
      playerCar.decor.setBool(policesiren.SIRENSOUND_PNAME, false);
    }
  }
  CheckForSirens();
}));

;// CONCATENATED MODULE: ./config/weather.js
const weather_Config = {};

weather_Config.Locale = 'ru';
weather_Config.Debug = false;
weather_Config.DynamicWeather = true;  // set this to false if you don't want the weather to change automatically
weather_Config.WeatherDuration = 30; // how many minutes single weather stage goes
weather_Config.WeatherDurationMult = { // min and max multiplier for certain stages
    ['EXTRASUNNY']: [2, 3],
    ['CLEAR']: [2, 5],
    ['NEUTRAL']: 1,
    ['SMOG']: [1, 4],
    ['FOGGY']: [1, 2],
    ['OVERCAST']: [1, 2],
    ['CLOUDS']: [1, 3],
    ['CLEARING']: [1, 2],
    ['RAIN']: 1,
    ['THUNDER']: 1,
    ['SNOW']: 1,
    ['BLIZZARD']: 1,
    ['SNOWLIGHT']: 1,
    ['XMAS']: 1,
    ['HALLOWEEN']: 1
};

weather_Config.DayTimeScale = 8;    // day time speedup,   1 = realtime, 8  =  2 real hours   per game day   (06:00 - 22:00)
weather_Config.NightTimeScale = 12; // night time speedup, 1 = realtime, 12 = 40 real minutes per game night (22:00 - 06:00)

/* harmony default export */ const weather = (weather_Config);
;// CONCATENATED MODULE: ./client/weather/index.ts
var weather_async = (__this, __arguments, generator) => {
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


let CurrentWeather = "CLEAR";
let lastWeather = "";
let serverTime = 0;
let clientTime = 0;
let freezeTime = false;
let blackout = false;
SetBlackout(blackout);
function timeToHMS(time) {
  const hour = Math.floor(time / 3600 % 24);
  const minute = Math.floor(time / 60 % 60);
  const second = Math.floor(time) % 60;
  return [hour, minute, second];
}
onNet("weather:updateWeather", function(NewWeather, newblackout) {
  if (newblackout != blackout) {
    SetBlackout(newblackout);
    blackout = newblackout;
  }
  CurrentWeather = NewWeather;
  TriggerEvent("carhud:SetWeather", NewWeather);
});
function changeWeather(weather) {
  return weather_async(this, null, function* () {
    if (lastWeather == weather)
      return;
    SetWeatherTypeOverTime(weather, 15);
    const timerStart = GetGameTimer();
    let timerLastFrame = timerStart;
    let timerDelta = 50;
    while (GetGameTimer() - timerStart < 5e3 - timerDelta && GetGameTimer() >= timerStart) {
      timerDelta = GetGameTimer() - timerLastFrame;
      if (timerDelta < 50) {
        timerDelta = 50;
      }
      if (timerDelta > 100) {
        timerDelta = 100;
      }
      timerLastFrame = GetGameTimer();
      yield Utils_Delay(0);
    }
    SetOverrideWeather(weather);
    if (CurrentWeather == "XMAS") {
      SetForceVehicleTrails(true);
      SetForcePedFootstepsTracks(true);
    } else {
      SetForceVehicleTrails(false);
      SetForcePedFootstepsTracks(false);
    }
    lastWeather = weather;
  });
}
setTick(() => weather_async(undefined, null, function* () {
  yield Utils_Delay(100);
  yield changeWeather(CurrentWeather);
}));
onNet("weather:updateTime", function(base, offset, freeze) {
  freezeTime = freeze;
  serverTime = base + offset;
});
let timer = GetGameTimer();
setTick(() => weather_async(undefined, null, function* () {
  let currentTimeScale = weather.DayTimeScale;
  if (serverTime == 0)
    return;
  let deltaTime = 0;
  let spd = 1;
  if (!freezeTime) {
    deltaTime = (GetGameTimer() - timer) / 1e3 * currentTimeScale;
    timer = GetGameTimer();
    serverTime += deltaTime;
  }
  if (Math.abs(serverTime - clientTime) > 10) {
    clientTime = serverTime;
  }
  spd = 1 - (clientTime - serverTime) * 0.02;
  if (spd < 0.5)
    spd = 0.5;
  if (spd > 2)
    spd = 2;
  clientTime += deltaTime * spd;
  const [hour, minute, second] = timeToHMS(clientTime);
  if (hour >= 6 && hour < 22) {
    currentTimeScale = weather.DayTimeScale;
  } else {
    currentTimeScale = weather.NightTimeScale;
  }
  NetworkOverrideClockTime(hour, minute, second);
}));
on("playerSpawned", function() {
  TriggerServerEvent("weather:requestSync");
});

;// CONCATENATED MODULE: ./client/trunks/index.ts
var trunks_async = (__this, __arguments, generator) => {
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






const TrunkSprite = new Sprite_Sprite({
  coords: new Vector3(0, 0, 0),
  scale: new Vector2(0.1, 0.1),
  textureDict: "spritedict",
  textureName: "cartrunk",
  alpha: 255,
  color: [255, 255, 255],
  drawDistance: 10
});
function GetVehicleUid(veh) {
  return veh.decor.getInt("Owned_Vehicle_Id");
}
function VehicleInFront() {
  const pos = LocalPlayer.coords;
  const entityWorld = Vector3.FromArray(GetOffsetFromEntityInWorldCoords(GetPlayerPed(-1), 0, 4, 0));
  const rayHandle = StartShapeTestCapsule(pos.x, pos.y, pos.z, entityWorld.x, entityWorld.y, entityWorld.z, 0.3, 10, GetPlayerPed(-1), 0);
  const [numRayHandle, hit, endCoords, surfaceNormal, entityHit] = GetShapeTestResult(rayHandle);
  if (IsEntityAVehicle(entityHit)) {
    return [new Vehicle(entityHit), Vector3.FromArray(endCoords)];
  }
  return [new Vehicle(0), null];
}
function getVehicleBootInventory(veh, cb) {
  const locked = GetVehicleDoorLockStatus(veh.handle);
  const vehClass = veh.vehicleClass;
  const pedDriver = Ped.FromEntity(veh.getPedInVehicleSeat(VehicleSeat.DRIVER));
  if (pedDriver.exist && pedDriver.isPlayer) {
    cb(null);
    return;
  }
  const uid = GetVehicleUid(veh);
  if (locked == 1 || vehClass == 15 || vehClass == 16 || vehClass == 14) {
    ServerCallback.Trigger("trunks:registerTrunk", uid, veh.plateText).then(cb);
  }
}
onNet("trunks:getVehicleBootInventory", function(veh, cb) {
  getVehicleBootInventory(veh, cb);
});
function openBoot(veh) {
  Menu.hideAll();
  getVehicleBootInventory(veh, function(...args) {
    const inventoryContainer = args[0];
    if (!inventoryContainer) {
      showNotification("\u0411\u0430\u0433\u0430\u0436\u043D\u0438\u043A \u0437\u0430\u043A\u0440\u044B\u0442 ~r~");
      return;
    }
    emitNet("inventory:openInventories", [
      {category: "player-inventory"},
      {category: inventoryContainer.category, identifier: inventoryContainer.identifier}
    ]);
  });
}
setTick(() => trunks_async(undefined, null, function* () {
  const [closecar, vehPos] = VehicleInFront();
  if (!closecar.exist) {
    TrunkSprite.alpha = 0;
    yield Utils_Delay(100);
    return;
  }
  const playerPos = LocalPlayer.coords;
  let dist = 1e4;
  if (vehPos) {
    dist = playerPos.distanceTo(vehPos);
  }
  const vehClass = GetVehicleClass(closecar.handle);
  if (vehClass != 15 && vehClass != 16 && vehClass != 14 && vehClass != 13) {
    let hasBoot = true;
    const boneDists = {};
    const bonePositions = {};
    for (const BoneName of ["boot"]) {
      const BonePos = Vector3.FromArray(GetWorldPositionOfEntityBone(closecar.handle, GetEntityBoneIndexByName(closecar.handle, BoneName)));
      const boneDist = playerPos.distanceTo(BonePos);
      if (BonePos.length > 0) {
        boneDists[BoneName] = boneDist;
        bonePositions[BoneName] = BonePos;
      }
    }
    if (closecar.isDoorDamaged(VehicleDoor.BOOT) || !boneDists.boot) {
      hasBoot = false;
    }
    const isBootOpen = closecar.getDoorAngleRatio(5) > 0.1;
    let canAccessBoot = false;
    if (boneDists.boot && hasBoot && boneDists.boot < 2 && isBootOpen) {
      TrunkSprite.coords = bonePositions.boot;
      TrunkSprite.alpha = 255;
      canAccessBoot = true;
    } else if (hasBoot == false && playerPos.distanceTo(vehPos) < 5 && closecar.getPedInVehicleSeat(VehicleSeat.DRIVER).handle != LocalPlayer.ped.handle && closecar.getDoorAngleRatio(VehicleDoor.DOOR_DSIDE_F) > 0.1) {
      TrunkSprite.coords = closecar.coords.addXYZ(0, 0, 1);
      TrunkSprite.alpha = 255;
      canAccessBoot = true;
    } else {
      TrunkSprite.alpha = 0;
    }
    TrunkSprite.draw();
    if (Control.JustPressed(Controls.CELLPHONE_CAMERA_FOCUS_LOCK)) {
      const pedInSeat = closecar.getPedInVehicleSeat(VehicleSeat.DRIVER);
      const inDriverSeat = pedInSeat.exist && pedInSeat.isLocal;
      if (hasBoot && !isBootOpen) {
        showNotification("\u0411\u0430\u0433\u0430\u0436\u043D\u0438\u043A \u0437\u0430\u043A\u0440\u044B\u0442");
      } else if (!canAccessBoot) {
      } else if (!inDriverSeat) {
        if (boneDists.boot && hasBoot && boneDists.boot < 2) {
          openBoot(closecar);
        } else if (dist < 2.5) {
          openBoot(closecar);
        }
      } else if (hasBoot == false && playerPos.distanceTo(vehPos) < 5 && !inDriverSeat) {
        openBoot(closecar);
      }
    }
  }
}));

;// CONCATENATED MODULE: ./client/health/bones.ts
const PedBones = {
  0: "chest",
  1356: "head",
  2108: "lleg",
  2992: "rarm",
  4089: "lfinger",
  4090: "lfinger",
  4137: "lfinger",
  4138: "lfinger",
  4153: "lfinger",
  4154: "lfinger",
  4169: "lfinger",
  4170: "lfinger",
  4185: "lfinger",
  4186: "lfinger",
  5232: "larm",
  6286: "rarm",
  6442: "rleg",
  10706: "rclav",
  11174: "head",
  11816: "pelvis",
  12844: "head",
  14201: "lleg",
  16335: "rleg",
  17188: "head",
  17719: "head",
  18905: "larm",
  19336: "head",
  20178: "head",
  20279: "head",
  20623: "head",
  20781: "rleg",
  21550: "head",
  22711: "larm",
  23553: "spine",
  23639: "lleg",
  24806: "rleg",
  24816: "spine",
  24817: "spine",
  24818: "spine",
  25260: "leye",
  26610: "lfinger",
  26611: "lfinger",
  26612: "lfinger",
  26613: "lfinger",
  26614: "lfinger",
  27474: "reye",
  28252: "rarm",
  28422: "rarm",
  29868: "head",
  31086: "head",
  35502: "rleg",
  35731: "neck",
  36029: "larm",
  36864: "rleg",
  37119: "rarm",
  37193: "head",
  39317: "neck",
  40269: "rarm",
  43536: "head",
  43810: "rarm",
  45509: "larm",
  45750: "head",
  46078: "lleg",
  46240: "head",
  47419: "head",
  47495: "head",
  49979: "head",
  51826: "rleg",
  52301: "rleg",
  56604: "chest",
  57005: "rarm",
  57597: "spine",
  57717: "lleg",
  58271: "lleg",
  58331: "head",
  58866: "rfinger",
  58867: "rfinger",
  58868: "rfinger",
  58869: "rfinger",
  58870: "rfinger",
  60309: "larm",
  61007: "larm",
  61163: "larm",
  61839: "head",
  63931: "lleg",
  64016: "rfinger",
  64017: "rfinger",
  64064: "rfinger",
  64065: "rfinger",
  64080: "rfinger",
  64081: "rfinger",
  64096: "rfinger",
  64097: "rfinger",
  64112: "rfinger",
  64113: "rfinger",
  64729: "lleg",
  65068: "head",
  65245: "lleg"
};
const PedBoneZones = {
  rfinger: "rarm",
  lfinger: "larm",
  spine: "torso",
  neck: "head",
  reye: "head",
  leye: "head",
  pelvis: "torso",
  rclav: "rarm",
  lclav: "larm",
  chest: "torso"
};

;// CONCATENATED MODULE: ./client/health/index.ts
var health_async = (__this, __arguments, generator) => {
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




let lastHealth = -1;
let airTime = 0;
let lastVelocity = 0;
const DAMAGE_TYPES = {
  "-1569615261": "Melee",
  WEAPON_WRENCH: "Melee",
  WEAPON_POOLCUE: "Melee",
  WEAPON_KNUCKLE: "Melee",
  WEAPON_FLASHLIGHT: "Melee",
  WEAPON_NIGHTSTICK: "Melee",
  WEAPON_HAMMER: "Melee",
  WEAPON_BAT: "Melee",
  WEAPON_CROWBAR: "Melee",
  "-1786099057": "Melee",
  WEAPON_GOLFCLUB: "Melee",
  "-2067956739": "Melee",
  "-868994466": "Melee",
  WEAPON_UNARMED: "Melee",
  "-1716189206": "Knife",
  "1223143800": "Knife",
  "-1955384325": "Knife",
  "-1833087301": "Knife",
  "910830060": "Knife",
  WEAPON_KNIFE: "Knife",
  WEAPON_BOTTLE: "Knife",
  WEAPON_DAGGER: "Knife",
  WEAPON_HATCHET: "Knife",
  WEAPON_MACHETE: "Knife",
  WEAPON_SWITCHBLADE: "Knife",
  WEAPON_BATTLEAXE: "Knife",
  WEAPON_PISTOL: "Pistol",
  WEAPON_VINTAGEPISTOL: "Pistol",
  WEAPON_COMBATPISTOL: "Pistol",
  WEAPON_APPISTOL: "Pistol",
  WEAPON_PISTOL50: "Pistol",
  WEAPON_SNSPISTOL: "Pistol",
  WEAPON_HEAVYPISTOL: "Pistol",
  WEAPON_MARKSMANPISTOL: "Pistol",
  WEAPON_REVOLVER: "Pistol",
  WEAPON_PUMPSHOTGUN: "Shotgun",
  WEAPON_BULLPUPSHOTGUN: "Shotgun",
  WEAPON_ASSAULTSHOTGUN: "Shotgun",
  WEAPON_SAWNOFFSHOTGUN: "Shotgun",
  WEAPON_HEAVYSHOTGUN: "Shotgun",
  WEAPON_DBSHOTGUN: "Shotgun",
  WEAPON_AUTOSHOTGUN: "Shotgun",
  WEAPON_ASSAULTRIFLE: "SMG",
  WEAPON_MG: "SMG",
  WEAPON_COMBATMG: "SMG",
  WEAPON_MICROSMG: "SMG",
  WEAPON_SMG: "SMG",
  WEAPON_ASSAULTSMG: "SMG",
  WEAPON_MACHINEPISTOL: "SMG",
  WEAPON_MINISMG: "SMG",
  WEAPON_CARBINERIFLE: "Rifle",
  WEAPON_ADVANCEDRIFLE: "Rifle",
  WEAPON_SPECIALCARBINE: "Rifle",
  WEAPON_BULLPUPRIFLE: "Rifle",
  WEAPON_MUSKET: "Rifle",
  WEAPON_MARKSMANRIFLE: "Rifle",
  WEAPON_COMPACTRIFLE: "Rifle",
  WEAPON_SNIPERRIFLE: "Sniper",
  WEAPON_HEAVYSNIPER: "Sniper",
  WEAPON_REMOTESNIPER: "Sniper",
  WEAPON_RAILGUN: "Sniper",
  "-100946242": "Animal",
  "148160082": "Animal",
  "-842959696": "Fall",
  "4164886": "Fall",
  "-1568386805": "Explosion",
  WEAPON_PROXMINE: "Explosion",
  WEAPON_GRENADELAUNCHER_SMOKE: "Explosion",
  WEAPON_HOMINGLAUNCHER: "Explosion",
  "-1312131151": "Explosion",
  "375527679": "Explosion",
  "324506233": "Explosion",
  "1752584910": "Explosion",
  "-1813897027": "Explosion",
  WEAPON_RPG: "Explosion",
  WEAPON_STICKYBOMB: "Explosion",
  WEAPON_GRENADE: "Explosion",
  WEAPON_SMOKEGRENADE: "Explosion",
  WEAPON_GRENADELAUNCHER: "Explosion",
  "-37975472": "Explosion",
  "539292904": "Explosion",
  "341774354": "Explosion",
  "-1090665087": "Explosion",
  WEAPON_COMPACTLAUNCHER: "Explosion",
  WEAPON_PIPEBOMB: "Explosion",
  "-1600701090": "Gas",
  WEAPON_MOLOTOV: "Burn",
  WEAPON_PETROLCAN: "Burn",
  "-544306709": "Burn",
  "-10959621": "Drown",
  "1936677264": "Drown",
  "133987706": "Car",
  "-1553120962": "Car",
  WEAPON_STUNGUN: "Other",
  GADGET_PARACHUTE: "Other",
  WEAPON_FIREEXTINGUISHER: "Other",
  WEAPON_DIGISCANNER: "Other",
  WEAPON_GUSENBERG: "Other",
  WEAPON_FLAREGUN: "Other",
  WEAPON_FIREWORK: "Other",
  WEAPON_COMBATPDW: "Other"
};
function GetEntityDamageType(handle) {
  for (const [key, val] of Object.entries(DAMAGE_TYPES)) {
    if (HasEntityBeenDamagedByWeapon(handle, key, 0)) {
      return val;
    }
  }
  return `Unknown`;
}
setTick(() => health_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const {ped} = LocalPlayer;
  const {status} = LocalPlayer.state;
  if (!status)
    return;
  const isLegFractured = status["trauma-fracture-rleg"] || status["trauma-fracture-lleg"];
  const isLegDislocated = status["trauma-dislocation-rleg"] || status["trauma-dislocation-lleg"];
  const injured = isLegDislocated || isLegFractured;
  ped.setConfigFlag(PedConfigFlag.IsInjured, injured);
  if (ped.isSprinting && isLegFractured) {
    SetPedToRagdoll(ped.handle, 1e3, 1e3, 0, false, false, false);
  }
}));
function damageKnifeTick(limb, damage) {
  showNotification(`\u041F\u043E\u0440\u0435\u0437 ${limb} ${damage}`);
}
function damageFireTick(limb, damage) {
  showNotification(`\u041E\u0436\u043E\u0433 ${limb} ${damage}`);
}
function damageAnimalTick(limb, damage) {
  showNotification(`\u0423\u043A\u0443\u0441 ${limb} ${damage}`);
}
function damageMeleeTick(limb, damage) {
  if (damage > 80) {
    if (limb == "head") {
      emitNet("health:trauma", "trauma-concussion", limb, damage);
    }
    showNotification(`\u041F\u0435\u0440\u0435\u043B\u043E\u043C \u043A\u043E\u0441\u0442\u0438`);
    emitNet("health:trauma", "fracture", limb, damage);
  } else if (damage > 60 && limb != "torso") {
    showNotification(`\u0412\u044B\u0432\u0438\u0445 \u043A\u043E\u043D\u0435\u0447\u043D\u043E\u0441\u0442\u0438`);
    emitNet("health:trauma", "dislocation", limb, damage);
  } else if (damage > 10) {
    showNotification(`\u0423\u0448\u0438\u0431`);
    emitNet("health:trauma", "bruises", limb, damage);
  }
}
function damageShotTick(limb, weapon, damage) {
  showNotification(`\u0420\u0430\u043D\u0435\u043D\u0438\u0435 (${weapon}) ${damage}`);
}
setTick(() => health_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  const {health} = ped;
  let damage = lastHealth - health;
  damage -= Random.randint(0, 20);
  damage = clamp(damage, 0, 100);
  const velocity = ped.velocity.length;
  const velocityDrop = clamp(lastVelocity - velocity, 0, 1e3);
  if (lastVelocity - velocity > 10) {
    Log.info(`Velocity drop ${velocityDrop}, airTime: ${airTime}, score: ${airTime * velocityDrop}`);
  }
  if (ped.collisionDisabled || LocalPlayer.coords.z < -10) {
    airTime = 0;
  }
  if (ped.isInAir) {
    airTime += GetFrameTime();
  } else {
    const score = airTime * airTime * velocity;
    if (score > 1)
      Log.info(`Padenie score ${airTime * velocity}, air time ${airTime}, velocity ${velocity}`);
    if (score > 10) {
      const limb = Random.choice(["lleg", "rleg"]);
      if (score > 30) {
        showNotification(`\u041F\u0435\u0440\u0435\u043B\u043E\u043C \u043E\u0442 \u043F\u0430\u0434\u0435\u043D\u0438\u044F`);
        emitNet("health:trauma", "fracture", limb, score * 3.3);
      } else if (score > 18) {
        showNotification(`\u0412\u044B\u0432\u0438\u0445 \u043E\u0442 \u043F\u0430\u0434\u0435\u043D\u0438\u044F`);
        emitNet("health:trauma", "dislocation", limb, score * 3.3);
      } else {
        showNotification(`\u0423\u0448\u0438\u0431 \u043E\u0442 \u043F\u0430\u0434\u0435\u043D\u0438\u044F`);
        emitNet("health:trauma", "bruises", limb, score * 3.3);
      }
      airTime = 0;
    }
    airTime = 0;
  }
  const [haveDamage, bone] = GetPedLastDamageBone(ped.handle);
  if (damage > 0) {
    const damageType = GetEntityDamageType(ped.handle);
    Log.info(`Bone damaged. Bone: ${bone}, damage: ${damage}, type: ${damageType}, air time: ${airTime}`);
    const boneName = PedBones[bone] || "torso";
    const limb = PedBoneZones[boneName] || boneName;
    switch (damageType) {
      case "Melee":
        damageMeleeTick(limb, damage);
        break;
      case "Knife":
        damageKnifeTick(limb, damage);
        break;
      case "Animal":
        damageAnimalTick(limb, damage);
        break;
      case "Explosion":
      case "Burn":
        damageFireTick(limb, damage);
        break;
      case "Pistol":
      case "Shotgun":
      case "SMG":
      case "Sniper":
      case "Rifle":
        damageShotTick(limb, damageType.toLowerCase(), damage);
        break;
      default:
    }
    ClearEntityLastDamageEntity(ped.handle);
    ClearEntityLastWeaponDamage(ped.handle);
    ClearPedLastDamageBone(ped.handle);
  }
  lastHealth = health;
  lastVelocity = velocity;
}));

;// CONCATENATED MODULE: ./client/slashtires/utils.ts


function GetClosestVehicleTire(vehicle) {
  const tireBones = [
    "wheel_lf",
    "wheel_rf",
    "wheel_lm1",
    "wheel_rm1",
    "wheel_lm2",
    "wheel_rm2",
    "wheel_lm3",
    "wheel_rm3",
    "wheel_lr",
    "wheel_rr"
  ];
  const tireIndex = {
    wheel_lf: 0,
    wheel_rf: 1,
    wheel_lm1: 2,
    wheel_rm1: 3,
    wheel_lm2: 45,
    wheel_rm2: 47,
    wheel_lm3: 46,
    wheel_rm3: 48,
    wheel_lr: 4,
    wheel_rr: 5
  };
  const {coords} = LocalPlayer.ped;
  const minDistance = 1;
  let closestTire = null;
  tireBones.forEach((tireBone) => {
    const bonePos = GetWorldPositionOfEntityBone(vehicle.handle, GetEntityBoneIndexByName(vehicle.handle, tireBone));
    const distance = coords.distanceTo(Vector3.FromArray(bonePos));
    if (closestTire == null) {
      if (distance <= minDistance) {
        closestTire = {
          bone: tireBone,
          boneDist: distance,
          bonePos,
          tireIndex: tireIndex[tireBone]
        };
      }
    } else if (distance < closestTire.boneDist) {
      closestTire = {
        bone: tireBone,
        boneDist: distance,
        bonePos,
        tireIndex: tireIndex[tireBone]
      };
    }
  });
  return closestTire;
}
const utils_allowedWeapons = [
  "WEAPON_KNIFE",
  "WEAPON_BOTTLE",
  "WEAPON_DAGGER",
  "WEAPON_HATCHET",
  "WEAPON_MACHETE",
  "WEAPON_SWITCHBLADE"
].map((s) => GetHashKey(s));
function CanUseWeapon() {
  return utils_allowedWeapons.includes(LocalPlayer.ped.weapon.selected);
}

;// CONCATENATED MODULE: ./client/slashtires/tireChange.ts
var tireChange_async = (__this, __arguments, generator) => {
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






let tireChangeActive = false;
let tireChangeProp;
function tireChangeStop(ped) {
  return tireChange_async(this, null, function* () {
    if (tireChangeProp != null) {
      if (ped.tasks.isPlayingAnim("anim@heists@box_carry@", "idle")) {
        ped.tasks.stopAnimTask("anim@heists@box_carry@", "idle");
      }
      tireChangeProp.remove();
      tireChangeProp = null;
    }
    tireChangeActive = false;
  });
}
function tireChangeWork(ped, vehicle) {
  return tireChange_async(this, null, function* () {
    if (tireChangeProp == null) {
      const propName = "prop_wheel_tyre";
      const {coords} = ped;
      const prop = yield Prop.Spawn(propName, coords, 0, true, true, true);
      const boneIndex = ped.getBoneIndex(57005);
      prop.attachToEntity(ped, boneIndex, new Vector3(-0.05, 0.1, -0.32), new Vector3(150, 95, 190), true, false, true, 1, true);
      tireChangeProp = prop;
    }
    if (!ped.tasks.isPlayingAnim("anim@heists@box_carry@", "idle")) {
      ped.tasks.playAnim({
        animDictionary: "anim@heists@box_carry@",
        animationName: "idle",
        blendOutSpeed: 8,
        flags: AnimationFlags.UPPERBODY | AnimationFlags.STOP_LAST_FRAME | AnimationFlags.ENABLE_PLAYER_CONTROL
      });
    }
    const closestTire = GetClosestVehicleTire(vehicle);
    if (closestTire != null) {
      const repDict = "amb@medic@standing@tendtodead@idle_a";
      const repAnim = "idle_b";
      if (IsVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false)) {
        drawText3D(Vector3.FromArray(closestTire.bonePos), "~g~[E] \u0417\u0430\u043C\u0435\u043D\u0438\u0442\u044C \u043A\u043E\u043B\u0435\u0441\u043E");
        if (IsControlJustPressed(1, 38)) {
          tireChangeProp.remove();
          tireChangeProp = null;
          if (ped.tasks.isPlayingAnim("anim@heists@box_carry@", "idle")) {
            ped.tasks.stopAnimTask("anim@heists@box_carry@", "idle");
          }
          yield loadAnimDict(repDict);
          const animDuration = GetAnimDuration(repDict, repAnim);
          yield ped.tasks.playAnim({
            animDictionary: repDict,
            animationName: repAnim,
            duration: animDuration,
            flags: 15,
            wait: animDuration / 2 * 1e3
          });
          TriggerServerEvent("slashtires:repair", vehicle.coords.toArray(), vehicle.model, closestTire.tireIndex);
          tireChangeActive = false;
          yield Utils_Delay(animDuration / 2 * 1e3);
          yield ped.tasks.playAnim({
            animDictionary: "amb@medic@standing@tendtodead@exit",
            animationName: "exit",
            flags: 15,
            wait: 2e3
          });
          ped.tasks.clear();
        }
      }
    }
    if (Control.JustPressed(Keys.BACKSPACE) || Control.JustPressed(Keys.X)) {
      tireChangeActive = false;
      if (ped.tasks.isPlayingAnim("anim@heists@box_carry@", "idle")) {
        ped.tasks.stopAnimTask("anim@heists@box_carry@", "idle");
      }
      if (tireChangeProp != null) {
        tireChangeProp.remove();
      }
    }
  });
}
function tireChangeTick(ped, vehicle) {
  return tireChange_async(this, null, function* () {
    if (tireChangeActive) {
      yield tireChangeWork(ped, vehicle);
    } else if (tireChangeProp != null) {
      tireChangeStop(ped);
    }
    return tireChangeActive;
  });
}
onNet("slashtires:activateTire", function() {
  tireChangeActive = !tireChangeActive;
});

;// CONCATENATED MODULE: ./client/slashtires/tireSlash.ts
var tireSlash_async = (__this, __arguments, generator) => {
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





function GetDriverOfVehicle(vehicle) {
  const ped = vehicle.getPedInVehicleSeat(VehicleSeat.DRIVER);
  if (!ped.exist)
    return null;
  for (const player of Players.All()) {
    if (player.ped.handle == ped.handle) {
      return player;
    }
  }
  return null;
}
onNet("slashtires:slash", function(pos, model, tireIndex) {
  const vehicle = GetClosestVehicle(pos.x, pos.y, pos.z, 1, model, 71);
  if (vehicle > 0) {
    SetVehicleTyreBurst(vehicle, tireIndex, false, 100);
  }
});
onNet("slashtires:repair", function(pos, model, tireIndex) {
  const vehicle = GetClosestVehicle(pos.x, pos.y, pos.z, 1, model, 71);
  if (vehicle > 0) {
    SetVehicleTyreFixed(vehicle, tireIndex);
  }
});
onNet("slashtires:SlashClientTire", function(tireIndex) {
  TriggerEvent("chatMessage", "^1A \u0432\u0430\u043C \u043F\u0440\u043E\u043A\u0430\u043B\u044B\u0432\u0430\u044E\u0442 \u043A\u043E\u043B\u0435\u0441\u043E");
  const player = PlayerId();
  const ped = GetPlayerPed(player);
  const vehicle = GetVehiclePedIsIn(ped, false);
  SetVehicleTyreBurst(vehicle, tireIndex, false, 100);
});
function tireSlashTick(ped, vehicle) {
  return tireSlash_async(this, null, function* () {
    const animDict = "melee@knife@streamed_core_fps";
    const animName = "ground_attack_on_spot";
    const closestTire = GetClosestVehicleTire(vehicle);
    if (closestTire != null) {
      if (IsVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false) == false) {
        drawText3D(Vector3.FromArray(closestTire.bonePos), "~r~[E] \u041F\u0440\u043E\u0442\u043A\u043D\u0443\u0442\u044C \u043A\u043E\u043B\u0435\u0441\u043E");
        if (IsControlJustPressed(1, 38)) {
          yield loadAnimDict(animDict);
          const animDuration = GetAnimDuration(animDict, animName);
          TaskPlayAnim(ped.handle, animDict, animName, 8, -8, animDuration, 15, 1, false, false, false);
          yield Utils_Delay(animDuration / 2 * 1e3);
          const driverOfVehicle = GetDriverOfVehicle(vehicle);
          const driverServer = driverOfVehicle ? driverOfVehicle.serverId : 0;
          if (driverServer == 0) {
            SetVehicleTyreBurst(vehicle.handle, closestTire.tireIndex, false, 100);
          } else {
            TriggerServerEvent("slashtires:TargetClient", driverServer, closestTire.tireIndex);
          }
          TriggerServerEvent("slashtires:slash", vehicle.coords.toArray(), vehicle.model, closestTire.tireIndex);
          yield Utils_Delay(animDuration / 2 * 1e3);
          ped.tasks.clear(true);
        }
      }
    }
  });
}

;// CONCATENATED MODULE: ./client/slashtires/index.ts
var slashtires_async = (__this, __arguments, generator) => {
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




setTick(() => slashtires_async(undefined, null, function* () {
  const {ped} = LocalPlayer;
  const [vehicle, dist] = Vehicles.getClosest(LocalPlayer.coords);
  const isTireChangeActive = yield tireChangeTick(ped, vehicle);
  if (!isTireChangeActive && vehicle.exist && CanUseWeapon()) {
    yield tireSlashTick(ped, vehicle);
  }
}));

;// CONCATENATED MODULE: ./config/jobs-oil.js
const jobs_oil_Config = {};
jobs_oil_Config.Locale = 'ru';

jobs_oil_Config.OilStoreCapacity = 3000; // м^3
jobs_oil_Config.TankerCapacity = 30.0; // м^3


jobs_oil_Config.Zones = [
    {
        type: 'extract',
        coords: { x: 578.44, y: 2914.3, z: 40.26 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'store',
        coords: { x: 1717.27, y: -1653.59, z: 112.52 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'gas-store',
        description: 'Бензохранилище',
        coords: { x: 1732.66, y: -1572.62, z: 112.69 },
        store: { max: 3000.0, current: 1000.0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 1,
        description: 'Заправка на Цирк Линдсей',
        coords: { x: -719.88, y: -934.87, z: 19.02 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 2,
        description: 'Заправка на Грейпсид-Мэйн-стрит',
        coords: { x: 1688.44, y: 4933.9, z: 42.05 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 3,
        description: 'Заправка на Бэнхэм-Каньон-драйв',
        coords: { x: -1800.63, y: 804.22, z: 138.60 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 4,
        description: 'Заправка на Гроув-стрит',
        coords: { x: -70.41, y: -1760.26, z: 29.1 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ltd',
        index: 5,
        description: 'Заправка на Бульвар Миррор-Парк',
        coords: { x: 1180.33, y: -329.71, z: 69.3 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 1,
        description: 'Заправка на Бульвар Палето',
        coords: { x: 179.82, y: 6602.9, z: 31.8 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 2,
        description: 'Заправка на Юго-западе Шоссе 68',
        coords: { x: -2555.03, y: 2334.46, z: 33.05 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 3,
        description: 'Заправка на Саут-Рокфорд-драйв',
        coords: { x: -1436.24, y: -277.42, z: 46.20 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 4,
        description: 'Заправка на Попьюлар-стрит',
        coords: { x: 819.69, y: -1028.65, z: 26.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 5,
        description: 'Заправка на Бульвар Капитал',
        coords: { x: 1208.27, y: -1401.55, z: 35.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 6,
        description: 'Заправка на Шоссе Паломино',
        coords: { x: 2580.67, y: 361.95, z: 108.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'ron',
        index: 7,
        description: 'Заправка на Шоссе Паломино',
        coords: { x: 175.61, y: -1561.38, z: 29.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 1,
        description: 'Заправка на Альта-стрит',
        coords: { x: -322.34, y: -1473.43, z: 30.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 2,
        description: 'Заправка на Севере Шоссе 68',
        coords: { x: 260.05, y: 2599.16, z: 44.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 3,
        description: 'Заправка на Юге Шоссе 68',
        coords: { x: 1039.61, y: 2671.37, z: 39.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 4,
        description: 'Заправка на Северо-востоке Шоссе 68',
        coords: { x: 1204.24, y: 2658.37, z: 37.8 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 5,
        description: 'Заправка на Севере Сенора-вэй',
        coords: { x: 2540.78, y: 2593.83, z: 37.9 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 6,
        description: 'Заправка на Юге Шосса Сенора',
        coords: { x: 1702.86, y: 6420.71, z: 32.5 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 7,
        description: 'Заправка на Панорама-драйв',
        coords: { x: 1779.49, y: 3328.0, z: 41.2 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'globe',
        index: 8,
        description: 'Заправка на Клинтон-авеню',
        coords: { x: 625.34, y: 269.78, z: 103.14 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 1,
        description: 'Заправка на Капитал-бульваре',
        coords: { x: 268.87, y: -1261.56, z: 28.62 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 2,
        description: 'Заправка на Шоссе 68',
        coords: { x: 51.81, y: 2784.64, z: 57.80 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 3,
        description: 'Заправка на Шоссе Сенора',
        coords: { x: 2685.58, y: 3263.38, z: 55.29 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 4,
        description: 'Заправка на Марина-драйв',
        coords: { x: 2003.15, y: 3778.22, z: 32.15 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 5,
        description: 'Заправка на Cевере Бульвара Палето',
        coords: { x: -93.23, y: 6418.34, z: 31.4 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 6,
        description: 'Заправка на Западном Шоссе Дель-Перро',
        coords: { x: -2096.6, y: -318.15, z: 13.15 },
        store: { max: 50.0, current: 0 }
    },
    {
        type: 'gas-station',
        brand: 'xero',
        index: 7,
        description: 'Заправка на Кале-авеню',
        coords: { x: -524.79, y: -1210.6, z: 18.14 },
        store: { max: 50.0, current: 0 }
    },
];

/* harmony default export */ const jobs_oil = (jobs_oil_Config);
;// CONCATENATED MODULE: ./client/jobs-oil/markers.ts



class jobs_oil_markers_Markers {
  constructor(onPress) {
    this.onPress = (zone) => {
    };
    this.markers = [];
    this.sprites = [];
    this.onPress = onPress;
    jobs_oil.Zones.forEach((zone, index) => {
      zone.id = index;
      const sprite = jobs_oil_markers_Markers.createSprite(zone);
      this.sprites.push(sprite);
      const marker = jobs_oil_markers_Markers.createMarker(zone, () => {
        this.onPress(zone);
      }, () => {
        sprite.textureName = "gasstation_e";
        this.insideZone = zone;
      }, () => {
        sprite.textureName = "gasstation";
        this.insideZone = null;
      });
      this.markers.push(marker);
    });
  }
  static createSprite(zone) {
    const sprite = new Sprite_Sprite({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      scale: new Vector2(0.1, 0.1),
      textureDict: "spritedict",
      textureName: "gasstation",
      alpha: 255,
      color: [255, 255, 255]
    });
    return sprite;
  }
  static createMarker(zone, onPress, onEnter, onExit) {
    const marker = new Marker({
      coords: new Vector3(zone.coords.x, zone.coords.y, zone.coords.z),
      markerType: -1,
      scale: new Vector3(2, 2, 1),
      notificationText: `\u041D\u0430\u0436\u043C\u0438\u0442\u0435 ~INPUT_PICKUP~ \u0434\u043B\u044F \u0434\u043E\u0441\u0442\u0443\u043F\u0430`,
      onPress,
      onEnter,
      onExit
    });
    return marker;
  }
  draw() {
    this.markers.forEach((marker) => {
      marker.draw();
    });
    this.sprites.forEach((sprite) => {
      sprite.draw();
    });
  }
}
/* harmony default export */ const jobs_oil_markers = (jobs_oil_markers_Markers);

;// CONCATENATED MODULE: ./client/jobs-oil/index.ts
var jobs_oil_async = (__this, __arguments, generator) => {
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





function onMarkerPress(zone) {
  return jobs_oil_async(this, null, function* () {
    if (zone.type == "gas-station") {
      emit("nova-ui:showGasStation", zone);
    } else {
      const serverZone = yield ServerCallback.Trigger("jobs-oil:getZone", zone.id);
      if (serverZone) {
        showNotification(`\u0425\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0435 ${serverZone.store.current}/${serverZone.store.max}`);
      }
    }
  });
}
const client_jobs_oil_markers = new jobs_oil_markers(onMarkerPress);
const tankerHash = GetHashKey("tanker");
setTick(() => jobs_oil_async(undefined, null, function* () {
  client_jobs_oil_markers.draw();
}));
setTick(() => jobs_oil_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const veh = LocalPlayer.ped.vehicle;
  if (!veh.exist)
    return;
  const [isTrailed, trailedHandle] = GetVehicleTrailerVehicle(veh.handle);
  if (!isTrailed)
    return;
  const tanker = new Vehicle(trailedHandle);
  if (tanker.model != GetHashKey("tanker"))
    return;
  const {liquid} = tanker.state;
  if (liquid && liquid.amount > 0) {
    SetVehicleUnkDamageMultiplier(tanker.handle, 1);
    SetVehicleCanLeakPetrol(tanker.handle, true);
    SetVehicleCanLeakOil(tanker.handle, true);
  } else {
    SetVehicleUnkDamageMultiplier(tanker.handle, 0.1);
    SetVehicleCanLeakPetrol(tanker.handle, false);
    SetVehicleCanLeakOil(tanker.handle, false);
  }
  if (client_jobs_oil_markers.insideZone) {
    if (veh.exist && tanker.exist) {
      const netid = tanker.networkId;
      if (NetworkDoesNetworkIdExist(netid)) {
        emitNet("jobs-oil:insideMarker", netid, client_jobs_oil_markers.insideZone.id);
      }
    }
  }
}));

;// CONCATENATED MODULE: ./client/skills/index.ts
var skills_async = (__this, __arguments, generator) => {
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


setTick(() => skills_async(undefined, null, function* () {
  yield Utils_Delay(100);
  const {handle} = LocalPlayer;
  const hungerHigh = LocalPlayer.status["hunger-high"] > 1;
  const hungerLow = LocalPlayer.status["hunger-Low"] > 1;
  const overeating = LocalPlayer.status.overeating > 1;
  let endurance = LocalPlayer.status.endurance * 0.01;
  let agility = LocalPlayer.status.agility * 0.01;
  const strength = LocalPlayer.status.strength * 0.01;
  if (hungerLow) {
    endurance *= 0.5;
  }
  if (hungerHigh || overeating) {
    endurance *= 0.5;
    agility *= 0.5;
  }
  RestorePlayerStamina(handle, 7e-3 * endurance);
  SetPlayerMeleeWeaponDefenseModifier(handle, 1 - endurance * 0.2 - strength * 0.2);
  const agilityBonus = 0.4 * agility;
  SetRunSprintMultiplierForPlayer(handle, 1 + agilityBonus);
  SetSwimMultiplierForPlayer(handle, 1 + agilityBonus);
  const strengthBonus = 10;
}));
setTick(() => skills_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  if (LocalPlayer.status["hunger-high"] > 99 || LocalPlayer.status.thirst > 99) {
    LocalPlayer.ped.health -= 1;
  }
}));

;// CONCATENATED MODULE: ./config/effects.js
const effects_Config = {};

effects_Config.RandomVehicleInteraction = [
    { interaction: 27, time: 1500 },
    { interaction: 6, time: 1000 },
    { interaction: 7, time: 800 },
    { interaction: 8, time: 800 },
    { interaction: 10, time: 800 },
    { interaction: 11, time: 800 },
    { interaction: 23, time: 2000 },
    { interaction: 31, time: 2000 }
];

/* harmony default export */ const effects = (effects_Config);
;// CONCATENATED MODULE: ./client/effects/alcohol.ts
var alcohol_async = (__this, __arguments, generator) => {
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




let currentDrunkLevel = 0;
function updateDrunk(level) {
  return alcohol_async(this, null, function* () {
    const start = currentDrunkLevel == 0;
    const {ped} = LocalPlayer;
    if (start) {
      SetTransitionTimecycleModifier("DRUNK", 3.5);
    } else {
      SetTransitionTimecycleModifier("DRUNK", 0.35);
    }
    let anim = null;
    if (level > 8) {
      anim = "move_m@drunk@verydrunk";
    } else if (level > 6) {
      anim = "move_m@drunk@moderatedrunk";
    } else if (level > 4) {
      anim = "move_m@drunk@slightlydrunk";
    }
    if (anim) {
      yield loadAnimSet(anim);
      SetPedMovementClipset(ped.handle, anim, 1);
    } else {
      ResetPedMovementClipset(ped.handle, 0);
    }
    SetPedIsDrunk(ped.handle, true);
    SetTimecycleModifierStrength(level / 15);
    SetPedMotionBlur(ped.handle, true);
  });
}
function backToReality() {
  return alcohol_async(this, null, function* () {
    const playerPed = LocalPlayer.ped.handle;
    yield Utils_Delay(1e3);
    SetTransitionTimecycleModifier("default", 3.5);
    ResetScenarioTypesEnabled();
    ResetPedMovementClipset(playerPed, 0);
    SetPedIsDrunk(playerPed, false);
    SetPedMotionBlur(playerPed, false);
    yield Utils_Delay(3500);
  });
}
function drunkInCar() {
  const {ped} = LocalPlayer;
  const {vehicle} = ped;
  const driver = vehicle.getPedInVehicleSeat(VehicleSeat.DRIVER);
  if (driver.exist && driver.handle == ped.handle && currentDrunkLevel > 6) {
    const vehClass = vehicle.vehicleClass;
    const {speed} = vehicle;
    if (speed != 0 && vehClass != 15 && vehClass != 16 && vehClass != 21 && vehClass != 13) {
      if (Random.randint(0, 4) < currentDrunkLevel - 6) {
        const drunkMov = Random.choice(effects.RandomVehicleInteraction);
        TaskVehicleTempAction(ped.handle, vehicle.handle, drunkMov.interaction, drunkMov.time);
      }
    }
  }
}
setTick(() => alcohol_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const {alcohol} = LocalPlayer.status;
  if (alcohol > 0) {
    const level = Math.floor(alcohol / 10);
    drunkInCar();
    if (level != currentDrunkLevel) {
      updateDrunk(level);
      currentDrunkLevel = level;
    }
  } else {
    backToReality();
    currentDrunkLevel = 0;
  }
}));

;// CONCATENATED MODULE: ./client/effects/smoking.ts
var smoking_async = (__this, __arguments, generator) => {
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


onNet("inventory:smoke", (val) => smoking_async(undefined, null, function* () {
  emit("dpemotes:emote", "smoke2");
  yield Utils_Delay(1e3);
  const {ped} = LocalPlayer;
  for (let i = 0; i < 30; i += 1) {
    if (ped.tasks.isPlayingAnim("amb@world_human_aa_smoke@male@idle_a", "idle_c")) {
      TriggerServerEvent("engine:effects:smokeTick", val / 30);
      yield Utils_Delay(1e3);
    } else {
      break;
    }
  }
  ped.tasks.clear();
}));
setTick(() => smoking_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const {smoking} = LocalPlayer.status;
  const smokingAddiction = LocalPlayer.status["smoking-addiction"];
}));

;// CONCATENATED MODULE: ./client/effects/index.ts
var effects_async = (__this, __arguments, generator) => {
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




let currentEffect = null;
function setEffect(effect, strength) {
  currentEffect = effect;
  SetTimecycleModifier(effect);
  SetTimecycleModifierStrength(strength);
}
function updateEffects(s) {
  if (s.alcohol == 0 && s["alcohol-addiction"] > 10) {
    setEffect("nightvision", (s["alcohol-addiction"] - 10) / 90 * 3);
  } else if (s.smoking == 0 && s["smoking-addiction"] > 10) {
    setEffect("fp_vig_black", (s["smoking-addiction"] - 10) / 90);
  } else if (s.drugs == 0 && s["drugs-addiction"] > 10) {
    setEffect("hud_def_flash", Math.sqrt((s["drugs-addiction"] - 10) / 90));
  } else if (currentEffect) {
    ClearTimecycleModifier();
    currentEffect = null;
  }
}
setTick(() => effects_async(undefined, null, function* () {
  yield Utils_Delay(1e3);
  const {status} = LocalPlayer;
  updateEffects(status);
}));

;// CONCATENATED MODULE: ./client/index.ts





























/******/ })()
;