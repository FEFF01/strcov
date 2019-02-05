let { str2u, u2utf8, u2utf16 } = require("./strcov.js");

console.log("===============================================");

console.log(
  `str2u("😀🌿🎅").map(u=>u.toString(16))//`,
  str2u("😀🌿🎅").map(u => u.toString(16))
);

console.log("===============================================");

console.log(
  `str2u("😀🌿🎅").map(u => u2utf8(u).map(u8 => u8.toString(16)))//`,
  str2u("😀🌿🎅").map(u => u2utf8(u).map(u8 => u8.toString(16)))
);

console.log("===============================================");

console.log(
  `str2u("مرحباً😀🌿🎅").map(u => u2utf16(u).map(u16 => u16.toString(16)))//`,
  str2u("مرحباً😀🌿🎅").map(u => u2utf16(u).map(u16 => u16.toString(16)))
);

console.log("===============================================");

console.log(
  `eval(
    '"' +
      str2u("abcمرحباً😀🌿🎅").reduce(
        (str, u) =>
          str +
          u2utf16(u)
            .map(u16 => "\\u{" + u16.toString(16) + "}")
            .join(""),
        ""
      ) +
      '"'
  )//`,
  eval(
    '"' +
      str2u("abcمرحباً😀🌿🎅").reduce(
        (str, u) =>
          str +
          u2utf16(u)
            .map(u16 => "\\u{" + u16.toString(16) + "}")
            .join(""),
        ""
      ) +
      '"'
  )
);

console.log("===============================================");

console.time(`str2u("abc😀🌿🎅").map(u2utf8)//loop 10000//`);
for (let i = 0; i < 10000; i++) {
  str2u("abc😀🌿🎅").map(u2utf8);
}
console.timeEnd(`str2u("abc😀🌿🎅").map(u2utf8)//loop 10000//`);

console.log("===============================================");
