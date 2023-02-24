import { request, DOMAIN, getUserInfo } from "@/utils";

const API_MAP = Object.freeze({
  Menu: DOMAIN.SYS + "/v1/menu/tree",
});

export const getMenuApi = () => {
  return request.GET(API_MAP.Menu, { roleId: getUserInfo().roleId });
};
