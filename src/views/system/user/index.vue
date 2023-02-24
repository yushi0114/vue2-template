<script>
export default {
  name
}
</script>

<script setup>
import { createNamespace } from '@/utils'
const [name, bem] = createNamespace("user");
</script>

<template>
  <sjc-page-panel full>
    <sjc-board full title="用户管理">
      <div :class="bem()">我是用户管理啊</div>
    </sjc-board>
  </sjc-page-panel>
</template>

<style lang="scss" scoped>
 @import './index.scss';
</style>
