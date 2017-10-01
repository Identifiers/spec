# What are Identifiers?
Identifiers are data that identify some thing apart from other things. The concept has many uses (see https://en.wikipedia.org/wiki/Identifier). In software, identifiers found in every facet of development. Some types of identifiers are standardized like [UUID](https://www.ietf.org/rfc/rfc4122.txt) and [URI](https://www.w3.org/Addressing/URL/uri-spec.html). Most identifiers, however, are not specified and are dependent on many factors specific to their application.

For the most part, identifiers are strings that must be interpreted, parsed, encoded and decoded along software system pathways. They transit multiple systems, in many kinds of mediums like JSON, emails and log files. Software that must interpret this data along the way has to know how to consume the identifier and interpret it's value.

This is hard, error-prone and the source of many, many bugs, failures, and other negative outcomes. The Identifiers project hopes to tackle this problem and come up with solutions that can be applied across software domains.

# Identifiers and their Parts
Identifiers are often constructed of parts, like a URI or a composite key. These parts can be more-primitive data types, including:

* string
* integer
* decimal
* boolean

Parts can be narrowed to subsets to create semantic parts:

* Unix time (long integer)
* GUID (string pattern)
* username (string pattern)
* ISO-8601 (string patterns for date interpretation)

Parts can also be composite identifiers of multiple primitive values:

* UUID (two long integers)
* Latitude/Longitude (two decimals, or two patterned strings)

# Identifiers Goals
1. Encoding identifiers into strings. The string type is the universal data format.
2. Encoding stringifid identifiers into "safe" strings like Base32 and URL Encoding. These formats ensure "safe passage" through mediums and systems.
3. One can inspect an indentifier and determine it's type, and thus how to decode and parse it.
4. Libraries will be developed to accomplish these goals in a cross-system manner.

