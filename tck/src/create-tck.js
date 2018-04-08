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

// Primitives

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
  Number.MIN_VALUE,
  -900.11,
  0.1,
  88.44323,
  Number.MAX_VALUE
);

generator.tck(ID.factory.integer, 'primitives/integer',
  -(2 ** 31),
  -32767,
  0,
  255,
  2 ** 31 - 1
);

generator.tck(ID.factory.long, 'primitives/long',
  Number.MIN_SAFE_INTEGER,
  -4095,
  0,
  511,
  Number.MAX_SAFE_INTEGER
);


// Semantic

generator.tck(ID.factory.datetime, 'semantic/datetime',
  new Date(0, 0).getTime(),
  0,
  1000000000000
);

generator.tck(ID.factory.geo, 'semantic/geo',
  {latitude: -90, longitude: 180},
  {latitude: 49.4434543323, longitude: -2.47392},
  {latitude: 0, longitude: 0},
  {latitude: 90, longitude: -180}
);

generator.tck(ID.factory.uuid, 'semantic/uuid',
  '00000000-0000-0000-0000-000000000000',
  '7ef38626-3adf-11e8-b467-0ed5f89f718b',
  '9ae7ed67-124e-4d50-ba13-f56e2d54383e',
  'ffffffff-ffff-ffff-ffff-ffffffffffff'
);