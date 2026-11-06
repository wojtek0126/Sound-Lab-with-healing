# Post-release UI/UX QA Log — English/Polish release

Five layout issues were reported during post-release smoke testing and a mini regression pass. Android/mobile behaviour was specifically reported for UI-01, UI-02, UI-03 and UI-05. UI-04 was reported in both English and Polish locales. These are user-reported observations; they were not independently reproduced in every browser/device combination.

| ID | Area | Observed behaviour | Expected behaviour | Context | Status |
| --- | --- | --- | --- | --- | --- |
| UI-01 | Main heading / responsive layout | The app title overflows its containing panel on Android/mobile. | The title remains fully inside the panel at supported viewport widths, without horizontal overflow or clipping. | Android/mobile; verify both locales and narrow widths. | Resolved (viewport-verified) |
| UI-02 | Waveform statistic / Polish typography | Longer Polish waveform names wrap at awkward points inside a word. | Polish words wrap at natural word boundaries. | Polish; Android/mobile. | Resolved (viewport-verified) |
| UI-03 | Recording replay button | The translated "Replay latest recording" label ("Odtwórz ostatnie nagranie") occupies three lines. | Balanced layout (preferably at most two lines on narrow screens), readable, usable button. | Polish; Android/mobile. | Resolved (viewport-verified) |
| UI-04 | Uploaded-audio playback speed control | The playback-speed dropdown clips/overlaps the "Playback speed" label. | Label and dropdown fully visible, without overlap or clipping. | English and Polish; also outside Android. | Resolved (viewport-verified) |
| UI-05 | Custom sound settings / value alignment | "Gap between sounds" value breaks onto multiple lines while "Sound duration" stays on one line. | Both values follow the same rule; number and unit stay together. | Polish; Android/mobile. | Resolved (viewport-verified) |

## Triage Note

These are presentation and responsive-layout defects. No audio-generation, recording, playback, or localisation-data failure was reported as part of these findings. Do not change audio behaviour or translation wording unless investigation shows it is necessary and the change is explicitly reviewed.

## Related Implementation Areas

`index.html`, `css/styles.css`, `js/settings.js`, `js/recording.js`, and the locale dictionaries in `locales/`. Inspect the full CSS cascade and all responsive overrides before adding new rules; `styles.css` contains multiple rules for the playback-speed row, including high-specificity and `!important` declarations.

## Related Documents

- [UI/UX fix plan](ui-ux-fix-plan.md)
- [Supervised implementation prompt](copilot-ui-ux-fix-prompt.md)
- [1.1.0 post-release fixes report](../releases/1.1.0-post-release-fixes-report.md) (results for UI-01 to UI-10 and Android-01 to Android-05)
