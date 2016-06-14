describe('EdgeComponent', function() {
    var GR = require('../src/graphTheory');
    var myGraph;
    var bostonV;
    var myComponent;
    var e0, e1, e2, e3, e4, n00, n01, n10, n11, n20, n21, bArray, cArray;
    beforeEach(function() {
        myGraph = new GR.Graph();
        bostonV = new GR.Node("boston");
        tampaV = new GR.Node("tampa");
        myGraph.addNode(bostonV);
        myGraph.addNode(tampaV);
        n10 = new GR.Node("00");
        n11 = new GR.Node("01");
        n10 = new GR.Node("10");
        n11 = new GR.Node("11");
        n20 = new GR.Node("20");
        n21 = new GR.Node("21");
        e0 = new GR.Edge(n00, n01);
        e1 = new GR.Edge(n10, n11);
        e2 = new GR.Edge(n20, n21);
        e3 = new GR.Edge(n00, n11);
        e4 = new GR.Edge(n20, n01);
        bArray = new GR.EdgeArray(e0);
        bArray.push(e1);
        cArray = new GR.EdgeArray(e2);
        cArray.push(e3);
        myComponent = new GR.EdgeComponent(e1);
        myComponent.addEdge(e2);
        myComponent.addEdge(e3);









    });
    // });

    //fdescribe('Component', function() {
    //    var n1, n2, n3, n4, n5, relCode, p1, p2, t1, t2, t3, t4, myComponent, my2Component, oComponenet;
    //    beforeEach(function() {
    //        n1 = new GR.Node(2, 3);
    //        n2 = new GR.Node(3, 2);
    //        n3 = new GR.Node(4, 1);
    //        n4 = new GR.Node(1, 4);
    //        n5 = new GR.Node(1, 3);
    //        relCode = "rt";
    //        n1.setNeighbor(relCode, n2);
    //        p1 = new GR.Player("Jill");
    //        p2 = new GR.Player("Jack");
    //        t1 = new GR.Token(p1, "#ff00ff");
    //        t2 = new GR.Token(p1, "#ff00ff");
    //        t3 = new GR.Token(p2, "#ff00ff");
    //        t4 = new GR.Token(p2, "#ff00ff");
    //        // n1.placeToken(t1);
    //        // n2.placeToken(t1);
    //        // n3.placeToken(t2);
    //        // n4.placeToken(t3);
    //        // n5.placeToken(t4);
    //        myComponent = new GR.Component(n1, n2, relCode);
    //        my2Component = new GR.Component(n2, n3, "rt")
    //        oComponenet = new GR.Component(n3, n4, "ct");
    //    });
    describe('init', function() {
        it('initializes with an array of edges', function() {
            expect(myComponent.edges).toBeArray();
        });
        // it('initializes with a player', function() {
        // expect(myComponent.player).toBe(p1);
        // });
        it('initializes with an arity of 1', function() {
            // expect(myComponent.arity).toEqual(1);
        });
    });


    describe('#containsEdge', function() {
        it('checks if a edge is already present in the edges array', function() {
            expect(myComponent.containsEdge(e1)).toBeTrue();
        });
    });
    describe('resetArity()', function() {
        it('sets the arity attribute to the number of edges', function() {
            expect(myComponent.arity).toEqual(1);
        });
    });
    describe('getNodes', () => {
        it('returns an flattened map of each edges nodes', function() {
            expect(myComponent.getNodes()).toBeArray();
        });
    });
    describe('addEdge', () => {
        it('adds an edge to the array if not present', function() {
            myComponent.addEdge(e2);
            // myComponent.getNodes();
        });
    });
    //    describe('intersection', function() {
    //        it('retuns an array of nodes shared by two components', function() {
    //            expect(myComponent.intersection(my2Component)).toBeArray();
    //        });
    //    });
    //    describe('intersects', function() {
    //        it('determines if two components share nodes', function() {
    //            expect(myComponent.intersects(my2Component)).toBeTrue();
    //        });
    //    });
    //    describe('playerCheck', function() {
    //        it('determines of two components have the smae owner', function() {
    //            expect(myComponent.playerCheck(my2Component)).toBeTrue();
    //        });
    //    });

    //    describe('hasDistinctNodes', function() {
    //        it('determines if there are distinct nodes between componnts', function() {
    //            expect(myComponent.hasDistinctNodes(my2Component)).toBeTrue();
    //        });
    //    });
    //    describe('union', function() {
    //        it('returns an array of all nodes between two componenets', function() {
    //            expect(myComponent.union(my2Component)).toBeArray();
    //        });
    //    });
    describe('addNode', function() {
        it('adds a node to the component', function() {
            // myComponent.addNode(tampaV);
            // expect(myComponent.arity).toBe(2);
        });
    });
    //    describe('unionize', function() {
    //        it('sets the nodes to be the union of the two components', function() {
    //            myComponent.unionize(my2Component);
    //            var nodeUnion = myComponent.union(my2Component);

    //           expect(myComponent.nodes).toEqual(nodeUnion);
    //        });
    //    });
    //    describe('checkDirection', function() {
    //        it('determines if two components share the same direction', function() {
    //            expect(myComponent.checkDirection(my2Component)).toBeTrue();
    //        });
    //    });
});