# @tamland/imagemin

[![License](https://img.shields.io/npm/l/@tamland/imagemin.svg)](https://github.com/feight/tamland/blob/master/LICENSE)
[![npm package](https://img.shields.io/npm/v/@tamland/imagemin/latest.svg)](https://www.npmjs.com/package/@tamland/imagemin)
[![npm downloads](https://img.shields.io/npm/dm/@tamland/imagemin.svg)](https://www.npmjs.com/package/@tamland/imagemin)
[![Dependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fimagemin)](https://david-dm.org/feight/tamland?path=packages/imagemin)
[![DevDependencies](https://img.shields.io/david/feight/tamland.svg?path=packages%2Fimagemin)](https://david-dm.org/feight/tamland?type=dev&path=packages/imagemin)

This package provides a shared config for imagemin and several of its plugins.

## Install

```
$ npm install imagemin
```
## Usage

```js
import imagemin from "@tamland/imagemin";

(async () => {

  const files = await imagemin(['images/*.{jpg,png}'], 'build/images');

  console.log(files);
  //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]

})();
```

## API

### imagemin(input, [output], [options])

Returns `Promise<Object[]>` in the format `{data: Buffer, path: string}`.

#### input

Type: `string[]`

Files to be optimized. See supported `minimatch` [patterns](https://github.com/isaacs/minimatch#usage).

#### output

Type: `string`

## Maintenance

You can run tests with `npm test`.
