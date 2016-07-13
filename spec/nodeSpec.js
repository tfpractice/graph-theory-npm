fdescribe('Node', function() {
    var GR = require('../src/graphTheory');
    var myNode;

    beforeAll(function() {
        console.log('\n.........Node Spec.........\n')
    });
    beforeEach(function() {
        myNode = new GR.Node("NYC", {
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
            let newNode = new GR.Node()
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