var Node = require('./node');

class NodeArray extends Array {
    // constructor(args) {
    // 	// code
    // }
    contains(node) {
        return this.some(el => (el.isIdentical(node) === true));
        // methods
    }
    isNode(nodeArg) {
        return nodeArg instanceof Node;
    }
}

module.exports = NodeArray;