# GitHub Activity

GitHub Activity adds a Rift sidebar panel for comments and mentions on pull requests and issues you authored.

![GitHub Activity in Rift](docs/screenshot.png)

## Use

The feed uses the account already authenticated in the GitHub CLI. It keeps only incoming comments and mentions on resources authored by that account, then presents one searchable, filterable, and sortable table with separate resource and activity icons, repository, title, actor, and recency.

Rift hosts the page beside its native Browser and Terminal tools. Each row remains a normal GitHub link, so standard link behavior and modifiers are preserved.

## Install

From this repository:

```bash
npm ci
rift plugin install "path:$PWD/plugins/github-notifications" --yes
```

The plugin needs an authenticated GitHub CLI session:

```bash
gh auth status
```

## Develop

Run the focused package check from the repository root:

```bash
npm run check --workspace=rift-plugin-github-notifications
```
