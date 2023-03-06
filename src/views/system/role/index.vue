<script>
export default {
  name: "Role",
};
</script>

<script setup>
import { ref } from "vue";
import { createNamespace } from "@/utils";
import { useChildren, useRoute } from "@/composables";
import Child from "./components/Child";
import { RELATION_KEY } from "./constants";
const [name, bem] = createNamespace("role");

const route = useRoute();
const count = ref(0);
const add = () => {
  count.value++;
};
const { linkChildren } = useChildren(RELATION_KEY);

// 向子组件提供数据和方法
linkChildren({ add, count });
</script>

<template>
  <i-page-panel full>
    <i-board full title="角色管理">
      <router-link :to="`${route.path}/new/`">
        <el-button type="primary">新建角色</el-button>
      </router-link>
      <i-text block size="md" :class="bem()">我是角色管理啊</i-text>
      <child />
    </i-board>
  </i-page-panel>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
