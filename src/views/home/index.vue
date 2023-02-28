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
      <sjc-text class="btn" icon="el-icon-edit" icon-position="left">我是按钮啊</sjc-text>
      <sjc-text>我是按钮啊</sjc-text>
      <div>
        <el-button type="primary" @click="toggleText">切换文本长短</el-button>
      </div>

      <sjc-text-ellipsis
        :content="text"
        expand-text="展开"
        collapse-text="收起"
      />
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

<style lang="scss" scoped>
.btn {
  --sjc-text-color-default: red;
}
html.dark .btn {
  --sjc-text-color-default: green;
}
</style>
