<script>
/**
 * @group Business
 * 列表单项（主要用于定义单项样式）
 */
export default {
  name: "ListItem",
};
</script>

<script setup>

defineProps({
    disabled: {
        type: Boolean,
        default: false,
    },
    variables: {
        type: Object,
        default: () => ({}),
    },
});
</script>

<template>
    <div
        class="sjc-list-item"
        :class="{ disabled }">
        <!-- -->
        <!-- 列表单项内容 -->
        <slot v-bind="variables" />
    </div>
</template>

<style lang="scss">
.sjc-list-item {
    position: relative;
    border-bottom: var(--sjc-border);
    padding: var(--sjc-padding-md);
}
</style>
