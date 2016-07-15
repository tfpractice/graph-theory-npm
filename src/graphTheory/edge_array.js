var Node = require('./node');
var NodeArray = require('./node_array');
var Edge = require('./edge');
// var DirectedEdge = require('./directedEdge');
var RobustArray = require('./robust_array');
/**
 * represents a set of Edges
 * @exports EdgeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class EdgeArray extends RobustArray.SetifyType(Edge) {
    static assignEdge(EClass = Edge) {
        this.prototype.Edge = EClass;
        this.prototype.NodeArray = EClass.prototype.NodeArray;
        this.prototype.Node = EClass.prototype.Node;
    }
    edgesWithNode(nArg) {
        return this.filter(e => e.containsNode(nArg));
    }
    edgeByNodes(n1, n2) {
        return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
    }
    edgesByArray(nArr) {
        return nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
    }
    getNodes() {
        return this.nodeMap().reduce((pred, succ) => pred.unionize(succ), this.xNodes());
    }
    getNeighbors(nArg) {
        let sharedEdges = this.edgesWithNode(nArg);
        return (!sharedEdges.isEmpty() && sharedEdges.map(e => e.nabeArray(nArg)).reduce((pred, succ) => pred.unionize(succ))) || this.xNodes();
    }
    nodeMap() {
        return ((!this.isEmpty()) && this.map(e => e.nodes)) || this.xNodes();
    }
    xNodes() {
        return new NodeArray;
    }
}
EdgeArray.assignEdge();
module.exports = EdgeArray;
/**
 * [An EdgeArray]{@link module:graphTheory.EdgeArray}
 * @typedef {module:graphTheory.EdgeArray} EdgeArray
 */