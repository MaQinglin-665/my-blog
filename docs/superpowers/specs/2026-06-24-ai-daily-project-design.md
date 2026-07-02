# AI Daily 作品页更新设计

## 背景

本次只更新博客作品集中的 `AI Daily` 项目展示，不写 Notion 文章，不修改博客路由、导航语义、部署配置或内容模型。

`D:\AI日报` 是本机真实项目，和 GitHub 仓库 `MaQinglin-665/ai-daily` 对应。项目是一个 Next.js + SQLite 的 AI 日报应用，包含日报生成、导入、封面图、音频播放、管理流、Minecraft 风格阅读界面和自托管部署脚本。

## 目标

新增或更新作品页中的 `AI Daily` 项目，让它作为精选项目出现在作品集靠前位置。

作品定位采用用户确认的 A + C：

- 个人 AI 日报发布系统。
- AI 内容自动化工程项目。

Minecraft 风格 UI 用作真实视觉成果和截图证据，但不把项目包装成纯 UI 展示。

## 范围

### 包含

- 在 `src/data/projects.ts` 新增 `AI Daily` 项目数据。
- 设置项目状态为 `Public Preview`。
- 设置 `featured: true`，并让它在首页和作品页预览中靠前。
- 增加线上访问链接：`http://175.178.199.245/ai-daily`。
- 增加 GitHub 链接：`https://github.com/MaQinglin-665/ai-daily`。
- 使用真实页面截图作为作品封面、展示图和可选 gallery 图片。
- 更新 `feature_list.json`、`progress.md`、`session-handoff.md`，记录范围、证据、风险和下一步。

### 不包含

- 不新增 Notion 文章。
- 不修改 Notion 内容管线。
- 不改博客路由、导航语义、环境变量名或部署方式。
- 不对 `D:\AI日报` 项目做功能修改。
- 不承诺 GitHub 仓库对未登录用户公开可见；作品页只提供链接。

## 内容设计

### 项目基础信息

- `title`: `AI Daily`
- `slug`: `ai-daily`
- `category`: `AI 内容系统`
- `status`: `Public Preview`
- `language`: `TypeScript`
- `year`: `2026`
- `updatedAt`: `2026-06-24`
- `tags`: `AI 日报`、`Next.js`、`SQLite`、`内容自动化`、`TTS`

### 文案重点

项目说明应覆盖这些事实：

- 它不是普通新闻列表，而是面向个人使用的 AI 日报生产和阅读系统。
- 内容侧有生成、导入、校验、SQLite 写入和归档浏览。
- 媒体侧有封面任务、图片应用状态、音频播放和文章详情页体验。
- 工程侧有 Vitest、TypeScript 检查、Docker 和自托管部署脚本。
- 阅读体验采用 Minecraft 风格界面，但这服务于产品辨识度和阅读仪式感。

### 展示结构

沿用现有项目详情模板：

- `summary`: 一句话说明 AI Daily 的用途和当前阶段。
- `description`: 说明从内容生成到公开预览的完整链路。
- `detailSections`: 写项目目标、自动化链路、阅读体验。
- `modules`: 写生成/导入、SQLite 内容状态、封面与音频、公开预览部署。
- `timeline`: 写从本地工具到公开预览的阶段。
- `challenges`: 写内容质量校验、生成资产和部署持久化等问题。
- `highlights`: 保持 3 条强证据，优先写已实现能力。
- `nextSteps`: 保持诚实，不把未来工作说成已完成。

## 截图策略

优先从真实页面截取，不使用占位图。

候选截图：

- 首页桌面图：作为 `coverUrl` 和 `demoImageUrl` 的首选。
- 文章详情页：展示阅读、封面和音频体验。
- 移动端首页或详情页：用于说明响应式体验。
- 归档或新闻列表页：用于展示日报内容组织。

截图来源优先级：

1. 线上地址 `http://175.178.199.245/ai-daily`。
2. 本机 `D:\AI日报` 开发或生产服务。
3. 已存在的 `D:\AI日报\mc-*.png` 验证截图。

最终图片保存到 `public/images/projects/`，文件名使用 `ai-daily-*.webp` 或 `ai-daily-*.png`。

## 验证计划

实现完成后必须运行：

```powershell
npm run build
git diff --check
```

视觉任务还必须浏览器检查：

- 首页 `/`
- 作品页 `/projects/`
- AI Daily 详情页 `/projects/ai-daily/`
- 桌面视口
- 约 390px 移动端视口

检查重点：

- 无横向溢出。
- 文字不重叠。
- 图片加载成功。
- 封面和详情页裁切合理。
- 外部链接存在且指向用户确认的地址。

## 风险

- 当前博客工作树已有许多旧脏改动，实施时只能改本次所需文件，不回滚无关内容。
- 线上地址目前返回 200，但后续可能受服务器状态影响；验证时需要记录实际结果。
- GitHub 链接在未登录浏览器中可能不可见；文案不应承诺公开源码可读。
- 如果新增精选项目改变首页预览顺序，需要用浏览器确认首屏仍然合理。
