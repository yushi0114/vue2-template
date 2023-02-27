{
    "name": "<%= name %>",
    "version": "0.1.0",
    "private": true,
    "description": "<%= description %>",
    "scripts": {
        "serve": "vue-cli-service serve",
        "build": "vue-cli-service build",
        "build:test": "vue-cli-service build --mode test",
        "build:doc": "vuese gen && vuese serve --open"
    },
    "dependencies": {
        "@vueuse/core": "^9.1.1",
        "axios": "^0.27.2",
        "core-js": "^3.8.3",
        "crypto-js": "^4.1.1",
        "dayjs": "^1.11.7",
        "echarts": "^5.1.1",
        "element-ui": "^2.15.13",
        "js-cookie": "^3.0.1",
        "nprogress": "0.2.0",
        "vue": "^2.7.9",
        "vue-router": "^3.1.3",
        "vuex": "^3.6.2",
        "xss": "^1.0.13"
    },
    "devDependencies": {
        "@babel/core": "^7.12.16",
        "@vue/cli-plugin-babel": "~5.0.0",
        "@vue/cli-service": "~5.0.0",
        "babel-plugin-component": "^1.1.1",
        "compression-webpack-plugin": "^10.0.0",
        "css-loader": "^6.7.1",
        "html-loader": "^4.2.0",
        "markdown-loader": "^8.0.0",
        "sass": "^1.58.3",
        "sass-loader": "^13.2.0",
        "uglifyjs-webpack-plugin": "^2.2.0",
        "vue-template-compiler": "^2.6.14"
    }
}
