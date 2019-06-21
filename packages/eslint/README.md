# @tamland/eslint

[![License](https://img.shields.io/npm/l/@tamland/eslint.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/eslint/latest.svg)](https://www.npmjs.com/package/@tamland/eslint)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/eslint.svg)](https://www.npmjs.com/package/@tamland/eslint)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Feslint)](https://david-dm.org/feight/tamland?path=packages/eslint)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Feslint)](https://david-dm.org/feight/tamland?type=dev&path=packages/eslint)

This package provides a set of dependencies that can be used to run eslint with @tamland/eslint-config without having to do the manual peer dependency install step required if you
install @tamland/eslint-config directly.

## Usage

### Installation

1. Install the package:

  ```sh
  npm install --save-dev @tamland/eslint
  ```
2. Add `"extends": "@tamland"` to your .eslintrc.
