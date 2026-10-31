# Design system

## 方向

自然旅行杂志：克制的黑白编辑式排版与饱满旅行摄影形成对比。记忆点是超大衬线斜体词与不对称图片构图。

## 字体

- 展示：Playfair Display，400/500，斜体用于强调词。
- 正文：DM Sans，400/500/600。
- 通过 Google Fonts 加载，CSS 中提供 Georgia 与 sans-serif 回退。

## 颜色

- Ink `#11110f`
- Paper `#f7f5ef`
- White `#ffffff`
- Mist `#e8e6df`
- Moss `#5f684f`
- Clay `#b96e48`

## 尺度

- 最大内容宽度：1440px。
- 桌面边距：clamp(24px, 6.8vw, 100px)。
- 桌面标题：clamp(64px, 8vw, 126px)。
- 页面标题：clamp(58px, 8vw, 112px)。
- 区段间距：clamp(80px, 11vw, 160px)。

## 组件

- 胶囊按钮、细线标签、圆形箭头按钮。
- 旅行卡片使用 3:4 摄影比例和下方结构化信息。
- Section 标题允许斜体词越过网格，形成编辑感。
- 动画遵守 `prefers-reduced-motion`。

