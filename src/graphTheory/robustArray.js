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
    // methods
};

module.exports.SetifyType = RobustArray;