# What are Identifiers?
Identifiers are data that identify a unique [entity](https://en.wikipedia.org/wiki/Entity) apart from other entities. The concept of [Identifiers](https://en.wikipedia.org/wiki/Identifier) has many uses in the world. In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not specified and are dependent on many factors specific to their application.

In practice, identifiers are serialized strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

This is hard, error-prone and the source of many, many bugs, failures, and other negative outcomes. The Identifiers project hopes to tackle this problem by defining sharable identifier types that can be applied across software domains.

# Identifier Types
Identifier types can be primitive values, semantic values or structures of other identifiers.

### Primitive Identifiers
* string (UTF-8)
* boolean
* integer (32-bit signed)
* float 64-bit signed decimals (IEEE 754)
* long (64-bit signed)
* bytes (array of bytes)

### Structural Identifiers
Identifiers can be composed of multiple values. For instance, the `geo` identifier is a list of two float values. Identifiers supports two kinds of structures.

#### List Identifiers
A list identifier is a list of values. They can be primitive or semantic values. They are not a list of identifiers, but are a single identifier composed of multiple values of the same type.

#### Map Identifiers
A map identifier is a map of values. They can only be primitive values. Maps are useful to create a single identifier composed of multiple values of the same type. These values are labeled as the map keys. Maps of mixed types and identifiers are not supported.

#### List-of-List and List-of-Map Identifiers
An identifier may be composed of a list of other structured identifiers. The primitive type of these identifiers must all be the same. The structured identifiers cannot be nested more than one level.

## Semantic Identifiers
Semantic identifiers are based on either primitive or List identifiers. They can be considered to "extend" a base Identifier type.

type|type code|base type|structure|notes|
|---|---|---|---|---|
|`uuid`|`0x85`|`bytes`|16 bytes|Supports all uuid versions. [https://en.wikipedia.org/wiki/Universallyuniqueidentifier]()|
|`datetime`|`0x184`|`long`|single value|Unix time. [https://en.wikipedia.org/wiki/Unix_time]()|
|`geo`|`0x28b`|`float-list`|[latitude, longitude]|decimal latitude & longitude. [https://en.wikipedia.org/wiki/Geotagging]()|

#### Future Possibilities
* IP: https://stackoverflow.com/questions/8105629/ip-addresses-stored-as-int-results-in-overflow (integer)
* IPv6: https://technet.microsoft.com/en-us/library/cc781672(v=ws.10).aspx#w2k3tr_ipv6_how_thcz (128 bits--2 longs)
* MAC: https://en.wikipedia.org/wiki/MAC_address
* Flicks: https://github.com/OculusVR/Flicks
* The three-word addresses: http://what3words.com
* Currency
* Locale

## Cross-Version Consumption
Semantic identifiers are guaranteed safe passage through older systems that do not understand the semantics of the identifier. They can consume a semantic identifier, parse it's data, and pass it through to another system without losing the semantic type information.

As an example, if a system encounters an unknown IPv6 semantic identifier, but has no explicit support for IPv6 identifiers, this system will interpret the value as it's base identifier type which is a fixed list of 2 longs. If this system then passes this identifier on to another system that does understand IPv6 identifiers, that system will interpret it as a IPv6 identifier. The IPv6 type information is not lost along the way.

# String Encoding
Identifiers have two forms of string encoding--Data and Human. These forms have different uses.

## Data Form
The data form is intended for identifiers that go into transmitted data like JSON and XML, as well as data storage like a SQL database. They are not intended for use in URIs and are not human-enterable, though they are composed of visible characters.

Identifiers serialized for data purposes are encoded with a [Base-128 symbol set](Base-128.md) for minimum size bloat and safe transferability.

## Human Form
Identifiers are often consumed and entered by humans and thus have different constraints. Examples of this form are account identifiers, URLs and serial numbers. These identifiers are often encountered in messages like text and email. The specification can be found in the [Base-32 specification](Base-32.md).

## Encoding Format
In order to encode an identifier, one must first encode it to bytes using the [MsgPack](https://msgpack.org) encoding format. These bytes are then encoded using either [Base-128](Base-128.md) for data uses or [Base-32](Base-32.md) for human uses.

### MsgPack Structure
One must pass the MsgPack encoder the following array:

```js
[type-code, identifier-encode-value]
```
Each identifier type has a specific encode value shape that must be met. Implementations will often have platform-specific formats of the identifier values, like native class representations, but these must be transformed into formats that are usable by MsgPack.

#### Lists and Maps
Identifiers that are typed Lists and Maps must be stored as MsgPack collections. List-of-lists and list-of-maps are structured as nested MsgPack collections. Their type codes combine the structural flags and the type code of the value. In the table below these combined type codes are presented.

|type|code|MsgPack family|
|---|---|---|
|`list`|`0x8`|[array](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|
|`map`|`0x10`|[map](https://github.com/msgpack/msgpack/blob/master/spec.md#map-format-family)|
|`list-of-lists`|`0x28`|[array[arrays]](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|
|`list-of-maps`|`0x30`|[array[maps]](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|

#### Primitive Types
 
|type|code|MsgPack family|list|map|list-of-lists|list-of-maps|
|---|---|---|---|---|---|---|
|`string`|`0x0`|[string](https://github.com/msgpack/msgpack/blob/master/spec.md#str-format-family)|`0x8`|`0x10`|`0x28`|`0x30`|
|`boolean`|`0x1`|[bool](https://github.com/msgpack/msgpack/blob/master/spec.md#bool-format-family)|`0x9`|`0x11`|`0x29`|`0x31`|
|`integer`|`0x2`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0xa`|`0x12`|`0x2a`|`0x32`|
|`float`|`0x3`|[float](https://github.com/msgpack/msgpack/blob/master/spec.md#float-format-family) signed|`0xb`|`0x13`|`0x2b`|`0x33`|
|`long`|`0x4`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0xc`|`0x14`|`0x2c`|`0x34`|
|`bytes`|`0x5`|[bin](https://github.com/msgpack/msgpack/blob/master/spec.md#bin-format-family)|`0xd`|`0x15`|`0x2d`|`0x35`|

#### Semantic Types
|type|code|MsgPack format|list|map|list-of-lists|list-of-maps|
|---|---|---|---|---|---|---|
|`uuid`|`0x85`|[bin 16](https://github.com/msgpack/msgpack/blob/master/spec.md#bin-format-family) size 16|`0x8d`|`0x95`|`0xad`|`0xb5`|
|`datetime`|`0x184`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0x18c`|`0x194`|`0x1ac`|`0x1b4`|
|`geo`|`0x28b`|[fixarray]((https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)) size 2 floats|`0x293`|`0x29b`|`0x2b3`|`0x2bb`|

# Cross-Implementation Compatibility
It is expected that encoded identifiers created in one system will be consumed in another system of a different architecture. For instance, a Java server will encode an Identifier that will be consumed by a JavaScript client. To support this goal, all implementations must pass the [Test Compatibility Kit](./tck/README.md).

# Implementations
The following projects implement the Identifiers specification:

* [Identifiers-js](https://github.com/Identifiers/identifiers-js)
