# GitHub Copilot Task Prompt — Sound Lab UI/UX Fixes

You are working in the existing **Sound Lab with Healing** repository. The app is already published and the English/Polish localisation has been released and smoke-tested. The owner will supervise the work and approve each meaningful change.

## Your task

Investigate and propose a minimal, safe implementation for the five post-release UI/UX issues documented in `README.md` under **“Post-release UI/UX QA Log — English/Polish release”**. Follow `UI_UX_FIX_PLAN.md` as the implementation and verification guide.

The five reported defects are:

1. **UI-01 — Main title overflow:** “Sound Lab” overflows its containing panel on Android/mobile.
2. **UI-02 — Polish waveform text:** Longer Polish waveform words break mid-word and look unnatural.
3. **UI-03 — Replay button:** “Odtwórz ostatnie nagranie” wraps to three lines on mobile.
4. **UI-04 — Playback-speed row:** The dropdown clips/overlaps its “Playback speed” label in the “Play Your Own Audio File” section; reported in both English and Polish.
5. **UI-05 — Duration/gap values:** “Przerwa między dźwiękami” value (number + seconds unit) wraps differently from “Czas trwania dźwięku”; the two controls should be consistent.

## Mandatory workflow — do not jump straight into editing

### Phase 1: Inspect and report

1. Read `README.md`, `UI_UX_FIX_PLAN.md`, `index.html`, the complete `css/styles.css`, and relevant JavaScript/localisation files.
2. Trace the exact DOM nodes and translation keys involved in each issue. Confirm whether the waveform text issue is the statistic label or the dynamically populated waveform value before changing CSS.
3. Inspect the full CSS cascade and responsive media queries. In particular, `styles.css` contains multiple `.speed-row` rules, fixed widths, `white-space: nowrap`, and high-specificity/`!important` declarations. Determine which rules actually win.
4. Inspect whether JavaScript modifies/wraps the playback-speed `<select>` at runtime.
5. Do not assume the reported issue is caused by a single CSS property. Identify the likely root cause and affected viewport(s).
6. Before making changes, report a short diagnosis and proposed file-by-file change list. Wait for the owner's approval before applying edits.

### Phase 2: Implement only approved changes

- Make the smallest maintainable changes that fix the root causes.
- Prefer editing/consolidating the existing relevant CSS rules over appending another override block.
- Keep selectors scoped to the affected components.
- Preserve the existing visual style, day/night themes, desktop layout, localisation mechanism, and all current functionality.
- Do not rewrite working modules or perform unrelated refactoring.
- Do not modify audio generation, recording, replay, uploaded-audio playback, or persistence logic unless inspection proves a change is strictly required for a reported UI defect.
- Do not change translation wording or locale keys unless the owner explicitly approves a content change.
- Do not use global `word-break: break-all`, global `overflow-wrap: anywhere`, fixed heights that clip content, or ellipsis/truncation that hides required labels.
- Keep translated words intact. Prefer natural word-boundary wrapping, responsive font sizing, flexible layout, or a responsive stacked control layout.
- Keep numeric values and their units together, while allowing descriptive labels to wrap naturally.
- Preserve accessible labels and tap target sizes.

### Specific implementation guidance

**UI-01:** Diagnose heading width, font size, letter spacing, container padding, and viewport sizing. Use responsive typography/layout so the complete title stays inside the panel. Do not conceal overflow.

**UI-02:** Inspect `.stat-value` and the actual waveform value. The current stylesheet includes `overflow-wrap: anywhere` for statistic values; verify whether this causes mid-word breaks. Prefer normal word wrapping and responsive sizing/card layout. Do not split Polish words internally.

**UI-03:** Inspect the replay button's parent layout, available width, padding, font size, and line-height. Make the full Polish label balanced (target no more than two lines at common mobile widths) without truncating it. Check neighbouring recording controls.

**UI-04:** Inspect and consolidate all `.speed-row`, label, select, and wrapper rules. Ensure the label and dropdown have enough space in both locales. On narrow screens, a label-above-dropdown layout is acceptable if an inline row cannot fit. Keep desktop alignment and dropdown operation intact.

**UI-05:** Compare `#durationValue` and `#gapValue`, their shared `.control label` structure, and the JavaScript that updates them. Apply the same responsive layout rule to both. Keep the number and unit together without forcing the descriptive label onto one line.

### Phase 3: Verify and report

Test at minimum these viewport widths: **320, 360, 390, 430, 768 px, and desktop**.

Test:
- English and Polish.
- Android Chrome if available; otherwise clearly state which browser/device was used instead.
- Day and night themes.
- Main title fit.
- Waveform value wrapping.
- Replay button wrapping and tap usability.
- Playback-speed label/select spacing and actual selector operation.
- Duration and gap value consistency while moving both sliders.
- Language switching after load.
- Existing sound generation, recording, replay, uploaded-audio playback, and playback speed.
- Browser console for new errors.

Do not claim a device/browser was tested unless it was actually tested. If you cannot run a test, mark it **Not tested** and give the owner exact manual steps.

## Deliverables

1. A concise diagnosis of each issue and the files/classes involved.
2. A proposed change list for owner approval before editing.
3. After approval, a focused diff with explanations.
4. A test-results table mapped to UI-01 through UI-05 and the regression checks in `UI_UX_FIX_PLAN.md`.
5. A README update that changes statuses only to results actually verified. Leave anything untested or unresolved as Open/Not tested.
6. A list of any remaining risks or manual checks required before release.

## Important collaboration rule

The repository owner is supervising this work. **Do not silently make broad changes, commit, push, publish, or create a release.** Stop after the diagnosis and proposed file-by-file plan and wait for approval. After implementation, show the diff and test evidence for review before proceeding to any deployment step.
