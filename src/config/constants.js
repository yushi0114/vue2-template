// 时间单位 大小写不敏感 支持负数和缩写
export const _timeUnit = {
  Year: "year", // Y 年
  Quarter: "quarter", // Q 季度
  Month: "month", // M 月
  Week: "week", // W 周
  Day: "day", // d 天
  Hour: "hour", // h 时
  Minute: "minute", // m 分
  Second: "second", // s 秒
};

export const systemStorageKeys = {
  TOKEN_NAME: "token",
  USER_NAME: "user",
};

export const ROOT_PATH = "/fstack";
export const SIGNIN_PATH = ROOT_PATH + "/login";
export const ERROR_404_PATH = ROOT_PATH + "/exception-404";
export const DEFAULT_REDIRECT_PATH = ROOT_PATH + "/dashboard";
export const ROOT_NAME = "base";
export const getRealPath = (path) => path.replace(ROOT_PATH, "");
