import Vue from "vue";
import VueRouter from "vue-router";
import useRoutes from "./useRoute";

Vue.use(VueRouter);

const routesMap = ["Base", "Exception"];

const router = new VueRouter({
  mode: "history",
  base: "",
  scrollBehavior: () => ({ y: 0 }),
  routes: useRoutes(routesMap),
});

export default router;

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};
