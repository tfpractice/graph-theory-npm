var Node = require('./node');
var NodeArray = require('./nodeArray');

/**
 * represents a connection between nodes
 * @exports Edge
 * @constructor
 * @memberOf! module:graphTheory
 */
class Edge {
    constructor(n1 = new Node(), n2 = new Node(), weight = 0) {
        /**
         * an array of nodes
         * @type {NodeArray}
         */
        this.nodes = NodeArray.of(n1, n2);
        /**
         * the weight of the edge
         * @type {Number}
         */
        this.weight = weight;
        /**
         * an identifier for the Edge
         * @type {String}
         */
        this.label = `${n1.label}_${n2.label}`;
    }
    /**
     * checks the equivalence (by label)of this edge against another
     * @param  {Edge}  edgeArg edge to be checked
     * @return {Boolean}
     */
    isEquivalent(edgeArg) {
        return (this.label) ? this.label === edgeArg.label : false;
    }
    /**
     * Checks for presence fo a node in this edge
     * @param  {Node} nodeArg
     * @return {Node}
     */
    containsNode(nodeArg) {
        return this.nodes.contains(nodeArg);
    }
    /**
     * returns the neighboring node
     * @param  {Node} nodeArg
     * @return {Node} the neighbor
     */
    getNeighbor(nodeArg) {
        return this.nodes.find(currNode => currNode != nodeArg);
    }
}
module.exports = Edge;