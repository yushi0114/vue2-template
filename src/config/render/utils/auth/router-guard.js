/**
 * @author zys
 * @time 2023.02.21
 * @description 鉴权路由守卫
 */
import { storage, DataType } from "@/utils";
import VaUserAuth from "./va-auth";
import asyncRoutes from "./async-routes"; // 导入异步插入路由函数
import { _routeGuardOptions } from "../../config/settings"; // 路由守卫配置项
import { useNProgress } from '@/composables';
/**
 * 注册路由守卫
 * @param {*} router router实例
 * @param {*} store vuex实例
 * @param {*} routeOptions 注册路由配置项 下为详细注解
 * @description  tokenKey: 'token', // 存储在local中的token的key
 * @description dispatchSetToken: 'app/setToken', // store设置token的actions命名空间
 * @description dispatchSetMenu: 'menu/setMenu', // store设置菜单的actions命名空间
 * @description dispatchSetPermissions: 'menu/setPermissions', // store设置按钮权限码的actions命名空间
 * @description pathLogin: '/login', // 登录页的 router path
 * @description pathLogged: '/index', // 已登录后 再进登录页要重定向的 router path
 * @description apiFn: ()={}, // 获取菜单数据的api函数
 * @description vaJwtExpiredFn: ()={}, // 自定义校验jwt是否过期的函数
 * @param {*} menuOptions 菜单数据解析为路由数据配置项
 * @param {*} nextRoutes 需要登录后插入的 非后台返回的 路由列表
 */
const registerRouteGuard = (
  router,
  store,
  routeOptions,
  menuOptions,
  nextRoutes
) => {
  if (!DataType.isObject(routeOptions))
    throw Error("routeOptions 必须是一个对象！");
  let _option = { ..._routeGuardOptions, ...routeOptions };
  if (!_option?.apiFn) throw Error("apiFn lost！缺少获取菜单数据的api函数！");

  const progress = useNProgress();
  router.beforeEach((to, from, next) => {
    progress.start();
    // 检查是否存在登录状态
    let token = storage.get(_option.tokenKey) ?? "";
    // 存在登陆状态
    if (token) {
      // 判断当前用户是否已拉取权限菜单
      if (store.getters.menu.length === 0) {
        _option
          .apiFn()
          .then((data) => {
            let _menu = data || []; /*  */
            let { routes, permissions, menuList } = asyncRoutes(
              _menu,
              nextRoutes,
              menuOptions
            );
            routes.forEach((route) => {
              console.log("route: ", route);
              router.addRoute(route); // 推入异步路由
            });
            console.log("routes: ", routes, router.getRoutes());
            store.commit(_option.dispatchSetMenu, data); // 将菜单数据存入store
            store.commit(_option.dispatchSetPermissions, permissions); // 将权限码数据存入store
            next({ ...to, replace: true });
          })
          .catch();
        return;
      }
      // 已登录状态 去往登录页时自动重定向至配置页 其他跳转正常进行
      to.path === _option.pathLogin ? next(_option.pathLogged) : next();
      return;
    }
    // 无登录状态时 可进入白名单页面  去其他页面则重定向至登陆
    to.path === _option.pathLogin || to.meta.withoutAuth
      ? next()
      : next({
          path: _option.pathLogin,
        });
  });

  router.afterEach(() => {
    progress.done();
});
};

export default registerRouteGuard;
