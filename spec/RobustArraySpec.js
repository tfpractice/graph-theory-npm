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
                it('returns true if argNode is an instanceof Node', function() {
                    expect(myArray.isValid(myNode)).toBeTrue();
                });
                it('returns false if argObj is not an instance of Node', function() {
                    expect(myArray.isValid(new GR.Edge(n1, n2))).toBeFalse();
                });
            });
        });
    });

});