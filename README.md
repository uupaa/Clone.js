=========
Clone.js
=========

![](https://travis-ci.org/uupaa/Clone.js.png)

Structured clone implement.

# Document

- [WebModule](https://github.com/uupaa/WebModule) ([Slide](http://uupaa.github.io/Slide/slide/WebModule/index.html))
- [Development](https://github.com/uupaa/WebModule/wiki/Development)
- [Clone.js wiki](https://github.com/uupaa/Clone.js/wiki/Clone)


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

