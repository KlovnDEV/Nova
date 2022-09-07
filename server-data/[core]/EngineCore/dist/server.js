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

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Core/Static.js
class Static {
    constructor() {
        throw new Error('Static class instancing!');
    }
}

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
        return new Vector3_Vector3(this.x, this.y, z);
    }
}

;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/shared/Math/Vector3.js

class Vector3_Vector3 {
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
        return new Vector3_Vector3(this.x + v.x, this.y + v.y, this.z + v.z);
    }
    /**
     * Сложение вектора и скаляра
     */
    addXYZ(x, y, z) {
        return new Vector3_Vector3(this.x + x, this.y + y, this.z + z);
    }
    /**
     * Умножение вектора на скаляр
     */
    mul(m) {
        return new Vector3_Vector3(this.x * m, this.y * m, this.z * m);
    }
    /**
     * Умножение вектора на скаляр покоординатно
     */
    mulXYZ(x, y, z) {
        return new Vector3_Vector3(this.x * x, this.y * y, this.z * z);
    }
    /**
     * Вычитание векторов
     */
    sub(v) {
        return new Vector3_Vector3(this.x - v.x, this.y - v.y, this.z - v.z);
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
        return new Vector3_Vector3(arr[0], arr[1], arr[2]);
    }
    static FromObject(dict) {
        return new Vector3_Vector3(dict.x, dict.y, dict.z);
    }
    static get Zero() {
        return new Vector3_Vector3(0, 0, 0);
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
const Utils_assert = (value, message = '') => {
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
const Utils_clamp = (val, min, max) => Math.min(Math.max(val, min), max);

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
        Utils_assert(this.handle);
        this.identifiers = getPlayerIdentifiers(handle);
        Utils_assert(Object.keys(this.identifiers).length);
    }
    async init() {
        this.identifier = await getUniqueIdentifier(this.identifiers);
        Utils_assert(this.identifier);
        this.name = GetPlayerName(String(this.handle));
        this.state = __webpack_require__.g.Player(this.handle).state;
        Utils_assert(this.state);
    }
    /**
     * Координаты игрока в мире
     */
    get coords() {
        const c = this.state.coords;
        if (!c)
            return null;
        return new Vector3_Vector3(c[0], c[1], c[2]);
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

class PlayerStatus_PlayerStatus {
    constructor(player) {
        this.player = player;
    }
    set(name, value) {
        emit('engine:status:set', this.player.handle, name, value);
    }
    add(name, value) {
        Utils_assert(value > 0);
        emit('engine:status:add', this.player.handle, name, value);
    }
    sub(name, value) {
        Utils_assert(value > 0);
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
    player.status = new PlayerStatus_PlayerStatus(player);
    Players.PlayersByHandle[player.handle] = player;
    Players.PlayersByIdentifier[player.identifier] = player;
    Players.onJoin.emit(player);
}
function onPlayerDrop(handle, reason) {
    const player = Players.ByHandle(handle);
    Utils_assert(player);
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

;// CONCATENATED MODULE: ./server/Admin/Command.ts
const _Command = class {
  constructor(name, cb, group = "admin") {
    this.name = name;
    this.group = group;
    this.cb = cb;
  }
  setSuggestion(suggestion) {
    this.suggestion = suggestion;
    return this;
  }
  register() {
    const alreadyRegistered = _Command.RegisteredCommands[this.name] !== void 0;
    _Command.RegisteredCommands[this.name] = this;
    return !alreadyRegistered;
  }
};
let Command = _Command;
Command.RegisteredCommands = {};

;// CONCATENATED MODULE: ./server/Admin/index.ts
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




setTick(() => __async(undefined, null, function* () {
  yield Delay(1e3);
  const commands = yield DB.Query("admin/commands/get", {pending: true});
  for (const row of commands) {
    const params = JSON.parse(row.cmd);
    Utils_assert(params.name);
    yield DB.Query("admin/commands/start", {id: row.id});
    emit(`engine:admincmd:${params.name}`, row.id, params);
  }
}));
on("engine:admincmd:setstatus", (_0, _1) => __async(undefined, [_0, _1], function* (id, {identifier, key, value}) {
  const player = Players.ByIdentifier(identifier);
  Utils_assert(player);
  player.core.status.set(key, value * 1);
  yield DB.Query("admin/commands/finish", {id, result: "{}"});
}));
on("engine:admincmd:revive", (_0, _1) => __async(undefined, [_0, _1], function* (id, {identifier}) {
  const player = Players.ByIdentifier(identifier);
  Utils_assert(player);
  player.revive();
  yield DB.Query("admin/commands/finish", {id, result: "{}"});
}));
on("engine:admincmd:teleport", (_0, _1) => __async(undefined, [_0, _1], function* (id, {identifier, x, y, heading}) {
  const player = Players.ByIdentifier(identifier);
  Utils_assert(player);
  player.teleportXY(x, y, heading);
  yield DB.Query("admin/commands/finish", {id, result: "{}"});
}));

;// CONCATENATED MODULE: ./server/Core/ServerCallback.ts
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
  static Register(name, callback) {
    _ServerCallback.ServerCallbacks[name] = callback;
    console.info(`^3Server callback registered: ${name}`);
  }
  static Trigger(player, name, ...args) {
    return ServerCallback_async(this, null, function* () {
      if (!_ServerCallback.ServerCallbacks[name])
        throw new Error(`Server callback with name ${name} not found! Sender: ${player.name}`);
      return Promise.resolve(_ServerCallback.ServerCallbacks[name](player.handle, ...args));
    });
  }
};
let ServerCallback = _ServerCallback;
ServerCallback.ServerCallbacks = {};
ServerCallback.GLOBAL_ID = 0;
on("engine:triggerServerCallback", (handle, cb, name, ...args) => {
  const player = Players.ByHandle(String(handle));
  ServerCallback.Trigger(player, name, ...args).then(cb);
});
onNet(`engine:triggerServerCallback`, (cid, name, ...args) => ServerCallback_async(undefined, null, function* () {
  const player = Players.ByHandle(source);
  Utils_assert(player);
  if (!ServerCallback.ServerCallbacks[name]) {
    throw new Error(`Server callback ${name} not found! Player: ${player.identifier}`);
  }
  const result = ServerCallback.ServerCallbacks[name](player.handle, ...args);
  emitNet(`engine:triggerServerCallbackResult`, player.handle, cid, result);
}));
on("engine:registerServerCallback", (name, callback) => {
  ServerCallback.Register(name, callback);
});

;// CONCATENATED MODULE: ./server/Core/ClientCallback.ts
var ClientCallback_async = (__this, __arguments, generator) => {
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
  static Trigger(player, name, ...args) {
    return ClientCallback_async(this, null, function* () {
      console.debug("^3Server triggering client callback: ", player.name, name, args);
      const cid = _ClientCallback.GLOBAL_ID;
      _ClientCallback.GLOBAL_ID += 1;
      if (_ClientCallback.GLOBAL_ID > 65535)
        _ClientCallback.GLOBAL_ID = 1;
      emitNet(`engine:triggerClientCallback`, player.handle, cid, name, ...args);
      let promiseResolve;
      let promiseReject;
      const promise = new Promise((resolve, reject) => {
        promiseResolve = resolve;
        promiseReject = reject;
      });
      if (!_ClientCallback.ClientCallbacks[player.handle]) {
        _ClientCallback.ClientCallbacks[player.handle] = {};
      }
      _ClientCallback.ClientCallbacks[player.handle][cid] = [promiseResolve, promiseReject];
      return promise;
    });
  }
};
let ClientCallback_ClientCallback = _ClientCallback;
ClientCallback_ClientCallback.ClientCallbacks = {};
ClientCallback_ClientCallback.GLOBAL_ID = 0;
on("engine:triggerClientCallback", (handle, cb, name, ...args) => {
  const player = Players.ByHandle(String(handle));
  if (!player)
    throw new Error(`Client callback ${name} player not found! Player: ${handle}`);
  ClientCallback_ClientCallback.Trigger(player, name, ...args).then(cb);
});
onNet(`engine:triggerClientCallbackResult`, (cid, ...args) => {
  const player = Players.ByHandle(String(source));
  Utils_assert(player);
  console.debug("^3Server got client callback result: ", cid, player.name, args);
  if (!ClientCallback_ClientCallback.ClientCallbacks[player.handle][cid]) {
    throw new Error(`Client callback ${cid} not found! Player: ${player.identifier}`);
  }
  ClientCallback_ClientCallback.ClientCallbacks[player.handle][cid][0](...args);
  delete ClientCallback_ClientCallback.ClientCallbacks[player.handle][cid];
});

;// CONCATENATED MODULE: ./server/Core/index.ts



;// CONCATENATED MODULE: ./node_modules/@nova/engine-lib/server/Core/ESX.js

let ESX = null;
async function ESXInit() {
    while (!ESX) {
        emit('esx:getSharedObject', obj => { ESX = obj; });
        await Delay(100);
    }
    return ESX;
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



;// CONCATENATED MODULE: ./server/Game/PlayerMoney.ts
var PlayerMoney_async = (__this, __arguments, generator) => {
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





class PlayerMoney_PlayerMoney {
  constructor(player) {
    this.accounts = {};
    this.player = player;
    this.updateAccountState("bank", 0);
  }
  updateAccountState(name, amount) {
    this.accounts[name] = amount;
    this.player.state.set("money", this.accounts, true);
  }
  getFromDB(account) {
    return PlayerMoney_async(this, null, function* () {
      const {identifier} = this.player;
      return DB.Query("money/get", {name: account, identifier}).then((response) => {
        Utils_assert(response.amount !== void 0, "1");
        return response.amount;
      }).catch((err) => {
        if (err.status == 400) {
          console.warn(`Uninitialized money account: ${account}/${identifier}`);
          return 0;
        }
        throw err;
      });
    });
  }
  get(account) {
    return PlayerMoney_async(this, null, function* () {
      if (this.player.state.money[account] !== void 0)
        return this.player.state.money[account];
      const value = yield this.getFromDB(account);
      this.updateAccountState(account, value);
      return value;
    });
  }
  set(account, amount, description) {
    return PlayerMoney_async(this, null, function* () {
      Utils_assert(amount >= 0, "amount is negative!");
      const {identifier} = this.player;
      yield DB.Query("money/set", {name: account, identifier, amount});
      this.updateAccountState(account, amount);
      emit("engine:onPlayerMoneySet", this.player.handle, account, amount);
      Log.debug(`Money set ${this.player.identifier} on account ${account} to ${amount}: ${description}`);
    });
  }
  add(account, amount, description) {
    return PlayerMoney_async(this, null, function* () {
      Utils_assert(amount >= 0, "amount is negative!");
      const {identifier} = this.player;
      yield DB.Query("money/add", {name: account, identifier, amount});
      const newAmount = (yield this.get(account)) + amount;
      this.updateAccountState(account, newAmount);
      emit("engine:onPlayerMoneyAdd", this.player.handle, account, amount, newAmount);
      Log.debug(`Money add ${this.player.identifier} on account ${account}, +${amount} (to ${newAmount}): ${description}`);
      return newAmount;
    });
  }
  sub(account, amount, description) {
    return PlayerMoney_async(this, null, function* () {
      Utils_assert(amount >= 0, "amount is negative!");
      const {identifier} = this.player;
      const inventory = Inventory.ByPlayerIdentifier(identifier);
      if (account === "cash") {
        if (!inventory) {
          throw new Error(`No inventory found!`);
        }
        if (!inventory.removeCash(amount)) {
          throw new Error(`Not enough cash!`);
        }
        Log.debug(`Money sub ${this.player.identifier} on cash, -${amount}: ${description}`);
        return 0;
      }
      const newAmount = (yield this.get(account)) - amount;
      if (newAmount < 0)
        throw new Error(`Not enough money!`);
      yield DB.Query("money/remove", {name: account, identifier, amount});
      this.updateAccountState(account, newAmount);
      emit("engine:onPlayerMoneySub", this.player.handle, account, amount, newAmount);
      Log.debug(`Money sub ${this.player.identifier} on account ${account}, -${amount} (to ${newAmount}): ${description}`);
      return newAmount;
    });
  }
  pay(accounts, amount, description, tax) {
    return PlayerMoney_async(this, null, function* () {
      Utils_assert(amount >= 0, "amount is negative!");
      for (const account of accounts) {
        const newAmount = yield this.sub(account, amount, description).catch(() => {
          return void 0;
        });
        if (newAmount !== void 0) {
          Log.debug(`Money pay ${this.player.identifier} on account ${account}, -${amount} (to ${newAmount}): ${description}`);
          return true;
        }
      }
      return false;
    });
  }
}
on("engine:getPlayerMoney", (handle, account, cb) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(handle);
  Utils_assert(player, "2");
  cb(yield player.core.money.get(account));
}));
on("engine:setPlayerMoney", (handle, account, amount, description, cb) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(handle);
  Utils_assert(player, "3");
  yield player.core.money.set(account, amount, description);
  cb(amount);
}));
on("engine:addPlayerMoney", (handle, account, amount, description, cb) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(handle);
  Utils_assert(player, "4");
  cb(yield player.core.money.add(account, amount, description));
}));
on("engine:subPlayerMoney", (handle, account, amount, description, cb) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(handle);
  Utils_assert(player, "5");
  cb(yield player.core.money.sub(account, amount, description));
}));
on("engine:payPlayerMoney", (handle, accounts, amount, description, tax, cb) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(handle);
  Utils_assert(player, "6");
  cb(yield player.core.money.pay(accounts, amount, description, tax));
}));
ServerCallback.Register("engine:pay", (source, accounts, amount, description, tax) => PlayerMoney_async(undefined, null, function* () {
  const player = Players.ByHandle(source);
  return player.core.money.pay(accounts, amount, description, tax).then(() => {
    return true;
  }).catch(() => {
    return false;
  });
}));

;// CONCATENATED MODULE: ./server/Game/PlayerIdentity.ts
var __defProp = Object.defineProperty;
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
var PlayerIdentity_async = (__this, __arguments, generator) => {
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


class PlayerIdentity {
  constructor(player) {
    this.player = player;
    this.GetFromDB().then((response) => {
      this.player.state.set("identity", response, true);
    });
  }
  GetFromDB() {
    return PlayerIdentity_async(this, null, function* () {
      return DB.Query("identity/get", {identifier: this.player.identifier}).then((response) => {
        this.identity = response;
      });
    });
  }
  Get() {
    return PlayerIdentity_async(this, null, function* () {
      if (this.identity)
        return this.identity;
      yield this.GetFromDB();
      return this.identity;
    });
  }
  Set(data) {
    return PlayerIdentity_async(this, null, function* () {
      const newIdentity = __spreadValues({identifier: this.player.identifier}, data);
      return DB.Query("identity/update", __spreadValues({identifier: this.player.identifier}, data)).then(() => {
        this.identity = newIdentity;
        this.player.state.identity = newIdentity;
      });
    });
  }
}
on("engine:setPlayerIdentity", (handle, value) => {
  const player = Players.ByHandle(handle);
  if (!player)
    return;
  player.identity.Set(value);
});

;// CONCATENATED MODULE: ./server/Game/PlayerStatus.ts
var PlayerStatus_Visibility;
(function(Visibility2) {
  Visibility2[Visibility2["NONE"] = 0] = "NONE";
  Visibility2[Visibility2["STATUS"] = 1] = "STATUS";
  Visibility2[Visibility2["BUFF"] = 2] = "BUFF";
  Visibility2[Visibility2["SKILL"] = 3] = "SKILL";
})(PlayerStatus_Visibility || (PlayerStatus_Visibility = {}));
class Game_PlayerStatus_PlayerStatus {
  constructor(player) {
    this.player = player;
  }
  start(values, ...args) {
  }
  stop(values, ...args) {
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/Hunger.ts


class Hunger extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "hunger",
      label: "\u0413\u043E\u043B\u043E\u0434",
      description: "\u0411\u0430\u0437\u043E\u0432\u044B\u0439 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u044C \u0433\u043E\u043B\u043E\u0434\u0430. \u041F\u0440\u0438 \u0434\u043E\u0441\u0442\u0438\u0436\u0435\u043D\u0438\u0438 100 \u0432\u0435\u0448\u0430\u0435\u043C \u043F\u0435\u0440\u0432\u044B\u0439 \u0434\u0435\u0431\u0430\u0444\u0444",
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    const overeatingMultiplier = value < 0 ? 2 : 1;
    newValue += overeatingMultiplier * 100 / (30 * 60);
    return Utils_clamp(newValue, -100, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/HungerLow.ts


class HungerLow extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "hunger-low",
      label: "\u0413\u043E\u043B\u043E\u0434",
      description: `\u0412\u044B \u043F\u0440\u043E\u0433\u043E\u043B\u043E\u0434\u0430\u043B\u0438\u0441\u044C. \u041C\u0435\u0448\u0430\u0435\u0442 \u0441\u043E\u0441\u0440\u0435\u0434\u043E\u0442\u043E\u0447\u0438\u0442\u044C\u0441\u044F, \u0444\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u0441\u043D\u0438\u0436\u0435\u043D\u044B, \u0441\u043B\u043E\u0436\u043D\u0435\u0435 \u043D\u0430\u0431\u0438\u0440\u0430\u0442\u044C \u043C\u044B\u0448\u0435\u0447\u043D\u0443\u044E \u043C\u0430\u0441\u0441\u0443`,
      visible: PlayerStatus_Visibility.BUFF
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const hunger = (_a = values.hunger) != null ? _a : 0;
    if (hunger > 80) {
      newValue += 100 / (30 * 60);
    } else {
      newValue -= 10;
    }
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/HungerHigh.ts


class HungerHigh extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "hunger-high",
      label: "\u0418\u0441\u0442\u043E\u0449\u0435\u043D\u0438\u0435",
      description: `\u0412\u044B \u0431\u0443\u043A\u0432\u0430\u043B\u044C\u043D\u043E \u0443\u043C\u0438\u0440\u0430\u0435\u0442\u0435 \u043E\u0442 \u0433\u043E\u043B\u043E\u0434\u0430. \u0424\u0438\u0437\u0438\u0447\u0435\u0441\u043A\u0438\u0435 \u043F\u043E\u043A\u0430\u0437\u0430\u0442\u0435\u043B\u0438 \u0441\u0438\u043B\u044C\u043D\u043E \u0441\u043D\u0438\u0436\u0435\u043D\u044B, 
        \u0441\u043B\u043E\u0436\u043D\u043E \u0441\u043E\u0441\u0440\u0435\u0434\u043E\u0442\u043E\u0447\u0438\u0442\u044C\u0441\u044F \u043D\u0430 \u0438\u0437\u0443\u0447\u0435\u043D\u0438\u0438 \u0438\u043B\u0438 \u043D\u0430\u0431\u0438\u0440\u0430\u0442\u044C \u043C\u044B\u0448\u0435\u0447\u043D\u0443\u044E \u043C\u0430\u0441\u0441\u0443`,
      visible: PlayerStatus_Visibility.BUFF
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const hungerLow = (_a = values["hunger-low"]) != null ? _a : 0;
    if (hungerLow > 80) {
      newValue += 100 / (30 * 60);
    } else {
      newValue -= 10;
    }
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/Overeating.ts


class Overeating extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "overeating",
      label: "\u041F\u0435\u0440\u0435\u0435\u0434\u0430\u043D\u0438\u0435",
      description: `\u0416\u0435\u043B\u0443\u0434\u043E\u043A \u043F\u0435\u0440\u0435\u043F\u043E\u043B\u043D\u0435\u043D, \u0432\u044B \u0447\u0443\u0432\u0441\u0442\u0432\u0443\u0435\u0442\u0435 \u0434\u0438\u0441\u043A\u043E\u043C\u0444\u043E\u0440\u0442 \u0438 \u043D\u0435 \u043C\u043E\u0436\u0435\u0442\u0435 \u043D\u0438\u0447\u0435\u0433\u043E \u0435\u0441\u0442\u044C. \u0412\u0430\u0448\u0430 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C \u0441\u043D\u0438\u0436\u0435\u043D\u0430.`,
      visible: PlayerStatus_Visibility.BUFF
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    if (values.hunger < -50) {
      newValue = 600;
    } else {
      newValue -= 1;
    }
    return Utils_clamp(newValue, 0, 600);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/Thirst.ts


class Thirst extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "thirst",
      label: "\u0416\u0430\u0436\u0434\u0430",
      description: `\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442, \u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0438\u0433\u0440\u043E\u043A \u0445\u043E\u0447\u0435\u0442 \u043F\u0438\u0442\u044C`,
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    const overdrinkingMultiplier = value < 0 ? 2 : 1;
    newValue += overdrinkingMultiplier * 100 / (50 * 60);
    return Utils_clamp(newValue, -100, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/ThirstHigh.ts


class ThirstHigh extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "thirst-high",
      label: "\u041E\u0431\u0435\u0437\u0432\u043E\u0436\u0438\u0432\u0430\u043D\u0438\u0435",
      description: `\u0412\u044B \u043D\u0435\u0432\u044B\u043D\u043E\u0441\u0438\u043C\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u043F\u0438\u0442\u044C, \u0432\u044B\u0448\u0430 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C \u0441\u0438\u043B\u044C\u043D\u043E \u0441\u043D\u0438\u0436\u0435\u043D\u0430`,
      visible: PlayerStatus_Visibility.BUFF
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const thirst = (_a = values.thirst) != null ? _a : 0;
    if (thirst > 80) {
      newValue += 100 / (30 * 60);
    } else {
      newValue -= 10;
    }
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/Stress.ts


class Stress extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "stress",
      label: "\u0421\u0442\u0440\u0435\u0441\u0441",
      description: `\u0421\u043D\u0438\u0436\u0430\u0435\u0442 \u043E\u0431\u0443\u0447\u0430\u0435\u043C\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0442\u0440\u0443\u0434\u0430`,
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    if (values["smoking-addiction"] > 10 && values.smoking < 1) {
      return newValue + values["alcohol-addiction"] * 5e-3;
    }
    if (values["alcohol-addiction"] > 10 && values.alcohol < 1) {
      return newValue + values["alcohol-addiction"] * 25e-4;
    }
    if (values["drugs-addiction"] > 10 && values.drugs < 1) {
      return newValue + values["alcohol-addiction"] * 0.01;
    }
    if (values["hunger-low"] > 10 || values["hunger-high"] > 10 || values.overeating > 1 || values.thirst > 90) {
      return newValue + 0.1;
    }
    newValue -= 100 / (60 * 60);
    return Utils_clamp(newValue, 0, 100);
  }
  get name() {
    return "stress";
  }
  get label() {
    return "\u0421\u0442\u0440\u0435\u0441\u0441";
  }
  get description() {
    return "\u0421\u043D\u0438\u0436\u0430\u0435\u0442 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C \u0438 \u043F\u0440\u043E\u0438\u0437\u0432\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u043D\u043E\u0441\u0442\u044C \u0442\u0440\u0443\u0434\u0430";
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Basic/index.ts








;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/Alcohol.ts


class Alcohol extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "alcohol",
      label: "\u0410\u043B\u043A\u043E\u0433\u043E\u043B\u044C\u043D\u043E\u0435 \u043E\u043F\u044C\u044F\u043D\u0435\u043D\u0438\u0435",
      description: "\u041D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043F\u044C\u044F\u043D\u044B\u043C \u0432\u044B \u0441\u0435\u0431\u044F \u043E\u0449\u0443\u0449\u0430\u0435\u0442\u0435 \u0432 \u0434\u0430\u043D\u043D\u044B\u0439 \u043C\u043E\u043C\u0435\u043D\u0442 (0 - \u0442\u0440\u0435\u0437\u0432)",
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value) {
    let newValue = value != null ? value : 0;
    newValue -= 100 / (30 * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/AlcoholAddiction.ts


class AlcoholAddiction extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "alcohol-addiction",
      label: "\u0410\u043B\u043A\u043E\u0433\u043E\u043B\u044C\u043D\u0430\u044F \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C",
      description: "\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0430\u0431\u0441\u0442\u0438\u043D\u0435\u043D\u0442\u043D\u043E\u0433\u043E \u0441\u0438\u043D\u0434\u0440\u043E\u043C\u0430",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    if (values.alcohol > 30) {
      newValue += 100 / (6 * 60 * 60);
    } else {
      newValue -= 100 / (12 * 60 * 60);
    }
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/Smoking.ts


class Smoking extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "smoking",
      label: "\u041A\u0443\u0440\u0435\u043D\u0438\u0435",
      description: "",
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const addiction = (_a = values["smoking-addiction"]) != null ? _a : 0;
    const minutesToSmoke = 100 - addiction / 100 * 80;
    newValue -= 100 / (minutesToSmoke * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/SmokingAddiction.ts


class SmokingAddiction extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "smoking-addiction",
      label: "\u041D\u0438\u043A\u043E\u0442\u0438\u043D\u043E\u0432\u0430\u044F \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C",
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const smoking = (_a = values.smoking) != null ? _a : 0;
    if (smoking > 30) {
      newValue += 100 / (6 * 60 * 60);
    } else {
      newValue -= 100 / (12 * 60 * 60);
    }
    return Utils_clamp(newValue, 0, 100);
  }
  get name() {
    return "smoking-addiction";
  }
  get label() {
    return "\u041D\u0438\u043A\u043E\u0442\u0438\u043D\u043E\u0432\u0430\u044F \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C";
  }
  get description() {
    return ".";
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/Drugs.ts


class Drugs extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "drugs",
      label: "\u041D\u0430\u0440\u043A\u043E\u0442\u0438\u043A\u0438",
      description: "",
      visible: PlayerStatus_Visibility.STATUS
    };
  }
  tick(value, values) {
    var _a;
    let newValue = value != null ? value : 0;
    const addiction = (_a = values["drugs-addiction"]) != null ? _a : 0;
    const minutesToShot = 120 - addiction / 100 * 110;
    newValue -= 100 / (minutesToShot * 60);
    return Utils_clamp(newValue, 0, 200);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/DrugsAddiction.ts


class DrugsAddiction extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "drugs-addiction",
      label: "\u041D\u0430\u0440\u043A\u043E\u0442\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u0437\u0430\u0432\u0438\u0441\u0438\u043C\u043E\u0441\u0442\u044C",
      description: "\u0412\u044B\u0440\u0430\u0436\u0435\u043D\u043D\u043E\u0441\u0442\u044C \u0430\u0431\u0441\u0442\u0438\u043D\u0435\u043D\u0442\u043D\u043E\u0433\u043E \u0441\u0438\u043D\u0434\u0440\u043E\u043C\u0430",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    if (values.smoking > 30) {
      newValue += 100 / (6 * 60 * 60);
    } else {
      newValue -= 100 / (12 * 60 * 60);
    }
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/DrugsOverdose.ts


class DrugsOverdose extends (/* unused pure expression or super */ null && (PlayerStatus)) {
  get info() {
    return {
      name: "drugs-overdose",
      label: "\u041F\u0435\u0440\u0435\u0434\u043E\u0437\u0438\u0440\u043E\u0432\u043A\u0430 \u043D\u0430\u0440\u043A\u043E\u0442\u0438\u043A\u0430\u043C\u0438",
      description: "\u041E\u043F\u0430\u0441\u043D\u043E\u0435 \u0434\u043B\u044F \u0436\u0438\u0437\u043D\u0438 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435",
      visible: Visibility.BUFF
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    const {drugs} = values;
    if (drugs > 190) {
      newValue = 100;
    } else {
      newValue = 0;
    }
    return clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Addictions/index.ts








;// CONCATENATED MODULE: ./server/Game/Statuses/Skills/Strength.ts


class Strength extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "strength",
      label: "\u0421\u0438\u043B\u0430",
      description: "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0438\u0439 \u0432\u0435\u0441. \u041D\u0435\u043E\u0431\u0445\u043E\u0434\u0438\u043C\u0430 \u0434\u043B\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0430\u043D\u0438\u044F \u0432\u044B\u0441\u043E\u043A\u043E\u0439 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u0438",
      visible: PlayerStatus_Visibility.SKILL
    };
  }
  tick(value, values) {
    const baseValue = 30;
    let newValue = value != null ? value : baseValue;
    if (newValue <= baseValue)
      return newValue;
    const minutesToLose = 500 - (newValue - baseValue) / (100 - baseValue) * 440;
    newValue -= 100 / (minutesToLose * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Skills/Agility.ts


class Agility extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "agility",
      label: "\u041B\u043E\u0432\u043A\u043E\u0441\u0442\u044C",
      description: "\u041E\u043F\u0440\u0435\u0434\u0435\u043B\u044F\u0435\u0442, \u043D\u0430\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u0431\u044B\u0441\u0442\u0440\u043E \u0432\u044B \u0431\u0435\u0436\u0438\u0442\u0435 \u0438 \u043F\u043B\u044B\u0432\u0451\u0442\u0435, \u043F\u0440\u044B\u0436\u043A\u0438 \u043C\u0435\u043D\u044C\u0448\u0435 \u0440\u0430\u0441\u0445\u043E\u0434\u0443\u044E\u0442 \u0432\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C",
      visible: PlayerStatus_Visibility.SKILL
    };
  }
  tick(value, values) {
    const baseValue = 30;
    let newValue = value != null ? value : baseValue;
    if (newValue <= baseValue)
      return newValue;
    const minutesToLose = 500 - (newValue - baseValue) / (100 - baseValue) * 440;
    newValue -= 100 / (minutesToLose * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Skills/Endurance.ts


class Endurance extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "endurance",
      label: "\u0412\u044B\u043D\u043E\u0441\u043B\u0438\u0432\u043E\u0441\u0442\u044C",
      description: "\u0412\u044B \u043C\u043E\u0436\u0435\u0442\u0435 \u0434\u043E\u043B\u044C\u0448\u0435 \u0431\u0435\u0436\u0430\u0442\u044C \u0438 \u043B\u0443\u0447\u0448\u0435 \u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u0443\u0434\u0430\u0440",
      visible: PlayerStatus_Visibility.SKILL
    };
  }
  tick(value, values) {
    const baseValue = 30;
    let newValue = value != null ? value : baseValue;
    if (newValue <= baseValue)
      return newValue;
    const minutesToLose = 500 - (newValue - baseValue) / (100 - baseValue) * 440;
    newValue -= 100 / (minutesToLose * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Skills/Intelligence.ts


class Intelligence extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: "intelligence",
      label: "\u0418\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442",
      description: "\u041E\u0431\u0443\u0447\u0435\u043D\u0438\u0435 \u0438 \u0438\u043D\u0442\u0435\u043B\u043B\u0435\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u044B\u0435 \u043D\u0430\u0432\u044B\u043A\u0438 \u0434\u0430\u044E\u0442\u0441\u044F \u0432\u0430\u043C \u043F\u0440\u043E\u0449\u0435",
      visible: PlayerStatus_Visibility.SKILL
    };
  }
  tick(value, values) {
    const baseValue = 30;
    let newValue = value != null ? value : baseValue;
    if (newValue <= baseValue)
      return newValue;
    const minutesToLose = 500 - (newValue - baseValue) / (100 - baseValue) * 440;
    newValue -= 100 / (minutesToLose * 60);
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Skills/index.ts





;// CONCATENATED MODULE: ./server/Game/Statuses/Medicine/WoundTreat.ts


class Bleed extends (/* unused pure expression or super */ null && (PlayerStatus)) {
  get info() {
    return {
      name: `bleed`,
      label: `\u041A\u0440\u043E\u0432\u043E\u0442\u0435\u0447\u0435\u043D\u0438\u0435`,
      description: "\u0412\u044B \u0442\u0435\u0440\u044F\u0435\u0442\u0435 \u043A\u0440\u043E\u0432\u044C. \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u0440\u0430\u043D\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0437\u0430\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043D\u0438\u0437\u0438\u0442\u044C \u043A\u0440\u043E\u0432\u043E\u043F\u043E\u0442\u0435\u0440\u044E.",
      visible: Visibility.BUFF
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value;
    newValue -= 100 / (10 * 60 * 60);
    return clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Medicine/Painkiller.ts


class Painkiller extends (/* unused pure expression or super */ null && (PlayerStatus)) {
  get info() {
    return {
      name: `medicine-painkiller`,
      label: `\u041E\u0431\u0435\u0437\u0431\u043E\u043B\u0438\u0432\u0430\u043D\u0438\u0435`,
      description: "\u0411\u043E\u043B\u0435\u0432\u044B\u0435 \u043E\u0449\u0443\u0449\u0435\u043D\u0438\u044F \u043F\u0440\u0438\u0442\u0443\u043F\u043B\u0435\u043D\u044B \u043E\u0431\u0435\u0437\u0431\u043E\u043B\u0438\u0432\u0430\u044E\u0449\u0438\u043C \u043F\u0440\u0435\u043F\u0430\u0440\u0430\u0442\u043E\u043C.",
      visible: Visibility.BUFF
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value;
    newValue -= 100 / (1 * 60 * 60);
    return clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Medicine/index.ts



;// CONCATENATED MODULE: ./server/Game/Statuses/index.ts





;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/Bleed.ts


class Bleed_Bleed extends (/* unused pure expression or super */ null && (PlayerStatus)) {
  get info() {
    return {
      name: `bleed`,
      label: `\u041A\u0440\u043E\u0432\u043E\u0442\u0435\u0447\u0435\u043D\u0438\u0435`,
      description: "\u0412\u044B \u0442\u0435\u0440\u044F\u0435\u0442\u0435 \u043A\u0440\u043E\u0432\u044C. \u041E\u0431\u0440\u0430\u0431\u043E\u0442\u0430\u0439\u0442\u0435 \u0440\u0430\u043D\u044B, \u0447\u0442\u043E\u0431\u044B \u0438\u0437\u0431\u0435\u0436\u0430\u0442\u044C \u0437\u0430\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u0438 \u0441\u043D\u0438\u0437\u0438\u0442\u044C \u043A\u0440\u043E\u0432\u043E\u043F\u043E\u0442\u0435\u0440\u044E.",
      visible: Visibility.BUFF
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value;
    newValue -= 100 / (10 * 60 * 60);
    return clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/BoneFracture.ts


class BoneFracture extends Game_PlayerStatus_PlayerStatus {
  constructor(player, limb, limbLabel) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }
  get info() {
    return {
      name: `trauma-fracture-${this.limb}`,
      label: `\u041F\u0435\u0440\u0435\u043B\u043E\u043C ${this.limbLabel}`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 10 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/Dislocation.ts


class Dislocation extends Game_PlayerStatus_PlayerStatus {
  constructor(player, limb, limbLabel) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }
  get info() {
    return {
      name: `trauma-dislocation-${this.limb}`,
      label: `\u0412\u044B\u0432\u0438\u0445 ${this.limbLabel}`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 5 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/Bruises.ts


class Bruises extends Game_PlayerStatus_PlayerStatus {
  constructor(player, limb, limbLabel) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }
  get info() {
    return {
      name: `trauma-bruises-${this.limb}`,
      label: `\u0423\u0448\u0438\u0431\u044B \u0438 \u0441\u0441\u0430\u0434\u0438\u043D\u044B ${this.limbLabel}`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 2 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/BrainConcussion.ts


class BrainConcussion extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: `trauma-concussion`,
      label: `\u0421\u043E\u0442\u0440\u044F\u0441\u0435\u043D\u0438\u0435 \u043C\u043E\u0437\u0433\u0430`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 10 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/Pain.ts


class Pain extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: `pain`,
      label: `\u0411\u043E\u043B\u044C`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    for (const [key, val] of Object.entries(values)) {
      if (val > 1) {
        if (key.startsWith("trauma-fracture-"))
          newValue += 0.7;
        if (key.startsWith("trauma-dislocation-"))
          newValue += 0.3;
        if (key.startsWith("trauma-bruises-"))
          newValue += 0.03;
      }
    }
    newValue -= 0.1;
    return Utils_clamp(newValue, 0, 100);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/KnifeCut.ts


class KnifeCut extends Game_PlayerStatus_PlayerStatus {
  constructor(player, limb, limbLabel) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }
  get info() {
    return {
      name: `trauma-knife-${this.limb}`,
      label: `\u041D\u043E\u0436\u0435\u0432\u043E\u0435 \u0440\u0430\u043D\u0435\u043D\u0438\u0435 ${this.limbLabel}`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    if (!value)
      return 0;
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 10 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/ShotBullet.ts


class ShotBullet extends Game_PlayerStatus_PlayerStatus {
  constructor(player, limb, limbLabel) {
    super(player);
    this.limb = limb;
    this.limbLabel = limbLabel;
  }
  get info() {
    return {
      name: `trauma-bullet-${this.limb}`,
      label: `\u041F\u0443\u043B\u0435\u0432\u043E\u0435 \u0440\u0430\u043D\u0435\u043D\u0438\u0435 ${this.limbLabel}`,
      description: "",
      visible: PlayerStatus_Visibility.NONE
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 10 * 60 * 60);
  }
}

;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/index.ts









;// CONCATENATED MODULE: ./server/Game/Statuses/Trauma/PainHigh.ts


class PainHigh extends Game_PlayerStatus_PlayerStatus {
  get info() {
    return {
      name: `pain-high`,
      label: `\u0421\u0438\u043B\u044C\u043D\u0430\u044F \u0431\u043E\u043B\u044C`,
      description: "\u0421\u043B\u0435\u0434\u0443\u0435\u0442 \u043E\u0431\u0440\u0430\u0442\u0438\u0442\u044C\u0441\u044F \u043A \u0432\u0440\u0430\u0447\u0443!",
      visible: PlayerStatus_Visibility.BUFF
    };
  }
  tick(value, values) {
    let newValue = value != null ? value : 0;
    if (values.pain > 80)
      newValue = 10;
    newValue -= 1;
    return Utils_clamp(newValue, 0, 10);
  }
}

;// CONCATENATED MODULE: ./server/Game/PlayerStatuses.ts







class PlayerStatuses {
  constructor(player) {
    this.statuses = {};
    this.values = {};
    this.player = player;
    this.player.state.set("status", {}, true);
    DB.Query("status/get", {identifier: player.identifier}).then((res) => {
      if (res.length > 0) {
        this.values = JSON.parse(res[0].value);
      }
    }).catch((err) => {
      console.error(err);
    });
    [Hunger, HungerLow, HungerHigh, Overeating, Thirst, ThirstHigh, Stress].forEach((St) => this.push(new St(player)));
    [Alcohol, AlcoholAddiction, Smoking, SmokingAddiction, Drugs, DrugsAddiction].forEach((St) => this.push(new St(player)));
    [Strength, Agility, Endurance, Intelligence].forEach((St) => this.push(new St(player)));
    const limbs = [
      ["larm", "\u043B\u0435\u0432\u043E\u0439 \u0440\u0443\u043A\u0438"],
      ["rarm", "\u043F\u0440\u0430\u0432\u043E\u0439 \u0440\u0443\u043A\u0438"],
      ["lleg", "\u043B\u0435\u0432\u043E\u0439 \u043D\u043E\u0433\u0438"],
      ["rleg", "\u043F\u0440\u0430\u0432\u043E\u0439 \u043D\u043E\u0433\u0438"]
    ];
    for (const [name, label] of limbs) {
      this.push(new BoneFracture(player, name, label));
      this.push(new Dislocation(player, name, label));
      this.push(new Bruises(player, name, label));
      this.push(new KnifeCut(player, name, label));
      this.push(new ShotBullet(player, name, label));
    }
    this.push(new KnifeCut(player, "torso", "\u0433\u0440\u0443\u0434\u043D\u043E\u0439 \u043A\u043B\u0435\u0442\u043A\u0438"));
    this.push(new ShotBullet(player, "torso", "\u0433\u0440\u0443\u0434\u043D\u043E\u0439 \u043A\u043B\u0435\u0442\u043A\u0438"));
    this.push(new ShotBullet(player, "head", "\u0448\u0435\u0438"));
    this.push(new BoneFracture(player, "torso", "\u0440\u0435\u0431\u0440\u0430"));
    this.push(new Bruises(player, "torso", "(\u0442\u043E\u0440\u0441)"));
    this.push(new Bruises(player, "head", "(\u0433\u043E\u043B\u043E\u0432\u0430)"));
    this.push(new BrainConcussion(player));
    this.push(new Pain(player));
    this.push(new PainHigh(player));
  }
  tick() {
    const buffs = {};
    const {health} = this.player.state;
    if (health !== void 0) {
      this.values.health = 1 + health;
    }
    Object.entries(this.statuses).forEach(([key, status], index) => {
      const value = status.tick(this.values[key], this.values);
      this.values[key] = value;
      const {info} = status;
      if (this.values[key] > 0 && info.visible == PlayerStatus_Visibility.BUFF) {
        buffs[info.name] = {startTime: index, label: info.label, description: info.description};
      }
    });
    this.player.state.set("status", this.values, true);
    if (JSON.stringify(this.player.state.buffs) != JSON.stringify(buffs)) {
      this.player.state.set("buffs", buffs, true);
    }
  }
  push(status) {
    this.statuses[status.info.name] = status;
  }
  add(name, amount) {
    if (amount < 0)
      throw new Error("negative value status amount");
    if (this.values[name] === void 0)
      throw new Error(`Unknown status: ${name}`);
    this.values[name] += amount;
  }
  sub(name, amount) {
    if (amount < 0)
      throw new Error("negative value status amount");
    if (this.values[name] === void 0)
      throw new Error(`Unknown status: ${name}`);
    this.values[name] -= amount;
  }
  set(name, amount) {
    if (amount < 0)
      throw new Error("negative value status amount");
    if (this.values[name] === void 0)
      throw new Error(`Unknown status: ${name}`);
    this.values[name] = amount;
  }
  start(name, ...args) {
    Utils_assert(this.values[name] !== void 0, `Unknown status: ${name}`);
    Utils_assert(this.statuses[name]);
    this.statuses[name].start(this.values, ...args);
  }
  stop(name, ...args) {
    Utils_assert(this.values[name] !== void 0, `Unknown status: ${name}`);
    Utils_assert(this.statuses[name]);
    this.statuses[name].stop(this.values, ...args);
  }
  get filteredValues() {
    const filteredValues = {};
    for (const [k, v] of Object.entries(this.values)) {
      if (v)
        filteredValues[k] = +v.toFixed(2);
    }
    return filteredValues;
  }
}
on("engine:status:add", (handle, name, amount) => {
  const player = Players.ByHandle(handle);
  Utils_assert(player);
  player.core.status.add(name, amount);
});
on("engine:status:sub", (handle, name, amount) => {
  const player = Players.ByHandle(handle);
  Utils_assert(player);
  player.core.status.sub(name, amount);
});
on("engine:status:set", (handle, name, amount) => {
  const player = Players.ByHandle(handle);
  Utils_assert(player);
  player.core.status.set(name, amount);
});
on("engine:status:start", (handle, name, ...args) => {
  const player = Players.ByHandle(handle);
  Utils_assert(player);
  player.core.status.start(name, ...args);
});
on("engine:status:stop", (handle, name, ...args) => {
  const player = Players.ByHandle(handle);
  Utils_assert(player);
  player.core.status.stop(name, ...args);
});

;// CONCATENATED MODULE: ./server/Game/CorePlayer.ts
var CorePlayer_defProp = Object.defineProperty;
var CorePlayer_getOwnPropSymbols = Object.getOwnPropertySymbols;
var CorePlayer_hasOwnProp = Object.prototype.hasOwnProperty;
var CorePlayer_propIsEnum = Object.prototype.propertyIsEnumerable;
var CorePlayer_defNormalProp = (obj, key, value) => key in obj ? CorePlayer_defProp(obj, key, {enumerable: true, configurable: true, writable: true, value}) : obj[key] = value;
var CorePlayer_spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (CorePlayer_hasOwnProp.call(b, prop))
      CorePlayer_defNormalProp(a, prop, b[prop]);
  if (CorePlayer_getOwnPropSymbols)
    for (var prop of CorePlayer_getOwnPropSymbols(b)) {
      if (CorePlayer_propIsEnum.call(b, prop))
        CorePlayer_defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var CorePlayer_async = (__this, __arguments, generator) => {
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







class CorePlayer {
  constructor(player) {
    this.lastCoords = null;
    player.state.set("identifier", player.identifier, true);
    if (!player.state.roles)
      player.state.roles = {};
    this.player = player;
    this.identity = new PlayerIdentity(player);
    this.money = new PlayerMoney_PlayerMoney(player);
    this.status = new PlayerStatuses(player);
  }
  get coords() {
    const c = this.player.state.coords;
    if (!c)
      return null;
    return Vector3_Vector3.FromArray(c);
  }
  set coords(value) {
    promiseTimeout(ClientCallback_ClientCallback.Trigger(this.player, "engine:teleport", value));
  }
  get health() {
    const ped = GetPlayerPed(`${this.player.handle}`);
    const health = GetEntityHealth(ped);
    if (health < 100)
      return 0;
    return health - 100;
  }
  set health(health) {
    promiseTimeout(ClientCallback_ClientCallback.Trigger(this.player, "engine:setHealth", health));
  }
  revive() {
    promiseTimeout(ClientCallback_ClientCallback.Trigger(this.player, "engine:revive"));
  }
}
Players.onJoin.subscribe((player) => {
  const cplayer = new CorePlayer(player);
  Object.assign(player, {
    core: cplayer
  });
  DB.Query("users/join", {identifier: player.identifier});
});
Players.onDrop.subscribe((player) => {
  DB.Query("users/drop", {identifier: player.identifier});
});
on("playerConnecting", function(name, setCallback, deferrals) {
  return CorePlayer_async(this, null, function* () {
    deferrals.defer();
    const playerHandle = source;
    yield Delay(100);
    const identifiers = getPlayerIdentifiers(String(playerHandle));
    getUniqueIdentifier(identifiers).then((identifier) => {
      Log.info("Player connecting", playerHandle, identifier, "success");
      deferrals.done();
    }).catch(() => {
      deferrals.done("Unable to load character! Cannot find proper identifier.");
    });
  });
});
setTick(() => CorePlayer_async(undefined, null, function* () {
  yield Delay(3e3);
  Players.All().forEach((player) => {
    const core = player.core;
    core.status.tick();
    const values = CorePlayer_spreadValues({}, core.status.values);
    Object.entries(values).forEach(([key, val]) => {
      values[key] = Math.floor(val * 10) / 10;
    });
    if (core.coords) {
      DB.Query("stats/player/set", {
        identifier: player.identifier,
        coords: core.coords.toArray(),
        status: JSON.stringify(core.status.filteredValues)
      });
    }
  });
}));
setTick(() => CorePlayer_async(undefined, null, function* () {
  yield Delay(6e4);
  Players.All().forEach((player) => {
    const core = player.core;
    DB.Query("status/set", {identifier: player.identifier, value: JSON.stringify(core.status.filteredValues)}).catch((err) => {
      console.error(err);
    });
  });
}));
DB.Query("users/drop", {});
Players.All().forEach((player) => {
  DB.Query("users/join", {identifier: player.identifier});
});

;// CONCATENATED MODULE: ./server/Game/CulledProp.ts
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
const _CulledProp = class {
  constructor(init) {
    this.cooldown = void 0;
    this.heading = 0;
    this.cullDistance = 200;
    this.registered = false;
    this.spawned = false;
    this.id = _CulledProp.GLOBAL_COUNTER;
    _CulledProp.GLOBAL_COUNTER += 1;
    if (init.coords)
      init.coords = Vector3_Vector3.FromObject(init.coords);
    Object.assign(this, init);
  }
  register() {
    this.registered = true;
    culledProps[this.id] = this;
    this.update();
  }
  serialize() {
    return {
      id: this.id,
      model: this.model,
      coords: this.coords,
      heading: this.heading,
      cullDistance: this.cullDistance,
      registered: this.registered,
      spawned: this.spawned
    };
  }
  update() {
    const serialized = this.serialize();
    emit("engineLib:CulledProp:update", serialized);
  }
  spawn() {
    this.spawned = true;
    this.update();
  }
  despawn() {
    this.spawned = false;
    this.update();
  }
  remove() {
    this.despawn();
    delete culledProps[this.id];
    emit("engineLib:CulledProp:remove", this.id);
  }
  tick() {
    if (this.cooldown !== void 0) {
      if (this.cooldown > 0) {
        this.cooldown -= 1;
      } else {
        this.cooldown = void 0;
        this.spawn();
      }
    }
  }
};
let CulledProp_CulledProp = _CulledProp;
CulledProp_CulledProp.GLOBAL_COUNTER = 1;
setTick(() => CulledProp_async(undefined, null, function* () {
  yield Delay(1e3);
  Object.values(culledProps).forEach((prop) => {
    prop.tick();
  });
}));
on("engineCore:CulledProp:register", (init, cb) => {
  const prop = new CulledProp_CulledProp(init);
  prop.register();
  cb(prop.id);
});
on("engineCore:CulledProp:spawn", (id) => {
  Utils_assert(culledProps[id], `unable to spawn culled prop ${id}`);
  culledProps[id].spawn();
});
on("engineCore:CulledProp:despawn", (id) => {
  Utils_assert(culledProps[id], `unable to despawn culled prop ${id}`);
  culledProps[id].despawn();
});
on("engineCore:CulledProp:remove", (id) => {
  Utils_assert(culledProps[id], `unable to remove culled prop ${id}`);
  culledProps[id].remove();
});
on("engineCore:CulledProp:update", (init) => {
  Utils_assert(init && init.id !== void 0);
  const {id} = init;
  Utils_assert(culledProps[id]);
  Object.assign(culledProps[id], init);
  culledProps[id].update();
});

;// CONCATENATED MODULE: ./server/Game/index.ts






;// CONCATENATED MODULE: ./server/Inventory/ItemTypes.ts
const ItemTypes = {};

;// CONCATENATED MODULE: ./server/Inventory/InventoryItem.ts



function tableContains(t1, t2) {
  if (typeof t1 == "number" && typeof t2 == "number") {
    if (Math.abs(t1 - t2) < 1e-7) {
      return true;
    }
  }
  if (typeof t1 != "object" || typeof t2 != "object") {
    return t1 == t2;
  }
  for (const [k, v] of Object.entries(t2)) {
    if (!tableContains(t1[k], t2[k])) {
      return false;
    }
  }
  return true;
}
class InventoryItem_InventoryItem {
  Duplicate() {
    const res = new InventoryItem_InventoryItem();
    for (const [k, v] of Object.entries(this)) {
      res[k] = v;
    }
    res.uid = null;
    return res;
  }
  Update() {
    const actions = {};
    actions.player = {};
    actions.container = {};
    actions.player.drop = {
      label: "\u0412\u044B\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      priority: 1
    };
    actions.container.drop = {
      label: "\u0412\u044B\u0431\u0440\u043E\u0441\u0438\u0442\u044C",
      priority: 1
    };
    this.actions = actions;
    const itemType = ItemTypes[this.category];
    if (itemType && itemType.getActions) {
      this.actions = itemType.getActions(this);
    }
    if (itemType && itemType.getDescription) {
      this.description = itemType.getDescription(this);
    }
    return this;
  }
  DBUpdatePos(pos) {
    var _a, _b;
    Utils_assert(this.uid);
    Utils_assert(pos);
    const res = DB.Query("inventoryitem/updatepos", {
      id: this.uid,
      x: (_a = pos.x) != null ? _a : 0,
      y: (_b = pos.y) != null ? _b : 0
    });
    if (res[1] != 200) {
      Log.error("Unable to update item pos!");
      Log.error(res);
      return false;
    }
    return true;
  }
  Match(query) {
    for (const [k, v] of Object.entries(query)) {
      if (k == "amount") {
        if (this[k] < v) {
          return false;
        }
      } else if (k == "actions") {
      } else if (typeof this[k] == "object" && typeof v == "object") {
        if (!tableContains(this[k], v)) {
          return false;
        }
      } else if (this[k] != v) {
        return false;
      }
    }
    return true;
  }
}

;// CONCATENATED MODULE: ./server/Inventory/Inventory.ts





const ItemMap = {};
const Inventories = [];
function GetItemExtra(item) {
  const extra = item.Duplicate();
  extra.actions = null;
  extra.uid = item.uid;
  return extra;
}
class InventoryCollision {
  constructor(inv) {
    this.inv = inv;
  }
  Get() {
    var _a, _b, _c, _d;
    const collision = [];
    for (let x = 1; x < this.inv.width; x += 1) {
      for (let y = 1; y < this.inv.height; y += 1) {
        if (!collision[x]) {
          collision[x] = [];
        }
        collision[x][y] = null;
      }
    }
    for (const item of Object.values(this.inv.items)) {
      const ix = (_a = item.x) != null ? _a : 0;
      const iy = (_b = item.y) != null ? _b : 0;
      let iw = (_c = item.width) != null ? _c : 1;
      let ih = (_d = item.height) != null ? _d : 1;
      if (this.inv.singleItem) {
        iw = 1;
        ih = 1;
      }
      for (let x = ix; x < ix + iw - 1; x += 1) {
        for (let y = iy; y < iy + ih - 1; y += 1) {
          if (collision[x + 1]) {
            collision[x + 1][y + 1] = item.uid;
          } else {
            Log.error(`Collision matrix out of bounds on item ${item.uid}`);
          }
        }
      }
    }
    return collision;
  }
  FindFittingArea(item) {
    var _a, _b;
    Utils_assert(item);
    const w = (_a = item.width) != null ? _a : 1;
    const h = (_b = item.height) != null ? _b : 1;
    if (!this.inv.areas) {
      return this.FindEmptyArea(w, h);
    }
    for (const area of Object.values(this.inv.areas)) {
      const itemsInArea = this.ItemsInArea(area.x, area.y, w, h);
      if (itemsInArea.length == 0) {
        if (!area.tags) {
          return [area.x, area.y];
        }
        if (area.tags) {
          for (const tag of area.tags) {
            if (item.category == tag || item.name == tag) {
              return [area.x, area.y];
            }
          }
        }
      }
    }
    return [null, null];
  }
  FindEmptyArea(w, h) {
    Utils_assert(w);
    Utils_assert(h);
    if (this.inv.singleItem) {
      w = 1;
      h = 1;
    }
    for (let ox = 0; this.inv.width - w; ox += 1) {
      for (let oy = 0; this.inv.height - h; oy += 1) {
        if (this.collision[ox + 1] && !this.collision[ox + 1][oy + 1]) {
          const itemsInArea = this.ItemsInArea(ox, oy, w, h);
          if (itemsInArea.length == 0) {
            return [ox, oy];
          }
        }
      }
    }
    return [null, null];
  }
  ItemsInArea(x, y, w, h) {
    Utils_assert(x);
    Utils_assert(y);
    Utils_assert(w);
    Utils_assert(h);
    if (this.inv.singleItem) {
      w = 1;
      h = 1;
    }
    const uids = {};
    for (let ox = x; ox < x + w - 1; ox += 1) {
      for (let oy = y; oy < y + h - 1; oy += 1) {
        const col = this.collision;
        if (col[ox + 1] && col[ox + 1][oy + 1]) {
          uids[col[ox + 1][oy + 1]] = true;
        }
      }
    }
    const arr = [];
    for (const k of Object.keys(uids)) {
      arr.push(k);
    }
    return arr;
  }
}
class Inventory_Inventory {
  constructor(category, identifier) {
    this.singleItem = false;
    this.nested = [];
    this.parent = null;
    this.areas = {};
    this.Collision = new InventoryCollision(this);
    this.category = category;
    this.identifier = identifier;
  }
  static LoadFromDB(category, identifier, extra = {}) {
    let res = DB.Query("inventory/get", {
      category,
      identifier
    });
    if (res[1] != 200) {
      return null;
    }
    const invs = res[2];
    if (invs.length == 0) {
      return null;
    }
    const inv = invs[0];
    const items = {};
    res = DB.Query("inventoryitem/getlist", {
      inventory_id: inv.id
    });
    const resitems = res[2];
    if (res[1] == 200) {
      for (const v of Object.values(resitems)) {
        items[v.id] = new InventoryItem_InventoryItem();
        items[v.id].extra = JSON.parse(v.extra);
        items[v.id].uid = v.id;
        items[v.id].amount = v.amount;
        items[v.id].template_id = v.item_id;
        items[v.id].Update();
      }
    }
    Inventories[category][identifier] = {
      id: inv.id,
      category,
      identifier,
      title: inv.title || "",
      maxWeight: inv.max_weight || 100,
      weight: inv.current_weight || 0,
      width: inv.width || 1,
      height: inv.height || 1,
      singleItem: inv.single_item || false,
      actionGroup: inv.action_group || "default",
      items,
      areas: JSON.parse(inv.areas) || {}
    };
    for (const [k, v] of Object.entries(extra)) {
      Inventories[category][identifier][k] = v;
    }
    for (const item of Object.values(items)) {
      const itemType = ItemTypes[item.category];
      if (itemType && itemType.onAdd) {
        itemType.onAdd(item, Inventories[category][identifier]);
      }
      ItemMap[item.uid] = Inventories[category][identifier];
    }
    Inventories[category][identifier].Update();
    return Inventories[category][identifier];
  }
  static Get(category, identifier) {
    Utils_assert(category);
    Utils_assert(identifier);
    if (!Inventories[category]) {
      Inventories[category] = {};
    }
    if (Inventories[category][identifier]) {
      return Inventories[category][identifier];
    }
    return Inventory_Inventory.LoadFromDB(category, identifier);
  }
  static GetByItemId(id) {
    return ItemMap[id];
  }
  static Create(category, identifier, replace = false, extra = {}) {
    if (!replace) {
      const prevInventory = Inventory_Inventory.Get(category, identifier);
      if (prevInventory) {
        return prevInventory;
      }
    }
    if (!Inventories[category]) {
      Inventories[category] = {};
    }
    const res = DB.Query("inventory/create", {
      category,
      identifier,
      title: extra.title || "",
      current_weight: 0,
      max_weight: extra.maxWeight || 100,
      width: extra.width || 0,
      height: extra.height || 0,
      single_item: extra.singleItem || false,
      action_group: extra.actionGroup || "default",
      areas: JSON.stringify(extra.areas) || "{}"
    });
    if (res[1] != 200) {
      Log.error(`Unable to create inventory ${category}/${identifier}`);
      Log.error(res[2]);
      return null;
    }
    return Inventory_Inventory.Get(category, identifier);
  }
  DBUpdateItem(item) {
    var _a, _b;
    Utils_assert(item);
    Utils_assert(item.uid);
    const extra = GetItemExtra(item);
    const res = DB.Query("inventoryitem/update", {
      id: item.uid,
      inventory_id: this.id,
      x: (_a = item.x) != null ? _a : 0,
      y: (_b = item.y) != null ? _b : 0,
      amount: item.amount,
      extra: JSON.stringify(extra)
    });
    if (res[1] != 200) {
      Log.error("Unable to update item!");
      Log.error(res);
      return false;
    }
    return true;
  }
  Update() {
    if (this.category == "player-inventory") {
      const player = Players.ByIdentifier(this.identifier);
      if (player) {
        player.state["money:cash"] = this.cash;
      }
    }
    const nestedInvs = this.GetNested();
    this.nested.forEach((inv) => {
      inv.parent = null;
    });
    this.nested = [];
    for (const nestedInv of Object.values(nestedInvs)) {
      this.nested.push(nestedInv);
      nestedInv.parent = this;
    }
    if (this.parent) {
      this.parent.Update();
    }
    DB.Query("inventory/update", {
      category: this.category,
      identifier: this.identifier,
      current_weight: this.weight,
      max_weight: this.maxWeight
    });
    TriggerClientEvent("inventory:updateInventory", -1, this);
    TriggerEvent("inventory:onInventoryUpdate", this);
    return true;
  }
  Search(query) {
    const res = {};
    for (const [uid, item] of Object.entries(this.items)) {
      if (item.Match(query)) {
        res[uid] = item;
      }
    }
    return res;
  }
  SearchWithNested(query) {
    const res = this.Search(query);
    const nestedInvs = this.GetNested();
    for (const ninv of Object.values(nestedInvs)) {
      const items = ninv.Search(query);
      for (const [a, b] of Object.entries(items)) {
        res[a] = b;
      }
    }
    return res;
  }
  SearchFirst(query) {
    Utils_assert(query);
    for (const item of Object.values(this.items)) {
      if (item.Match(query)) {
        return item;
      }
    }
    return null;
  }
  GetNested() {
    const res = {};
    if (this.category == "player-inventory") {
      for (const item of Object.values(this.items)) {
        if (item.extra && typeof item.extra == "object" && item.extra.inventory) {
          const itemInv = Inventory_Inventory.Get(`item-${item.name}`, item.extra.inventory);
          if (itemInv) {
            res[itemInv.id] = itemInv;
          }
        }
      }
    }
    return res;
  }
  SetItemPos(itemUid, pos) {
    Utils_assert(itemUid);
    Utils_assert(pos);
    const item = this.items[itemUid];
    if (!item) {
      return [false, `Item with uid '${itemUid}' not found`];
    }
    item.x = pos.x;
    item.y = pos.y;
    this.UpdateItem(item);
    return [true, null];
  }
  AddItem(item, amount, silent = false, autoStack = true) {
    Utils_assert(item);
    Utils_assert(amount);
    if (amount < 0) {
      return null;
    }
    if (this.maxWeight && this.weight + amount * (item.weight || 0) > this.maxWeight) {
      return null;
    }
    let olditem = null;
    if (item.uid) {
      olditem = this.items[item.uid];
    }
    if (autoStack && !olditem) {
      olditem = this.SearchFirst({name: item.name, extra: item.extra});
    }
    if (olditem) {
      this.items[olditem.uid].amount += amount;
      this.DBUpdateItem(this.items[olditem.uid]);
    } else {
      item.amount = amount;
      const extra = GetItemExtra(item);
      item.width = item.width || 1;
      item.height = item.height || 1;
      if (item.x == null || item.y == null || this.Collision.ItemsInArea(item.x, item.y, item.width, item.height).length > 0) {
        const [x, y] = this.Collision.FindFittingArea(item);
        item.x = x;
        item.y = y;
        if (item.x == null || item.y == null) {
          return null;
        }
      }
      const res = DB.Query("inventoryitem/create", {
        item_id: item.template_id,
        inventory_id: this.id,
        x: item.x || 0,
        y: item.y || 0,
        amount: item.amount,
        extra: JSON.stringify(extra)
      });
      if (res[1] != 200) {
        Log.error(`Unable to add item! ${res}`);
        return null;
      }
      const itemResponse = res[2];
      if (itemResponse) {
        item.uid = itemResponse.id;
        ItemMap[item.uid] = this;
        const itemType = ItemTypes[item.category];
        if (itemType && itemType.onAdd) {
          itemType.onAdd(item, this);
        }
      } else {
        Log.error(`Incorrect item response: ${res[2]}`);
      }
      Utils_assert(item.uid);
      this.items[item.uid] = item;
    }
    this.Update();
    TriggerClientEvent("inventory:onItemAdd", -1, this, item, amount, silent || false);
    return item;
  }
  RemoveItem(query, amount, silent = false) {
    Utils_assert(query);
    Utils_assert(amount == null || amount > 0);
    const item = this.SearchFirst(query);
    if (!item || !item.uid || !this.items[item.uid]) {
      return false;
    }
    if (amount > 0 && item.amount > amount) {
      item.amount -= amount;
      this.DBUpdateItem(item);
    } else if (!amount || amount && item.amount == amount) {
      DB.Query("inventoryitem/delete", {
        inventory_id: this.id,
        id: item.uid
      });
      ItemMap[item.uid] = null;
      this.items[item.uid] = null;
    } else {
      return false;
    }
    this.Update();
    TriggerClientEvent("inventory:onItemRemove", -1, this, item, amount, silent || false);
    return true;
  }
  TransferItem(query, amount = 1, inv2, silent = false, position) {
    var _a;
    Utils_assert(query);
    Utils_assert(amount == null || amount > 0);
    Utils_assert(inv2);
    const item = this.SearchFirst(query);
    if (!item || !item.uid) {
      return false;
    }
    if (inv2.maxWeight && inv2.weight + amount * ((_a = item.weight) != null ? _a : 0) > inv2.maxWeight) {
      return false;
    }
    if (item.extra && typeof item.extra == "object" && item.extra.inventory) {
      const nestedInv = Inventory_Inventory.Get(`item-${item.category}`, item.extra.inventory);
      if (nestedInv.id == inv2.id) {
        return false;
      }
    }
    if (!position || position.x == null || position.y == null) {
      const [itemx, itemy] = inv2.Collision.FindFittingArea(item);
      if (itemx == null || itemy == null) {
        return false;
      }
      item.x = itemx;
      item.y = itemy;
    } else {
      item.x = position.x;
      item.y = position.y;
    }
    this.items[item.uid] = null;
    inv2.items[item.uid] = item;
    ItemMap[item.uid] = inv2;
    ItemMap[item.uid] = Inventories[inv2.category][inv2.identifier];
    inv2.UpdateItem(item);
    this.Update();
    let parentBagInv = ItemMap[+this.identifier];
    if (parentBagInv) {
      parentBagInv = Inventory_Inventory.Get(parentBagInv.category, parentBagInv.identifier);
      const parentBagItem = parentBagInv.SearchFirst({uid: +this.identifier});
      if (parentBagItem) {
        parentBagItem.weight = 0.5 + this.weight;
        this.UpdateItem(parentBagInv, parentBagItem);
      }
    }
    TriggerClientEvent("inventory:onItemRemove", -1, this, item, amount, silent || false);
    TriggerClientEvent("inventory:onItemAdd", -1, inv2, item, amount, silent || false);
    return true;
  }
  UpdateItem(item, silent = false) {
    Utils_assert(item);
    if (!item || !this.items[item.uid]) {
      return false;
    }
    item = item.Update();
    this.items[item.uid] = item;
    this.DBUpdateItem(item);
    this.Update();
    TriggerClientEvent("inventory:onItemUpdate", -1, this, item, silent);
    return true;
  }
  static MergeItems(player, inv1, item1, inv2, item2) {
    Utils_assert(player);
    Utils_assert(inv1);
    Utils_assert(item1);
    Utils_assert(inv2);
    Utils_assert(item2);
    const itemType = ItemTypes[item1.category];
    if (itemType && itemType.merge) {
      return itemType.merge(player, inv1, item1, inv2, item2);
    }
    return ItemTypes.custom.merge(player, inv1, item1, inv2, item2);
  }
  RunItemAction(player, query, action_name) {
    Utils_assert(player);
    Utils_assert(query);
    Utils_assert(action_name);
    if (!action_name) {
      Log.error("action_name is null");
      return false;
    }
    const item = this.SearchFirst(query);
    if (!item) {
      return false;
    }
    const actions = item.actions[this.actionGroup || this.category];
    if (!actions || !actions[action_name]) {
      Log.error(`Action "${action_name}" for (category "${this.category}" not found!`);
      return false;
    }
    const action = actions[action_name];
    if (action.action) {
      TriggerEvent(action.action, player, this, item);
    }
    const itemType = ItemTypes[item.category];
    if (itemType && itemType.getActions) {
      item.actions = itemType.getActions(item);
    }
    if (itemType && itemType.getDescription) {
      item.description = itemType.getDescription(item);
    }
    return true;
  }
  GetWeight() {
    let weight = 0;
    for (const item of Object.values(this.items)) {
      weight += (item.weight || 0) * item.amount;
    }
    return weight;
  }
}

;// CONCATENATED MODULE: ./server/Inventory/index.ts



;// CONCATENATED MODULE: ./server/index.ts






console.log("SERVER CORE IS STARTING!");
const cmd = new Command("test", (player) => {
  console.log("AAA");
  const inv = new Inventory_Inventory("abc", "def");
  inv.Update();
  console.log("BBB");
});

/******/ })()
;