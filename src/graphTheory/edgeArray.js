var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
var DirectedEdge = require('./directedEdge');

class EdgeArray extends Array {
    // constructor() {
    // super();
    // this.nodes = new NodeArray();
    // }
    contains(argEdge) {
        return this.some(el => (el.isEquivalent(argEdge) === true));
    }
    isEdge(argEdge) {
        return argEdge instanceof Edge;
    }
    push(argEdge) {
        return (this.isEdge(argEdge) && !(this.contains(argEdge))) ? super.push(argEdge) : false;
    }
    getNodes() {
        return this.reduce((nArray, e) => {
            nArray.push(e.nodes);
            return nArray;
        }, new NodeArray());
    }
    //
    // methods
}
module.exports = EdgeArray;