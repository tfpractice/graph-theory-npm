var Node = require('./node');
var RobustArray = require('./robust_array');
/**
 * represents a set of Nodes
 * @exports NodeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class NodeArray extends RobustArray.SetifyType(Node) {
    static assignNode(nClass = Node) {
        this.prototype.Node = nClass;
    }
};
NodeArray.assignNode(Node);
module.exports = NodeArray
/**
 * [A NodeArray]{@link module:graphTheory.NodeArray}
 * @typedef {module:graphTheory.NodeArray} NodeArray
 */