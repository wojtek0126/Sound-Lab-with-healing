# Release Notes — 1.2.0 (in progress)

Branch: `release/1.2.0`

## Changes

- All buttons and section titles are displayed in uppercase. Implemented with a CSS rule in `css/styles.css`; translation strings in `locales/` are unchanged.
- Labels and dropdown content in the Sound Settings and Custom Sound Settings panels are uppercase (waveform select and options, setting names). Numeric values and units (for example `100 Hz`, `3 seconds`) keep their original casing.
- All text in the Play Your Own Audio File panel is uppercase (labels, notes, file name, status messages and the playback-speed dropdown), except the supported-format note, the upload tooltip and the bottom note, which keep normal sentence case. Buttons are unchanged from the global uppercase rule.
- In the Play Your Own Audio File panel, the label above the file field now shows the state hint instead of "Choose an audio file from your computer": "Choose an audio file to begin." initially, "Loading audio file..." while loading, and "Audio ready to play." once loaded; it resets when the file is discarded. The hint is displayed centered, in a medium weight, directly under the upload tooltip (or under the file field once the tooltip is hidden) and above the play buttons, with 15px gaps above and below. It uses the same text size as the Record Your Sounds status messages (12px, 1.45 line-height). The status line below no longer repeats these three messages (new empty key `player.statusIdle` in both locale files); other statuses (playing, paused, errors) still use it. The `player.fileLabel` key is now unused.
- The Playback speed dropdown is wider on desktop (215px instead of 155px) and keeps its text, including the longer uppercase Polish options, on a single line (ellipsis if it still does not fit). Mobile layout (full-width, stacked) is unchanged. The selected text is vertically centered in the dropdown.
- All text in the Golden Frequencies panel is uppercase (labels, category and frequency dropdowns), except the introductory description and the information box showing the frequency association, which keep normal sentence case.
- The "Recording discarded. Ready for a new recording." message uses the same style as the other recording messages (12px text, 1.45 line-height, 8px gap before the recording controls).
- All Record Your Sounds status messages use the same text style as the "Choose an audio file to begin." hint: uppercase, normal weight, same colour (size and spacing unchanged).
- Generate Sounds status and progress messages ("Ready to generate sounds.", "Sound 7 of 7", "Waiting 2.0 s...") sit centered between the Stop button and the instruction note, with an equal 20px gap above and below. The progress line takes no space while empty.
- Generate Sounds has a new instruction note at the bottom of the section (new key `generator.note` in `en.json` and `pl.json`), styled like the other section notes with a 20px gap above it. It explains that custom sounds and sequences use the settings panels and that random ones pick their own pitch, duration and volume.
- Stopping a sequence part-way clears the "Sound x of y" progress line (`js/audio.js`).
- Golden Frequencies: the introductory description moved from the top of the panel to the bottom, below the Apply button, and uses the same note style as the Record Your Sounds note (sentence case), with a 20px gap above it. The Record Your Sounds note has the same 20px gap above it. The note at the bottom of Play Your Own Audio File ("Rewind and forward skip 10 seconds…") also has a 20px gap above it, below the playback-speed dropdown.
- Generate Sounds status messages ("Ready to generate sounds.", "Playing sound x...") use the same style as the Record Your Sounds messages (12px, uppercase, normal weight). The sound progress line ("Sound 7 of 7") is uppercase and slightly smaller (11px).
- All action buttons share one style: minimum height 48px, 10px radius, 13px text (12px on screens up to 480px), centered label. Previously the generate/player buttons (44-47px, 9px radius, 14px) and the recording buttons (52px, 10px radius, 13px) differed. The day/night bulb, the +/- panel toggles and the small "Choose file" button inside the file field keep their own compact style (the latter uses 13px text).

## Verification

- Checked locally by serving the app over HTTP (`python -m http.server 8000`). Cross-browser, mobile and layout checks for longer uppercase Polish labels are not yet done.

## Related

- [1.2.0 roadmap](../roadmap/1.2.0-roadmap.md)
- [UI and design guidelines](../design/ui-design-guidelines.md)
