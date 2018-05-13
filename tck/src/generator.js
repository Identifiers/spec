const fs = require('fs-extra');


module.exports.tck = function(factory, path, ...values) {
  const ids = createIDsFromValues(values, factory);
  const tckObject = createTCKObject(ids);
  persistTCK(tckObject, path);
};

function createIDsFromValues(values, factory) {
  const IDs = values.map((value) => factory(value));
  IDs.push(factory.list(values));
  IDs.push(factory.map(mapFromValues(values)));
  return IDs;
}

function mapFromValues(values) {
  const map = {};
  let keyCode = 'a'.charCodeAt(0);
  values.forEach((value) => map[String.fromCharCode(keyCode++)] = value);
  return map;
}

const CODEC = Symbol.for('id-codec');

function createTCKObject(ids) {
  return ids.map((id) => {
    const codec = id[CODEC];
    return {
      type: codec.type,
      typeCode: codec.typeCode,
      value: id.value,
      base128: id.toDataString(),
      base32: id.toHumanString()
    }
  })
}

function persistTCK(tck, path) {
  fs.outputFileSync(`./files/${path}.json`, JSON.stringify(tck, null, 2));
}
