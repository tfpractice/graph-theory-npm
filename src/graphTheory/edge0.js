var Node = require('./node');
var NodeArray = require('./nodeArray');
class Edge {
    constructor(n1, n2, weight = 0) {
        this.nodes = NodeArray.from(n1, n2);
        this.weight = weight;
    }

    // methods
}
module.exports = Edge;