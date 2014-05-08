var ModuleTestClone = (function(global) {

var test = new Test("Clone", {
        disable:    false,
        browser:    true,
        worker:     true,
        node:       true,
        button:     true,
        both:       true,
    }).add([
        testLiteral,
        testObject,
        testSparseArray,
    ]);


if (typeof document !== "undefined") { // for Browser
    test.add([
        testNode,
        testNamedNodeMap,
        testCSSStyleDeclaration,
    ]);
}

return test.run().clone();

function testLiteral(next) {

    if (Clone(1)        === 1       &&
        Clone(null)     === null    &&
        Clone("a")      === "a"     &&
        Clone(false)    === false) {

        next && next.pass();
        return;
    }
    next && next.miss();
}

function testObject(next) {
    var object = {
            key: "value",
            child: {
                key: "value"
            }
        };
    var date = new Date();
    var fn = function() { return true; };
    var array = [1, 2, 3];
    var error = new Error("hello");

    if (Clone(object).child.key === "value" &&
        Clone(date).getTime() === date.getTime() &&
        Clone(fn)() === true &&
        Clone(array).join(",") === "1,2,3" &&
        Clone(error).message === "hello") {

        next && next.pass();
        return;
    }
    next && next.miss();
}

function testSparseArray(next) {
    var sparseArray = [0, 1, 2, 3];

    delete sparseArray[1]; // [0, undefined, 2, 3];

    sparseArray.length = 100;

    var clonedArray = Clone(sparseArray);

    if (sparseArray[0] === clonedArray[0] &&
        sparseArray[1] === clonedArray[1] &&
        sparseArray[2] === clonedArray[2] &&
        sparseArray[3] === clonedArray[3]) {

        next && next.pass();
        return;
    }
    next && next.miss();
}

function testNode(next) {
    var node1 = document.createElement("div");
    var node2 = document.createElement("div");
    var textNode = document.createTextNode("hello");

    node1.appendChild(node2);
    node2.appendChild(textNode);

    var clonedNodeTree = Clone(node1);
    var treeImage = clonedNodeTree.outerHTML;

    if (clonedNodeTree.nodeName === "DIV" &&
        clonedNodeTree.children[0].nodeName === "DIV" &&
        treeImage === "<div><div>hello</div></div>") {

        next && next.pass();
        return;
    }
    next && next.miss();
}

function testNamedNodeMap(next) {
    var node = document.createElement("div");

    node.setAttribute("id", "id123");
    node.setAttribute("class", "class123");

    var attr = Clone( node.attributes );

    if (node.getAttribute("id") === attr["id"] &&
        node.getAttribute("class") === attr["class"]) {

        next && next.pass();
        return;
    }
    next && next.miss();
}

function testCSSStyleDeclaration(next) {
    var result = true;
    var style = window.getComputedStyle(document.body);
    var clonedStyle = Clone(style);

    for (var i = 0, iz = style.length; i < iz; ++i) {
        var key = style.item(i);
        var value = style[key];
        if (value && typeof value === "string") { // value only (skip methods)
            if (key in clonedStyle) {
                if (clonedStyle[key] === value) {
                    continue;
                }

            }
        }
        result = false;
        break;
    }
    if (result) {
        next && next.pass();
        return;
    }
    next && next.miss();
}

})((this || 0).self || global);

