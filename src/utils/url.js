/**
 * 将url的查询参数解析成字典对象(正则)
 * @param url url地址
 * @returns {object} 解析完成的对象
 */
export function getQueryObject(url) {
    url = url == null ? window.location.href : url;
    var search = url.substring(url.lastIndexOf('?') + 1);
    var obj = {};
    var reg = /([^?&=]+)=([^?&=]*)/g;
    // [^?&=]+表示：除了？、&、=之外的一到多个字符
    // [^?&=]*表示：除了？、&、=之外的0到多个字符（任意多个）
    search.replace(reg, function (rs, $1, $2) {
        var name = decodeURIComponent($1);
        var val = decodeURIComponent($2);
        val = String(val);
        obj[name] = val;
        return rs;
    });
    return obj;
}

/**
 * @description: 对象url参数化
 * @param {object} obj
 * @return {string}
 */
export function getObjectToQuery(obj) {
    var tempArr = [];
    for (var i in obj) {
        tempArr.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
    }
    return tempArr.join('&');
}
