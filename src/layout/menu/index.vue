<script>
export default {
  name,
};
</script>

<script setup>
import { createNamespace } from "@/utils";
import { useStore, useRouter, useRoute } from "@/composables";
import { computed } from "vue";

const [name, bem] = createNamespace("header-menu");
const store = useStore();
const menu = store.getters.webMenu;
const router = useRouter();
const route = useRoute();

const getDefaultActive = computed(() => {
  const [, path, subPath] = route.path.split("/");
  if (path && subPath) {
    return `/${path}/${subPath}`;
  } else {
    return route.path;
  }
});
const handleSelect = (key, keyPath) => {
  console.log('key: ', key);
  console.log('keyPath: ', keyPath);
  const path = key;
  router.push(path);
};
</script>

<template>
  <el-menu
    :class="bem()"
    :default-active="getDefaultActive"
    background-color="#1989fa"
    text-color="#ffffff"
    active-text-color="var(--sjc-warning-color)"
    mode="horizontal"
    @select="handleSelect"
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
          >{{ child.title }}</el-menu-item
        >
      </el-submenu>
      <el-menu-item v-else :index="item.path" :key="item.path">{{
        item.title
      }}</el-menu-item>
    </template>
  </el-menu>
</template>

<style lang="scss">
@import "./index.scss";
</style>
