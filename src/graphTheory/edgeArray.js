var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
// var DirectedEdge = require('./directedEdge');
var RobustArray = require('./robustArray');


/**
 * represents a set of Edges
 * @exports EdgeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class EdgeArray extends RobustArray.SetifyType(Edge) {
    getNodes() {
        return this.reduce((prev, next) => prev.union(next.nodes), this[0].nodes);
        //     return this.reduce((nArray, e) => {
        //         nArray.unionize(e.nodes);
        //         return nArray;
        //     }, new NodeArray());`
    }
    getNeighbors(nodeArg) {
        return this.edgesWithNode(nodeArg).reduce((nArray, e) => nArray.push(e.getNeighbor(nodeArg)), new this[0].nodes.constructor());
    }
    edgesWithNode(nodeArg) {
        return this.filter(e => e.containsNode(nodeArg));
    }
    edgeByNodes(n1, n2) {
        return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
    }
    edgesByArray(nArr) {
        return nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
    }
    inferNodeArray(nodes = this[0].nodes) {
        return new nodes.constructor();
    }
    // static injectDependency(NAClass = )
}


module.exports = EdgeArray;
/**
 * [An EdgeArray]{@link module:graphTheory.EdgeArray}
 * @typedef {module:graphTheory.EdgeArray} EdgeArray
 */