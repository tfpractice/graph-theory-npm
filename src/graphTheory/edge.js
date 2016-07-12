// var Node = require('./node');
// var NodeArray = require('./nodeArray');
// var NodeArray = require('./robustArray').SetifyType(Node);
/**
 * represents a connection between nodes
 * @exports Edge
 * @constructor
 * @memberOf! module:graphTheory
 */

module.exports = function(NodeArray, NodeClass) {
    // let NodeArray = NodeArray;
    let Node = NodeClass;

    class Edge {
        static injectDependency(NAClass = Node) {
            this.prototype.constructNodes = function(n1, n2) {
                this.nodes = NAClass.of(n1, n2);
            }
        }
        constructor(n1 = new Node(), n2 = new Node(), weight = 0) {
            /**
             * an array of nodes
             * @type {NodeArray}
             */
            this.constructNodes(n1, n2);
            // this.nodes = NodeArray.of(n1, n2);
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
        setLabel() {
            this.label = `${this.nodes[0].label}_${this.nodes[1].label}`;
        }
        constructNodes(n1, n2) {
            this.nodes = NodeArray.of(n1, n2);
        }
        /**
         * checks the equivalence (by label)of this edge against another
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
            return this.nodes.isSubset(edgeArg.nodes);
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
        // excludeNode(nodeArg) {
        // return this.nodes.nodeComplement(nodeArg);
        // }
    }
    return Edge;
    // Edge.NodeArray = require('./robustArray').SetifyType(Node);;
}
/**
 * [An Edge]{@link module:graphTheory.Edge}
 * @typedef {module:graphTheory.Edge} Edge
 */
// }
// module.exports = Edge;