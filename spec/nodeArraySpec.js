describe('NodeArray', function() {
    var GR = require('../src/graphTheory');
    var Node = GR.Node;
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
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myNode)).toBeTrue();
        });
    });
    describe('isNode(argNode', () => {
        it('returns true if argNode is an instanceof Node', function() {
            expect(myArray.isNode(myNode)).toBeTrue();
        });
    });
    describe('push(argNode) ', () => {
        describe('when argNode is an instanceof Node', () => {
            it('calls super [Array.push] and returns new length', function() {
                var currLength = myArray.length;
                let newNode = new Node('newNode');
                var newLength = currLength + 1;
                expect(myArray.push(newNode)).toEqual(newLength);
            });
        });
        describe('when argNode is not an instanceof Node', () => {
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

});