/*

    Design and implement a HitCounter class that keeps track of requests (or hits). It should support the following operations:

    - record(timestamp): records a hit that happened at timestamp
    - total(): returns the total number of hits recorded
    - range(lower, upper): returns the number of hits that occurred between timestamps lower and upper (inclusive)
    
    Follow-up: What if our system has limited memory?

 */

class HitCounter {
    private static timestampHitMap: { [timestamp: number]: number } = {};
    private static totalHits: number = 0;
    public static uniqueTimestamps: number = 0;

    constructor() {}

    public static record(timestamp: number): void {
        if (Object.keys(HitCounter.timestampHitMap).includes(String(timestamp))) { 
            HitCounter.timestampHitMap[timestamp]++;
            HitCounter.totalHits++;
        } else {
            HitCounter.timestampHitMap[timestamp] = 1;
            HitCounter.totalHits++;
            HitCounter.uniqueTimestamps++;  // only increment when there is a new timestamp - size of the obj
        }
    }

    public static total(): number {
        return HitCounter.totalHits;
    }

    public static range(lower: number, upper: number): number {
        let result = 0;

        // go through each timestamp saved as the key using for...in loop
        for (const timestamp in HitCounter.timestampHitMap) {
            const currentHit: number = HitCounter.timestampHitMap[timestamp] || 0;
            if (Number(timestamp) >= lower && Number(timestamp) <= upper) { 
                result += currentHit;
            }
        }
        return result;
    }

    public static printMap(): void {
        console.log(HitCounter.timestampHitMap);
    }
}

(() => { 
    for (let i = 0; i < 10; i++) {
        HitCounter.record(1);
    }

    for (let i = 0; i < 5; i++) {
        HitCounter.record(3);
    }

    for (let i = 0; i < 15; i++) {
        HitCounter.record(5);
    }

    for (let i = 0; i < 15; i++) {
        HitCounter.record(2.5);
    }

    HitCounter.printMap();  // prints { '1': 10, '3': 5, '5': 15, '2.5': 15 }

    console.log(HitCounter.range(1, 3));  // prints 30
    console.log(HitCounter.uniqueTimestamps);  // prints 4
})();
