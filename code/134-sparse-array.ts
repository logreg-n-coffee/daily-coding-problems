/*
    You have a large array with most of the elements as zero.

    Use a more space-efficient data structure, SparseArray, that implements the same interface:

    init(arr, size): initialize with the original large array and size.
    set(i, val): updates index at i with val.
    get(i): gets the value at index i.
 */

class SparseArray {
    public size: number;
    private map: Map<number, number>;

    constructor(size = 0) {
        this.size = size;
        this.map = new Map<number, number>();
    }

    private isNotWithinBoundaries(i: number): boolean {
        return i < 0 || i > this.size;
    }

    get(i: number): number { 
        if (this.isNotWithinBoundaries(i)) {
            throw new Error('Not within bound');
        }

        // search for the element
        if (this.map.has(i)) {
            return this.map.get(i)!;
        } else {
            return 0;
        }
    }

    set(i: number, value: number): void {
        if (this.isNotWithinBoundaries(i)) {
            throw new Error('Not within bound');
        }
        // since default value is zero, delete the entry from the map if it exists
        if (value === 0) { 
            if (this.map.has(i)) { 
                this.map.delete(i);
            }
            return;
        } else {
            // else we can override the value in i
            this.map.set(i, value);
            return;
        }
    }

    printDataStructure(): void {
        console.log(this.map);
    }
}

(() => { 
    const sparseArr = new SparseArray(10);
    console.log('size', sparseArr.size);

    sparseArr.set(0, 0);
    console.log(sparseArr.get(0));
    sparseArr.printDataStructure();

    sparseArr.set(3, 5);
    console.log(sparseArr.get(3));
    sparseArr.printDataStructure();

    sparseArr.set(5, 7);
    console.log(sparseArr.get(5));
    sparseArr.printDataStructure();

    sparseArr.set(3, 0);
    console.log(sparseArr.get(3));
    sparseArr.printDataStructure();

    sparseArr.set(20, 3);
    console.log(sparseArr.get(20));  // will get error
})();