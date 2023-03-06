/**
 * @author zys
 * @time 2023.02.21
 * @description 整理需要登录后异步推入的路由
 */
import { flattenDeep, DataType, arrayToTree } from "@/utils";
// import routeMap from "./map-router"
import { _menuDataOptions } from "../../config/settings";

/**
 * 异步推入鉴权路由 要求必须存在@/views/layout/index.vue主体视图盒子和/index首页路径
 * @param {Array} data 菜单数据
 * @param router 路由
 * @param {Array} nextRoutes 需要登录后插入的 非后台返回的 路由列表
 * @param {Object} options 菜单数据解析为路由数据配置项 下面是字段及默认值说明
 * @description url: 'url', // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
 * @description name: 'routerName', // 命名路由
 * @description meta: 'meta', // 路由元数据
 * @description children: 'children', // 子菜单字段
 * @description permissions: 'permissions', // 按钮权限字段
 * @description path404: 'error/404' // 404路径
 * @description mapPathFn: ()=>{} // 路由映射文件路径函数
 * @returns {Object} {routes: 整理好的异步路由router.addRoutes()即可, permissions: 权限code码}
 */
const asyncRoutes = (data, router, nextRoutes, options) => {
  if (!DataType.isObject(options)) throw Error("options 必须是一个对象！");
  let _options = { ..._menuDataOptions, ...options };
  if (!_options.mapPathFn)
    throw Error("options 内必须有路由映射真实路径方法 mapPathFn！");
  // 创建路由盒子
  let routerBox = [];
  // 创建权限码数组
  let permissions = [];

  let routes = [];

  let menu = flattenDeep(data, "children");
  console.log("menu: ", menu);
  // 处理路由映射真实路径，放在封装里babel之后就失效了，暂时不提供这个公共方法，在每个项目里写一遍吧
  // let routeMapFile = _options.mapPathFn ? _options.mapPathFn : routeMap;
  // 遍历处理路由
  menu.forEach((item) => {
    let _url = item[_options.url];
    if (!_url) return;
    try {
      const routePath = _options.rootPath + _url;
      let routerItem = {
        path: routePath, // 路由路径名
        name: item[_options.name], // 命名路由 用于配合菜单简洁跳转
        meta: {
          ...(item[_options.meta] ?? {}),
          title: item.title,
          menu: item.name,
        }, // 路由元信息 定义路由时即可携带的参数，可用来管理每个路由的按钮操作权限
        component: _options.mapPathFn(item[_options.component]), // 路由映射真实视图路径
        parentId: item.parentId,
        id: item.id,
        title: item.title,
      };
      const {routes: configRoutes} = _options?.genDynamicViewConfig(item[_options.component]);
      console.log('routes: ', routes);
      (configRoutes || []).map((route) => {
        const newRoute = {
          // 生成与父级相同字符串开始的路径 -> 侧边导航高亮
          // demo-permisson/:id + /yourPath
          path: routePath + route.path,
          component: route.component,
          meta: {
            menu: routerItem.name,
            ...route.meta,
          },
        };
        if (route?.meta?.notRootChild) {
          router.addRoute(newRoute);
        } else {
          router.addRoute(_options.rootName, newRoute);
        }
      });
      // 将所有权限码收集存入store
      let _permissions = item[_options.permissions];
      if (DataType.isArray(_permissions)) permissions.push(..._permissions);
      routes.push(routerItem);
    } catch (err) {
      throw Error("路由映射规则为：@/views${url}/index.vue", err);
    }
  });
  const menuTree = arrayToTree(routes, {
    id: "id",
    pid: "parentId",
    children: "children",
  });
  console.log("menuTree: ", menuTree);
  // 推入需要异步加载的，非服务端获取的功能性页面
  routerBox.push(...menuTree, ...nextRoutes);
  let errorBox = {
    path: "*",
    redirect: _options.path404,
  };
  const finalRoutes = [...routerBox, errorBox];
  finalRoutes.forEach((route) => {
    router.addRoute(route); // 推入异步路由
  });

  return {
    routes: finalRoutes,
    menuList: menuTree,
    permissions,
  };
};

export default asyncRoutes;
