var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./directedEdge');
var EdgeArray = require('./edgeArray');

class EdgeComponent {
    constructor(e1) {
        this.edges = new EdgeArray(e1);
        this.nodes = this.getNodes();
        this.resetArity();

    }
    resetArity() {
        this.arity = this.nodes.length;
    }
    updateNodes() {
        this.nodes = this.getNodes();

    }
    containsEdge(edgeArg) {
        return this.edges.contains(edgeArg);
    }
    addEdge(edgeArg) {
        this.edges.push(edgeArg);
        this.updateNodes();
    }
    nodeMap() {
        return this.edges.map(currEdge => currEdge.nodes);
    }
    getNodes() {
        return this.edges.getNodes();
    }
}
module.exports = EdgeComponent;