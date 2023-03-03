<script setup>
import { createNamespace } from "@/utils";
const [name, bem] = createNamespace("user");
</script>

<template>
  <i-page-panel full>
    <i-board full title="用户管理">
      <div :class="bem()" @click="$router.push('/')">我是用户管理啊</div>
    </i-board>
  </i-page-panel>
</template>

<style lang="scss" scoped>
@import "./index.scss";
</style>
