## Identifiers Test Compatibility Kit

The TCK consists of files used to verify the implementation of the [Identifiers specification](../README.md). The primary goal is to ensure compatibility between implementations. 

### Version
Complies with Draft 0.4 of the specification.

### Organization of `/files`

* `symbols/` contains the [Base-128](../Base-128.md) and [Base-32](../Base-32.md) symbol set in various data file formats. Tests will parse these files and compare the symbol set with the specification. This tests that the symbol set is successfully stored, without encoding or escaping, into the data file formats. The symbols themselves are not encoded identifiers and should not be parsed.
* `primitives/` contains tests for the primitive and structural identifiers.
* `semantic/` contains tests for the specified semantic identifiers.

### Usage
A implementation will create unit that use the files to decode the encoded identifier values and compare them to the matching decoded values in each test.

*NOTE:* `byte` values in the TCK JSON files are unsigned, but in the encoded ID they are MsgPack bytes. MsgPack will decode them appropriately for the platform in use. TCK file consumers should convert the JSON byte value numbers to signed if their platform prefers signed bytes. Java is an example of such a platform.

### Compliance
An implementation must at minimum pass all the tests in `primitives/`. Support for `semantic/` tests is encouraged, though optional. If an implementation states it supports a particular semantic identifier, then it must pass the associated TCK test.