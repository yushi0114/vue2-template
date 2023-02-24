<script>
import { createNamespace } from "@/utils";
const [name, bem] = createNamespace("flex-column");
/**
 * @group Common
 * 纵向Flex布局盒子
 */
export default {
  name: "FlexColumn",
  props: {
    // 垂直方向
    vertical: {
      // `"start"`/ `"center"` / `"end"` / `"between"` / `"around"` / `"evenly"`
      type: String,
      default: "start",
      validator(value) {
        return [
          "start",
          "center",
          "end",
          "between",
          "around",
          "evenly",
        ].includes(value);
      },
    },
    // 水平方向
    horizontal: {
      // `"start"` / `"center"` / `"end"`
      type: String,
      default: "center",
      validator(value) {
        return ["start", "center", "end", "stretch"].includes(value);
      },
    },
    // 间隔
    gap: {
      // `"none"` / `"base"` / `"xs"` / `"sm"` / `"md"` / `"lg"`
      type: String,
      default: "none",
      validator(value) {
        return ["none", "base", "xs", "sm", "md", "lg"].includes(value);
      },
    },
    // 是否自动撑满剩余空间
    rest: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    bem
  }
};
</script>
<template>
  <div
    :class="
      bem({
        ['vertical-' + vertical]: true,
        ['horizontal-' + horizontal]: true,
        ['gap-' + gap]: true,
        rest,
      })
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 任意元素 -->
    <slot />
  </div>
</template>
<style lang="scss">
@import "./index.scss";
</style>
