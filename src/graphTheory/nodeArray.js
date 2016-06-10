class NodeArray extends Array {
    // constructor(args) {
    // 	// code
    // }
    contains(node) {
        return this.some(el => (el.isIdentical(node) === true));
        // methods
    }
}

module.exports = NodeArray;