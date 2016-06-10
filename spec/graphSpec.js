describe('Graph', function() {
    var GR = require('../src/graphTheory');
    var myGraph;
    var bostonV;
    beforeEach(function() {
        myGraph = new GR.Graph();
        bostonV = new GR.Vertex("boston");
        tampaV = new GR.Vertex("tampa");
        myGraph.addVertex(bostonV);
        myGraph.addVertex(tampaV);

    });

    describe('addVertex', function() {
        it('appends a vertex to the vertices array', function() {

            expect(myGraph.vertices).toContain(bostonV);
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

            v1 = new GR.Vertex("v1");
            v2 = new GR.Vertex("v2");
            v3 = new GR.Vertex("v3");
            v4 = new GR.Vertex("v4");
            v5 = new GR.Vertex("v5");

            myGraph.addEdge(v1, v2, 2);
            myGraph.addEdge(v2, v3, 4);
            myGraph.addEdge(v3, v4, 6);
            myGraph.addEdge(v4, v5, 8);
            myGraph.addEdge(v5, v1, 10);

        });


        describe('getEdges ', function() {
            it('returns all edges with a particular source Vertex ', function() {
                var e12 = myGraph.edges[0];
                expect(myGraph.getEdges(v1)).toContain(e12);
            });
        });

        describe('getNeighbors', function() {
            it('returns all vertices adjacent to a given vertex', function() {
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

            });

        });

        describe('breadthSearch', function() {
            it('retunrs an object containgin all vertices reachable from a given vertex ', function() {
                expect(myGraph.breadthSearch(v1)).toBeObject();
            });
        });
        describe('hasPath', function() {
            it('determines if a path exists between to vertices in a graph', function() {
                var result = myGraph.hasPath(v1, v3);
                // console.log(result);
                expect(myGraph.hasPath(v1, v3)).toBeTrue();
            });
        });

        describe('dijkstra', function() {
            it('finds the shortest path between two nodes', function() {

            });
        });
    });
});