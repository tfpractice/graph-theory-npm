describe('Vertex', function() {
    var GR = require('../src/graphTheory');
    var myVertex;

    beforeEach(function() {
        myVertex = new GR.Vertex("NYC");
    });


    describe('init', function() {
        it('initializes with a label', function() {
            expect(myVertex.label).toEqual("NYC");
        });
        it('defaults label to "default"', function() {
            var newV = new GR.Vertex();
            expect(newV.label).toEqual('default');
        });
    });
});