<script>
import SjcText from "../Text";
import { createNamespace } from "@/utils";

const [name, bem] = createNamespace("board");
/**
 * @group Common
 * 页面面板（内容壳子）
 */
export default {
  name: "SjcBoard",
  components: {
    SjcText,
  },
  props: {
    // 页面标题
    title: {
      type: String,
      default: "",
    },
    // 是否有边框
    bordered: {
      type: Boolean,
      default: false,
    },

    // 是否填满高度
    full: {
      type: Boolean,
      default: false,
    },
    // 是否填满高度且在此容器内滚动
    focusFull: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return { bem };
  },
};
</script>
<template>
  <div
    :class="bem({ bordered, full, 'focus-full': focusFull })"
    v-bind="$attrs"
  >
    <sjc-text :class="bem('title')" v-if="title" size="xl" truncate bold>{{
      title
    }}</sjc-text>
    <!-- 实际内容 -->
    <slot />
  </div>
</template>
<style lang="scss">
@import "./index.scss";
</style>
