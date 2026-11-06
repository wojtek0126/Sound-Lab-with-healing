# UI and Design Guidelines

The visual identity of Sound Lab with Healing includes:

- Golden healing-star details.
- A clean and uncluttered interface.
- Day and night visual modes.
- Compact, left-aligned theme switching.
- A custom golden-star favicon.
- Consistent styling across desktop and mobile layouts.

## Favicon

The project uses a custom healing-star icon instead of the browser's default globe icon. Expected HTML reference (path is relative to `index.html`):

```html
<link rel="icon" type="image/svg+xml" href="assets/favicon.svg">
```

Keep the favicon file and the reference in sync if the path changes.

## Typography

- All button labels and section titles are displayed in uppercase (`text-transform: uppercase` in `css/styles.css`). Translation files keep their original casing, so the transformation is purely visual.
- Panel labels and dropdown content are uppercase. Descriptive notes, tooltips and the frequency information box stay in sentence case.
- Status messages (Generate Sounds, Record Your Sounds, player hint): 12px, 1.45 line-height, uppercase, normal weight. The sound progress line is 11px.
- Numeric values and units next to sliders keep their original casing.
- Field labels and the file-name text use the same style as the status hint: 12px, medium weight, uppercase, colour `#c8faff`. Slider values in Custom Sound Settings are uppercase; `Hz` values in Sound Settings keep their casing.
- Dropdown text (selected value and options) uses the same label style.

## Buttons

- All action buttons: minimum height 48px, 10px radius, 13px text (12px up to 480px wide), centered label.
- Exceptions: the day/night bulb and the +/- panel toggles (icon buttons), and the small "Choose file" button inside the file field.

## Notes and Spacing

- Section notes (Generate Sounds, Record Your Sounds, Golden Frequencies, Play Your Own Audio File) sit at the bottom of the section with a 20px gap above.
- Status messages sit between controls with equal gaps above and below (Generate Sounds: 20px).

## Dropdowns

- All dropdowns share a blue focus outline and a blue hover background.
- The currently selected option is not highlighted in the open list; options highlight on hover only.
- In Chromium 135+ the open list is outlined and rounded (`appearance: base-select`). Other browsers keep the native list.

## File Selection

The native browser file input is visually hidden and replaced by an input-style field with a localized button and status text, so wording follows the app language instead of the browser language. The whole field opens the file dialog.

The label under the field is a state hint ("Choose an audio file to begin." / "Loading audio file..." / "Audio ready to play.") rather than a static label.

The Playback speed dropdown is 215px wide on desktop so longer Polish options stay on one line.
