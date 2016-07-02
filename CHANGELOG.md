## Changelog 

## 2.2.0-alpha – 2016-29-16
### Added
* Node#setlabel with random number
* Node#isIdentical checks label
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
* Graph#depthFirstSearch
* Graph#visitPath

### Changed
* Graph class delegates many methods to Arrayv subclasses
* Graph#getUnvisitedNeighbors refactored to use NodeArray#difference
* Edge#isEquivalent now checks by nodeArray instead of label
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
* Component and EdgeComponent completely replaced by NodeArray


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
