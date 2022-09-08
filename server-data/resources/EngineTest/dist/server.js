/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 956:
/***/ (() => {

const doorInfo = {};
onNet("doorlock:updateState", (doorID, state) => {
  doorInfo[doorID] = !!state;
  emitNet("doorlock:setState", -1, {[doorID]: state});
});
onNet("doorlock:getDoorInfo", () => {
  emitNet("doorlock:setState", source, doorInfo);
});


/***/ }),

/***/ 42:
/***/ (() => {

onNet("headtrack:update", function(x, y, z) {
  TriggerClientEvent("headtrack:update", -1, source, x, y, z);
});


/***/ }),

/***/ 975:
/***/ (function(__unused_webpack_module, exports) {

(function(window) {
    var re = {
        not_string: /[^s]/,
        number: /[diefg]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijosuxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf() {
        var key = arguments[0], cache = sprintf.cache
        if (!(cache[key] && cache.hasOwnProperty(key))) {
            cache[key] = sprintf.parse(key)
        }
        return sprintf.format.call(null, cache[key], arguments)
    }

    sprintf.format = function(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, node_type = "", arg, output = [], i, k, match, pad, pad_character, pad_length, is_positive = true, sign = ""
        for (i = 0; i < tree_length; i++) {
            node_type = get_type(parse_tree[i])
            if (node_type === "string") {
                output[output.length] = parse_tree[i]
            }
            else if (node_type === "array") {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf("[sprintf] property '%s' does not exist", match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (get_type(arg) == "function") {
                    arg = arg()
                }

                if (re.not_string.test(match[8]) && re.not_json.test(match[8]) && (get_type(arg) != "number" && isNaN(arg))) {
                    throw new TypeError(sprintf("[sprintf] expecting number but found %s", get_type(arg)))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case "b":
                        arg = arg.toString(2)
                    break
                    case "c":
                        arg = String.fromCharCode(arg)
                    break
                    case "d":
                    case "i":
                        arg = parseInt(arg, 10)
                    break
                    case "j":
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                    break
                    case "e":
                        arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential()
                    break
                    case "f":
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                    break
                    case "g":
                        arg = match[7] ? parseFloat(arg).toPrecision(match[7]) : parseFloat(arg)
                    break
                    case "o":
                        arg = arg.toString(8)
                    break
                    case "s":
                        arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg)
                    break
                    case "u":
                        arg = arg >>> 0
                    break
                    case "x":
                        arg = arg.toString(16)
                    break
                    case "X":
                        arg = arg.toString(16).toUpperCase()
                    break
                }
                if (re.json.test(match[8])) {
                    output[output.length] = arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? "+" : "-"
                        arg = arg.toString().replace(re.sign, "")
                    }
                    else {
                        sign = ""
                    }
                    pad_character = match[4] ? match[4] === "0" ? "0" : match[4].charAt(1) : " "
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? str_repeat(pad_character, pad_length) : "") : ""
                    output[output.length] = match[5] ? sign + arg + pad : (pad_character === "0" ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output.join("")
    }

    sprintf.cache = {}

    sprintf.parse = function(fmt) {
        var _fmt = fmt, match = [], parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = match[0]
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree[parse_tree.length] = "%"
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list[field_list.length] = field_match[1]
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== "") {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list[field_list.length] = field_match[1]
                            }
                            else {
                                throw new SyntaxError("[sprintf] failed to parse named argument key")
                            }
                        }
                    }
                    else {
                        throw new SyntaxError("[sprintf] failed to parse named argument key")
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error("[sprintf] mixing positional and named placeholders is not (yet) supported")
                }
                parse_tree[parse_tree.length] = match
            }
            else {
                throw new SyntaxError("[sprintf] unexpected placeholder")
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return parse_tree
    }

    var vsprintf = function(fmt, argv, _argv) {
        _argv = (argv || []).slice(0)
        _argv.splice(0, 0, fmt)
        return sprintf.apply(null, _argv)
    }

    /**
     * helpers
     */
    function get_type(variable) {
        return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase()
    }

    function str_repeat(input, multiplier) {
        return Array(multiplier + 1).join(input)
    }

    /**
     * export to either browser or node.js
     */
    if (true) {
        exports.sprintf = sprintf
        exports.vsprintf = vsprintf
    }
    else {}
})(typeof window === "undefined" ? this : window);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/Entity.js
class Entity {
    constructor(handle) {
        this.handle = handle;
        this.state = __webpack_require__.g.Entity(this.handle).state;
    }
    get exist() {
        return !!DoesEntityExist(this.handle);
    }
    static get None() {
        return new Entity(0);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/Static.js
class Static {
    constructor() {
        throw new Error('Static class instancing!');
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Core/ClientCallback.js

class ClientCallback extends Static {
    static async Trigger(player, name, ...args) {
        let promiseResolve;
        const promise = new Promise(resolve => {
            promiseResolve = resolve;
        });
        emit(`engine:triggerClientCallback`, player.handle, promiseResolve, name, ...args);
        return promise;
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
function Delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}
async function WaitFor(func, pollDelay = 100, timeout = undefined) {
    let res = undefined;
    let timeSpent = 0;
    do {
        res = await func();
    } while (res === undefined);
    {
        await Delay(pollDelay);
        timeSpent += pollDelay;
        if (timeSpent >= timeout)
            throw new TimeoutError();
    }
    return res;
}
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/DB/index.js

class DBError extends Error {
    constructor(status, reason) {
        super(`DB query error: ${status}! ${reason}`);
        this.status = status;
        this.reason = reason;
    }
}
class DB extends Static {
    static Query(command, args) {
        return new Promise((resolve, reject) => {
            emit('db:post', command, JSON.stringify(args), (status, response) => {
                if (status == 200 || status == 204) {
                    resolve(JSON.parse(response));
                }
                else {
                    reject(new DBError(status, response));
                }
            });
        });
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



;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/Player.js





const getPlayerIdentifiers = (handle) => {
    const ret = [];
    for (let i = 0; i < GetNumPlayerIdentifiers(handle); i += 1) {
        ret.push(GetPlayerIdentifier(handle, i));
    }
    return Object.fromEntries(ret.map((id) => id.split(':')).filter((v) => v.length == 2));
};
async function getUniqueIdentifier(identifiers) {
    const license = identifiers['license'] || 'aaa';
    if (license) {
        const rows = await DB.Query('users/getbylicense', { license });
        if (rows && rows.length > 0) {
            const user = rows[0];
            if (!user.identifier)
                throw new Error(`Player with license ${license} has no identifier!`);
            return user.identifier;
        }
    }
    throw new Error(`Player unique identifier not found! Available identifiers: ${Object.entries(identifiers)}`);
}
class Player_Player {
    constructor(handle, understandTheConsequences) {
        this.onDrop = new SubscribeTarget();
        if (!understandTheConsequences)
            throw new Error('Attempt to instance class Player!');
        this.handle = +handle;
        assert(this.handle);
        this.identifiers = getPlayerIdentifiers(handle);
        assert(Object.keys(this.identifiers).length);
    }
    async init() {
        this.identifier = await getUniqueIdentifier(this.identifiers);
        assert(this.identifier);
        this.name = GetPlayerName(String(this.handle));
        this.state = __webpack_require__.g.Player(this.handle).state;
        assert(this.state);
    }
    /**
     * Координаты игрока в мире
     */
    get coords() {
        const c = this.state.coords;
        if (!c)
            return null;
        return new Vector3(c[0], c[1], c[2]);
    }
    get identity() {
        return this.state['identity'];
    }
    set identity(value) {
        emit('engine:setPlayerIdentity', value);
    }
    set coords(value) {
        promiseTimeout(ClientCallback.Trigger(this, 'engine:teleport', value));
    }
    get health() {
        const ped = GetPlayerPed(`${this.handle}`);
        const health = GetEntityHealth(ped);
        if (health < 100)
            return 0;
        return health - 100;
    }
    set health(health) {
        promiseTimeout(ClientCallback.Trigger(this, 'engine:setHealth', health));
    }
    revive() {
        promiseTimeout(ClientCallback.Trigger(this, 'engine:revive'));
    }
    teleportXY(x, y, heading) {
        promiseTimeout(ClientCallback.Trigger(this, 'engine:teleportXY', x, y, heading));
    }
    /* Extension: licenses */
    get licenses() {
        return this.state['licenses'] || {};
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/PlayerMoney.js

class PlayerMoney {
    constructor(player) {
        this.resName = GetCurrentResourceName();
        this.onSet = new SubscribeTarget();
        this.onAdd = new SubscribeTarget();
        this.onSub = new SubscribeTarget();
        this.player = player;
    }
    async get(account) {
        return new Promise(resolve => {
            emit('engine:getPlayerMoney', this.player.handle, account, amount => {
                resolve(amount);
            });
        });
    }
    async set(account, amount, description = this.resName) {
        return new Promise(resolve => {
            emit('engine:setPlayerMoney', this.player.handle, account, amount, description, () => {
                resolve();
            });
        });
    }
    async add(account, amount, description = this.resName) {
        return new Promise(resolve => {
            emit('engine:addPlayerMoney', this.player.handle, account, amount, description, () => {
                resolve();
            });
        });
    }
    async sub(account, amount, description = this.resName) {
        return new Promise(resolve => {
            emit('engine:subPlayerMoney', this.player.handle, account, amount, description, () => {
                resolve();
            });
        });
    }
    async pay(accounts, amount, description = this.resName, tax) {
        return new Promise((resolve, reject) => {
            emit('engine:payPlayerMoney', this.player.handle, accounts, amount, description, tax, (success) => {
                if (success)
                    resolve();
                else
                    reject();
            });
        });
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/PlayerRoles.js

class PlayerRoles {
    constructor(player) {
        this.onChange = new SubscribeTarget();
        this.player = player;
    }
    all() {
        return this.player.state['roles'] || {};
    }
    get(role) {
        return this.all()[role];
    }
    has(role) {
        return !!this.get(role);
    }
    set(name, grade) {
        const roles = this.all();
        roles[name] = { grade };
        this.player.state['roles'] = roles;
        this.onChange.emit(name, roles);
    }
    remove(name) {
        const roles = this.all();
        delete roles[name];
        this.player.state['roles'] = roles;
        this.onChange.emit(name, roles);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/PlayerStatus.js

class PlayerStatus {
    constructor(player) {
        this.player = player;
    }
    set(name, value) {
        emit('engine:status:set', this.player.handle, name, value);
    }
    add(name, value) {
        assert(value > 0);
        emit('engine:status:add', this.player.handle, name, value);
    }
    sub(name, value) {
        assert(value > 0);
        emit('engine:status:add', this.player.handle, name, value);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/Players.js







class Players extends Static {
    /**
     * Получить игрока по handle/source
     * @param handle source-идентификатор
     */
    static ByHandle(handle) {
        return Players.PlayersByHandle[handle];
    }
    /**
     * Получить игрока по уникальному идентификатору
     * @param identifier идентификатор
     */
    static ByIdentifier(identifier) {
        return Players.PlayersByIdentifier[identifier];
    }
    /**
     * Получить массив всех игроков
     */
    static All() {
        return Object.values(Players.PlayersByHandle);
    }
}
Players.PlayersByHandle = {};
Players.PlayersByIdentifier = {};
Players.onJoin = new SubscribeTarget();
Players.onDrop = new SubscribeTarget();
async function onPlayerJoin(handle) {
    const player = new Player_Player(handle, true);
    await player.init();
    player.money = new PlayerMoney(player);
    player.roles = new PlayerRoles(player);
    player.status = new PlayerStatus(player);
    Players.PlayersByHandle[player.handle] = player;
    Players.PlayersByIdentifier[player.identifier] = player;
    Players.onJoin.emit(player);
}
function onPlayerDrop(handle, reason) {
    const player = Players.ByHandle(handle);
    assert(player);
    player.onDrop.emit(reason);
    Players.onDrop.emit(player, reason);
    delete Players.PlayersByHandle[player.handle];
    delete Players.PlayersByIdentifier[player.identifier];
}
on('playerDropped', (reason) => {
    onPlayerDrop(String(source), reason);
});
onNet('playerJoining', () => { });
on('playerJoining', () => {
    onPlayerJoin(String(source));
});
on('engine:onPlayerMoneySet', (handle, account, amount) => {
    const player = Players.ByHandle(handle);
    player.money.onSet.emit(account, amount);
    emitNet('engine:onPlayerMoneySet', player.handle, account, amount);
});
on('engine:onPlayerMoneyAdd', (handle, account, amount, newValue) => {
    const player = Players.ByHandle(handle);
    player.money.onAdd.emit(account, amount, newValue);
    emitNet('engine:onPlayerMoneyAdd', player.handle, account, amount, newValue);
});
on('engine:onPlayerMoneySub', (handle, account, amount, newValue) => {
    const player = Players.ByHandle(handle);
    player.money.onSub.emit(account, amount, newValue);
    emitNet('engine:onPlayerMoneySub', player.handle, account, amount, newValue);
});
getPlayers().forEach(handle => {
    onPlayerJoin(handle);
});

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/CulledProp.js


class CulledPropManager extends Static {
    static update(id, propInfo) {
        const prop = CulledPropManager.props[id];
        if (prop) {
            Object.assign(prop, propInfo);
            emitNet('engineCore:CulledProp:update', -1, GetCurrentResourceName(), prop.serialize());
        }
    }
}
CulledPropManager.props = {};
class CulledProp {
    constructor(init) {
        this.heading = 0;
        this.cullDistance = 200;
        this.registered = false;
        this.spawned = false;
        if (init.coords)
            init.coords = Vector3.FromObject(init.coords);
        Object.assign(this, init);
    }
    async register() {
        return new Promise(resolve => {
            emit('engineCore:CulledProp:register', this, id => {
                CulledPropManager.props[id] = this;
                CulledPropManager.update(id, {
                    id,
                    registered: true,
                });
                resolve(id);
            });
        });
    }
    serialize() {
        return {
            id: this.id,
            model: this.model,
            coords: this.coords,
            heading: this.heading,
            cullDistance: this.cullDistance,
            registered: this.registered,
            spawned: this.spawned,
        };
    }
    update() {
        emit('engineCore:CulledProp:update', this.serialize());
    }
    spawn() {
        emit('engineCore:CulledProp:spawn', this.id);
    }
    despawn() {
        this.spawned = false;
        emit('engineCore:CulledProp:despawn', this.id);
    }
    remove() {
        emit('engineCore:CulledProp:remove', this.id);
    }
}
on('engineLib:CulledProp:update', (init) => {
    CulledPropManager.update(init.id, init);
});

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Game/index.js






/* harmony default export */ const Game = ((/* unused pure expression or super */ null && (Player)));

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Core/ESX.js

let ESX = null;
async function ESXInit() {
    while (!ESX) {
        emit('esx:getSharedObject', obj => { ESX = obj; });
        await Delay(100);
    }
    return ESX;
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Core/ServerCallback.js

class ServerCallback extends Static {
    static async Trigger(player, name, ...args) {
        let promiseResolve;
        const promise = new Promise(resolve => {
            promiseResolve = resolve;
        });
        emit(`engine:triggerServerCallback`, player.handle, promiseResolve, name, ...args);
        return promise;
    }
    static Register(name, callback) {
        TriggerEvent('engine:registerServerCallback', name, callback);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Core/index.js




;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Inventory/InventoryItem.js

class InventoryItem {
    constructor(itemInfo, inventory) {
        Object.assign(this, itemInfo);
        this.parent = inventory;
    }
    static Create(name, amount = 1, extra = {}) {
        return new InventoryItem(ESX.Custom.Inventory.Item.Create(name, amount, extra), null);
    }
    remove(amount, silent = false) {
        if (!this.parent)
            throw new Error('Item has no parent Inventory!');
        return this.parent.removeItem({ uid: this.uid }, amount, silent);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Inventory/Inventory.js


class Inventory {
    constructor(category, identifier) {
        this.category = category;
        this.identifier = identifier;
        this.update();
    }
    static Get(category, identifier) {
        return ESX.Custom.Inventory.Get(category, identifier);
    }
    static ByPlayerIdentifier(identifier) {
        return new Inventory('player-inventory', identifier);
    }
    get weight() {
        const inv = Inventory.Get(this.category, this.identifier);
        return ESX.Custom.Inventory.GetWeight(inv);
    }
    get esxData() {
        return Inventory.Get(this.category, this.identifier);
    }
    get exists() {
        return !!this.esxData;
    }
    get items() {
        return Object.fromEntries(Object.entries(this.esxData.items).map(([key, item]) => [key, new InventoryItem(this, item)]));
    }
    async update() {
        await ESXInit();
        return true;
    }
    removeItem(query, amount, silent = false) {
        return ESX.Custom.Inventory.RemoveItem(this.esxData, query, amount, silent);
    }
    removeCash(amount) {
        return ESX.Custom.Inventory.Cash.Remove(this.esxData, amount);
    }
    addItem(item, amount = 1, silent = false, autoStack = false) {
        const res = ESX.Custom.Inventory.AddItem(this.esxData, item, amount, silent, autoStack);
        if (!res)
            return null;
        return new InventoryItem(res, this);
    }
    searchFirst(query) {
        const res = ESX.Custom.Inventory.SearchFirst(this.esxData, query);
        if (!res)
            return null;
        return new InventoryItem(res, this);
    }
    search(query, nested = false) {
        let res;
        if (nested) {
            res = ESX.Custom.Inventory.SearchWithNested(this.esxData, query);
        }
        else {
            res = ESX.Custom.Inventory.Search(this.esxData, query);
        }
        return Object.fromEntries(Object.entries(res).map(([key, val]) => [key, new InventoryItem(val, this)]));
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Inventory/index.js



;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/UI/index.js
function showNotification(player, text) {
    emitNet('ui:showNotification', player.handle, { text });
}

;// CONCATENATED MODULE: ./server/atm/index.ts




onNet("atm:deposit", function(amount) {
  assert(amount);
  const player = Players.ByHandle(source);
  player.money.pay(["cash"], amount, "\u0417\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u0431\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u0441\u0447\u0451\u0442").then(() => {
    player.money.add("bank", amount, "\u0417\u0430\u0447\u0438\u0441\u043B\u0435\u043D\u0438\u0435 \u043D\u0430 \u0431\u0430\u043D\u043A\u043E\u0432\u0441\u043A\u0438\u0439 \u0441\u0447\u0451\u0442");
  }).catch(() => {
    showNotification(player, "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0445!");
  });
  emitNet("nova-ui:updateBank", player.handle);
});
onNet("atm:withdraw", function(amount) {
  assert(amount);
  const player = Players.ByHandle(source);
  player.money.pay(["bank"], amount, "\u0412\u044B\u0434\u0430\u0447\u0430 \u043D\u0430\u043B\u0438\u0447\u043D\u044B\u0445").then(() => {
    const inv = Inventory.ByPlayerIdentifier(player.identifier);
    const item = inv.addItem(InventoryItem.Create("cash"), amount, false, true);
    if (!item) {
      player.money.add("bank", amount, "\u041A\u043E\u043C\u043F\u0435\u043D\u0441\u0430\u0446\u0438\u044F \u043F\u0440\u0438 \u043D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E\u0441\u0442\u0438 \u0432\u044B\u0434\u0430\u0447\u0438");
    }
  }).catch(() => {
    showNotification(player, "\u041D\u0435\u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u0441\u0440\u0435\u0434\u0441\u0442\u0432 \u043D\u0430 \u0441\u0447\u0451\u0442\u0435!");
  });
  emitNet("nova-ui:updateBank", player.handle);
});

;// CONCATENATED MODULE: ./config/forges.js
const Config = {};
Config.Locale = 'ru';

Config.Zones = [
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

/* harmony default export */ const forges = (Config);
;// CONCATENATED MODULE: ./server/forges/index.ts
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


(() => __async(undefined, null, function* () {
  yield ESXInit();
  forges.Zones.forEach((zone) => {
    var _a, _b, _c;
    ESX.Custom.Inventory.Create("craft", zone.identifier, false, {
      title: (_a = zone.title) != null ? _a : "\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440",
      maxWeight: 1e3,
      actionGroup: "container",
      width: (_b = zone.width) != null ? _b : 30,
      height: (_c = zone.height) != null ? _c : 20
    });
  });
}))();

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
;// CONCATENATED MODULE: ./server/itemmarkers/index.ts
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





onNet("itemmarkers:giveitem", (id) => itemmarkers_async(undefined, null, function* () {
  const zone = itemmarkers.Zones[id];
  const player = Players.ByHandle(source);
  assert(zone);
  const ItemInfo = zone.Item;
  if (zone.Cooldown && zone.Cooldown > 0) {
    showNotification(player, `\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0440\u0430\u043D\u043E! \u041E\u0436\u0438\u0434\u0430\u0439\u0442\u0435 ${zone.Cooldown} \u0441\u0435\u043A.`);
    return;
  }
  const inv = Inventory.ByPlayerIdentifier(player.identifier);
  yield inv.update();
  const item = InventoryItem.Create(ItemInfo.name);
  if (item && inv.addItem(item, ItemInfo.amount, true, true)) {
    showNotification(player, "\u041F\u0440\u0435\u0434\u043C\u0435\u0442 \u0434\u043E\u0431\u0430\u0432\u043B\u0435\u043D");
    zone.Cooldown = zone.Interval;
  } else {
    showNotification(player, `\u041D\u0435\u0432\u043E\u0437\u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u043F\u0440\u0435\u0434\u043C\u0435\u0442 ${ItemInfo.name}`);
  }
}));

;// CONCATENATED MODULE: ./server/gatherables/index.ts
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


class Gatherable {
  constructor(category, model, coords, radius, respawn) {
    this.model = model;
    this.coords = coords;
    this.category = category;
    this.radius = radius;
    this.respawn = respawn;
    this.culledProp = new CulledProp({
      model,
      coords,
      cullDistance: 500,
      spawned: true
    });
  }
}
const gatherables = [];
function addGatherable(gatherable) {
  return gatherables_async(this, null, function* () {
    yield gatherable.culledProp.register();
    gatherables.push(gatherable);
  });
}
(() => gatherables_async(undefined, null, function* () {
  yield Delay(1e3);
  yield addGatherable(new Gatherable("tree", "prop_tree_cedar_s_01", new Vector3(-762, 5532.77, 31.98), 2, 3e4));
  yield addGatherable(new Gatherable("tree", "prop_tree_cedar_s_02", new Vector3(-724.61, 5367.21, 59.5), 2, 3e4));
  yield addGatherable(new Gatherable("tree", "prop_tree_cedar_s_01", new Vector3(-707.41, 5371.19, 60.8), 2, 3e4));
  yield addGatherable(new Gatherable("tree", "prop_tree_cedar_s_02", new Vector3(-710.39, 5359.25, 63.54), 2, 3e4));
  yield addGatherable(new Gatherable("ore-iron", "prop_rock_3_a", new Vector3(-508.26, 5632.21, 55.78), 4, 6e4));
  yield addGatherable(new Gatherable("ore-iron", "prop_rock_3_a", new Vector3(-561.99, 1889.48, 122.09), 4, 6e4));
  yield addGatherable(new Gatherable("ore-iron", "prop_rock_3_a", new Vector3(-563.07, 1885.76, 122.01), 4, 6e4));
  yield addGatherable(new Gatherable("ore-iron", "prop_rock_3_a", new Vector3(-565.57, 1887.3, 122.03), 4, 6e4));
  const gatherableData = gatherables.map((gatherable) => ({
    category: gatherable.category,
    model: gatherable.model,
    coords: gatherable.coords,
    radius: gatherable.radius,
    id: gatherable.culledProp.id
  }));
  emitNet("gatherables:sendGatherables", -1, gatherableData);
}))();
onNet("gatherables:gather", (id) => {
  const {identifier} = Players.ByHandle(source);
  const gatherable = gatherables.find((t) => t.culledProp.id == id);
  assert(gatherable, `unknown gatherable to gather by player ${identifier}`);
  if (!gatherable.culledProp.spawned) {
    return;
  }
  gatherable.culledProp.despawn();
  setTimeout(() => {
    gatherable.culledProp.spawn();
  }, gatherable.respawn);
});

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

;// CONCATENATED MODULE: ./server/lockers/index.ts
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


(() => lockers_async(undefined, null, function* () {
  yield ESXInit();
  lockers.Zones.forEach((zone) => {
    var _a, _b, _c, _d;
    ESX.Custom.Inventory.Create(zone.category, zone.identifier, false, {
      title: (_a = zone.title) != null ? _a : "\u041A\u043E\u043D\u0442\u0435\u0439\u043D\u0435\u0440",
      maxWeight: (_b = zone.maxWeight) != null ? _b : 30,
      actionGroup: "container",
      width: (_c = zone.width) != null ? _c : 15,
      height: (_d = zone.height) != null ? _d : 20
    });
  });
}))();

// EXTERNAL MODULE: ./server/doorlock/index.ts
var doorlock = __webpack_require__(956);
// EXTERNAL MODULE: ./server/headtrack/index.ts
var headtrack = __webpack_require__(42);
;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Admin/Command.js

class Command {
    constructor(name, groups = ['admin'], cb) {
        this.name = name;
        this.groups = groups;
        this.cb = cb;
    }
    setSuggestion(suggestion) {
        this.suggestion = suggestion;
        return this;
    }
    register() {
        const alreadyRegistered = Command.RegisteredCommands[this.name] !== undefined;
        Command.RegisteredCommands[this.name] = this;
        RegisterCommand(this.name, (handle, args, rawCommand) => {
            const player = Players.ByHandle(handle);
            this.cb(player, args, rawCommand);
        }, true);
        this.groups.forEach(group => {
            ExecuteCommand(`add_ace group.${group} command.${this.name} allow`);
        });
        return !alreadyRegistered;
    }
}
Command.RegisteredCommands = {};

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Admin/index.js

class ServerAdmin {
}
ServerAdmin.Command = Command;


;// CONCATENATED MODULE: ./server/weather/blackout.ts




class Blackout {
  static get enabled() {
    return this._enabled;
  }
  static set enabled(value) {
    this._enabled = value;
    TriggerEvent("weather:requestSync");
  }
}
Blackout._enabled = false;
function doBlackout(player) {
  Blackout.enabled = !Blackout.enabled;
  if (!player) {
    Log.info(`Blackout is now ${Blackout.enabled ? "enabled" : "disabled"}.`);
  } else {
    showNotification(player, `Blackout is now ${Blackout.enabled ? "~b~enabled" : "~r~disabled"}~s~.`);
  }
}
onNet("weather:blackout", function() {
  const player = Players.ByHandle(source);
  doBlackout(player);
});
new Command("blackout", ["admin"], (player) => {
  doBlackout(player);
}).setSuggestion({help: "\u0412\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0431\u043B\u044D\u043A\u0430\u0443\u0442"}).register();

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
;// CONCATENATED MODULE: ./server/weather/weather.ts
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





let newWeatherTimer = weather.WeatherDuration;
const AvailableWeatherTypes = [
  "EXTRASUNNY",
  "CLEAR",
  "NEUTRAL",
  "SMOG",
  "FOGGY",
  "OVERCAST",
  "CLOUDS",
  "CLEARING",
  "RAIN",
  "THUNDER",
  "SNOW",
  "BLIZZARD",
  "SNOWLIGHT",
  "XMAS",
  "HALLOWEEN"
];
class Weather {
  static get current() {
    return this._current;
  }
  static set current(value) {
    this._current = value;
  }
  static get frozen() {
    return this._frozen;
  }
  static set frozen(value) {
    this._frozen = value;
  }
  static getDuration(stage = this.current) {
    let mult = 1;
    if (weather.WeatherDurationMult[stage]) {
      const minmax = weather.WeatherDurationMult[stage];
      if (minmax) {
        if (Array.isArray(minmax)) {
          mult = Random.randint(minmax[0], minmax[1]);
        } else {
          mult = minmax;
        }
      }
    }
    return weather.WeatherDuration * mult;
  }
  static next() {
    switch (this.current) {
      case "CLEAR":
      case "CLOUDS":
      case "EXTRASUNNY":
        this.current = Random.choice(["CLEARING", "OVERCAST"]);
        break;
      case "CLEARING":
      case "OVERCAST":
        this.current = Random.choice(["FOGGY", "RAIN", "SMOG", "EXTRASUNNY", "CLEAR", "CLOUDS"]);
        break;
      case "THUNDER":
      case "RAIN":
        this.current = "CLEARING";
        break;
      case "SMOG":
      case "FOGGY":
        this.current = "CLEAR";
        break;
      default:
        this.current = "CLEAR";
    }
    TriggerEvent("weather:requestSync");
  }
}
Weather._current = "CLEAR";
Weather._frozen = false;
new Command("weather", ["admin"], function(player, args, rawCommand) {
  const nextWeatherType = args[0].toUpperCase();
  const validWeatherType = AvailableWeatherTypes.includes(nextWeatherType);
  if (!player) {
    if (!args[0]) {
      Log.error("Invalid syntax, correct syntax is: /weather <weathertype> ");
    } else if (validWeatherType) {
      Log.info("Weather has been updated.");
      Weather.current = args[0].toUpperCase();
      newWeatherTimer = Weather.getDuration(nextWeatherType);
      TriggerEvent("weather:requestSync");
    } else {
      Log.error(`Invalid weather type, valid weather types are: 
${AvailableWeatherTypes.join(" ")}`);
    }
  } else if (!args[0]) {
    TriggerClientEvent("chatMessage", player.handle, "", [255, 255, 255], "^8Error: ^1Invalid syntax, use ^0/weather <weatherType> ^1instead!");
  } else {
    if (args[0] == "next") {
      Weather.next();
      showNotification(player, `Weather will change to: ~y~${Weather.current.toLowerCase()}~s~.`);
      return;
    }
    if (validWeatherType) {
      Log.debug(player);
      showNotification(player, `Weather will change to: ~y~${nextWeatherType.toLowerCase()}~s~.`);
      Weather.current = nextWeatherType;
      newWeatherTimer = Weather.getDuration(nextWeatherType);
      TriggerEvent("weather:requestSync");
    } else {
      TriggerClientEvent("chatMessage", player.handle, "", [255, 255, 255], "^8Error: ^1Invalid weather type, valid weather types are: ^0\nEXTRASUNNY CLEAR NEUTRAL SMOG FOGGY OVERCAST CLOUDS CLEARING RAIN THUNDER SNOW BLIZZARD SNOWLIGHT XMAS HALLOWEEN ");
    }
  }
}).setSuggestion({
  help: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u043F\u043E\u0433\u043E\u0434\u0443",
  arguments: [
    {
      name: "weatherType",
      help: `Available types: ${AvailableWeatherTypes.join(", ")}`,
      type: "string"
    }
  ]
}).register();
onNet("weather:freeze_weather", function(source) {
  Weather.frozen = !Weather.frozen;
  if (source) {
    const player = Players.ByHandle(source);
    showNotification(player, `Weather is now ${Weather.frozen ? "~b~frozen" : "~r~not frozen"}~s~.`);
  } else {
    Log.info(Weather.frozen ? "Weather is now frozen." : "Weather is no longer frozen.");
  }
});
setTick(() => weather_async(undefined, null, function* () {
  yield Delay(6e4);
  if (newWeatherTimer == 0) {
    if (!Weather.frozen) {
      Weather.next();
    }
    newWeatherTimer = Weather.getDuration(Weather.current);
    if (weather.Debug) {
      Log.debug(`[es_wsync] New random weather type has been generated: ${Weather.current}.`);
      Log.debug(`[es_wsync] Resetting timer to ${newWeatherTimer} min.`);
    }
    newWeatherTimer -= 1;
  }
}));

// EXTERNAL MODULE: ./node_modules/sprintf-js/src/sprintf.js
var sprintf = __webpack_require__(975);
;// CONCATENATED MODULE: ./server/weather/time.ts
var time_async = (__this, __arguments, generator) => {
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






class Time {
}
Time.baseTime = 5e4;
Time.timeOffset = 0;
Time.freeze = false;
function timeToHMS(time) {
  const hour = Math.floor(time / 3600 % 24);
  const minute = Math.floor(time / 60 % 60);
  const second = Math.floor(time) % 60;
  return [hour, minute, second];
}
function doFreezeTime(player) {
  Time.freeze = !Time.freeze;
  if (player) {
    showNotification(player, Time.freeze ? "Time is now ~b~frozen~s~." : "Time is ~y~no longer frozen~s~.");
  } else {
    Log.info(Time.freeze ? "Time is now frozen." : "Time is no longer frozen.");
  }
}
onNet("weather:freeze_time", function() {
  const player = Players.ByHandle(source);
  doFreezeTime(player);
});
new Command("freeze_time", ["admin"], (player) => {
  doFreezeTime(player);
}).setSuggestion({help: "\u041E\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0432\u0440\u0435\u043C\u044F"}).register();
function ShiftToMinute(minute) {
  Time.timeOffset -= (Math.floor(Time.baseTime + Time.timeOffset) / 60 % 60 - minute) * 60;
}
function ShiftToHour(hour) {
  Time.timeOffset -= (Math.floor((Time.baseTime + Time.timeOffset) / 3600) % 24 - hour) * 3600;
}
onNet("weather:set_time", function(hh, mm, cb) {
  const h = clamp(parseInt(hh, 10), 0, 23);
  const m = clamp(parseInt(mm, 10), 0, 59);
  ShiftToMinute(m);
  ShiftToHour(h);
  TriggerEvent("weather:requestSync");
  Log.info(`Time has changed to ${(0,sprintf.sprintf)("%02d:%02d", h, m)}.`);
  if (cb)
    cb();
});
new Command("time", ["admin"], (player, args, rawCommand) => {
  if (args[0] && !args[1]) {
    args = args[0].split(":");
  } else if (!args[0]) {
    const [hour, minute, second] = timeToHMS(Time.baseTime + Time.timeOffset);
    const timeStr = (0,sprintf.sprintf)("%02d:%02d", hour, minute);
    if (!player) {
      Log.info(`Current time ${timeStr}`);
    } else {
      showNotification(player, `Time is: ~y~${timeStr}~s~`);
    }
    return;
  }
  if (!player) {
    if (args.length == 2 && !Number.isNaN(+args[0]) && !Number.isNaN(+args[1])) {
      const argh = +args[0];
      const argm = +args[1];
      TriggerEvent("weather:set_time", argh, argm);
    } else {
      Log.error("Invalid syntax, correct syntax is: time <hour> <minute> !");
    }
  } else if (args.length == 2 && !Number.isNaN(+args[0]) && !Number.isNaN(+args[1])) {
    const argh = +args[0];
    const argm = +args[1];
    TriggerEvent("weather:set_time", argh, argm, function() {
      const [h, m] = timeToHMS(Time.baseTime + Time.timeOffset);
      showNotification(player, `Time has changed to: ~y~${(0,sprintf.sprintf)("%02d:%02d", h, m)}~s~!`);
    });
  } else {
    emitNet("chatMessage", player.handle, "", [255, 255, 255], "^8Error: ^1Invalid syntax. Use ^0/time <hour> <minute> ^1instead!");
  }
}).setSuggestion({help: "\u0418\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0435\u0435 \u0432\u0440\u0435\u043C\u044F"}).register();
let currentTimeScale = weather.DayTimeScale;
setTick(() => time_async(undefined, null, function* () {
  yield Delay(500);
  const newBaseTime = Time.baseTime + currentTimeScale / 2;
  if (Time.freeze) {
    Time.timeOffset = Time.timeOffset + Time.baseTime - newBaseTime;
  }
  const [h1, ,] = timeToHMS(Time.baseTime + Time.timeOffset);
  const [h2, ,] = timeToHMS(newBaseTime + Time.timeOffset);
  if (h2 >= 6 && h2 < 22) {
    currentTimeScale = weather.DayTimeScale;
  } else {
    currentTimeScale = weather.NightTimeScale;
  }
  if (h2 != h1) {
    TriggerEvent("weather:hour_started", h2);
    TriggerClientEvent("weather:hour_started", -1, h2);
  }
  Time.baseTime = newBaseTime;
}));

;// CONCATENATED MODULE: ./server/weather/index.ts
var server_weather_async = (__this, __arguments, generator) => {
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




onNet("weather:requestSync", function() {
  TriggerClientEvent("weather:updateWeather", -1, Weather.current, Blackout.enabled);
  TriggerClientEvent("weather:updateTime", -1, Time.baseTime, Time.timeOffset, Time.freeze);
});
setTick(() => server_weather_async(undefined, null, function* () {
  yield Delay(5e3);
  TriggerClientEvent("weather:updateTime", -1, Time.baseTime, Time.timeOffset, Time.freeze);
}));
setTick(() => server_weather_async(undefined, null, function* () {
  yield Delay(3e5);
  TriggerClientEvent("weather:updateWeather", -1, Weather.current, Blackout.enabled);
}));

;// CONCATENATED MODULE: ./server/trunks/index.ts

let trunks_ESX = null;
ESXInit().then((instance) => {
  trunks_ESX = instance;
});
function registerTrunk(uid, plate) {
  let disposable = false;
  if (uid == 0) {
    uid = plate;
    disposable = true;
  }
  const inv = trunks_ESX.Custom.Inventory.Create("car", uid, false, {
    title: "\u0411\u0430\u0433\u0430\u0436\u043D\u0438\u043A",
    maxWeight: 5e3,
    actionGroup: "container",
    disposable,
    width: 25,
    height: 15
  });
  return inv;
}
ServerCallback.Register("trunks:registerTrunk", (playerHandle, uid, plate) => {
  return registerTrunk(uid, plate);
});

;// CONCATENATED MODULE: ./server/tattoo/index.ts
var tattoo_async = (__this, __arguments, generator) => {
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

let tattooList;
(() => tattoo_async(undefined, null, function* () {
  tattooList = yield DB.Query("tattoo/list", {});
}))();
onNet("engine:openTattooShop", (shopid) => {
  emitNet("engine:openTattooShop", source, shopid, tattooList);
});

;// CONCATENATED MODULE: ./server/slashtires/index.ts


onNet("slashtires:TargetClient", function(client, tireIndex) {
  emitNet("slashtires:SlashClientTire", client, tireIndex);
});
onNet("slashtires:slash", function(pos, model, tireIndex) {
  TriggerClientEvent("slashtires:slash", -1, pos, model, tireIndex);
});
onNet("slashtires:repair", function(pos, model, tireIndex) {
  const player = Players.ByHandle(source);
  const inv = Inventory.ByPlayerIdentifier(player.identifier);
  const tires = Object.values(inv.search({name: "tire"}, true));
  if (tires.length && tires[0].remove(1)) {
    TriggerClientEvent("slashtires:repair", -1, pos, model, tireIndex);
  }
});

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
;// CONCATENATED MODULE: ./server/jobs-oil/liquid.ts
class Liquid {
  constructor(state, max) {
    this.state = state;
    this.max = max;
  }
  get current() {
    return this.state.liquid || {name: "none", amount: 0};
  }
  set(name, amount) {
    this.state.liquid = {name, amount};
  }
  has(name, amount) {
    const {current} = this;
    if (current.name != name)
      return false;
    if (amount && current.amount < amount)
      return false;
    return true;
  }
  add(name, amount) {
    if (amount < 0)
      return false;
    const {current} = this;
    if (current.name != name && current.amount > 0) {
      return false;
    }
    if (current.amount + amount > this.max)
      return false;
    this.set(name, amount + current.amount);
    return true;
  }
  sub(name, amount) {
    if (amount < 0)
      return false;
    const {current} = this;
    if (current.amount < amount)
      return false;
    this.set(name, current.amount - amount);
    return true;
  }
}

;// CONCATENATED MODULE: ./server/jobs-oil/index.ts
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






let oilStore = 0;
let gasStore = 1e5;
setTick(() => jobs_oil_async(undefined, null, function* () {
  yield Delay(1e3);
  if (oilStore >= 3) {
    oilStore -= 3;
    gasStore += 1;
  }
  jobs_oil.Zones.forEach((zone) => {
    if (zone.type == "extract" && zone.store.current < zone.store.max) {
      zone.store.current += 1;
    }
  });
}));
function RefuelTanker(player, tanker, name, amount) {
  assert(name);
  assert(amount > 0);
  const liquidData = new Liquid(tanker.state, 11e3);
  if (liquidData.add(name, amount)) {
    showNotification(player, `\u0417\u0430\u043F\u0440\u0430\u0432\u043A\u0430 ${name}: ${tanker.state.liquid.amount} \u0438\u0437 ${jobs_oil.TankerCapacity}`);
    return true;
  }
  return false;
}
function storeFromZone(zoneId, amount) {
  const zone = jobs_oil.Zones[zoneId];
  assert(zone);
  assert(amount > 0);
  if (zone.store.current < amount) {
    return false;
  }
  zone.store.current -= amount;
  return true;
}
function storeFromTanker(player, tanker, liquid, amount) {
  const liquidData = new Liquid(tanker.state, 11e3);
  if (!liquidData.has(liquid)) {
    if (liquid == "oil") {
      showNotification(player, "\u0412 \u0446\u0438\u0441\u0442\u0435\u0440\u043D\u0435 \u043D\u0435\u0442 \u043D\u0435\u0444\u0442\u0438!");
    } else if (liquid == "gas") {
      showNotification(player, "\u0412 \u0446\u0438\u0441\u0442\u0435\u0440\u043D\u0435 \u043D\u0435\u0442 \u0431\u0435\u043D\u0437\u0438\u043D\u0430!");
    } else {
      showNotification(player, `\u0412 \u0446\u0438\u0441\u0442\u0435\u0440\u043D\u0435 \u043D\u0435\u0442: ${liquid}!`);
    }
    return false;
  }
  return liquidData.sub(liquid, amount);
}
function getEntityFromNetid(netid) {
  const entity = NetworkGetEntityFromNetworkId(netid);
  return new Entity(entity);
}
function insideExtract(player, entity) {
  RefuelTanker(player, entity, "oil", 1);
}
function insideStore(player, entity) {
  if (oilStore > jobs_oil.OilStoreCapacity) {
    return;
  }
  if (storeFromTanker(player, entity, "oil", 1)) {
    oilStore += 1;
  }
}
function insideGasStore(player, entity, zoneId) {
  if (storeFromZone(zoneId, 1) && RefuelTanker(player, entity, "gas", 1)) {
  }
}
function findGasStation(brand, index) {
  for (const v of Object.values(jobs_oil.Zones)) {
    if (v.type == "gas-station") {
      if (v.brand == brand && v.index == index) {
        return v;
      }
    }
  }
  return null;
}
function insideGasStation(player, entity, brand, index) {
  const zone = findGasStation(brand, index);
  if (zone.store.current >= zone.store.max) {
    return;
  }
  if (storeFromTanker(player, entity, "gas", 1)) {
    zone.store.current += 1;
    emitNet("nova-ui:updateGasStation", player.handle, brand, index);
  }
}
onNet("jobs-oil:insideMarker", function(netid, zoneId, data) {
  const player = Players.ByHandle(source);
  const vehicle = getEntityFromNetid(netid);
  const zone = jobs_oil.Zones[zoneId];
  if (!vehicle.exist)
    return;
  Log.debug(zone.type, vehicle.state.liquid);
  if (zone.type == "extract") {
    insideExtract(player, vehicle);
  } else if (zone.type == "store") {
    insideStore(player, vehicle);
  } else if (zone.type == "gas-store") {
    insideGasStore(player, vehicle, zoneId);
  } else if (zone.type == "gas-station" && data) {
    insideGasStation(player, vehicle, data.brand, data.index);
  }
});
onNet("jobs-oil:insideGasStation", function(netid, brand, index) {
  const player = Players.ByHandle(source);
  const entity = getEntityFromNetid(netid);
  if (!entity.exist)
    return;
  insideGasStation(player, entity, brand, index);
});
ServerCallback.Register("jobs-oil:getGasStationData", function(handle, brand, index) {
  const station = findGasStation(brand, index);
  return station;
});
ServerCallback.Register("jobs-oil:getZone", function(handle, zoneId) {
  const zone = jobs_oil.Zones[zoneId];
  return zone;
});

;// CONCATENATED MODULE: ./server/health/index.ts


onNet("health:trauma", function(trauma, limb, severity) {
  const player = Players.ByHandle(source);
  assert(player);
  assert(severity > 0);
  assert(["fracture", "dislocation", "bruises", "concussion"].includes(trauma));
  assert(["larm", "rarm", "lleg", "rleg", "torso", "head"].includes(limb));
  const timeMinMax = {
    fracture: [120, 360],
    dislocation: [60, 120],
    bruises: [10, 30],
    concussion: [120, 240]
  };
  if (trauma == "concussion") {
    player.status.add(`trauma-${trauma}`, Random.randint(...timeMinMax[trauma]) * 60);
    return;
  }
  player.status.add(`trauma-${trauma}-${limb}`, Random.randint(...timeMinMax[trauma]) * 60);
  player.status.add("pain", +severity);
});

;// CONCATENATED MODULE: ./server/effects/index.ts

onNet("engine:effects:smokeTick", (val) => {
  const player = Players.ByHandle(source);
  TriggerEvent("engine:status:add", player.handle, "smoking", val);
  TriggerEvent("engine:status:sub", player.handle, "stress", val / 3);
});

;// CONCATENATED MODULE: ./server/index.ts
var server_async = (__this, __arguments, generator) => {
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

















(() => server_async(undefined, null, function* () {
  yield Delay(1e3);
  const player = Players.All()[0];
  if (player) {
    player.money.set("bank", 23456);
  }
}))();

})();

/******/ })()
;