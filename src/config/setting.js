import nextRoutes from "@/router/next-router";
import routeMap from "@/router/map-router";
import { MenuApi } from "@/api";
import { elementUiComponents, webKitComponents } from "@/plugins";
import { commonComponentList } from '@/components'
import { systemStorageKeys } from './constants';

export const webSettings = {
  options: {
    fastclick: false, // 默认false 是否启用移动端快速点击插件
    cookie: false, // 默认false 是否启用cookie操作插件
    lazyOptions: null, // 默认null 启用图片懒加载插件时的配置项
    filters: [], // 默认[] 过滤器数组 格式为 {name:"", rule: ()=>{}}
    directives: [], // 默认[] 指令数组 格式为 {name:"", rule: ()=>{}}
    plugins: [...elementUiComponents, ...commonComponentList, ...webKitComponents], // 默认[] 插件数组 [el-input] 可以直接Vue.use()的插件数组
    fncBeforeVue() {}, // 实例化vue前可执行的回调函数 fncBeforeVue(vue){... 你的逻辑}
    auth: true, // 是否需要鉴权系统，如果不需要，后续参数无需再传
  },
  routeOptions: {
    tokenKey: systemStorageKeys.TOKEN_NAME, // 存储在local中的token的key
    dispatchSetToken: "user/setToken", // store设置token的actions命名空间
    dispatchSetMenu: "menu/setMenuRouters", // store设置菜单的actions命名空间
    dispatchSetPermissions: "menu/setPermissions", // store设置按钮权限码的actions命名空间
    pathLogin: "/login", // 登录页的 router path
    pathLogged: "/", // 已登录后 再进登录页要重定向的 router path
    apiFn: MenuApi.getMenuApi, // 获取菜单数据的api函数
  }, // 路由守卫配置项 下为详细注解
  menuOptions: {
    url: "path", // 前端地址栏路由 将映射真实文件路径 映射规则：import(`@/views${url}/index.vue`)
    name: "name", // 命名路由
    meta: "meta", // 路由元数据
    component: "component", // 对应前端组件名
    children: "children", // 子菜单字段
    permissions: "permissions", // 按钮权限字段
    path404: "exception-404", // 404路径
    mapPathFn: routeMap,
  }, // 菜单数据解析为路由数据配置项 下为详细注解
  nextRoutes, // 需要登录后插入的 非后台返回的 路由列表
};
