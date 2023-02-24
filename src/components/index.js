import { DataType } from "@/utils";
import { withInstall } from "./util";
const requiredModules = require.context("./common", true, /\.vue/);

const baseModules = {};

requiredModules.keys().forEach((path) => {
  console.log('path: ', path);
  const moduleName = path
    .replace(/.*\/([a-z A-Z 0-9 \-]+)(\/index\.vue$)/, ($1, name) => {
      return name;
    })
    .replace(/(\-|^)(\w)/g, (_, __, letter) => letter.toUpperCase());
  const module = requiredModules(path).default;
  if (!DataType.isEmpty(module)) {
    baseModules[moduleName] = module;
  }
});
console.log('baseModules：', baseModules);
let tempList = [];
Object.keys(baseModules).forEach((moduleName) => {
  const temp = withInstall(baseModules[moduleName]);
  tempList.push(temp)
})
export const commonComponentList = tempList;
