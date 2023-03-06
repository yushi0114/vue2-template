import { request, DOMAIN, getUserInfo } from "@/utils";

const API_MAP = Object.freeze({
  Menu: DOMAIN.DMS + "/v1/role/menu/list",
});

export const getMenuApi = () => {
  return request.GET(API_MAP.Menu, {
    roleId: getUserInfo().roleId,
    tab: "dms",
  });
};
