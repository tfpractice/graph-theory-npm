var Vertex = require('./vertex');
/**
 * represents an Edge
 * @constructor Edge
 * @alias module:graphTheory.Edge
 * @param {Vertex}     sVertex source vertex
 * @param {Vertex}     dVertex destination vertex
 * @param {Number} w weight
 * @property {Vertex} source the source vertex
 * @property {Vertex} dest the destination vertex
 * @property {Number} w the weight of the edge
 */
module.exports = function Edge(sVertex = new Vertex(), dVertex = new Vertex(), w = 0) {

    this.source = sVertex;

    this.dest = dVertex;

    this.weight = w;
};