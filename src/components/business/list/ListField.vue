<script>
/**
 * @group Business
 * 列表字段内容（主要用于统一列表字段样式）
 */
export default {
  name: "ListField",
};
</script>
<script setup>
import { defineProps, computed } from "vue";

const props = defineProps({
  label: {
    type: String,
    default: "",
  },
  // `'normal'` / `'desc'`
  type: {
    type: String,
    default: "normal",
  },
  color: {
    type: String,
    default: "",
  },
});

const color = computed(() => {
  return props.color
    ? props.color
    : props.type === "normal"
    ? "paragraph"
    : "regular";
});
const size = computed(() => {
  return props.type === "normal" ? "sm" : "xs";
});
</script>

<template>
  <sjc-text
    v-bind="$attrs"
    v-on="$listeners"
    class="list-field"
    :color="color"
    :size="size"
  >
    <span v-if="label"> {{ label }}: </span>
    <!-- 字段内容 -->
    <slot></slot>
  </sjc-text>
</template>

<style lang="scss">
.list-field {
}
</style>
