import { DEFAULT_REDIRECT_PATH } from "@/config/constants";

const permission = {
  namespaced: true,
  state: {
    menuRouters: [],
    menu: [],
    permissions: [],
  },
  mutations: {
    setMenuRouters: (state, routers) => {
      state.menuRouters = routers;
      state.menu.push(...routers);
    },
    setPermissions: (state, permissions) => {
      state.permissions = permissions;
    },
  },
  actions: {},
};

export default permission;
