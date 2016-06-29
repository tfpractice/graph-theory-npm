var Node = require('./node');
/**
 * represents a set of Nodes
 * @exports NodeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class NodeArray extends Array {
    /**
     * checks for presence of node in this set
     * @param  {Node} argNode [description]
     * @return {Boolean}
     */
    contains(argNode) {
        return this.some(el => (el.isIdentical(argNode) === true));
    }
    /**
     * checks type of argument for Node status
     * @param  {Node} argNode
     * @return {Boolean}
     */
    isNode(argNode) {
        return argNode instanceof Node;
    }
    /**
     * adds a node to this set
     * @param  {Node} argNode
     * @return {Boolean}
     */
    push(argNode) {
        return (this.isNode(argNode) && !(this.contains(argNode))) ? super.push(argNode) : false;
    }
    /**
     * returns an array shared nodes between two sets
     * @param  {NodeArray} altArray the array to check
     * @return {NodeArray} the shared nodes
     */
    intersection(altArray) {
        return this.filter(currNode => altArray.contains(currNode) === true);
    }
    /**
     * checks for presence of shared nodes between two sets
     * @param  {NodeArray} altArray the array to check
     * @return {Boolean}
     */
    intersects(altArray) {
        return this.some(currNode => altArray.contains(currNode) === true);
    }
    /**
     * returns an array nodes in this array not included in the alternate array
     * @param  {NodeArray} altArray the array to check
     * @return {NodeArray} the unshared nodes
     */
    difference(altArray) {
        let diffArray = new NodeArray();

        this.reduce((dArray, currNode) => {
            if (!altArray.contains(currNode)) dArray.push(currNode);
            return dArray;
        }, diffArray);
        altArray.reduce((dArray, altNode) => {
            if (!this.contains(altNode)) dArray.push(altNode);
            return dArray;
        }, diffArray);

        return diffArray;

    }
    /**
     * checks for presence of unshared nodes between two sets
     * @param  {NodeArray} altArray the array to check
     * @return {Boolean}
     */
    hasDistinctNodes(altArray) {
        return altArray.some(altNode => !this.contains(altNode));
    }
    /**
     * returns a combined array of nodes belonging to this and the alternate arrays
     * @param  {NodeArray} altArray the array to combine
     * @return {NodeArray} the nodes
     */
    union(altArray) {
        let uArray = new NodeArray();
        this.forEach(currNode => uArray.push(currNode));
        altArray.forEach(altNode => uArray.push(altNode));
        return uArray;
    }
    /**
     * combines all the nodes into this nodeArray
     * @param  {NodeArray} altArray the array to check
     */
    unionize(altArray) {
        this.difference(altArray).forEach(dNode => this.push(dNode));
    }
    /**
     * forces return type to a NodeArray
     * @param  {...[type]} args the arguments
     * @return {[NodeArray]}
     */
    filter(...args) {
        return NodeArray.from(super.filter(...args));
    }
    /**
     * forces return type to a NodeArray
     * @param  {...[type]} args the arguments
     * @return {[NodeArray]}
     */
    slice(...args) {
        return NodeArray.from(super.slice(...args));
    }
    /**
     * forces return type to a NodeArray
     * @param  {...[type]} args the arguments
     * @return {[NodeArray]}
     */
    concat(...args) {
        return NodeArray.from(super.concat(...args));
    }
    /**
     * forces return type to a NodeArray
     * @param  {...[type]} args the arguments
     * @return {[NodeArray]}
     */
    splice(...args) {
        return NodeArray.from(super.splice(...args));
    }



}

module.exports = NodeArray;
/**
 * [A NodeArray]{@link module:graphTheory.NodeArray}
 * @typedef {module:graphTheory.NodeArray} NodeArray
 */