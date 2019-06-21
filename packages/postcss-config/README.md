# @tamland/postcss-config

[![License](https://img.shields.io/npm/l/@tamland/postcss-config.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/postcss-config/latest.svg)](https://www.npmjs.com/package/@tamland/postcss-config)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/postcss-config.svg)](https://www.npmjs.com/package/@tamland/postcss-config)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fpostcss-config)](https://david-dm.org/feight/tamland?path=packages/postcss-config)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fpostcss-config)](https://david-dm.org/feight/tamland?type=dev&path=packages/postcss-config)

This package provides a shared config for postcss and several of its plugins.

## Usage

A single postcss configuration is exported.

Our default export contains all of our postcss plugins.

### Installation

1. Install the shared configuration:

  ```sh
  npm install --save-dev @tamland/postcss-config
  ```

2. Add to your postcss.config.js.
  ```js
  const config = require("@tamland/postcss-config");

  module.exports = config;
  ```

## Maintenance

You can run tests with `npm test`.
