const ID = require('identifiers-js');
const generator = require('./generator');

/*
  Generate tck files:

  * Primitives - one has to implement all the primitives before semantics
  * semantic - individualized so one can implement them over time

  Data structure:
  type code
  type string name
  value - will be the fields for semantic, like 'latitude' and 'longitude'
  base128
  base32
    - upper, lower, mixed case? Do we need to do this? I think so

  Fail cases - values that should not encode or create identifiers. Out of range for instance
 */


// string
const stringValues = [
  'Hello, World!',
  ''
];
generator.tck(stringValues, ID.factory.string, 'primitives/strings');



