// @name: Clone.js

(function(global) {

// --- define ----------------------------------------------
// --- variable --------------------------------------------
// --- interface -------------------------------------------
function Clone(source, // @arg Any: source object.
               depth,  // @arg Integer(= 0): max depth, 0 is infinity.
               hook) { // @arg Function(= null): handle the unknown object.
                       // @ret Any: copied object.
                       // @throw: TypeError("DataCloneError: ...")
                       // @help: Clone
                       // @desc: Object with the reference -> deep copy
                       //        Object without the reference -> shallow copy
                       //        do not look prototype chain.
    _if(depth && typeof depth !== "number", "invalid Clone(,depth,)");
    _if(hook && typeof hook !== "function", "invalid Clone(,,hook)");

    return _recursiveClone(source, depth || 0, hook, 0);
}

// --- implement -------------------------------------------
function _recursiveClone(source, // @arg Any: source object.
                         depth,  // @arg Integer: max depth, 0 is infinity.
                         hook,   // @arg Function: handle the unknown object.
                         nest) { // @arg Integer: current nest count.
                                 // @desc: recursive clone.
    if (depth && nest > depth) {
        throw new TypeError("DataCloneError: " + source);
    }

    if (source === null ||       // shorthand: source == null
        source === undefined) {
        return source;
    }

    var rv, key, keys, i = 0, iz;

    switch (source.constructor.name) { // detect [[Class]]
    case "Function":
        return source; // does not clone
    case "String":
    case "Number":
    case "Boolean":
        return source.valueOf();
    case "RegExp":
        return RegExp(source.source, (source + "").slice(source.source.length + 2));
    case "Date":
        return new Date(+source);
    case "Array":
        rv = [];
        rv.length = source.length;
        for (iz = source.length; i < iz; ++i) {
            if (i in source) {
                rv[i] = _recursiveClone(source[i], depth, hook, nest + 1);
            }
        }
        return rv;
    case "Object":
        keys = Object.keys(source);
        for (rv = {}, iz = keys.length; i < iz; ++i) {
            key = keys[i];
            rv[key] = _recursiveClone(source[key], depth, hook, nest + 1);
        }
        return rv;
    case "File":
    case "Blob":
    case "FileList":
    case "ImageData":
    case "CanvasPixelArray":
    case "ImageBitmap":
        // TODO: impl
        break;
    }
    if (source instanceof Error) {
        return new source.constructor(source.message);
    }
    // --- Node, Attr, Style, HostObjects ---
    if (source.nodeType) { // Node
        return source.cloneNode(true);
    }
    if (source instanceof NamedNodeMap) { // NodeAttribute -> {}
        return _convertNodeAttributeToObject(source);
    }
    if (source instanceof CSSStyleDeclaration) { // CSSStyleDeclaration -> {}
        return _convertCSSStyleDeclarationToObject(source);
    }
    // --- convert ArrayLike(Arguments, NodeList, HTMLCollection) to Object ---
    if ("length" in source && typeof source.item === "function") {
        for (rv = [], iz = source.length; i < iz; ++i) {
            rv[i] = _recursiveClone(source[i], depth, hook, nest + 1);
        }
        return rv;
    }
    if (hook) { // hook unknown type
        return hook(source, depth, hook, nest);
    }
    return source;
}

function _convertNodeAttributeToObject(source) { // @arg Attr: NamedNodeMap
                                                 // @ret Object:
                                                 // @desc: NodeAttribute normalization.
    var rv = {}, i = 0, attr;

    for (; attr = source[i++]; ) {
        rv[attr.name] = attr.value;
    }
    return rv;
}

function _convertCSSStyleDeclarationToObject(source) { // @arg Style: CSSStyleDeclaration
                                                       // @ret Object:
                                                       // @desc: CSSStyleDeclaration normalization.
    var rv = {}, key, value, i = 0, iz = source.length;

    for (; i < iz; ++i) {
        key = source.item(i);
        value = source[key];
        if (value && typeof value === "string") { // value only (skip methods)
            rv[key] = value;
        }
    }
    return rv;
}

//{@assert
function _if(booleanValue, errorMessageString) {
    if (booleanValue) {
        throw new Error(errorMessageString);
    }
}
//}@assert

// --- export ----------------------------------------------
if (global.process) { // node.js
    module.exports = Clone;
}
global.Clone = Clone;

})(this.self || global);

