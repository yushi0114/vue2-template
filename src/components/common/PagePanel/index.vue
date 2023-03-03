<script>
import { falsyProp, makeStringProp, createNamespace } from "@/utils";
import Layout from "@/components/common/Layout";

const [name, bem] = createNamespace("page-panel");
/**
 * @group Common
 * 页面级容器盒子（添加背景色及外边距等功能）
 */
export default {
  name: "IPagePanel",
  components: {
    Layout,
  },
  props: {
    // 页面标题
    title: {
      type: String,
      default: "",
    },
    // 高度是否铺满
    full: {
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
  <Layout :class="bem()" v-bind="$attrs" v-on="$listeners">
    <!-- -->
    <header :class="bem('header')" v-if="title">
      {{ title }}
      <div :class="bem('header-rest')">
        <button>delete</button>
        <button>edit</button>
        <button>edit</button>
      </div>
    </header>
    <div :class="bem('content', { full })">
      <!-- 页面内容 -->
      <slot />
    </div>
  </Layout>
</template>

<style lang="scss">
@import "./index.scss";
</style>
