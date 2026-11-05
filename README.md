⭐ Sound Lab with Healing

A browser-based sound laboratory designed for exploring sound, creating relaxing audio experiences, and experimenting with sound generation and recording.

Live application:
https://wojtek0126.github.io/Sound-Lab-with-healing/

GitHub repository:
https://github.com/wojtek0126/Sound-Lab-with-healing

License: BSD 2-Clause

1. Project Overview

Sound Lab with Healing is a web-based application focused on sound exploration and an enjoyable, calming user experience.

The project combines sound-related functionality with a visually appealing interface featuring golden star details and day/night themes.

The application is designed to run directly in a modern web browser without requiring a traditional software installation.

Main Features
Sound generation and experimentation.
Audio recording.
WAV audio playback.
Day/night visual themes.
Compact, left-aligned day/night switch.
Golden star visual elements.
Custom golden healing-star browser favicon.
Responsive browser-based interface.
Synchronized minimum and maximum pitch controls to prevent invalid frequency ranges.

2. User Instructions
Accessing the Application

Open the application using:

https://wojtek0126.github.io/Sound-Lab-with-healing/

A modern browser is recommended.

Using the Application
Open the application in your browser.
Explore the available sound-generation features.
Experiment with the available sound settings.
Use audio playback to listen to generated sounds.
Use recording functionality where available.
Switch between day and night themes using the theme switch.
Enjoy the golden-star visual design.
Browser Compatibility

Recommended browsers:

Google Chrome
Mozilla Firefox
Microsoft Edge
Safari

Some audio features may require user interaction before playback because of browser audio security policies.

3. Developer Notes
Technology

The application is distributed as a browser-based HTML project.

The current repository uses GitHub Pages for hosting.

Repository Structure

Expected project structure:

text
Sound-Lab-with-healing/
│
├── index.html
├── favicon.svg
├── README.md
├── LICENSE
└── .gitignore


Additional assets or source files may be added as the application develops.

Main Files
File	Purpose
index.html	Main application
favicon.svg	Golden healing-star browser icon
README.md	Project documentation
LICENSE	BSD 2-Clause license
.gitignore	Files excluded from Git
GitHub Pages Deployment

The project is hosted using GitHub Pages.

Deployment configuration:

Open repository Settings.
Select Pages.
Choose Deploy from a branch.
Select main.
Select / (root).
Save the configuration.

GitHub Pages automatically publishes changes committed to the selected branch.

Updating the Application
Edit the local application files.
Test changes in a browser.
Upload modified files to GitHub.
Commit changes with a descriptive message.
Wait for GitHub Pages deployment.
Verify the published application.
Developer Recommendations
Keep the main entry file named index.html.
Preserve the favicon reference when modifying the HTML.
Avoid committing private keys, credentials or personal information.
Keep the README updated when functionality changes.
Test audio features in multiple browsers.
Preserve responsive layout and accessibility.
Use descriptive Git commit messages.

4. UI and Design Guidelines

The visual identity of Sound Lab with Healing includes:

Golden healing-star details.
A clean and uncluttered interface.
Day and night visual modes.
Compact, left-aligned theme switching.
A custom golden-star favicon.
Consistent styling across desktop and mobile layouts.
Favicon

The project uses a custom healing-star icon instead of the browser's default globe icon.

Expected HTML reference:

HTML
<link rel="icon" type="image/svg+xml" href="favicon.svg">


The favicon file should remain in the repository root unless its path is updated.

5. QA Testing

The following test scenarios provide a simple manual testing checklist.

ID	Test scenario	Expected result
QA-01	Open application	Main interface loads
QA-02	Load application on refresh	Application loads without errors
QA-03	Switch to night mode	Night theme appears
QA-04	Switch to day mode	Day theme appears
QA-05	Inspect theme switch	Switch remains compact and left-aligned
QA-06	Inspect golden stars	Star details display correctly
QA-07	Generate sound	Sound generation works
QA-08	Play generated sound	Audio plays correctly
QA-09	Record audio	Recording functionality works
QA-10	Play WAV audio	WAV playback works
QA-11	Inspect browser tab	Golden healing-star favicon appears
QA-12	Test on mobile	Layout remains usable
QA-13	Refresh live website	Application remains accessible
QA-14	Inspect console	No unexpected critical errors
QA-15    Test minimum pitch slider    Expected: Maximum pitch automatically adjusts when minimum pitch exceeds it
QA-16    Test maximum pitch slider    Expected: Minimum pitch automatically adjusts when maximum pitch goes below it
QA-17    Inspect pitch value labels    Expected: Both displayed values update correctly
QA-18    Attempt to save original recording without recording anything    Expected: Download is prevented and an informative error message appears and replay/download controls remain hidden
QA-19    Attempt to save WAV without recording anything    Expected: Download is prevented and an informative error message appears
QA-20    Complete a valid recording Expected: Start Recording and Stop Recording buttons disappear
QA-20    Discard a completed recording Expected: Recording controls become visible again
QA-21    Attempt to save without a valid recording Expected: Download is prevented and an informative message appears 
QA-22    Click folded panel background Expected: Panel expands
QA-23    Click folded panel heading Expected: Panel expands
QA-24    Click + button Expected: Panel expands
QA-25    Click − button Expected: Panel collapses
QA-26    Click buttons inside expanded panel Expected: Normal button functionality preserved
QA-27    Operate sliders inside expanded panel Expected: Sliders work without collapsing panel
QA-28    Test accordion on all panels Expected: Consistent behaviour across sections
QA Execution Log

Use this template when testing a new release:

Test ID	Result	Notes
QA-01	Not tested	
QA-02	Not tested	
QA-03	Not tested	
QA-04	Not tested	
QA-05	Not tested	
QA-06	Not tested	
QA-07	Not tested	
QA-08	Not tested	
QA-09	Not tested	
QA-10	Not tested	
QA-11	Not tested	
QA-12	Not tested	
QA-13	Not tested	
QA-14	Not tested	

Note: These are proposed test scenarios, not a claim that every test has already passed.

6. Progress Log
Initial Development
Created the Sound Lab with Healing application.
Established the browser-based application structure.
Added sound-related functionality.
Developed the initial visual interface.
UI Improvements:
- Accordion and Panel Interaction Improvements
- Implemented expandable and collapsible interface panels.
- Enabled clicking anywhere on a folded panel to expand it.
- Preserved dedicated + and − controls.
- Restricted panel-background expansion to folded panels only.
- Prevented interactive elements from accidentally triggering accordion behaviour.
- Preserved normal operation of buttons, sliders, audio controls and other interactive elements.
- Improved usability and accessibility through updated ARIA attributes.
Pitch Control Improvements:
- Implemented synchronized minimum and maximum pitch sliders.
- Prevented minimum pitch from exceeding maximum pitch.
- Prevented maximum pitch from falling below minimum pitch.
- Added automatic adjustment of the opposite slider.
- Ensured pitch value labels update immediately.
- Introduced additional golden-star visual details.
- Improved the day/night theme switch.
- Reduced the theme switch width.
- Moved the theme switch towards the left side of the interface.
Branding:
- Selected the golden healing star as the application's visual symbol.
- Prepared a custom SVG favicon.
- Replaced the default browser globe icon with project branding.
GitHub Publication:
- Created the GitHub repository.
- Selected BSD 2-Clause licensing.
- Prepared index.html and favicon.svg.
- Uploaded the application to GitHub.
- Configured GitHub Pages.
- Successfully published the application online.
Documentation:
- Prepared project documentation.
- Added developer instructions.
- Defined manual QA scenarios.
- Established a progress tracking structure.
Recording Improvements:
- Introduced explicit hasRecording state tracking.
- Added minimum recording-data validation.
- Prevented empty recordings from displaying replay and download controls.
- Improved recording-state handling.
- Recording Interface Improvements
- Added a minimum recording-size validation using MIN_RECORDING_SIZE.
- Prevented saving original recordings when no valid recording exists.
- Automatically hides Start Recording and Stop Recording buttons after a successful recording.
- Restores recording controls when the user discards the current recording.
- Improved recording status messages to guide users through the recording process.
Code Refactoring – Phase 1
- Separated the original monolithic index.html into dedicated application files.
- Established a modular project structure.
- Populated the separated files with the corresponding application code.
- Used GitHub Copilot to assist with code migration.
- Deployed the refactored application to GitHub Pages.
- Successfully completed post-deployment smoke testing.
- Confirmed that the application remains functional after refactoring.

8. Future Improvements

Potential future development ideas:

Additional sound-generation presets.
More audio customization options.
Improved recording management.
Download and export enhancements.
Additional visual themes.
Improved mobile experience.
Expanded automated QA testing.
Accessibility improvements.
Recording Improvements (Planned)
Investigate empty recording detection.
Prevent downloading original recordings when no valid recording exists.
Improve consistency of error messages between recording download options.
Ensure recording controls correctly reflect recording availability.
These are proposed enhancements and are not necessarily implemented.

8. Known Issues and Planned Fixes

The following items have been identified for future maintenance and improvement.

ID	Area	Issue / Planned Improvement	Status
BUG-01	Prevent saving original recording without a valid recording.	Resolved
BUG-02	Recording	Improve the error message displayed when attempting to save a WAV file without an available recording. Use consistent wording across recording
actions.	Resolved
BUG-03 Recording Investigate why an apparently empty recording produces a non-empty Blob and triggers the download process. Resolved, is never empty, applied minimum allowed file size limit

Planned Behaviour

Save Original Recording should only be available when a valid recording exists.
Save as WAV should provide a clear and consistent message when no recording is available.
Recording-related actions should correctly reflect the current recording state.

Development Notes

These issues are documented for future maintenance. They should be addressed and manually tested before being marked as completed.

Update the status of each item as development progresses.

9. Version History
Version	Description
- 1.0.0	Initial public GitHub Pages release
- 1.1.0 Improved recording controls, recording validation, synchronized pitch controls and enhanced accordion panel interaction. Successful smoke testing.   

Update this section whenever a new release is published.

10. License

This project is distributed under the BSD 2-Clause License.

See the LICENSE file for the complete license text.

Copyright © 2026 wojtek0126.

11. Project Links
Live application: https://wojtek0126.github.io/Sound-Lab-with-healing/
GitHub repository: https://github.com/wojtek0126/Sound-Lab-with-healing
License: BSD 2-Clause

⭐ Sound Lab with Healing — Explore sound, create, experiment, and enjoy.

8. Development Roadmap — Version 1.2.0
The next development milestone focuses on improving application architecture, introducing multilingual support, and preparing Sound Lab with Healing for future user account functionality.

All features listed below are planned and should not be considered implemented until development and testing are completed.

8.1 Project Architecture Refactoring
Objective: Improve maintainability, readability and scalability by separating the existing application into dedicated files and modules.

Planned changes:

Separate the main HTML structure from CSS and JavaScript.
Move styling into dedicated CSS files.
Divide JavaScript functionality into logical modules.
Separate audio generation and recording functionality.
Introduce dedicated accordion and UI interaction modules.
Introduce dedicated form validation and authentication modules.
Centralise localisation functionality.
Preserve all existing application features during refactoring.
Proposed project structure:


text
Sound-Lab-with-healing/
│
├── index.html
├── login.html
├── signup.html
│
├── css/
│   ├── style.css
│   ├── auth.css
│   └── responsive.css
│
├── js/
│   ├── app.js
│   ├── audio.js
│   ├── recording.js
│   ├── accordion.js
│   ├── validation.js
│   ├── auth.js
│   └── localization.js
│
├── locales/
│   ├── en.json
│   └── pl.json
│
├── assets/
│   └── favicon.svg
│
├── README.md
├── LICENSE
└── .gitignore
The final structure may be adjusted during implementation.

8.2 Multilingual Support
Objective: Introduce Polish localisation while preserving the existing English interface.

Planned changes:

English remains the default language.
Add Polish language support.
Introduce a language selection control.
Centralise all interface translations.
Translate buttons, labels, descriptions and status messages.
Translate recording and audio-related feedback.
Translate form validation messages.
Ensure consistent language switching across application screens.
Initial supported languages:


Language	Status
English	Existing
Polish	Planned
Future languages may be added as the application develops.

8.3 Mock Login Screen
Objective: Introduce a dedicated login interface prepared for future backend integration.

Planned fields and functionality:

Email address.
Password.
Show/hide password control.
Remember me option.
Forgot password link placeholder.
Navigation to the signup screen.
Client-side input validation.
Inline validation messages.
Visual indicators for valid and invalid fields.
Mock form submission.
The login interface will initially simulate authentication without connecting to a real authentication service.

8.4 Mock Signup Screen
Objective: Introduce a dedicated registration interface with comprehensive client-side validation.

Planned fields and functionality:

Name.
Email address.
Password.
Confirm password.
Terms and conditions acceptance.
Password visibility control.
Password strength indicator.
Inline validation messages.
Visual indicators for valid and invalid fields.
Navigation to the login screen.
Mock form submission.
Validation Requirements

Field	Validation
Name	Required, reasonable length
Email	Valid email format
Password	Minimum length and complexity
Confirm password	Must match password
Terms acceptance	Must be accepted
Validation should provide clear feedback to users without unnecessary interruptions.

8.5 Form Validation Architecture
Objective: Create reusable validation functionality shared by login and signup forms.

Planned changes:

Centralise validation rules.
Separate validation logic from presentation.
Support validation on field blur.
Validate all fields on form submission.
Display contextual error messages.
Provide clear success indicators.
Support English and Polish validation messages.
Prevent submission when validation fails.
The validation module should be reusable when additional forms are introduced.

8.6 Future Backend Integration Preparation
Objective: Design login and signup forms so that a real authentication backend can be introduced without rebuilding the user interfaces.

Planned changes:

Separate form validation from authentication logic.
Introduce dedicated login and signup submission functions.
Define consistent form data structures.
Establish clear API integration points.
Handle future server responses and errors.
Prepare for secure authentication workflows.
Initial implementation will use mock submission functions.

No real user accounts or authentication services will be provided in this development milestone.

Passwords must not be stored in localStorage or exposed through console logs.

8.7 Quality Assurance and Testing
Objective: Maintain application stability while introducing architectural and functional changes.

Planned testing areas:


ID	Area	Test Objective
QA-25	Refactoring	Verify existing functionality after file separation
QA-26	Audio	Verify sound generation after refactoring
QA-27	Recording	Verify recording, playback and download
QA-28	Localisation	Verify English interface
QA-29	Localisation	Verify Polish interface
QA-30	Login	Validate required fields
QA-31	Login	Validate email and password
QA-32	Signup	Validate all required fields
QA-33	Signup	Verify password matching
QA-34	Signup	Verify password strength feedback
QA-35	Signup	Verify terms acceptance
QA-36	Forms	Verify submission is blocked when validation fails
QA-37	Navigation	Verify login/signup navigation
QA-38	Responsive UI	Test authentication screens on mobile
QA-39	Regression	Verify existing sound functionality remains operational
QA-40	Browser compatibility	Test supported browsers
Testing results will be documented after execution.

8.8 Development Milestones

Milestone	Description	Status
M1	Project architecture refactoring	Planned
M2	English and Polish localisation	Planned
M3	Login screen	Planned
M4	Signup screen	Planned
M5	Reusable form validation	Planned
M6	Mock authentication integration	Planned
M7	Regression and QA testing	Planned
M8	Version 1.2.0 release	Planned
8.9 Release Criteria
Version 1.2.0 should be considered ready for release when:

Existing sound-generation functionality remains operational.
Recording, replay and download functionality pass regression testing.
English and Polish interfaces are functional.
Login and signup screens are accessible.
Form validation works as expected.
Mock submissions provide appropriate feedback.
Navigation between application screens works correctly.
Responsive layouts are verified.
No critical defects remain.
A successful release should include updated documentation, QA execution results and GitHub release notes.

Roadmap status: Planned

Target version: 1.2.0

Project: Sound Lab with Healing

This roadmap is a living development document. Requirements and priorities may be adjusted as implementation progresses.
