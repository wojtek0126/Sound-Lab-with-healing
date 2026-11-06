# Manual Test Cases

Manual testing checklist for Sound Lab with Healing. These are proposed test scenarios, not a claim that every test has already passed.

Note: IDs QA-25 to QA-28 below (accordion) overlap with IDs of the same number in the [1.2.0 test plan](1.2.0-test-plan.md). Renumber one set before importing both into a test-management tool.

| ID | Test scenario | Expected result |
| --- | --- | --- |
| QA-01 | Open application | Main interface loads |
| QA-02 | Load application on refresh | Application loads without errors |
| QA-03 | Switch to night mode | Night theme appears |
| QA-04 | Switch to day mode | Day theme appears |
| QA-05 | Inspect theme switch | Switch remains compact and left-aligned |
| QA-06 | Inspect golden stars | Star details display correctly |
| QA-07 | Generate sound | Sound generation works |
| QA-08 | Play generated sound | Audio plays correctly |
| QA-09 | Record audio | Recording functionality works |
| QA-10 | Play WAV audio | WAV playback works |
| QA-11 | Inspect browser tab | Golden healing-star favicon appears |
| QA-12 | Test on mobile | Layout remains usable |
| QA-13 | Refresh live website | Application remains accessible |
| QA-14 | Inspect console | No unexpected critical errors |
| QA-15 | Test minimum pitch slider | Maximum pitch automatically adjusts when minimum pitch exceeds it |
| QA-16 | Test maximum pitch slider | Minimum pitch automatically adjusts when maximum pitch goes below it |
| QA-17 | Inspect pitch value labels | Both displayed values update correctly |
| QA-18 | Attempt to save original recording without recording anything | Download is prevented, an informative error message appears, and replay/download controls remain hidden |
| QA-19 | Attempt to save WAV without recording anything | Download is prevented and an informative error message appears |
| QA-20 | Complete a valid recording | Start Recording and Stop Recording buttons disappear |
| QA-20b | Discard a completed recording | Recording controls become visible again (duplicate ID QA-20 in the original README; renumbered here) |
| QA-21 | Attempt to save without a valid recording | Download is prevented and an informative message appears |
| QA-22 | Click folded panel background | Panel expands |
| QA-23 | Click folded panel heading | Panel expands |
| QA-24 | Click + button | Panel expands |
| QA-25 | Click − button | Panel collapses |
| QA-26 | Click buttons inside expanded panel | Normal button functionality preserved |
| QA-27 | Operate sliders inside expanded panel | Sliders work without collapsing panel |
| QA-28 | Test accordion on all panels | Consistent behaviour across sections |
