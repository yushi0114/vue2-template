import { useRect, useWindowSize } from '../composables';
import { unref } from 'vue';
import { DataType } from './type';

// export type ScrollElement = Element | Window;

export function getScrollTop(el) {
  const top = 'scrollTop' in el ? el.scrollTop : el.pageYOffset;

  // iOS scroll bounce cause minus scrollTop
  return Math.max(top, 0);
}

export function setScrollTop(el, value) {
  if ('scrollTop' in el) {
    el.scrollTop = value;
  } else {
    el.scrollTo(el.scrollX, value);
  }
}

export function getRootScrollTop() {
  return (
    window.pageYOffset ||
    document.documentElement.scrollTop ||
    document.body.scrollTop ||
    0
  );
}

export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
}

// get distance from element top to page top or scroller top
export function getElementTop(el, scroller) {
  if (el === window) {
    return 0;
  }

  const scrollTop = scroller ? getScrollTop(scroller) : getRootScrollTop();
  return useRect(el).top + scrollTop;
}

// hack for iOS12 page scroll
// see: https://developers.weixin.qq.com/community/develop/doc/00044ae90742f8c82fb78fcae56800
export function resetScroll() {
  if (DataType.isIOS()) {
    setRootScrollTop(getRootScrollTop());
  }
}

export const stopPropagation = (event) => event.stopPropagation();

export function preventDefault(event, isStopPropagation) {
  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

export function isHidden(
  elementRef
) {
  const el = unref(elementRef);
  if (!el) {
    return false;
  }

  const style = window.getComputedStyle(el);
  const hidden = style.display === 'none';

  // offsetParent returns null in the following situations:
  // 1. The element or its parent element has the display property set to none.
  // 2. The element has the position property set to fixed
  const parentHidden = el.offsetParent === null && style.position !== 'fixed';

  return hidden || parentHidden;
}

export const { width: windowWidth, height: windowHeight } = useWindowSize();
