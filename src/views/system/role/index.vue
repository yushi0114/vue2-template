<script>
export default {
  name,
};
</script>

<script setup>
import { createNamespace } from "@/utils";
const [name, bem] = createNamespace("role");
</script>

<template>
  <sjc-page-panel full>
    <sjc-board full title="角色管理">
      <div :class="bem()">我是角色管理啊</div>
    </sjc-board>
  </sjc-page-panel>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
