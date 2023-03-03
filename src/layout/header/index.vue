<script setup>
import { nextTick, watch } from "vue";
import { useDark } from "@vueuse/core";
import { createNamespace } from "@/utils";
import { useStore, useRouter } from "@/composables";

const [name, bem] = createNamespace("header");

const router = useRouter();
const store = useStore();
const username = store.getters.displayName;

const isDark = useDark();
const handleCommand = (command) => {
  store.dispatch("user/logout");
};

watch(
  isDark,
  () => {
    const themeType = isDark.value ? "dark" : "light";
    const themeTypeContrary = isDark.value ? "light" : "dark";
    let theme = `/themes/${themeType}/theme/index.css`;
    document.getElementById(`theme-${themeType}`)?.setAttribute("href", theme);
    console.log("`theme-${themeType}`: ", `theme-${themeType}`);
    setTimeout(() => {
      document
        .getElementById(`theme-${themeTypeContrary}`)
        .setAttribute("href", "");
    }, 100);
  },
  {
    immediate: true,
  }
);
</script>

<template>
  <div :class="bem()">
    <slot name="logo" />
    <div :class="bem('menu')">
      <slot name="menu"></slot>
    </div>
    <flex-row :class="bem('user')" gap="md">
      <el-switch
        v-model="isDark"
        active-icon-class="el-icon-sunny"
        inactive-icon-class="el-icon-moon"
        :active-value="false"
        :inactive-value="true"
      >
      </el-switch>
      <el-dropdown @command="handleCommand" :class="bem('user-dropdown')">
        <flex-row :class="bem('user-dropdown-title')">
          <i-text color="current" truncate block>
            {{ username }}
          </i-text>
          <i class="el-icon-arrow-down el-icon--right"></i>
        </flex-row>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit"
            ><i class="el-icon-switch-button"></i>退出系统</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>
    </flex-row>
  </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>
