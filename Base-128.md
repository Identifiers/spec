# Base 128 Encoding
## Rationale
Identifiers are often non-string values and need to be encoded as strings, so they need a safe string representation to live in data objects. Other systems use binary-to-string encodings to accomplish this need, such as Base-32 or Base-64. Reusing these encodings is expedient, but not that practical, for the purpose of encoding identifiers as strings in data. The problems are size and complexity.

### Size
Binary data encoded as Base-64 expands to be about 33% larger than the size of the data itself. The Base-64 encoding was designed for pre-Unicode systems where the only reliable cross-platform strings were ASCII characters.

Base-128 uses the now-common UTF-8 Latin-1 block which shares visible characters with several popular character sets.

### Complexity
Older binary encoding schemes like Base-64 were designed to transmit binary data with text systems like email and usenet. they included features like multi-line breaks, chunked delivery, line padding and character-aliasing.

Base-128 is not meant for binary data transfer and won't need to support this complexity.

## Requirements
This encoding should have the following characteristics:

* Smallest possible representation of binary data
* Visible characters in the ISO-8859-1/15 / ANSI / Windows-1252 / UTF-8 (Latin 1 block) character set
  * Does NOT need to be URL-encoding safe
  * Character codes < 256 for encoding simplicity
* Interpreted as a string without escape sequences in the serialization formats of JSON, CSV, XML, and Markdown
  * Does not contain markers, delimiters or escape chars in these formats
* Not confusable with other well-known encodings
* Does not need to support multi-line splitting, chunking, padding or case-insensitivity

### Alphabet

|pos|char|code|  |pos|char|code|  |pos|char|code|  |pos|char|code|
|---:|:---:|---:|---|---:|:---:|---:|---|---:|:---:|---:|---|---:|:---:|---:|
|0|**`/`**|0x2F| |32|**`T`**|0x54| |64|**`z`**|0x7A| |96|**`Þ`**|0xDE|
|1|**`0`**|0x30| |33|**`U`**|0x55| |65|**`¿`**|0xBF| |97|**`ß`**|0xDF|
|2|**`1`**|0x31| |34|**`V`**|0x56| |66|**`À`**|0xC0| |98|**`à`**|0xE0|
|3|**`2`**|0x32| |35|**`W`**|0x57| |67|**`Á`**|0xC1| |99|**`á`**|0xE1|
|4|**`3`**|0x33| |36|**`X`**|0x58| |68|**`Â`**|0xC2| |100|**`â`**|0xE2|
|5|**`4`**|0x34| |37|**`Y`**|0x59| |69|**`Ã`**|0xC3| |101|**`ã`**|0xE3|
|6|**`5`**|0x35| |38|**`Z`**|0x5A| |70|**`Ä`**|0xC4| |102|**`ä`**|0xE4|
|7|**`6`**|0x36| |39|**`a`**|0x61| |71|**`Å`**|0xC5| |103|**`å`**|0xE5|
|8|**`7`**|0x37| |40|**`b`**|0x62| |72|**`Æ`**|0xC6| |104|**`æ`**|0xE6|
|9|**`8`**|0x38| |41|**`c`**|0x63| |73|**`Ç`**|0xC7| |105|**`ç`**|0xE7|
|10|**`9`**|0x39| |42|**`d`**|0x64| |74|**`È`**|0xC8| |106|**`è`**|0xE8|
|11|**`?`**|0x3F| |43|**`e`**|0x65| |75|**`É`**|0xC9| |107|**`é`**|0xE9|
|12|**`@`**|0x40| |44|**`f`**|0x66| |76|**`Ê`**|0xCA| |108|**`ê`**|0xEA|
|13|**`A`**|0x41| |45|**`g`**|0x67| |77|**`Ë`**|0xCB| |109|**`ë`**|0xEB|
|14|**`B`**|0x42| |46|**`h`**|0x68| |78|**`Ì`**|0xCC| |110|**`ì`**|0xEC|
|15|**`C`**|0x43| |47|**`i`**|0x69| |79|**`Í`**|0xCD| |111|**`í`**|0xED|
|16|**`D`**|0x44| |48|**`j`**|0x6A| |80|**`Î`**|0xCE| |112|**`î`**|0xEE|
|17|**`E`**|0x45| |49|**`k`**|0x6B| |81|**`Ï`**|0xCF| |113|**`ï`**|0xEF|
|18|**`F`**|0x46| |50|**`l`**|0x6C| |82|**`Ð`**|0xD0| |114|**`ð`**|0xF0|
|19|**`G`**|0x47| |51|**`m`**|0x6D| |83|**`Ñ`**|0xD1| |115|**`ñ`**|0xF1|
|20|**`H`**|0x48| |52|**`n`**|0x6E| |84|**`Ò`**|0xD2| |116|**`ò`**|0xF2|
|21|**`I`**|0x49| |53|**`o`**|0x6F| |85|**`Ó`**|0xD3| |117|**`ó`**|0xF3|
|22|**`J`**|0x4A| |54|**`p`**|0x70| |86|**`Ô`**|0xD4| |118|**`ô`**|0xF4|
|23|**`K`**|0x4B| |55|**`q`**|0x71| |87|**`Õ`**|0xD5| |119|**`õ`**|0xF5|
|24|**`L`**|0x4C| |56|**`r`**|0x72| |88|**`Ö`**|0xD6| |120|**`ö`**|0xF6|
|25|**`M`**|0x4D| |57|**`s`**|0x73| |89|**`×`**|0xD7| |121|**`÷`**|0xF7|
|26|**`N`**|0x4E| |58|**`t`**|0x74| |90|**`Ø`**|0xD8| |122|**`ø`**|0xF8|
|27|**`O`**|0x4F| |59|**`u`**|0x75| |91|**`Ù`**|0xD9| |123|**`ù`**|0xF9|
|28|**`P`**|0x50| |60|**`v`**|0x76| |92|**`Ú`**|0xDA| |124|**`ú`**|0xFA|
|29|**`Q`**|0x51| |61|**`w`**|0x77| |93|**`Û`**|0xDB| |125|**`û`**|0xFB|
|30|**`R`**|0x52| |62|**`x`**|0x78| |94|**`Ü`**|0xDC| |126|**`ü`**|0xFC|
|31|**`S`**|0x53| |63|**`y`**|0x79| |95|**`Ý`**|0xDD| |127|**`ý`**|0xFD|


### End Marker
An end marker identifies the string as a Base-128 encoded identifier. This marker, the thorn `þ` 0xFD character, terminates the string value This character is only used currently in Iceland (see https://en.wikipedia.org/wiki/Thorn_(letter)). Thorn is never at the end of a word so an encoded identifier shouldn't be confused with an Icelandic word.

### Whitespace

### Regular Expression
This regular expression can match a whole Base-128 encoded identifier: `[/-9?-Za-z¿-ý]{2,}þ`
