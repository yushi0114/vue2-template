<script>
export default {
  name: "Home",
  data() {
    return {
      name: "",
      longer:
        "Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。",
      short:
        "Message 消息提示 常用于主动操作后的反馈提示。与 Notification 的区别是后者更多用于系统级通知的被动提醒。",
      text: "",
    };
  },
  created() {
    this.text = this.longer;
  },
  methods: {
    handleSearch() {},
    toggleText() {
      this.text === this.longer
        ? (this.text = this.short)
        : (this.text = this.longer);
    },
  },
};
</script>

<template>
    <i-board full title="首页">
      <i-text class="btn" icon="el-icon-edit" icon-position="left"
        >我是按钮啊</i-text
      >
      <i-text>我是按钮啊</i-text>
      <div>
        <el-button type="primary" @click="toggleText">切换文本长短</el-button>
      </div>

      <i-text-ellipsis
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
    </i-board>
</template>

<style lang="scss" scoped>
.btn {
  --i-text-color-default: red;
}
html.dark .btn {
  --i-text-color-default: green;
}
</style>
