# Known Issues and Planned Fixes

| ID | Area | Issue / planned improvement | Status |
| --- | --- | --- | --- |
| BUG-01 | Recording | Prevent saving original recording without a valid recording. | Resolved |
| BUG-02 | Recording | Improve the error message when saving a WAV file without an available recording; use consistent wording across recording actions. | Resolved |
| BUG-03 | Recording | Investigate why an apparently empty recording produces a non-empty Blob and triggers the download process. | Resolved — recording is never empty; a minimum file size limit was applied |

UI issues UI-01 to UI-05 are tracked in the [post-release UI/UX QA log](../qa/post-release-ui-qa-log.md).

## Planned Behaviour

- Save Original Recording is only available when a valid recording exists.
- Save as WAV gives a clear and consistent message when no recording is available.
- Recording-related actions reflect the current recording state.

## Open Items

- Physical Android device verification is not done.
- Replay of a browser-created recording was rejected in the tested Chromium session (`NotSupportedError`) and is not verified.

## Development Notes

Document issues here before fixing. Address and manually test them before marking them completed, and update the status of each item as development progresses.
