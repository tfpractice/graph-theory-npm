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
        this.setLabel(label);
        this.setData(data);

        // this.label = label;

        /**
         * the node data
         * @type {Object}
         */

        // this.data = data;

    }
    setLabel(lbl) {
        return this.label = lbl;
    }
    setData(d) {
        return this.data = d || {};
    }
    /**
     * Checks for identity via label attribute
     * @param  {Node}  newNode the node to be compared
     * @return {Boolean}
     */
    isEquivalent(newNode) {
        return this.label === newNode.label;
    }
}

module.exports = Node;
/**
 * [A Node]{@link module:graphTheory.Node}
 * @typedef {module:graphTheory.Node} Node
 */