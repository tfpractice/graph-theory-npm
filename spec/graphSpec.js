describe('Graph', function() {
    var GR = require('../src/graphTheory');
    var myGraph;
    var bostonV;
    beforeEach(function() {
        myGraph = new GR.Graph();
        bostonV = new GR.Node("boston");
        tampaV = new GR.Node("tampa");
        myGraph.addNode(bostonV);
        myGraph.addNode(tampaV);
    });
    describe('addNode', function() {
        it('appends a vertex to the nodes array', function() {
            var newNode = new GR.Node("anon");
            myGraph.addNode(newNode);
            expect(myGraph.nodes).toContain(newNode);
        });
    });
    describe('addEdge', function() {
        it('appends a new edge to the edges array', function() {
            var tempEdge = new GR.Edge(bostonV, tampaV, 10);
            myGraph.addEdge(bostonV, tampaV, 10);
            expect(myGraph.edges).toContain(tempEdge);
        });
    });
    describe('major functions', function() {
        var v1, v2, v3, v4, v5;
        beforeEach(function() {
            v1 = new GR.Node("v1");
            v2 = new GR.Node("v2");
            v3 = new GR.Node("v3");
            v4 = new GR.Node("v4");
            v5 = new GR.Node("v5");
            myGraph.addEdge(v1, v2, 2);
            myGraph.addEdge(v2, v3, 4);
            myGraph.addEdge(v3, v4, 6);
            myGraph.addEdge(v4, v5, 8);
            myGraph.addEdge(v5, v1, 10);
        });
        describe('getEdges ', function() {
            it('returns all edges with a particular source Node ', function() {
                var e12 = myGraph.edges[0];
                expect(myGraph.getEdges(v1)).toContain(e12);
            });
        });
        describe('getNeighbors', function() {
            it('returns all nodes adjacent to a given vertex', function() {
                expect(myGraph.getNeighbors(v1)).toContain(v2);
            });
        });
        describe('depthSearch', function() {
            it('returns an object recording each reachable vertex from a given source', function() {
                expect(myGraph.depthSearch(v1)).toBeObject();
            });
        });
        describe('depthVisit', function() {
            it('visits all the adjacent nodes and places them into an object', function() {
                var vEdge = myGraph.getEdges(v1)[0];
                var dPath = {
                    v1: {
                        pred: null,
                        pathWeight: 0
                    }
                };
                expect(myGraph.depthVisit(vEdge, dPath)).toBeObject();

            });

        });
        describe('breadthSearch', function() {
            it('retunrs an object containgin all nodes reachable from a given vertex ', function() {
                expect(myGraph.breadthSearch(v1)).toBeObject();
            });
        });
        describe('hasPath', function() {
            it('determines if a path exists between to nodes in a graph', function() {
                var result = myGraph.hasPath(v1, v3);
                expect(myGraph.hasPath(v1, v3)).toBeTrue();
            });
        });
        describe('travesals', () => {
            var testNode, testNabe, testEdge, testComp;
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
                    it('intergrates the new component with the current', function() {
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
                    var dfsKeys;
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
                    var dPath = myGraph.depthTraverse(v2);
                    var dComp = myGraph.components[0];
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
            describe('intergrateComponent(compArg)', function() {
                it('find an intersecting component and mergess it with compArg', function() {
                    myGraph.addComponent(testComp);
                    myGraph.addComponent(altComp);
                    myGraph.intergrateComponent(altComp);
                    myGraph.bfs(v3);
                    expect(testComp.edges).toContain(secondEdge);

                });
            });
            describe('bfs(initNode)', () => {
                it('returns a path[Map] of nodes reachable in BreadthFirstSearch', function() {
                    expect(myGraph.bfs(v2) instanceof Map).toBeTrue();
                });
                describe('retun values', () => {
                    var bfsKeys;
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
            it('finds the shortest path between two nodes', function() {
                expect(myGraph.dijkstra(v1, v2) instanceof Map).toBeTrue();
            });
            describe('retun values', () => {
                var dijkKeys;
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
    });
});