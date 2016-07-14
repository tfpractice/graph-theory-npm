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
        return nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
    }
    getNodes() {
        return this.reduce((nArr, e) => nArr.union(e.nodes), this[0].nodes);
    }
    getNeighbors(nArg) {
        return this.edgesWithNode(nArg).reduce((nArray, e) => nArray.unionize(e.nabeArray(nArg)), this[0].nabeArray(nArg));
    }

}


module.exports = EdgeArray;
/**
 * [An EdgeArray]{@link module:graphTheory.EdgeArray}
 * @typedef {module:graphTheory.EdgeArray} EdgeArray
 */