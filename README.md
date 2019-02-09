# strcov 
str2u &amp; str2utf8 &amp; str2utf16 &amp; u2utf8 &amp; u2utf16  &amp; u_2str &amp; utf8_2str &amp; utf16_2str of web | nodejs
```
str2u("😀🌿🎅").map(u=>u.toString(16))// (3) ["1f600", "1f33f", "1f385"]

str2u("😀🌿🎅").map(u => u2utf8(u).map(u8 => u8.toString(16)))// [ [ 'f0', '9f', '98', '80' ],[ 'f0', '9f', '8c', 'bf' ],[ 'f0', '9f', '8e', '85' ] ]

str2u("مرحباً😀🌿🎅").map(u => u2utf16(u).map(u16 => u16.toString(16)))// [ [ '645' ],[ '631' ],[ '62d' ],[ '628' ],[ '627' ],[ '64b' ],[ 'd83d', 'de00' ],[ 'd83c', 'df3f' ],[ 'd83c', 'df85' ] ]

u_2str([0x645,0x631,0x62d,0x628,0x627,0x64b,0x1f600])// مرحباً😀

utf8_2str(str2utf8("abc😀🌿🎅").concat(str2utf8("def")))// abc😀🌿🎅def

utf16_2str(str2utf16("abc😀🌿🎅").concat(str2utf16("def")))// abc😀🌿🎅def


eval(
    '"' +
      str2u("abcمرحباً😀🌿🎅").reduce(
        (str, u) =>
          str +
          u2utf16(u)
            .map(u16 => "\u{" + u16.toString(16) + "}")
            .join(""),
        ""
      ) +
      '"'
  )// abcمرحباً😀🌿🎅
  ```

