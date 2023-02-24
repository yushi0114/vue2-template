const getters = {
  menu: (state) => state.menu.menuRouters,
  webMenu: (state) => state.menu.menu,
  displayName: (state) => state.user.userInfo.name || state.user.userInfo.account,
  permissions: (state) => state.menu.permissions,
};
export default getters;
