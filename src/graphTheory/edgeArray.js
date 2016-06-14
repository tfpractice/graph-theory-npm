var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
var DirectedEdge = require('./directedEdge');

class EdgeArray extends Array {
    // constructor() {
    // super();
    // this.nodes = new NodeArray();
    // }
    contains(argEdge) {
        return this.some(el => (el.isEquivalent(argEdge) === true));
    }
    isEdge(argEdge) {
        return argEdge instanceof Edge;
    }
    push(argEdge) {
        return (this.isEdge(argEdge) && !(this.contains(argEdge))) ? super.push(argEdge) : false;
    }
    getNodes() {
        return this.reduce((nArray, e) => {
            nArray.push(e.nodes);
            return nArray;
        }, new NodeArray());
    }
    intersection(altArray) {
        return this.filter(currEdge => altArray.contains(currEdge) === true);
    }
    intersects(altArray) {
        return this.some(currEdge => altArray.contains(currEdge) === true);
    }
    // difference(altArray) {
    // let diffArray = new NodeArray();

    // this.reduce((dArray, currEdge) => {
    // if (!altArray.contains(currEdge)) dArray.push(currEdge);
    // return dArray;
    // }, diffArray);
    // altArray.reduce((dArray, altNode) => {
    // if (!this.contains(altNode)) dArray.push(altNode);
    // return dArray;
    // }, diffArray);

    // return diffArray;

    // }
    // hasDistinctNodes(altArray) {
    // return altArray.some(altNode => !this.contains(altNode));
    // }
    // union(altArray) {
    // let uArray = new NodeArray();
    // this.filter(currEdge => uArray.push(currEdge));
    // altArray.filter(altNode => uArray.push(altNode));
    // return uArray;
    // }
    // unionize(altArray) {
    // this.difference(altArray).forEach(dNode => this.push(dNode));
    // }

}
module.exports = EdgeArray;