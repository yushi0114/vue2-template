<script>
/**
 * @group Business
 * 列表（支持滚动或分页模式，自动处理加载/空状态，处理数据，通过默认插槽返回列表数据）
 */
export default {
  name: "List",
};
</script>
<script setup>
import { ref, watch, toRefs } from "vue";
import { noop } from "@/utils";
import { useList } from "@/composables";

const props = defineProps({
  watchList: {
    type: Boolean,
    default: true,
  },
  listApi: {
    type: Function,
    default: noop,
  },
  exportApi: {
    type: Function,
    default: noop,
  },
  filterOption: {
    type: Object,
    default: () => ({}),
  },
  options: {
    type: [Object, undefined],
    default: undefined,
  },
  flex: {
    type: Boolean,
    default: false,
  },
  isScroll: {
    type: Boolean,
    default: true,
  },
});

const scrollView = ref();
const { listApi, filterOption, exportApi, options } = toRefs(props);

const { isFinished, onEndReached, loading, list, filter } = useList(
  listApi,
  filterOption,
  exportApi,
  options
);

watch(loading, () => {
  // loading && scrollView.value?.finishLoadMore();
});

watch(listApi, () => {
  props.watchList && filter();
});

defineExpose({
  filter,
});
</script>

<template>
  <div
    v-if="isScroll"
    class="i-list"
    :class="[flex]"
    v-infinite-scroll="onEndReached"
    :infinite-scroll-disabled="isFinished"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <!-- 列表详情插槽 -->
    <slot :list="list"></slot>

    <!-- 自定义加载状态插槽 -->
    <slot name="loading" v-if="loading && list.length !== 0">
      <i-text align="center" size="sm" color="regular" block>
        加载中···
      </i-text>
    </slot>
    <!-- 自定义完成状态插槽 -->
    <slot name="empty" v-if="!loading && list.length === 0">
      <i-text align="center" size="sm" color="regular" block>
        没有更多数据了
      </i-text>
    </slot>
  </div>
  <div v-else class="i-list" :class="[flex]">
    <i-loading-board :loading="loading" :empty="list.length === 0">
      <!-- 列表详情插槽 -->
      <slot :list="list"></slot>
    </i-loading-board>
  </div>
</template>

<style lang="scss">
.i-list {
  &.flex {
    height: auto;
    flex: 1;
  }
}
</style>
