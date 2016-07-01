describe('Graph', function() {
    const GR = require('../src/graphTheory');
    const Graph = GR.Graph;
    describe('delegated to subarray', () => {
        let laV, nyV, bostonV, tampaV, myGraph;
        beforeEach(function() {
            myGraph = new Graph();
            bostonV = new GR.Node("boston");
            nyV = new GR.Node("ny");
            laV = new GR.Node("la");
            tampaV = new GR.Node("tampa");
            myGraph.addNode(bostonV);
            myGraph.addNode(tampaV);
            myGraph.addNode(nyV);
            myGraph.addNode(laV);
            myGraph.addEdge(nyV, laV);
            myGraph.addEdge(nyV, tampaV);
        });

        describe('NodeArray', function() {
            describe('addNode', function() {
                it('appends a vertex to the nodes array', function() {
                    let newNode = new GR.Node("anon");
                    myGraph.addNode(newNode);
                    expect(myGraph.nodes).toContain(newNode);
                });
            });
            describe('containsNode()', () => {
                it('checks if any of the elements are equivalent to that provided', function() {
                    expect(myGraph.containsNode(bostonV)).toBeTrue();
                });
            });
            describe('#clearNodes', function() {
                it('clears the nodes arrays', function() {
                    myGraph.clearNodes();
                    expect(myGraph.nodes).toBeEmptyArray();
                });
            });
            describe('#removeNode(nArg)', () => {
                it('removes all edges attached to specified node ', function() {
                    let ela = myGraph.getEdges(nyV);
                    myGraph.removeNode(laV);
                    expect(myGraph.getEdges(nyV).length).toEqual(ela.length - 1);
                });
                it('removes a node from the array', function() {
                    myGraph.removeNode(laV);
                    expect(myGraph.containsNode(laV)).toBeFalse();
                });
            });
        });
        describe('edge mutations', () => {
            let tempEdge;
            beforeEach(function() {
                tempEdge = new GR.Edge(bostonV, tampaV, 10);
            });
            describe('addEdge', function() {
                it('appends a new edge to the edges array', function() {
                    myGraph.addEdge(bostonV, tampaV, 10);
                    expect(myGraph.edges).toContain(tempEdge);
                });
            });
            describe('#containsEdge(earg)', () => {
                it('checks if an equivalent egde is present in the graph', function() {
                    myGraph.addEdge(bostonV, tampaV, 10);
                    expect(myGraph.containsEdge(tempEdge)).toBeTrue();
                });
            });
            describe('#removeEdge()', () => {
                it('removes the edge from the edges array', function() {
                    myGraph.addEdge(bostonV, tampaV, 10);
                    myGraph.removeEdge(tempEdge);
                    expect(myGraph.edges).not.toContain(tempEdge);
                });
            });
            describe('#clearEdges', function() {
                it('clears the edges arrays', function() {
                    myGraph.addEdge(bostonV, tampaV);
                    myGraph.clearEdges();
                    expect(myGraph.edges).toBeEmptyArray();
                });
            });
            describe('getEdges ', function() {
                it('returns all edges with a particular source Node ', function() {
                    let nytam = new GR.Edge(nyV, tampaV);
                    expect(myGraph.getEdges(nyV)).toContain(nytam);
                });
            });
            describe('getNeighbors', function() {
                it('returns all nodes adjacent to a given vertex', function() {
                    expect(myGraph.getNeighbors(nyV)).toContain(tampaV);
                });
            });
        });
    });
    describe('major functions', function() {
        let myGraph, myNodes, v1, v2, v3, v4, v5;
        beforeEach(function() {
            v1 = new GR.Node("v1");
            v2 = new GR.Node("v2");
            v3 = new GR.Node("v3");
            v4 = new GR.Node("v4");
            v5 = new GR.Node("v5");
            v6 = new GR.Node("v6");
            v7 = new GR.Node("v7");
            v8 = new GR.Node("v8");
            myNodes = GR.NodeArray.of(v1, v2, v3, v4, v5, v6, v7, v8);
            myGraph = new Graph(myNodes);
            myGraph.addEdge(v1, v2, 2);
            myGraph.addEdge(v2, v3, 4);
            myGraph.addEdge(v3, v4, 6);
            myGraph.addEdge(v4, v5, 8);
            myGraph.addEdge(v5, v1, 10);
            myGraph.addEdge(v6, v1, 10);
            myGraph.addEdge(v7, v8, 10);
        });
        describe('conncted components', function() {});

        describe('hasPath', function() {
            it('determines if a path exists between to nodes in a graph', function() {
                let result = myGraph.hasPath(v1, v3);
                expect(myGraph.hasPath(v1, v3)).toBeTrue();
            });
        });
        describe('traversals', () => {
            let testNode, testNabe, testEdge, testComp;
            beforeEach(function() {
                testNode = myGraph.nodes[0];
                testNabe = myGraph.getNeighbors(testNode)[0];
                testEdge = myGraph.edges[0];
                secondEdge = myGraph.edges[1];
                testComp = new GR.EdgeComponent();
                altComp = new GR.EdgeComponent()
                testComp.addEdge(testEdge);
                altComp.addEdge(testEdge);
                altComp.addEdge(secondEdge);
                myGraph.addEdge(v2, v3, 4);
                myGraph.addEdge(v2, v4, 6);
                myGraph.addEdge(v2, v5, 8);
                myGraph.addEdge(v2, v1, 10)
            });
            describe('addComponent(compArg)', () => {
                describe('when component is unique/has no intersecting components', () => {
                    it('adds a component to the components array', function() {
                        myGraph.addComponent(testComp);
                        expect(myGraph.components.length).toEqual(1);
                    });
                });
                describe('when an intersecting component is present', () => {
                    it('integrates the new component with the current', function() {
                        myGraph.addComponent(testComp);
                        myGraph.addComponent(altComp);
                        expect(myGraph.components.length).toEqual(1);
                    });
                });
            });
            describe('depthTraverse(initNode)', () => {
                it('returns a path[Map] containing all nodes reachable via initNode', function() {
                    myGraph.depthTraverse(v2);
                    expect(myGraph.depthTraverse(v2) instanceof Map).toBeTruthy();
                });
                describe('retun values', () => {
                    let dfsKeys;
                    beforeEach(function() {
                        dfsKeys = myGraph.depthTraverse(v2).get(v1);
                    });
                    it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                        expect(dfsKeys).toBeObject();
                    });
                    it('has a pred[Node/null] value', function() {
                        expect(dfsKeys.pred instanceof GR.Node).toBeTrue();
                    });
                    it('has a edgeCount[Number] value', function() {
                        expect(dfsKeys.edgeCount).toBeNumber();
                    });
                    it('has a pathWeight[Number] value', function() {
                        expect(dfsKeys.pathWeight).toBeNumber();
                    });
                });
                it('augments or adds a component to the array', function() {
                    myGraph.depthTraverse(v2);
                    expect(myGraph.components.length).toEqual(1);
                });
            });
            describe('getUnvisitedEgdes(nodeArg,compArg)', function() {
                it('returns all edges not yet included in the given component', function() {
                    expect(myGraph.getUnvisitedEdges(testNode, testComp)).toBeArray();
                });
            });
            describe('visitComponent(nodeArg, compArg)', () => {
                it('returns a component containing all nodes reachable from init', function() {
                    let dPath = myGraph.depthTraverse(v2);
                    let dComp = myGraph.components[0];
                    expect(myGraph.visitComponent(dPath, dComp) instanceof Map).toBeTrue();
                });
            });
            describe('hasIntersectingComponent(compArg)', () => {
                it('returns a boolena regarding any connecting components already present', function() {
                    myGraph.addComponent(altComp);
                    expect(myGraph.hasIntersectingComponent(altComp)).toBeTrue();
                });
            });
            describe('findIntersectingComponent(compArg)', function() {
                it('returns the component intersecting with the specified compArg', function() {
                    myGraph.addComponent(testComp);
                    myGraph.addComponent(altComp);
                    expect(myGraph.findIntersectingComponent(altComp)).toEqual(testComp);
                });
            });
            describe('mergeComponents)origComp, newComp)', function() {
                it('unionizes the two components', function() {
                    myGraph.mergeComponents(testComp, altComp);
                    expect(testComp.edges).toContain(secondEdge);
                });
            });
            describe('integrateComponent(compArg)', function() {
                it('find an intersecting component and mergess it with compArg', function() {
                    myGraph.addComponent(testComp);
                    myGraph.addComponent(altComp);
                    myGraph.integrateComponent(altComp);
                    myGraph.bfs(v3);
                    expect(testComp.edges).toContain(secondEdge);
                });
            });
            describe('bfs(initNode)', () => {
                it('returns a path[Map] of nodes reachable in BreadthFirstSearch', function() {
                    expect(myGraph.bfs(v2) instanceof Map).toBeTrue();
                });
                describe('retun values', () => {
                    let bfsKeys;
                    beforeEach(function() {
                        bfsKeys = myGraph.bfs(v2).get(v1);
                    });
                    it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                        expect(bfsKeys).toBeObject();
                    });
                    it('has a pred[Node/null] value', function() {
                        expect(bfsKeys.pred instanceof GR.Node).toBeTrue();
                    });
                    it('has a edgeCount[Number] value', function() {
                        expect(bfsKeys.edgeCount).toBeNumber();
                    });
                    it('has a pathWeight[Number] value', function() {
                        expect(bfsKeys.pathWeight).toBeNumber();
                    });
                });
            });
        });
        describe('dijkstra', function() {
            it('returns the shortest path[Map]`` from initNode to all nodes reachable from initNode', function() {
                expect(myGraph.dijkstra(v1, v2) instanceof Map).toBeTrue();
            });
            describe('retun values', () => {
                let dijkKeys;
                beforeEach(function() {
                    dijkKeys = myGraph.dijkstra(v1, v2).get(v5);
                });
                it('maps the values to an object with keys for predecessor(pred), edgeCount, and pathWeight', function() {
                    expect(dijkKeys).toBeObject();
                });
                it('has a pred[Node/null] value', function() {
                    expect(dijkKeys.pred instanceof GR.Node).toBeTrue();
                });
                it('has a edgeCount[Number] value', function() {
                    expect(dijkKeys.edgeCount).toBeNumber();
                });
                it('has a pathWeight[Number] value', function() {
                    expect(dijkKeys.pathWeight).toBeNumber();
                });
            });
        });
        describe('shortestPath(initNode,termNode)', () => {
            it('reutns the dijkstra entry for the termNode', function() {
                expect(myGraph.shortestPath(v1, v2) instanceof Object).toBeTrue();
            });
        });
    });
});