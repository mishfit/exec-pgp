# exec-pgp
==========

executes gpg decrypt and returns (promisified) output as part of an object

-----------------------

[![NPM][npm-badge-img]][npm-badge-link]
[![Build Status](https://travis-ci.org/mishfit/exec-pgp.svg?branch=master)](https://travis-ci.org/mishfit/exec-pgp)
[![Coverage Status](https://coveralls.io/repos/github/mishfit/exec-pgp/badge.svg?branch=master)](https://coveralls.io/github/mishfit/exec-pgp?branch=master)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![devDependencies Status](https://david-dm.org/mishfit/exec-pgp/dev-status.svg)](https://david-dm.org/mishfit/exec-pgp?type=dev)
[![GitHub issues](https://img.shields.io/github/issues/mishfit/exec-pgp.svg)](https://github.com/mishfit/exec-pgp/issues)

-----------------------

## Examples
```js
const { decrypt } = require('exec-pgp')
```

### As a promise
```js
decrypt('<path-to-file>')
  .then(result => {
    console.log(`result.output`)
  })
  .catch(e => {
    console.error(e)
  })
```

### As a callback function
```js
decrypt('<path-to-file>', (e, result) => {
  if (e) {
    console.error(e)
  } else {
    console.log(`result.output`)
  }
})
```

### License
MIT


[npm-badge-img]: https://img.shields.io/npm/v/exec-pgp.svg
[npm-badge-link]: https://www.npmjs.com/package/exec-pgp
