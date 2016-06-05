describe('Edge', function() {
    var GR = require('../src/graphTheory');
    var myEdge;
    var la = new GR.Vertex("LA");
    var nyc = new GR.Vertex("NYC");
    beforeEach(function() {
        myEdge = new GR.Edge(nyc, la, 10);
    });

    describe('init', function() {
        it('initializes with a source vertex', function() {
            expect(myEdge.source).toEqual(nyc);
        });

        it('initializes with a destination vertex', function() {
            expect(myEdge.dest).toEqual(la);
        });

        it('initializes with a weight', function() {
            expect(myEdge.weight).toEqual(10);
        });
        describe('when initialized without params', () => {
            var dEdge;
            beforeEach(function() {
                dEdge = new GR.Edge();
            });
            it('initializes with default source', function() {
                expect(dEdge.source.label).toBe('default');
            });
            it('initializes with default dest', function() {
                expect(dEdge.dest.label).toBe('default');
            });
            it('initializes with default weight 0', function() {
                expect(dEdge.weight).toBe(0);
            });
        });


    });
});