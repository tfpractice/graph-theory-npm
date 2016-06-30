var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
var DirectedEdge = require('./directedEdge');
/**
 * represents a set of Edges
 * @exports EdgeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class EdgeArray extends Array {
    /**
     * checks for presence of edge in this set
     * @param  {Edge} argEdge [description]
     * @return {Boolean}
     */
    contains(argEdge) {
        return this.some(el => el.isEquivalent(argEdge));
    }
    /**
     * checks type of argument for Edge status
     * @param  {Edge} argEdge
     * @return {Boolean}
     */
    isEdge(argEdge) {
        return argEdge instanceof Edge;
    }
    /**
     * adds a edge to this set
     * @param  {Edge} argEdge
     * @return {Boolean}
     */
    push(argEdge) {
        if (this.isEdge(argEdge) && !this.contains(argEdge)) {
            super.push(argEdge);
        }
        return this;
    }
    /**
     * assembles each edges nodes into one large array
     * @return {NodeArray}
     */
    getNodes() {
        return this.reduce((nArray, e) => {
            nArray.unionize(e.nodes);
            return nArray;
        }, new NodeArray());
    }
    getNeighbors(nodeArg) {
        return this.edgesWithNode(nodeArg).reduce((nArray, e) => nArray.push(e.getNeighbor(nodeArg)), new NodeArray());
    }
    /**
     * returns an array shared edges between two sets
     * @param  {EdgeArray} altArray the array to check
     * @return {EdgeArray} the shared edges
     */

    intersection(altArray) {
        return this.filter(currEdge => altArray.contains(currEdge) === true);
    }
    /**
     * checks for presence of shared edges between two sets
     * @param  {EdgeArray} altArray the array to check
     * @return {Boolean}
     */

    intersects(altArray) {
        return this.some(currEdge => altArray.contains(currEdge) === true);
    }
    /**
     * returns an array edges in this array not included in the alternate array
     * @param  {EdgeArray} altArray the array to check
     * @return {EdgeArray} the unshared edges
     */
    difference(altArray) {
        return this.filter(e => !altArray.contains(e));
    }
    /**
     * checks for presence of unshared edges between two sets
     * @param  {EdgeArray} altArray the array to check
     * @return {Boolean}
     */
    hasDistinctEdges(altArray) {
        return this.some(myEdge => !altArray.contains(myEdge));
    }
    hasSameSize(altArray) {
        return this.length === altArray.length;
    }
    isSubset(altArray) {
        return this.every(myEdge => altArray.contains(myEdge));
    }
    isEquivalent(altArray) {
        return this.hasSameSize(altArray) && this.isSubset(altArray);
    }
    /**
     * returns a combined array of edges belonging to this and the alternate arrays
     * @param  {EdgeArray} altArray the array to combine
     * @return {EdgeArray} the edges
     */
    union(altArray) {
        let uArray = new EdgeArray();
        this.forEach(currEdge => uArray.push(currEdge));
        altArray.forEach(altEdge => uArray.push(altEdge));
        return uArray;
    }

    /**
     * combines all the edges into this edgeArray
     * @param  {EdgeArray} altArray the array to check
     */
    unionize(altArray) {
        altArray.difference(this).forEach(dEdge => this.push(dEdge));
        return this;
    }
    /**
     * forces return type to a NodeArray
     * @param  {...[type]} args the arguments
     * @return {[NodeArray]}
     */
    filter(...args) {
        return EdgeArray.from(super.filter(...args));
    }
    /**
     * forces return type to a EdgeArray
     * @param  {...[type]} args the arguments
     * @return {[EdgeArray]}
     */
    slice(...args) {
        return EdgeArray.from(super.slice(...args));
    }
    /**
     * forces return type to a EdgeArray
     * @param  {...[type]} args the arguments
     * @return {[EdgeArray]}
     */
    concat(...args) {
        return EdgeArray.from(super.concat(...args));
    }
    /**
     * forces return type to a EdgeArray
     * @param  {...[type]} args the arguments
     * @return {[EdgeArray]}
     */
    splice(...args) {
        return EdgeArray.from(super.splice(...args));
    }
    edgeByNodes(n1, n2) {
        return this.find(e => (e.containsNode(n1) && e.containsNode(n2)));
    }
    edgesWithNode(nodeArg) {
        return this.filter(e => e.containsNode(nodeArg));
    }
    edgesByArray(nArr) {
        return nArr.reduce((pNode, nNode) => this.edgesWithNode(pNode).unionize(this.edgesWithNode(nNode)));
    }
    removeEdge(eArg) {
        let ePos = this.findIndex(e => e.isEquivalent(eArg));
        return (ePos > -1) ? this.splice(ePos, 1) : false;
    }
    clear() {
        this.splice(0);
        return this;
    }
    copy() {
        return this.slice(0);
    }
}
module.exports = EdgeArray;
/**
 * [An EdgeArray]{@link module:graphTheory.EdgeArray}
 * @typedef {module:graphTheory.EdgeArray} EdgeArray
 */