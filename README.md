# Rift plugins

Rift Labs maintains this fork of [Bersabel Tadesse’s plugin collection](https://github.com/brsbl/bb-plugins) for Rift. Original plugin authorship, attribution, and licensing are preserved. [![CI](https://github.com/euforicio/rift-plugins-brsbl/actions/workflows/ci.yml/badge.svg)](https://github.com/euforicio/rift-plugins-brsbl/actions/workflows/ci.yml)

[Rift](https://riftlabs.app) is an agentic IDE for running coding agents across projects, threads, and environments. Its plugins can add UI, commands, skills, and server capabilities; this repository is where I build and maintain mine.

## Plugins

Each plugin has its own workspace under `plugins/` and a short README with the story behind it. Run the local install commands below from a checkout of this fork after `npm ci`.

### Design Doctrine

Turns recurring product-design feedback into a searchable rule library that agents can apply while designing, building, and critiquing. Its maintenance workflow keeps the rules grounded in real review evidence.

![Design Doctrine's searchable rule library open in rift](plugins/design-doctrine/docs/screenshot.png)

[Source](plugins/design-doctrine) · [README](plugins/design-doctrine/README.md)

Install: `rift plugin install "path:$PWD/plugins/design-doctrine" --yes`

### GitHub Activity

Brings incoming comments and mentions from GitHub pull requests and issues you authored into one searchable, filterable triage view, with open and resolved activity kept together.

![GitHub Activity showing searchable filters and incoming pull-request and issue activity](plugins/github-notifications/docs/screenshot.png)

[Source](plugins/github-notifications) · [README](plugins/github-notifications/README.md)

Install: `rift plugin install "path:$PWD/plugins/github-notifications" --yes`

### Prompt Improver

Rewrites a rough rift composer draft into a clearer, context-complete prompt for review before you send it. The rewrite can be cancelled or undone without leaving the composer.

![Prompt Improver working on a composer draft](plugins/improve-prompt/docs/screenshot-running.png)

![Prompt Improver returning the revised draft for review](plugins/improve-prompt/docs/screenshot-result.png)

[Source](plugins/improve-prompt) · [README](plugins/improve-prompt/README.md)

Install: `rift plugin install "path:$PWD/plugins/improve-prompt" --yes`

### Thread Hover Cards

Shows a thread's live status, latest agent update, execution context, repository, and pull request without leaving the sidebar. Collapsed sections get a compact summary of their thread count and attention state.

![A thread hover card showing live worker and repository context](plugins/thread-hover-cards/docs/screenshot.png)

![A collapsed section hover card summarizing its scope, activity, and attention state](plugins/thread-hover-cards/docs/screenshot-section.png)

[Source](plugins/thread-hover-cards) · [README](plugins/thread-hover-cards/README.md)

Install: `rift plugin install "path:$PWD/plugins/thread-hover-cards" --yes`

### Thread Organizer

Organizes work into configurable workflow sections and keeps unread idle threads in Inbox until work resumes or you explicitly clear them.

![Thread Organizer showing the current development-phase sections in rift's sidebar](plugins/thread-organizer/docs/screenshot.png)

[Source](plugins/thread-organizer) · [README](plugins/thread-organizer/README.md)

Install: `rift plugin install "path:$PWD/plugins/thread-organizer" --yes`

### Mesh Gradient

Creates, edits, saves, and shares reusable mesh gradients from a visual studio beside a thread. Users can hand an exact saved gradient to the current agent, while agents can generate gradients, inspect the shared library, and apply saved designs through the same plugin.

![Mesh Gradient's visual editor open beside a rift thread](plugins/mesh-gradient/docs/screenshot.png)

[Source](plugins/mesh-gradient) · [README](plugins/mesh-gradient/README.md)

Install: `rift plugin install "path:$PWD/plugins/mesh-gradient" --yes`

### Endless

Frank Ocean's *Endless* as a rift palette — achromatic, grained, squared. Ten years to the day.

![The Endless palette in rift](plugins/endless/docs/screenshot.png)

[Source](plugins/endless) · [README](plugins/endless/README.md)

Install: `rift plugin install "path:$PWD/plugins/endless" --yes`

### Theme Preview

A skeleton of the rift app in every configuration — sidebar, splits, panels, overlays, real thread timelines and controls — drawn from the active theme's tokens, so a palette can be judged before it ships.

![Theme Preview in rift](plugins/theme-preview/docs/screenshot.png)

[Source](plugins/theme-preview) · [README](plugins/theme-preview/README.md)

Install: `rift plugin install "path:$PWD/plugins/theme-preview" --yes`

### Color Swatches

Renders an inline swatch beside every color literal in a thread — hex, `rgb()`, `hsl()`, `oklch()` and friends — the way an editor decorates code.

![Color Swatches in rift](plugins/color-swatches/docs/screenshot.png)

[Source](plugins/color-swatches) · [README](plugins/color-swatches/README.md)

Install: `rift plugin install "path:$PWD/plugins/color-swatches" --yes`

### Open in Moss

Makes local Markdown links in rift open directly in Moss, with rift's viewer kept as the fallback.

![A Markdown file link from rift open in Moss](plugins/open-in-moss/docs/screenshot.png)

[Source](plugins/open-in-moss) · [README](plugins/open-in-moss/README.md)

Install: `rift plugin install "path:$PWD/plugins/open-in-moss" --yes`

### @Plugin

Adds installed and Community plugins to rift's existing `@` menu without installing or invoking them.

![Plugin mentions in rift](plugins/at-plugin/docs/screenshot.png)

[Source](plugins/at-plugin) · [README](plugins/at-plugin/README.md)

Install: `rift plugin install "path:$PWD/plugins/at-plugin" --yes`

### Timeline Comments

Attaches durable discussion threads to selected timeline text. Users and agents can reply, edit, resolve or reopen comments, review them together, and add open feedback to the composer for follow-up.

![Timeline Comments adding a comment from rift's text-selection menu](plugins/timeline-comments/docs/selection-action.png)

![An anchored Timeline Comments pill with comment actions and its reply composer](plugins/timeline-comments/docs/screenshot.png)

![Timeline Comments copying an open comment into rift's composer for agent follow-up](plugins/timeline-comments/docs/send-to-agent.png)

![Timeline Comments List showing an open comment in rift's right panel](plugins/timeline-comments/docs/comments-panel.png)

[Source](plugins/timeline-comments) · [README](plugins/timeline-comments/README.md)

Install: `rift plugin install "path:$PWD/plugins/timeline-comments" --yes`

The `plugins/` subdirectories contain the maintained sources. Install-ref publication is disabled in this fork; use a catalog entry pinned to the fork commit and the plugin subdirectory, or install a local plugin path.

## Develop

The root tooling handles the unglamorous shared work: finding plugin workspaces, building them, checking the repository, validating artifacts, and publishing install refs. Runtime code, tests, SDK declarations, and UI stay with the plugin that owns them.

```bash
npm ci
npm run check
npm run new:plugin -- --slug example --name "Example" --description "Adds an example capability."
```

To work on one plugin, install its workspace directly: `rift plugin install "path:$PWD/plugins/<slug>" --yes`.

See [contributor guidance](CONTRIBUTING.md), the [plugin catalog entry template](tooling/plugin-catalog-entry.md), and [repository tooling](tooling/README.md).
