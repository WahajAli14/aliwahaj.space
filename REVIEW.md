# Living Systems redesign review

Status: local staging implementation on `redesign/living-systems`. Production deployment requires owner approval. No production deployment or merge was performed.

## Implemented

- Cinematic editorial hero, green-black palette, mint accents, grid background, restrained motion and responsive layout. The theme switch was removed at the owner’s request; the design stays dark.
- Neural Canvas with selectable API / Data / Retrieval explanations and a global motion pause control.
- Mission Control: retained and clarified the cache / database / SQS simulation, with readable architecture text for assistive technology. Values are illustrative, not live telemetry.
- Source-linked portfolio retrieval explorer with preset prompts, arbitrary text search and a no-evidence state. Keyword retrieval runs in the browser; this is explicitly not an embedding or LLM service.
- Recruiter access from navigation, hero and contact to the original résumé PDF, opened directly without an intermediary page.
- Skip link, labeled controls, focus styling, 44px button heights, reduced-motion rules, print styles and a matching 404 page.

## Evidence and content provenance

- Baseline portfolio source: `WahajAli14/aliwahaj.space`, commit `529ce24f5f45230cb722388beebc741d451bc325`.
- Live portfolio was inspected directly through the browser. Earlier chat responses could not be recovered beyond reference markers; the user's stated Living Systems direction guided the redesign.
- Latest modified résumé located in connected Drive during discovery: `Ali Wahaj Resume.docx`, file ID `1uqxi3k_bzCwldX-aoc2rLKpKc0x6QWDC`, modified 20 August 2026. A PDF uploaded in October retained a July modification date. Their extracted experience content agreed. The source DOCX was used for content cross-checks.
- The final `Ali-Wahaj-Resume.pdf` is the original PDF downloaded from Drive, file ID `1ame1Lygf528w2eyAWwpo5bG-88CAzeZ_` (101,942 bytes). It replaces the earlier generated adaptation. All résumé links open this file directly. No separate résumé page is shipped.
- Employment outcomes are attributed to the résumé; they were not independently audited. No new employment results, customers or testimonials were invented.
- Fuel Route Optimizer README was fetched through GitHub. It confirms the routing example, one provider call on uncached requests and optional Redis. Benchmark labels now say in-memory cache. Timings are repository-reported, not reproduced here.
- Football Intelligence Platform README returned 404 through the connected GitHub account. Its status is retained from the prior portfolio, marked unverified. The project link may remain inaccessible to visitors.

## Architect and recruiter review

Scores below are structured editorial judgments, not an independent hiring panel or automated certification. Each row uses a 10-point rubric. They describe the implemented local experience and its verification limits.

| Area | Score | Basis / deduction |
| --- | --- | --- |
| Visual design | 8/10 | Coherent palette, distinctive hero, consistent spacing and diagrams. Further art direction and full-device review would raise confidence. |
| Recruiter usability | 8/10 | Explicit identity/role, recent experience, outcomes, repository links, immediate résumé/contact access. Project proof remains incomplete for football work. |
| Mobile UX | 8/10 | Desktop 1440px and phone 390px / 320px renderings reviewed in same-origin frames; 672px normal browser layout also checked. This is responsive rendering, not physical device testing. |
| Accessibility | 7/10 provisional | Keyboard skip link exercised; button names/heights inspected; canvas has text alternative; pause controls tested. Screen-reader testing and a full automated WCAG audit remain outstanding. |
| Content credibility | 8/10 | Clear sources, self-reported employment outcomes and explicit demo labels. Football source and workplace outcomes are not independently verified. |
| Performance | Not scored | Main HTML/CSS/JS total 65,642 bytes uncompressed; separately gzipped sum 21,412 bytes. The original PDF is 101,942 bytes. External Google Fonts remain. No Lighthouse, throttled LCP/INP/CLS or field data was obtained. |

Architect rubric: coherence, hierarchy, responsive layout, meaningful interaction and accessibility (2 points each). Recruiter rubric: role clarity, evidence, project substance, scanability and contact/résumé access (2 points each). An 8 means useful for staging review with recorded limitations; it does not mean production approval.

## Checks performed

- Browser review at 1440px and 390px through a local same-origin responsive review harness; checked 320px and corrected narrow navigation wrapping. The harness is excluded from the Git changes.
- At normal 672px viewport, DOM inspection found no horizontal overflow; all buttons measured at least 44px high after fixes.
- Tested Neural Canvas layer selection, motion pause state, cache-off state, preset backend and AWS retrieval, and unrelated input producing “No supporting passage found.”
- Verified every résumé link targets the original PDF; no theme switch or separate résumé page remains. Earlier adaptation rendering checks do not apply to the final original PDF.
- Checked JavaScript syntax for external and inline scripts, unique IDs, one H1 per HTML document, and local link/fragment targets. Checks passed.
- Local HTTP preview returned 200. Hosted deployment, cross-browser testing, physical phone testing, clipboard behavior and print-dialog output were not verified.

## Fixes made during review

Removed misleading live-data wording, clarified repository benchmarks, removed an unsupported internship dataset detail, added a screen-reader architecture description, corrected small controls and light-theme contrast, normalized résumé spacing, fixed pagination from three pages to two, and preserved a compact navigation at 320px.

## Outstanding work

1. Connect an authorized server-side RAG endpoint, document corpus and evaluation set if a real generative service is desired. No model credentials were requested, stored or exposed in this static site. The shipped explorer is a truthful local demonstration.
2. Restore or identify the football repository and verify its current implementation before presenting it as independently checked work.
3. Confirm the latest résumé source if a newer local or unpublished version exists. The linked PDF is the original Drive PDF.
4. Run a full accessibility audit and throttled performance test against the approved staging host; obtain physical-device and cross-browser coverage.
5. Review the draft, then obtain explicit approval before merging/deploying to `aliwahaj.space`.

## Preview

From this directory: `python3 -m http.server 4173 --bind 127.0.0.1`, then open `http://127.0.0.1:4173`. No install/build step is required. Existing production metadata is preserved for eventual release.

## Motion follow-up

See ANIMATION-REVIEW.md for the 3 November motion and interface review, implemented fixes, measured contrast pairs, browser coverage and verification limits. Run `node tests/motion.cjs` from this directory for the scheduling regression checks.

## Casebook follow-up

CASEBOOK-REVIEW.md documents the 5 November refinement: request-journey opening, full-width case studies, evidence disclosures and responsive checks. It supersedes the earlier layout descriptions above.
