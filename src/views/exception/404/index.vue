<template>
  <el-result class="exception-wrapper" title="404" subTitle="抱歉，您访问的页面不存在">
    <template slot="icon">
      <el-image :src="img"></el-image>
    </template>
    <template slot="extra">
      <el-button type="primary" size="medium" @click="$router.push('/')"
        >返回</el-button
      >
    </template>
  </el-result>
</template>

<script>
import img from "@/assets/images/exception/assets-result-403.svg";

export default {
  name: "Exception404",
  data() {
    const _this = this;
    return {
      img
    };
  },
};
</script>

<style scoped>
.exception-wrapper {
  height: 100%;
  background-color: var(--sjc-background);
}
</style>
