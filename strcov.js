void (function() {
  var mask_up10 = parseInt("11111111110000000000", 2),
    mask_low10 = parseInt("1111111111", 2),
    mask_low6 = parseInt("111111", 2),
    mask_bit8 = parseInt("10000000", 2),
    bits_rev = [0x80, 0xc0, 0xe0, 0xf0, 0xf8, 0xfc, 0xfe, 0xff];

  /**
   * 字符串转unicode数组
   * @returns {Array}
   */
  function str2u(str) {
    var result = [],
      unicode,
      code;
    for (var i = 0, l = str.length; i < l; i++) {
      code = str.charCodeAt(i);
      if ((code & 0xfc00) === 0xdc00) {
        result.push((unicode += code & mask_low10));
      } else if ((code & 0xfc00) === 0xd800) {
        unicode = ((code & mask_low10) << 10) + 0x10000;
      } else {
        result.push(code);
      }
    }
    return result;
  }

  /**
   * unicode转utf8
   * @returns {Array}
   */
  function u2utf8(code) {
    if (code <= 0x7f) {
      return [code];
    } else {
      var result = [],
        count = 0;
      for (; code; code >>= 6, count++) {
        if (/*code >= 0x40 ||*/ code >= 0x80 >> (count + 1)) {
          result.unshift((code & mask_low6) | mask_bit8);
        } else {
          return result.unshift(bits_rev[count] | code), result;
        }
      }
      return result.unshift(bits_rev[count]), result;
    }
  }

  /**
   * unicode转utf16
   * @returns {Array}
   */
  function u2utf16(code) {
    if (code <= 0xffff) {
      return [code];
    } else {
      code -= 0x10000;
      return [
        ((code & mask_up10) >> 10) | 0xd800,
        (code & mask_low10) | 0xdc00
      ];
    }
  }
  var _exports =
    typeof module !== "undefined" && module && module.exports ? module.exports : window;
  _exports.str2u = str2u;
  _exports.u2utf8 = u2utf8;
  _exports.u2utf16 = u2utf16;
})();
