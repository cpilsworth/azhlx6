# Migration Plan: COPD (BPCO) Therapy-Area Page

**Source:** https://www.myastrazeneca.ch/fr/startseite/therapiegebiete/ri/copd.html
**Target:** AEM Edge Delivery Services (Document Authoring project `cpilsworth/autotest`)
**Scope:** A single page: the COPD disease page in the respiratory & immunology area of the French myAstraZeneca Switzerland HCP portal. It is built only from the **existing blocks and templates**. This replaces the earlier Brustkrebs plan.

> **Status: ready, but still in plan mode.** Messages in plan mode only update this plan. Switch to **Execute** mode with the Plan/Execute toggle and send "go ahead", and I'll work through the checklist in order.

## Context

- The French tree already has a home page, four disease pages (insuffisance rénale chronique, diabète, insuffisance cardiaque, lupus) and the PATTRNS campaign pages. That gives an existing **disease-page template** with working import parsers and transformers.
- COPD is a disease page from the same theme, so it should map directly onto that template and its blocks: `hero`, `breadcrumb`, `sub-nav`, `intro-media`, `image-text-band`, `columns`, `cards`, `cta-cards`, `split-teaser`, `references`, `questions-cta`, `widget`, and the shared `header`/`footer`.
- **No new blocks or templates.** Each section is mapped to the closest existing block or variant. If something doesn't fit, I'll map it to the nearest existing block or keep it as default content, and list it for you. I won't build new code.
- Regulatory content must be carried over word for word: the approval code, revision date and references list.
- The header, footer and site-wide design are already in place and are reused as they are.

## Approach

1. **Check the source URL:** the URL mixes a French language prefix (`/fr/`) with German path segments (`startseite/therapiegebiete`). I'll confirm it loads. If it doesn't, I'll find the French COPD page through the site navigation (under *Aires thérapeutiques → Respiratoire & immunologie*) and confirm it with you before continuing.
2. **Analyze the page:** scrape it (screenshots, cleaned HTML, images, metadata) and identify its sections.
3. **Map to existing blocks:** match every section to existing blocks and variants from the disease-page template.
4. **Assign the template:** add the COPD URL to the existing disease-page template in the import configuration.
5. **Reuse the import script:** re-bundle the existing disease-page import script. Parsers and transformers are only touched if a selector differs slightly on this page.
6. **Content import:** run the bulk import for the COPD URL.
7. **Visual validation:** compare the preview against the original and fix parsing or styling differences within the existing blocks.
8. **Publish (optional):** upload the page to Document Authoring and share the preview link, only after you confirm.

## Checklist

- [ ] Check that the source URL loads (or find the correct French COPD URL and confirm it with you)
- [ ] Confirm the project setup (Document Authoring, `cpilsworth/autotest`), the existing disease-page template and the block library
- [ ] Scrape and analyze the COPD page: screenshots, cleaned HTML, images, metadata
- [ ] Map each section to an existing block or variant, with no new blocks
- [ ] List any content that doesn't fit an existing block, and how it was handled
- [ ] Add the COPD URL to the existing disease-page template mapping
- [ ] Re-bundle the existing disease-page import script, adjusting parsers or transformers only for small selector differences
- [ ] Run the content import for the COPD URL
- [ ] Check that the header, footer, breadcrumb and sub-navigation render correctly
- [ ] Check that the regulatory elements (approval code, revision date, references) match the source exactly
- [ ] Run a full-page visual comparison against the original and fix differences within the existing blocks
- [ ] Check the final preview for layout, images and links on desktop and mobile
- [ ] If any shared parser or block styling changed, recheck one existing French disease page (e.g. lupus) for regressions
- [ ] Optional, with your confirmation: upload the page to Document Authoring and share the `main--autotest--cpilsworth.aem.page` preview link

## Risks and Notes

- **URL may not exist:** the `/fr/startseite/therapiegebiete/...` path looks like a mix of the French and German trees and may return a 404 or redirect. Step 1 resolves this before any other work.
- **Content that doesn't fit:** COPD-specific elements such as charts, GOLD classification tables or inhaler visuals may not have an exact existing block. Since we're only using existing blocks, they'll be mapped to the closest one (e.g. `columns`, `cards`, `image-text-band`) or kept as default content, and listed in the summary.
- **HCP gate and cookie banner:** these may cover the content during scraping. The scraper's fallback handles this, and the self-certification modal stays a host-bound behaviour.
- **Dynamic features:** login, search and the language switcher are out of scope.
- **Optional add-on:** a general Edge Delivery Services skill pack is available, but this migration doesn't need it. I can turn it on if you want it.
