var Edge = require('./edge');
/**
 * represents a Graph
 * @exports Graph
 * @constructor
 * @memberOf! module:graphTheory
 * @property {Vertex[]} vertices the graph's vertices
 * @property {Edge[]} edges the graph's edges
 */
function Graph() {
    this.vertices = [];
    this.edges = [];

}
/**
 * @method module:graphTheory.Graph#addVertex
 * adds a vertex to the vertices array, if not already contained
 * @param {Vertex} vertex the new vertex
 */
Graph.prototype.addVertex = function(vertex) {
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
Graph.prototype.addEdge = function(sVertex, dVertex, weight) {
    var tempEdge = new Edge(sVertex, dVertex, weight);
    this.edges.push(tempEdge);
};
/**
 * @param  {Vertex} vertex source vertex
 * @return {Edge[]} the edges connected to source
 */
Graph.prototype.getEdges = function(vertex) {
    return this.edges.filter(function(tempEdge) {
        return tempEdge.source == vertex;
    }, this);
};
/**
 *
 * @param  {Vertex} sVertex the source vertex
 * @return {Vertex[]} the neighboring nodes
 */
Graph.prototype.getNeighbors = function(sVertex) {
    var currVertex = sVertex;
    var currEdges = this.getEdges(currVertex);
    return currEdges.map(function(tempEdge) {
        return tempEdge.dest;
    }, this);
};
/**
 * adds each node connected to an edge to a (depth) path
 * @param  {Edge} edge  the source edge
 * @param  {Object} dPath a key value store of node's and distances
 */
Graph.prototype.depthVisit = function(edge, dPath) {
    var dVertex = edge.dest;

    if (dPath[dVertex.label] == undefined) {
        dPath[dVertex.label] = {
            pred: edge.source,
            pathWeight: ((dPath[edge.source.label].pathWeight) + edge.weight)
        };
        var destEdges = this.getEdges(dVertex);
        destEdges.forEach(function(dEdge) {
            this.depthVisit(dEdge, dPath);
        }, this);

    };
};
/**
 * depth first search, adds all connected nodes to vertex (depth) path
 * @param  {Vertex} initVert inital vertex
 * @return {Object} a key-value store of nodes and edge distances
 */
Graph.prototype.depthSearch = function(initVert) {
    var initV = initVert;
    var dPath = {
        initialVertex: initV
    };
    dPath[initV.label] = {
        pred: null,
        pathWeight: 0
    };
    var currEdges = this.getEdges(initV);
    currEdges.forEach(function(cEdge) {
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
Graph.prototype.breadthSearch = function(initVert) {
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
Graph.prototype.hasPath = function(initVert, termVert) {
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
Graph.prototype.dijkstra = function(initVert, termVert) {
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

            currEdges.forEach(function(tempEdge) {
                var currWeight = reachables[tempEdge.dest.label].pathWeight;
                var dijkstraWeight = solutionSet[tempEdge.source.label].pathWeight + tempEdge.weight;
                if (solutionSet[tempEdge.dest.label] == false) {
                    inspectionQueue.push(tempEdge.dest);
                    if (currWeight > dijkstraWeight) {
                        solutionSet[tempEdge.dest.label] = {
                            pred: (tempEdge.source),
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