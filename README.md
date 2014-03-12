Clone.js
=========

Structured clone implement.

# Document

https://github.com/uupaa/Clone.js/wiki/Clone

# How to use

```js
<script src="lib/Clone.js">
<script>
// for Browser
console.log( Clone({ a: 1 }) );
</script>
```

```js
// for WebWorkers
importScripts("lib/Clone.js");
console.log( Clone({ a: 1 }) );
```

```js
// for Node.js
var Clone = require("lib/Clone.js");
console.log( Clone({ a: 1 }) );
```

# for Developers

1. Install development dependency tools

    ```sh
    $ brew install closure-compiler
    $ brew install node
    $ npm install -g plato
    ```

2. Clone Repository and Install

    ```sh
    $ git clone git@github.com:uupaa/Clone.js.git
    $ cd Clone.js
    $ npm install
    ```

3. Build and Minify

    `$ npm run build`

4. Test

    `$ npm run test`

5. Lint

    `$ npm run lint`

