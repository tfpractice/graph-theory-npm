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
    edgesWithNode(nArg) {
        return this.filter(e => e.containsNode(nArg));
    }
    edgeByNodes(n1, n2) {
        return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
    }
    edgesByArray(nArr) {
        return (!nArr.isEmpty()) && nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
    }
    getNodes() {
        return (!this.isEmpty()) && this.reduce((nArr, e) => nArr.union(e.nodes), this[0].nodes);
    }
    getNeighbors(nArg) {
        let sharedEdges = this.edgesWithNode(nArg);
        return (!sharedEdges.isEmpty()) && sharedEdges.map(e => e.nabeArray(nArg)).reduce((pred, succ) => pred.unionize(succ));
    }
}
module.exports = EdgeArray;
/**
 * [An EdgeArray]{@link module:graphTheory.EdgeArray}
 * @typedef {module:graphTheory.EdgeArray} EdgeArray
 */