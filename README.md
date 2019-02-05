# strcov 
str2u &amp; u2utf8 &amp; u2utf16 of web | nodejs
```
str2u("😀🌿🎅").map(u=>u.toString(16))// (3) ["1f600", "1f33f", "1f385"]

str2u("😀🌿🎅").map(u => u2utf8(u).map(u8 => u8.toString(16)))// [ [ 'f0', '9f', '98', '80' ],[ 'f0', '9f', '8c', 'bf' ],[ 'f0', '9f', '8e', '85' ] ]

str2u("مرحباً😀🌿🎅").map(u => u2utf16(u).map(u16 => u16.toString(16)))// [ [ '645' ],[ '631' ],[ '62d' ],[ '628' ],[ '627' ],[ '64b' ],[ 'd83d', 'de00' ],[ 'd83c', 'df3f' ],[ 'd83c', 'df85' ] ]

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
  )// abcمرحباً😀🌿🎅```

