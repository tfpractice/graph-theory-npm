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
        describe('depthTraverse(initNode)', () => {

        });
        describe('componentVisit(nodeArg, compArg)', () => {
            it('returns a component containing all nodes reachable from init', function() {
                var testNode = myGraph.nodes[0];
                var testNabe = myGraph.getNeighbors(testNode)[0];
                var testEdge = myGraph.edges[0];
                var testComp = new GR.EdgeComponent(testEdge);
                // console.log(myGraph.componentVisit(testNode, testComp));
            });
        });
        // describe('dijkstra', function() {
        // it('finds the shortest path between two nodes', function() {
        // });
        // });
    });
});