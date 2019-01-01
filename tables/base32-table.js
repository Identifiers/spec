/**
 * Douglas Crockford's base-32 symbols, lowercased.
 * @see http://www.crockford.com/wrmg/base32.html
 */
const SYMBOLS = '0123456789abcdefghjkmnpqrstvwxyz';

/**
 * Douglas Crockford's base-32 symbol aliases.
 * @see http://www.crockford.com/wrmg/base32.html
 */
const DECODE_ALIASES = {
  '0': 'oO',
  '1': 'iIlL'
};
/**
 * Checksum extra symbols.
 * @see http://www.crockford.com/wrmg/base32.html
 */
const CHECK_EXTRAS = '*~$=u';

// creates a Markdown table of the symbols, plus the checksum addendum
let tbl = `
### Base-32 Symbol Table
|pos|char _[aliases]_|code|  |pos|char _[aliases]_|code|
|---:|---|---|---|---:|---|---|
`;
for (let i = 0; i < SYMBOLS.length / 2; i++) {
  const cols = [];
  for (let c = i; c <= i + 16; c += 16) {
    let chars = SYMBOLS.charAt(c);
    const aliases = DECODE_ALIASES[chars];
    if (aliases) {
      chars += aliases;
    } else {
      chars = appendUpperChar(chars);
    }
    cols.push(cell(c, chars));
  }
  tbl += `${cols[0]} ${cols[1]}\n`;
}

console.log(tbl);


tbl = `### Checksum Addedum
|pos|char _[alias]_|code|
|---:|---|---|
`;
Array.from(CHECK_EXTRAS).forEach((char, i) => {
  const chars = appendUpperChar(char);
  tbl += `${cell(i + 32, chars)}\n`;
});

console.log(tbl);

console.log('### Regular Expression');
console.log('`^[0-9A-TV-Za-tv-z]{2,}[0-9A-Za-z*~$=]$`');



// Helper functions
function cell(pos, chars) {
  const codes = Array.from(chars).map(char => `0x${char.charCodeAt(0).toString(16).toUpperCase()}`);
  let charStr = chars.charAt(0);
  if (codes.length > 1) {
    const aliases = Array.from(chars.substr(1));
    charStr += ` [${aliases.join(',')}]`;
  }
  return `|${pos}|**\`${charStr}\`**|${codes.join(', ')}|`;
}

function appendUpperChar(chars) {
  const upper = chars.toUpperCase();
  if (upper !== chars) {
    chars += upper;
  }
  return chars;
}
