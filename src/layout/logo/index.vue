<script>
export default {
  name: "ILogo",
};
</script>

<script setup>
import { createNamespace } from "@/utils";
const [name, bem] = createNamespace("logo");
</script>

<template>
  <div :class="bem()" v-on="$listeners"></div>
</template>

<style lang="scss" scoped>
.i-logo {
  width: 182px;
  min-width: 182px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  background: url("@/assets/images/jinrongzhan-logo.svg") no-repeat center;
  background-size: 100% 100%;
  box-sizing: border-box;
  cursor: pointer;
  margin: 0 20px;
}
</style>
