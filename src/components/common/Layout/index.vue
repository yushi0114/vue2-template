<script>
import { makeStringProp, createNamespace } from "@/utils";

const [name, bem] = createNamespace("layout");
/**
 * @group Common
 * 页面布局盒子
 */
export default {
  name:"SjcLayout",
  props: {
    // 布局方向
    type: {
      // `"vertical"` / `"horizontal"`
      type: String,
      default: 'vertical',
      validator(value) {
        return ["vertical", "horizontal"].includes(value);
      },
    },
  },
  data() {
    return { bem };
  },
};
</script>
<template>
  <div :class="bem('', type)" v-bind="$attrs">
    <!-- 实际内容 -->
    <slot></slot>
  </div>
</template>
<style lang="scss">
@import './index.scss';
</style>
