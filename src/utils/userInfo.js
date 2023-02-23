import { storage } from "./storage";
import { systemStorageKeys } from "@/config/constants";

export const setUserInfo = function (userInfo) {
  userInfo && storage.set(systemStorageKeys.USER_NAME, userInfo);
};

export const getUserInfo = function () {
  const userInfo = storage.get(systemStorageKeys.USER_NAME);
  return userInfo ?? {};
};

export const clearUserInfo = function () {
  storage.remove(systemStorageKeys.USER_NAME);
};
