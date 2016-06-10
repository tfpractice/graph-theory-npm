/**
 * represent a Vertex
 * @exports Vertex
 * @constructor
 * @memberOf module:graphTheory
 * @param {String} [label = 'default']  [label property]{@link module:graphTheory.Vertex#label}
 */
// module.exports = function Node(label) {
/**
 * the vertex identifier
 * @type {String}
 */
// this.label = label;
// };

/**
 * [A Vertex]{@link module:graphTheory.Vertex}
 * @typedef {module:graphTheory.Vertex} Vertex
 */


class Node {
    constructor(label, data) {
        this.label = label;
        this.data = data;

    }
    isIdentical(newNode) {
        return (this.label) ? this.label == newNode.label : false;
        // return this.label == newNode.label;
    }
}

module.exports = Node;