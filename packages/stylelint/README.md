# @tamland/stylelint

[![License](https://img.shields.io/npm/l/@tamland/stylelint.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/stylelint/latest.svg)](https://www.npmjs.com/package/@tamland/stylelint)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/stylelint.svg)](https://www.npmjs.com/package/@tamland/stylelint)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fstylelint)](https://david-dm.org/feight/tamland?path=packages/stylelint)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fstylelint)](https://david-dm.org/feight/tamland?type=dev&path=packages/stylelint)

This package provides a set of dependencies that can be used to run stylelint with @tamland/stylelint-config without having to do the manual peer dependency install step required if you
install @tamland/stylelint-config directly.

## Usage

### Installation

1. Install the package:

  ```sh
  npm install --save-dev @tamland/stylelint
  ```
2. Add `"extends": "@tamland/stylelint"` to your .stylelintrc.
