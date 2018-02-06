# Base-32 Encoding
## Rationale

## Requirements
* Checksum
* Aliases for common mistyping
* Case-insensitive
* URL-safe

### Relationship to Base-128
Identifiers also specifies a software-driven encoding format for use cases that do not require human-driven transimssion. Details can be found in the [Base-128 Encoding](./Base-128.md) definition.

### Symbol Table
|pos|char|code|  |pos|char|code|
|---:|---|---|---|---:|---|---|
|0|**`0[o,O]`**|0x30, 0x6F, 0x4F| |16|**`g[G]`**|0x67, 0x47|
|1|**`1[i,I,l,L]`**|0x31, 0x69, 0x49, 0x6C, 0x4C| |17|**`h[H]`**|0x68, 0x48|
|2|**`2`**|0x32| |18|**`j[J]`**|0x6A, 0x4A|
|3|**`3`**|0x33| |19|**`k[K]`**|0x6B, 0x4B|
|4|**`4`**|0x34| |20|**`m[M]`**|0x6D, 0x4D|
|5|**`5`**|0x35| |21|**`n[N]`**|0x6E, 0x4E|
|6|**`6`**|0x36| |22|**`p[P]`**|0x70, 0x50|
|7|**`7`**|0x37| |23|**`q[Q]`**|0x71, 0x51|
|8|**`8`**|0x38| |24|**`r[R]`**|0x72, 0x52|
|9|**`9`**|0x39| |25|**`s[S]`**|0x73, 0x53|
|10|**`a[A]`**|0x61, 0x41| |26|**`t[T]`**|0x74, 0x54|
|11|**`b[B]`**|0x62, 0x42| |27|**`v[V]`**|0x76, 0x56|
|12|**`c[C]`**|0x63, 0x43| |28|**`w[W]`**|0x77, 0x57|
|13|**`d[D]`**|0x64, 0x44| |29|**`x[X]`**|0x78, 0x58|
|14|**`e[E]`**|0x65, 0x45| |30|**`y[Y]`**|0x79, 0x59|
|15|**`f[F]`**|0x66, 0x46| |31|**`z[Z]`**|0x7A, 0x5A|

### Checksum Addedum
|pos|char|code|
|---:|---|---|
|32|**`*`**|0x2A|
|33|**`~`**|0x7E|
|34|**`$`**|0x24|
|35|**`=`**|0x3D|
|36|**`u[U]`**|0x75, 0x55|

