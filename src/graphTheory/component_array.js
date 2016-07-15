var NodeArray = require('./node_array');
var RobustArray = require('./robust_array');

class ComponentArray extends RobustArray.SetifyType(NodeArray) {
    static assignNodeArray(NAClass = NodeArray) {
        this.prototype.NodeArray = NAClass;
        this.prototype.Node = NAClass.prototype.Node;
    }
    /**
     * adds a component to the graph if not present
     * @param {Component} compArg [description]
     */
    push(compArg) {
        return this.integrateComponent(compArg) || super.push(compArg);
    }
    /**
     * checks if any current components share nodes with the argument
     * @param  {Component}  compArg [description]
     * @return {Boolean}         [description]
     */
    hasIntersectingComponent(compArg) {
        return this.excludeElement(compArg).some(currComp => currComp.intersects(compArg));
    }
    /**
     * returns any current components which intersect with the specified component
     * @param  {Component} compArg the component to be checked
     * @return {Component} the first intersecting component
     */
    findIntersectingComponent(compArg) {
        return this.excludeElement(compArg).find(currComp => currComp.intersects(compArg));
    }
    /**
     * combines the nodes of two intersecting components
     * @param  {Component} origComp
     * @param  {Component} newComp
     */
    mergeComponents(origComp, newComp) {
        let ucomp = origComp.unionize(newComp);
        this.removeElement(newComp);
        return this;
    }
    /**
     * integrates a component into any of the graphs intersectung components
     * @param  {Component} compArg [description]
     */
    integrateComponent(compArg) {
        let iComp = this.findIntersectingComponent(compArg);
        return (!!iComp) && this.mergeComponents(iComp, compArg);
    }

};
ComponentArray.assignNodeArray();
module.exports = ComponentArray;