var RobustArray = BaseType => class extends Array {

    /**
     * checks type of argument for Node status
     * @param  {Node} argObj
     * @return {Boolean}
     */
    isValid(argObj) {
        return argObj instanceof BaseType;
    }
    /**
     * checks for presence of node in this set
     * @param  {Node} argObj [description]
     * @return {Boolean}
     */
    contains(argObj) {
        return this.some(el => el.isEquivalent(argObj));
    }
    push(argObj) {
        if ((this.isValid(argObj) && !(this.contains(argObj)))) {
            super.push(argObj);
        }
        return this;
    }
    hasSameSize(altArray) {
        return this.length === altArray.length;
    }
    isSubset(altArray) {
        return this.every(myObj => altArray.contains(myObj));
    }
    isEquivalent(altArray) {
        return (this.hasSameSize(altArray) && this.isSubset(altArray));
    }
    /**
     * returns an array shared nodes between two sets
     * @param  {NodeArray} altArray the array to check
     * @return {NodeArray} the shared nodes
     */
    // intersection(altArray) {
    //     return this.filter(currNode => altArray.contains(currNode) === true);
    // }
    // /**
    //  * checks for presence of shared nodes between two sets
    //  * @param  {NodeArray} altArray the array to check
    //  * @return {Boolean}
    //  */
    // intersects(altArray) {
    //     return this.some(currNode => altArray.contains(currNode) === true);
    // }
    // /**
    //  * returns an array nodes in this array not included in the alternate array
    //  * @param  {NodeArray} altArray the array to check
    //  * @return {NodeArray} the unshared nodes
    //  */
    // difference(altArray) {
    //     return this.filter(n => !altArray.contains(n));
    // }
    // /**
    //  * checks for presence of unshared nodes between two sets
    //  * @param  {NodeArray} altArray the array to check
    //  * @return {Boolean}
    //  */
    // hasDistinctNodes(altArray) {
    //     return this.some(myObj => !altArray.contains(myObj));
    //     // return altArray.some(altNode => !this.contains(altNode));
    // }


    // /**
    //  * returns a combined array of nodes belonging to this and the alternate arrays
    //  * @param  {NodeArray} altArray the array to combine
    //  * @return {NodeArray} the nodes
    //  */
    // union(altArray) {
    //     let uArray = new NodeArray();
    //     this.forEach(currNode => uArray.push(currNode));
    //     altArray.forEach(altNode => uArray.push(altNode));
    //     return uArray;
    // }
    // /**
    //  * combines all the nodes into this nodeArray
    //  * @param  {NodeArray} altArray the array to check
    //  */
    // unionize(altArray) {
    //     altArray.difference(this).forEach(dNode => this.push(dNode));
    //     return this;
    // }
    // /**
    //  * forces return type to a NodeArray
    //  * @param  {...[type]} args the arguments
    //  * @return {[NodeArray]}
    //  */
    // filter(...args) {
    //     return NodeArray.from(super.filter(...args));
    // }
    // /**
    //  * forces return type to a NodeArray
    //  * @param  {...[type]} args the arguments
    //  * @return {[NodeArray]}
    //  */
    // slice(...args) {
    //     return NodeArray.from(super.slice(...args));
    // }
    // /**
    //  * forces return type to a NodeArray
    //  * @param  {...[type]} args the arguments
    //  * @return {[NodeArray]}
    //  */
    // concat(...args) {
    //     return NodeArray.from(super.concat(...args));
    // }
    // /**
    //  * forces return type to a NodeArray
    //  * @param  {...[type]} args the arguments
    //  * @return {[NodeArray]}
    //  */
    // splice(...args) {
    //     return NodeArray.from(super.splice(...args));
    // }
    // removeNode(nArg) {
    //     let nPos = this.indexOf(nArg);
    //     return (nPos > -1) ? this.splice(nPos, 1) : false;
    // }


    // nodeComplement(nArg) {
    //     return this.filter(n => n.isEquivalent(nArg));
    // }
    // clear() {
    //     this.splice(0);
    //     return this;
    // }
    // copy() {
    //     return this.slice(0);
    // }
};

module.exports.SetifyType = RobustArray;