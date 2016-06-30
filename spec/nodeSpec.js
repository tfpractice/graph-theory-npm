describe('Node', function() {
    var GR = require('../src/graphTheory');
    var myNode;

    beforeEach(function() {
        myNode = new GR.Node("NYC", {
            name: "NYC"
        });
    });


    describe('init', function() {
        it('initializes with a label', function() {
            expect(myNode.label).toEqual("NYC");
        });
        it('defaults label to a random integer above 33', function() {
            var newV = new GR.Node();
            expect(newV.label).toBeGreaterThan(33);
        });
        it('initialzies with a data object', function() {
            expect(myNode.data).toBeObject();
        });
    });
    describe('#setLabel', () => {
        it('returns and sets label to a random integer above 33 ', function() {
            let newNode = new GR.Node()
            console.log(newNode.label);
            expect(newNode.label).toBeGreaterThan(33);
        });
    });
});