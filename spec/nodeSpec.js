describe('Node', function() {
    var GR = require('../src/graphTheory');
    var myNode;

    beforeAll(function() {
        console.log('\.........Node Spec.........\n')
    });
    beforeEach(function() {
        myNode = new GR.Node("NYC", {
            name: "NYC"
        });
    });


    describe('init', function() {
        it('initializes with a label', function() {
            expect(myNode.label).toEqual("NYC");
        });
        it('defaults label to a random integer above 32', function() {
            var newV = new GR.Node();
            expect(newV.label).toBeGreaterThan(32);
        });
        it('initialzies with a data object', function() {
            expect(myNode.data).toBeObject();
        });
    });
    describe('#setLabel', () => {
        it('returns and sets label to a random integer above 32 ', function() {
            let newNode = new GR.Node()
            expect(newNode.label).toBeGreaterThan(32);
        });
    });
});