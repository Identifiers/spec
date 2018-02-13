# What are Identifiers?
Identifiers are data that identify a unique thing apart from other things. The concept has many uses (see https://en.wikipedia.org/wiki/Identifier). In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not specified and are dependent on many factors specific to their application.

In practice, identifiers are serialized strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

This is hard, error-prone and the source of many, many bugs, failures, and other negative outcomes. The Identifiers project hopes to tackle this problem and come up with solutions that can be applied across software domains.

# Identifier Types
Identifier types can be primitive values, semantic values or structures of other identifiers.

### Primitive Identifiers
* string
* boolean
* integer
* float
* long
* bytes

### List Identifiers
A list identifier is a list of values. They can be primitive or semantic values. They are not a list of identifiers, but are a single identifier composed of multiple values of the same type.

### Semantic Identifiers
Semantic identifiers are based on either primitive or List identifiers. They can be considered to "extend" a base Identifier type.

* UUID (two long integers)
* Datetime (long integer)
* GUID (string pattern?)
* username (string pattern)
* ISO-8601 (string patterns for date/time interpretation)
* Latitude/Longitude (two decimals, or two patterned strings)

### Cross-Version Consumption
Semantic identifiers are guaranteed safe passage through older systems that do not understand the semantics of the identifier. They can consume the identifier and pass it through to another system successfully. As an example, if a system encounters a UUID identifier, but has no explicit support for UUID identifiers, it will simply treat the value as a fixed list of 2 longs. If it passes this identifier on to another system that does understand UUID identifiers, that system would be able to consume it as such. If, in turn, the second system passes the identifier on as an encoded identifier, it will retain it's UUID semantic type.

# Identifiers Goals
1. Encoding identifiers into strings. The string type is the universal data format.
2. Encoded identifier strings will ensure passage through common mediums and systems.
3. One can inspect an identifier and determine it's type, and thus how to decode and parse it.
4. Libraries will be developed to accomplish these goals in a cross-system manner.

## String Encoding
Identifiers have two forms of string encoding--Data and Human. These forms have different uses.

## Data Form
The data form is intended for identifiers that go into transmitted data like JSON and XML, as well as data storage like a SQL database. They are not intended for use in URIs and are not human-enterable, though they are composed of visible characters.

Identifiers serialized for data purposes are encoded with a [Base-128 symbol set](Base-128.md) for minimum size bloat and transferability.

## Human Form
Identifiers are often consumed and entered by humans and thus have different constraints. Examples of this form are account identifiers, URLs and serial numbers. The specification can be found in the [Base-32 specification](Base-32.md).
