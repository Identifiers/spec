const ID = require('identifiers-js');
const fs = require('fs-extra');

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


const codecSymbol = Symbol.for('id-codec');

const stringValues = [
  'hello world',
  ''
];

const stringIDs = stringValues.map((value) => ID.factory.string(value));
stringIDs.push(ID.factory.string.list(stringValues));
stringIDs.push(ID.factory.string.map({a: stringValues[0], b: stringValues[1]}));

const stringTCK = stringIDs.map((id) => {
  const codec = id[codecSymbol];
  return {
    type: codec.type,
    typeCode: codec.typeCode,
    value: id.value,
    base128: id.toString(),
    base32: id.toBase32String()
  }
});

// json
fs.outputFileSync('./files/primitives/strings.json', JSON.stringify(stringTCK, null, 2));
