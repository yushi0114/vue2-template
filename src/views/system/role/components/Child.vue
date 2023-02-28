<script>
export default {
  name: "child",
};
</script>

<script setup>
import GrandChild from "@/views/system/role/components/GrandChild";
import { createNamespace } from "@/utils";
import { useParent } from "@/composables";
import { RELATION_KEY } from "../constants";
const [name, bem] = createNamespace("child");
const { parent } = useParent(RELATION_KEY);
</script>

<template>
  <div :class="bem()">
    <flex-column horizontal="start" gap="md">
      <div>
        <el-button type="primary" @click="parent.add()">父组件增加记数</el-button>
        {{ parent.count.value }}
      </div>
      <grand-child />
    </flex-column>
  </div>
</template>

<style lang="scss" scoped></style>
