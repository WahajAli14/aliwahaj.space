# Living Systems: motion and interface verification

Historical iteration, reviewed 3 November 2026. The orbital/signal design has since been replaced; see CASEBOOK-REVIEW.md for the current layout. Scope: the local portfolio homepage and its animations, controls, narrow layouts, source-linked retrieval, and direct PDF links. Source changes remain on the draft redesign branch; no production deployment was authorized or performed.

## Design decision

Keep the established dark engineering observatory: charcoal green, pale text, mint signals, Bricolage display type, Geist body type, and a restrained technical grid. Make one element memorable: an inspectable system map that routes a moving signal through the selected API, data or retrieval layer. Its paths relate to the backend work described on the page, rather than adding unrelated particle effects. One brief entrance introduces the heading, explanation and actions; the rest stays readable and still. This is a refinement, not a competing redesign.

The map is conceptual. Mission Control is an illustrative simulation. Neither represents production telemetry, and the explorer remains a labeled local keyword demonstration.

## Scope and coverage

Static HTML, plain CSS and JavaScript; no framework, component library or build step. The repository had REVIEW.md but no AGENTS.md, CONTRIBUTING, CLAUDE, design-system or interface convention documents. React/Next.js rules were not applicable.

Applied the portfolio skill, frontend-design, UI/UX Pro Max, better-interface and its six domain skills, and the current Web Interface Guidelines. The focused UI/UX Pro Max search returned reduced-motion, excessive-motion and context-dependent timing guidance. No new library was needed.

| Domain | Evidence inspected | Result |
| --- | --- | --- |
| Accessibility | Native controls, accessible names, first-tab skip link, keyboard selection, focus colors, motion guards, pause controls | Fixed motion lifecycle, skip order, contact focus and control boundaries. Full WCAG certification not claimed. |
| Layout | Browser renderings at 320, 390, 768 and 1280 CSS pixels; DOM overflow measurements; flexible controls and simulation sizing | No horizontal page overflow at tested widths. Physical devices and enlarged-text settings not tested. |
| Writing | Layer descriptions, pause labels, simulation labels, retrieval success/empty states and source links | Singular “1 matching passage” corrected; code links distinguish projects. No fabricated results added. |
| Typography | Heading sizes, input font size, readable text/metadata and stable numeric readouts | Mobile inputs now 16px; subordinate project headings reduced to 26px on narrow screens. |
| Colors | Browser-computed foreground/background values, control boundaries and contact surface | Measured and corrected failing pairs, detailed below. |
| UI polish | Opening sequence, SVG paths/core, canvas frames, cache switch, pressed/hover definitions and pause synchronization | Confirmed moving browser frames and frozen paused frames; removed overlapping animation scheduling. |

## Ranked findings and implemented fixes

Locations refer to the final files. “Before” describes the failure found during this review.

| Severity | Domain | Location | Before | After | Why |
| --- | --- | --- | --- | --- | --- |
| HIGH | Accessibility | motion.js:4; simulation.js:147 | System reduced-motion preference captured only once; runtime changes could leave canvas autoplay running | One motion controller listens for preference changes; simulation starts only when allowed | Motion preference must govern both CSS and JavaScript, WCAG 2.3.3 guidance |
| HIGH | Colors | living.css, final control-contrast rules | Input placeholder 4.11:1; contact focus 1.13:1; contact button boundary 1.86:1 | Placeholder 9.64:1; contact focus/boundary 13.32:1 | Text requires 4.5:1, component/focus boundaries 3:1, WCAG 1.4.3 / 1.4.11 |
| MEDIUM | UI | simulation.js:155 | Stop/start left uncancelled frame callbacks; rapid toggling could create concurrent loops | Store and cancel the frame ID; at most one pending frame | Prevents speed drift and unnecessary rendering |
| MEDIUM | UI | simulation.js:165 | Cache toggle while paused changed its label without updating the readout/diagram | Refresh a static diagram and illustrative values immediately | Controls remain useful when motion is off |
| MEDIUM | Accessibility | index.html:236 | Skip link came after repeated header navigation | First focusable element, targeting focusable main | Efficient keyboard navigation, WCAG 2.4.1 |
| MEDIUM | UI | living.js:13 | Making the map itself carry data-layer caused its bubbled click to clear selected button state | Bind and update only button[data-layer] | Visual route, text and aria-pressed now agree |
| MEDIUM | UI | motion.js:8,15; living.css, arrived rule | A pause during the opening could freeze partly hidden content or replay an entrance on resume | Finish the opening when paused and mark it completed after its first run | Critical content must remain readable; repeated animation should not distract |
| MEDIUM | Typography | living.css, mobile rules | 13px input could trigger iOS zoom; some mobile child headings exceeded parent headings | 16px input; 26px project/lab headings | Avoid disruptive input zoom and preserve hierarchy |
| LOW | Writing | living.js:9 | “1 matching passages”; repeated generic project link names | Correct singular form and project-specific accessible names | Clear feedback and destination identification |

## Animation inventory

| Motion or state | Verification | Result |
| --- | --- | --- |
| Heading / explanation / action entrance | Observed heading opacity 0.736 then 0.923, followed by opacity 1 and completed entrance state; source has 300ms entrances with 100ms stagger | Pass at normal browser speed; 10% timeline replay not available |
| Core pulse | Compared computed SVG transforms on consecutive rendered frames | Changed while running; shared pause rules apply |
| API, Data and Retrieval signals | Selected each layer; compared transforms; checked selected button state, static description and active path | All three route choices work; only the selected signal is visible |
| Mission Control packets | Compared hashes of two cropped canvas screenshots while running | Different rendered pixels confirm animation |
| Pause / resume, both locations | Activated hero and local controls; inspected labels/pressed state; compared paused canvas screenshots and SVG transforms | Both controls stay synchronized; paused output stays stable |
| Cache switch while paused | Paused locally, disabled cache, inspected text/readouts | Immediate off state, 420ms illustrative response, 0% hits, 11 illustrative database queries; no autoplay restart |
| Rapid pause / resume | node tests/motion.cjs, 30 cycles | Never more than one pending animation callback |
| Initially reduced motion | Regression harness with matching media preference; CSS source guards inspected | No canvas animation scheduled; static cache toggle works |
| Preference changes during use | Regression harness switches preference on and off | Cancels/restarts appropriately; controls show disabled “Motion reduced” state |
| Offscreen / hidden page lifecycle | Observer/visibility regression checks; browser confirms hero offscreen state after navigating to Work | Stops animation and safely resumes when visible |
| Cache thumb, hover and button press | Source review: native state transitions, fine-pointer hover gate, 0.96 press scale, reduced-motion guard | Definitions verified; held-pointer/slow-motion replay not verified |
| Anchor navigation | Used home, Work and skip links; inspected target focus and layout | Functional; manual pause/reduced-motion guards disable smooth scrolling |
| Clock | Included in shared pause condition in simulation.js | Pause condition source-verified; minute-boundary browser behavior not observed |

## Additional verified checks

- Browser keyboard: first Tab focused “Skip to content” with a solid outline; Enter focused main#top; Enter selected the Data layer with aria-pressed=true.
- Browser retrieval: AWS prompt returned “1 matching passage” with its résumé source. “quantum bananas” returned a no-evidence message with suggested recovery queries.
- No unnamed buttons were found in the browser inspection. Buttons retained at least 44px height at inspected desktop/tablet states.
- Rendered secondary text was 9.64:1, primary text on the standard panel 14.97:1, and primary action text 13.52:1. Input and simulation control boundaries measured 4.99:1 and 4.64:1 respectively. These are measured pairs, not an exhaustive whole-page contrast audit.
- node tests/motion.cjs passes. HTML IDs, one H1, local links/fragments and syntax checks for all three JavaScript files pass.
- Fixed dark appearance and direct original-PDF résumé links are preserved. No credentials or model API keys were added.

## Limits and verdict

Not verified: real OS/browser preference emulation (the dynamic behavior was exercised in the scheduler harness), 10% animation replay, held-pointer press/hover rendering, physical touch devices, 200% text enlargement, screen readers, forced-colors rendering, a complete automated accessibility audit, Lighthouse/field performance, and cross-browser coverage. A single browser check does not establish universal compatibility.

Design distinctiveness: 8.5/10 editorial judgment. The responsive, selected-path system map and working cache demonstration now do more of the storytelling; restraint keeps résumé/contact access clear. This is not a market ranking or an independent hiring assessment.

Approve the inspected local motion flows: no known HIGH findings remain in that scope. This does not constitute production approval or full accessibility certification. The broader RAG/backend and source-verification limits in REVIEW.md remain open.
