# Progress Log

## Initial Development

- Created the Sound Lab with Healing application.
- Established the browser-based application structure.
- Added sound-related functionality.
- Developed the initial visual interface.

## UI Improvements

Accordion and panel interaction:
- Implemented expandable and collapsible interface panels.
- Enabled clicking anywhere on a folded panel to expand it.
- Preserved dedicated + and − controls.
- Restricted panel-background expansion to folded panels only.
- Prevented interactive elements from accidentally triggering accordion behaviour.
- Preserved normal operation of buttons, sliders, audio controls and other interactive elements.
- Improved usability and accessibility through updated ARIA attributes.

Pitch controls:
- Implemented synchronized minimum and maximum pitch sliders.
- Prevented minimum pitch from exceeding maximum pitch, and maximum pitch from falling below minimum pitch.
- Added automatic adjustment of the opposite slider.
- Ensured pitch value labels update immediately.

Theme and visuals:
- Introduced additional golden-star visual details.
- Improved the day/night theme switch: reduced its width and moved it towards the left side of the interface.

## Branding

- Selected the golden healing star as the application's visual symbol.
- Prepared a custom SVG favicon.
- Replaced the default browser globe icon with project branding.

## GitHub Publication

- Created the GitHub repository and selected BSD 2-Clause licensing.
- Prepared `index.html` and `favicon.svg`.
- Uploaded the application, configured GitHub Pages and published it online.

## Documentation

- Prepared project documentation and developer instructions.
- Defined manual QA scenarios.
- Established a progress tracking structure.

## Recording Improvements

- Introduced explicit `hasRecording` state tracking.
- Added minimum recording-data validation (`MIN_RECORDING_SIZE`).
- Prevented empty recordings from displaying replay and download controls.
- Prevented saving original recordings when no valid recording exists.
- Automatically hides Start Recording and Stop Recording buttons after a successful recording, and restores them when the recording is discarded.
- Improved recording status messages to guide users through the recording process.

## Code Refactoring — Phase 1

- Separated the original monolithic `index.html` into dedicated application files.
- Established a modular project structure and populated the separated files with the corresponding code.
- Used GitHub Copilot to assist with code migration.
- Deployed the refactored application to GitHub Pages and completed post-deployment smoke testing.
- Confirmed that the application remains functional after refactoring.

## Localization

- Created a dedicated `locales/` directory with `en.json` and `pl.json`.
- Established the foundation for separating interface text from application logic.
- Integrated language switching, translation keys and persistence (English and Polish) in 1.1.0.

## Post-release 1.1.0

See [release notes 1.1.0](../releases/release-notes-1.1.0.md) and the [fixes report](../releases/1.1.0-post-release-fixes-report.md).
