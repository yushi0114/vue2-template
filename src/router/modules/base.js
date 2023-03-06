import Layout from "@/layout/index.vue";
import RiskTip from "@/views/risk-tip";
import {
  SIGNIN_PATH,
  DEFAULT_REDIRECT_PATH,
  ROOT_PATH,
  ROOT_NAME,
} from "@/config/constants";

export default [
  {
    path: "/",
    redirect: DEFAULT_REDIRECT_PATH,
  },
  {
    path: ROOT_PATH,
    name: ROOT_NAME,
    component: Layout,
    children: [],
    redirect: DEFAULT_REDIRECT_PATH,
  },
  {
    path: SIGNIN_PATH,
    name: "Login",
    component: () => import("@/views/login/index"),
  },
  {
    path: ROOT_PATH + "/leave",
    name: "leave",
    component: RiskTip,
  },
];
