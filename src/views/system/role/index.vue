<script>
export default {
  name: "Role",
};
</script>

<script setup>
import { ref } from "vue";
import { createNamespace } from "@/utils";
import { useChildren } from "@/composables";
import Child from "./components/Child";
import { RELATION_KEY } from "./constants";
const [name, bem] = createNamespace("role");

const count = ref(0);
const add = () => {
  count.value++;
};
const { linkChildren } = useChildren(RELATION_KEY);

// 向子组件提供数据和方法
linkChildren({ add, count });
</script>

<template>
  <sjc-page-panel full>
    <sjc-board full title="角色管理">
      <sjc-text block size="md" :class="bem()">我是角色管理啊</sjc-text>
      <child />
    </sjc-board>
  </sjc-page-panel>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
