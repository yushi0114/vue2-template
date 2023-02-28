<script>
export default {
  name: "child",
};
</script>

<script setup>
import { createNamespace } from "@/utils";
import { useParent } from "@/composables";
import { RELATION_KEY } from "../constants";
const [name, bem] = createNamespace("child");
const { parent } = useParent(RELATION_KEY);
</script>

<template>
  <div :class="bem()">
    <el-button type="primary" @click="parent.add()">孙子组件增加记数</el-button>
    {{ parent.count.value }}
  </div>
</template>

<style lang="scss" scoped></style>
