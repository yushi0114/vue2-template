import Cookies from "js-cookie";
import { storage } from "./storage";
import { systemStorageKeys } from "@/config/constants";

const TokenKey = "clib_token";

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  storage.set(systemStorageKeys.TOKEN_NAME, token);
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  storage.remove(systemStorageKeys.TOKEN_NAME);
  return Cookies.remove(TokenKey);
}
