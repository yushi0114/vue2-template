<script>
/**
 * @vuese
 * @group Common
 * 对长文本进行省略，支持展开/收起。
 */
export default {
  name: "SjcTextEllipsis",
};
</script>

<script setup>
import { ref, watch, onMounted } from "vue";

// Composables
import { useEventListener } from "@/composables";
import { createNamespace, makeNumericProp, makeStringProp } from "@/utils";
import SjcText from "../Text";
const [name, bem] = createNamespace("text-ellipsis");
const props = defineProps({
  rows: makeNumericProp(1),
  content: makeStringProp(""),
  expandText: makeStringProp(""),
  collapseText: makeStringProp(""),
});

const emits = defineEmits(["clickAction"]);

const text = ref("");
const expanded = ref(false);
const hasAction = ref(false);
const root = ref();

const pxToNum = (value) => {
  if (!value) return 0;
  const match = value.match(/^\d*(\.\d*)?/);
  return match ? Number(match[0]) : 0;
};

const calcEllipsised = () => {
  const cloneContainer = () => {
    if (!root.value) return;

    const originStyle = window.getComputedStyle(root.value);
    console.log("originStyle: ", originStyle);
    const container = document.createElement("div");
    const styleNames = Array.prototype.slice.apply(originStyle);
    styleNames.forEach((name) => {
      container.style.setProperty(name, originStyle.getPropertyValue(name));
    });

    container.style.position = "fixed";
    container.style.zIndex = "-9999";
    container.style.top = "-9999px";
    container.style.height = "auto";
    container.style.minHeight = "auto";
    container.style.maxHeight = "auto";

    container.innerText = props.content;
    document.body.appendChild(container);
    return container;
  };

  const calcEllipsisText = (container, maxHeight) => {
    const { content, expandText } = props;
    const dot = "...";
    let left = 0;
    let right = content.length;
    let res = -1;

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      container.innerText = content.slice(0, mid) + dot + expandText;
      if (container.offsetHeight <= maxHeight) {
        left = mid + 1;
        res = mid;
      } else {
        right = mid - 1;
      }
    }
    return content.slice(0, res) + dot;
  };

  const container = cloneContainer();
  if (!container) return;

  const { paddingBottom, paddingTop, lineHeight } = container.style;
  const maxHeight =
    (Number(props.rows) + 0.5) * pxToNum(lineHeight) +
    pxToNum(paddingTop) +
    pxToNum(paddingBottom);
  if (maxHeight < container.offsetHeight) {
    hasAction.value = true;
    text.value = calcEllipsisText(container, maxHeight);
  } else {
    hasAction.value = false;
    text.value = props.content;
  }

  document.body.removeChild(container);
};

const onClickAction = (event) => {
  expanded.value = !expanded.value;
  emit("clickAction", event);
};

onMounted(calcEllipsised);

watch(() => [props.content, props.rows], calcEllipsised);

useEventListener("resize", calcEllipsised);
</script>

<template>
  <sjc-text block v-bind="$attrs" v-on="$listeners">
    <div ref="root" :class="bem()">
      {{ expanded ? content : text }}
      <span v-if="hasAction" :class="bem('action')" @click="onClickAction">
        {{ expanded ? collapseText : expandText }}
      </span>
    </div>
  </sjc-text>
</template>

<style lang="scss">
@import "./index.scss";
</style>
