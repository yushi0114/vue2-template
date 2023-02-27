const permission = {
  namespaced: true,
  state: {
    menuRouters: [],
    menu: [
      {
        id: "0",
        name: "Home",
        parentId: "0",
        path: "/",
        title: "首页",
        component: "baseLayout",
        children: [],
      },
    ],
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
  actions: {
  },
};

export default permission;
