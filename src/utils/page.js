/**
 * 获取页面高度
 * @returns {number} 页面高度
 */
export function getPageHeight() {
    var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == 'BackCompat' ? a : g.documentElement;
    return Math.max(f.scrollHeight, a.scrollHeight, d.clientHeight);
}
/**
 * 获取页面宽度
 * @returns {number} 页面宽度
 */
export function getPageWidth() {
    var g = document,
        a = g.body,
        f = g.documentElement,
        d = g.compatMode == 'BackCompat' ? a : g.documentElement;
    return Math.max(f.scrollWidth, a.scrollWidth, d.clientWidth);
}

/**
 * 元素是否在视窗内
 * @param {*} el
 * @returns {boolean} true 元素在视窗内 false 元素不在视窗内
 */
export function isInViewPort(el) {
    //获取屏幕高度
    let windowTop =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight;
    // 获取元素相对视窗的位置
    const { top, bottom } = el.getBoundingClientRect();
    if (bottom > 0 && top < windowTop) {
        // 已经进入可视区
        console.log('已经进入可视区');
        return true;
    } else {
        // 未进入可视区
        console.log('未进入可视区');
        return false;
    }
}
