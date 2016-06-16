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
            edgeCount: 0,
            pathWeight: 0
        });
        this.visitComponent(path, currComponent);
        this.addComponent(currComponent);
        return path;
    }
    getUnvisitedEdges(nodeArg, compArg) {
        return this.getEdges(nodeArg).filter(currEdge => {
            var nNode = currEdge.getNeighbor(nodeArg)
            return !compArg.containsNode(nNode);
        });
    }
    getUnvisitedNeighbors(nodeArg, compArg) {
        return this.getNeighbors(nodeArg).filter(currNode => !(compArg.containsNode(currNode)));
    }
    visitComponent(pathArg, compArg) {
        var nodeArg = [...pathArg.keys()].pop();
        var nextEdges = this.getUnvisitedEdges(nodeArg, compArg);
        if (nextEdges.length === 0) {
            return pathArg;
        } else {
            let predWeight = pathArg.get(nodeArg).pathWeight;
            let predCount = pathArg.get(nodeArg).edgeCount;
            nextEdges.forEach(currEdge => {
                var nabe = currEdge.getNeighbor(nodeArg);
                compArg.addEdge(currEdge);
                pathArg.set(nabe, {
                    pred: nodeArg,
                    edgeCount: predCount + 1,
                    pathWeight: predWeight + currEdge.weight
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
            var currN = bQueue.shift();
            var currNeighbors = this.getNeighbors(currN);
            var frontier = [];
            currNeighbors.forEach(function(nNode) {
                if (bPath[nNode.label] == undefined) {
                    bPath[nNode.label] = {
                        pred: currN,
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
        var bComp = new EdgeComponent();
        var bPath = new Map();
        bPath.set(initNode, {
            pred: null,
            depth: 0
        });
        var level = 1;
        var bQueue = new NodeArray();
        bQueue.push(initNode);
        while (bQueue.length > 0) {
            var currN = bQueue.shift();
            var currEdges = this.getUnvisitedEdges(currN, bComp);
            var frontier = new NodeArray();
            currEdges.forEach((nEdge) => {
                let nNode = nEdge.getNeighbor(currN);
                bPath.set(nNode, {
                    pred: currN,
                    depth: level
                });
                bComp.addEdge(nEdge);
                frontier.push(nNode);
            });
            bQueue = frontier;
            level++;
        }
        this.addComponent(bComp);
        return bPath;
    }
    /**
     * check if a path exists between two nodes
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Boolean} a path exists between the two nodes
     */
    hasPath(initNode, termNode) {
        var bPath = this.bfs(initNode);
        return bPath.has(termNode);
    }
    /**
     * performs dijkstras algorithm for shortest paths between two nodes
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Object} a shortest path between nodes
     */
    dijkstra(initNode, termNode) {
        if (this.hasPath(initNode, termNode) === false) {
            return false;
        } else {
            // var reachables = this.breadthSearch(initNode);
            var reachables = this.depthTraverse(initNode);
            var inspectionQueue = new NodeArray();
            inspectionQueue.push(initNode);
            // var solutionSet = {};
            var solutionSet = new Map();
            solutionSet.set(initNode, {
                pred: null,
                pathWeight: 0
            });
            // solutionSet[initNode.label] = {
            //     pred: null,
            //     pathWeight: 0
            // };
            while (inspectionQueue.length > 0) {
                var currN = inspectionQueue.shift();
                var currEdges = this.getEdges(currN);

                currEdges.forEach(function(tempEdge) {
                    let nNode = tempEdge.getNeighbor(currN);
                    var rPred = reachables.get(nNode).pred;
                    var rNode = reachables.get(nNode);
                    var sPred = solutionSet.get(currN);


                    // var pathMap = new Map();


                    // var currWeight = reachables[tempEdge.dest.label].pathWeight;
                    var currWeight = rNode.pathWeight;
                    // var dijkstraWeight = solutionSet[tempEdge.source.label].pathWeight + tempEdge.weight;
                    var dijkstraWeight = sPred.pathWeight + tempEdge.weight;
                    var possibleWeights = [currWeight, dijkstraWeight];
                    var smallerWeight = Math.min(...possibleWeights);

                    var rMap = {
                        pred: rPred,
                        pathWeight: rNode.pathWeight
                    };
                    var dMap = {
                        pred: currN,
                        pathWeight: dijkstraWeight
                    };
                    var sMap = (dijkstraWeight < currWeight) ? dMap : rMap;
                    // var betterPred = dPath
                    // if (solutionSet[tempEdge.dest.label] == false) {
                    if (!solutionSet.has(nNode)) {
                        inspectionQueue.push(nNode);
                        solutionSet.set(nNode, sMap);

                    }
                    // console.log('************');
                    // console.log(nNode);
                    // console.log(solutionSet.get(nNode))
                }, this);
            }
            // console.log(solutionSet);
            return solutionSet;

        }
    }
};
module.exports = Graph;
/**
 * [A Graph]{@link module:graphTheory.Graph}
 * @typedef {module:graphTheory.Graph} Graph
 */