# High-Variance Blog Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Apply the approved high-variance, bilingual AI developer portfolio direction across the Astro blog using existing project images.

**Architecture:** Keep the existing Astro pages, Tailwind v3 setup, Notion data flow, and project data model. Implement the redesign through scoped markup updates and global CSS classes; do not add runtime dependencies or generated assets.

**Tech Stack:** Astro 5, Tailwind CSS 3, TypeScript project data, Notion content, vanilla inline scripts.

---

### Task 1: Homepage Project Workboard

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`

- [ ] Replace the ACG hero with a project-cover workboard driven by `previewProjects`.
- [ ] Use bilingual headline and project-first CTAs.
- [ ] Ensure the hero uses existing project `coverUrl` and `demoImageUrl` values only.
- [ ] Verify mobile wraps naturally without body horizontal scroll.

### Task 2: Shared Components And Index Pages

**Files:**
- Modify: `src/components/Header.astro`
- Modify: `src/components/Footer.astro`
- Modify: `src/pages/projects.astro`
- Modify: `src/pages/tags/[tag].astro`
- Modify: `src/styles/global.css`

- [ ] Update navigation and footer copy to the bilingual portfolio language.
- [ ] Add a stronger projects page hero with existing project covers.
- [ ] Bring tag pages into the same topic-index visual system.
- [ ] Keep project filter JavaScript unchanged.

### Task 3: Reading And Detail Surfaces

**Files:**
- Modify: `src/pages/blog/[slug].astro`
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/components/PostCard.astro`
- Modify: `src/components/ProjectCard.astro`
- Modify: `src/styles/global.css`

- [ ] Preserve article readability while adding the bilingual field-note framing.
- [ ] Keep project detail pages image-led and project-data-driven.
- [ ] Tune post/project cards for stronger hover feedback and consistent radius.

### Task 4: Verification

**Files:**
- Verify all modified files.

- [ ] Run `npm run build`.
- [ ] Start `npm run dev -- --host 127.0.0.1 --port 4321`.
- [ ] Browser-check homepage desktop and mobile.
- [ ] Browser-check `/projects/`, at least one project detail page, and article/tag pages when static content exists.
- [ ] Fix any visual, responsive, or build issues found.
