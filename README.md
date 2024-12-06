## figma plugin developer

[开发文档](https://www.figma.com/plugin-docs/api/PageNode/#loadasync)

Ref:

- https://www.figma.com/plugin-docs/
- https://github.com/nirsky/figma-plugin-react-template

## 调试快捷键 command + option + i

## Quickstart

- Run `yarn` to install dependencies.
- Run `yarn build:watch` to start webpack in watch mode.
- Open `Figma` -> `Plugins` -> `Development` -> `Import plugin from manifest...` and choose `manifest.json` file from this repo.

⭐ To change the UI of your plugin (the react code), start editing [App.tsx](./src/app/components/App.tsx).  
⭐ To interact with the Figma API edit [controller.ts](./src/plugin/controller.ts).  
⭐ Read more on the [Figma API Overview](https://www.figma.com/plugin-docs/api/api-overview/).
