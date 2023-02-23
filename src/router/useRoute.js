import { DataType } from "@/utils";
const requiredModules = require.context("./modules", true, /\.js/);

const baseModules = {};

requiredModules.keys().forEach((path) => {
  const moduleName = path
    .replace(/.*\/([a-z A-Z 0-9 \-]+)(\.ts$|\.js)/, ($1, name) => {
      return name;
    })
    .replace(/(\-|^)(\w)/g, (_, __, letter) => letter.toUpperCase());
  const module = requiredModules(path).default;
  if (module && module.length > 0) {
    baseModules[moduleName] = module;
  }
});

const baseRoutes = [];

/**
 * @desc
 * @param {string[]} modules 路由模块文件名（首字母大写），不传则加载全部路由模块
 * @returns {} 路由表
 * @Author: 张玉石
 * @Date: 2023-01-31
 * @LastEditTime: 2023-01-31
 * @LastEditors: 张玉石
 */
export default function useRoutes(modules = []) {
  let finalRoutes = baseRoutes.slice(0);
  if (DataType.isEmptyArray(modules)) {
    modules = Object.keys(baseModules);
  }
  modules.forEach((moduleName) => {
    if (Array.isArray(baseModules[moduleName])) {
      finalRoutes = finalRoutes.concat(baseModules[moduleName]);
    }
  });

  // finalRoutes.push({
  //   path: "/:w+",
  //   name: "404Page",
  //   redirect: "exception-404",
  // });
  return finalRoutes;
}
