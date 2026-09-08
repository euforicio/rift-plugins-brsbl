# Open in Moss

Makes local Markdown links in rift open directly in Moss.

![A Markdown file link from rift open in Moss](docs/screenshot.png)

## Install

```sh
rift plugin install "path:$PWD/plugins/open-in-moss" --yes
```

## Use

Click any local `.md` or `.markdown` link in rift. It opens in Moss instead of
rift's file viewer.

Right-click still uses rift's normal menu. If Moss or the local file is
unavailable, rift opens its own viewer and shows a notice.

## Develop

```sh
npm install
npm run check --workspace=rift-plugin-open-in-moss
```
