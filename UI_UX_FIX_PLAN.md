# Sound Lab with Healing — UI/UX Fix Plan

**Scope:** Five post-release responsive/localisation presentation defects reported during smoke testing and mini regression.  
**Implementation approach:** Small, targeted changes to the existing HTML/CSS/JavaScript. Preserve the published functionality and current English/Polish translations unless a verified defect requires a reviewed content change.

## 1. Goals and guardrails

- Fix the five issues recorded as UI-01 through UI-05 in `README.md`.
- Prioritise Android/mobile layouts while preserving desktop behaviour.
- Test both English and Polish, including long Polish labels and values.
- Do not refactor unrelated modules or alter audio generation, recording, playback, or persistence logic.
- Do not use global `word-break: break-all`, `overflow-wrap: anywhere`, fixed heights that clip text, or ellipses that hide required button/control labels as quick fixes.
- Avoid accumulating another conflicting CSS override. Inspect and consolidate the existing rules in context before editing.

## 2. Investigation and baseline

1. Read `README.md`, `index.html`, the complete `css/styles.css`, and the relevant JavaScript/localisation code.
2. Trace how locale JSON values are loaded and applied, and identify the exact translated DOM nodes for each finding.
3. Inspect the full cascade for `.container`, `h1`, `.stat-value`, `.player-button`, `.speed-row`, `.select-wrapper`, and `.control label`, including media queries and `!important` rules.
4. Confirm whether any script wraps or decorates `<select>` elements at runtime; do not assume the static HTML is the final DOM.
5. Capture baseline screenshots or notes for English and Polish at representative viewport widths: 320, 360, 390, 430, 768, and desktop width. Include Android Chrome if available.
6. Record the current behaviour before changing code so each fix can be compared against the baseline.

## 3. Fixes by finding

### UI-01 — Main app title overflows its container

**Likely area:** `h1`, `.container`, mobile typography and horizontal padding in `css/styles.css`.

**Plan:**
- Identify whether the overflow is caused by heading font size, letter spacing, container padding, viewport width, or a combination.
- Apply responsive heading sizing (for example, a carefully chosen `clamp()` or breakpoint rule) and adjust letter spacing only as needed.
- Ensure the heading has a usable maximum width and respects `box-sizing`.
- Preserve the visual hierarchy and desktop appearance.
- Do not hide overflow on the heading/container to conceal the defect.

**Acceptance:** The full title is visible inside the panel at 320–430 px and wider widths, in both locales, with no horizontal page scrolling.

### UI-02 — Polish waveform words break unnaturally

**Likely area:** `.stat-value` and the waveform statistic populated by the application.

**Plan:**
- Confirm whether the awkward break occurs in the translated statistic label (“Przebieg”) or, more likely, in a longer waveform value such as “Piłokształtny”; inspect the rendered node before choosing a selector.
- Review the current `overflow-wrap: anywhere` rule on `.stat-value`.
- Prefer normal word-boundary wrapping (`overflow-wrap: normal` / `word-break: normal`) and allow the statistic card/grid to shrink correctly with `min-width: 0` where appropriate.
- If a long single word still cannot fit, use responsive font sizing or a slightly different card layout rather than splitting the word internally.
- Do not rename or rewrite locale strings just to compensate for a CSS issue unless product wording is separately reviewed.

**Acceptance:** Polish waveform text remains legible and is not split mid-word at narrow mobile widths. English and all other statistic values remain readable.

### UI-03 — “Replay latest recording” button takes three lines

**Likely area:** `#replayRecording`, `.player-button`, `.recording-buttons`, and mobile button/grid rules.

**Plan:**
- Inspect the available button width, parent layout, font size, horizontal padding, line-height, and any minimum/fixed dimensions.
- Give the replay button a responsive layout that keeps the translated label balanced (target no more than two lines at common mobile widths).
- Where necessary, let the replay control occupy a full row or a wider grid track on small screens, rather than shrinking all recording buttons indiscriminately.
- Preserve the accessible full label; do not truncate it or replace it with an unexplained abbreviation.
- Check the adjacent “Stop replay” control and recording buttons for regressions.

**Acceptance:** “Odtwórz ostatnie nagranie” does not occupy three lines at 320–430 px; text is fully visible, centred/readable, and the button remains easy to tap. English remains visually balanced.

### UI-04 — Playback-speed label and dropdown clip/overlap

**Likely area:** `.speed-row`, its label/select, `.select-wrapper`, and the existing playback-speed CSS overrides.

**Plan:**
- Inspect the actual runtime DOM and the complete cascade. The stylesheet currently contains multiple `.speed-row` declarations, including fixed 150/155 px widths, `white-space: nowrap`, and `!important` declarations; determine which rules are active.
- Remove or consolidate conflicting declarations instead of adding another competing override at the end of the file.
- At narrow widths, use a responsive arrangement that gives both the label and dropdown sufficient width. A stacked label-above-control layout is a safe option if an inline row cannot fit.
- At wider widths, retain a compact inline arrangement with flexible sizing (`min-width: 0`) and no overlap.
- Ensure the select and any custom chevron/wrapper remain aligned and fully visible.
- Test the longer Polish label as well as English.

**Acceptance:** At 320–430 px, the label and dropdown never overlap, clip, or force horizontal scrolling in either locale. Desktop layout remains intact and the select remains operable.

### UI-05 — Duration and gap values use inconsistent wrapping

**Likely area:** the `#durationValue` and `#gapValue` spans inside `.control label`, plus their dynamic value updates in `js/settings.js` and locale unit strings.

**Plan:**
- Compare the DOM structure and computed styles for both controls.
- Apply the same layout rule to both value spans.
- Keep the number and unit together as a non-breaking value (for example, `white-space: nowrap` on the value span), while allowing the descriptive label to wrap naturally.
- Check whether the translated unit is assembled in JavaScript and ensure the fix does not break localisation or plural handling.
- Avoid fixed heights; controls must accommodate translated label text.

**Acceptance:** Duration and gap values display consistently in English and Polish. The number and unit stay together, and labels/values do not overlap at narrow widths.

## 4. Implementation order

1. Establish baseline and identify exact runtime nodes.
2. Fix UI-04 (playback-speed row) because it affects both locales and has conflicting existing CSS rules.
3. Fix UI-01 (main heading responsive sizing).
4. Fix UI-02 (statistic word wrapping).
5. Fix UI-03 (replay button sizing/layout).
6. Fix UI-05 (consistent value layout).
7. Review the resulting CSS for duplicate/conflicting selectors and remove only rules made obsolete by these fixes.
8. Run the complete regression checklist below before considering the work complete.

The implementation order may be adjusted if inspection reveals a shared root cause, but every issue must retain its own acceptance check.

## 5. Verification / regression checklist

| Test ID | Test | Expected result |
|---|---|---|
| UI-01-A | Android Chrome, 320 px wide, English | App title stays inside the main panel; no horizontal overflow. |
| UI-01-B | Android Chrome, 320–430 px, Polish | App title stays inside the main panel; no horizontal overflow. |
| UI-02-A | Polish waveform statistic at 320–430 px | Long waveform word is not broken mid-word. |
| UI-02-B | English waveform statistic at 320–430 px | Value remains readable and does not overflow. |
| UI-03-A | Polish replay button at 320, 360, 390, and 430 px | Full label is visible in a balanced layout, no more than two lines where practical. |
| UI-03-B | English replay button at the same widths | Button remains balanced and usable. |
| UI-04-A | Playback-speed control, English, mobile | Label and select are fully visible and do not overlap. |
| UI-04-B | Playback-speed control, Polish, mobile | Longer translated label and select are fully visible and do not overlap. |
| UI-04-C | Playback-speed control, desktop, both locales | Existing inline layout (if appropriate) remains aligned and functional. |
| UI-05-A | Duration value and gap value, Polish, mobile | Both values use the same wrapping rule; number and unit stay together. |
| UI-05-B | Duration value and gap value, English, mobile | Both values use the same wrapping rule; number and unit stay together. |
| REG-01 | Switch language English ↔ Polish after page load | All affected text updates correctly; no stale labels. |
| REG-02 | Change sound duration and gap sliders | Values update correctly and remain readable. |
| REG-03 | Use uploaded-audio playback speed selector | Selector remains enabled/disabled and changes playback speed as before. |
| REG-04 | Replay a completed recording | Replay and stop-replay behaviour remains unchanged. |
| REG-05 | Day/night theme, all affected controls | Both themes retain readable text, borders, and control states. |
| REG-06 | Desktop/tablet/mobile layout | No regressions outside the reported narrow-screen cases. |
| REG-07 | Browser console | No new JavaScript errors or missing locale-key errors. |

## 6. Definition of done

- All five findings UI-01 through UI-05 pass their acceptance criteria.
- English and Polish are checked at the stated mobile widths and at desktop width.
- Android Chrome is checked where available; if unavailable, record the browser/device substitute and do not claim Android verification.
- Existing audio generation, recording, replay, upload, playback-speed, and settings interactions pass regression checks.
- No new horizontal page overflow, clipped controls, inaccessible labels, or console errors are introduced.
- CSS changes are targeted and consolidated; no unnecessary global typography/wrapping changes are introduced.
- `README.md` is updated with actual results and statuses only after testing. Keep unresolved items marked Open.
- Do not create a new release/version entry until the owner decides to publish the verified fix.
