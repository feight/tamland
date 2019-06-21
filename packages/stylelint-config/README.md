# @tamland/stylelint-config

[![License](https://img.shields.io/npm/l/@tamland/stylelint-config.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/stylelint-config/latest.svg)](https://www.npmjs.com/package/@tamland/stylelint-config)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/stylelint-config.svg)](https://www.npmjs.com/package/@tamland/stylelint-config)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fstylelint-config)](https://david-dm.org/feight/tamland?path=packages/stylelint-config)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fstylelint-config)](https://david-dm.org/feight/tamland?type=dev&path=packages/stylelint-config)

This package provides a shared config for stylelint and several of its plugins.

## Usage

A single stylelint configuration is exported.

Our default export contains all of our stylelint rules. It requires the following peer dependencies:

```
    stylelint
    stylelint-order
    stylelint-scss
```

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @tamland/stylelint-config
  ```

2. Install the shared configuration peer dependencies (npm 5+):

  ```sh
  npx install-peerdeps --dev @tamland/stylelint-config
  ```

3. Add `"extends": "@tamland/stylelint-config"` to your .stylelintrc.

## Maintenance

You can run tests with `npm test`.
