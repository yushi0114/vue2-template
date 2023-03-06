import Layout from "@/layout/index.vue";
import RiskTip from "@/views/risk-tip";
import {
  SIGNIN_PATH,
  DEFAULT_REDIRECT_PATH,
  ROOT_PATH,
} from "@/config/constants";

export default [
  {
    path: "/",
    component: Layout,
    redirect: DEFAULT_REDIRECT_PATH,
  },
  {
    path: DEFAULT_REDIRECT_PATH,
    component: Layout,
    children: [
      {
        path: "",
        name: "Home",
        component: () => import("@/views/home/index"),
      },
    ],
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
