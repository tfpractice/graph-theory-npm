/**
 * represent a Node
 * @exports Node
 * @constructor
 * @memberOf module:graphTheory
 * @param {String} [label = 'default']  [label property]{@link module:graphTheory.Node#label}
 * @param {Object} data the nodes data
 */
class Node {
    constructor(label, data) {
        /**
         * the node identifier
         * @type {String}
         */
        this.label = label;
        /**
         * the node data
         * @type {Object}
         */
        this.data = data;

    }
    /**
     * Checks for identity via label attribute
     * @param  {Node}  newNode the node to be compared
     * @return {Boolean}
     */
    isIdentical(newNode) {
        return (this.label) ? this.label == newNode.label : false;
    }
}

module.exports = Node;
/**
 * [A Node]{@link module:graphTheory.Node}
 * @typedef {module:graphTheory.Node} Node
 */