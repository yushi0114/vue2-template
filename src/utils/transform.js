/**
 * blobToDataURL
 * @param blob
 * @returns
 */
export const blobToDataURL = (blob) => {
    return new Promise((res, rej) => {
        let a = new FileReader();
        a.onload = function (e) {
            res(e.target.result);
        }
        a.onerror = function (e) { rej(e) }
        a.readAsDataURL(blob);
    })
}


/**
 * urlToBase64
 * @param imgUrl
 * @returns
 */
export const urlToBase64 = (imgUrl) => {
    return new Promise((res, rej) => {
        window.URL = window.URL || window.webkitURL;
        var xhr = new XMLHttpRequest();
        xhr.open("get", imgUrl, true);
        // 至关重要
        xhr.responseType = "blob";
        xhr.onload = function () {
            if (this.status == 200) {
                //得到一个blob对象
                var blob = this.response;
                console.log("blob", blob)
                // 至关重要
                let oFileReader = new FileReader();
                oFileReader.onloadend = function (e) {
                    // 此处拿到的已经是 base64的图片了
                    let base64 = e.target.result;
                    res(base64)
                };
                oFileReader.readAsDataURL(blob);
            }
        }
        xhr.onerror = function (e) {
            rej(e)
        }
        xhr.send();
    })

}

export const xhrRequest = (url) => {
    return new Promise((resolve, reject) => {
        //创建XMLHttpRequest对象
        var xhr = new XMLHttpRequest();
        //前两个参数固定，第三个参数true时是异步，false时是同步
        xhr.open("get", url, true);
        //选定输出格式为blob格式
        xhr.responseType = "blob";
        //onload后回调this本身  onload本身不携带参数
        xhr.onload = function () {
            resolve(xhr.response);
        };
        xhr.onerror = function (e) {
            reject(e);
        }
        //关闭xhr  一定要加
        xhr.send();
    })
}

// import Compressor from 'compressorjs'
/**
 * 文件压缩
 * @author maybe
 * @param {File | Blob | url} source 转入对象类型 File 或 Blob 或 http链接
 * @param {*} option  compressorjs 配置
 * @returns {Object{base64:string,file:File}}
 */
export const fileCompressor = (source, option) => {

    return new Promise(async (reslove, reject) => {
        try {
            // http链接资源
            if (typeof source == 'string') {
                const response = await xhrequest(source);
                console.log('xhrequest:', response)
                source = response;
            }

            // 合并配置
            option = Object.assign({
                quality: 0.6,
                convertSize: 1,
                // The compression process is asynchronous,
                // which means you have to access the `result` in the `success` hook function.
                success(result) {
                    console.log('fileCompressor success :', result)
                    // 文件名
                    const fileName = new Date().getTime();
                    // 构建文件对象
                    let file = new window.File([result], fileName, { type: result.type })

                    // 转化成base64
                    blobToDataURL(result)
                        .then((res) => {
                            reslove({
                                base64: res,
                                file
                            });
                        })
                        .catch((res) => {
                            reject(res);
                        });
                },
                error(err) {
                    console.error(err.message);
                    reject(err);
                },
            }, option)

            new Compressor(source, option);
        } catch (error) {
            reject(error);
        }
    });
}
