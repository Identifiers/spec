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


generator.tck(ID.factory.string, 'primitives/string',
  'Hello, World!',
  ''
);

generator.tck(ID.factory.boolean, 'primitives/boolean',
  true,
  false
);

generator.tck(ID.factory.bytes, 'primitives/bytes',
  [0, 127],
  [128, 255]
);

generator.tck(ID.factory.float, 'primitives/float',
  Number.MIN_VALUE, -900.11, 0.1, 88.44323, Number.MAX_VALUE
);

generator.tck(ID.factory.integer, 'primitives/integer',
  -(2 ** 31), -32767, 0, 255, 2 ** 31 - 1
);

generator.tck(ID.factory.long, 'primitives/long',
  Number.MIN_SAFE_INTEGER, -4095, 0, 511, Number.MAX_SAFE_INTEGER
);
