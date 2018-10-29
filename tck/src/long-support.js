const Long = require('long');

function longIdValueToStringIdValue(tobj) {
  if (tobj.type === 'long-list') {
    return {
      ...tobj,
      value: tobj.value.map(longToString)
    };
  }

  if (tobj.type === 'long-map') {
    return {
      ...tobj,
      value: Object.keys(tobj.value).reduce(
        (acc, key) => ({...acc, [key]: longToString(tobj.value[key])}),
        {})
    };
  }

  if (tobj.type === 'long') {
    return {
      ...tobj,
      value: longToString(tobj.value)
    }
  }

  throw new Error(`only supports long id types, not ${tobj}`);
}

function longToString(longObj) {
  return Long.fromBits(longObj.low, longObj.high).toString();
}

module.exports = {longIdValueToStringIdValue};