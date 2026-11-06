# GitHub Pages Deployment

The project is hosted with GitHub Pages. No automated build or test pipeline exists yet; deployment is a branch publish.

## Configuration

1. Open repository **Settings**.
2. Select **Pages**.
3. Choose **Deploy from a branch**.
4. Select `main`.
5. Select `/ (root)`.
6. Save the configuration.

GitHub Pages automatically publishes changes committed to the selected branch.

## Release Checklist

1. Test changes locally (`python -m http.server 8000`).
2. Merge the release/fix branch into `main`.
3. Push `main` and wait for the Pages deployment.
4. Hard-refresh the published site and run the smoke checks in [Test cases](../qa/test-cases.md).
5. Update [Version history](../releases/version-history.md) and the release notes.

## Notes for Future CI/CD

- Locale JSON files are fetched at runtime with `cache: "no-cache"`; static assets can still be cached by the browser or Pages CDN, so a hard refresh may be needed after deployment.
- Candidate pipeline stages (not implemented): JSON validation of `locales/*.json`, key parity between `en.json` and `pl.json`, HTML/CSS/JS linting, automated browser smoke tests.
