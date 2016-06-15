var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
var EdgeArray = require('./edgeArray');
var Component = require('./component');
var EdgeComponent = require('./edgeComponent');
// var Edge = require('./edge');
// var DirectedEdge = require('./directedEdge');
/**
 * represents a Graph
 * @exports Graph
 * @constructor
 * @memberOf! module:graphTheory
 */
class Graph {
    constructor() {
        /**
         * the graph's nodes
         * @type {Node[]}
         */
        this.nodes = new NodeArray();
        /**
         * the graph's edges
         * @type {Edge[]}
         */
        this.edges = new EdgeArray();
        this.components = [];
    }
    /**
     * adds a node to the nodes array, if not already contained
     * @param {Node} node the new node
     */
    addNode(node) {
        this.nodes.push(node);
    }
    /**
     * creates a new edge given two nodes
     * @param {Node} sNode source node
     * @param {Node} dNode destination node
     * @param {Number} weight weight of new edge
     */
    addEdge(sNode, dNode, weight) {
        var tempEdge = new Edge(sNode, dNode, weight);
        this.edges.push(tempEdge);
    }
    /**
     * @param  {Node} node source node
     * @return {Edge[]} the edges connected to source
     */
    getEdges(nodeArg) {
        return this.edges.filter(tempEdge => tempEdge.containsNode(nodeArg) === true);
    }
    /**
     *
     * @param  {Node} sNode the source node
     * @return {Node[]} the neighboring nodes
     */
    getNeighbors(nodeArg) {
        return this.getEdges(nodeArg).map(tempEdge => tempEdge.getNeighbor(nodeArg));
    }
    /**
     * adds each node connected to an edge to a (depth) path
     * @param  {Edge} edge  the source edge
     * @param  {Object} dPath a key value store of node's and distances
     */
    depthVisit(edge, dPath) {
        var dNode = edge.nodes.find(currNode => dPath[currNode.label] == undefined);
        if (dNode) {
            var predNode = edge.getNeighbor(dNode);
            dPath[dNode.label] = {
                pred: predNode,
                pathWeight: ((dPath[predNode.label].pathWeight) + edge.weight)
            };
            this.getEdges(dNode).forEach(dEdge => this.depthVisit(dEdge, dPath));
        };
        return dPath;
    }
    /**
     * depth first search, adds all connected nodes to node (depth) path
     * @param  {Node} initNode inital node
     * @return {Object} a key-value store of nodes and edge distances
     */
    depthSearch(initNode) {
        var initNode = initNode;
        var dPath = {
            initialNode: initNode
        };
        dPath[initNode.label] = {
            pred: null,
            pathWeight: 0
        };
        var currEdges = this.getEdges(initNode);
        currEdges.forEach(currEdge => this.depthVisit(currEdge, dPath));
        return dPath;
    }
    addComponent(compArg) {
        // if (!this.hasIntersectingComponent(compArg)) {
        //     this.components.push(compArg);
        // }
        this.hasIntersectingComponent(compArg) ? this.intergrateComponent(compArg) : this.components.push(compArg);
    }
    findIntersectingComponent(compArg) {
        return this.components.find(currComp => currComp.intersects(compArg) === true);
    }
    mergeComponents(origComp, newComp) {
        origComp.unionize(newComp);
    }
    intergrateComponent(compArg) {
        var oComp = this.findIntersectingComponent(compArg);
        this.mergeComponents(oComp, compArg);
    }
    hasIntersectingComponent(compArg) {
        return this.components.some(currComp => currComp.intersects(compArg));
    }
    depthTraverse(initNode) {
        var currComponent = new EdgeComponent();
        var path = new Map();
        path.set(initNode, {
            pred: null,
            pathWeight: 0
        });
        var currEdges = this.getEdges(initNode);
        currEdges.forEach(currEdge => {
            var nabe = currEdge.getNeighbor(initNode);
            currComponent.addEdge(currEdge);
            path.set(nabe, {
                pred: initNode,
                pathWeight: 0
            });

            this.visitComponent(path, currComponent);
        });
        this.addComponent(currComponent);
        return currComponent;
    }
    getUnvisitedEdges(nodeArg, compArg) {
        // var unnabe = this.getUnvisitedNeighbors(nodeArg, compArg);
        return this.getEdges(nodeArg).filter(currEdge => {
            var nNode = currEdge.getNeighbor(nodeArg)
            return !compArg.containsNode(nNode);
            // return unnabe.indexOf(nNode) > -1;
        });
    }
    getUnvisitedNeighbors(nodeArg, compArg) {
        return this.getNeighbors(nodeArg).filter(currNode => !(compArg.containsNode(currNode)));
    }
    visitComponent(pathArg, compArg) {

        var nodeArg = [...pathArg.keys()].pop();
        var nb = this.getNeighbors(nodeArg);
        var nabeArray = NodeArray.of(...nb);
        var diffNabez = compArg.nodes.difference(nabeArray);
        var nextEdges = this.getUnvisitedEdges(nodeArg, compArg);
        if (nextEdges.length === 0) {
            return compArg;
        } else {
            console.log(nextEdges);

            nextEdges.forEach(currEdge => {
                var nabe = currEdge.getNeighbor(nodeArg);
                compArg.addEdge(currEdge);
                pathArg.set(nabe, {
                    pred: nodeArg,
                    pathWeight: (pathArg.get(nodeArg).pathWeight + currEdge.weight)
                });
                this.visitComponent(pathArg, compArg);
            });
        }
    }
    /**
     * breadth first search, adds all connected nodes to node (breadth) path
     * @param  {Node} initNode inital node
     * @return {Object} a key-value store of nodes and edge distances
     */
    breadthSearch(initNode) {
        var initNode = initNode;
        var bPath = {
            initialNode: initNode
        };
        bPath[initNode.label] = {
            pred: null,
            depth: 0
        };
        var level = 1;
        var bQueue = [initNode];
        while (bQueue.length > 0) {
            var currV = bQueue.shift();
            var currNeighbors = this.getNeighbors(currV);
            var frontier = [];
            currNeighbors.forEach(function(nNode) {
                if (bPath[nNode.label] == undefined) {
                    bPath[nNode.label] = {
                        pred: currV,
                        depth: level
                    };
                    frontier.push(nNode);
                };
            }, this);
            bQueue = frontier;
            level++;
        }
        return bPath;
    }
    bfs(initNode) {
        var initNode = initNode;
        var bComp = new EdgeComponent();
        var level = 1;
        var bQueue = new NodeArray();
        bQueue.push(initNode);
        while (bQueue.length > 0) {
            var currV = bQueue.shift();
            var currEdges = this.getEdges(currV);
            var frontier = new NodeArray();
            currEdges.forEach((nEdge) => {
                if (!bComp.containsEdge(nEdge)) {
                    bComp.addEdge(nEdge);
                    frontier.push(nEdge.getNeighbor(currV));
                }
            });
            bQueue = frontier;
            level++;
        }
        return bComp;
    }
    /**
     * check if a path exists between two nodes
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Boolean} a path exists between the two nodes
     */
    hasPath(initNode, termNode) {
        var bPath = this.breadthSearch(initNode);
        return bPath[termNode.label] ? true : false;
    }
    /**
     * performs dijkstras algorithm for shortest paths between two nodes
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Object} a shortest path between nodes
     */
    dijkstra(initNode, termNode) {
        if (this.hasPath(initNode, termNode) == false) {
            return false;
        } else {
            var reachables = this.breadthSearch(initNode);
            var inspectionQueue = [initNode];
            var solutionSet = {};
            solutionSet[initNode.label] = {
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
        }
    }
};
module.exports = Graph;
/**
 * [A Graph]{@link module:graphTheory.Graph}
 * @typedef {module:graphTheory.Graph} Graph
 */