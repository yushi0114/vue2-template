/**
 * 判断是否移动设备访问
 * @returns {boolean} true 移动设备  false pc设备
 */
export function isMobile() {
    return /iphone|ipod|android.*mobile|windows.*phone|blackberry.*mobile/i.test(
        window.navigator.userAgent.toLowerCase()
    );
}

/**
 * 判断是否微信内置浏览器环境
 * @returns {boolean} true 微信环境  false 浏览器
 */
export function isWeixin() {
    const ua = navigator.userAgent.toLowerCase();
    const uaMatch = ua.match(/MicroMessenger/i);
    if (uaMatch == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
/**
 * 判断运行环境是安卓还是IOS
 * @returns  {boolean} true => 安卓 false => IOS
 */
export function isAndroid() {
    let u = navigator.userAgent;
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
    // let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    return isAndroid ? true : false;
}
