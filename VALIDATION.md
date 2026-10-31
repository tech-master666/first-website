# Validation report

验证日期：2026-10-31。

## 自动检查

```text
OK: 6 pages and 12 required files passed static checks.
```

`components.js`、`main.js`、`data.js`、`package-detail.js` 均通过 Node 语法检查。

## 浏览器检查

使用真实浏览器分别检查默认桌面视口与 390 × 844 手机视口。

| 检查项 | 结果 |
|---|---|
| 首页卡片 | 3 个 |
| Packages 卡片 | 9 个 |
| 动态详情 | `?id=nepal` 正确显示 Nepal 标题 |
| 六页横向溢出 | 0px |
| 图片加载失败 | 0 |
| 控制台错误/警告 | 0 |
| 移动菜单 | 可展开 |
| Gallery Nature 筛选 | 4 项 |
| Gallery 灯箱 | 可打开 |
| 联系表单 | 校验成功，未发送数据 |

## VS Code / 本地服务修复复验

- 实际项目目录：`C:\Users\zjm27\Documents\Codex\2026-10-31\new-chat\outputs\Xplore-Project`
- 原故障原因：5500 端口此前服务的是 `D:\桌面\VSCode` 下的旧学习目录，因此根路径显示目录列表，子目录显示“我旅行网站”，并非本项目源码。
- 已把实际 Xplore 项目作为 VS Code 工作区打开。
- Microsoft Live Preview `ms-vscode.live-server` 已安装并通过 3000 端口提供内嵌预览。
- Live Server 通过 5500 端口提供本项目根目录；`/`、CSS 和 JavaScript 资源均返回 200。
- 临时修改首页标签后，内嵌预览自动刷新；复原后文件哈希与修改前一致。
- DevTools Elements、元素选择器和 Styles 面板已实际打开验证。

## 完整浏览器矩阵

使用 Chromium 检查桌面 1440 × 900 与手机 390 × 844，每种视口覆盖全部 6 页，共 12 组：

```text
BROWSER_MATRIX=12
BROWSER_MATRIX_FAILED=0
```

同时通过：首页评价切换、9 个套餐、Nepal 动态详情、Gallery 筛选与灯箱、联系表单前端校验、手机导航菜单。

两张较大的 Unsplash 图片在首次 2.5 秒快速检查中尚未完成解码；延长等待并检查图片完成状态后均正常加载。其 URL 也分别返回 HTTP 200，因此不是缺图或失效链接。

## 源码与页面联动复验

- 已在实际 VS Code 安装 HTML Live Highlighter `PrimeTek.html-live-highlighter` 1.0.3，并打开其内嵌预览（本机代理 3131 端口）。
- 点击 `index.html` 的 `<div class="trip-grid">` 时，预览自动滚动到套餐卡片并显示蓝色高亮框；点击首屏容器代码时，高亮移到首屏。
- 预览已放在左侧，源码在右侧；关闭聊天侧栏后有更宽的对照空间。
- 扩展只对 HTML 中直接出现的元素建立源码映射。运行时由 JavaScript 生成的细项只能定位到其 HTML 容器。

## 未覆盖

- 真实邮件或表单后端。
- GitHub / Cloudflare Pages 生产构建。
- Safari 和 Firefox 的设备实测。
- 与商业参考模板的像素级一一比对。
- 远程图片和字体在弱网、断网环境下的离线可用性。
