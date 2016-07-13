/**
 * @module graphTheory
 */



exports.Node = require('./graphTheory/node');
exports.RobustArray = require('./graphTheory/robustArray');
exports.NodeArray = require('./graphTheory/nodeArray');
exports.DirectedEdge = require('./graphTheory/directedEdge');
exports.Edge = require('./graphTheory/edge');
exports.EdgeArray = require('./graphTheory/edgeArray');
exports.Graph = require('./graphTheory/graph');

// var injector = require('./graphTheory/depInjector')();
// injector.register('NodeClass', Node);
// injector.factory('NodeArray', NodeArray);
// injector.factory('Edge', Edge);
// injector.factory('EdgeArray', EdgeArray);
// injector.factory('Graph', Graph);

// injector.retrieve('EdgeArray');
// exports.Graph = injector.retrieve('Graph');
// exports.EdgeArray = injector.retrieve("EdgeArray");
// exports.Edge = injector.retrieve("Edge");
// exports.NodeArray = injector.retrieve("NodeArray");
// exports.Node = injector.retrieve("NodeClass");
// exports.RobustArray = RobustArray;

// exports.DirectedEdge = DirectedEdge;