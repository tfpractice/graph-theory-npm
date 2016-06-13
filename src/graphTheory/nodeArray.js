var Node = require('./node');

class NodeArray extends Array {

    contains(argNode) {
        return this.some(el => (el.isIdentical(argNode) === true));
    }
    isNode(argNode) {
        return argNode instanceof Node;
    }
    push(argNode) {
        return (this.isNode(argNode) && !(this.contains(argNode))) ? super.push(argNode) : false;
    }
    intersection(altArray) {
        return this.filter(currNode => altArray.contains(currNode) === true);
    }
    intersects(altArray) {
        console.log(this);
        console.log(altArray);
        return this.some(currNode => altArray.contains(currNode) === true);
    }
    difference(altArray) {
        let diffArray = new NodeArray();

        this.reduce((dArray, currNode) => {
            if (!altArray.contains(currNode)) dArray.push(currNode);
            return dArray;
        }, diffArray);
        altArray.reduce((dArray, altNode) => {
            if (!this.contains(altNode)) dArray.push(altNode);
            return dArray;
        }, diffArray);

        return diffArray;

    }
    hasDistinctNodes(altArray) {
        return altArray.some(altNode => !this.contains(altNode));
    }

}

module.exports = NodeArray;