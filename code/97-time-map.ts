/*
Implement the TimeMap class:

TimeMap() Initializes the object of the data structure.

1. void set(String key, String value, int timestamp) 
    Stores the key key with the value value at the given time timestamp.

2. String get(String key, int timestamp) 
    Returns a value such that set was called previously, with timestamp_prev <= timestamp. 
    If there are multiple such values, it returns the value associated with the largest timestamp_prev. 
    If there are no values, it returns "".


Input
["TimeMap", "set", "get", "get", "set", "get", "get"]
[[], ["foo", "bar", 1], ["foo", 1], ["foo", 3], ["foo", "bar2", 4], ["foo", 4], ["foo", 5]]
Output
[null, null, "bar", "bar", null, "bar2", "bar2"]

Explanation
TimeMap timeMap = new TimeMap();
timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
timeMap.get("foo", 1);         // return "bar"
timeMap.get("foo", 3);         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
timeMap.get("foo", 4);         // return "bar2"
timeMap.get("foo", 5);         // return "bar2"
 */

class TimeMap {
    keyTimeMap: Map<string, [timestamp: number, value: string][]> = new Map();

    constructor() {
        this.keyTimeMap = new Map();
    }

    set(key: string, value: string, timestamp: number): void {
        if (!this.keyTimeMap.has(key)) {
            this.keyTimeMap.set(key, new Array());
        }

        // store the (timestamp, value) pair in key bucket
        this.keyTimeMap.get(key)?.push([timestamp, value]);
    }

    get(key: string, timestamp: number): string {
        // if the key does not exist in the map return empty string
        if (!this.keyTimeMap.has(key)) {
            return '';
        }
        
        if (timestamp < this.keyTimeMap.get(key)![0][0]) {  // non-null assertion operator !
            return '';
        }

        // use binary search on the list of the [timestamp, value] pairs

        let left = 0;
        let right = this.keyTimeMap.get(key)!.length;

        while (left < right) { 
            let mid = (left + right) >> 1;
            
            if (this.keyTimeMap.get(key)![mid][0] <= timestamp) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        // if iterator points to the first element => no time <= timestamp exists
        if (right === 0) {
            return '';
        }

        return this.keyTimeMap.get(key)![right - 1][1];
    }
}

/**
 * Your TimeMap object will be instantiated and called as such:
 * var obj = new TimeMap()
 * obj.set(key,value,timestamp)
 * var param_2 = obj.get(key,timestamp)
 */

// driver code
(() => { 
    const timeMap = new TimeMap();
    timeMap.set("foo", "bar", 1);  // store the key "foo" and value "bar" along with timestamp = 1.
    console.log(timeMap.get("foo", 1));         // return "bar"
    console.log(timeMap.get("foo", 3));         // return "bar", since there is no value corresponding to foo at timestamp 3 and timestamp 2, then the only value is at timestamp 1 is "bar".
    timeMap.set("foo", "bar2", 4); // store the key "foo" and value "bar2" along with timestamp = 4.
    console.log(timeMap.get("foo", 4));         // return "bar2"
    console.log(timeMap.get("foo", 5));         // return "bar2"
})();