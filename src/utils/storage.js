var StorageType;
(function (StorageType) {
  StorageType[(StorageType["LOCAL"] = 0)] = "LOCAL";
  StorageType[(StorageType["SESSION"] = 1)] = "SESSION";
})(StorageType || (StorageType = {}));
var StorageAction;
(function (StorageAction) {
  StorageAction[(StorageAction["SET"] = 0)] = "SET";
  StorageAction[(StorageAction["GET"] = 1)] = "GET";
  StorageAction[(StorageAction["REMOVE"] = 2)] = "REMOVE";
  StorageAction[(StorageAction["CLEAR"] = 3)] = "CLEAR";
  StorageAction[(StorageAction["CHECK"] = 4)] = "CHECK";
  StorageAction[(StorageAction["EXPIRED"] = 5)] = "EXPIRED";
})(StorageAction || (StorageAction = {}));

// interface StorageValue { value: string, expired: number }

// type StorageKey = string;
const systemKeys = {};

// 时间单位
export const timeUnitsMap = Object.freeze({
  YEAR: "y",
  QUARTER: "Q",
  MONTH: "M",
  WEAK: "w",
  DAY: "d",
  HOUR: "h",
  MINUTE: "m",
  SECONDS: "s",
  MILLISECONDS: "ms",
});

export const setDebug = (debug) => {
  if (typeof debug === "boolean") {
    Storage.getInstance().debug = debug;
  }
};

export const setSystemKeys = (keys = []) => {
  systemKeys.length = 0;
  if (!Array.isArray(keys)) return false;

  keys.forEach((item) => {
    if (typeof item === "string" && item) systemKeys[item] = item;
  });
};

export const setPrefix = (prefix = "") => {
  Storage.getInstance().prefix =
    typeof prefix === "string" && prefix ? prefix : "sjc";
};

class Storage {
  constructor() {
    this.prefix = "sjc";
    this.type = StorageType.LOCAL;
    // this.debug = !process && process.env.NODE_ENV !== 'production';
    StorageType.SESSION;
  }

  static getInstance() {
    if (!this._instance) {
      this._instance = new Storage();
    }
    return this._instance;
  }

  local() {
    this.type = StorageType.LOCAL;
    return this;
  }

  session() {
    this.type = StorageType.SESSION;
    return this;
  }

  get(key) {
    if (!this._checkKey(key)) return this._reset(null);

    const value = JSON.parse(
      this._getEntity().getItem(this._getFullKey(key)) || "null"
    );

    if (!value || value.value === null || value.value === undefined) {
      return this._reset(null);
    }

    if (!this._isExpired(value.expired)) {
      return this._reset(value.value);
    }
    this._debugInfo(key, StorageAction.EXPIRED);
    this.remove(key);
    return this._reset(null);
  }

  set(key, value, expired = []) {
    if (!this._checkKey(key)) return this._reset(false);

    const expiredTime = this._expiredTime(expired[0], expired[1]);
    const finalValue = {
      value,
      expired: expiredTime,
    };

    this._debugInfo(key, StorageAction.SET);

    this._getEntity().setItem(
      this._getFullKey(key),
      JSON.stringify(finalValue)
    );
    return this._reset(true);
  }

  remove(key) {
    if (!this._checkKey(key)) return this._reset(false);
    this._getEntity().removeItem(this._getFullKey(key));
    this._reset(true);
  }

  clear() {
    this._getEntity().clear();
    this._reset(true);
  }

  /**
   * 设置值，此方法只能设置系统枚举的键
   * @param key
   * @param value
   * @param expired
   * @returns
   */
  safeSet(key, value, expired) {
    if (systemKeys[key]) return this._reset(false);
    return this.set(key, value, expired);
  }

  safeGet(key) {
    if (systemKeys[key]) return this._reset(null);
    return this.get(key);
  }

  safeRemove(key) {
    if (systemKeys[key]) return this._reset(false);
    return this.remove(key);
  }

  _reset(result) {
    this.type = StorageType.LOCAL;
    return result;
  }

  _getEntity() {
    return this.type === StorageType.SESSION
      ? window.sessionStorage
      : window.localStorage;
  }

  /**
   * 处理过期时间
   * @param {number} time
   * @param {string} unit（年y、季度Q、月M、周w、天d、小时h、分钟m、秒s、毫秒ms）
   * @returns
   */
  _resolveExpiredTime(time = 0, unit) {
    const unitList = Object.values(timeUnitsMap);
    if (!unitList.includes(unit)) {
      console.info(
        "时间单位错误，仅支持[年y、季度Q、月M、周w、天d、小时h、分钟m、秒s、毫秒ms]"
      );
    }
    let now = new Date();
    switch (unit) {
      case "y":
        now.setFullYear(now.getFullYear() + time);
        break;
      case "M":
        now.setMonth(now.getMonth() + time);
        break;
      case "Q":
        now.setMonth(now.getMonth() + time * 3);
        break;
      case "w":
        now.setDate(now.getDate() + time * 7);
        break;
      case "d":
        now.setDate(now.getDate() + time);
        break;
      case "h":
        now.setHours(now.getHours() + time);
        break;
      case "m":
        now.setMinutes(now.getMinutes() + time);
        break;
      case "s":
        now.setSeconds(now.getSeconds() + time);
        break;
      case "ms":
        now.setMilliseconds(now.getMilliseconds() + time);
        break;
      default:
        break;
    }
    return now;
  }

  /**
   * 生成过期时间
   * @param time
   * @param unit
   * @returns
   */
  _expiredTime(time, unit) {
    if (!time || !unit) return 0;

    const now = new Date();
    let tmpTime;

    if (!unit) {
      tmpTime = new Date(time);
    }

    if (typeof time === "number") {
      tmpTime = this._resolveExpiredTime(time, unit);
    }

    if (tmpTime && tmpTime instanceof Date && tmpTime > now) {
      return parseInt(tmpTime.getTime(), 10);
    }
    return 0;
  }

  /**
   * 检查是否过期
   * @param expiredTime
   * @returns
   */
  _isExpired(expiredTime) {
    if (!expiredTime) return false;

    let expiredMoment = new Date(expiredTime);

    if (!expiredMoment instanceof Date) return false;

    return expiredMoment < new Date();
  }

  _debugInfo(key, action) {
    if (!storage.debug) return true;
    const type = StorageType[this.type];
    switch (action) {
      case StorageAction.CHECK:
        break;
      case StorageAction.SET:
        console.info(
          `${type}--[${key}]存储成功---------------------------`
        );
        break;
      case StorageAction.GET:
        console.info(
          `${type}--[${key}]取值成功---------------------------`
        );
        break;
      case StorageAction.REMOVE:
        console.info(
          `${type}--[${key}]移除成功---------------------------`
        );
        break;
      case StorageAction.CLEAR:
        console.info(`${type}--全部清除成功---------------------------`);
        break;
      case StorageAction.EXPIRED:
        console.info(`${type}--[${key}]已过期---------------------------`);
        break;
    }

    return true;
  }

  _checkKey(key) {
    if (typeof key !== "string" || !key) return false;
    return !!key;
  }

  _getFullKey(key) {
    return `${this.prefix}__${key}`;
  }
}

export const storage = Storage.getInstance();
