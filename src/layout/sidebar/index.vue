<script>
import { createNamespace, makeArrayProp } from "@/utils";
import { defineComponent } from "vue";
const [name, bem] = createNamespace("sidebar");

export default defineComponent({
  name,
  props: {
    options: makeArrayProp(),
  },

  computed: {
    activePath() {
      return (item) => {
        return this.$route.path.startsWith(item.path);
      };
    },
  },

  data() {
    return { bem };
  },

  methods: {
    handleWrap(item) {
      this.$router.push(item.path);
    },
  },
});
</script>

<template>
  <div :class="bem()">
    <div
      :class="bem('item', { active: activePath(item) })"
      v-for="item in options"
      :key="item.path"
      @click="handleWrap(item)"
    >
      <i-texthoverable>{{ item.title }}</i-texthoverable>
    </div>
  </div>
</template>

<style lang="scss">
@import "./index.scss";
</style>
