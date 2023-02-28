import { VNode, isVNode, provide, ref, getCurrentInstance } from "vue";

export function flattenVNodes(children) {
  const result = [];

  const traverse = (children) => {
    if (Array.isArray(children)) {
      children.forEach((child) => {
        if (isVNode(child)) {
          result.push(child);

          if (child.component?.subTree) {
            result.push(child.component.subTree);
            traverse(child.component.subTree.children);
          }

          if (child.children) {
            traverse(child.children);
          }
        }
      });
    }
  };

  traverse(children);

  return result;
}

const findVNodeIndex = (vnodes, vnode) => {
  const index = vnodes.indexOf(vnode);
  if (index === -1) {
    return vnodes.findIndex(
      (item) =>
        vnode.key !== undefined &&
        vnode.key !== null &&
        item.type === vnode.type &&
        item.key === vnode.key
    );
  }
  return index;
};

// sort children instances by vnodes order
export function sortChildren(parent, publicChildren, internalChildren) {
  const vnodes = flattenVNodes(parent.subTree?.children);

  internalChildren.sort(
    (a, b) => findVNodeIndex(vnodes, a.vnode) - findVNodeIndex(vnodes, b.vnode)
  );

  const orderedPublicChildren = internalChildren.map((item) => item.proxy);

  publicChildren.sort((a, b) => {
    const indexA = orderedPublicChildren.indexOf(a);
    const indexB = orderedPublicChildren.indexOf(b);
    return indexA - indexB;
  });
}

export function useChildren(key) {
  const publicChildren = ref([]);
  const internalChildren = ref([]);
  const parent = getCurrentInstance();

  const linkChildren = (value) => {
    const link = (child) => {
      if (child.proxy) {
        internalChildren.value.push(child);
        publicChildren.value.push(child.proxy);
        sortChildren(parent, publicChildren.value, internalChildren.value);
      }
    };

    const unlink = (child) => {
      const index = internalChildren.value.indexOf(child);
      publicChildren.value.splice(index, 1);
      internalChildren.value.splice(index, 1);
    };

    provide(
      key,
      Object.assign(
        {
          link,
          unlink,
          children: publicChildren,
          internalChildren: internalChildren,
        },
        value
      )
    );
  };

  return {
    children: publicChildren.value,
    linkChildren,
  };
}
