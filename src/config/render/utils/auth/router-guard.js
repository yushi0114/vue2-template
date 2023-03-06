/**
 * @author zys
 * @time 2023.02.21
 * @description 鉴权路由守卫
 */
import { storage, DataType } from "@/utils";
import asyncRoutes from "./async-routes"; // 导入异步插入路由函数
import { _routeGuardOptions } from "../../config/settings"; // 路由守卫配置项
import { useNProgress } from "@/composables";
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
  const necessaryCheckedRoutePathSet = new Set();
  function hasNecessaryRoute(router, to) {
    return router
      .getRoutes()
      .filter((r) => !!r.path)
      .some((r) => {
        if (r.path === "/" && to.path !== "/") return false;
        return (
          r.path !== menuOptions.rootPath &&
          to.path.indexOf(r.path.replace(menuOptions.rootPath, "")) > -1
        );
      });
  }
  router.beforeEach((to, from, next) => {
    progress.start();
    // 检查是否存在登录状态
    let token = storage.get(_option.tokenKey) ?? "";
    // 存在登陆状态
    if (token) {
      // 访问的路由如果还没有添加，可能是一个动态路由
      // 需要重新拉取api 动态添加路由，然后通过重定向 next({ ...to, replace }) 再次触发路由
      if (!hasNecessaryRoute(router, to)) {
        console.log("2323232：", 2323232);
        if (necessaryCheckedRoutePathSet.has(to.fullPath)) {
          next(_option.path404);
        } else {
          necessaryCheckedRoutePathSet.add(to.fullPath);
          console.log("to.fullPath: ", to.fullPath);
          _option
            .apiFn()
            .then((data) => {
              console.log("data: ", data);
              let _menu = data || []; /*  */
              let { permissions, menuList } = asyncRoutes(
                _menu,
                router,
                nextRoutes,
                menuOptions
              );
              store.commit(_option.dispatchSetMenu, menuList); // 将菜单数据存入store
              store.commit(_option.dispatchSetPermissions, permissions); // 将权限码数据存入store
              next({ ...to, replace: true });
            })
            .catch(() => {
              next(_option.path404);
            });
        }
      } else {
        console.log("1212121：", 1212121);
        if (to.path === _option.pathLogin) {
          next(_option.pathLogged);
        } else {
          if (to.matched.length === 0) {
            next(_option.path404);
          } else {
            next();
          }
        }
      }
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
