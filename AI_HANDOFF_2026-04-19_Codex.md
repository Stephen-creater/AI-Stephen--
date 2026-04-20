# AI Handoff - 2026-04-19

## 1. 任务背景

这个项目是前端开发实践课程的大作业，目标不是单纯“做一个 Vue 网站”，而是分两个阶段推进：

1. 阶段一：把 `_legacy/` 里的原始 HTML/CSS/JS 网站尽量 1:1 复刻到 Vue 3 + Vite + Vue Router + Tailwind 的 SPA 架构里。
2. 阶段二：只有在阶段一肉眼对齐、交互稳定之后，才允许继续做审美升级、数据驱动、内容扩展。

用户当前最在意的是阶段一，明确要求：

- 先尽可能完全复刻旧版视觉和交互。
- 不要先重构设计，不要先“优化成新风格”。
- 允许顶部导航保留现代毛玻璃感，但其余页面应尽量贴近 `_legacy`。

## 2. 你接手前已有的关键上下文

以下文件是本地已经存在、非常值得先读的历史上下文：

- 历史 AI 交接文档：
  - [handoff_document.md](/Users/a1-6/.gemini/antigravity/brain/71257331-4196-45cd-953b-4de71bdcd2e1/handoff_document.md)
- 历史工具调用流水：
  - [overview.txt](/Users/a1-6/.gemini/antigravity/brain/71257331-4196-45cd-953b-4de71bdcd2e1/.system_generated/logs/overview.txt)
- 较新一段 Gemini 临时聊天记录：
  - [session-2026-04-19T02-41-53014244.json](/Users/a1-6/.gemini/tmp/ai-stephen/chats/session-2026-04-19T02-41-53014244.json)

这些文件足够让你理解：

- 之前 AI 已经把项目从原生站迁到了 Vue。
- 迁移后出现了多轮“黑屏 / 内容透明 / 生命周期冲突 / 样式漂移 / 不像旧版”的问题。
- 用户已经明确要求后续 AI 优先把复刻做对，而不是继续发散。

## 3. 当前代码库结构

当前工作目录：

- `/Users/a1-6/Downloads/AI产品 Stephen`

当前关键目录：

- `_legacy/`
  - 原始旧站的 HTML/CSS/JS 真源，复刻时必须以它为基准。
- `src/views/`
  - Vue 路由页面：
    - `Home.vue`
    - `Portfolio.vue`
    - `Knowledge.vue`
    - `Interests.vue`
    - `Contact.vue`
- `src/components/`
  - `Navbar.vue`
- `src/directives/`
  - `fadeIn.js`
- `public/js/`
  - 从旧站复制出来的原生脚本：
    - `main.js`
    - `animations.js`
    - `modal.js`

## 4. 我这轮做了什么

### 4.1 全局骨架层修正

我修改了以下文件：

- [src/App.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/App.vue)
- [src/components/Navbar.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/components/Navbar.vue)
- [src/style.css](/Users/a1-6/Downloads/AI产品 Stephen/src/style.css)
- [tailwind.config.js](/Users/a1-6/Downloads/AI产品 Stephen/tailwind.config.js)
- [index.html](/Users/a1-6/Downloads/AI产品 Stephen/index.html)

主要目的：

- 把全局布局重新往 `_legacy` 的基线拉回去。
- Navbar 的品牌字色改回更接近旧版：
  - `My` 为紫色
  - `TechUniverse` 为白色
- `App.vue` 恢复为“顶部 Navbar + router-view”的简单壳层。
- 补了路由切换和 hash 锚点滚动逻辑。
- `tailwind.config.js` 颜色恢复到更贴近旧版的 `dark / purple.light / purple.dark`。
- 首页按钮的脉冲动画去掉了，因为实拍时比旧版更花。
- `index.html` 的标题和描述从默认 Vite 占位改成了项目实际内容。

### 4.2 页面稳定性修正

我修改了以下文件：

- [src/views/Portfolio.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Portfolio.vue)
- [src/views/Knowledge.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Knowledge.vue)
- [src/views/Interests.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Interests.vue)
- [src/views/Contact.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Contact.vue)

主要目的：

- 这些页面原来在 `onMounted()` 中大量手绑 DOM 事件，但没有清理。
- 我给多页加了 `AbortController` / `onUnmounted()` 清理逻辑，减少 Vue 路由反复切页后：
  - 事件重复绑定
  - 模态框重复打开/关闭
  - 复制提示重复触发
  - FAQ / hover / filter 行为叠加

### 4.3 内部导航统一成 SPA

我把多页页脚里的站内链接改成了 `router-link`，不再使用普通 `<a href="/...">`。

已经改过的页脚快速导航：

- `Home.vue`
- `Portfolio.vue`
- `Knowledge.vue`
- `Interests.vue`
- `Contact.vue`

目的：

- 减少整页刷新
- 避免因全刷导致的状态抖动
- 让问题更集中在页面自身，而不是导航模式混用

### 4.4 对 `v-fade-in` 问题做了两轮处理

我改过：

- [src/directives/fadeIn.js](/Users/a1-6/Downloads/AI产品 Stephen/src/directives/fadeIn.js)

我试图修复的问题：

- 一些首屏内容被 `v-fade-in` 永远卡在 `opacity: 0`
- 这和前面历史交接文档里提到的“Vue 生命周期 + 渐入逻辑导致黑屏/透明”的问题高度一致

我做过的尝试：

1. 在 `v-fade-in` 指令里加了“如果元素一开始就在视口内，则直接 reveal”的逻辑。
2. 但这个修复并不能稳定解决所有页面的首屏隐藏问题。
3. 所以我又做了更保守的处理：
   - 把几个页面首屏最关键的内容块从 `v-fade-in` 中移除。

已移除首屏 `v-fade-in` 的位置：

- `Portfolio.vue` 的首屏 hero 内容
- `Knowledge.vue` 的首屏 hero 内容
- `Contact.vue` 的首屏 hero 内容
- `Contact.vue` 的联系主卡片
- `Interests.vue` 的首屏 hero 内容
- `Knowledge.vue` 的前几张首屏知识卡片
- `Interests.vue` 的前几张首屏电影卡片

注意：

- 这不是根治。
- 这是为了优先保证“页面至少能正常显示首屏内容”。

## 5. 我做过的验证

### 5.1 构建验证

多次执行：

```bash
npm run build
```

最后一次仍然通过。

### 5.2 视觉验证

我使用 Playwright CLI 在本机做了截图对照。

当前截图目录：

- `/tmp/ai-stephen-shots`

关键截图文件：

#### 首页

- 当前：
  - `/tmp/ai-stephen-shots/home-current.png`
  - `/tmp/ai-stephen-shots/home-current-2.png`
  - `/tmp/ai-stephen-shots/home-after-fade-fix.png`
- 旧版：
  - `/tmp/ai-stephen-shots/home-legacy.png`

#### 作品页

- 当前：
  - `/tmp/ai-stephen-shots/portfolio-current.png`
  - `/tmp/ai-stephen-shots/portfolio-current-2.png`
  - `/tmp/ai-stephen-shots/portfolio-current-3.png`
- 旧版：
  - `/tmp/ai-stephen-shots/portfolio-legacy.png`

#### 知识库

- 当前：
  - `/tmp/ai-stephen-shots/knowledge-current-2.png`
  - `/tmp/ai-stephen-shots/knowledge-current-3.png`

#### 联系页

- 当前：
  - `/tmp/ai-stephen-shots/contact-current-2.png`
  - `/tmp/ai-stephen-shots/contact-current-3.png`
  - `/tmp/ai-stephen-shots/contact-current-4.png`
- 旧版：
  - `/tmp/ai-stephen-shots/contact-legacy.png`

#### 兴趣页

- 当前：
  - `/tmp/ai-stephen-shots/interests-current-2.png`
- 旧版：
  - `/tmp/ai-stephen-shots/interests-legacy.png`

## 6. 页面级当前状态

### 6.1 Home.vue

当前状态：**相对最接近旧版**

观察：

- Navbar 品牌字色已经更接近旧版
- 首页 Hero 区可见
- 和旧版相比，差异仍然存在，但已经不是“黑屏”问题
- 目前更像是：
  - 按钮视觉细节仍有差异
  - 版心、间距、按钮尺寸还可继续细调

建议：

- 用 `home-current-2.png` / `home-after-fade-fix.png` 对比 `home-legacy.png`
- 继续按肉眼做像素级微调，而不是重构

### 6.2 Portfolio.vue

当前状态：**首屏已恢复，不再是纯黑页**

观察：

- 在修正首屏 `v-fade-in` 后，页面标题和筛选区恢复可见
- 与旧版 `portfolio-legacy.png` 相比，当前仍有明显差异：
  - 首屏和卡片区之间的视觉衔接还有偏差
  - 我截图时第一排卡片看起来像深色占位块，和旧版的图片区块不一致
  - 这可能是图片实际渲染、懒加载时机、或卡片内容可见性问题

建议：

- 优先继续用截图对照第一屏
- 检查卡片图片和内容在首屏是否真正渲染成功
- 如果只是上半截被看到而图片实际在更下方，说明垂直 spacing 还需要收

### 6.3 Knowledge.vue

当前状态：**标题可见，但内容区还没有完全恢复**

观察：

- 首屏标题和说明文字已经可见
- 但首屏下方内容仍然偏暗，卡片没有像旧版一样正常出现
- 说明这个页面还有残留的“首屏渐入隐藏”问题

我已经做的动作：

- 移除了 hero 的 `v-fade-in`
- 移除了前几张知识卡片的 `v-fade-in`

但从最新截图看，问题还没有完全收干净。

建议：

- 下一位 AI 应该优先检查：
  - `.knowledge-card`
  - `setupScrollAnimations()`
  - `enhanceUIElements()`
  - 是否有首屏卡片仍被追加了隐藏类/状态

### 6.4 Contact.vue

当前状态：**已明显恢复，主结构可见**

观察：

- 一开始这里几乎是黑页
- 现在 hero 和主联系卡片都已经出来了
- 对比 `contact-legacy.png`，结构已经接近很多
- 还需要继续核对：
  - 间距
  - 玻璃感/边框强度
  - 输入框尺寸
  - 联系方式卡片的对齐

这是当前最有希望先收尾完成的页面之一。

### 6.5 Interests.vue

当前状态：**仍然有明显问题**

观察：

- 最新截图 `interests-current-2.png` 仍然接近黑页
- 说明这个页面除了首屏 hero 的 `v-fade-in` 外，还有别的问题

高概率原因：

- 页面中大量电影卡片、模态框、时间线块依然还挂着 `v-fade-in`
- `onMounted()` 内的电影模态逻辑比较复杂，可能也影响首屏稳定性
- 这是当前我没有来得及彻底排掉的重点问题

建议：

- 下一位 AI 应该把 `Interests.vue` 视为当前优先排障页之一
- 从“首屏为什么空”开始排，而不是先修电影详情内容

## 7. 我认为当前最核心的技术结论

### 结论 1：`v-fade-in` 仍然是阶段一复刻的最大敌人之一

它在 SPA 场景下对首屏非常不友好。  
只要某个首屏关键块被错误留在 `opacity: 0`，页面肉眼看起来就是“黑屏 / 空白 / 没渲染”。

### 结论 2：现在不要继续扩展功能

不要继续美化。  
不要继续做数据驱动。  
不要继续拆组件。  
不要继续做“更现代”的改造。

现在最值得做的是：

- 以 `_legacy/*.html` 为真源
- 用截图逐页对照
- 先让每页首屏和主要内容可见
- 再慢慢压视觉细节

### 结论 3：用截图驱动修复，比只看代码有效得多

我本轮最大的进展不是来自阅读代码，而是来自：

- 把当前页截出来
- 把 `_legacy` 原页截出来
- 直接对比

这会很快暴露出：

- 是完全黑页
- 还是首屏内容透明
- 还是间距偏了
- 还是卡片图片区没出来

## 8. 推荐的接手顺序

### 第一优先级

1. 先读本文件
2. 再读历史的 `handoff_document.md`
3. 跑一遍：

```bash
npm run dev -- --host 127.0.0.1
```

4. 用 Playwright 继续截图比对，而不是直接盲改

### 第二优先级：页面修复顺序

建议顺序：

1. `Contact.vue`
   - 因为已经基本恢复结构，最容易先收一个完整页面
2. `Portfolio.vue`
   - 首屏已恢复，但卡片区仍要继续压
3. `Knowledge.vue`
   - 首屏标题可见，但首屏内容仍有隐藏问题
4. `Interests.vue`
   - 当前问题最重，最后集中处理
5. `Home.vue`
   - 用作最终统一微调基准页

## 9. 我建议下一位 AI 具体先做什么

建议不要大改结构，先做下面这 5 步：

1. 重截四个当前问题页：
   - `/portfolio`
   - `/knowledge`
   - `/contact`
   - `/interests`
2. 对应截四个 `_legacy` 页
3. 继续把首屏关键块从 `v-fade-in` 中摘掉，直到页面不再黑/空
4. 一页一页压：
   - padding
   - margin
   - card 高度
   - 图片是否真的加载
5. 每修完一页就截一次图确认，不要只信代码

## 10. 当前改动文件清单

这轮我明确动过的文件：

- [index.html](/Users/a1-6/Downloads/AI产品 Stephen/index.html)
- [src/App.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/App.vue)
- [src/components/Navbar.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/components/Navbar.vue)
- [src/directives/fadeIn.js](/Users/a1-6/Downloads/AI产品 Stephen/src/directives/fadeIn.js)
- [src/style.css](/Users/a1-6/Downloads/AI产品 Stephen/src/style.css)
- [src/views/Home.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Home.vue)
- [src/views/Portfolio.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Portfolio.vue)
- [src/views/Knowledge.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Knowledge.vue)
- [src/views/Interests.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Interests.vue)
- [src/views/Contact.vue](/Users/a1-6/Downloads/AI产品 Stephen/src/views/Contact.vue)
- [tailwind.config.js](/Users/a1-6/Downloads/AI产品 Stephen/tailwind.config.js)

## 11. 最后提醒

当前仓库是脏工作区，不要随便重置。  
用户已经被前几轮错误改动折腾得很不耐烦了。  
最重要的是：

- 少讲方案
- 多给可见结果
- 少做大改
- 多做截图对照

如果下一位 AI 想无缝衔接，最好的起点不是“从头分析架构”，而是：

- 读这个 handoff
- 打开 `_legacy`
- 看截图
- 继续一页一页把首屏修出来
