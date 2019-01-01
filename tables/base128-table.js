const SYMBOLS = '/0123456789?@ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz¿ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖ×ØÙÚÛÜÝÞßàáâãäåæçèéêëìíîïðñòóôõö÷øùúûüý';

// creates a Markdown table of the symbols, plus the regexp
let tbl = `
### Base-128 Symbol Table
|pos|char|code|  |pos|char|code|  |pos|char|code|  |pos|char|code|
|---:|:---:|---:|---|---:|:---:|---:|---|---:|:---:|---:|---|---:|:---:|---:|
`;
for (let i = 0; i < SYMBOLS.length / 4; i++) {
  tbl += `${cell(i)} ${cell(i + 32)} ${cell(i + 64)} ${cell(i + 96)}\n`;
}
console.log(tbl);

// regex
let regexStr = '`^[', startBlock = '', lastChar = '';
for (let i = 0; i < SYMBOLS.length; i++) {
  const char = SYMBOLS.charAt(i);
  if (startBlock === '') {
    startBlock = char;
    lastChar = char;
  } else if (toCharCode(lastChar) + 1 < toCharCode(char)) {
    //mark a block, start a new one
    regexStr += `${startBlock}-${lastChar}`;
    startBlock = char;
  } else if (i === SYMBOLS.length - 1) {
    regexStr += `${startBlock}-${char}`;
  }
  lastChar = char;
}

console.log('### Regular Expression');
regexStr += ']{2,}$`';
console.log(regexStr);


// Helper functions
function toCharCode(char) {
  return char.charCodeAt(0);
}

function cell(pos) {
  const code = SYMBOLS.charCodeAt(pos).toString(16).toUpperCase();
  const  char = SYMBOLS.charAt(pos);
  return `|${pos}|**\`${char}\`**|0x${code}|`;
}
