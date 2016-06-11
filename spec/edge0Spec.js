describe('Edge0', function() {
    var GR = require('../src/graphTheory');
    var myEdge0, altEdge, la, nyc, dc;
    beforeEach(function() {
        la = new GR.Node("LA");
        nyc = new GR.Node("NYC");
        dc = new GR.Node("DC");
        myEdge0 = new GR.Edge0(nyc, la, 10);
        altEdge = new GR.Edge0(nyc, dc, 10);
    });
    describe('init', function() {
        it('initializes with a nodes array[NodeArray]', function() {
            expect(myEdge0.nodes instanceof GR.NodeArray).toBeTrue();
        });
        it('initializes with a label[String]', function() {
            expect(myEdge0.label).toBeString();
        });
        it('initializes with a weight', function() {
            expect(myEdge0.weight).toEqual(10);
        });
        describe('when initialized without params', () => {
            var dEdge;
            beforeEach(function() {
                dEdge = new GR.Edge();
            });
            it('initializes with anonymous nodes ', function() {
                expect(dEdge.nodes[0].label).toBeUndefined();
                // expect(dEdge.source.label).toBe('default');
            });
            it('initializes with label "undefined_undefined" dest', function() {
                expect(dEdge.label).toBe('undefined_undefined');
            });
            it('initializes with default weight 0', function() {
                expect(dEdge.weight).toBe(0);
            });
        });
    });
    describe('isEquivalent(edgeArg)', () => {
        it('returns true if the edgeArg shares a label with the edgeArg', function() {
            expect(myEdge0.isEquivalent(altEdge)).toBeFalse();
        });

    });
    describe('containsNode', function() {
        it('retuns true if the specified node is in this edge', function() {
            expect(myEdge0.containsNode(la)).toBeTrue();
        });
    });
    describe('getNeighbor', function() {
        it('returns the edges alternate endpoint ', function() {
            expect(myEdge0.getNeighbor(la)).toEqual(nyc);
        });
    });
});