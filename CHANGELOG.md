## Changelog
## 4.0.0-alpha – 2016-07-09 
### Added
* RobustArray module acts as a mixin for set theory methods
* RobustArray#SetifyType(BaseType) creates a set of out a base type of elements
* NodeArray extends RobustArray with Node

###Changed


## 3.0.1-alpha – 2016-07-03 
### Added
* Graph#containsComponent checks for equivalent components
* Graph#createEdge creates a new Edge between nodes

###Changed
* Graph#addComponent checks for components are not equivalent
* Graph#addEdge imports nodes and then pushes the edge
* Graph#clearNodes removes all edges first then clears node array


## 3.0.0-alpha – 2016-07-02
### Added
* Node#setlabel with random number
* Node#isEquivalent checks label
* NodeArray#hasSameSize
* NodeArray#isEquivalent
* NodeArray#filter, #slice, #splice, #concat coerce return type to NodeArray
* NodeArray#removeNode, #copy
* Edge#setLabel for more flexible subclassing
* EdgeArray#filter, #slice, #splice, and #concat return subclass
* EdgeArray#edgeByNodes retrives an edge containing both nodes
* EdgeArray#edgeByArray retrives all edges containing the specified nodes
* EdgeArray#edgesWithNode retrives all edge containing a specific node
* EdgeArray#removeEdge, #copy
* Graph#add, #contains, #remove, and #clear for both edges and nodes
* Graph#pathNodes to retrieve NodeArray from path keys
* Graph#depthFirstSearch -> #dfs
* Graph#visitPath
* Graph#subGraphByEdges for multiple explorations of a set of node connections
* Graph#subGraphByNodes for connectionless explorations of a set of nodes

### Changed
* Graph class delegates many methods to Arrayv subclasses
* Graph#getUnvisitedNeighbors refactored to use NodeArray#difference
* Edge#isEquivalent now checks by nodeArray instead of label
* Node#isIdentical -> isEquivalent
* NodeArray#difference no longer returns symmetrical difference
* NodeArray#unionize utilizes new difference
* NodeArray#isSubSet, #hasSameSize, #isEquivalent
* EdgeArray#isSubSet, #hasSameSize, #isEquivalent
* NodeArray#unionize returns modified nodeArray
* NodeArray#push returns the array object
* NodeArray#nodeComplement returns a nodearray without specified node
* EdgeArray#difference no longer returns symmetrical difference
* EdgeArray#unionize utilizes new difference
* EdgeArray#excludeNode returns the neighbor as an array
* EdgeArray#push returns the array object


### Deprecated

### Removed
* Graph#visitComponent
* Graph#depthTraverse
* Component and EdgeComponent classes completely replaced by NodeArray


## 2.1.0-alpha – 2016-06-16
### Added
* Graph.dijkstra() now assembles shortest path to all nodes
* Graph.shortestPath() via 
* Graph.bfs & depthTraverse methods
* Component classes to check dynamic connectivity.

### Changed
* methods to use es6 syntax

### Deprecated
* Graph.depthSearch

### Removed
* Graph.depthSearch(),depthVisit(), and breadthSearch()
* Vertex class
