(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["graph-theory-npm"] = factory();
	else
		root["graph-theory-npm"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * @module graphTheory
	 */
	exports.Vertex = __webpack_require__(1);
	exports.Edge = __webpack_require__(2);
	exports.Graph = __webpack_require__(3);

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';

	/**
	 * represent a Vertex
	 * @exports Vertex
	 * @constructor
	 * @memberOf module:graphTheory
	 * @param {String} [label = 'default']  [label property]{@link module:graphTheory.Vertex#label}
	 */
	module.exports = function Vertex() {
	  var label = arguments.length <= 0 || arguments[0] === undefined ? 'default' : arguments[0];

	  /**
	   * the vertex identifier
	   * @type {String}
	   */
	  this.label = label;
	};

	/**
	 * [A Vertex]{@link module:graphTheory.Vertex}
	 * @typedef {module:graphTheory.Vertex} Vertex
	 */

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var Vertex = __webpack_require__(1);
	/**
	 * represents an Edge
	 * @exports Edge
	 * @constructor
	 * @memberOf! module:graphTheory
	 * @param {Vertex}     sVertex source vertex
	 * @param {Vertex}     dVertex destination vertex
	 * @param {Number} w weight
	 * @property {Vertex} source the source vertex
	 * @property {Vertex} dest the destination vertex
	 * @property {Number} w the weight of the edge
	 */
	module.exports = function Edge() {
	  var sVertex = arguments.length <= 0 || arguments[0] === undefined ? new Vertex() : arguments[0];
	  var dVertex = arguments.length <= 1 || arguments[1] === undefined ? new Vertex() : arguments[1];
	  var w = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

	  /**
	   * the source vertex
	   * @type {Vertex}
	   */
	  this.source = sVertex;
	  /**
	   * the destination vertex
	   * @type {Vertex}
	   */
	  this.dest = dVertex;
	  /**
	   * the weight of the edge
	   * @type {Number}
	   */
	  this.weight = w;
	};

	/**
	 * [An Edge]{@link module:graphTheory.Edge}
	 * @typedef {module:graphTheory.Edge} Edge
	 */

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var Edge = __webpack_require__(2);
	/**
	 * represents a Graph
	 * @exports Graph
	 * @constructor
	 * @memberOf! module:graphTheory
	 */
	function Graph() {
	    /**
	     * the graph's vertices
	     * @type {Vertex[]}
	     */
	    this.vertices = [];
	    /**
	     * the graph's edges
	     * @type {Edge[]}
	     */
	    this.edges = [];
	}
	/**
	 * adds a vertex to the vertices array, if not already contained
	 * @param {Vertex} vertex the new vertex
	 */
	Graph.prototype.addVertex = function (vertex) {
	    if (this.vertices.indexOf(vertex) == -1) {
	        this.vertices.push(vertex);
	    };
	};
	/**
	 * creates a new edge given two vertices
	 * @param {Vertex} sVertex source vertex
	 * @param {Vertex} dVertex destination vertex
	 * @param {Number} weight weight of new edge
	 */
	Graph.prototype.addEdge = function (sVertex, dVertex, weight) {
	    var tempEdge = new Edge(sVertex, dVertex, weight);
	    this.edges.push(tempEdge);
	};
	/**
	 * @param  {Vertex} vertex source vertex
	 * @return {Edge[]} the edges connected to source
	 */
	Graph.prototype.getEdges = function (vertex) {
	    return this.edges.filter(function (tempEdge) {
	        return tempEdge.source == vertex;
	    }, this);
	};
	/**
	 *
	 * @param  {Vertex} sVertex the source vertex
	 * @return {Vertex[]} the neighboring nodes
	 */
	Graph.prototype.getNeighbors = function (sVertex) {
	    var currVertex = sVertex;
	    var currEdges = this.getEdges(currVertex);
	    return currEdges.map(function (tempEdge) {
	        return tempEdge.dest;
	    }, this);
	};
	/**
	 * adds each node connected to an edge to a (depth) path
	 * @param  {Edge} edge  the source edge
	 * @param  {Object} dPath a key value store of node's and distances
	 */
	Graph.prototype.depthVisit = function (edge, dPath) {
	    var dVertex = edge.dest;

	    if (dPath[dVertex.label] == undefined) {
	        dPath[dVertex.label] = {
	            pred: edge.source,
	            pathWeight: dPath[edge.source.label].pathWeight + edge.weight
	        };
	        var destEdges = this.getEdges(dVertex);
	        destEdges.forEach(function (dEdge) {
	            this.depthVisit(dEdge, dPath);
	        }, this);
	    };
	};
	/**
	 * depth first search, adds all connected nodes to vertex (depth) path
	 * @param  {Vertex} initVert inital vertex
	 * @return {Object} a key-value store of nodes and edge distances
	 */
	Graph.prototype.depthSearch = function (initVert) {
	    var initV = initVert;
	    var dPath = {
	        initialVertex: initV
	    };
	    dPath[initV.label] = {
	        pred: null,
	        pathWeight: 0
	    };
	    var currEdges = this.getEdges(initV);
	    currEdges.forEach(function (cEdge) {
	        this.depthVisit(cEdge, dPath);
	    }, this);
	    console.log(dPath);
	    return dPath;
	};
	/**
	 * breadth first search, adds all connected nodes to vertex (breadth) path
	 * @param  {Vertex} initVert inital vertex
	 * @return {Object} a key-value store of nodes and edge distances
	 */
	Graph.prototype.breadthSearch = function (initVert) {
	    var initV = initVert;
	    var bPath = {
	        initialVertex: initVert
	    };
	    bPath[initV.label] = {
	        pred: null,
	        depth: 0
	    };
	    var level = 1;
	    var bQueue = [initV];
	    while (bQueue.length > 0) {
	        var currV = bQueue.shift();

	        var currNeighbors = this.getNeighbors(currV);

	        var frontier = [];
	        currNeighbors.forEach(function function_name(nVertex) {
	            if (bPath[nVertex.label] == undefined) {
	                bPath[nVertex.label] = {
	                    pred: currV,
	                    depth: level
	                };

	                frontier.push(nVertex);
	            };
	        }, this);
	        bQueue = frontier;
	        level++;
	    }
	    console.log(bPath);
	    return bPath;
	};
	/**
	 * check if a path exists between two nodes
	 * @param  {Vertex}  initVert the initial vertex
	 * @param  {Vertex}  termVert the terminal vertex
	 * @return {Boolean} a path exists between the two nodes
	 */
	Graph.prototype.hasPath = function (initVert, termVert) {
	    var bPath = this.breadthSearch(initVert);
	    console.log("hasPath method was called");
	    console.log(bPath);
	    if (bPath[termVert.label] == undefined) {
	        return false;
	    } else if (bPath[termVert.label] != undefined) {
	        return true;
	    };
	};
	/**
	 * performs dijkstras algorithm for shortest paths between two nodes
	 * @param  {Vertex}  initVert the initial vertex
	 * @param  {Vertex}  termVert the terminal vertex
	 * @return {Object} a shortest path between nodes
	 */
	Graph.prototype.dijkstra = function (initVert, termVert) {
	    if (this.hasPath(initVert, termVert) == false) {
	        return false;
	    } else {
	        var reachables = this.breadthSearch(initVert);
	        var inspectionQueue = [initV];
	        var solutionSet = {};
	        solutionSet[initV.label] = {
	            pred: null,
	            pathWeight: 0
	        };
	        while (inspectionQueue.lenght > 0) {
	            var currV = inspectionQueue.shift();
	            var currEdges = this.getEdges(currV);

	            currEdges.forEach(function (tempEdge) {
	                var currWeight = reachables[tempEdge.dest.label].pathWeight;
	                var dijkstraWeight = solutionSet[tempEdge.source.label].pathWeight + tempEdge.weight;
	                if (solutionSet[tempEdge.dest.label] == false) {
	                    inspectionQueue.push(tempEdge.dest);
	                    if (currWeight > dijkstraWeight) {
	                        solutionSet[tempEdge.dest.label] = {
	                            pred: tempEdge.source,
	                            pathWeight: dijkstraWeight
	                        };
	                    } else {
	                        solutionSet[tempEdge.dest.label] = bPath[tempEdge.dest.label];
	                    };
	                }
	            }, this);
	        }
	        return solutionSet;
	    };
	};
	module.exports = Graph;

	/**
	 * [A Graph]{@link module:graphTheory.Graph}
	 * @typedef {module:graphTheory.Graph} Graph
	 */

/***/ }
/******/ ])
});
;