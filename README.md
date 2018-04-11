# What are Identifiers?
Identifiers are data that identify a unique [entity](https://en.wikipedia.org/wiki/Entity) apart from other entities. The concept of [Identifiers](https://en.wikipedia.org/wiki/Identifier) has many uses in the world. In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not specified and are dependent on many factors specific to their application.

In practice, identifiers are serialized strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

This is hard, error-prone and the source of many, many bugs, failures, and other negative outcomes. The Identifiers project hopes to tackle this problem by defining sharable identifier types that can be applied across software domains.

# Identifier Types
Identifier types can be primitive values, semantic values or structures of other identifiers.

### Primitive Identifiers
* string
* boolean
* integer
* float
* long
* bytes

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

* UUID (16 bytes)
* Datetime (long integer)
* Geo (a list of two floats for latitude and longitude)

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

## Cross-Implementation Compatibility
It is expected that encoded identifiers created in one system will be consumed in another system of a different architecture. For instance, a Java server will encode an Identifier that will be consumed by a JavaScript client. To support this goal, all implementations must pass the [Test Compatibility Kit](./tck/README.md).

# Implementations
The following projects implement the Identifiers specification:

* [Identifiers-js](https://github.com/Identifiers/identifiers-js)
