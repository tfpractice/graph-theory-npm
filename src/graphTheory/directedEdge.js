var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge0');


class DirectedEdge extends Edge {
    constructor(src = new Node(), dest = new Node(), weight = 0) {
        super(src, dest, weight);
        this.source = src;
        this.dest = dest;

    }
    isEquivalent(edgeArg) {
        return (edgeArg instanceof DirectedEdge) ? super.isEquivalent(edgeArg) : false;
    }

    // methods
}

module.exports = DirectedEdge;