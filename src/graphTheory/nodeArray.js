var Node = require('./node');
var RobustArray = require('./robustArray');
/**
 * represents a set of Nodes
 * @exports NodeArray
 * @constructor
 * @memberOf! module:graphTheory
 */
class NodeArray extends RobustArray.SetifyType(Node) {};

module.exports = NodeArray
/**
 * [A NodeArray]{@link module:graphTheory.NodeArray}
 * @typedef {module:graphTheory.NodeArray} NodeArray
 */