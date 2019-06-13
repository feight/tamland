# @tamland/postcss-config

[![npm version](https://badge.fury.io/js/%40tamland%2Fpostcss-config.svg)](https://badge.fury.io/js/%40tamland%2Fpostcss-config)

This package provides a shared config for postcss and several of its plugins.

## Usage

A single postcss configuration is exported.

Our default export contains all of our postcss plugins.

### Installation

1. Install the shared configuration:

  ```sh
  yarn add --dev @tamland/postcss-config
  ```

2. Add to your postcss.config.js.
  ```js
  const config = require("@tamland/postcss-config");

  module.exports = config;
  ```

## Maintenance

You can run tests with `npm test`.
