# 内置样式

### 介绍

默认包含了一些常用样式，可以直接通过 className 的方式使用。

### 文字省略

当文本内容长度超过容器最大宽度时，自动省略多余的文本。

```html
<!-- 最多显示一行 -->
<div class="sjc-ellipsis">这是一段最多显示一行的文字，多余的内容会被省略</div>

<!-- 最多显示两行 -->
<div class="sjc-multi-ellipsis--l2">
  这是一段最多显示两行的文字，多余的内容会被省略
</div>

<!-- 最多显示三行 -->
<div class="sjc-multi-ellipsis--l3">
  这是一段最多显示三行的文字，多余的内容会被省略
</div>
```

### 动画

可以通过 `transition` 组件使用内置的动画类。

```html
<!-- 淡入 -->
<transition name="sjc-fade">
  <div v-show="visible">Fade</div>
</transition>

<!-- 上滑进入 -->
<transition name="sjc-slide-up">
  <div v-show="visible">Slide Up</div>
</transition>

<!-- 下滑进入 -->
<transition name="sjc-slide-down">
  <div v-show="visible">Slide Down</div>
</transition>

<!-- 左滑进入 -->
<transition name="sjc-slide-left">
  <div v-show="visible">Slide Left</div>
</transition>

<!-- 右滑进入 -->
<transition name="sjc-slide-right">
  <div v-show="visible">Slide Right</div>
</transition>
```

### 点击反馈

为元素添加点击反馈效果，点击后，元素的透明度会降低。

通常用于按钮等可点击的元素上。

```html
<div class="sjc-haptics-feedback"></div>
```

### 清除浮动

清除元素在 float 布局下的浮动，

```html
<div class="sjc-clearfix"></div>
```
