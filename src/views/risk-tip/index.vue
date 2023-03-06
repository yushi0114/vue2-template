// 风险提示页
<template>
  <div class="box">
    <div class="tip-box">
      <div class="logo">
        <div class="logo-content"></div>
      </div>

      <div class="content">
        <i-text class="title" color="paragraph" size="lg"
          >即将离开金融栈 数据管理，请注意账号财产安全</i-text
        >
        <div class="link">{{ target }}</div>
        <button class="btn" @click="navigateToTarget">继续访问</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { openWindow } from "@/utils";
import { ref, onMounted } from "vue";
const target = ref("");

// 获取 url
const getTargetURL = () => {
  const query = window.location.href.split("?")[1] || "";
  const _target = query.split("target=")[1] || "";
  target.value = window.decodeURIComponent(_target);
};

// 跳转页面
const navigateToTarget = () => {
  if (!target.value) {
    return;
  }

  openWindow(target.value);
};

onMounted(() => {
  getTargetURL();
});
</script>

<style scoped lang="scss">
.box {
  height: 100vh;
  background-color: var(--el-bg-color);
}

.box .tip-box {
  position: absolute;
  left: 50%;
  top: 30%;
  max-width: 624px;
  width: 86%;
  background-color: var(--el-bg-color);
  transform: translateX(-50%);
  padding: 30px 40px 0;
  box-sizing: border-box;
  border: var(--el-border);
  border-radius: var(--i-radius-sm);
}

.box .tip-box .logo {
  display: block;
  width: 150px;
  height: 24px;
  position: absolute;
  top: -40px;
  left: 0;
  color: white;
}

.box .tip-box .logo .logo-content {
  width: 100%;
  height: 100%;
  // background: url('@/assets/images/jinrongzhan-logo-blue.svg') no-repeat center;
  background-size: 100% 100%;
}

.box .tip-box .content .link {
  padding: 16px 0 24px;
  border-bottom: var(--el-border-width) var(--el-border-style)
    var(--el-border-color-light);
  position: relative;
  color: gray;
  font-size: 14px;
}

.box .tip-box .content .btn {
  display: block;
  margin: 20px 0 24px auto;
  color: #fff;
  border-radius: 3px;
  border: none;
  background: var(--el-color-primary);
  height: 32px;
  font-size: 14px;
  padding: 0 14px;
  cursor: pointer;
  outline: 0;
}
</style>
