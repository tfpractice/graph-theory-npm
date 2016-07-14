describe('ComponentArray', function() {
    var GR = require('../src/graph_theory');
    var Node = GR.Node;
    var NodeArray = GR.NodeArray;
    var ComponentArray = GR.ComponentArray;
    var Graph = GR.Graph;
    // var myNode, myArray, myAltArray, n1, n2, n3, n4;
    let myGraph, gNodes, n0, nabe0, e0, e1, v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12;
    let nabes1, nabes2, nabes3, nabes6, nabes7, comp1, comp6, comp7;
    beforeAll(function() {
        console.log('\n.........ComponentArray Spec.........');
    });
    describe('connected components', function() {
        beforeEach(function() {
            v1 = new Node("v1");
            v2 = new Node("v2");
            v3 = new Node("v3");
            v4 = new Node("v4");
            v5 = new Node("v5");
            v6 = new Node("v6");
            v7 = new Node("v7");
            v8 = new Node("v8");
            v9 = new Node("v9");
            v10 = new Node("v10");
            v11 = new Node("v11");
            v12 = new Node("v12");
            gNodes = NodeArray.of(v1, v2, v3, v4, v5, v6, v7, v8, v9, v10, v11, v12);
            myGraph = new Graph(gNodes);
            myGraph.createEdge(v1, v2, 2);
            myGraph.createEdge(v2, v3, 4);
            myGraph.createEdge(v3, v4, 6);
            myGraph.createEdge(v4, v5, 8);
            myGraph.createEdge(v5, v1, 10);
            myGraph.createEdge(v6, v9, 10);
            myGraph.createEdge(v5, v10, 10);
            myGraph.createEdge(v10, v11, 10);
            myGraph.createEdge(v11, v12, 10);
            n0 = myGraph.nodes[0];
            nabe0 = myGraph.getNeighbors(n0)[0];
            e0 = myGraph.edges[0];
            e1 = myGraph.edges[1];
            nabes1 = myGraph.getNeighbors(v1);
            nabes1.push(v1);
            nabes2 = myGraph.getNeighbors(v2);
            nabes3 = myGraph.getNeighbors(v3);
            nabes6 = myGraph.getNeighbors(v6);
            nabes7 = myGraph.getNeighbors(v7);
        });
        describe('#addComponent', () => {
            describe('when there is no intersecting component', () => {
                it('pushes a NodeArray to the components array', function() {
                    myGraph.addComponent(nabes1);
                    expect(myGraph.components).toContain(nabes1);
                });
            });
            describe('when there is an intersecting component', () => {
                it('integrates the component with the intersecting component', function() {
                    myGraph.addComponent(nabes1);
                    myGraph.addComponent(nabes2);
                    expect(myGraph.components.length).toEqual(1);
                });
            });
        });
        describe('#containsComponent()', function() {
            it('returns a boolean checking for presence of equivalent component', function() {
                myGraph.addComponent(nabes1);
                expect(myGraph.containsComponent(nabes1)).toBeTrue();
            });
        });
        describe('#removeComponent', () => {
            it('splices a NodeArray from the components array', function() {
                myGraph.addComponent(nabes1);
                myGraph.removeComponent(nabes1);
                expect(myGraph.components).not.toContain(nabes1);
            });
        });
        describe('hasIntersectingComponent(compArg)', () => {
            it('returns a boolean regarding any DISTINCT connecting components already present', function() {
                myGraph.addComponent(nabes1);
                expect(myGraph.hasIntersectingComponent(nabes2)).toBeTrue();
            });
        });
        describe('findIntersectingComponent(compArg)', function() {
            it('returns the component intersecting with the specified compArg', function() {
                myGraph.addComponent(nabes1);
                expect(myGraph.findIntersectingComponent(nabes2)).toEqual(nabes1);
            });
        });
        describe('mergeComponents)origComp, newComp)', function() {
            beforeEach(function() {
                myGraph.addComponent(nabes1);
                myGraph.mergeComponents(nabes1, nabes2);
            });
            it('unionizes the two components ', function() {
                expect(nabes2.isSubset(nabes1)).toBeTrue();
            });
            it('removes the newComp arg', function() {
                expect(myGraph.components).not.toContain(nabes2);
            });
            it('returns the augmented component', function() {
                expect(myGraph.mergeComponents(nabes1, nabes2)).toBe(nabes1);
            });
        });
        describe('integrateComponent(compArg)', function() {
            describe('when there is no intersecting component', () => {
                it('doesnt change the components array', function() {
                    myGraph.addComponent(nabes1);
                    myGraph.integrateComponent(nabes6);
                    expect(myGraph.components.length).toEqual(1);
                });
            });
            describe('when there is an intersecting component', () => {
                it('find an intersecting component and merges it with compArg', function() {
                    myGraph.addComponent(nabes1);
                    myGraph.integrateComponent(nabes2);
                    expect(myGraph.components.length).toEqual(1);
                });
            });
        });
        // describe('getUnvisitedNeighbors(nodeArg,compArg)', function() {
        // it('returns all neighbors not yet included in the given component', function() {
        // myGraph.addComponent(nabes1);
        // let unarr = myGraph.getUnvisitedNeighbors(v3, nabes1);
        // expect(myGraph.getUnvisitedNeighbors(v3, nabes1)).toContain(v4);
        // });
        // });
        // describe('getUnvisitedEgdes(nodeArg,compArg)', function() {
        // it('returns all edges not yet included in the given component', function() {
        // expect(myGraph.getUnvisitedEdges(v3, nabes1)).toBeArray();
        // });
        // });
    });
});