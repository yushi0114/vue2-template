<script>
/**
 * @group Common
 * 横向Flex布局盒子
 */
export default {
  name: "FlexRow",
  props: {
    // 垂直方向
    vertical: {
      // `'start'` / `'center'` / `'end'` / `'stretch'`
      type: String,
      default: "center",
      validator(value) {
        return ["start", "center", "end", "stretch"].includes(value);
      },
    },
    // 水平方向
    horizontal: {
      // `'start'` / `'center'` / `'end'` / `'between'` / `'around'` / `'evenly'`
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
    // 间隔
    gap: {
      // `'none'` / `'base'` / `'xs'` / `'sm'` / `'md'` / `'lg'`
      type: String,
      default: "none",
      validator(value) {
        return ["none", "base", "xs", "sm", "md", "lg"].includes(value);
      },
    },
    // 是否撑满
    full: {
      type: Boolean,
      default: false,
    },
    // 是否自动撑满剩余空间
    rest: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<template>
  <div
    class="i-flex-row"
    v-bind="$attrs"
    v-on="$listeners"
    :class="[
      'i-flex-row-vertical-' + vertical,
      'i-flex-row-horizontal-' + horizontal,
      'i-flex-row-gap-' + gap,
      full ? 'i-flex-row-full' : '',
      rest && 'i-flex-row-rest',
    ]"
  >
    <!-- 任意元素 -->
    <slot></slot>
  </div>
</template>
<style lang="scss">
@import "./index.scss";
</style>
