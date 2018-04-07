## Identifiers Test Compatibility Kit

The TCK consists of files used to verify the implementation of the [Identifiers specification](../README.md). The primary goal is to ensure compatibility between implementations. 

### Organization of `/files`

* `symbols/` contains the [Base-128](../Base-128.md) and [Base-32](../Base-32.md) symbol set in various data file formats. Tests will parse these files and compare the symbol set with the specification. This tests that the symbol set is successfully stored, without encoding or escaping, into the data file formats. The symbols themselves are not encoded identifiers and should not be parsed.
* `primitives/` contains tests for the primitive and structural identifiers.
* `semantic/` contains tests for the specified semantic identifiers.

### Usage
A implementation will create unit that use the files to decode the encoded identifier values and compare them to the matching decoded values in each test.

### Compliance
An implementation must at minimum pass all the tests in `primitives/`. Support for `semantic/` tests is encouraged, though optional. If an implementation states it supports a particular semantic identifier, then it must pass the associated TCK test.