<script>
export default {
  name,
};
</script>

<script setup>
import { createNamespace, makeArrayProp, makeStringProp } from "@/utils";
import { useStore, useRouter, useRoute } from "@/composables";

const [name, bem] = createNamespace("header-menu");
const props = defineProps({
  menu: makeArrayProp(),
  defaultActive: makeStringProp("/"),
});
const emits = defineEmits(["select"]);
const store = useStore();
const router = useRouter();
const route = useRoute();

const handleMenuClick = (menuItem) => {
  emits("select", menuItem.path, []);
};

const handleMenuItemClick = (menuItem, child) => {
  const path = child.path;
  emits("select", path, menuItem.children);
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
        <template slot="title"> {{ item.title }}</template>
        <el-menu-item
          v-for="child in item.children"
          :key="child.path"
          :index="child.path"
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
