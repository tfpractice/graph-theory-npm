# graph-theory-npm (v2.0.0-alpha)
=========
A Node.js library implementation of basic graph theory.

This packages provides a number of classes that facilitate exploring graph based data-structures and algorithms.

## Installation

  npm install scapegoat --save

## Usage

  var scapegoat = require('scapegoat')
      escape = scapegoat.escape,
      unescape = scapegoat.unescape;

  var html = '<h1>Hello World</h1>',
      escaped = escape(html),
      unescaped = unescape(escaped);

  console.log('html', html, 'escaped', escaped, 'unescaped', unescaped);

## Tests

  npm test

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

## Release History

* 1.0.0 Initial release
* 2.0.0-alpha 
** Transitions from function based class declaration to ES6 class syntax
** Implements nodeArray and EdgeArray as native Array extensions
** Adds Component class for exploiring dynamic connectivity. 