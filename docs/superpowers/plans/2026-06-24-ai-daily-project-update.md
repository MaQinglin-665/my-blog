# AI Daily Project Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add `AI Daily` as a featured portfolio project with real screenshots, public preview link, GitHub link, and verification evidence.

**Architecture:** Keep the existing Astro project data model and project detail template. Add one focused project object in `src/data/projects.ts`, add screenshots under `public/images/projects/`, then update harness state files with evidence.

**Tech Stack:** Astro 5, TypeScript data objects, Tailwind-backed global CSS, Playwright/browser verification, PowerShell on Windows.

---

## File Map

- Modify: `src/data/projects.ts` - add the `AI Daily` project object before `AI 狼人杀 Alpha` so it appears first in featured previews.
- Create: `public/images/projects/ai-daily-home-desktop.png` or `.webp` - primary desktop screenshot.
- Create: `public/images/projects/ai-daily-detail-desktop.png` or `.webp` - article/detail screenshot if available.
- Create: `public/images/projects/ai-daily-mobile.png` or `.webp` - mobile screenshot if available.
- Modify: `feature_list.json` - record AI Daily project update under `feat-002`.
- Modify: `progress.md` - record changed files, screenshot source, commands, and browser checks.
- Modify: `session-handoff.md` - leave a restartable handoff with evidence and remaining risks.

## Task 1: Capture Real AI Daily Screenshots

**Files:**
- Create: `public/images/projects/ai-daily-home-desktop.png`
- Create: `public/images/projects/ai-daily-detail-desktop.png`
- Create: `public/images/projects/ai-daily-mobile.png`

- [x] **Step 1: Verify the public preview responds**

Run:

```powershell
Invoke-WebRequest -UseBasicParsing -Uri "http://175.178.199.245/ai-daily" -TimeoutSec 20 | Select-Object StatusCode
```

Expected: `StatusCode` is `200`.

- [x] **Step 2: Open the public preview in the browser**

Use browser automation to navigate to:

```text
http://175.178.199.245/ai-daily
```

Expected: the Minecraft-style AI Daily home page loads with visible daily content.

- [x] **Step 3: Capture desktop home screenshot**

Use a desktop viewport around `1440x1000`, then save the screenshot to:

```text
D:\博客\public\images\projects\ai-daily-home-desktop.png
```

Expected: image shows the real AI Daily home screen and is readable when used as a 16:10 project cover.

- [x] **Step 4: Capture one detail or list screenshot**

Click a visible daily item or navigate to a visible detail/list page from the public preview. Save the best secondary screenshot to:

```text
D:\博客\public\images\projects\ai-daily-detail-desktop.png
```

Expected: image shows article/detail reading, audio, cover, archive, or organized content state.

- [x] **Step 5: Capture mobile screenshot**

Use a mobile viewport around `390x844`, load `http://175.178.199.245/ai-daily`, then save:

```text
D:\博客\public\images\projects\ai-daily-mobile.png
```

Expected: image shows the same real product on mobile without horizontal overflow.

## Task 2: Add AI Daily Project Data

**Files:**
- Modify: `src/data/projects.ts`

- [x] **Step 1: Insert the project before `AI 狼人杀 Alpha`**

Add this object as the first entry in `projects` and adjust screenshot extensions if Task 1 saved `.webp` instead of `.png`:

```ts
  {
    title: "AI Daily",
    slug: "ai-daily",
    summary: "面向个人使用的 AI 日报发布系统，已上线 Public Preview，把每日 AI 新闻生成、导入、封面、音频和阅读体验串成一条可验证流水线。",
    description:
      "AI Daily 是一个 Next.js / TypeScript 项目，用来收集、生成、导入和浏览每日 AI 新闻摘要。它不只是新闻列表，而是把内容生成、SQLite 写入、封面任务、音频播放、Minecraft 风格阅读界面和自托管部署脚本放进同一个个人发布系统里。",
    detailSections: [
      {
        title: "它解决什么",
        body: "每天关注 AI 新闻时，真正耗时的部分不是打开页面，而是筛选来源、写成可读摘要、补齐封面和音频，再把内容稳定发布到一个自己能长期维护的地方。AI Daily 把这些动作做成可重复的本地到线上流程。"
      },
      {
        title: "自动化主线",
        body: "项目通过生成脚本、导入脚本和 SQLite 状态管理，把候选新闻、正文、来源 URL、分类、封面状态和音频资产组织起来。内容进入站点前要符合固定字段和基础质量约束，避免只停留在一次性的手工整理。"
      },
      {
        title: "阅读体验",
        body: "前端使用 Minecraft 风格的视觉语言来承载日报阅读：分类、编号、封面、详情页和音频入口都有统一的像素化质感。这个风格不是单纯装饰，而是让每日信息流更像一个可持续打开的个人产品。"
      }
    ],
    modules: [
      {
        title: "日报生成与导入",
        body: "用脚本生成每日候选内容，再通过 import:codex-issue 写入 SQLite，让同一天内容可以被校验、更新和重新导入。"
      },
      {
        title: "内容状态模型",
        body: "围绕日期、分类、来源、正文、封面和音频维护结构化状态，支持首页、归档页、新闻详情页和公开预览。"
      },
      {
        title: "封面与音频流水线",
        body: "提供 cover:list、cover:apply、cover:status 和 TTS 相关脚本，把文章从纯文本扩展成带封面和可听版本的内容单元。"
      },
      {
        title: "自托管部署",
        body: "保留 Docker、上传和同步脚本，让本地生成的内容能够发布到自己的服务器，并通过公开地址进行预览。"
      }
    ],
    timeline: [
      {
        date: "2026-06",
        title: "本地日报系统成型",
        body: "完成 Next.js、SQLite、生成脚本、导入脚本和基础阅读页面，把 AI 新闻整理从手工流程推进到可重复执行。"
      },
      {
        date: "2026-06",
        title: "封面与音频链路补齐",
        body: "增加封面任务状态、图片应用验证和文章音频播放能力，让每条日报不只是一段文本。"
      },
      {
        date: "2026-06",
        title: "Public Preview 上线",
        body: "通过自托管服务器开放预览地址，开始把本地日报工具作为可访问的个人 AI 内容系统展示。"
      }
    ],
    challenges: [
      {
        problem: "AI 新闻生成容易变成一次性文本，缺少可追踪的发布状态。",
        solution: "把日期、来源、正文长度、分类、封面和音频状态写入结构化数据，并用导入脚本和状态命令反复校验。"
      },
      {
        problem: "生成封面和音频后，如果不回写状态，前端很难知道哪些内容已经可展示。",
        solution: "用 cover:list、cover:apply、cover:status 管理封面任务，把生成资产和 SQLite 内容记录重新对齐。"
      },
      {
        problem: "本地 SQLite 项目部署到服务器时，代码能启动不等于内容可持续存在。",
        solution: "用明确的数据库路径、Docker 配置和内容同步脚本，把运行环境和生成内容分开处理。"
      }
    ],
    category: "AI 内容系统",
    year: "2026",
    status: "Public Preview",
    language: "TypeScript",
    updatedAt: "2026-06-24",
    accentHue: 118,
    coverUrl: "images/projects/ai-daily-home-desktop.png",
    demoImageUrl: "images/projects/ai-daily-mobile.png",
    demoImageVariant: "phone",
    gallery: [
      {
        title: "公开预览首页",
        body: "真实部署页面展示每日 AI 新闻、分类、编号和 Minecraft 风格阅读入口。",
        imageUrl: "images/projects/ai-daily-home-desktop.png"
      },
      {
        title: "文章阅读与媒体状态",
        body: "详情或列表页面展示封面、正文组织、来源信息和音频相关体验。",
        imageUrl: "images/projects/ai-daily-detail-desktop.png"
      },
      {
        title: "移动端阅读",
        body: "390px 左右视口下检查内容、图片和交互入口是否适合手机阅读。",
        imageUrl: "images/projects/ai-daily-mobile.png"
      }
    ],
    tags: ["AI 日报", "Next.js", "SQLite", "内容自动化", "TTS"],
    highlights: ["Public Preview 已上线，可通过服务器地址访问", "生成、导入、封面和音频状态形成可验证流水线", "Minecraft 风格阅读界面已覆盖首页和详情体验"],
    nextSteps: ["继续稳定每日内容生成和来源筛选质量", "补齐更长期的归档检索和运营状态面板", "完善服务器持久化和内容同步的部署记录"],
    links: [
      {
        label: "Live Preview",
        href: "http://175.178.199.245/ai-daily"
      },
      {
        label: "GitHub",
        href: "https://github.com/MaQinglin-665/ai-daily"
      }
    ],
    featured: true
  },
```

- [x] **Step 2: Run a TypeScript/build check**

Run:

```powershell
npm run build
```

Expected: Astro build succeeds and includes `/projects/ai-daily/`.

## Task 3: Update Harness State

**Files:**
- Modify: `feature_list.json`
- Modify: `progress.md`
- Modify: `session-handoff.md`

- [x] **Step 1: Update feature evidence**

In `feature_list.json`, update `feat-002.evidence` to mention the `2026-06-24` AI Daily project update, screenshots, links, build check, and browser verification.

- [x] **Step 2: Update progress log**

In `progress.md`, set the current state to this AI Daily project update and add:

```markdown
- [x] Added AI Daily as a featured project with Live Preview and GitHub links.
- [x] Captured real AI Daily screenshots for desktop, detail/list, and mobile project gallery.
- [x] Ran `npm run build`.
- [x] Ran `git diff --check`.
- [x] Browser-checked `/`, `/projects/`, and `/projects/ai-daily/` on desktop and 390px mobile.
```

Only mark browser lines after those checks are actually complete.

- [x] **Step 3: Update handoff**

In `session-handoff.md`, add AI Daily implementation summary, verification table, changed files, decisions, and risks. Keep the existing warning about unrelated dirty worktree changes.

## Task 4: Verify and Browser QA

**Files:**
- No source files unless verification exposes a focused issue.

- [x] **Step 1: Run whitespace check**

Run:

```powershell
git diff --check
```

Expected: no whitespace errors. Existing LF/CRLF warnings are acceptable only if the command still exits successfully.

- [x] **Step 2: Start or reuse the Astro dev server**

Run:

```powershell
npm run dev -- --host 127.0.0.1
```

Expected: dev server serves the blog on an available localhost port, usually `http://127.0.0.1:4321/`.

- [x] **Step 3: Browser-check desktop pages**

Check these URLs at desktop width:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/projects/
http://127.0.0.1:4321/projects/ai-daily/
```

Expected: AI Daily appears as a featured project, images load, links point to the confirmed addresses, and there is no horizontal overflow.

- [x] **Step 4: Browser-check mobile pages**

Set viewport near `390x844` and check:

```text
http://127.0.0.1:4321/
http://127.0.0.1:4321/projects/
http://127.0.0.1:4321/projects/ai-daily/
```

Expected: no horizontal overflow, no text overlap, and screenshots crop acceptably.

- [x] **Step 5: Record final evidence**

Add exact verification results to `progress.md` and `session-handoff.md` before final response.
