describe('RobustArray', () => {
    var GR = require('../src/graph_theory');
    let RobustArray = GR.RobustArray;
    var Node = GR.Node;
    // let NodeArray = RobustArray.SetifyType(Node);
    class NodeArray extends RobustArray.SetifyType(Node) {};
    var myNode, myArray, myAltArray, n1, n2, n3, n4;
    beforeAll(function() {
        console.log('\n.........RobustArray Spec.........\n')
    });
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
    describe('#SetifyType(BaseType)', function() {
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
    describe('Array methods', function() {
        describe('push(argObj) ', () => {
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
        fdescribe('#isEmpty', function() {
            it('returns a boolean describing the length of the array', function() {
                let xArray = new NodeArray();
                expect(xArray.isEmpty()).toBeTrue();
            });
        });
        describe('#filter', () => {
            it('returns all elements meeting callback criteria', function() {
                let fArray = myArray.filter(el => el.data % 2 === 0);
                expect(fArray).toContain(n3);
            });
            it('returns a NodeArray', function() {
                let fArray = myArray.filter(el => el.data % 2 === 0);
                expect(fArray instanceof NodeArray).toBeTrue();
            });
        });
        describe('slice', () => {
            let slr;
            beforeEach(function() {
                slr = myArray.slice(0);
            });
            it('returns a copy of the elements', function() {
                expect(slr).toContain(n3);
            });
            it('returns a NodeArray', function() {
                expect(slr instanceof NodeArray).toBeTrue();
            });
        });
        describe('splice', () => {
            let splr;
            beforeEach(function() {
                splr = myArray.splice(0);
            });
            it('removes all of the elements', function() {
                expect(myArray).toBeEmptyArray();
            });
            it('returns a NodeArray', function() {
                expect(splr instanceof NodeArray).toBeTrue();
            });
        });
        describe('concat', () => {
            let concr;
            beforeEach(function() {
                concr = myArray.concat(myAltArray);
            });
            it('adds all of the elements of one array to the caller', function() {
                expect(concr).toContain(n2);
            });
            it('returns a NodeArray', function() {
                expect(concr instanceof NodeArray).toBeTrue();
            });
        });
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myNode)).toBeTrue();
        });
    });
    describe('findEquivalentElemenst()', function() {
        it('retrieves an equivalent element in the object', function() {
            expect(myArray.findEquivalentElement(myNode)).toBe(myNode);
        });
    });
    describe('#removeElement', function() {
        it('removes an element from the array', function() {
            myArray.removeElement(n3);
            expect(myArray).not.toContain(n3);
        });
    });
    describe('clear', () => {
        it('removes all elements from the array', function() {
            myArray.clear();
            expect(myArray).toBeEmptyArray();
        });
    });
    describe('#copy', () => {
        it('returns a copy of the array', function() {
            let cpr = myArray.copy();
            expect(cpr).toEqual(myArray);
        });
    });
    describe('#hasSameSize', () => {
        it('returns if the arrays share length', function() {
            expect(myArray.hasSameSize(myAltArray)).toBeTrue();
        });
    });
    describe('#isSubset', () => {
        it('returns true if every node in the callers is in the argument', function() {
            let subArray = new NodeArray(myNode);
            expect(subArray.isSubset(myArray)).toBeTrue();
        });
    });
    describe('#isEquivalent', function() {
        it('returns true if arrays are of same size and are subsets of each other', function() {
            let subArray = new NodeArray(myNode);
            let subArray2 = new NodeArray(myNode);
            expect(subArray2.isEquivalent(subArray)).toBeTrue();
        });
    });
    describe('intersects', function() {
        it('determines if two arrays share any nodes', function() {
            expect(myArray.intersects(myAltArray)).toBeTrue();
        });
    });
    describe('intersection(altArray)', function() {
        it('retuns an array of nodes shared by two nodeArrays', function() {
            expect(myArray.intersection(myAltArray)).toBeArray();
        });
    });
    describe('hasDistinctElements', function() {
        it('determines if caller has nodes that argument does not', function() {
            expect(myArray.hasDistinctElements(myAltArray)).toBeTrue();
        });
    });
    describe('difference', function() {
        it('returns an array of nodes contained in the caller but not in the argument', function() {
            expect(myArray.difference(myAltArray)).toBeArray();
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
    describe('#excludeElement', function() {
        it('returns an array of all nodes excluding the argument', function() {
            // expect(myArray.excludeNode(myNode)).toBeArray();
            expect(myArray.excludeElement(n3)).not.toContain(n3);
        });
    });
    // describe('nodeComplement()', () => {
    //     it('returns an array of all nodes excluding the argument', function() {
    //         expect(myArray.nodeComplement(myNode)).toBeArray();
    //     });
    // });
});