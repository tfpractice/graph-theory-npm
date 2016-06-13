describe('NodeArray', function() {
    var GR = require('../src/graphTheory');
    var Node = GR.Node;
    var myNode, myArray, myAltArray, n1, n2, n3, n4;
    beforeEach(function() {
        n1 = new GR.Node("n1");
        n2 = new GR.Node("n2");
        n3 = new GR.Node("n3");
        n4 = new GR.Node("n4");
        myNode = new GR.Node("NYC", {
            name: "NYC"
        });
        myArray = new GR.NodeArray(myNode);
        myArray.push(n3);
        myArray.push(n4);
        myAltArray = new GR.NodeArray(n1);
        myAltArray.push(n2);
        myAltArray.push(n3);
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
    describe('intersection(altArray)', function() {
        it('retuns an array of nodes shared by two nodeArrays', function() {
            expect(myArray.intersection(myAltArray)).toBeArray();
        });
    });
    describe('intersects', function() {
        it('determines if two arrays share any nodes', function() {
            expect(myArray.intersects(myAltArray)).toBeTrue();
        });
    });
    describe('difference', function() {
        it('returns an array of nodes not contained in the operating array', function() {
            expect(myArray.difference(myAltArray)).toBeArray();
        });
    });
    describe('hasDistinctNodes', function() {
        it('determines if there are distinct nodes between arrays', function() {
            expect(myArray.hasDistinctNodes(myAltArray)).toBeTrue();
        });
    });
    describe('union', function() {
        it('returns an array of all nodes between two array', function() {
            expect(myArray.union(myAltArray)).toBeArray();
        });
    });
});