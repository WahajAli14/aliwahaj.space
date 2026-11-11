# TRELLIS likeness trial

5 November 2026. User approved the selected front-facing suit photo being sent to the trellis-community demo linked from the original Microsoft TRELLIS project. The upload and first generation completed. This trial used the original TRELLIS demo, not TRELLIS.2.

## Result: rejected for portfolio use

The generated file is valid GLB 2.0, 1,603,660 bytes, with 16,855 vertices, 25,852 triangles, one material and one texture. It rendered in the same model-viewer renderer used by the portfolio. Frontal and profile views were compared with the reference.

The eye shapes/placement and mouth are visibly distorted. The facial proportions and profile do not preserve the reference closely enough. Clothing and broad silhouette are more plausible, but that does not compensate for identity loss. Rear geometry is inferred from a single photograph, not observed capture. Transfer size meets the proposed 2 MB budget; likeness quality fails acceptance.

First trial settings observed in the UI: seed 550101276, 12 sampling steps per stage, sparse guidance 7.5, structured-latent guidance 3, texture size 1024, simplify 0.95.

A refinement retained the same seed and guidance and increased both sampling stages to 24 steps. The service returned generic Error messages on the first attempt and one retry. No detailed cause was exposed by the UI or console. No new output was accepted. The still-present download button referred to the previous result, so it was not treated as a successful refinement.

The trial mesh and comparison image are retained in the local outputs/3d-trial folder for inspection only. It was not added to the portfolio branch, and no portrait mesh replaced the monogram. The real photograph remains the primary personal image. No production deployment occurred.

Recommended next step: a controlled TRELLIS.2 or specialist portrait-reconstruction test with identity review, or an artist-corrected bust. No claim is made that one tool is best for this person without a direct comparison. Any new external destination or additional reference upload needs its own authorization.
