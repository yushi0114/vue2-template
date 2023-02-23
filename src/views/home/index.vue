<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
    };
  },
  methods: {
    handleSearch() {},
  },
};
</script>

<template>
  <sjc-page-panel full>
    <sjc-board full title="首页">
      <sjc-text>我是按钮啊</sjc-text>
      <el-input v-model="name">
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="handleSearch"
        ></el-button>
      </el-input>
    </sjc-board>
  </sjc-page-panel>
</template>

<style lang="scss"></style>
