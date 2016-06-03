/**
 * represents a Vertex
 * @constructor Vertex
 * @param {String} [label = 'default'] the vertex label
 */
function Vertex(label = 'default') {
    /**
     * the vertex identifier
     * @type {String}
     */
    this.label = label;
}
module.exports = Vertex;