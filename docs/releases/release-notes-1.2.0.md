# Release Notes — 1.2.0 (in progress)

Branch: `release/1.2.0`

Scope so far: documentation restructuring and a UI polish pass (consistent typography, buttons, notes and status messages). The login/signup and architecture items in the [1.2.0 roadmap](../roadmap/1.2.0-roadmap.md) are not started.

## Documentation

- The README was split into topic files under `docs/` (product, development, design, ci-cd, qa, backlog, roadmap, releases). The root README keeps basic info and links. See the [documentation index](../README.md).

## Typography

- All buttons and section titles are uppercase (CSS only; translation strings in `locales/` are unchanged).
- Uppercase labels and dropdown content in Sound Settings and Custom Sound Settings. Numeric values and units (for example `100 Hz`, `3 seconds`) keep their casing.
- Uppercase text in Play Your Own Audio File, except the supported-format note, the upload tooltip and the bottom note (sentence case).
- Uppercase labels and dropdowns in Golden Frequencies, except the information box showing the frequency association (sentence case).
- Record Your Sounds and Generate Sounds status messages share one style: 12px, 1.45 line-height, uppercase, normal weight, same colour. This includes "Recording discarded. Ready for a new recording.", which previously lacked the shared style. The sound progress line ("Sound 7 of 7") is uppercase and 11px.
- Field labels (Golden Frequencies, Play Your Own Audio File, Sound Settings, Custom Sound Settings) and the file-name text use the same hint style: 12px, medium weight, uppercase, same colour. In Custom Sound Settings the values (for example "3 seconds") are uppercase too; in Sound Settings the `Hz` values keep their casing.
- Dropdown text (selected value and options, including the language selector) uses the same style as the labels: 12px, medium weight, uppercase, same colour.

## Buttons

- All action buttons share one style: minimum height 48px, 10px radius, 13px text (12px up to 480px wide), centered label. Previously generate/player buttons (44-47px, 9px radius, 14px) and recording buttons (52px, 10px radius, 13px) differed.
- The day/night bulb and +/- panel toggles keep their own icon-button style. The small "Choose file" button inside the file field stays compact (13px text).

## Play Your Own Audio File

- The label above the file field was replaced by a state hint: "Choose an audio file to begin.", "Loading audio file..." and "Audio ready to play." It is centered, normal weight, 12px, placed under the upload tooltip (or under the file field once the tooltip is hidden) with 15px gaps above and below, and resets when the file is discarded.
- The status line below no longer repeats those messages (new empty key `player.statusIdle` in both locale files). Playing, paused and error statuses still use it. The key `player.fileLabel` is now unused.
- The Playback speed dropdown is 215px wide on desktop (was 155px), keeps its text on one line (ellipsis if it still does not fit) and the selected text is vertically centered. Mobile layout (full-width, stacked) is unchanged.
- The note at the bottom has a 20px gap above it.

## Golden Frequencies

- The introductory description moved from the top of the panel to the bottom, below the Apply button, as a note (sentence case) with a 20px gap above it.

## Record Your Sounds

- The initial message ("Start recording before generating sounds.") is centered between the section title and the Start/Stop buttons with equal 20px gaps. Other recording messages keep the 8px gap before the buttons.
- "Recording discarded. Ready for a new recording.", "Nothing to save. Please start recording..." and "Recording audio..." are centered like the initial message (equal 20px gaps between the section title and the buttons). While recording, the "● RECORDING IN PROGRESS" indicator and "Recording audio..." form one centered block (4px between them, 20px above and below).
- The "Recording ready! You can replay or save it." message is centered between the replay buttons and the save buttons with equal 20px gaps on desktop and mobile (replacing the earlier desktop-only 15px spacing).
- The note at the bottom has a 20px gap above it, matching the Golden Frequencies note.

## Generate Sounds

- New instruction note at the bottom of the section (new key `generator.note` in `en.json` and `pl.json`) explaining that custom sounds and sequences use the settings panels and that random ones pick their own pitch, duration and volume. Same note style and 20px gap above.
- Status and progress messages ("Ready to generate sounds.", "Sound 7 of 7", "Waiting 2.0 s...") are centered between the Stop button and the note with an equal 20px gap above and below. The progress line takes no space while empty.
- Stopping a sequence part-way clears the "Sound x of y" progress line (`js/audio.js`).

## Verification

- Checked locally in desktop Chrome by serving the app over HTTP (`python -m http.server 8000`). Button styles and the Generate Sounds spacing were measured with computed styles in a fresh page load.
- Not yet done: mobile and Android widths for the longer uppercase Polish labels, other browsers, and a full regression pass (see the [1.2.0 test plan](../qa/1.2.0-test-plan.md)).

## Related

- [1.2.0 roadmap](../roadmap/1.2.0-roadmap.md)
- [UI and design guidelines](../design/ui-design-guidelines.md)
- [Version history](version-history.md)
