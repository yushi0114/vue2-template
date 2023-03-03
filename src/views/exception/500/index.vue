<template>
  <el-result
    class="exception-wrapper"
    title="500"
    subTitle="抱歉，服务器出错啦"
  >
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
import img from "@/assets/images/exception/assets-result-500.svg";
export default {
  name: "Exception500",
  data() {
    const _this = this;
    return {
      img,
    };
  },
};
</script>

<style scoped>
.exception-wrapper {
  height: 100%;
  background-color: var(--i-background);
}
</style>
