<script>
import { createNamespace } from "@/utils";
import IText from "../Text";

const [name, bem] = createNamespace("texthoverable");
/**
 * @group Common
 * 文字滑过高亮组件
 */
export default {
  name: "ITexthoverable",
  components: { IText },

  data() {
    return { bem };
  },
};
</script>

<template>
  <i-text :class="bem()" v-bind="$attrs" v-on="$listeners">
    <!-- 任意文字 -->
    <slot />
  </i-text>
</template>

<style lang="scss">
.i-texthoverable {
  cursor: pointer;

  &:hover {
    color: var(--el-color-primary);
  }
}
</style>
