/**
 * a type-specific array class implementing set theory
 * @exports RobustArray
 * @constructor
 * @param  {Object} BaseType the data type of objects stored in this array
 * @extends {Array}
 * @return {Function}          the new class
 * @memberOf! module:graphTheory
 */
var RobustArray = BaseType => class extends Array {
    /**
     * checks the data type of the new element
     * @param  {Object | Object} argObj
     * @return {Boolean}
     */
    isValid(argObj) {
        return argObj instanceof BaseType;
    }
    /**
     * @return {Boolean} if the array length is 0
     */
    isEmpty() {
        return this.length === 0;
    }
    /**
     * checks for presence of an element in this set
     * @param  {Object | Object} argObj
     * @return {Boolean}
     */
    contains(argObj) {
        return this.some(el => el.isEquivalent(argObj));
    }
    /**
     * appends an element to this array if passes the type validator and is not already present
     * @param  {[type]} argObj
     * @return {RobustArray}     the current array
     */
    push(argObj) {
        if ((this.isValid(argObj) && !(this.contains(argObj)))) {
            super.push(argObj);
        }
        return this;
    }
    /**
     * coerces return type to a RobustArray after delegating to Native Array#filter
     * @param  {...[type]} args JS Native Array#filter arguments
     * @return {[RobustArray]}
     */
    filter(...args) {
        return this.constructor.from(super.filter(...args));
    }
    /**
     * coerces return type to a RobustArray after delegating to Native Array#slice
     * @param  {...[type]} args JS Native Array#slice arguments
     * @return {[RobustArray]}
     */
    slice(...args) {
        return this.constructor.from(super.slice(...args));
    }
    /**
     * coerces return type to a RobustArray after delegating to Native Array#concat
     * @param  {...[type]} args JS Native Array#concat arguments
     * @return {[RobustArray]}
     */
    concat(...args) {
        return this.constructor.from(super.concat(...args));
    }
    /**
     * coerces return type to a RobustArray after delegating to Native Array#splice
     * @param  {...[type]} args JS Native Array#splice arguments
     * @return {[RobustArray]}
     */
    splice(...args) {
        return this.constructor.from(super.splice(...args));
    }
    /**
     * @param  {RobustArray}  altArray
     * @return {Boolean}   do the arrays have the same length
     */
    hasSameSize(altArray) {
        return this.length === altArray.length;
    }
    /**
     * @param  {[type]}  altArray
     * @return {Boolean} does the altArray contain every element of the receiver
     */
    isSubset(altArray) {
        return this.every(myObj => altArray.contains(myObj));
    }
    /**
     * @param  {[type]}  altArray [description]
     * @return {Boolean}   do the argument nad receiver share length and elements
     */
    isEquivalent(altArray) {
        return (this.hasSameSize(altArray) && this.isSubset(altArray));
    }
    /**
     * returns the first element which is equivalent to the argument
     * @param  {[type]}  altArray
     * @return {Object | undefined}
     */
    findEquivalentElement(argObj) {
        return this.find(el => el.isEquivalent(argObj));
    }
    /**
     * removes the argument from the array
     * @param  {[type]}  argObj
     * @return {Object | False}
     */
    removeElement(argObj) {
        let eqIdx = this.findIndex(el => el.isEquivalent(argObj));
        return eqIdx > -1 && this.splice(eqIdx, 1);
    }
    /**
     * removes all elements from the array
     * @param  {[type]}  altArray
     * @return {RobustArray} the newly empty array
     */
    clear() {
        this.splice(0);
        return this;
    }
    /**
     * @return {RobustArray} a copy of this array
     */
    copy() {
        return this.slice(0);
    }
    /**
     * checks for presence of shared elements between two sets
     * @param  {RobustArray} altArray the array to check
     * @return {Boolean}
     */
    intersects(altArray) {
        return this.some(currEl => altArray.contains(currEl) === true);
    }

    /**
     * returns an array shared elements between two sets
     * @param  {RobustArray} altArray the array to check
     * @return {RobustArray} the shared elements
     */
    intersection(altArray) {
        return this.filter(currEl => altArray.contains(currEl) === true);
    }
    /**
     * @param  {RobustArray} altArray the array to check
     * @return {Boolean} does the caller have any element not included in the argument
     */
    hasDistinctElements(altArray) {
        return this.some(myObj => !altArray.contains(myObj));
    }
    /**
     * returns an array elements in this array not included in the alternate array
     * @param  {RobustArray} altArray the array to check
     * @return {RobustArray} the unshared elements
     */
    difference(altArray) {
        return this.filter(n => !altArray.contains(n));
    }
    /**
     * returns a combined array of elements contained in the receiver or altArray
     * @param  {RobustArray} altArray
     * @return {RobustArray}
     */
    union(altArray) {
        let uArray = new this.constructor();
        this.forEach(currEl => uArray.push(currEl));
        altArray.forEach(altElem => uArray.push(altElem));
        return uArray;
    }
    /**
     * combines all the elements from altArray into the receiver
     * @param  {RobustArray} altArray
     */
    unionize(altArray) {
        altArray.difference(this).forEach(dNode => this.push(dNode));
        return this;
    }
    /**
     *
     * @param  {Object} exElem the element to exclude
     * @return {RobustArray} all of the elements in this object excluding exElem
     */
    excludeElement(exElem) {
        return this.filter(el => el != exElem);
    }

};
/**
 * [A RobustArray]{@link module:graphTheory.RobustArray}
 * @typedef {module:graphTheory.RobustArray} RobustArray
 */
module.exports.SetifyType = RobustArray;