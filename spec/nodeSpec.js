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
        it('defaults label to undefined', function() {
            var newV = new GR.Node();
            expect(newV.label).toBeUndefined();
            // expect(newV.label).toEqual('default');
        });
        it('initialzies with a data object', function() {
            console.log(myNode.data);
            expect(myNode.data).toBeObject();
        });
    });
});