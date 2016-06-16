# graph-theory-npm (v2.0.0-alpha)
=========
A Node.js library implementation of basic graph theory.

This packages provides a number of classes that facilitate exploring graph based data-structures and algorithms.

## Installation

  npm install git://github.com/tfpractice/graph-theory-npm.git --save

## Usage

     The three primary classes in the library are Node, Graph, and Edge, which can provide useful functionlaity when determining relationships between a multifaceted set of related objects.


### Nodes
    Nodes are instantiated with a label attribute (for identification) and a data attribute (for extensibility with your own classes).
    For Example, consider tracking a dataset containing related city objects each with a population attribute. These could be modeled like so:

    var GT = require('graph-theory-npm'),
      mwk = new GT.node("milwaukee",{population:3.3}),
      phil = new GT.Node("philadelphia",{population:2.7}),
      nyc = new GT.Node("new york city",{population:8});

    These three nodes now exist independent of each other until brought together by edges.

### Edges
    Edges provide a relation between two nodes, and can be given a certain "weight". In this example, the weight could act as a distance between them.
    
    var mw_p = new GT.Edge(mwk, phil, 400),
        p_nyc = new GT.Edge(phil, nyc, 200),
        nyc_mwk = new GT.Edge(nyc, mwk, 500);

     These entities are also separate, and can be brought together using the Graph Class. Allowing multiple Graphs to be formed from the same set of noes from different prespectives.

### Graph
    The Graph class is basically a connection of Nodes and Edges with methods that allow traversal in a certain order/fashion. Graphs are initialized with NodeArray and EdgeArray attributes to work as a set. New Nodes can be added via the AddNode() methods, and new edges can be established, by passing related nodes and their weight value.

    var geoGraph = new GT.Graph();
    geoGraph.addNode(nyc);
    geoGraph.addNode(mwk);
    geoGraph.addNode(phil);

    geoGraph.addEdge(mwk, phil, 400),
    geoGraph.addEdge(phil, nyc, 200),
    geoGraph.addEdge(nyc, mwk, 500);

    Given an initial node can be traversed via bfs(breadthFirstSearch) depthTraverse(depthFirstSearch) and dijkstra(shortestPath)

    geoGraph.depthTravers(nyc);
    geoGraph.bfs(phil);
    geoGraph.dijkstra(mwk);





  var html = '<h1>Hello World</h1>',
      escaped = escape(html),
      unescaped = unescape(escaped);

  console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);

## Tests (via Jasmine)

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
* 2.0.0-alpha 
** Transitions from function based class declaration to ES6 class syntax
** Implements nodeArray and EdgeArray as native Array extensions
** Adds Component class for exploiring dynamic connectivity. 
