import { DataType } from "@/utils";
const requiredModules = require.context("./", true, /\.js/);

export function genDynamicViewConfig(filePath) {
  let routes = [];
  requiredModules.keys().forEach((path) => {
    if (path === `.${filePath}.js`) {
      const module = requiredModules(path);
      console.log('module: ', module);
      if (DataType.isArray(module.routes)) {
        routes = module.routes;
      }
      return false;
    }
    return false;
  });
  console.log('routes：-----------', routes);
  return { routes };
}
