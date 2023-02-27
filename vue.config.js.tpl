const { defineConfig } = require('@vue/cli-service');
const CompressionPlugin = require('compression-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
let proxyHost = '10.0.30.5';
module.exports = defineConfig({
    transpileDependencies: true,
    productionSourceMap: false,
    outputDir: '<%= name %>',
    // publicPath: "/fstack/",
    configureWebpack: {
        plugins: [
            new CompressionPlugin({
                test: /\.js$|\.html$|.css/, // 匹配文件名
                threshold: 102400, // 对超过100k的数据进行压缩
                deleteOriginalAssets: false, // 是否删除源文件
            }),
        ],
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        output: {
                            // 删除注释
                            comments: false,
                        },
                        //生产环境自动删除console
                        compress: {
                            //warnings: false,
                            drop_debugger: true, //清除 debugger 语句
                            drop_console: true, //清除console语句
                            pure_funcs: ['console.log'],
                        },
                    },
                    sourceMap: false,
                    parallel: true,
                }),
            ],
        },
        module: {
            rules: [
        {
          test: /\.md$/,
          use: [
            {
              loader: 'html-loader',
            },
            {
              loader: 'markdown-loader',
            },
          ],
        },
      ],
        },
    },
    css: {
        loaderOptions: {},
    },
    devServer: {
        proxy: {
            '/clib-service': {
                target: `http://${proxyHost}:10209`, // 测试地址
                changeOrigin: true,
            },
            '/lncredit': {
                target: 'http://10.0.30.9',
                changeOrigin: true,
            },
            '/zjfw': {
                target: 'http://10.0.30.9',
                changeOrigin: true,
            },
        },
    },
});
