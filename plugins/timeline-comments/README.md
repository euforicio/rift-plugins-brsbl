# Timeline Comments

Timeline Comments keeps review notes attached to the exact part of a rift conversation they refer to.

## Screenshots

Select message text to add a comment without leaving the timeline.

![Comment action in the floating text-selection menu](docs/selection-action.png)

Comments stay attached through an underline and a compact nearest-gutter thread.

![An anchored comment pill with comment actions and its reply composer](docs/screenshot.png)

Send an open comment to the agent by copying it into rift's composer for review before submission.

![An open comment copied into rift's composer](docs/send-to-agent.png)

Open the thread-scoped Comments List to review open, resolved, or all feedback together.

![Comments List showing an open timeline comment](docs/comments-panel.png)

## Use

- Adds **Comment** to the floating menu when you select agent message text.
- Opens the thread-scoped Comments panel from any user or agent message action bar.
- Keeps open comment threads visible through a quiet underline and the nearest gutter marker.
- Provides replies, inline editing, deletion, resolve/reopen controls, and a thread-scoped Comments panel.
- Adds every open comment to the current thread's draft without submitting it.
- Gives agents a bundled workflow for reading, addressing, replying to, and resolving review comments.

Comments are stored in plugin-owned SQLite on the rift server. Missing or ambiguous source text remains manageable as **Unanchored** and is never attached to a guess.

Agents can manage the same threads from the current rift thread context:

```bash
rift comments list --state open --json
rift comments get <comment-thread-id> --json
rift comments reply <comment-thread-id> --body "Fixed and verified."
rift comments resolve <comment-thread-id>
```

Use `rift comments reopen <comment-thread-id>` when later evidence invalidates a resolution.

## Install

```bash
rift plugin install "path:$PWD/plugins/timeline-comments" --yes
```

Timeline Comments requires rift 0.0.34 or newer and the 0.4 plugin SDK.

## Develop

From the repository root:

```bash
npm ci
npm run check --workspace=rift-plugin-timeline-comments
npm run test:browser --workspace=rift-plugin-timeline-comments
rift plugin install "path:$PWD/plugins/timeline-comments" --yes
```
