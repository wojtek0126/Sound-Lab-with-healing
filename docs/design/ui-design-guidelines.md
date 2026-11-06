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

## Dropdowns

- All dropdowns share a blue focus outline and a blue hover background.
- The currently selected option is not highlighted in the open list; options highlight on hover only.
- In Chromium 135+ the open list is outlined and rounded (`appearance: base-select`). Other browsers keep the native list.

## File Selection

The native browser file input is visually hidden and replaced by an input-style field with a localized button and status text, so wording follows the app language instead of the browser language. The whole field opens the file dialog.
