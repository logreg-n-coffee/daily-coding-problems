/* 

Given an unsigned 8-bit integer, swap its even and odd bits. 
The 1st and 2nd bit should be swapped, the 3rd and 4th bit should be swapped, and so on.

For example, 10101010 should be 01010101. 11100010 should be 11010001.

 */

const swapBits = (num: number): number => 
    ((num & 0b01010101) << 1) | ((num & 0b10101010) >> 1);

    
(() => { 
    console.log(swapBits(0b10101010).toString(2));  // toString can convert a number per radix
    console.log(swapBits(0b11100010).toString(2));
})();

/*
0b01010101 or 0x55 is a binary number with its even bits set to 1.
0b10101010 or 0xAA is a binary number with its odd bits set to 1.
& operator is used to extract even or odd bits.
<< operator is used to shift even bits to left.
>> operator is used to shift odd bits to right.
Finally, the result of two extracted and shifted parts are combined to get the result.
 */
