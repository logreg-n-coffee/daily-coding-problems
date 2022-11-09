/**
 * Given an array of time intervals (start, end) for classroom lectures (possibly overlapping), 
 * find the minimum number of rooms required.
 * 
 * For example, given [(30, 75), (0, 50), (60, 150)], you should return 2.
 * Example 2: [(1, 10), (2, 7), (3, 19), (8, 12), (10, 20), (11, 30)] returns 4.
 */

/**
 * @param {number[][]} intervals
 * @return {number}
 */
const minMeetingRooms = (intervals) => {
    // intervals length
    const n = intervals.length;

    // base case - if there are no intervals then return 0 
    if (n === 0) return 0;

    // build start and end arrays
    const start = [];
    const end = [];

    intervals.forEach(i => {
        start.push(i[0]);
        end.push(i[1]);
    });

    start.sort((a, b) => a - b);
    end.sort((a, b) => a - b);

    // loop through start array and visit end array using two pointers (start pointer and end pointer)
    let sPointer = 0;
    let ePointer = 0;

    // variable to keep track of max number of rooms used
    let usedRooms = 0;

    // iterate through intervals
    while (sPointer < n) {
        // if there is a meeting that has ended by the time the meeting at sPointer starts
        if (start[sPointer] >= end[ePointer]) {
            usedRooms--;
            ePointer++;
        }

        // do the following irrespective of whether a room frees up or not
        // if a room gets free, then usedRooms++ below won't have any effect as it was offset by usedRooms-- above
        // if no room is free, then used rooms will be added by one
        usedRooms++;
        sPointer++;
    }

    // return used rooms
    return usedRooms;
};

const testArr1 = [
    [30, 75],
    [0, 50],
    [60, 150],
];
console.log(testArr1, '\n', minMeetingRooms(testArr1));

const testArr2 = [
    [1, 10],
    [2, 7],
    [3, 19],
    [8, 12],
    [10, 20],
    [11, 30],
];
console.log(testArr2, '\n' , minMeetingRooms(testArr2));
