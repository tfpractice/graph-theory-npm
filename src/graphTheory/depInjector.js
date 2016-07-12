var argsList = require('args-list');
module.exports = function Injector() {
    var dependencies = {};
    var factories = {};
    var container = {};

    container.factory = function setFactory(name, fMod) {
        factories[name] = fMod;

    };
    container.register = function register(name, dep) {
        dependencies[name] = dep;
    }
    container.retrieve = function retrieve(name) {
        if (!dependencies[name]) {
            let factory = factories[name];
            dependencies[name] = factory && container.inject(factory);
            if (!dependencies[name]) {
                throw new Error('Cannot find module: ' + name);
            }
        }
        return dependencies[name];
    }
    container.inject = function inject(factory) {
        let fArgs = argsList(factory).map(depArg => container.retrieve(depArg));
        return factory.apply(null, fArgs);
    };
    return container;
};