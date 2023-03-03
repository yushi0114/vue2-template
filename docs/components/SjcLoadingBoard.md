# ILoadingBoard

处理加载及空状态盒子

## Props

<!-- @vuese:ILoadingBoard:props:start -->

| Name        | Description    | Type      | Required | Default  |
| ----------- | -------------- | --------- | -------- | -------- |
| loading     | 加载状态       | `Boolean` | `false`  | false    |
| empty       | 空状态         | `Boolean` | `false`  | false    |
| description | 空状态描述     | `String`  | `false`  | 暂无数据 |
| imageSize   | 空状态图片大小 | `Number`  | `false`  | 432      |
| image       | 空状态图片地址 | `String`  | `false`  | emptyImg |

<!-- @vuese:ILoadingBoard:props:end -->

## Slots

<!-- @vuese:ILoadingBoard:slots:start -->

| Name    | Description | Default Slot Content |
| ------- | ----------- | -------------------- |
| default | 实际内容    | -                    |

<!-- @vuese:ILoadingBoard:slots:end -->
