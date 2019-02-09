let {
  str2u,
  str2utf8,
  str2utf16,
  u2utf8,
  u2utf16,
  u_2str,
  utf8_2str,
  utf16_2str
} = require("./strcov.js");

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

console.log(
  `u_2str([0x645,0x631,0x62d,0x628,0x627,0x64b,0x1f600])//`,
  u_2str([0x645, 0x631, 0x62d, 0x628, 0x627, 0x64b, 0x1f600])
);

console.log("===============================================");

console.log(
  `utf8_2str(str2utf8("abc😀🌿🎅").concat(str2utf8("def")))//`,
  utf8_2str(str2utf8("abc😀🌿🎅").concat(str2utf8("def")))
);

console.log("===============================================");

console.log(
  `utf16_2str(str2utf16("abc😀🌿🎅").concat(str2utf16("def")))//`,
  utf16_2str(str2utf16("abc😀🌿🎅").concat(str2utf16("def")))
);

console.log("===============================================");

console.time(`str2u("abc😀🌿🎅").map(u2utf8)//loop 10000//`);
for (let i = 0; i < 10000; i++) {
  str2u("abc😀🌿🎅").map(u2utf8);
}
console.timeEnd(`str2u("abc😀🌿🎅").map(u2utf8)//loop 10000//`);

console.log("===============================================");
