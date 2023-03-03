<script>
import { createNamespace } from "@/utils";

const [name, bem] = createNamespace("text");
/**
 * @group Common
 * 文字组件，统一文字处理风格
 */
export default {
  name: "IText",
  props: {
    // 字体大小
    size: {
      // `'xs'` / `'sm'` / `'md'` / `'lg'` / `'xl'` / `'current'`
      type: String,
      default: "md",
      validator(value) {
        return ["xs", "sm", "md", "lg", "xl", "current"].includes(value);
      },
    },
    // 图标大小
    iconSize: {
      // `'xs'` / `'sm'` / `'md'` / `'lg'` / `'xl'` / `'current'`
      type: String,
      default: "sm",
      validator(value) {
        return ["xs", "sm", "md", "lg", "xl", "current"].includes(value);
      },
    },
    // 字体对齐
    align: {
      // `'left'` / `'center'` / `'right'` / `'justify'`
      type: String,
      default: "left",
      validator(value) {
        return ["left", "center", "right", "justify"].includes(value);
      },
    },
    // 字体颜色
    color: {
      // `'primary'` / `'danger'` / `'success'` / `'warning'` / `'info'` / `'exception'` / `'error'` / `'paragraph'` / `'regular'` / `'secondary'` / `'placeholder'` / `'disabled'` / `'current'`
      type: String,
      default: "current",
      validator(value) {
        return [
          "primary",
          "danger",
          "success",
          "warning",
          "info",
          "exception",
          "error",
          "paragraph",
          "regular",
          "secondary",
          "placeholder",
          "disabled",
          "current",
        ].includes(value);
      },
    },
    // 字体大小
    italic: {
      type: Boolean,
      default: false,
    },
    // 字体是否超出省略
    truncate: {
      type: Boolean,
      default: false,
    },
    // 块级元素
    block: {
      type: Boolean,
      default: false,
    },
    // 字体加粗
    bold: {
      type: Boolean,
      default: false,
    },
    // 文字转大写
    uppercase: {
      type: Boolean,
      default: false,
    },
    // 文字下划线
    underline: {
      type: Boolean,
      default: false,
    },
    // 文字不换行
    nowrap: {
      type: Boolean,
      default: false,
    },
    // 图标
    icon: {
      type: String,
      default: "",
    },
    // 图标放置位置
    iconPosition: {
      // `left` / `right`
      type: String,
      default: "left",
    },
  },
  data() {
    return { bem };
  },
};
</script>
<template>
  <span
    :class="
      bem({
        italic,
        truncate,
        block,
        uppercase,
        underline,
        bold,
        align: true,
        nowrap,
        ['color-' + color]: color !== 'current',
        [size]: size !== 'current',
      })
    "
    v-bind="$attrs"
    v-on="$listeners"
  >
    <i
      :class="[
        icon,
        `el-icon--left`,
        bem({ [iconSize]: iconSize !== 'current' }),
      ]"
      v-if="icon && iconPosition === 'left'"
    ></i>
    <!-- 任意文字 -->
    <slot />
    <i
      :class="[
        icon,
        `el-icon--right`,
        bem({ [iconSize]: iconSize !== 'current' }),
      ]"
      v-if="icon && iconPosition === 'right'"
    ></i>
  </span>
</template>
<style lang="scss" scoped>
@import "./index.scss";
</style>
