# AI Developer Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing Astro + Tailwind blog into a cooler AI-developer personal site with a dark AI workbench hero, stronger project showcase, polished cards, and verified mobile behavior.

**Architecture:** Keep the current Astro pages and components. Build the redesign as scoped markup/class updates plus a reusable global CSS component layer; do not change Notion fetching, routing, deployment, or required project data fields. Treat existing dirty files as the starting point and preserve their in-progress portfolio structure.

**Tech Stack:** Astro 5, Tailwind CSS 3, TypeScript data files, Notion-synced content, vanilla inline scripts for existing theme/progress/filter behavior.

---

## File Structure

- Modify `src/styles/global.css`: visual tokens, dark hero shell, grid/glow surfaces, responsive navigation support, cards, article surfaces, reduced-motion styles.
- Modify `src/components/Header.astro`: brand mark, mobile-safe navigation labels/layout, existing scroll-progress behavior.
- Modify `src/components/ThemeToggle.astro`: only if button classes need to align with the new navigation style.
- Modify `src/pages/index.astro`: hero copy, AI workbench hero structure, featured project panel, content map, showcase, writing stream, tags.
- Modify `src/components/ProjectCard.astro`: richer project card hierarchy using existing `Project` fields.
- Modify `src/pages/projects.astro`: page hero and filter panel polish; keep existing filter script.
- Modify `src/components/PostCard.astro`: quieter premium article card styling and action row.
- Modify `src/pages/blog/[slug].astro`: article hero/readability polish if needed after card/page changes.
- Modify `src/components/Footer.astro`: low-key identity reinforcement.
- Do not modify `src/lib/notion.ts` or the route structure.
- Do not add new dependencies.
- Do not commit `.superpowers/`.

Because `src/components/Footer.astro`, `src/components/Header.astro`, `src/components/ProjectCard.astro`, `src/data/projects.ts`, `src/pages/index.astro`, `src/pages/projects.astro`, and `src/styles/global.css` are already dirty, every task must inspect `git diff -- <file>` before editing and must not revert unrelated existing changes.

---

### Task 1: Baseline And Guardrails

**Files:**
- Read: `package.json`
- Read: `src/styles/global.css`
- Read: `src/pages/index.astro`
- Read: `src/components/Header.astro`
- Read: `src/components/ProjectCard.astro`
- Read: `src/components/PostCard.astro`
- Read: `src/pages/projects.astro`
- Read: `src/pages/blog/[slug].astro`
- Read: `src/components/Footer.astro`

- [ ] **Step 1: Capture the starting dirty state**

Run:

```powershell
git status --short
git diff --stat
```

Expected: the existing dirty UI files are listed, plus this plan file if it has not been committed. Do not run reset, checkout, or restore.

- [ ] **Step 2: Run the current build before edits**

Run:

```powershell
npm run build
```

Expected: PASS. If it fails because Notion credentials or remote content are unavailable, capture the exact error and continue with local browser verification only after confirming the dev server can render.

- [ ] **Step 3: Keep the dev server available**

Run:

```powershell
npm run dev -- --host 127.0.0.1 --port 4321
```

Expected: Astro reports a local URL such as `http://127.0.0.1:4321/`. If port `4321` is busy, use the next open port and record it for browser checks.

---

### Task 2: Global Visual System

**Files:**
- Modify: `src/styles/global.css`
- Optional modify: `tailwind.config.mjs` only if a repeated token cannot be expressed cleanly in CSS variables.

- [ ] **Step 1: Inspect current global styles**

Run:

```powershell
git diff -- src/styles/global.css
```

Expected: the current portfolio-style global changes are visible. Preserve useful existing classes such as `.hero-panel`, `.cta-button`, `.project-card`, `.post-cover-shell`, `.reading-surface`, `.content-prose`, `.fade-up`, and project/tag chip styles.

- [ ] **Step 2: Add AI workbench tokens and base background**

In `src/styles/global.css`, update the `:root`, `:root.dark`, and `body` base styles so these variables exist and the page background supports the darker brand panels:

```css
:root {
  color-scheme: light;
  --bg-top: 246 250 255;
  --bg-bottom: 232 239 249;
  --grid-line: 100 116 139;
  --brand-ink: 7 11 20;
  --brand-panel: 10 17 31;
  --brand-cyan: 34 211 238;
  --brand-violet: 168 85 247;
  --brand-amber: 250 204 21;
}

:root.dark {
  color-scheme: dark;
  --bg-top: 2 6 23;
  --bg-bottom: 8 13 26;
  --grid-line: 71 85 105;
  --brand-ink: 2 6 23;
  --brand-panel: 10 17 31;
  --brand-cyan: 34 211 238;
  --brand-violet: 168 85 247;
  --brand-amber: 250 204 21;
}
```

Use this body background shape:

```css
body {
  @apply bg-surface-light text-text-light antialiased dark:bg-surface-dark dark:text-text-dark;
  background-image:
    radial-gradient(circle at top left, rgb(var(--brand-cyan) / 0.12), transparent 30rem),
    radial-gradient(circle at top right, rgb(var(--brand-violet) / 0.12), transparent 28rem),
    linear-gradient(180deg, rgb(var(--bg-top)) 0%, rgb(var(--bg-bottom)) 100%),
    linear-gradient(rgb(var(--grid-line) / 0.09) 1px, transparent 1px),
    linear-gradient(90deg, rgb(var(--grid-line) / 0.09) 1px, transparent 1px);
  background-size: auto, auto, auto, 30px 30px, 30px 30px;
  font-family: "Space Grotesk", ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  line-height: 1.75;
  min-height: 100vh;
}
```

- [ ] **Step 3: Add reusable hero and surface classes**

Add these component classes in `@layer components`:

```css
.ai-hero-shell {
  @apply relative isolate overflow-hidden rounded-lg border border-cyan-300/20 bg-slate-950 px-5 py-7 text-white shadow-2xl shadow-cyan-950/25 sm:px-7 sm:py-9 lg:px-9 lg:py-10;
}

.ai-hero-shell::before {
  @apply pointer-events-none absolute inset-0;
  content: "";
  background:
    linear-gradient(115deg, rgb(var(--brand-cyan) / 0.16), transparent 34%, rgb(var(--brand-violet) / 0.16) 72%, rgb(var(--brand-amber) / 0.10)),
    linear-gradient(rgb(148 163 184 / 0.12) 1px, transparent 1px),
    linear-gradient(90deg, rgb(148 163 184 / 0.12) 1px, transparent 1px);
  background-size: auto, 28px 28px, 28px 28px;
  mask-image: linear-gradient(to bottom, black, transparent 88%);
}

.ai-hero-content {
  @apply relative z-[1] grid gap-7 lg:grid-cols-[1.04fr_0.96fr] lg:items-end;
}

.ai-kicker {
  @apply inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-cyan-100;
}

.ai-title {
  @apply mt-5 max-w-3xl text-4xl font-semibold leading-[1.05] text-white sm:text-5xl lg:text-6xl;
}

.ai-subtitle {
  @apply mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg;
}

.ai-panel {
  @apply rounded-lg border border-white/10 bg-slate-950/62 p-4 shadow-xl shadow-black/25 backdrop-blur;
}

.ai-glow-card {
  @apply relative overflow-hidden rounded-lg border border-white/10 bg-slate-900/70 shadow-2xl shadow-cyan-950/30;
}

.ai-glow-card::after {
  @apply pointer-events-none absolute inset-0;
  content: "";
  background: linear-gradient(135deg, transparent, rgb(var(--brand-cyan) / 0.16), rgb(var(--brand-violet) / 0.16));
}
```

- [ ] **Step 4: Add motion and mobile safety**

Add these responsive/reduced-motion rules:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: 1ms !important;
  }
}

@media (max-width: 640px) {
  .ai-hero-shell {
    @apply rounded-none border-x-0 px-4 py-7;
    margin-left: -1rem;
    margin-right: -1rem;
  }

  .ai-title {
    @apply text-4xl;
  }

  .hero-actions {
    @apply grid grid-cols-1;
  }

  .hero-actions > a,
  .hero-actions > button {
    @apply w-full;
  }
}
```

- [ ] **Step 5: Build after global styles**

Run:

```powershell
npm run build
```

Expected: PASS. If Tailwind reports an unknown class, fix the class in `src/styles/global.css` before continuing.

---

### Task 3: Header And Theme Toggle Polish

**Files:**
- Modify: `src/components/Header.astro`
- Optional modify: `src/components/ThemeToggle.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Inspect header diff**

Run:

```powershell
git diff -- src/components/Header.astro src/components/ThemeToggle.astro src/styles/global.css
```

Expected: existing nav labels and scroll-progress script are visible. Keep the script.

- [ ] **Step 2: Update header brand markup**

In `src/components/Header.astro`, keep the same imports and active path logic. Replace the logo anchor contents with:

```astro
<a href={base} class="group inline-flex min-w-0 items-center gap-3">
  <span class="brand-mark" aria-hidden="true">
    <span>M</span>
  </span>
  <span class="inline-flex min-w-0 flex-col gap-0.5">
    <span class="truncate text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-slate-500 transition-colors group-hover:text-cyan-700 dark:text-slate-400 dark:group-hover:text-cyan-200">
      AI Builder / Notes
    </span>
    <span class="truncate text-lg font-semibold text-slate-900 dark:text-slate-100 sm:text-xl">MQL Blog</span>
  </span>
</a>
```

- [ ] **Step 3: Update header layout classes**

Use this header wrapper shape:

```astro
<header class="sticky top-0 z-40 border-b border-slate-200/65 bg-white/78 backdrop-blur-xl dark:border-slate-800/85 dark:bg-slate-950/78">
  <div class="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
    <!-- brand anchor -->
    <div class="topbar-panel flex w-full items-center gap-2 lg:w-auto">
      <!-- nav links and ThemeToggle -->
    </div>
  </div>
  <!-- scroll progress stays unchanged -->
</header>
```

Keep nav labels `Home`, `Projects`, `Writing`, `Tags`.

- [ ] **Step 4: Add brand/nav CSS**

In `src/styles/global.css`, ensure these classes exist:

```css
.brand-mark {
  @apply relative inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/35 bg-slate-950 text-sm font-bold text-cyan-100 shadow-lg shadow-cyan-950/20 dark:border-cyan-300/30;
}

.brand-mark::after {
  @apply pointer-events-none absolute inset-0 rounded-lg;
  content: "";
  background: linear-gradient(135deg, rgb(var(--brand-cyan) / 0.22), transparent 52%, rgb(var(--brand-violet) / 0.22));
}

.brand-mark span {
  @apply relative z-[1];
}

.topbar-panel {
  @apply max-w-full overflow-x-auto rounded-lg border border-slate-200/80 bg-white/85 p-1 shadow-lg shadow-slate-900/5 backdrop-blur-sm dark:border-slate-700/80 dark:bg-slate-900/80 dark:shadow-black/25;
  scrollbar-width: none;
}

.topbar-panel::-webkit-scrollbar {
  display: none;
}

.nav-pill {
  @apply shrink-0 rounded-md px-3 py-1 text-sm font-medium text-slate-600 hover:bg-slate-200/70 hover:text-slate-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-500 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white;
}
```

- [ ] **Step 5: Browser-check mobile header**

Open the local URL at a mobile-width viewport around `390x844`.

Expected: brand and nav fit without clipping body content, no uncontrolled horizontal page scroll, and the nav can scroll internally if needed.

---

### Task 4: Homepage AI Workbench Hero

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Inspect homepage diff**

Run:

```powershell
git diff -- src/pages/index.astro src/styles/global.css
```

Expected: existing content-map, project preview, hero metrics, featured post, tags, and latest post sections are visible. Keep these concepts and upgrade the first section.

- [ ] **Step 2: Add focused homepage constants**

In `src/pages/index.astro`, keep existing imports and post/tag/project queries. Ensure these constants exist near the other derived constants:

```ts
const heroProject = spotlightProject;
const heroProjectLink = heroProject?.links[0] || null;
const heroProjectCover = heroProject
  ? /^https?:\/\//.test(heroProject.coverUrl)
    ? heroProject.coverUrl
    : `${base}${heroProject.coverUrl.replace(/^\/+/, "")}`
  : null;
const heroStats = [
  { label: "Projects", value: String(projects.length) },
  { label: "Writing", value: String(posts.length) },
  { label: "Tags", value: String(tags.length) }
];
```

- [ ] **Step 3: Replace the top hero section markup**

Replace the first `<section class="hero-panel fade-up">...</section>` with:

```astro
<section class="hero-panel fade-up">
  <div class="ai-hero-shell">
    <div class="ai-hero-content">
      <div>
        <p class="ai-kicker">AI Developer / Project Builder</p>
        <h1 class="ai-title">把 AI 想法做成可试玩作品</h1>
        <p class="ai-subtitle">
          我在这里展示正在构建的 AI 项目，也把开发过程、问题定位和阶段复盘沉淀成文章。项目是入口，写作是记录。
        </p>

        <div class="hero-actions">
          <a class="cta-button cta-button-bright" href={`${base}projects/`}>查看项目作品</a>
          {featuredUrl ? (
            <a class="ghost-button ghost-button-dark" href={featuredUrl}>阅读最新文章</a>
          ) : (
            <a class="ghost-button ghost-button-dark" href="#posts">查看文章列表</a>
          )}
          <a class="ghost-button ghost-button-dark" href="#tags">浏览标签</a>
        </div>

        <div class="hero-metrics">
          {heroStats.map((stat) => (
            <span class="metric-chip metric-chip-dark">
              <strong>{stat.value}</strong>
              {stat.label}
            </span>
          ))}
          <span class="metric-chip metric-chip-dark">Notion → Astro → GitHub Pages</span>
        </div>
      </div>

      <aside class="grid gap-4">
        <div class="ai-glow-card">
          {heroProject && heroProjectCover ? (
            <a href={heroProjectLink ? heroProjectLink.href : `${base}projects/`} target="_blank" rel="noreferrer" class="block">
              <img src={heroProjectCover} alt={`${heroProject.title} project preview`} class="h-52 w-full object-cover object-center sm:h-64" />
            </a>
          ) : (
            <div class="h-52 bg-slate-900 sm:h-64"></div>
          )}
          <div class="relative z-[1] p-5">
            <p class="section-title text-cyan-200">Featured Project</p>
            <h2 class="mt-2 text-2xl font-semibold leading-tight text-white">
              {heroProject ? heroProject.title : "准备发布你的第一个 AI 项目"}
            </h2>
            <p class="mt-3 text-sm leading-7 text-slate-300">
              {heroProject ? heroProject.summary : "项目发布后会自动成为首页的视觉焦点。"}
            </p>
          </div>
        </div>

        <div class="grid gap-4 sm:grid-cols-2">
          <div class="ai-panel">
            <p class="section-title text-slate-400">Latest Writing</p>
            <p class="mt-2 text-base font-semibold leading-6 text-white">
              {featuredPost ? featuredPost.title : "等待第一篇文章发布"}
            </p>
          </div>
          <div class="ai-panel">
            <p class="section-title text-slate-400">Current Focus</p>
            <p class="mt-2 text-base font-semibold leading-6 text-white">
              AI Game / Agent / Desktop Companion
            </p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</section>
```

- [ ] **Step 4: Add dark CTA variants**

In `src/styles/global.css`, add:

```css
.cta-button-bright {
  @apply border-cyan-200/70 bg-cyan-300 text-slate-950 shadow-lg shadow-cyan-500/25 hover:border-cyan-100 hover:bg-cyan-200;
}

.ghost-button-dark {
  @apply border-white/15 bg-white/8 text-slate-100 hover:border-white/30 hover:bg-white/12 hover:text-white;
}

.metric-chip-dark {
  @apply border-white/12 bg-white/10 text-slate-100;
}

.metric-chip-dark strong {
  @apply text-cyan-200;
}
```

- [ ] **Step 5: Build and view hero**

Run:

```powershell
npm run build
```

Expected: PASS. Then inspect the homepage in browser desktop and mobile. Expected: first viewport clearly shows the dark AI workbench hero; mobile stacks without horizontal page scroll.

---

### Task 5: Project Showcase And Projects Page

**Files:**
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/pages/projects.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Inspect project files**

Run:

```powershell
git diff -- src/components/ProjectCard.astro src/pages/projects.astro src/styles/global.css
```

Expected: current compact/full card logic and filter script are visible. Keep the filter script.

- [ ] **Step 2: Upgrade project card body hierarchy**

In `src/components/ProjectCard.astro`, keep the `Project` props, `style`, `primaryLink`, and `coverSrc` logic. Ensure the cover and status markup includes the existing status plus a visual category chip:

```astro
<a class="project-cover" href={primaryLink.href} target="_blank" rel="noreferrer">
  <img
    src={coverSrc}
    alt={`${project.title} project preview`}
    loading="lazy"
    class="project-cover-image"
  />
  <span class="project-status">{project.status}</span>
  <span class="project-category-chip">{project.category}</span>
</a>
```

Keep the existing title, summary/description, highlights, tags, and links.

- [ ] **Step 3: Add project card CSS**

In `src/styles/global.css`, update or add:

```css
.project-card {
  @apply overflow-hidden rounded-lg border border-slate-200/75 bg-white/82 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/70 hover:shadow-2xl hover:shadow-cyan-900/10 dark:border-slate-800/80 dark:bg-slate-900/72 dark:shadow-black/25 dark:hover:border-cyan-400/45 dark:hover:shadow-cyan-950/30;
}

.project-cover {
  @apply relative block aspect-[16/8.8] overflow-hidden bg-slate-100 dark:bg-slate-950;
}

.project-cover::after {
  @apply pointer-events-none absolute inset-0;
  content: "";
  background:
    linear-gradient(to top, rgb(2 6 23 / 0.52), transparent 62%),
    linear-gradient(135deg, hsl(var(--project-hue) 72% 52% / 0.24), rgb(var(--brand-cyan) / 0.10), transparent 55%);
}

.project-category-chip {
  @apply absolute right-3 top-3 z-[1] rounded-full border border-white/25 bg-slate-950/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur;
}
```

- [ ] **Step 4: Upgrade projects page hero**

In `src/pages/projects.astro`, preserve data derivations and filter script. Change the page hero text to emphasize the project showcase:

```astro
<p class="section-title">AI Project Portfolio</p>
<h1 class="mt-2 text-4xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
  正在构建的 AI 作品
</h1>
<p class="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
  每个项目都按作品展示：它解决什么问题、处在哪个阶段、用了哪些技术，以及哪里可以继续查看。
</p>
```

- [ ] **Step 5: Build and verify filters**

Run:

```powershell
npm run build
```

Expected: PASS. In browser, open `/projects/`, click at least one category/status/tag filter, and verify the count updates and hidden project cards do not leave broken spacing.

---

### Task 6: Writing Stream, Article Page, And Footer

**Files:**
- Modify: `src/components/PostCard.astro`
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Inspect writing-related files**

Run:

```powershell
git diff -- src/components/PostCard.astro src/pages/blog/[slug].astro src/components/Footer.astro src/styles/global.css
```

Expected: post cards, article page, footer, and reading CSS are visible.

- [ ] **Step 2: Make post cards quieter than project cards**

In `src/components/PostCard.astro`, keep the data and cover handling. Update the root article class to:

```astro
<article class="post-card group">
```

Keep the internal cover, date, title, summary, tags, and action row.

- [ ] **Step 3: Add post card CSS**

In `src/styles/global.css`, add:

```css
.post-card {
  @apply rounded-lg border border-slate-200/75 bg-white/78 p-5 shadow-lg shadow-slate-900/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:bg-white/92 hover:shadow-xl hover:shadow-slate-900/10 dark:border-slate-800/80 dark:bg-slate-900/64 dark:shadow-black/25 dark:hover:border-slate-700;
}
```

- [ ] **Step 4: Polish article title rhythm**

In `src/pages/blog/[slug].astro`, update the article heading class to:

```astro
<h1 class="mt-4 text-3xl font-semibold leading-tight text-slate-900 dark:text-slate-100 sm:text-5xl">
  {post.title}
</h1>
```

Keep the `reading-surface`, cover figure, Markdown rendering, and tags.

- [ ] **Step 5: Footer identity copy**

In `src/components/Footer.astro`, use this first paragraph copy if not already present:

```astro
<p class="mt-2">
  AI 项目展示、开发复盘和技术索引放在同一个入口，用 Astro 静态发布。
</p>
```

- [ ] **Step 6: Build**

Run:

```powershell
npm run build
```

Expected: PASS.

---

### Task 7: Responsive Browser Verification

**Files:**
- Verify: local browser only
- Modify: previous task files only if verification finds layout issues

- [ ] **Step 1: Desktop homepage check**

Open:

```text
http://127.0.0.1:4321/
```

Viewport: about `1280x720`.

Expected: no overlap; hero feels like a dark AI workbench; project card image renders; CTA buttons fit; no body horizontal scroll.

- [ ] **Step 2: Mobile homepage check**

Viewport: about `390x844`.

Expected: header stacks cleanly; nav does not push body wider than viewport; hero title wraps naturally; buttons are full-width or wrap cleanly; project preview appears below copy.

- [ ] **Step 3: Projects page check**

Open:

```text
http://127.0.0.1:4321/projects/
```

Expected: filters are clickable, count changes, project cards retain spacing and cover image proportions.

- [ ] **Step 4: Article page check**

If posts exist, open the newest post URL shown on the homepage.

Expected: article text is readable, cover image is not awkwardly cropped, code blocks retain syntax highlighting, and the dark hero styling does not make article content visually heavy.

- [ ] **Step 5: Theme toggle check**

Click the theme toggle on homepage and projects page.

Expected: theme switches, icons update, text remains readable, and the dark hero panel still has enough contrast in both themes.

- [ ] **Step 6: Final build**

Run:

```powershell
npm run build
```

Expected: PASS.

---

### Task 8: Final Diff Review And Commit Decision

**Files:**
- Review: all modified files

- [ ] **Step 1: Review changed files**

Run:

```powershell
git status --short
git diff --stat
git diff -- src/styles/global.css src/components/Header.astro src/components/ThemeToggle.astro src/pages/index.astro src/components/ProjectCard.astro src/pages/projects.astro src/components/PostCard.astro src/pages/blog/[slug].astro src/components/Footer.astro
```

Expected: diffs only cover the redesign and preserve existing data/routing behavior.

- [ ] **Step 2: Keep temporary files uncommitted**

Run:

```powershell
git status --short
```

Expected: `.superpowers/` is untracked. Do not stage `.superpowers/`.

- [ ] **Step 3: Commit only after confirming ownership**

If the implementation owns all final changes in the dirty UI files, commit them:

```powershell
git add src/styles/global.css src/components/Header.astro src/components/ThemeToggle.astro src/pages/index.astro src/components/ProjectCard.astro src/pages/projects.astro src/components/PostCard.astro src/pages/blog/[slug].astro src/components/Footer.astro
git commit -m "feat: redesign blog as ai developer portfolio"
```

Expected: commit succeeds. If any dirty file contains unrelated user changes that should not be included, do not commit; report the exact files and leave the worktree for manual staging.

---

## Self-Review

- Spec coverage: hero, visual direction, header, project cards, post cards, article readability, footer, data-flow preservation, responsiveness, accessibility/motion, and browser verification are all mapped to tasks.
- Placeholder scan: no deferred implementation steps and no unspecified broad error-handling instructions remain.
- Type consistency: the plan uses existing `Project` fields (`title`, `summary`, `description`, `category`, `status`, `language`, `year`, `updatedAt`, `accentHue`, `coverUrl`, `tags`, `highlights`, `links`, `featured`) and existing Notion post fields consumed by current components.
