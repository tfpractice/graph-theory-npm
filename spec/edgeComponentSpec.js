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
        myComponent = new GR.EdgeComponent();
        myComponent.addEdge(e1);
        myComponent.addEdge(e2);
        myComponent.addEdge(e3);
    });

    describe('init', function() {
        describe('defaults', function() {
            var defComp;
            beforeEach(function() {
                defComp = new GR.EdgeComponent();
            });
            it('initializes with an array of edges', function() {
                expect(defComp.edges).toBeArray();
            });
            it('initializes with a nodes array', function() {
                expect(defComp.nodes).toBeArray();
            });
            it('initializes with an arity of 1', function() {
                expect(defComp.arity).toEqual(0);
            });
        });
    });
    describe('#containsEdge', function() {
        it('checks if a edge is already present in the edges array', function() {
            expect(myComponent.containsEdge(e1)).toBeTrue();
        });
    });
    describe('resetArity()', function() {
        it('sets the arity attribute to the number of edges', function() {
            myComponent.resetArity();
            expect(myComponent.arity).toEqual(5);
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
            expect(myComponent.containsEdge(e2)).toBeTruthy();
        });
    });
    describe('updateNodes', () => {
        it('updates the nodes attribute', function() {
            myComponent.updateNodes();
            expect(myComponent.arity).toEqual(5);
        });

    });
    describe('nodeMap()', () => {
        it('returns a mapped array of each edges nodes', function() {
            expect(myComponent.nodeMap()).toBeArray();
        });
    });

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