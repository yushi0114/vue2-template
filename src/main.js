import { render } from "@/config/render/index.js";
import App from "./App.vue";
import store from "./store";
import router from "./router";
import "@/style/index.scss";
import { webSettings } from "@/config/setting";

const { options, routeOptions, menuOptions, nextRoutes } = webSettings;

// 导出手动实例化vue函数
const vueRender = () =>
  render({
    root: App,
    router,
    store,
    options,
    routeOptions,
    nextRoutes,
    menuOptions,
  });
vueRender();
