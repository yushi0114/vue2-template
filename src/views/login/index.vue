<script>
import { AuthApi } from "@/api";
import { mapActions } from "vuex";
import { createNamespace, omit } from "@/utils";

const [name, bem] = createNamespace("login");
export default {
  name,
  data() {
    return {
      bem,
      countAndPasswordForm: {
        account: "13120297250",
        verifyCode: "",
        captcha: "",
        password: "8992E19C4A8F5A992FDC71C0C61B72F7",
      },
    };
  },
  mounted() {
    this.getVerifyCode();
  },
  methods: {
    ...mapActions("user", ["login"]),
    getVerifyCode() {
      return AuthApi.getVerifyCode()
        .then(({ captcha }) => {
          this.countAndPasswordForm.verifyCode = captcha;
        })
        .catch(() => {});
    },
    handleLogin() {
      this.login(omit(this.countAndPasswordForm, ['verifyCode'])).then(() => {
        this.$router.push('/');
      });
    },
  },
};
</script>

<template>
  <div :class="bem()">
    <el-input v-model="countAndPasswordForm.captcha" placeholder=""></el-input>
    <div
      :class="bem('code')"
      @click="getVerifyCode"
      v-html="countAndPasswordForm.verifyCode"
    ></div>
    <el-button @click="handleLogin">登录</el-button>
  </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>
