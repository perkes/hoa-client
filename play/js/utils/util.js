define(function () {
    return {
        isInt: function (n) {
            return (n % 1) === 0;
        },

        // modulo que funciona tambien para los numeros negativos
        modulo: function (num, max) {
            return ((num % max) + max) % max;
        },

        splitNullArray: function (str) {
            return str.split("\u0000");
        },

        joinNullArray: function (array) {
            return array.join("\u0000");
        },

        encode_b58(hex_number) {
            // Set of base58 chars (Note: there is no '0','O','I' or 'l').
            const base58 = [1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];
            //Take input string of hexadecimal bytes and convert it to a base 10
            //decimal number. BigInt needed as regular JS numbers don't represent enough significant digits.
            var num = BigInt('0x' + hex_number);
            //Our very large number will be repeatedly divided by 58.
            const fifty8 = BigInt(58);
            //The remainder of this division will be a number (0-57).
            var remainder;
            //Each remainder's value maps to a character in our base58 array, and
            //the string of these characters becomes our Base58 encoded output.
            var b58_encoded_buffer = '';
            //We move from: Hex Bytes -> Decimal Number -> Base58 Encoded string.
            //To move through each place value of a base58 number, we continue to
            //divide by 58, until the integer number rounds down to 0.
            while (num > 0) {
                //The modulus operator returns our remainder, which depends on
                //the least significant digit in our BigInt converted input.
                //For example: if we were doing modulo 2 division, all odd
                //numbers - regardless of how long they are - would return a
                //remainder of 1, because the least significant digit is odd.
                remainder = num % fifty8;
        
                //Thus, we're encoding the right most (lowest place value)
                //digits first, and so each subsequently encoded character
                //needs to be added to the left of our encoded buffer
                //so that the beginning & end of our input string/bytes aligns
                //with the beginning & end of our Base58 encoded output.
                b58_encoded_buffer = base58[remainder] + b58_encoded_buffer;
        
                //Dividing by 58 gives us our quotient (rounded down to the
                //nearest integer), and moves us over one base58 place value,
                //ready for the next round of b58 division/mapping/encoding.
                num = num/BigInt(58);
            }
        
            //When we convert our byte-based hex input into a base 10 number, we
            //lose the leading zero bytes in the converted decimal number.
            //For example, if our hex input converted into the decimal number
            //000017, this number would be reduced automatically to 17 in base10,
            //and so we'd lose the leading zeros, which aren't important
            //when doing base 10 math, but are important in preserving the
            //information held in our original input value. So, in order to not
            //lose the leading zeros, we count them, and then prepend them (as
            //1's, which is their corresponding base58 value) to the beginning
            //of our Base58 encoded output string.
            while ( hex_number.match(/^00/) ){
                //For each leading zero byte, add a '1' to the encoded output.
                b58_encoded_buffer = '1' + b58_encoded_buffer;
                //And remove the leading zero byte, and test for another.
                hex_number = hex_number.substring(2);
            }
        
            return b58_encoded_buffer;
        },

        toHexString(byteArray) {
            return Array.from(byteArray, function(byte) {
              return ('0' + (byte & 0xFF).toString(16)).slice(-2);
            }).join('')
        }
    };
});
/*
 // busqueda binaria que devuelve {found,index} donde index es el index donde esta o si no lo encontro donde estaria
 // despues se lo puede insertar con list.splice(resultadoBusqueda.index, 0, item);
 var binaryPosSearch = function (list, item, cmp_func) {
 var lo = 0;
 var hi = list.length;
 while (lo < hi) {
 var mid = ((lo + hi) / 2) | 0;
 var cmp_res = cmp_func(item, list[mid]);
 if (cmp_res == 0) {
 return {
 found: true,
 index: mid
 };
 } else if (cmp_res < 0) {
 hi = mid;
 } else {
 lo = mid + 1;
 }
 }

 return {
 found: false,
 index: hi
 };
 };

 function binarySearch(ar, el, compare_fn) {
 var m = 0;
 var n = ar.length - 1;
 while (m <= n) {
 var k = (n + m) >> 1;
 var cmp = compare_fn(el, ar[k]);
 if (cmp > 0) {
 m = k + 1;
 } else if(cmp < 0) {
 n = k - 1;
 } else {
 return k;
 }
 }
 return m;
 return -m - 1;
 }*/
