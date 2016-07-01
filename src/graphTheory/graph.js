var Node = require('./node');
var NodeArray = require('./nodeArray');
var Edge = require('./edge');
var EdgeArray = require('./edgeArray');
var Component = require('./component');
var EdgeComponent = require('./edgeComponent');
/**
 * represents a Graph
 * @exports Graph
 * @constructor
 * @memberOf! module:graphTheory
 */
class Graph {
    constructor(nodes = new NodeArray()) {
        /**
         * the graph's nodes
         * @type {NodeArray}
         */
        this.nodes = nodes;
        /**
         * the graph's edges
         * @type {EdgeArray}
         */
        this.edges = new EdgeArray();
        /**
         * the graph's components
         * @type {Component[]}
         */
        this.components = [];
    }
    /**
     * adds a node to the nodes array, if not already contained
     * @param {Node} node the new node
     */
    addNode(node) {
        this.nodes.push(node);
    }
    containsNode(argNode) {
        return this.nodes.contains(argNode);
    }
    removeNode(nodeArg) {
        this.getEdges(nodeArg).forEach(e => this.removeEdge(e));
        this.nodes.removeNode(nodeArg);
    }

    clearNodes() {
        this.nodes.clear();
    }
    /**
     * @param  {Node} nodeArg source node
     * @return {Edge[]} the edges connected to source
     */
    getEdges(nodeArg) {
        return this.edges.filter(tempEdge => tempEdge.containsNode(nodeArg) === true);
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
    containsEdge(argEdge) {
        return this.edges.contains(argEdge);
    }

    removeEdge(argEdge) {
        this.edges.removeEdge(argEdge);
    }
    clearEdges() {
        this.edges.clear();
    }
    /**
     *
     * @param  {Node} nodeArg the source node
     * @return {Node[]} the neighboring nodes
     */
    getNeighbors(nodeArg) {
        return this.edges.getNeighbors(nodeArg);
    }
    /**
     * adds all unvisited nodes in the path to the specified component
     * adds each node connected to an edge to a (depth) path
     * @param  {Map} pathArg  the path to be explored
     * @param  {Component} compArg a key value store of node's and distances
     */
    visitComponent(pathArg, compArg) {
        let nodeArg = [...pathArg.keys()].pop();
        let nextEdges = this.getUnvisitedEdges(nodeArg, compArg);
        if (nextEdges.length === 0) {
            return pathArg;
        } else {
            let predWeight = pathArg.get(nodeArg).pathWeight;
            let predCount = pathArg.get(nodeArg).edgeCount;
            nextEdges.forEach(currEdge => {
                let nabe = currEdge.getNeighbor(nodeArg);
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
     * depth first search, initializes a new component of reachable nodes, and constructs a path to each of those node from the source
     * @param  {Node} initNode inital node
     * @return {Component} a key-value store of nodes and edge distances
     */
    depthTraverse(initNode) {
        let currComponent = new EdgeComponent();
        let path = new Map();
        path.set(initNode, {
            pred: null,
            edgeCount: 0,
            pathWeight: 0
        });
        this.visitComponent(path, currComponent);
        this.addComponent(currComponent);
        return path;
    }
    /**
     * adds a component to the graph if not present
     * @param {Component} compArg [description]
     */
    addComponent(compArg) {
        this.hasIntersectingComponent(compArg) ? this.integrateComponent(compArg) : this.components.push(compArg);
    }
    removeComponent(compArg) {
        let cPos = this.components.findIndex(currComp => currComp.isEquivalent(compArg));
        return cPos > -1 ? this.components.splice(cPos, 1) : compArg;
    }
    /**
     * returns any current components which intersect with the specified component
     * @param  {Component} compArg the component to be checked
     * @return {Component} the first intersecting component
     */
    findIntersectingComponent(compArg) {
        return this.components.find(currComp => currComp.intersects(compArg));
    }

    /**
     * combines the nodes of two intersecting components
     * @param  {Component} origComp
     * @param  {Component} newComp
     */
    mergeComponents(origComp, newComp) {
        return origComp.unionize(newComp);
    }
    /**
     * integrates a component into any of the graphs intersectung components
     * @param  {Component} compArg [description]
     */
    integrateComponent(compArg) {
        let oComp = this.findIntersectingComponent(compArg);
        this.mergeComponents(oComp, compArg);
    }
    /**
     * checks if any current components share nodes with the argument
     * @param  {Component}  compArg [description]
     * @return {Boolean}         [description]
     */
    hasIntersectingComponent(compArg) {
        return this.components.some(currComp => currComp.intersects(compArg));
    }
    /**
     * returns all of the nodes Edges which contain nodes not yet in the specified component
     * @param  {Node} nodeArg [description]
     * @param  {Component} compArg [description]
     * @return {EdgeArray}         [description]
     */
    getUnvisitedEdges(nodeArg, compArg) {
        return this.getEdges(nodeArg).filter(currEdge => {
            var nNode = currEdge.getNeighbor(nodeArg)
            return !compArg.containsNode(nNode);
        });
    }
    /**
     * returns all of the nodes neighbors not yet part od the component
     * @param  {Node} nodeArg [description]
     * @param  {Component} compArg [description]
     * @return {NodeArray}         [description]
     */
    getUnvisitedNeighbors(nodeArg, compArg) {
        return this.getNeighbors(nodeArg).filter(currNodeEntry => !(compArg.containsNode(currNodeEntry)));
    }

    /**
     * breadth first search, recursively adds all immediate neighbors, to a component of nodes reachabe by a initial node
     * @param  {Node} initNode inital node
     * @return {Map} a key-value store of nodes and edge distances
     */

    bfs(initNode) {
        var bComp = new EdgeComponent();
        var bPath = new Map();
        bPath.set(initNode, {
            pred: null,
            pathWeight: 0,
            edgeCount: 0
        });
        var level = 1;
        var bQueue = new NodeArray();
        bQueue.push(initNode);
        while (bQueue.length > 0) {
            var currN = bQueue.shift();
            var currEdges = this.getUnvisitedEdges(currN, bComp);
            var frontier = new NodeArray();
            let predWeight = bPath.get(currN).pathWeight;
            let predCount = bPath.get(currN).edgeCount;
            currEdges.forEach((nEdge) => {
                let nNode = nEdge.getNeighbor(currN);
                bPath.set(nNode, {
                    pred: currN,
                    edgeCount: level,
                    pathWeight: predWeight + nEdge.weight
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
     * performs dijkstras algorithm for shortest paths to all nodes reachabe from initNode
     * @param  {Node}  initNode the initial node
     * @param  {Node}  termNode the terminal node
     * @return {Object} a shortest path between nodes
     */
    dijkstra(initNode) {
        var reachables = this.bfs(initNode);
        var inspectionQueue = new NodeArray(initNode);
        var solutionSet = new Map();
        solutionSet.set(initNode, {
            pred: null,
            edgeCount: 0,
            pathWeight: 0
        });
        while (inspectionQueue.length > 0) {
            var currN = inspectionQueue.shift();
            var currEdges = this.getEdges(currN);

            currEdges.forEach((tempEdge) => {
                let nNode = tempEdge.getNeighbor(currN);
                var rNodeEntry = reachables.get(nNode);
                var currWeight = rNodeEntry.pathWeight;
                var sPred = solutionSet.get(currN);
                var dijkstraWeight = sPred.pathWeight + tempEdge.weight;
                var dMap = {
                    pred: currN,
                    edgeCount: sPred.edgeCount + 1,
                    pathWeight: dijkstraWeight
                };
                var sMap = (dijkstraWeight < currWeight) ? dMap : rNodeEntry;
                if (!solutionSet.has(nNode)) {
                    inspectionQueue.push(nNode);
                    solutionSet.set(nNode, sMap);
                }
            });
        }
        return solutionSet;
    }
    /**
     * composes the shortest path between two nodes by backtracing dijkstra's pred attirbute
     * @param  {Node} initNode [description]
     * @param  {Node} termNode [description]
     * @return {Map}  path of nodes
     */
    shortestPath(initNode, termNode) {
        if (!this.hasPath(initNode, termNode)) {
            return false;
        } else {
            let dijkMap = this.dijkstra(initNode);
            let currN = termNode;
            let currEntry = dijkMap.get(currN);
            let predN = currEntry.pred;
            let path = new Map();

            while (currN != initNode) {
                path.set(currN, currEntry);
                currN = predN;
                currEntry = dijkMap.get(currN);
                predN = currEntry.pred;
            }

            return path;
        }
    }

};
module.exports = Graph;
/**
 * [A Graph]{@link module:graphTheory.Graph}
 * @typedef {module:graphTheory.Graph} Graph
 */