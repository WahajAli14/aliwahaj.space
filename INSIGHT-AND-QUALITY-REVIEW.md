# Insight MCP and interface review

Reviewed locally on 5–6 November 2026. This report covers the current branch, not a production release.

## Delivered

Added a fourth featured case study for Insight MCP: the problem, SQL discovery and read-only query design, independent database restrictions, dataset profiling, evidence, and limits. The public page contains a high-level description only. It contains no private source, credentials, customer records, or private repository links. Its three-state policy walkthrough is explicitly illustrative and executes no SQL.

Reviewed the private implementation at revision 65ce279331be77d4cd8c6284910948df163d4547. The isolated SQL policy suite passed 22 tests using pytest 9.2.0 and sqlglot 30.29.0. The configured limits are 100 returned rows and a five-second statement timeout; these are settings, not measured performance outcomes. Database integration tests, deployed grants, timeout enforcement and a full security audit remain outside this verification.

## Ranked findings and fixes

| Severity | Domain | Location | Before | After | Reason |
| --- | --- | --- | --- | --- | --- |
| High | Accessibility / motion | Case disclosure text | Opening fade briefly reduced contrast to 3.19–3.48:1 | Removed text fade; text stays opaque | Readability must hold during interaction |
| Medium | Accessibility | Four labelled demo containers | Generic containers carried unsupported labels | Added group semantics | Exposes meaningful accessible groups |
| Medium | Navigation | Dynamically inserted evidence links | A same-hash result could leave its case closed | Delegated case-link handling opens and focuses the case | Search results consistently reach their evidence |
| Medium | Layout / typography | Narrow case headings and evidence title | Tight three-line leading and a four-line title | 1.4 heading leading and a shorter two-line title at 320px | Better mobile reading rhythm |
| Medium | Accessibility / layout | Route and architecture diagrams | Small route labels; architecture explanation only hidden text | Mobile route caption and expandable architecture explanation | Gives diagrams readable text alternatives |
| Medium | Navigation | Case anchors | Scroll padding and margin compounded | Single 96px desktop / 80px mobile offset | Headings remain near and clear of the fixed header |
| Low | Writing | Evidence explorer | Technical navigation and action labels | “Evidence”, “Find passages”, and visible guidance | Sets accurate expectations for local keyword retrieval |
| Low | UI / color | Browser icon | Legacy multicolor icon | Wine AW mark | Matches the fixed visual identity |

## Six-domain coverage

Accessibility: keyboard case navigation, dynamic result focus, labelled groups, status announcements, contrast, motion controls and modal return focus reviewed. Layout: 320, 390, 768 and 1280px widths checked without horizontal overflow. Typography: mobile headings, 16px input and 14px route caption verified. Color: fixed mineral/wine/rose palette checked for text and control contrast. UI: disclosure states, policy buttons, portrait controls and optional 3D mark checked. Writing: case claims, retrieval limitations, simulated states and private-project boundaries reviewed.

## Verification

- axe-core 4.14.0: 32 checks passed, zero automated violations with all four case studies and supporting disclosures open. Nine manual contrast items were inspected separately: route text 12.77:1 / 5.85:1 and highlighted text 6.87:1. Control boundary contrast is 4.28:1.
- HTML IDs, local file links, fragments and JavaScript syntax checks passed.
- Shared motion scheduler regression checks passed: single animation loop, repeated start/stop, visibility, overlays and reduced-motion states.
- Policy states worked with pointer and Enter; pressed state, visible explanation and status text matched.
- Dynamic evidence results reopened and focused an already-hashed closed case. Empty search supplied recovery guidance.
- Optional monogram renderer, rotate/reset, Escape, focus return and motion resumption worked. This is a monogram, not a face mesh.
- Direct résumé PDF links and email destination were checked; email copy produced its success status.
- Initial local HTML/CSS/JS total approximately 35.7KB gzipped; illustrated portrait approximately 50KB. This is an asset-size observation, not a Lighthouse or field-performance score.

Not verified: physical devices, cross-browser rendering, screen-reader operation, actual 200% zoom and text-spacing overrides, OS-level motion preference switching, live database integration, renderer network-failure injection, full PDF visual review, or Lighthouse/field performance.

## Recruiter assessment

These are rubric-based editorial judgments, not objective benchmarks or a claim of optimality: role clarity 8.5/10; evidence quality 8/10; navigation 9/10; visual distinctiveness 8/10. The remaining evidence limitation is the absence of independently measured project outcomes. The private project adds relevant systems reasoning while making its verification boundary visible. Automated accessibility results are reported directly rather than converted into a misleading overall score.

## Portrait blocker and release boundary

The illustrated bust has gentle floating and pointer-depth motion, plus a photo alternative and shared pause control. It does not have rigged greeting, nodding or other character actions. The original TRELLIS face mesh failed visual review and was rejected. Hugging Face sign-in is confirmed, but the embedded TRELLIS.2 file selector has not accepted the prepared bust through automation. A manual image selection is needed before generation can continue; a generated mesh would then need likeness review, rigging and suitable animation clips before integration.

Verdict: the inspected case-study and interface fixes are ready for draft review. The requested animated face remains incomplete. No production deployment or merge is authorized by this report.
