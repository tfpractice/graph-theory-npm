/**
 * represent a Vertex
 * @exports Vertex
 * @constructor
 * @memberOf module:graphTheory
 * @param {String} [label = 'default']  [label property]{@link module:graphTheory.Vertex#label}
 */
module.exports = function Vertex(label = 'default') {
    /**
     * the vertex identifier
     * @type {String}
     */
    this.label = label;
};

/**
 * [A Vertex]{@link module:graphTheory.Vertex}
 * @typedef {module:graphTheory.Vertex} Vertex
 */