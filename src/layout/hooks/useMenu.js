import { useStore, useRoute } from "@/composables";
import { watch, ref } from "vue";
export const useMenu = () => {
  const store = useStore();
  const menu = store.getters.webMenu;
  const route = useRoute();

  const defaultActive = ref("/");
  const defaultMenu = ref();
  const defaultSubMenu = ref();
  // 第三级菜单
  const sidebarOptions = ref([]);
  const getDefaultActive = () => {
    const [, path, subPath] = route.path.split("/");
    const menuItem = menu.find((item) => item.path.includes(path));
    const child = menuItem.children.find((child) =>
      child.path.includes(subPath)
    );
    if (path && subPath) {
      defaultMenu.value = menuItem;
      defaultSubMenu.value = child;
      console.log("child: ", child);
      sidebarOptions.value = [{ path: 121, name: "ewe" }];
      defaultActive.value = `/${path}/${subPath}`;
    } else {
      defaultMenu.value = menuItem;
      defaultActive.value = route.path;
      sidebarOptions.value = [];
    }
  };

  watch(
    () => route,
    () => {
      () => {
        console.log("route.path：", route.path);
        getDefaultActive();
      };
    },
    { deep: true, immediate: true }
  );

  return {
    menu,
    defaultActive,
    defaultMenu,
    defaultSubMenu,
    sidebarOptions,
  };
};
