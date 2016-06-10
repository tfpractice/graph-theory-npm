describe('Node', function() {
    var GR = require('../src/graphTheory');
    var myNode, myArray;

    beforeEach(function() {
        myNode = new GR.Node("NYC", {
            name: "NYC"
        });
        myArray = new GR.NodeArray(myNode);
    });


    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
        // it('initializes with a label', function() {
        // expect(myNode.label).toEqual("NYC");
        // });
        // it('defaults label to undefined', function() {
        // var newV = new GR.Node();
        // expect(newV.label).toBeUndefined();
        // });
        // it('initialzies with a data object', function() {
        // expect(myNode.data).toBeObject();
        // });
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myNode)).toBeTrue();
        });
    });
});