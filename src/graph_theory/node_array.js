var Node = require('./node');
var RobustArray = require('./robust_array');
/**
 * represents a set of Nodes
 * @exports NodeArray
 * @constructor
 * @extends {RobustArray}
 * @memberOf! module:GraphTheory
 */
class NodeArray extends RobustArray.SetifyType(Node) {
    /**
     * defines NodeClass  on the Prototype chain for runtime extension
     * @param  {Function} NClass the Node function this class depends upon
     * @return {Function}  the updated NodeArray class
     */
    static assignNode(nClass = Node) {
        this.prototype.Node = nClass;
    }
};
NodeArray.assignNode();
/**
 * [A NodeArray]{@link module:GraphTheory.NodeArray}
 * @typedef {module:GraphTheory.NodeArray} NodeArray
 */
module.exports = NodeArray;