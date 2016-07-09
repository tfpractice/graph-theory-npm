describe('RobustArray', () => {
    var GR = require('../src/graphTheory');
    let RobustArray = GR.RobustArray;
    var Node = GR.Node;
    let NodeArray = RobustArray.SetifyType(Node);
    var myNode, myArray, myAltArray, n1, n2, n3, n4;

    beforeEach(function() {
        n1 = new Node("n1", 0);
        n2 = new Node("n2", 1);
        n3 = new Node("n3", 2);
        n4 = new Node("n4", 3);
        myNode = new Node("NYC", {
            name: "NYC"
        });
        myArray = new NodeArray(myNode);
        myArray.push(n3);
        myArray.push(n4);
        myAltArray = new NodeArray(n1);
        myAltArray.push(n2);
        myAltArray.push(n3);
    });
    fdescribe('#SetifyType(BaseType)', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
        describe('when BaseType is Node', () => {
            describe('isValid(argObj)', () => {
                it('returns true if argObj is an instanceof Node', function() {
                    expect(myArray.isValid(myNode)).toBeTrue();
                });
                it('returns false if argObj is not an instance of Node', function() {
                    expect(myArray.isValid(new GR.Edge(n1, n2))).toBeFalse();
                });
            });
        });
    });

    fdescribe('push(argObj) ', () => {
        describe('when argObj is an instanceof Node', () => {
            it('calls super [Array.push] and returns modified array', function() {
                var currLength = myArray.length;
                let newNode = new Node('newNode');
                var newLength = currLength + 1;
                expect(myArray.push(newNode)).toEqual(myArray);
            });
        });
        describe('when argObj is not an instanceof Node', () => {
            it('returns the unmodified array', function() {
                expect(myArray.push(2)).toBeArray();
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
        it('returns an array of nodes contained in the caller but not in the argument', function() {
            expect(myArray.difference(myAltArray)).toBeArray();
        });
    });
    describe('hasDistinctNodes', function() {
        it('determines if caller has nodes that argument does not', function() {
            expect(myArray.hasDistinctNodes(myAltArray)).toBeTrue();
        });
    });
    describe('#isEquivalent', function() {
        it('returns true if arrays are of same size and are subsets of each other', function() {
            let subArray = new NodeArray(myNode);
            let subArray2 = new NodeArray(myNode);
            expect(subArray2.isEquivalent(subArray)).toBeTrue();
        });
    });
    describe('#isSubset', () => {
        it('returns true if every node in the callers is in the argument', function() {
            let subArray = new NodeArray(myNode);
            expect(subArray.isSubset(myArray)).toBeTrue();
        });
    });
    describe('#hasSameSize', () => {
        it('returns if the arrays share length', function() {
            expect(myArray.hasSameSize(myAltArray)).toBeTrue();
        });
    });
    describe('union', function() {
        it('returns an array of all nodes between two array', function() {
            expect(myArray.union(myAltArray)).toBeArray();
        });
    });
    describe('unionize', function() {
        it('combines the nodes of both arrays', function() {
            myArray.unionize(myAltArray);
            var nodeUnion = myArray.union(myAltArray);

            expect(myArray).toEqual(nodeUnion);
        });
        it('retuns the modified array', function() {
            let uArr = myArray.unionize(myAltArray);
            var nodeUnion = myArray.union(myAltArray);
            expect(uArr).toBeArray();

        });
    });
    describe('nodeComplement()', () => {
        it('returns an array of all nodes excluding the argument', function() {
            expect(myArray.nodeComplement(myNode)).toBeArray();
        });
    });






});