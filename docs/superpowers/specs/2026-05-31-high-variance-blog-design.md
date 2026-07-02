# High-Variance Blog Portfolio Design

Date: 2026-05-31
Status: Approved for implementation

## Design Read

Reading this as a full-site redesign of an AI developer blog for portfolio visitors, with a high-variance showcase language, leaning toward editorial developer portfolio + project-image workbench.

## Approved Direction

- Use the C direction from the visual companion: stronger chapter rhythm, asymmetric layouts, bolder project-first presentation, and a more memorable portfolio feel.
- Use Chinese and English together. English should add developer-portfolio texture; Chinese should keep the site readable and specific.
- Use existing project screenshots and cover art first. Do not add new generated visual assets for this pass.
- Keep the site a working blog, not only a landing page. Article pages must remain comfortable for long-form reading.

## Design Rules From Installed Skills

- Avoid default AI-purple/blue glow as the only idea. Use project imagery, asymmetry, crisp type, and one controlled accent system.
- Keep hero headings wide enough to avoid cramped six-line wrapping.
- Avoid cheap section-number labels and generic template copy.
- Make buttons and clickable cards feel responsive with short transform/opacity transitions and clear active/focus states.
- Keep motion purposeful and restrained enough for repeated use; respect reduced-motion preferences.
- Keep cards and buttons on a consistent radius scale.

## Implementation Scope

- Homepage: replace the current ACG-style hero with a project-cover workboard and project-first copy.
- Header/Footer: make navigation bilingual and portfolio-oriented.
- Project index and project detail pages: reinforce project showcase hierarchy using existing project data and images.
- Post cards, article pages, and tag pages: keep reading calm while matching the same visual system.
- Global CSS: add reusable high-variance portfolio classes and mobile safeguards.

## Verification

- Run `npm run build`.
- Start Astro locally and inspect desktop and mobile viewports.
- Check homepage, projects page, a project detail page, a tag page if available, and an article page if posts are available.
- Verify no uncontrolled horizontal scroll, no text overflow, readable light/dark states, project filters still work, and images are correctly framed.
