## VERSION 0.0 Draft


# What are Identifiers?
Identifiers are data that identify a unique [entity](https://en.wikipedia.org/wiki/Entity) apart from other entities. The concept of [Identifiers](https://en.wikipedia.org/wiki/Identifier) has many uses in the world. In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not externally defined in a specification and are dependent on many factors specific to their application.

In practice, identifiers are serialized strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

To illustrate this problem, consider a string identifer encoded with [Base64](https://en.wikipedia.org/wiki/Base64). The generator of the identifier needs to convert their identifier value into a byte array or string. It transforms this array into Base64 and sends or stores this result. Later, another application encounters this Base64 string, and then must make several determinations:

1. Is this string encoded?
2. If so, how should it be decoded?
3. Once decoded into a byte array, should it be transformed into another data structure?
4. Once it is transformed, what are the semantics of the value?

This process is hard, error-prone and the source of many bugs, failures, and other negative outcomes. The developer must find a source of truth to answer their questions about this multi-step process. Often docs are out-of-date, the developers are unavailable, or they provide incorrect guidance.

The Identifiers project hopes to tackle this problem by defining sharable identifier types that can be applied across software domains. It intends to make it simple to convert a data identifier into a string, transmit it or store it, and then allow a different application convert the encodded identifier into a semantic data value for processing.

# Identifier Types
Identifier types can be primitive values, semantic values or structured  identifiers.

### Primitive Identifiers
* string (UTF-8)
* boolean
* integer (32-bit signed)
* float 64-bit signed decimals (IEEE 754)
* long (64-bit signed)
* bytes (array of bytes)

### Structural Variants
All identifier types have collection variants that hold multiple values of the type. The two collection types are list and map. Collections can only hold same-typed values at this time.

#### List
A list identifier is a list of values. They are not a list of identifiers, but are a single identifier composed of multiple values of the same type.

#### Maps
A map identifier is a map of values. Maps are useful to create a single identifier composed of multiple labeled values of the same type. These values are labeled by the map keys. The keys are stored in sorted order for consistency.

## Semantic Identifiers
Semantic identifiers are based on either single or structured primitive identifiers. They can be considered to "extend" a base identifier type.

type|base type|structure|notes|
|---|---|---|---|
|`uuid`|`bytes`|16 bytes|Supports all uuid versions. [https://en.wikipedia.org/wiki/Universallyuniqueidentifier]()|
|`datetime`|`long`|single value|Unix time. [https://en.wikipedia.org/wiki/Unix_time]()|
|`geo`|`float-list`|[latitude, longitude]|decimal latitude & longitude. [https://en.wikipedia.org/wiki/Geotagging]()|

#### Future Possibilities
* IP: [https://stackoverflow.com/questions/8105629/ip-addresses-stored-as-int-results-in-overflow]()
* IPv6: [https://technet.microsoft.com/en-us/library/cc781672(v=ws.10).aspx#w2k3tr_ipv6_how_thcz]()
* MAC: [https://en.wikipedia.org/wiki/MAC_address]()
* Flicks: [https://github.com/OculusVR/Flicks]()
* Currency: [https://www.iso.org/iso-4217-currency-codes.html]()
* Location: [http://www.unece.org/cefact/locode/service/location.html]()

If you have suggestions please file an Issue to start a discussion.

## Cross-Version Consumption
Semantic identifiers are guaranteed safe passage through older systems that do not understand the semantics of the identifier. They can consume a semantic identifier, parse it's data, and pass it through to another system without losing the semantic type information.

As an example, if a system encounters an unknown IPv6 semantic identifier, but has no explicit support for IPv6 identifiers, this system will interpret the value as it's base identifier type which is a fixed list of 2 longs. If this system then passes this identifier on to another system that does understand IPv6 identifiers, that system will interpret it as a IPv6 identifier. The IPv6 type information is not lost along the way.

# String Encoding
Identifiers have two forms of string encoding--Data and Human. These forms have different uses.

## Data Form
The data form is intended for identifiers that go into transmitted data like JSON and XML, as well as data storage like a SQL database. They are not intended for use in URIs and are not human-enterable, though they are composed of visible characters.

Identifiers serialized for data purposes are encoded with a [Base128 symbol set](Base128.md) for minimum size bloat and safe transferability.

## Human Form
Identifiers are often consumed and entered by humans and thus have different constraints. Examples of this form are account identifiers, URLs and serial numbers. These identifiers are often encountered in messages like text and email. The specification can be found in the [Base32 specification](Base32.md).

# Implementations
The following projects implement the Identifiers specification:

* [Identifiers-js](https://github.com/Identifiers/identifiers-js)

# Implementation Requirements

This section applies to library authors who build implementations of the Identifiers spec for platforms of their choosing.

#### Primitive Identifiers
The primitive identifiers should map to any existing platform types. Most platforms have `string`, `boolean`, and the other primitive types natively implemented. If one is not available, the implementer is encouraged to build the type support into the library rather than requiring the consumer to explicitly utilize a third-party library. For instance, JS does not support a full 64-bit long value, so the JS implementation provides a long-like object with `low` and `high` ints to support the long number space. 

#### Type Codes
All primitive identifier types are associated with a 1-byte type code. Semantic identifiers have a second type code to identify themselves. The type codes are calculated with bitwise operators to accumulate the various flags that compose their full value.

#### Byte 1 Positions
|`0`|`1`|`2`|`3`|`4`|`5`|`6`|`7`|
|---|---|---|---|---|---|---|---|
|primitive|primitive|primitive|list|map|list-of|_reserved_|semantic|

#### Structured Variants
All identifier types also have structured variants that hold their values in collections. Their type codes combine the structural flags and the type code of the value. To create the full type code, `|` the appropriate structured type code to the base primitive type.

|type|code|MsgPack family|
|---|---|---|
|`list`|`0x8`|[array](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|
|`map`|`0x10`|[map](https://github.com/msgpack/msgpack/blob/master/spec.md#map-format-family)|

#### MsgPack?
String-encoded identifiers are compressed using [MsgPack](https://msgpack.org). More details are in the [following section](#encoding-format), but the related MsgPack information is included in the type tables for easy reference. 

#### Primitive Types

Here are the type codes for primitive types, as well as their list and map structured types.

|type|code|MsgPack family|list|map|
|---|---|---|---|---|
|`string`|`0x0`|[string](https://github.com/msgpack/msgpack/blob/master/spec.md#str-format-family)|`0x8`|`0x10`|
|`boolean`|`0x1`|[bool](https://github.com/msgpack/msgpack/blob/master/spec.md#bool-format-family)|`0x9`|`0x11`|
|`integer`|`0x2`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0xa`|`0x12`|
|`float`|`0x3`|[float](https://github.com/msgpack/msgpack/blob/master/spec.md#float-format-family) signed|`0xb`|`0x13`|
|`long`|`0x4`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0xc`|`0x14`|
|`bytes`|`0x5`|[bin](https://github.com/msgpack/msgpack/blob/master/spec.md#bin-format-family)|`0xd`|`0x15`|

#### Semantic Types
Semantic identifiers have 2-byte type values. The first byte is the primitive and structural information, and the second byte is the "slot" number. The integer type value is computed by starting with the base type (including structural type), adding a semantic value flag (`0x80`), and then adding the slot position shifted left by `0x8`. The left shift pushes the slot position into the second byte. For example, The `geo` type code is calculated like this:

|float|list|semantic|slot|
|---|---|---|---|
|`0x3`|`0x8`|`0x80`| `2 << 0x8`|

`0x3 | 0x8 | 0x80 | (2 << 0x8) = 0x28b`

The following table lists the defined semantic types:

|type|slot|code|MsgPack format|list|map|
|---|---|---|---|---|---|
|`uuid`|`0`|`0x85`|[bin 16](https://github.com/msgpack/msgpack/blob/master/spec.md#bin-format-family) size 16|`0x8d`|`0x95`|
|`datetime`|`1`|`0x184`|[int](https://github.com/msgpack/msgpack/blob/master/spec.md#int-format-family) signed|`0x18c`|`0x194`|
|`geo`|`2`|`0x28b`|[fixarray]((https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)) size 2 floats|`0x2ab`|`0x29b`|

##### List of Structured Semantic Identifiers
It is possible for a semantic identifier's base type to be a list or map of primitives. The example of this is the `geo` identifier. In order to create a list of these identifiers, the structured types must be marked as `list-of-lists` for list identifiers and `list-of-maps` for map identifiers. These type code addendums are defined in the following table:

|type|code|MsgPack family|
|---|---|---|
|`list-of-lists`|`0x28`|[array[arrays]](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|
|`list-of-maps`|`0x30`|[array[maps]](https://github.com/msgpack/msgpack/blob/master/spec.md#array-format-family)|

To create the type code for a list of `geo`s, Set the `list-of` flag bit (`0x20`):

`0x28b | 0x20 = 0x2ab`

## Encoding Format
In order to encode an identifier, one must first encode it to bytes using the [MsgPack](https://msgpack.org) encoding format. These bytes are then encoded using either [Base128](Base128.md) for data uses or [Base32](Base32.md) for human uses. Implementations will auto-detect the encoding format and decode into an identifier value correctly.

### MsgPack
Internally Identifiers are compressed [MsgPack data structures](https://msgpack.org). In order to interoperate with MsgPack correctly, One must pass the MsgPack encoder the following array:

```
[type-code, identifier-encode-value]
```
Each identifier type has a specific encode value shape that must be met. Implementations will often have platform-specific formats of the identifier values, like native class representations, but these must be transformed into formats that are usable by MsgPack.

# Cross-Implementation Compatibility
It is expected that encoded identifiers created in one system will be consumed in another system of a different architecture. For instance, a Java server will encode an Identifier that will be consumed by a JavaScript client. To support this goal, all implementations must pass the [Test Compatibility Kit](./tck/README.md).
