var NodeArray = require('./node_array');
var RobustArray = require('./robust_array');

class ComponentArray extends RobustArray.SetifyType(NodeArray) {
    // contains(compArg) {
    // return this.components.some(currComp => currComp.isEquivalent(compArg))
    // }
    /**
     * adds a component to the graph if not present
     * @param {Component} compArg [description]
     */
    addComponent(compArg) {
        (!this.contains(compArg) && this.hasIntersectingComponent(compArg)) ? this.integrateComponent(compArg) : this.components.push(compArg);
    }
    // removeComponent(compArg) {
    // let cPos = this.components.findIndex(currComp => currComp.isEquivalent(compArg));
    // return cPos > -1 ? this.components.splice(cPos, 1) : compArg;
    // }
    removeElement(argObj) {
        let eqIdx = this.findIndex(el => el.isEquivalent(argObj));
        return eqIdx > -1 && this.splice(eqIdx, 1);
    }
    /**
     * returns any current components which intersect with the specified component
     * @param  {Component} compArg the component to be checked
     * @return {Component} the first intersecting component
     */
    findIntersectingComponent(compArg) {
        return this.find(currComp => currComp.intersects(compArg));
    }
    /**
     * combines the nodes of two intersecting components
     * @param  {Component} origComp
     * @param  {Component} newComp
     */
    mergeComponents(origComp, newComp) {
        let ucomp = origComp.unionize(newComp);
        this.removeElement(newComp);
        return ucomp;
    }
    /**
     * integrates a component into any of the graphs intersectung components
     * @param  {Component} compArg [description]
     */
    integrateComponent(compArg) {
        let oComp = this.findIntersectingComponent(compArg);
        if (oComp) this.mergeComponents(oComp, compArg);
        // return oComp && this.mergeComponents(oComp, compArg);
    }
    /**
     * checks if any current components share nodes with the argument
     * @param  {Component}  compArg [description]
     * @return {Boolean}         [description]
     */
    hasIntersectingComponent(compArg) {
        return this.components.some(currComp => currComp.intersects(compArg));
    }
};

module.exports = ComponentArray;