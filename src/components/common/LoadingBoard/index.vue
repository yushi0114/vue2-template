<script>
import emptyImg from "@/assets/images/no-data.png";
import Layout from "@/components/common/Layout";
import { createNamespace } from "@/utils";

const [name, bem] = createNamespace("loading-board");
/**
 * @group Common
 * 处理加载及空状态盒子
 */
export default {
  name: "SjcLoadingBoard",
  components: {
    Layout,
  },
  props: {
    // 加载状态
    loading: {
      type: Boolean,
      default: false,
    },
    // 空状态
    empty: {
      type: Boolean,
      default: false,
    },
    // 空状态描述
    description: {
      type: String,
      default: "暂无数据",
    },
    // 空状态图片大小
    imageSize: {
      type: Number,
      default: 432,
    },
    // 空状态图片地址
    image: {
      type: String,
      default: emptyImg,
    },
  },
  data() {
    return { bem };
  },
};
</script>

<template>
  <Layout :class="bem()">
    <!-- -->
    <Layout
      v-show="loading"
      v-loading="loading"
      element-loading-text="加载中"
    ></Layout>
    <Layout v-show="!loading && empty">
      <FlexRow horizontal="center" full>
        <el-empty
          :image="image"
          :image-size="imageSize"
          :description="description"
        />
      </FlexRow>
    </Layout>
    <transition name="loading">
      <Layout v-show="!loading && !empty">
        <!-- 实际内容 -->
        <slot></slot>
      </Layout>
    </transition>
  </Layout>
</template>

<style lang="scss">
@import "./index.scss";
</style>
