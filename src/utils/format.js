import { DataType } from './type';
import { windowWidth, windowHeight } from './dom';

export function addUnit(value) {
  if (!DataType.isNullOrUnDef(value)) {
    return DataType.isNumeric(value) ? `${value}px` : String(value);
  }
  return undefined;
}

export function getSizeStyle(
  originSize
) {
  if (!DataType.isNullOrUnDef(originSize)) {
    if (DataType.isArray(originSize)) {
      return {
        width: addUnit(originSize[0]),
        height: addUnit(originSize[1]),
      };
    }
    const size = addUnit(originSize);
    return {
      width: size,
      height: size,
    };
  }
}

export function getZIndexStyle(zIndex) {
  const style = {};
  if (zIndex !== undefined) {
    style.zIndex = +zIndex;
  }
  return style;
}

// cache
let rootFontSize;

function getRootFontSize() {
  if (!rootFontSize) {
    const doc = document.documentElement;
    const fontSize =
      doc.style.fontSize || window.getComputedStyle(doc).fontSize;

    rootFontSize = parseFloat(fontSize);
  }

  return rootFontSize;
}

function convertRem(value) {
  value = value.replace(/rem/g, '');
  return +value * getRootFontSize();
}

function convertVw(value) {
  value = value.replace(/vw/g, '');
  return (+value * windowWidth.value) / 100;
}

function convertVh(value) {
  value = value.replace(/vh/g, '');
  return (+value * windowHeight.value) / 100;
}

export function unitToPx(value) {
  if (DataType.isNumber(value)) {
    return value;
  }

  if (DataType.isClient) {
    if (value.includes('rem')) {
      return convertRem(value);
    }
    if (value.includes('vw')) {
      return convertVw(value);
    }
    if (value.includes('vh')) {
      return convertVh(value);
    }
  }

  return parseFloat(value);
}

const camelizeRE = /-(\w)/g;

export const camelize = (str) =>
  str.replace(camelizeRE, (_, c) => c.toUpperCase());

export const kebabCase = (str) =>
  str
    .replace(/([A-Z])/g, '-$1')
    .toLowerCase()
    .replace(/^-/, '');

export function padZero(num, targetLength = 2) {
  let str = num + '';

  while (str.length < targetLength) {
    str = '0' + str;
  }

  return str;
}

/** clamps number within the inclusive lower and upper bounds */
export const clamp = (num, min, max) =>
  Math.min(Math.max(num, min), max);

function trimExtraChar(value, char, regExp) {
  const index = value.indexOf(char);

  if (index === -1) {
    return value;
  }

  if (char === '-' && index !== 0) {
    return value.slice(0, index);
  }

  return value.slice(0, index + 1) + value.slice(index).replace(regExp, '');
}

export function formatNumber(
  value,
  allowDot = true,
  allowMinus = true
) {
  if (allowDot) {
    value = trimExtraChar(value, '.', /\./g);
  } else {
    value = value.split('.')[0];
  }

  if (allowMinus) {
    value = trimExtraChar(value, '-', /-/g);
  } else {
    value = value.replace(/-/, '');
  }

  const regExp = allowDot ? /[^-0-9.]/g : /[^-0-9]/g;

  return value.replace(regExp, '');
}

// add num and avoid float number
export function addNumber(num1, num2) {
  const cardinal = 10 ** 10;
  return Math.round((num1 + num2) * cardinal) / cardinal;
}
