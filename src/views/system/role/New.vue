<script>
export default {
  name: "RoleNew",
};
</script>

<script setup>
import { ref } from "vue";
import { createNamespace } from "@/utils";
import { useChildren } from "@/composables";
import Child from "./components/Child";
import { RELATION_KEY } from "./constants";
const [name, bem] = createNamespace("role-new");
</script>

<template>
  <i-page-panel full>
    <i-board full title="新建角色">
      <div>
        <el-button type="primary" @click="$router.back()">返回</el-button>
      </div>
      <i-text block size="md" :class="bem()">我是新建角色啊</i-text>
      <child />
    </i-board>
  </i-page-panel>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
