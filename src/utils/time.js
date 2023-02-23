/**
 * @author zys
 * @time 2023.02.21
 * @description 时间操作方法
 */
import dayJs from "dayjs";
import { _timeUnit } from "../config/constants";

export class Time {
  /**
   * 时间类实例化
   * @param {*} date 时间
   * @param {*} format 格式
   */
  constructor(date = null, format = null) {
    this.__date__ = this.dayjs(date);
    this.__format__ = format;
  }

  /**
   * 将时间格式转化为dayjs格式
   * @param {*} date 时间
   */
  dayjs(date) {
    this.__date__ = dayJs(date);
    return this.__date__;
  }

  /**
   * 格式化时间
   * @param {String} format 格式
   */
  format(format) {
    return this.__date__?.format?.(format);
  }

  /**
   * 时间相加
   * @param {*} num 要加的时间
   * @param {*} unit 要加的时间的单位
   */
  add(num, unit = _timeUnit.Second) {
    return this.__date__?.add?.(num, unit);
  }

  /**
   * 时间相减
   * @param {*} num 要加的时间
   * @param {*} unit 要加的时间的单位
   */
  subtract(num, unit = _timeUnit.Second) {
    return this.__date__?.subtract?.(num, unit);
  }

  /**
   * 时间比较，是否之前
   * @param {*} endDate 结束时间
   * @param {*} unit 时间单位默认秒
   */
  isBefore(endDate, unit = _timeUnit.Second) {
    return this.__date__.isBefore(endDate, unit);
  }

  /**
   * 计算时差
   * @param {*} endDate 结束时间
   * @param {*} unit 时间单位默认秒
   */
  diff(endDate, unit = _timeUnit.Second) {
    return this.__date__.diff(endDate, unit);
  }

  /**
   * @name 静态时间格式化
   * @param {Date} date 时间
   * @param {String} format 格式，默认YYYY-MM-DD
   */
  static quickFormat(date, format = "YYYY-MM-DD") {
    return dayJs(date).format(format);
  }

  /**
   * @name 初始化时间为dayjs格式
   * @param {Date} date 时间
   */
  static init(date) {
    return dayJs(date);
  }
}
