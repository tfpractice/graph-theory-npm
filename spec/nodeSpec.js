fdescribe('Node', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var myNode;

    beforeAll(function() {
        console.log('\n.........Node Spec.........');
    });
    beforeEach(function() {
        myNode = new Node("NYC", {
            name: "NYC"
        });
    });
    describe('init', function() {
        it('initializes with a label', function() {
            expect(myNode.label).toEqual("NYC");
        });
        it('initialzies with a data object', function() {
            expect(myNode.data).toBeObject();
        });
    });
    describe('#setLabel', () => {
        it('returns and sets label  ', function() {
            let newNode = new Node();
            expect(newNode.label).toBeUndefined();
        });
    });
    describe('setData(d)', () => {
        it('sets the data attribute', function() {
            myNode.setData({
                name: 'nyc'
            });
            expect(myNode.data.name).toEqual('nyc');
        });
    });
});