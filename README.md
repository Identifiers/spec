# What are Identifiers?
Identifiers are data that identify a unique thing apart from other things. The concept has many uses (see https://en.wikipedia.org/wiki/Identifier). In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not specified and are dependent on many factors specific to their application.

In practice, identifiers are serialized strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

This is hard, error-prone and the source of many, many bugs, failures, and other negative outcomes. The Identifiers project hopes to tackle this problem and come up with solutions that can be applied across software domains.

# Identifier Types
Identifier types can be primitive values, semantic values or structures of other identifiers.

###Primitive Identifiers
* string
* integer
* long
* decimal
* boolean
* any

The 'any' type can be any other identifier type, including structured and semantic identifiers.

###List Identifiers
Identifiers can be a list of values. The list can be either a fixed length or variable length list. Fixed-length lists can specify different types per element in the list. Variable length lists can only specify a single part type.

###Semantic Identifiers
Semantic identifiers are based on either primitive or List identifiers. They can be considered to "extend" a base Identifier type.

##TODO move all semantic identifiers to second byte. Make space for undefined primitive and structural IDs in first byte. Even if you never need them, credibility will increase.

* Datetime (long integer)
* GUID (string pattern)
* username (string pattern)
* ISO-8601 (string patterns for date/time interpretation)
* UUID (two long integers)
* Latitude/Longitude (two decimals, or two patterned strings)

###Cross-Version Consumption
Semantic identifiers are guaranteed safe passage through older systems that do not understand the semantics of the identifier. They can consume the identifier and even generate it from an exemplar successfully. As an example, if a system encounters a UUID identifier, but has no explicit support for UUID identifiers, it will simply treat the value as a fixed list of 2 longs. If it passes this identifier on to another system that does understand UUID identifiers, that system would be able to consume it as such.

# Identifiers Goals
1. Encoding identifiers into strings. The string type is the universal data format.
2. Encoding stringified identifiers into "safe" strings that will ensure "safe passage" through common mediums and systems.
3. One can inspect an indentifier and determine it's type, and thus how to decode and parse it.
4. Libraries will be developed to accomplish these goals in a cross-system manner.

