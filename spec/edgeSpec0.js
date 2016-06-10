describe('Edge0', function() {
    var GR = require('../src/graphTheory');
    var NodeArray = GR.NodeArray;
    var myEdge0;
    var la = new GR.Node("LA");
    var nyc = new GR.Node("NYC");
    beforeEach(function() {
        myEdge0 = new GR.Edge0(nyc, la, 10);
    });

    describe('init', function() {
        it('initializes with a nodes array[NodeArray]', function() {
            expect(myEdge0.nodes instanceof NodeArray).toBeTrue();
        });
        // it('initializes with a source vertex', function() {
        // expect(myEdge0.source).toEqual(nyc);
        // });

        // it('initializes with a destination vertex', function() {
        // expect(myEdge0.dest).toEqual(la);
        // });

        it('initializes with a weight', function() {
            expect(myEdge0.weight).toEqual(10);
        });
        // describe('when initialized without params', () => {
        // var dEdge0;
        // beforeEach(function() {
        // dEdge0 = new GR.Edge0();
        // });
        // it('initializes with default source', function() {
        // expect(dEdge0.source.label).toBe('default');
        // });
        // it('initializes with default dest', function() {
        // expect(dEdge0.dest.label).toBe('default');
        // });
        // it('initializes with default weight 0', function() {
        // expect(dEdge0.weight).toBe(0);
        // });
        // });


    });
});