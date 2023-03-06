<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="i-fade">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<script>
import { RouterView } from "vue-router";
export default {
  name: "App",
  components: {
    RouterView,
  },
};
</script>

<style lang="scss">
#app {
  height: 100%;
}
</style>
