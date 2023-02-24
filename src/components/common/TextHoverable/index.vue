<script>
import { createNamespace } from "@/utils";
import SjcText from "../Text";

const [name, bem] = createNamespace("texthoverable");
/**
 * @group Common
 * 文字滑过高亮组件
 */
export default {
  name: 'SjcTexthoverable',
  components: {SjcText},

  data() {
    return { bem };
  },
};
</script>

<template>
  <sjc-text :class="bem()" v-bind="$attrs" v-on="$listeners">
    <!-- 任意文字 -->
    <slot />
  </sjc-text>
</template>

<style lang="scss">
.sjc-texthoverable {
  cursor: pointer;

  &:hover {
    color: var(--sjc-primary-color);
  }
}
</style>
