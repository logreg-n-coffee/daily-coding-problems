/*
    Implement a bit array.

    A bit array is a space efficient array that holds a value of 1 or 0 at each index.

    init(size): initialize the array with size
    set(i, val): updates index at i with val where val is either 1 or 0.
    get(i): gets the value at index i.
 */

class BitArray {
    private size: number;
    private array: Uint8Array;

    constructor(size: number) {
        this.size = size;
        this.array = new Uint8Array(Math.ceil(size / 8));
    }

    private inRange(i: number) {
        if (i < 0 || i >= this.size) {
            throw new RangeError('Invalid index');
        }
    }

    set(i: number, val: number): void {
        this.inRange(i);
        if (val === 1) {
            // 1 << (i % 8) - create a bitmask that has a single bit set to 1 in the i % 8th position, 
            // and all other bits set to 0
            this.array[Math.floor(i / 8)] |= 1 << (i % 8);
        } else {
            this.array[Math.floor(i / 8)] &= ~(1 << (i % 8));
        }
    }

    get(i: number): boolean {
        this.inRange(i);
        return (this.array[Math.floor(i / 8)] & (1 << (i % 8))) !== 0;
    }
}

const bitArray = new BitArray(5);
bitArray.set(0, 1);
bitArray.set(1, 0);
bitArray.set(2, 1);
bitArray.set(3, 0);
bitArray.set(4, 1);

for (let i = 0; i < 5; i++) { 
    console.log(bitArray.get(i));
}
