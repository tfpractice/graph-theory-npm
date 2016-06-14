var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./directedEdge');
var EdgeArray = require('./edgeArray');

class EdgeComponent {
    constructor(e1) {
        this.edges = new EdgeArray(e1);
        this.arity = this.edges.length;
    }
    resetArity() {
        this.arity = this.edges.length;
    }
    containsEdge(edgeArg) {
        return this.edges.contains(edgeArg);
    }
    addEdge(edgeArg) {
        this.edges.push(edgeArg);
    }
    nodeMap() {
        return this.edges.map(currEdge => currEdge.nodes);
    }
    getNodes() {
        return this.edges.getNodes();
    }
}
module.exports = EdgeComponent;