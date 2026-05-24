# AI Developer Blog Redesign Design

Date: 2026-05-24
Status: Approved for planning

## Context

This Astro + Tailwind blog already has a useful structure: a sticky header, homepage sections, a projects page, project cards, Notion-synced posts, tag pages, article pages, and dark mode. The current working tree also contains an in-progress portfolio-style redesign across the homepage, project page, components, and global styles.

The redesign should build on that direction instead of replacing the site. The approved visual direction is a more striking personal brand for an AI developer: an "AI lab / live workbench" feeling on the homepage, with projects as the strongest first signal and writing as the supporting proof of process.

## Goals

- Make the first viewport clearly say: "MQL builds real AI projects and writes about the process."
- Push the frontend to feel more memorable and cooler than a clean blog template.
- Keep the site usable as a blog: article pages must remain comfortable for long-form reading.
- Preserve the current Astro, Tailwind, Notion, projects data, and dark-mode architecture.
- Improve mobile behavior, especially the crowded navigation and hero text rhythm.
- Verify the finished design in real browser viewports before calling the work complete.

## Non-Goals

- Do not rebuild the site into a full landing-page product site.
- Do not add a CMS, database, animation framework, or new frontend runtime.
- Do not hide writing behind decorative effects.
- Do not require new project data fields unless a small optional field clearly improves the cards.
- Do not commit temporary visual-companion files under `.superpowers/`.

## Visual Direction

The homepage should lean into a high-contrast AI developer identity:

- Dark, cinematic hero area as the primary first impression.
- Fine technical grid texture and glass-like panels, kept subtle enough to avoid visual noise.
- Cyan-forward glow accents with secondary violet and amber/yellow-green highlights so the palette does not become one-note.
- Strong project preview card in the hero, using real project cover art when available.
- Sharp, readable typography: expressive hero type, tighter interface text, comfortable Chinese body copy.
- Lightweight entrance and hover motion for cards and buttons, with `prefers-reduced-motion` respected.

Light mode should remain polished, but the dark hero can be the strongest brand moment.

## Homepage Design

The homepage should be organized around four clear bands:

1. Hero: "AI developer / project builder" positioning, direct CTA buttons, featured project preview, latest writing teaser, and a few concise metrics.
2. Project showcase: a more immersive project section with bolder cover treatment, status/tag chips, and obvious links.
3. Writing stream: article cards that feel quieter than project cards but still premium and image-aware.
4. Tags/index: compact navigation for topic discovery without competing with the project showcase.

The hero copy should be direct and personal-brand oriented, not generic template language. A likely headline direction is: "把 AI 想法做成可试玩作品" or a close variant.

## Component Design

### Header

- Keep sticky navigation and theme toggle.
- Improve mobile behavior so nav items do not create awkward horizontal scrolling.
- Make the brand mark feel more deliberate than a plain initial, while staying simple enough to render without image assets.

### Project Cards

- Treat projects as portfolio entries, not plain list items.
- Use cover imagery, status, category, tech tags, and links as visible hierarchy.
- Add stronger hover/focus states through transform, border glow, and shadow.
- Keep card radius restrained and consistent with the existing design language.

### Post Cards

- Preserve cover image handling.
- Make article cards quieter than project cards so the page has a clear hierarchy.
- Improve summary rhythm and action link styling.

### Article Pages

- Keep reading surfaces calm and highly legible.
- Avoid heavy hero effects inside long-form article content.
- Preserve syntax highlighting, prose styles, tags, and cover images.

### Footer

- Keep it simple and structural.
- Reinforce the site's identity: projects, writing, tags, GitHub Pages / Astro publishing.

## Data Flow

The redesign should continue to use existing sources:

- Posts come from `src/lib/notion.ts`.
- Projects come from `src/data/projects.ts`.
- Tags are derived from Notion posts.
- Project cover images are served from `public/images/projects`.

Any added UI should derive from this data rather than introducing duplicated hard-coded content, except for short brand copy in the homepage hero.

## Responsiveness

Mobile is a first-class requirement:

- Hero content should stack cleanly with the project preview below the copy.
- Navigation must fit without text clipping or uncontrolled horizontal page scroll.
- Buttons and chips must wrap predictably.
- Project and post card text must not overflow fixed containers.
- Decorative grid/glow layers should be reduced on narrow screens.

Desktop should use the extra width for stronger composition, not simply larger text.

## Accessibility And Motion

- Preserve semantic links, headings, and landmarks.
- Maintain visible focus states on nav, CTA buttons, cards, and filters.
- Respect `prefers-reduced-motion` by disabling nonessential animation.
- Keep contrast strong in both light and dark themes.
- Avoid putting essential information only in decorative imagery.

## Implementation Surface

Expected files:

- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/PostCard.astro`
- `src/components/ProjectCard.astro`
- `src/pages/index.astro`
- `src/pages/projects.astro`
- `src/pages/blog/[slug].astro` if article polish is needed
- `src/styles/global.css`
- `tailwind.config.mjs` only if existing tokens are insufficient

Changes should be scoped to styling and layout. Existing Notion fetching, project data shape, routing, and deployment behavior should remain intact.

## Verification Plan

- Run `npm run build`.
- Open the local site in the browser and inspect:
  - homepage desktop
  - homepage mobile width
  - projects page desktop/mobile
  - an article page desktop/mobile if posts are available
  - dark and light theme states
- Check for:
  - no incoherent overlap
  - no unintended horizontal page scroll
  - images render with intended cropping
  - text fits in buttons, cards, nav, and hero
  - project filters still work
  - scroll progress and theme toggle still work

## Planning Decisions

- Use "把 AI 想法做成可试玩作品" as the initial hero headline unless implementation reveals a fit issue.
- Keep the existing saved/system theme behavior. The hero itself can use a dark, high-contrast brand panel in both light and dark themes.
- Use the existing `featured` project flag for featured-project treatment. Do not add a new required project data field.
