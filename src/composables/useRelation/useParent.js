import {
  ref,
  inject,
  computed,
  onUnmounted,
  getCurrentInstance,
} from 'vue';

// type ParentProvide<T> = T & {
//   link(child: ComponentInternalInstance): void;
//   unlink(child: ComponentInternalInstance): void;
//   children: ComponentPublicInstance[];
//   internalChildren: ComponentInternalInstance[];
// };

export function useParent(key) {
  const parent = inject(key, null);

  if (parent) {
    const instance = getCurrentInstance();
    const { link, unlink, internalChildren } = parent;

    link(instance);
    onUnmounted(() => unlink(instance));

    const index = computed(() => internalChildren.indexOf(instance));

    return {
      parent,
      index,
    };
  }

  return {
    parent: null,
    index: ref(-1),
  };
}
