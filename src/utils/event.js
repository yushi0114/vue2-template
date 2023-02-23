import { isMobile } from './navigator.js';

/**
 * 判断是否在元素外触发事件
 * @param event  事件源
 * @param el 元素
 * @returns {*} true 在元素外 false 在元素内
 */
export function isOutEl(event, el) {
    let path = getEventPath(event);
    return !Array.from(path).includes(el);
}

/**
 * 获取事件冒泡路径
 * @description 兼容ie11,edge,chrome,firefox,safari
 * @param evt
 * @returns {Array}
 */
export function getEventPath(evt) {
    const path = (evt.composedPath && evt.composedPath()) || evt.path,
        target = evt.target;
    if (path != null) {
        return path.indexOf(window) < 0 ? path.concat(window) : path;
    }
    if (target === window) {
        return [window];
    }
    const getParents = (node, memo) => {
        memo = memo || [];
        const parentNode = node.parentNode;

        if (!parentNode) {
            return memo;
        } else {
            return getParents(parentNode, memo.concat(parentNode));
        }
    };
    return [target].concat(getParents(target), window);
}

/**
 * 获取移动端和pc端触摸（pc端鼠标模拟）事件名对象
 */
export function getTouchEventNameMap() {
    const isM = isMobile();
    const nameMap = {
        touchStart: isM ? 'touchstart' : 'mousedown',
        touchMove: isM ? 'touchmove' : 'mousemove',
        touchEnd: isM ? 'touchend' : 'mouseup',
    };
    return nameMap;
}
