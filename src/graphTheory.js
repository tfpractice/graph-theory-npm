/**
 * @module graphTheory
 */



var Node = require('./graphTheory/node');
var RobustArray = require('./graphTheory/robustArray');
var NodeArray = require('./graphTheory/nodeArray');
var DirectedEdge = require('./graphTheory/directedEdge');
var Edge = require('./graphTheory/edge');
var EdgeArray = require('./graphTheory/edgeArray');
var Graph = require('./graphTheory/graph');

var injector = require('./graphTheory/depInjector')();
injector.register('NodeClass', Node);
injector.factory('NodeArray', NodeArray);
injector.factory('Edge', Edge);
injector.factory('EdgeArray', EdgeArray);
injector.factory('Graph', Graph);

injector.retrieve('EdgeArray');
exports.EdgeArray = injector.retrieve("EdgeArray");
exports.Edge = injector.retrieve("Edge");
exports.NodeArray = injector.retrieve("NodeArray");
exports.Node = injector.retrieve("NodeClass");
exports.RobustArray = RobustArray;

exports.DirectedEdge = DirectedEdge;
// exports.Graph = injector.retrieve('Graph');