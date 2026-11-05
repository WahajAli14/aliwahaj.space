# Case interactions, color and 3D identity

5 November 2026. This supplements CASEBOOK-REVIEW.md and supersedes its palette and portrait-prototype status. Draft branch and local preview only.

## Implemented

All three case studies have native expandable reasoning/evidence panels. The case index, project titles and direct case hashes open the matching panel. Summary controls also work without JavaScript. The backend simulation observes its available size after expansion. New rationale distinguishes general engineering reasoning from unverified personal decision history.

The fixed dark palette now uses ink navy, periwinkle and warm off-white. Sampled declared contrasts against the page background: body 15.66:1, secondary text 10.13:1, accent 8.53:1 and control boundary 6.05:1. These samples are not an exhaustive contrast audit.

A real, locally stored extruded AW mesh (GLB 2.0, 84 triangles, 7,472 bytes) is available through Explore 3D mark. It is an identity prototype, not a portrait. The viewer loads @google/model-viewer 4.4.0 from unpkg only when opened. It provides drag, button rotation, reset, download, a loading/error state and retry. No automatic rotation or camera/microphone features are enabled. Background portfolio motion pauses while the dialog is open; closing restores the reader's motion preference. Reduced motion makes button-driven camera changes immediate.

## References inspected

- [Bruno Simon](https://bruno-simon.com/): an immersive 3D portfolio; useful as a reference for a signature interactive experience.
- [Brittany Chiang](https://brittanychiang.com/): clear experience/project structure and direct professional navigation.
- [Official model-viewer documentation](https://modelviewer.dev/): renderer and camera-control API.

This iteration combines optional 3D interaction with directly readable professional content. The reference comparison was a content/structure inspection, not a full usability audit of those sites.

## Verified

- HTML IDs, heading count, local links/fragments and all JavaScript syntax pass.
- Motion regression tests pass, including overlay suspension/resume, retained explicit pause, repeated toggles, visibility and reduced-motion scheduling.
- In-browser case-index Enter and title clicks opened the matching reasoning panels. Initial top-of-page load leaves all three collapsed. The backend canvas resized after expansion.
- Real 3D mesh rendered in the browser. Rotate and reset worked. Escape closed the native dialog and returned focus to its opener. Opening paused background motion; closing resumed it when the user had not paused it.
- Page width checks found no horizontal overflow at 320, 390 and 1280 CSS pixels. The model dialog fit at 320 and 390; 320px dialog width was 282px. Earlier 768px casebook checks are in CASEBOOK-REVIEW.md.
- No console errors were observed during these preview checks.
- Initial local HTML/CSS/JS gzip total is approximately 29 KB. The external 3D renderer loads separately on demand. This is a transfer-size observation, not a performance score.

## Remaining limits

A confirmed reference photo is needed for a likeness. The public GitHub avatar is an identicon. No face model was fabricated and no private photo was uploaded to a modelling service. The current model is deliberately labeled a monogram prototype.

The renderer requires a network connection on first open. Its error/retry path was reviewed in code but not fault-injected in the browser. No physical-device, cross-browser, screen-reader, enlarged-text, full automated accessibility or Lighthouse/field performance audit was performed. The football implementation and a live RAG backend remain unverified. Production was not deployed or merged.

## Review assessment

Design judgment, not benchmark scores: case-study discoverability 9/10, professional scan clarity 8/10, distinctive identity 8/10. The missing portrait and independently verified project evidence prevent stronger identity/evidence scores. Accessibility and performance are reported by tested scope above rather than assigned unsupported numerical scores.
