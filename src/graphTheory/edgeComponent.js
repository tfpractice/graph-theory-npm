// var Node = require('./node');
// var NodeArray = require('./nodeArray');
// var Edge = require('./directedEdge');
// var EdgeArray = require('./edgeArray');
// /**
//  * represents a set of Connected Edges
//  * @exports EdgeComponent
//  * @constructor
//  * @memberOf! module:graphTheory
//  */
// class EdgeComponent {
//     constructor() {
//         /**
//          * the Egdes in this component
//          * @type {EdgeArray}
//          */
//         this.edges = new EdgeArray();
//         /**
//          * The nodes in this component
//          * @type {NodeArray}
//          */
//         this.nodes = new NodeArray();
//         /**
//          * the number of nodes in this components
//          * @type {Number}
//          */
//         this.arity = 0;

//     }
//     /**
//      * sets the arity to the length of the nodes array
//      */
//     resetArity() {
//         this.arity = this.nodes.length;
//     }
//     /**
//      * composes all of the edges nodes into one large array
//      * @return {NodeArray}
//      */
//     getNodes() {
//         return this.edges.getNodes();
//     }
//     /**
//      * resets the nodes array based on the edges
//      */
//     updateNodes() {
//         this.nodes = this.getNodes();
//         this.resetArity();

//     }
//     /**
//      * checks for presence of an edge in this component
//      * @param  {Edge} edgeArg
//      * @return {Boolean}
//      */
//     containsEdge(edgeArg) {
//         return this.edges.contains(edgeArg);
//     }
//     /**
//      * checks this component for the presence of a node
//      * @param  {Node} nodeArg
//      * @return {Boolean}
//      */
//     containsNode(nodeArg) {
//         return this.nodes.contains(nodeArg);
//     }
//     /**
//      * adds an edge and its nodes to this component
//      * @param {Edge} edgeArg [description]
//      */
//     addEdge(edgeArg) {
//         this.edges.push(edgeArg);
//         this.updateNodes();
//     }
//     /**
//      * gets the nodes of each edge
//      * @return {NodeArray}
//      */
//     nodeMap() {
//         return this.edges.map(currEdge => currEdge.nodes);
//     }
//     /**
//      * returns an array shared edges between two sets
//      * @param  {Component} compArg the component to check
//      * @return {EdgeArray} the shared edges
//      */
//     intersects(compArg) {
//         return this.edges.intersects(compArg.edges);
//     }
//     /**
//      * returns an array shared nodes between two components
//      * @param  {Component} compArg the component to check
//      * @return {EdgeArray} the shared edges
//      */
//     intersection(compArg) {
//         return this.nodes.intersection(compArg.nodes);
//     }
//     /**
//      * returns an array nodes in this array not included in the alternate array
//      * @param  {Component} compArg the component to check
//      * @return {NodeArray} the unshared nodes
//      */
//     difference(compArg) {
//         return this.nodes.difference(compArg.nodes);
//     }
//     /**
//      * returns a combined array of edges belonging to this and the alternate arrays
//      * @param  {Component} compArg the component to check
//      * @return {EdgeArray} the edges
//      */
//     union(compArg) {
//         return this.edges.union(compArg.edges);
//     }
//     /**
//      * combines all the edges into this Component
//      * @param  {Component} compArg the component to check
//      */
//     unionize(compArg) {
//         this.edges.unionize(compArg.edges);
//         this.updateNodes();

//     }

// }
// module.exports = EdgeComponent;
// /**
//  * [An EdgeComponent]{@link module:graphTheory.EdgeComponent}
//  * @typedef {module:graphTheory.EdgeComponent} EdgeComponent
//  */