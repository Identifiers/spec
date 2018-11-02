const ID = require('identifiers-js');
const generator = require('./generator');
const longSupport = require('./long-support');
const Long = require('long');

/*
  Generated tck files:

  * primitives - one has to implement all the primitives before semantics
  * semantic - individualized so one can implement them over time
  * composite - list and map composite identifiers that include all other identifier types

  Data structure:
  type code
  type string name
  value - data value of the ID. Will be the fields for semantic IDs, like 'latitude' and 'longitude'
  data
  human
 */

// Primitives
generatePrimitiveTCK();

// Composite
generateCompositeTCK();

// Semantic
generateSemanticTCK();


function generatePrimitiveTCK() {
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
    100,
    -900.11,
    0.1,
    1.0,
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

  const longIds = generator.createIDsFromValues(ID.factory.long, [
    0,
    127,
    -31,
    255,
    32769,
    -32768,
    -0x80000000,
    0x7fffffff,
    -4095,
    511,
    Number.MIN_SAFE_INTEGER,
    Number.MAX_SAFE_INTEGER,
    Long.fromBits(0, -0x80000000),
    Long.fromBits(-1, 0x7fffffff) ]
  );

  const longTckObjects = generator.createTCKObjects(longIds)
    .map(longSupport.longIdValueToStringIdValue);

  generator.persistTCK(longTckObjects, 'primitives/long');
}


function generateSemanticTCK() {
  generator.tck(ID.factory.uuid, 'semantic/uuid',
    '00000000-0000-0000-0000-000000000000',
    '7ef38626-3adf-11e8-b467-0ed5f89f718b',
    '9ae7ed67-124e-4d50-ba13-f56e2d54383e',
    'ffffffff-ffff-ffff-ffff-ffffffffffff'
  );

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
}

function generateCompositeTCK() {
  // create one of every kind of identifier
  const stringId = ID.factory.string('watch');
  const stringIdList = ID.factory.string.list('me', 'now');
  const stringIdMap = ID.factory.string.map({a: 'cats', b: 'dogs'});

  const booleanId = ID.factory.boolean(false);
  const booleanIdList = ID.factory.boolean.list(true, false);
  const booleanIdMap = ID.factory.boolean.map({a: false, b: true});

  const intId = ID.factory.integer(5574);
  const intIdList = ID.factory.integer.list(1, 2);
  const intIdMap = ID.factory.integer.map({x: 10, y: 100, z: -10});

  const floatId = ID.factory.float(0.01);
  const floatIdList = ID.factory.float.list(13.2, -9.834);
  const floatIdMap = ID.factory.float.map({t: 59.2, d: -0.023});

  const longId = ID.factory.long(67675847543);
  const longIdList = ID.factory.long.list(647585, -8474);
  const longIdMap = ID.factory.long.map({a: 1, b: 2});

  const bytesId = ID.factory.bytes([127, 0, 255]);
  const bytesIdList = ID.factory.bytes.list([1, 0], [99]);
  const bytesIdMap = ID.factory.bytes.map({j: [1], k: [2, 3]});

  const uuidId = ID.factory.uuid('d36cfb13-bcd1-4ab2-b617-2578f8a2b0c6');
  const uuidIdList = ID.factory.uuid.list('3f615648-843b-4f4c-a7c4-5a1b7b6f2ffe', '3d47ce19-7c5e-46d2-baac-f07a5404387f');
  const uuidIdMap = ID.factory.uuid.map({
    l: '0761efb5-3853-4a50-b79d-e75b714b41ee',
    m: 'ac0a26ed-6fc6-429d-80de-a3664b543598',
    n: '34356696-7b57-4459-af95-2d534067dd8f'
  });

  const datetimeId = ID.factory.datetime(1);
  const datetimeIdList = ID.factory.datetime.list(-1000000, 99788995);
  const datetimeIdMap = ID.factory.datetime.map({f: 99, t: 10000});

  const geoId = ID.factory.geo([55.342, -90]);
  const geoIdList = ID.factory.geo.list([1, 1], [-10, -10]);
  const geoIdMap = ID.factory.geo.map({
    tl: [22.308184, -160.762813],
    tr: [22.205865, -154.652198],
    bl: [18.948649, -160.773079],
    br: [18.797524, -154.699062]
  });

  const idList = [
    stringId, stringIdList, stringIdMap,
    booleanId, booleanIdList, booleanIdMap,
    intId, intIdList, intIdMap,
    floatId, floatIdList, floatIdMap,
    longId, longIdList, longIdMap,
    bytesId, bytesIdList, bytesIdMap,
    uuidId, uuidIdList, uuidIdMap,
    datetimeId, datetimeIdList, datetimeIdMap,
    geoId, geoIdList, geoIdMap
  ];

  const compositeList = ID.factory.composite.list(idList);
  const tckList = generator.createTCKObjects([compositeList]);
  generator.persistTCK(tckList.map(hoistListIDInfo), '/composites/list');

  const idMap = generator.mapFromValues(idList);
  const compositeMap = ID.factory.composite.map(idMap);
  const tckMap = generator.createTCKObjects([compositeMap]);

  generator.persistTCK(tckMap.map(hoistMapIDInfo), '/composites/map');


  function hoistListIDInfo(listId) {
    return {...listId, value: listId.value.map((id) => hoistIDInfo(id))};
  }

  function hoistMapIDInfo(mapId) {
    return {...mapId, value: Object.keys(mapId.value).reduce(
            (acc, key) => ({...acc, [key]: hoistIDInfo(mapId.value[key])}),
            {})};
  }
  function hoistIDInfo(id) {
    if (id.type.startsWith('long')) {
      id = longSupport.longIdValueToStringIdValue(id);
    }
    return {
      type: id.type,
      value: id.value
    };
  }
}
