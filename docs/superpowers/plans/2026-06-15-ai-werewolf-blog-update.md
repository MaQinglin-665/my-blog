# AI Werewolf Blog Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the blog's AI 狼人杀 project entry and produce a Notion-ready technical deep-dive draft for the June 2026 AI speech and UI upgrade.

**Architecture:** Keep the Astro + Notion content model unchanged. Update the existing project data source for visible portfolio content, copy approved ai-werewolf visual assets into the blog public assets, and store the article as a Markdown draft for manual Notion publication.

**Tech Stack:** Astro 5, TypeScript project data, static public image assets, Notion-backed blog posts.

---

### Task 1: Copy Visual Assets

**Files:**
- Create: `public/images/projects/ai-werewolf-lobby-table.webp`
- Create: `public/images/projects/ai-werewolf-board-6p.webp`
- Create: `public/images/projects/ai-werewolf-board-9p.webp`
- Create: `public/images/projects/ai-werewolf-board-12p-standard.webp`
- Create: `public/images/projects/ai-werewolf-board-12p-white-wolf.webp`

- [ ] Copy the latest approved homepage lobby and board images from `D:\ai-werewolf\public\images\`.
- [ ] Keep filenames blog-specific so future ai-werewolf asset churn does not break old portfolio references.

### Task 2: Update Project Data

**Files:**
- Modify: `src/data/projects.ts`

- [ ] Refresh `AI 狼人杀 Alpha` summary, description, highlights, timeline, modules, challenges, AI system points, updated date, and showcase image.
- [ ] Keep the existing data shape unchanged.
- [ ] Do not add new routes, dependencies, or Notion behavior.

### Task 3: Write Notion Draft

**Files:**
- Create: `docs/drafts/2026-06-15-ai-werewolf-12p-speech-mechanics.md`

- [ ] Write a Chinese technical deep dive with three reading layers: visitor-facing conclusion, technical mechanism, and evidence appendix.
- [ ] Use verified local source facts from `D:\ai-werewolf` docs and current-release records.
- [ ] Avoid overclaiming: distinguish DeepSeek hard-gate proof from Mimo subjective full-game feel.

### Task 4: Update Handoff Records

**Files:**
- Modify: `feature_list.json`
- Modify: `progress.md`
- Modify: `session-handoff.md`

- [ ] Record touched scope, validation commands, and remaining Notion publication step.
- [ ] Do not mark work done without build and diff checks.

### Task 5: Verify

**Files:**
- Verify modified files.

- [ ] Run `.\init.ps1`.
- [ ] If build passes, start or reuse Astro dev server and browser-check `/projects/` and `/projects/ai-werewolf/` on desktop and mobile.
- [ ] Fix any project-page overflow or broken asset issue found.
