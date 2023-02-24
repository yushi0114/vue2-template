<template>
  <el-result class="exception-wrapper" title="403" subTitle="抱歉，您无权限访问此页面">
    <template slot="icon">
      <el-image
        :src="img"
      ></el-image>
    </template>
    <template slot="extra">
      <el-button type="primary" size="medium" @click="$router.push('/')">返回</el-button>
    </template>
  </el-result>
</template>

<script>
import img from "@/assets/images/exception/assets-result-403.svg";

export default {
  name: "Exception403",
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
  background-color: var(--sjc-background);
}
</style>
