var Node = require('./node');
var Edge = require('./edge');
var DirectedEdge = require('./directedEdge');
class EdgeArray extends Array {

    contains(argEdge) {
        return this.some(el => (el.isEquivalent(argEdge) === true));
    }
    isEdge(argEdge) {
        return argEdge instanceof Node;
    }
    push(argEdge) {
        return (this.isEdge(argEdge) && !(this.contains(argEdge))) ? super.push(argEdge) : false;
    }

    // methods
}
module.exports = EdgeArray;