setAttribute<script setup>
import { watch } from "vue";
import { createNamespace } from "@/utils";
import { useStore } from "@/composables";
import SjcHeader from "./header";

const [name, bem] = createNamespace("app-container");

const handleCommand = (command) => {
  store.dispatch("user/logout");
};
</script>

<template>
  <sjc-layout :class="bem()">
    <sjc-header></sjc-header>
    <sjc-layout :class="bem('main')" type="horizontal">
      <!-- <Sidebar :options="sidebarOptions"> </Sidebar> -->
      <sjc-layout :class="bem('page')">
        <router-view />
      </sjc-layout>
    </sjc-layout>
  </sjc-layout>
</template>

<style lang="scss" scoped>
.sjc-app-container {
  height: 100vh;
  overflow: hidden;
  position: relative;

  &__main {
    overflow-y: auto;
    overflow-x: hidden;
  }
  &__page {
    background-color: var(--sjc-background);
  }
}
</style>
