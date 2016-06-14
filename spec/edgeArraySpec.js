describe('EdgeArray', function() {
    var GR = require('../src/graphTheory');
    var Edge = GR.Edge;
    var myEdge, altEdge, la, nyc, dc, myArray;
    var e0, e1, e2, e3, e4, n00, n01, n10, n11, n20, n21, bArray, cArray;
    beforeEach(function() {
        la = new GR.Node("LA");
        nyc = new GR.Node("NYC");
        dc = new GR.Node("DC");

        myEdge = new GR.Edge(nyc, la, 10);
        altEdge = new GR.Edge(nyc, dc, 10);
        myArray = new GR.EdgeArray(myEdge);
    });
    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });

    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myEdge)).toBeTrue();
        });
    });
    describe('isEdge(argEdge', () => {
        it('returns true if argEdge is an instanceof Edge', function() {
            expect(myArray.isEdge(myEdge)).toBeTrue();
        });
    });
    describe('push(argEdge) ', () => {
        describe('when argEdge is an instanceof Edge', () => {
            it('calls super [Array.push] and returns new length', function() {
                var currLength = myArray.length;
                let newEdge = new Edge('newEdge');
                var newLength = currLength + 1;
                expect(myArray.push(newEdge)).toEqual(newLength);
            });
        });
        describe('when argEdge is not an instanceof Edge', () => {
            it('returns false', function() {
                expect(myArray.push(2)).toBeFalse();
            });
            it('does not increment length', function() {
                var currLength = myArray.length;
                myArray.push(2);
                expect(myArray.length).toEqual(currLength);
            });
        });

    });
    describe('getNodes', () => {
        it('maps each of the edges nodes to a new nodeArray  ', function() {
            expect(myArray.getNodes() instanceof GR.NodeArray).toBeTrue();
        });
    });
    describe('set methods', () => {
        var e0, e1, e2, e3, e4, n00, n01, n10, n11, n20, n21, bArray, cArray;
        beforeEach(function() {
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

        });
        describe('intersection(altArray)', function() {
            it('retuns an array of edges shared by two nodeArrays', function() {
                expect(bArray.intersection(cArray)).toBeArray();
            });
        });
        describe('intersects', function() {
            it('determines if two arrays share any edges', function() {
                bArray.push(e3);
                expect(bArray.intersects(cArray)).toBeTrue();
            });
        });
        describe('difference', function() {
            it('returns an array of nodes not contained in the operating array', function() {
                expect(bArray.difference(cArray)).toBeArray();
            });
        });
        describe('hasDistinctEdges', function() {
            it('determines if there are distinct nodes between arrays', function() {
                expect(bArray.hasDistinctEdges(cArray)).toBeTrue();
            });
        });
    });

});