var Node = require('./node');
var NodeArray = require('./nodeArray');

class Edge {
    constructor(n1 = new Node(), n2 = new Node(), weight = 0) {

        this.nodes = NodeArray.of(n1, n2);
        this.weight = weight;
        this.label = `${n1.label}_${n2.label}`;
    }

    isEquivalent(edgeArg) {
        return (this.label) ? this.label === edgeArg.label : false;
    }
    containsNode(nodeArg) {
        return this.nodes.contains(nodeArg);
        // return this.nodes.indexOf(node) > -1;
    }
    getNeighbor(nodeArg) {
        return this.nodes.find(currNode => currNode != nodeArg);
    }
    // methods
}
module.exports = Edge;