const fs = require('fs-extra');


function tck(factory, path, ...values) {
  const ids = createIDsFromValues(factory, values);
  const tckObjects = createTCKObjects(ids);
  persistTCK(tckObjects, path);
}

function createIDsFromValues(factory, values) {
  const IDs = values.map((value) => factory(value));
  IDs.push(factory.list(values));
  const valueMap = mapFromValues(values);
  IDs.push(factory.map(valueMap));
  return IDs;
}

function mapFromValues(values) {
  return values.reduce((acc, value, i) => ({...acc, [keyCode(i)]: value}), {});
}

/*
  Initially I created a fancy function that computed the keyCode without Number.toString() but this is shorter.
  It generates double-digit keys, but since '0' is 'a', mapping '10' to letters produces 'ba'.
*/

//create a mapping from toString(26) result to a-z codes
const codeMapping = {};
const firstCode = 'a'.charCodeAt(0);
for (let i = 0; i < 26; i++) {
  codeMapping[i.toString(26)] = String.fromCharCode(firstCode + i);
}

function keyCode(pos) {
  const s = pos.toString(26);
  return s.split('').reduce((acc, char) => acc + codeMapping[char], '');
}

const CODEC = Symbol.for('id-codec');

function createTCKObjects(ids) {
  return ids.map((id) => {
    const codec = id[CODEC];
    const human = id.toHumanString();
    const mixed = human
      .split('')
      .map(maybeReplaceChar)
      .join('');

    return {
      type: codec.type,
      typeCode: codec.typeCode,
      value: id.value,
      data: id.toDataString(),
      human: human,
      mixedHuman: mixed
    }
  })
}

function maybeReplaceChar(value, index) {
  const mustUppercase = index % 5 === 0;
  const maybeAlias = index % 2 === 0;

  if (maybeAlias) {
    if (value === "0") {
      value = "o";
    } else if (value === "1") {
      value = index % 4 === 0 ? "l" : "i";
    }
  }

  if (mustUppercase) {
    value = value.toUpperCase();
  }

  return value;
}


function persistTCK(tck, path) {
  fs.outputFileSync(`./files/${path}.json`, JSON.stringify(tck, null, 2));
}

module.exports = {tck, createIDsFromValues, mapFromValues, createTCKObjects, persistTCK};