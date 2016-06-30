describe('NodeArray', function() {
    var GR = require('../src/graphTheory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray;
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
    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
    });
    describe('return type @@species', () => {
        var myMutable;
        beforeEach(function() {
            myMutable = new NodeArray();
            for (let i = 0; i < 10; i++) {
                let newNode = new Node(`n${i}`, i);
                myMutable.push(newNode);
            }
        });
        describe('#filter', () => {
            it('returns a new nodeArray', function() {
                fArr = myMutable.filter(currEdge => myArray.contains(currEdge) === true);
                // console.log(fArr);
                expect(fArr instanceof NodeArray).toBeTrue();
            });

        });
        describe('#slice', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.slice(0, 4);
                //console.log(firstFour);
                expect(firstFour instanceof NodeArray).toBeTrue();
            });

        });
        describe('#splice', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.splice(0, 4);
                //console.log(firstFour);
                expect(firstFour instanceof NodeArray).toBeTrue();
            });

        });
        describe('#concat', () => {
            it('returns a new nodeArray', function() {
                firstFour = myMutable.splice(0, 4);
                let newArr = myMutable.concat(firstFour);
                //console.log(newArr);
                expect(newArr instanceof NodeArray).toBeTrue();
            });

        });

    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myNode)).toBeTrue();
        });
    });
    describe('#removeNode(nArg)', () => {
        it('removes a node from the array', function() {
            myArray.removeNode(n3);
            expect(myArray.contains(n3)).toBeFalse();
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
        it('returns an array of nodes contained in the caller but not in the argument', function() {
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