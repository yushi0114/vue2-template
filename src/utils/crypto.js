const CryptoJS = require('crypto-js');

const CryptoUtil = {
    aes: {
        key: CryptoJS.enc.Utf8.parse('pH2qO2gB2cP4gJ5r'),
        iv: CryptoJS.enc.Utf8.parse('uX6mB2xK3sQ4rX9g')
    }
};

/**
 * AES加密
 * @param message
 * @returns {string}
 */
export const encrypt = function(message) {
    let srcs = CryptoJS.enc.Utf8.parse(message);
    //密钥必须是16位，且避免使用保留字符
    let encryptedData = CryptoJS.AES.encrypt(srcs, CryptoUtil.aes.key, {
        iv: CryptoUtil.aes.iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    let result = encryptedData.ciphertext.toString().toUpperCase();

    return result;
};

/**
 * MD5加密，以HEX（十六进制）为结果输出
 * @param message
 * @returns {string}
 */
export const encryptHexMd5 = function(message) {
    return CryptoJS.MD5(message).toString();
};