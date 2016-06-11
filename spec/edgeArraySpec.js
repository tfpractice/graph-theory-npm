describe('EdgeArray', function() {
    var GR = require('../src/graphTheory');
    var Edge = GR.Edge;
    var myEdge, altEdge, la, nyc, dc, myArray;
    beforeEach(function() {
        la = new GR.Node("LA");
        nyc = new GR.Node("NYC");
        dc = new GR.Node("DC");
        myEdge = new GR.Edge(nyc, la, 10);
        altEdge = new GR.Edge(nyc, dc, 10);
        myArray = new GR.EdgeArray(myEdge);
    });
    describe('init', function() {
        it('is a typeof Array', function() {
            expect(myArray instanceof Array).toBeTrue();
        });
    });
    describe('contains()', () => {
        it('checks if any of the elements are equivalent to that provided', function() {
            expect(myArray.contains(myEdge)).toBeTrue();
        });
    });
    describe('isEdge(argEdge', () => {
        it('returns true if argEdge is an instanceof Edge', function() {
            expect(myArray.isEdge(myEdge)).toBeTrue();
        });
    });
    describe('push(argEdge) ', () => {
        describe('when argEdge is an instanceof Edge', () => {
            it('calls super [Array.push] and returns new length', function() {
                var currLength = myArray.length;
                let newEdge = new Edge('newEdge');
                var newLength = currLength + 1;
                expect(myArray.push(newEdge)).toEqual(newLength);
            });
        });
        describe('when argEdge is not an instanceof Edge', () => {
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