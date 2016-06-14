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
    difference(altArray) {
        let diffArray = new EdgeArray();

        this.reduce((dArray, currEdge) => {
            if (!altArray.contains(currEdge)) dArray.push(currEdge);
            return dArray;
        }, diffArray);
        altArray.reduce((dArray, altEdge) => {
            if (!this.contains(altEdge)) dArray.push(altEdge);
            return dArray;
        }, diffArray);
        return diffArray;

    }
    hasDistinctEdges(altArray) {
        return altArray.some(altEdge => !this.contains(altEdge));
    }
    union(altArray) {
        let uArray = new EdgeArray();
        this.filter(currEdge => uArray.push(currEdge));
        altArray.filter(altEdge => uArray.push(altEdge));
        // console.log(uArray);
        return uArray;
    }
    unionize(altArray) {
        this.difference(altArray).forEach(dEdge => this.push(dEdge));
    }

}
module.exports = EdgeArray;