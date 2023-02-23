import { Ref, watch, isRef, unref, onUnmounted, onDeactivated } from 'vue';
import { onMountedOrActivated } from '../onMountedOrActivated';
import { inBrowser } from '../utils';

// export type UseEventListenerOptions = {
//   target?: TargetRef;
//   capture?: boolean;
//   passive?: boolean;
// };

// export function useEventListener(
//   type: K,
//   listener: (event: DocumentEventMap[K]) => void,
//   options?: UseEventListenerOptions
// ): void;
// export function useEventListener(
//   type: string,
//   listener: EventListener,
//   options?: UseEventListenerOptions
// ): void;
export function useEventListener(
  type,
  listener,
  options = {}
) {
  if (!inBrowser) {
    return;
  }

  const { target = window, passive = false, capture = false } = options;

  let attached;

  const add = (target) => {
    const element = unref(target);

    if (element && !attached) {
      element.addEventListener(type, listener, {
        capture,
        passive,
      });
      attached = true;
    }
  };

  const remove = (target) => {
    const element = unref(target);

    if (element && attached) {
      element.removeEventListener(type, listener, capture);
      attached = false;
    }
  };

  onUnmounted(() => remove(target));
  onDeactivated(() => remove(target));
  onMountedOrActivated(() => add(target));

  if (isRef(target)) {
    watch(target, (val, oldVal) => {
      remove(oldVal);
      add(val);
    });
  }
}
