# Hallmark-informed portfolio design pass

Historical composition: superseded by CASE-LED-DESIGN-REVIEW.md.

12 November 2026. Draft branch only. TRELLIS work is paused at the user's request; no model was integrated and no production deployment occurred.

## Direction and delivered changes

Used the user-requested [Hallmark source](https://github.com/Nutlope/hallmark), its custom direction, redesign guidance, static checker and fresh-context review prompt, alongside the portfolio and frontend design skills. No global skill installation or new runtime dependency was added.

The audience is recruiters and engineering collaborators. Their primary tasks are inspecting work, opening the original résumé and making contact. Existing materials are the original portrait photograph, résumé, source-backed case descriptions and the clearly labelled illustrative demos. No testimonials, new outcomes or customer claims were added.

The page now opens with the name, direct role copy and the original photograph. The fixed mineral/wine palette has been replaced by a cool grey ground, navy text and restrained blue controls. The illustration and real 3D monogram remain optional controls. Floating portrait framing and decorative status dots are removed; the portrait stays still. The shared motion control remains available for the technical diagrams.

The project index is a readable ledger rather than four colored cards. Case headings identify the actual projects; source context sits below them. Expanded reasoning keeps its two-column reading/illustration structure. Supporting demos have one clear surface instead of repeated nested cards. The contact area has a distinct navy treatment. All résumé links still open the existing PDF directly.

## Significant copy changes

| Before | After |
| --- | --- |
| I build the systems behind the experience. | Backend engineer. Python, SQL, and queues. |
| A closer look at the work. | Selected work |
| When an endpoint takes twenty seconds. | Backend performance |
| Useful tools. Explicit boundaries. | Insight MCP |
| A route is only half the answer. | Fuel Route Optimizer |
| An answer should bring its evidence. | Football Intelligence Platform |
| Evidence before answers. | Explore the evidence |
| Let's build something fast. | Work with me |

Removed redundant category eyebrows where the title or nearby technology list already supplied the information. Dates now use “to”; dynamic source labels use plain punctuation. Technical acronyms and meaningful numeric comparisons are retained. Case-study caveats and evidence boundaries remain intact.

## Verification

- Local IDs, links, fragments and all JavaScript syntax checks passed. Motion scheduler regression suite passed.
- Hallmark's kept comparison retained 20/20 distinct links, 1/1 fields and 41/41 script hooks. No routes or source files were deleted.
- Browser geometry checked at 320, 390, 768, 1280 and 1920px with no horizontal overflow. At 1280×800 the primary actions ended around y520 and the photograph around y595, within the first screen. The container stayed capped on wide displays.
- Actual 390px screenshot reviewed separately. Keyboard illustration/photo switching worked and restored correct image alt text. Insight MCP's policy button responded to Enter. A case-index link opened and focused its study; the Insight search prompt returned its source passage.
- axe-core 4.14.0 on an exact local QA copy with all disclosures expanded: 50 checks passed, zero automated violations. Eleven contrast items remain manual-review items; this scan is not a complete accessibility certification. Two visible/accessibility-name mismatches were found and corrected.
- HTML/CSS/JS approximately 38.7KB gzipped, before fonts/images. The original photograph is approximately 168KB. No field performance or Lighthouse score is claimed.
- Hallmark-requested independent reviewer approved the desktop opening, actual 390px opening and expanded Insight case, with no blocking visual finding. The reviewer preferred the old headline's personality but found the revised role copy clearer for recruiters.

## Hallmark scope and limits

The static checker improved from 42 Floor flags to one, which is its classification of the genuine technology name “AWS SQS” as an all-caps label. That name is deliberately preserved. The checker also reports 111 Reflex and 15 Finish warnings across the layered historical stylesheets, including off-scale spacing, overridden declarations and short text measures. These were not exhaustively resolved or individually waived. This is a Hallmark-informed design pass, not a clean full Hallmark run or certification. Its external browser-render script was not used: browser inspection was performed through the available CUA browser controls.

Historical style layers remain for reversibility. A later consolidation could remove overridden rules after this direction is accepted. Physical devices, other browsers, screen readers, enlarged-text overrides, live database integration and current field performance remain unverified. The case-study figures retain their existing résumé/repository-reported scope.
