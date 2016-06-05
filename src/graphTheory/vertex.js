/**
 * @exports Vertex
 * @constructor
 * @memberOf! module:graphTheory
 * @param {String} [label = 'default'] the vertex label
 */
module.exports = function Vertex(label = 'default') {
    /**
     * the vertex identifier
     * @type {String}
     */
    this.label = label;
};