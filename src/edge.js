var Vertex = require('./vertex');
/**
 * represents an Edge
 * @constructor Edge
 * @param {Vertex}     sVertex source vertex
 * @param {Vertex}     dVertex destination vertex
 * @param {Number} w       weight
 */
function Edge(sVertex = new Vertex(), dVertex = new Vertex(), w = 0) {
    /**
     * the source vertex
     * @type {Vertex}
     */
    this.source = sVertex;
    /**
     * the destination vertex
     * @type {Vertex}
     */
    this.dest = dVertex;
    /**
     * the edge weight
     * @type {Number}
     */
    this.weight = w;
}

module.exports = Edge;