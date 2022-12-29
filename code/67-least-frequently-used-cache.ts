/*
Implement an LFU (Least Frequently Used) cache. 
It should be able to be initialized with a cache size n, and contain the following methods:

1. set(key, value): sets key to value. If there are already n items in the cache and we are adding a new item, 
then it should also remove the least frequently used item. 
If there is a tie, then the least recently used key should be removed.
2. get(key): gets the value at key. If no such key exists, return null.

Each operation should run in O(1) time.
*/

class LFUCache {
    capacity: number;
    cache: Map<number, Array<number>>;
    freqs: Map<number, Set<number>>;
    minFreq: number;

    constructor(capacity: number) {
        this.capacity = capacity;
        this.cache = new Map();  // key: original key - value: frequency and original value pair
        this.freqs = new Map();  // key: frequency - value: all keys that have the same frequency
        this.minFreq = 0;
    }

    #insert(key: number, freq: number, val: number) {
        this.cache.set(key, [freq, val]);
        if (!this.freqs.has(freq)) this.freqs.set(freq, new Set());
        this.freqs.get(freq)?.add(key);
    }

    get(key: number) {
        const freqValPair = this.cache.get(key);

        if (!freqValPair) return -1;

        // freq
        const freq = freqValPair[0];
        const keys = this.freqs.get(freq);

        keys?.delete(key);

        if (this.minFreq === freq && keys?.size === 0) {
            this.minFreq++;
        }

        // val
        const val = freqValPair[1];
        this.#insert(key, freq + 1, val);

        return val;
    }

    set(key: number, val: number) {
        if (this.capacity <= 0) return;

        const freqValPair = this.cache.get(key);

        if (freqValPair !== undefined) {
            const freq = freqValPair[0];
            this.cache.set(key, [freq, val]);
            this.get(key);
            return;
        }

        if (this.capacity === this.cache.size) {
            const keys = this.freqs.get(this.minFreq);
            const keyToDelete: number = keys?.keys().next().value;
            this.cache.delete(keyToDelete);
            keys?.delete(keyToDelete);
        }

        this.minFreq = 1;
        this.#insert(key, 1, val);
    }
}

// driver code
const myCache = new LFUCache(5);
myCache.set(5, 100);
console.log(myCache.get(5));

myCache.set(6, 30);
console.log(myCache.get(6));

console.log(myCache.get(7));
