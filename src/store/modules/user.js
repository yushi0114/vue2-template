import {
  removeToken,
  storage,
  setToken as _setToken,
  setDebug,
} from "@/utils";
import { AuthApi } from "@/api";
import { systemStorageKeys } from "@/config/constants";
setDebug(true);
const user = {
  namespaced: true,

  // 定义全局变量
  state: {
    token: storage.get(systemStorageKeys.TOKEN_NAME) ?? "",
    userInfo: storage.get(systemStorageKeys.USER_NAME) ?? {},
  },

  // update state
  mutations: {
    setToken(state, data) {
      _setToken(data.token);
      state.token = data.token;
    },
    // 设置用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo;
    },
    // 清除用户信息
    clearUserInfo: (state, info) => {
      state.userInfo = info;
      removeToken();
    },
  },

  // 异步操作
  actions: {
    login({ commit, dispatch }, data) {
      return new Promise((resolve, reject) => {
        AuthApi.loginByName(data)
          .then((_data) => {
            commit("setToken", _data);
            dispatch("getUserInfo", _data.id).then(() => {
              resolve();
            });
          })
          .catch(() => {
            reject();
          });
      });
    },
    saveInfo({ commit }, result) {
      commit("setUserInfo", result);
    },
    logout({ commit }) {
      commit("clearUserInfo", {});
      location.href = "login";
    },
    getUserInfo({ commit }, userId) {
      return new Promise((resolve, reject) => {
        AuthApi.getUserInfo({ id: userId })
          .then((user) => {
            commit("setUserInfo", user);
            storage.set(systemStorageKeys.USER_NAME, user);
            resolve(user);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};

export default user;
