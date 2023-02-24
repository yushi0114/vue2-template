# 项目公共组件文档
本文档使用`@vuese/cli`通过.vue组件自动生成`markdown`文档，详情移往[`@vuese/cli`官网]: https://vuese.github.io/website/zh/#vuese-cli
需全局安装`@vuese/cli`: `npm i -g @vuese/cli`
>注：仅支持vue2.6版本，暂不支持vue2.7及以上，使用vue3语法的组件props及emits无法正常解析，暂时需自行查看组件源码。

## 组件使用说明
src/components/common 文件夹下的组件自动全局注册，如新增只需在common文件夹下新建文件夹开发即可，无需另行注册，开发规范可参照`Text`文件夹。
页面中直接使用组件即可，eg：
```
<sjc-text color="primary" bold>我是文字啊</sjc-text>
```