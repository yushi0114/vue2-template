<script>
import { defineComponent } from "vue";
import { createNamespace } from "@/utils";
import { useStore, useRouter } from "@/composables";
import { useMenu } from "./hooks";
import IHeader from "./header";
import IHeaderMenu from "./menu";
import ISidebar from "./sidebar";
import ILogo from "./logo";
import { DEFAULT_REDIRECT_PATH } from "@/config/constants";

const [name, bem] = createNamespace("app-container");
export default defineComponent({
  name,
  components: {
    IHeader,
    IHeaderMenu,
    ISidebar,
    ILogo,
  },
  props: {},
  setup() {
    const store = useStore();
    const router = useRouter();

    const { menu, defaultActive, getDefaultActive, sidebarOptions } = useMenu();

    const handleCommand = (command) => {
      store.dispatch("user/logout");
    };

    const handleSelect = (path, subMenu) => {
      console.log("path: ", path);
      console.log("subMenu: ", subMenu);
      sidebarOptions.value = subMenu ?? [];
      router.push(path);
    };

    const toHome = () => {
      router.push(DEFAULT_REDIRECT_PATH);
    };
    return {
      bem,
      menu,
      defaultActive,
      sidebarOptions,
      toHome,
      handleSelect,
      handleCommand,
      getDefaultActive,
    };
  },
  watch: {
    "$route.path": {
      handler() {
        console.log("route：", this.$route);
        this.getDefaultActive(this.$route);
      },
      immediate: true,
    },
  },
});
</script>

<template>
  <i-layout :class="bem()">
    <i-header>
      <template #logo>
        <i-logo @click="toHome" />
      </template>
      <template #menu>
        <i-header-menu
          :menu="menu"
          :default-active="defaultActive"
          @select="handleSelect"
        />
      </template>
    </i-header>
    <i-layout :class="bem('main')" type="horizontal">
      <i-sidebar
        v-if="sidebarOptions.length"
        :options="sidebarOptions"
        :path="defaultActive"
      >
      </i-sidebar>
      <i-layout :class="bem('page')">
        <router-view />
      </i-layout>
    </i-layout>
  </i-layout>
</template>

<style lang="scss" scoped>
.i-app-container {
  height: 100vh;
  overflow: hidden;
  position: relative;

  &__main {
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__page {
    background-color: var(--el-fill-color-light);
  }
}
</style>
