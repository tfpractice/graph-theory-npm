var Node = require('./node');
var RobustArray = require('./robustArray');


// module.exports = function(NodeClass) {
// let Node = NodeClass;
// class NodeArray extends RobustArray.SetifyType(Node) {};
// return NodeArray;
// }
module.exports = class NodeArray extends RobustArray.SetifyType(Node) {};



/**
 * represents a set of Nodes
 * @exports NodeArray
 * @constructor
 * @memberOf! module:graphTheory
 */

/**
 * [A NodeArray]{@link module:graphTheory.NodeArray}
 * @typedef {module:graphTheory.NodeArray} NodeArray
 */