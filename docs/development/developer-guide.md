# Developer Guide

## Technology

The application is a browser-based HTML/CSS/JavaScript project with no build step. It is hosted with GitHub Pages (see [GitHub Pages deployment](../ci-cd/github-pages-deployment.md)).

## Repository Structure

```text
Sound-Lab-with-healing/
├── index.html
├── css/styles.css
├── js/
│   ├── app.js
│   ├── audio.js
│   ├── localization.js
│   ├── recording.js
│   └── settings.js
├── locales/
│   ├── en.json
│   └── pl.json
├── assets/favicon.svg
├── docs/
├── README.md
├── LICENSE
└── .gitignore
```

## Main Files

| File | Purpose |
| --- | --- |
| `index.html` | Main application markup |
| `css/styles.css` | Application styling |
| `js/app.js` | Application bootstrap |
| `js/audio.js` | Sound generation and uploaded-audio playback |
| `js/recording.js` | Recording, replay and download |
| `js/settings.js` | Sliders, dropdowns, golden frequencies, panels |
| `js/localization.js` | Language loading and switching |
| `locales/en.json`, `locales/pl.json` | Translation dictionaries (flat keys) |
| `assets/favicon.svg` | Golden healing-star browser icon |
| `LICENSE` | BSD 2-Clause license |
| `.gitignore` | Files excluded from Git |

## Running Locally

Locale files are loaded with `fetch()`, so the app must be served over HTTP rather than opened from the file system:

```powershell
python -m http.server 8000
```

Then open http://localhost:8000.

## Updating the Application

1. Edit the local application files.
2. Test changes in a browser.
3. Commit changes with a descriptive message.
4. Push to GitHub and wait for GitHub Pages deployment.
5. Verify the published application (hard-refresh to avoid cached files).

## Developer Recommendations

- Keep the main entry file named `index.html`.
- Preserve the favicon reference when modifying the HTML.
- Avoid committing private keys, credentials or personal information.
- Keep documentation under `docs/` updated when functionality changes.
- Test audio features in multiple browsers.
- Preserve responsive layout and accessibility.
- Use descriptive Git commit messages.

## Branches

| Branch | Purpose |
| --- | --- |
| `main` | Released code |
| `release/1.1.0` | Backup of the 1.1.0 post-release state |
| `release/1.2.0` | Version 1.2.0 development and documentation restructuring |
| `post-release-1-1-0-fixes-android` | Fix history for 1.1.0 post-release issues |
