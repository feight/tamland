# @tamland/webpack-config

[![License](https://img.shields.io/npm/l/@tamland/webpack-config.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/webpack-config/latest.svg)](https://www.npmjs.com/package/@tamland/webpack-config)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/webpack-config.svg)](https://www.npmjs.com/package/@tamland/webpack-config)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fwebpack-config)](https://david-dm.org/feight/tamland?path=packages/webpack-config)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fwebpack-config)](https://david-dm.org/feight/tamland?type=dev&path=packages/webpack-config)

This package provides a preset for babel.

## Usage

A single babel preset is exported.

Our default export contains all of our babel plugins and presets. It requires the following peer dependencies:

```
    @babel/core
```

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @tamland/babel-preset
  ```

2. Install the shared configuration peer dependencies (npm 5+):

  ```sh
  npx install-peerdeps --dev @tamland/babel-preset
  ```

3. Add `"@tamland/babel-preset"` or your `"presets"` array in to your .babelrc.

## Configuration

### targets

#### `string | Array<string> | { [string]: string }, defaults to {}.`

Describes the environments you support/target for your project.

This can either be a browserslist-compatible query:

```
{
  "targets": "> 0.25%, not dead"
}
```

Or an object of minimum environment versions to support:

```
{
  "targets": {
    "chrome": "58",
    "ie": "11"
  }
}
```

Example environments: chrome, opera, edge, firefox, safari, ie, ios, android, node, electron.

Sidenote, this uses @babel/preset-env under the hood, so if no targets are specified it will transform all ECMAScript 2015+ code by default.


### addModuleExports

#### `boolean, defaults to false.`

Enables the export default module.exports that was turned off in Babel 6.


### debug

#### `boolean, defaults to false.`

Outputs the targets/plugins used and the version specified in plugin data version to console.log.


### development

#### `boolean, defaults to false.`

Toggles plugins that aid in development, such as @babel/plugin-transform-react-jsx-self and
@babel/plugin-transform-react-jsx-source.


## Maintenance

You can run tests with `npm test`.
