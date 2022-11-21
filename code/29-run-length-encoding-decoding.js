/*
Run-length encoding is a fast and simple method of encoding strings. 
The basic idea is to represent repeated successive characters as a single count and character. 
For example, the string "AAAABBBCCDAA" would be encoded as "4A3B2C1D2A".

Implement run-length encoding and decoding. 
You can assume the string to be encoded have no digits and consists solely of alphabetic characters. 
You can assume the string to be decoded is valid.
*/

function decode(input) {
    let output = '';
    let numberAsString = '';
    for (let i = 0; i < input.length; i++) {
        if (parseInt(input[i])) {
            numberAsString += input[i];
        } else {
            output += input[i].repeat(parseInt(numberAsString));
            numberAsString = '';
        }
    }
    return output;
}

function encode(input) {
    let seen = '';
    let count = 0;
    let result = '';
    for (let i = 0; i <= input.length; i++) {
        if (seen == input[i]) {
            count++;
        } else {
            //the first time we run this we will get an extra zero that we'll need to remove
            result += count + seen;
            seen = input[i];
            count = 1;
        }
    }
    //finally remove the leading zero
    result = result.slice(1);
    return result;
}

console.log(decode('4A13B2C1D2A')); //AAAABBBBBBBBBBBBBCCDAA
console.log(encode('AAAABBBBCCDDDAA')); //4A4B2C3D2A
