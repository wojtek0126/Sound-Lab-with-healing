# Release Notes — 1.1.0 and Post-release Fixes

## Important Updates

- Application split into `index.html`, `css/`, `js/` and `locales/` (English and Polish).
- Language selector with persisted choice; locale files are fetched with cache revalidation so new keys are not served stale.
- Post-release UI/UX fixes UI-01 to UI-10 and Android-01 to Android-05 are implemented. Details and verification status: [1.1.0 post-release fixes report](1.1.0-post-release-fixes-report.md).
- Playback-speed dropdown chevron no longer flips while the control is disabled (no audio loaded).
- The native browser file input was replaced with a localized, input-style field ("Choose file" / "Wybierz plik"); the whole field opens the file dialog.
- Dropdowns share a blue focus outline and hover highlight. In Chromium 135+ the open list is rounded and outlined; other browsers keep the native list.
- Recording status and error messages use a smaller, consistent style with spacing before the controls.

## Known Limitations

- Verification was done in desktop Chromium viewport emulation; physical Android devices are not tested.
- Replay of a browser-created recording was rejected in the tested Chromium session (`NotSupportedError`) and is not verified.
- Styled dropdown lists need Chromium 135+.

## Branches

- `main` — released code
- `release/1.1.0` — backup of the 1.1.0 post-release state
- `post-release-1-1-0-fixes-android` — fix history
