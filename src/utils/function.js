import { DataType } from "./type";
import { camelize } from "./format";

/**
 * @desc 函数防抖
 * @param {Function} func 目标函数
 * @param { number} wait 延迟执行毫秒数
 * @param { boolean } immediate true - 立即执行， false - 延迟执行
 */
export function debounce(func, wait = 300, options) {
  function isObject(value) {
    const type = typeof value;
    return value != null && (type === "object" || type === "function");
  }
  let root = window;
  let lastArgs, lastThis, maxWait, result, timerId, lastCallTime;

  let lastInvokeTime = 0;
  let leading = true; // 在延迟开始前调用
  let maxing = false; // 允许被延迟的最大值
  let trailing = false; // 在延迟结束后调用

  // Bypass `requestAnimationFrame` by explicitly setting `wait=0`.
  const useRAF =
    !wait && wait !== 0 && typeof root.requestAnimationFrame === "function";

  if (typeof func !== "function") {
    throw new TypeError("Expected a function");
  }
  wait = +wait || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = "maxWait" in options;
    maxWait = maxing ? Math.max(+options.maxWait || 0, wait) : maxWait;
    trailing = "trailing" in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    const args = lastArgs;
    const thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function startTimer(pendingFunc, wait) {
    if (useRAF) {
      root.cancelAnimationFrame(timerId);
      return root.requestAnimationFrame(pendingFunc);
    }
    return setTimeout(pendingFunc, wait);
  }

  function cancelTimer(id) {
    if (useRAF) {
      return root.cancelAnimationFrame(id);
    }
    clearTimeout(id);
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = startTimer(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;
    const timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? Math.min(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    const timeSinceLastCall = time - lastCallTime;
    const timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (
      lastCallTime === undefined ||
      timeSinceLastCall >= wait ||
      timeSinceLastCall < 0 ||
      (maxing && timeSinceLastInvoke >= maxWait)
    );
  }

  function timerExpired() {
    const time = Date.now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = startTimer(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      cancelTimer(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(Date.now());
  }

  function pending() {
    return timerId !== undefined;
  }

  function debounced(...args) {
    const time = Date.now();
    const isInvoking = shouldInvoke(time);

    lastArgs = args;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = startTimer(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = startTimer(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  debounced.pending = pending;
  return debounced;
}

/**
 * 深拷贝
 * @param {*} obj
 */

export function deepClone(obj) {
  if (!DataType.isNullOrUnDef(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  if (DataType.isObject(obj)) {
    const to = {};
    Object.keys(obj).forEach((key) => {
      to[key] = deepClone(obj[key]);
    });

    return to;
  }

  return obj;
}

/**
 * 延迟加载方法
 * @param {Function} fn
 * @param {number} time
 */
export function submitTimeOut(fn, time) {
  setTimeout(function () {
    fn();
  }, time);
}

/**
 * 函数节流
 * @param {Function} fn
 * @param {number} interval
 */
export function throttle(fn, delay = 300) {
  let timer;
  let enable = true;
  return function (...args) {
    if (!enable) return;
    enable = false;
    fn.apply(this, args);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => (enable = true), delay);
  };
}

/**
 * @func get
 * @desc 对象取值，支持多级取值，模拟点语法
 * @param {Record<string, any>} obj 源对象
 * @param {string} props 取值路径
 * @param {unknown} def 默认值
 * @return {}
 * @Author: 张玉石
 * @Date: 2022-07-20
 * @LastEditTime: 2022-07-20
 * @LastEditors: 张玉石
 */
export function get(obj, props, def) {
  if (obj == null || obj == null || typeof props !== "string") return def;
  const temp = props.split(".");
  const fieldArr = [].concat(temp);
  temp.forEach((e, i) => {
    if (/^(\w+)\[(\w+)\]$/.test(e)) {
      const matchs = e.match(/^(\w+)\[(\w+)\]$/);
      const field1 = matchs[1];
      const field2 = matchs[2];
      const index = fieldArr.indexOf(e);
      fieldArr.splice(index, 1, field1, field2);
    }
  });
  return fieldArr.reduce((pre, cur) => {
    const target = pre[cur] || def;
    if (target instanceof Array) {
      return [].concat(target);
    }
    if (target instanceof Object) {
      return Object.assign({}, target);
    }
    return target;
  }, obj);
}

export const logError = () => {
  throw new Error("Missing parameter!");
};

/**
 * @desc validate form
 * @param {Record<string, any>} schema
 * @param {Record<string, any>} values
 * @return {Boolean} 是否通过验证
 */
export const validate = (schema, values) => {
  for (const field in schema) {
    if (schema[field].required) {
      if (!values[field]) {
        return false;
      }
    }
  }
  return true;
};

/**
 * @desc 复制到剪贴板(Copy)
 * @param {string} text
 * @returns
 */
export const copyToClipboard = (text) => navigator.clipboard.writeText(text);

// 创建guid
export function generateID() {
  const randomNum = (n) => {
    let t = "";
    for (let i = 0; i < n; i++) {
      t += Math.floor(Math.random() * 10);
    }
    return t;
  };
  return Date.now().toString() + randomNum(5);
}

// 为组件添加install方法
export function withInstall(options) {
  options.install = (Vue) => {
    const { name } = options;
    if (name) {
      Vue.component(name, options);
      Vue.component(camelize(`-${name}`), options);
    }
  };

  return options;
}

const { hasOwnProperty } = Object.prototype;

function assignKey(to, from, key) {
  const val = from[key];

  if (DataType.isNullOrUnDef(val)) {
    return;
  }

  if (!hasOwnProperty.call(to, key) || !DataType.isObject(val)) {
    to[key] = val;
  } else {
    // eslint-disable-next-line no-use-before-define
    to[key] = deepAssign(Object(to[key]), val);
  }
}

// 深合并对象
export function deepAssign(to, from) {
  Object.keys(from).forEach((key) => {
    assignKey(to, from, key);
  });

  return to;
}

/**
 * @desc 在对象中剔除指定的属性
 * @param {*} obj 对象
 * @param {*} uselessKeys 剔除的属性
 * @returns
 */
export const omit = (obj, uselessKeys) => {
  const resolveObject = Object.keys(obj).reduce((acc, key) => {
    return uselessKeys.includes(key) ? acc : { ...acc, [key]: obj[key] };
  }, {});
  return resolveObject;
};

/**
 * @desc 在对象中挑选出指定的属性
 * @param {*} obj 对象
 * @param {string[]} keys 需要挑选的属性
 * @returns
 */
export function pick(obj, keys) {
  if (!(keys instanceof Array) || keys.length === 0) return;
  let returnObj = {};
  keys.forEach((item) => {
    if (obj.hasOwnProperty(item)) returnObj[item] = obj[item];
  });
  return returnObj;
}
export const noop = () => {};
export const no = () => false;
