var Node = require('./node');

class NodeArray extends Array {

    contains(argNode) {
        return this.some(el => (el.isIdentical(argNode) === true));
    }
    isNode(argNode) {
        return argNode instanceof Node;
    }
    push(argNode) {
        return (this.isNode(argNode) && !(this.contains(argNode))) ? super.push(argNode) : false;
    }
    intersection(altArray) {
        return this.filter(currNode => altArray.contains(currNode) === true);
    }
}

module.exports = NodeArray;