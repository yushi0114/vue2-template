<script>
export default {
  name,
};
</script>

<script setup>
import { createNamespace, makeArrayProp, makeStringProp } from "@/utils";
import { useStore, useRouter, useRoute } from "@/composables";
import { computed, watch, ref } from "vue";

const [name, bem] = createNamespace("header-menu");
const props = defineProps({
  menu: makeArrayProp(),
  defaultActive: makeStringProp("/"),
});
const emits = defineEmits(["select"]);
const store = useStore();
const router = useRouter();
const route = useRoute();

const getDefaultActive = () => {
  const [, path, subPath] = route.path.split("/");
  const menuItem = menu.find((item) => item.path.includes(path));
  const child = menuItem.children.find((child) => child.path.includes(subPath));
  if (path && subPath) {
    handleMenuItemClick(menuItem, child);
    return `/${path}/${subPath}`;
  } else {
    handleMenuClick(menuItem);
    return route.path;
  }
};

const handleMenuClick = (menuItem) => {
  emits("select", menuItem.path, []);
};

const handleMenuItemClick = (menuItem, child) => {
  const path = menuItem.path + "/" + child.path;
  emits("select", path, [{ path: 121, name: "ewe" }]);
};
</script>

<template>
  <el-menu
    :class="bem()"
    :default-active="defaultActive"
    background-color="#1B5CFF"
    text-color="#ffffff"
    active-text-color="var(--el-color-warning)"
    mode="horizontal"
  >
    <template v-for="item in menu">
      <el-submenu
        v-if="item.children && item.children.length !== 0"
        :index="item.path"
        :key="item.path"
      >
        <template slot="title">{{ item.title }}</template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="item.path + '/' + child.path"
          @click="handleMenuItemClick(item, child)"
          >{{ child.title }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item
        v-else
        :index="item.path"
        :key="item.path"
        @click="handleMenuClick(item)"
        >{{ item.title }}</el-menu-item
      >
    </template>
  </el-menu>
</template>

<style lang="scss">
@import "./index.scss";
</style>
