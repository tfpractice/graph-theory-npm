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
    /**
     * forces return type to a RobustArray
     * @param  {...[type]} args the arguments
     * @return {[RobustArray]}
     */
    filter(...args) {
        return this.constructor.from(super.filter(...args));
    }
    /**
     * forces return type to a RobustArray
     * @param  {...[type]} args the arguments
     * @return {[RobustArray]}
     */
    slice(...args) {
        return this.constructor.from(super.slice(...args));
    }
    /**
     * forces return type to a RobustArray
     * @param  {...[type]} args the arguments
     * @return {[RobustArray]}
     */
    concat(...args) {
        return this.constructor.from(super.concat(...args));
    }
    /**
     * forces return type to a RobustArray
     * @param  {...[type]} args the arguments
     * @return {[RobustArray]}
     */
    splice(...args) {
        return this.constructor.from(super.splice(...args));
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
    removeElement(argObj) {
        let nPos = this.indexOf(argObj);
        return (nPos > -1) ? this.splice(nPos, 1) : false;
    }
    clear() {
        this.splice(0);
        return this;
    }
    copy() {
        return this.slice(0);
    }
    /**
     * checks for presence of shared nodes between two sets
     * @param  {RobustArray} altArray the array to check
     * @return {Boolean}
     */
    intersects(altArray) {
        return this.some(currEl => altArray.contains(currEl) === true);
    }

    /**
     * returns an array shared nodes between two sets
     * @param  {RobustArray} altArray the array to check
     * @return {RobustArray} the shared nodes
     */
    intersection(altArray) {
        return this.filter(currEl => altArray.contains(currEl) === true);
    }
    /**
     * checks for presence of unshared nodes between two sets
     * @param  {RobustArray} altArray the array to check
     * @return {Boolean}
     */
    hasDistinctElements(altArray) {
        return this.some(myObj => !altArray.contains(myObj));
    }
    /**
     * returns an array nodes in this array not included in the alternate array
     * @param  {RobustArray} altArray the array to check
     * @return {RobustArray} the unshared nodes
     */
    difference(altArray) {
        return this.filter(n => !altArray.contains(n));
    }



    // /**
    //  * returns a combined array of nodes belonging to this and the alternate arrays
    //  * @param  {RobustArray} altArray the array to combine
    //  * @return {RobustArray} the nodes
    //  */
    // union(altArray) {
    //     let uArray = new this.constructor();
    //     this.forEach(currEl => uArray.push(currEl));
    //     altArray.forEach(altNode => uArray.push(altNode));
    //     return uArray;
    // }
    // /**
    //  * combines all the nodes into this nodeArray
    //  * @param  {RobustArray} altArray the array to check
    //  */
    // unionize(altArray) {
    //     altArray.difference(this).forEach(dNode => this.push(dNode));
    //     return this;
    // }

    //     // nodeComplement(argObj) {
    // return this.filter(n => n.isEquivalent(argObj));
    // }

};

module.exports.SetifyType = RobustArray;