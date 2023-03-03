<script>
export default {
  name: "Sidebar",
};
</script>

<script setup>
import { useRouter, useRoute } from "@/composables";
import { createNamespace, makeArrayProp, makeStringProp } from "@/utils";
import { computed } from "vue";
const [name, bem] = createNamespace("sidebar");
const router = useRouter();
const route = useRoute();
const props = defineProps({
  options: makeArrayProp(),
  path: makeStringProp(""),
});

const activePath = computed(() => {
  return (item) => {
    return route.path.includes(item.path);
  };
});

const handleWrap = (item) => {
  router.push(`${props.path}/${item.path}`);
};
</script>

<template>
  <div :class="bem()">
    <div
      :class="bem({ active: activePath(item) })"
      v-for="item in options"
      :key="item.path"
      @click="handleWrap(item)"
    >
      <i-texthoverable>{{ item.name }}</i-texthoverable>
    </div>
  </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>
