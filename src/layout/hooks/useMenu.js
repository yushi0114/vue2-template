import { useStore } from "@/composables";
import { ref } from "vue";
import { getRealPath } from "@/config/constants";
export const useMenu = () => {
  const store = useStore();
  const menu = store.getters.webMenu;
  console.log("menu: ", menu);

  const defaultActive = ref("/");
  const defaultMenu = ref();
  const defaultSubMenu = ref();
  // 第三级菜单
  const sidebarOptions = ref([]);
  const getDefaultActive = (route) => {
    const menuItem = menu.find((item) =>
      getRealPath(route.path).startsWith(getRealPath(item.path))
    );
    const child = menuItem?.children?.find((child) =>
      getRealPath(route.path).startsWith(getRealPath(child.path))
    );
    if (child) {
      defaultMenu.value = menuItem;
      defaultSubMenu.value = child;
      sidebarOptions.value = menuItem.children;
      defaultActive.value = child.path;
    } else {
      defaultMenu.value = menuItem;
      defaultActive.value = menuItem.path;
      sidebarOptions.value = [];
    }
  };

  return {
    menu,
    defaultActive,
    defaultMenu,
    defaultSubMenu,
    sidebarOptions,
    getDefaultActive,
  };
};
