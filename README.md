# Xplore — editorial travel website

一个用于前端学习的六类页面静态网站，以 Xplore Webflow 演示站的公开页面结构为研究参考，使用原生 HTML、CSS 和 JavaScript 独立实现。

## 运行

在本目录打开终端：

```powershell
py -m http.server 4173
```

然后访问 <http://localhost:4173>。

直接双击 `index.html` 也能浏览主要页面，但建议使用本地服务器，以便测试 URL 参数和模块脚本。

## 页面

- `index.html`：首页
- `about.html`：关于团队
- `packages.html`：九个旅行套餐
- `package.html?id=bali`：数据驱动的套餐详情
- `gallery.html`：可筛选画廊和灯箱
- `contact.html`：联系信息与前端表单验证

## 验证

```powershell
node tests/check-site.mjs
```

## 当前边界

- 表单仅进行浏览器端校验，不发送数据；成功提示会明确说明这一点。
- 图片来自 Unsplash 远程 CDN，首次打开需要联网。
- 本项目是独立学习实现，不包含 Webflow 商业模板的私有工程或原始素材。
- 尚未执行 GitHub 推送、Cloudflare Pages 发布或域名绑定。

## 图片来源

演示图片由 [Unsplash](https://unsplash.com/) 提供。发布或商业使用前应再次核对每张图片与字体的最新许可条件。

