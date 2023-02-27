import { DataType } from "./type";
export function isMobilePhone(phone) {
  if (DataType.isNull(phone)) {
    return false;
  }
  return /^1[3|4|5|6|7|8|9][0-9]\d{8}$/.test(phone);
}

// 手机号脱敏
export function hiddenPhone(telephone) {
  if (!DataType.isNull(telephone) && isMobilePhone(telephone)) {
    const prefix = telephone.slice(0, 3);
    const suffix = telephone.slice(7, 11);
    return prefix + "****" + suffix;
  } else {
    return "";
  }
}

//银行卡号脱敏 身份证
export function hiddenCarNo(carNo, start, end) {
  if (!DataType.isNull(carNo)) {
    let num = "";
    let endNum = carNo.slice(carNo.length - end, carNo.length);
    if (start == 0) {
      num = "***************";
      return num + " " + endNum;
    } else {
      const first = carNo.slice(0, start);
      var center = " ******** ";
      // for (var i = 0; i < carNo.length - start; i++) {
      //     center += '*'
      // }

      return first + " " + center + " " + endNum;
    }
  }
  return "";
}

/**
 * @desc 数字添加分隔符
 * @param {number} number 要格式化的数字
 * @param {number} decimals 保留几位小数
 * @param {string} dec_point：小数点符号
 * @param {string} thousands_sep：千分位符号
 * */
export function NumberThousand(number, decimals, dec_point, thousands_sep) {
  number = (number + "").replace(/[^0-9+-Ee.]/g, "");
  let n = !isFinite(+number) ? 0 : +number,
    prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
    sep = typeof thousands_sep === "undefined" ? "," : thousands_sep,
    dec = typeof dec_point === "undefined" ? "." : dec_point,
    s = "",
    toFixedFix = function (n, prec) {
      var k = Math.pow(10, prec);
      return "" + Math.ceil(n * k) / k;
    };

  s = (prec ? toFixedFix(n, prec) : "" + Math.round(n)).split(".");
  let re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, "$1" + sep + "$2");
  }

  if ((s[1] || "").length < prec) {
    s[1] = s[1] || "";
    s[1] += new Array(prec - s[1].length + 1).join("0");
  }
  return s.join(dec);
}

/**
 * @func removeTrim
 * @desc 字符串去除所有空格
 * @param {string} str
 * @returns {string}
 */
export function removeTrim(str) {
  // 去除字符串内所有的空格: str = str.replace(/\s*/g, ""); 去除字符串内两头的空格: str = str.replace(/^\s*|\s*$/g, "");
  if (str && typeof str === "string") {
    return str.replace(/\s*/g, "");
  } else {
    return "";
  }
}

/**
 *
 * @param {string} soure 源字符
 * @param {string} line 线字符
 * @returns {string} 返回转换完成的字符
 */
export function lineToHump(soure, line = "-_") {
  const reg = new RegExp(`[${line}](\\w)`, "g");

  let str = soure.replace(reg, ($, $1) => {
    return $1.toUpperCase();
  });
  return str;
}

/**
 * 驼峰转大写下划线格式
 * @param {string} str 源字符
 * @returns {string} 返回转换完成的字符
 */
export function toUpperCaseUnderlined(str) {
  let uppercase = "";
  if (str && typeof str === "string") {
    let len = str.length;

    for (let i = 0; i < len; i++) {
      let character = str.charAt(i);
      let isLetter = /[a-zA-Z]/.test(character); //是否是字母
      if (isLetter) {
        let isUppercase = /[A-Z]/.test(character); //是否是大写

        uppercase +=
          isUppercase && i && i != len - 1
            ? "_" + character
            : character.toUpperCase();
        //如果是大写字母而且不是第一个或最后一个在大写字母前面追加下划线，如果是小写字母则转大写字母
      } else {
        uppercase += character;
      }
    }
  }

  return uppercase;
}

/**
 * @func validateInputValue
 * @desc 输入框验证内容是否包含SQL和JS代码
 * @param {string} str 要验证的字符串
 * @returns { {isValid: boolean, msg: string} } result 返回验证结果
 */
export function validateInputValue(str = "") {
  const regExp = /[<>?!]|(select\s[\w|*]+\sfrom)/i;
  if (typeof str === "string" && regExp.test(str)) {
    return { isValid: false, msg: "输入内容不支持SQL和JS代码类型" };
  } else {
    return { isValid: true, msg: null };
  }
}
