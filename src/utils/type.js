/**
 * @author zys
 * @description 类型检查基础类
 * @time 2023.02.13
 */

const toString = Object.prototype.toString;

function is(value, type) {
    return toString.call(value) === `[object ${type}]`;
}
export class DataType {
  static isServer = typeof window === 'undefined';

  static isClient = !DataType.isServer;

    /**
     * @method 检测当前目标是否为对象
     * @param {*} item
     */
    static isObject(item) {
        return item !== null && is(item, 'Object');
    }

    /**
     * @method 检测当前目标是否为空对象
     * @param {*} item
     */
    static isEmptyObject(item) {
        return this.isObject(item) && Object.keys(item).length === 0;
    }

    /**
     * @method 检测当前目标是否为数组
     * @param {*} item
     */
    static isArray(item) {
        return Array.isArray(item);
    }

    /**
     * @method 检测当前目标是否为空数组
     * @param {*} item
     */
    static isEmptyArray(item) {
        return this.isArray(item) && item.length === 0;
    }

    /**
     * @method 检测当前目标是否为string类型
     * @param {*} value
     */
    static isString(value) {
        return is(value, 'String');
    }

    /**
     * @method 检测当前目标是否为Boolean类型
     * @param {*} value
     */
    static isBoolean(value) {
        return is(value, 'Boolean');
    }

    /**
     * @method 检测当前目标是否为RegExp类型
     * @param {*} value
     */
    static isRegExp(value) {
        return is(value, 'RegExp');
    }

    /**
     * @method 检测当前目标是否为defined类型
     * @param {*} value
     */
    static isDefined(value) {
        return typeof value !== 'undefined';
    }

    /**
     * @method 检测当前目标是否为defined类型
     * @param {*} value
     */
    static isUndefined(value) {
        return !this.isDefined(value);
    }

    /**
     * @method 检测当前目标是否为空值
     * @param {*} value
     */
    static isEmpty(value) {
        if (DataType.isArray(value) || DataType.isString(value)) {
            return value.length === 0;
        }

        if (value instanceof Map || value instanceof Set) {
            return value.size === 0;
        }

        if (DataType.isObject(value)) {
            return Object.keys(value).length === 0;
        }

        return false;
    }

    /**
     * @method 检测当前目标是否为Date类型
     * @param {*} value
     */
    static isDate(value) {
        return is(value, 'Date');
    }

    /**
     * @method 检测当前目标是否为Null
     * @param {*} value
     */
    static isNull(value) {
        return value === null;
    }

    /**
     * @method 检测当前目标是否为NullAndUnDef
     * @param {*} value
     */
    static isNullAndUnDef(value) {
        return DataType.isUndefined(value) && DataType.isNull(value);
    }

    /**
     * @method 检测当前目标是否为NullOrUnDef
     * @param {*} value
     */
    static isNullOrUnDef(value) {
        return DataType.isUndefined(value) || DataType.isNull(value);
    }

    /**
     * @method 检测当前目标是否为Number
     * @param {*} value
     */
    static isNumber(value) {
        return is(value, 'Number');
    }

    /**
     * @method 检测当前目标是否为Numeric
     * @param {*} value
     */
    static isNumeric(value) {
        return DataType.isNumber(value) || /^\d+(\.\d+)?$/.test(value);
    }

    /**
     * @method 检测当前目标是否为函数
     * @param {*} value
     */
    static isFunction(value) {
        return is(value, 'function');
    }

    /**
     * @method 检测当前目标是否为Promise
     * @param {*} value
     */
    static isPromise(value) {
        return is(value, 'Promise') && this.isObject(value) && this.isFunction(value.then) && this.isFunction(value.catch);
    }

    /**
     * @method 检测当前目标是否为Element
     * @param {*} value
     */
    static isElement(value) {
        return this.isObject(value) && !!value.tagName;
    }

    /**
     * @method 检测当前目标是否为Map
     * @param {*} value
     */
    static isMap(value) {
        return is(value, 'Map');
    }

    /**
     * @method 检测当前目标是否为Url
     * @param {*} value
     */
    static isUrl(value) {
        const reg =
            /(((^https?:(?:\/\/)?)(?:[-:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&%@.\w_]*)#?(?:[\w]*))?)$/;
        return reg.test(value);
    }
}
