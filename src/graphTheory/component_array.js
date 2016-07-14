var NodeArray = require('./node_array');
var RobustArray = require('./robust_array');

class ComponentArray extends RobustArray.SetifyType(NodeArray) {};

module.exports = ComponentArray;