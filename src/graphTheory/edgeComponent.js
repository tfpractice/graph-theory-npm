var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./directedEdge');
var EdgeArray = require('./edgeArray');

class EdgeComponent {
    constructor() {
        this.edges = new EdgeArray();
        this.nodes = new NodeArray();
        this.arity = 0;

    }
    resetArity() {
        this.arity = this.nodes.length;
    }
    getNodes() {
        return this.edges.getNodes();
    }
    updateNodes() {
        this.nodes = this.getNodes();
        this.resetArity();

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
    intersects(compArg) {
        return this.edges.intersects(compArg.edges);
    }
    intersection(compArg) {
        return this.nodes.intersection(compArg.nodes);
    }
    difference(compArg) {
        return this.nodes.difference(compArg.nodes);
    }
    union(compArg) {
        return this.edges.union(compArg.edges);
    }
    unionize(compArg) {
        this.edges.unionize(compArg.edges);
    }

}
module.exports = EdgeComponent;