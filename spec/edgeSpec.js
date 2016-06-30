describe('Edge', function() {
    var GR = require('../src/graphTheory');
    var myEdge, altEdge, la, nyc, dc;
    beforeEach(function() {
        la = new GR.Node("LA");
        nyc = new GR.Node("NYC");
        dc = new GR.Node("DC");
        myEdge = new GR.Edge(nyc, la, 10);
        altEdge = new GR.Edge(nyc, dc, 10);
    });
    describe('init', function() {
        it('initializes with a nodes array[NodeArray]', function() {
            expect(myEdge.nodes instanceof GR.NodeArray).toBeTrue();
        });
        it('initializes with a label[String]', function() {
            expect(myEdge.label).toBeString();
        });
        it('initializes with a weight', function() {
            expect(myEdge.weight).toEqual(10);
        });
        describe('when initialized without params', () => {
            var dEdge;
            beforeEach(function() {
                dEdge = new GR.Edge();
            });
            it('initializes with anonymous nodes ', function() {
                expect(dEdge.nodes[0].label).toBeGreaterThan(33);

            });
            it('initializes with label "undefined_undefined" dest', function() {
                expect(dEdge.label).toBeString();
            });
            it('initializes with default weight 0', function() {
                expect(dEdge.weight).toBe(0);
            });
        });
    });
    describe('isEquivalent(edgeArg)', () => {
        it('returns true if the edgeArg shares a label with the edgeArg', function() {
            expect(myEdge.isEquivalent(altEdge)).toBeFalse();
        });
    });
    describe('#setLabel()', function() {
        it('sets the label to a combination of the node labels', function() {
            var myLabel = myEdge.nodes[0].label + '_' + myEdge.nodes[1].label;
            // console.log(myLabel);
            expect(myEdge.label).toEqual(myLabel);
        });

    });
    describe('#hasSameNodes', () => {
        it('checks if there are no distinct nodes between each edges NodeArray', function() {
            let identical = new GR.Edge(la, nyc, 10);
            expect(myEdge.hasSameNodes(identical)).toBeTrue();

        });
    });
    describe('containsNode', function() {
        it('retuns true if the specified node is in this edge', function() {
            expect(myEdge.containsNode(la)).toBeTrue();
        });
    });
    describe('excludeNode(node)', () => {
        it('returns an array of nodes excluding that specified', function() {
            expect(myEdge.excludeNode(nyc)).toBeArray();
        });
    });
    describe('getNeighbor', function() {
        it('returns the edges alternate endpoint ', function() {
            expect(myEdge.getNeighbor(la)).toEqual(nyc);
        });
    });
});