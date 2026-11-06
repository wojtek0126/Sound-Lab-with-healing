# Documentation Index

Documentation is split into small, self-contained Markdown files so each can be migrated independently to a documentation, tracking or testing tool.

| Folder | File | Content | Suggested migration target |
| --- | --- | --- | --- |
| product | [overview.md](product/overview.md) | Features, user instructions, browser support | Confluence (product page) |
| development | [developer-guide.md](development/developer-guide.md) | Structure, local run, branches, recommendations | Confluence (engineering space) |
| design | [ui-design-guidelines.md](design/ui-design-guidelines.md) | Visual identity, dropdown and file-field rules | Confluence (design page) |
| ci-cd | [github-pages-deployment.md](ci-cd/github-pages-deployment.md) | Deployment, release checklist, pipeline candidates | CI/CD repository docs |
| qa | [test-cases.md](qa/test-cases.md) | Manual test cases QA-01 to QA-28 | Test-management tool |
| qa | [execution-log-template.md](qa/execution-log-template.md) | Test execution template | Test-management tool |
| qa | [1.2.0-test-plan.md](qa/1.2.0-test-plan.md) | Planned 1.2.0 test areas | Test-management tool |
| qa | [post-release-ui-qa-log.md](qa/post-release-ui-qa-log.md) | UI-01 to UI-05 issue log | Jira (bugs) |
| qa | [ui-ux-fix-plan.md](qa/ui-ux-fix-plan.md) | Remediation and verification plan | Jira / Confluence |
| qa | [copilot-ui-ux-fix-prompt.md](qa/copilot-ui-ux-fix-prompt.md) | Supervised implementation prompt | Reference only |
| backlog | [known-issues.md](backlog/known-issues.md) | BUG-01 to BUG-03, open items | Jira (bugs) |
| backlog | [future-improvements.md](backlog/future-improvements.md) | Unscheduled ideas | Jira (backlog) |
| roadmap | [1.2.0-roadmap.md](roadmap/1.2.0-roadmap.md) | Planned 1.2.0 features | Jira (epics) / Confluence |
| roadmap | [1.2.0-milestones-and-release-criteria.md](roadmap/1.2.0-milestones-and-release-criteria.md) | Milestones M1-M8, release criteria | Jira (versions) |
| releases | [version-history.md](releases/version-history.md) | Version table | Confluence / releases |
| releases | [release-notes-1.1.0.md](releases/release-notes-1.1.0.md) | 1.1.0 release notes and limitations | GitHub Releases |
| releases | [release-notes-1.2.0.md](releases/release-notes-1.2.0.md) | 1.2.0 changes (in progress) | GitHub Releases |
| releases | [1.1.0-post-release-fixes-report.md](releases/1.1.0-post-release-fixes-report.md) | UI-01 to UI-10 and Android-01 to Android-05 results | Jira / Confluence |
| releases | [progress-log.md](releases/progress-log.md) | Historical development log | Confluence |

There is no automation content yet; the CI/CD document lists candidate pipeline stages only.
