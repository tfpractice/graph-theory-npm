var Node = require('./node');
var NodeArray = require('./node_array');
var Edge = require('./edge');
// var DirectedEdge = require('./directedEdge');
var RobustArray = require('./robust_array');
/**
 * represents a set of Edges
 * @exports EdgeArray
 * @constructor
 * @memberOf! module:GraphTheory
 * @extends {RobustArray}
 */
class EdgeArray extends RobustArray.SetifyType(Edge) {
    /**
     * defines EdgeClass (and associated dependencies) on the Prototype chain for runtime extension
     * @param  {Function} EClass the Edge function this class depends upon
     * @return {Function} EdgeArray the updated EdgeArray class
     */
    static assignEdge(EClass = Edge) {
        this.prototype.Edge = EClass;
        this.prototype.NodeArray = EClass.prototype.NodeArray;
        this.prototype.Node = EClass.prototype.Node;
        return this;
    }
    /**
     * Filters the edges by those which contain the specified node
     * @param  {Node} nArg the node in question
     * @return {EdgeArray} the filtered array
     */
    edgesWithNode(nArg) {
        return this.filter(e => e.containsNode(nArg));
    }
    /**/
    edgeByNodes(n1, n2) {
        return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
    }
    /**
     *
     * @param  {NodeArray} nArr the nodes to be matched against
     * @return {EdgeArray}      the edges intersecting nArr
     */
    edgesByArray(nArr) {
        return nArr.reduce((eArr, nNode) => eArr.unionize(this.edgesWithNode(nNode)), new this.constructor());
    }
    /**
     * @return {NodeArray}      all of the nodes in this array of edges
     */
    getNodes() {
        return this.reduce((prev, succ) => prev.unionize(succ.nodes), new this.NodeArray);
    }
    /**
     * @param  {NodeArray} nArg the node to be matched against
     * @return {NodeArray}      all of the nodes contained in this array
     */
    getNeighbors(nArg) {
        return this.edgesWithNode(nArg).reduce((prev, succ) => prev.unionize(succ.nabeArray(nArg)), new this.NodeArray);
    }

}
EdgeArray.assignEdge();
/**
 * [An EdgeArray]{@link module:GraphTheory.EdgeArray}
 * @typedef {module:GraphTheory.EdgeArray} EdgeArray
 */
module.exports = EdgeArray;