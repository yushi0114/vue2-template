import VeryAxios from "./axios/index";
import { Message, Loading } from "element-ui";
import { xssFilterObj } from "./filterXSS";
import { encrypt, encryptHexMd5 } from "./crypto";
import { getToken, removeToken } from "./token";
import router from "@/router/index";

let loadingInstance = null;
const veryAxiosConfig = {
  // 发生错误时，是否显示提示
  tip: true, // default

  // 如何显示提示，可以传入显示message的方法
  tipFn: (message) => {
    Message.closeAll();
    Message.error(message);
  },

  errorHandlers: {
    // 支持 400/401/403/404/405/413/414/500/502/504/任意其他 errno
    401: () => {
      Message.error("登录失效，请重新登录！");
      removeToken();
      router.replace({ path: "/login" });
    },
    403: () => {
      router.push({ name: "Exception403" });
    },
    500: () => {
      router.push({ name: "Exception500" });
    },
    404: () => {
      router.push({ name: "Exception404" });
    },
    10010: () => {
      removeToken();
      router.replace({ path: "/login" });
    },
    // ...
  },

  // 内置错误提示语言: 'zh-cn'/'en'
  lang: "zh-cn", // default

  // 请求前的自定义操作
  beforeHook: (config) => {
    if (config.veryConfig?.showLoading) {
      const tips = config.veryConfig.loadingText ?? "加载中";
      loadingInstance = Loading.service({
        fullscreen: true,
        text: tips,
      });
    }

    // 设置请求header、xss处理
    config = Object.assign(config, setHeader(config), reqXssFilter(config));
  },

  // 请求后的自定义操作
  afterHook: (response, isError) => {
    if (!isError) {
      // response = xssFilterObj(response);
    }
    loadingInstance?.close();
  },

  // 从请求响应中获取错误状态，默认取errno
  // 如果传入的不是一个函数也会使用默认值
  getResStatus: (resData) => {
    return !resData.code || resData.code === 200 ? 0 : resData.code;
  }, // default

  // 从请求响应中获取错误消息，默认取errmsg
  // 如果传入的不是一个函数也会使用默认值
  getResErrMsg: (resData) => {
    return resData.msg;
  }, // default

  // 从请求响应中获取返回数据，默认取data
  // 如果传入的不是一个函数也会使用默认值
  getResData: (resData) => {
    return resData.data;
  }, // default

  // 是否开启取消重复请求
  cancelDuplicated: false, // default

  // 如果开启了取消重复请求，如何生成重复标识
  duplicatedKeyFn: (config) => `${config.method}${config.url}`, // default
};

const axiosConfig = {
  baseURL: "",
};

const downloadAxiosConfig = {
  ...axiosConfig,
  headers: {
    "content-type": "application/octet-stream",
  },
};

export const request = new VeryAxios(veryAxiosConfig, axiosConfig);

export const downloadFileRequest = new VeryAxios(
  veryAxiosConfig,
  downloadAxiosConfig
);

function generateUUID() {
  const s = [];
  const hexDigits = "0123456789abcdef";
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substring(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substring((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = "-";

  const uuid = s.join("");
  return uuid;
}

// 设置请求header
function setHeader(config) {
  // 设置 token
  if (getToken()) {
    config.headers["Authorization"] = getToken();
  }

  // 添加时间戳，防止缓存
  const _t = new Date().getTime();

  // 添加menuName
  let menuName = router.currentRoute.name;
  config.params = { ...config.params, menuName };
  const uuid = generateUUID();
  config.headers["uuid"] = uuid;
  // 添加sign
  const stringifyParams =
    config.method === "get"
      ? encryptHexMd5(JSON.stringify(config.params || {}, jsonReplacer))
      : encryptHexMd5(JSON.stringify(config.data || {}));
  config.headers["Sign"] = encrypt(
    `_t=${_t}&uuid=${uuid}&token=${
      config.headers["Authorization"] || ""
    }&params=${stringifyParams}`
  );

  config.params = { ...config.params, _t };

  return config;
}

// 请求xss过滤
function reqXssFilter(config) {
  if (config.params) {
    xssFilterObj(config.params);
  }

  if (config.data) {
    if (Object.prototype.toString.call(config.data) !== "[object FormData]") {
      xssFilterObj(config.data);
    }
  }

  return config;
}

export const getOriginData = () => {
  return { getResData: (res) => res };
};

export const DOMAIN = {
  SYS: "/clib-service",
  DMS: '/dms-service'
};

// 生成签名时，get请求的参数，number类型都转换为string类型
function jsonReplacer(key, value) {
  if (key === "" || typeof value === "string") return value;
  if (typeof value === "number") return value.toString();
  return undefined;
}
