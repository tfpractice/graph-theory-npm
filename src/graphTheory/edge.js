var Node = require('./node');
var NodeArray = require('./nodeArray');
// var NodeArray = require('./robustArray').SetifyType(Node);
/**
 * represents a connection between nodes
 * @exports Edge
 * @constructor
 * @memberOf! module:graphTheory
 */
class Edge {
    static injectDependency(NAClass = NodeArray) {
        this.prototype.constructNodes = function(n1, n2) {
            this.nodes = NAClass.of(n1, n2);
        }
    }
    constructor(n1 = new Node(), n2 = new Node(), weight = 0) {
        this.constructNodes(n1, n2);
        /**
         * the weight of the edge
         * @type {Number}
         */
        this.weight = weight;
        /**
         * an identifier for the Edge
         * @type {String}
         */
        this.setLabel();
    }

    constructNodes(n1, n2) {
        /**
         * an array of nodes
         * @type {NodeArray}
         */
        this.nodes = NodeArray.of(n1, n2);
    }
    setLabel() {
        this.label = `${this.nodes[0].label}_${this.nodes[1].label}`;
    }
    /**
     * checks the equivalence (by nodes)of this edge against another
     * @param  {Edge}  edgeArg edge to be checked
     * @return {Boolean}
     */
    isEquivalent(edgeArg) {
        return this.hasSameNodes(edgeArg);
    }

    /**
     * checks the equivalence (by label)of this edge against another
     * @param  {Edge}  edgeArg edge to be checked
     * @return {Boolean}
     */
    hasSameName(edgeArg) {
        return (this.label) ? this.label === edgeArg.label : false;
    }
    /**
     * checks the equivalence of this edges nodes against another
     * @param  {Edge}  edgeArg edge to be checked
     * @return {Boolean}
     */
    hasSameNodes(edgeArg) {
        return this.nodes.isEquivalent(edgeArg.nodes);
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
    nabeArray(nodeArg) {
        return this.nodes.excludeElement(nodeArg);
    }
    // excludeNode(nodeArg) {
    // return this.nodes.nodeComplement(nodeArg);
    // }
}
/**
 * [An Edge]{@link module:graphTheory.Edge}
 * @typedef {module:graphTheory.Edge} Edge
 */
// }
module.exports = Edge;