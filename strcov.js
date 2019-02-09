void (function() {
  var _exports =
    typeof module !== "undefined" && module && module.exports
      ? module.exports
      : window;
  _exports.str2u = str2u;
  _exports.str2utf8 = str2utf8;
  _exports.str2utf16 = str2utf16;
  _exports.u2utf8 = u2utf8;
  _exports.u2utf16 = u2utf16;
  _exports.u_2str = u_2str;
  _exports.utf8_2str = utf8_2str;
  _exports.utf16_2str = utf16_2str;

  var mask_up10 = parseInt("11111111110000000000", 2),
    mask_low10 = parseInt("1111111111", 2),
    mask_low6 = parseInt("111111", 2),
    mask_bit8 = parseInt("10000000", 2),
    bits_rev = [0x80, 0xc0, 0xe0, 0xf0, 0xf8, 0xfc, 0xfe, 0xff];

  /**
   * 字符串转unicode数组
   * @param {String} str
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
   * @param {String} str
   * @returns {Array}
   */
  function str2utf8(str) {
    return str2u(str).reduce((u8arr, u) => u8arr.concat(u2utf8(u)), []);
  }

  /**
   * @param {String} str
   * @returns {Array}
   */
  function str2utf16(str) {
    return Array.prototype.map.call(str, char => char.charCodeAt(0));
  }

  /**
   * unicode转utf8
   * @param {Number} code
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
   * @param {Number} code
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

  /**
   *
   * @param {Number|Array[Number]|TypeArray} codes
   * @returns {String}
   */
  function u_2str(codes) {
    return typeof codes === "number"
      ? _utf16chars_2str(u2utf16(codes))
      : codes.map(code => _utf16chars_2str(u2utf16(code))).join("");
  }

  /**
   *
   * @param {Number|Array[Number]|TypeArray} codes
   * @returns {String}
   */
  function utf16_2str(codes) {
    return typeof codes === "number"
      ? String.fromCharCode(codes)
      : _utf16chars_2str(codes);
  }
  /**
   *
   * @param {Number|Array[Number]|TypeArray} codes
   * @returns {String}
   */
  function utf8_2str(codes) {
    typeof codes === "number" && (codes = [codes]);
    var result = "";
    for (
      var i = 0, l = codes.length, unicode = 0, count = 0, code;
      i < l;
      i++
    ) {
      code = codes[i];
      switch (true) {
        case (code & 0x80) === 0:
          result += String.fromCharCode(code);
          break;
        case (code & 0xc0) === 0x80:
          if (--count >= 0) {
            unicode |= (code & mask_low6) << (count * 6);
            if (count === 0) {
              result += String.fromCharCode.apply(String, u2utf16(unicode));
            }
          }
          break;
        default:
          if (count !== 0) {
            result += String.fromCharCode.apply(String, u2utf16(unicode));
          }
          for (count = 2; count <= 6; count++) {
            if ((code & bits_rev[count]) === bits_rev[count - 1]) {
              unicode = (code & !bits_rev[count]) << (count-- * 6);
              break;
            }
          }
          break;
      }
    }
    return result;
  }

  function _utf16chars_2str(codes) {
    return String.fromCharCode.apply(String, codes);
  }
})();
