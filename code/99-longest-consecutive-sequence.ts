/*
Given an unsorted array of integers, 
find the length of the longest consecutive elements sequence.

For example, given [100, 4, 200, 1, 3, 2], 
the longest consecutive element sequence is [1, 2, 3, 4]. 
Return its length: 4.

Your algorithm should run in O(n) complexity.
 */

const longestConsecutive = (nums: number[]): number => { 
    const set = new Set(nums);

    let longestStreak = 0;

    for (const n of set) {
        if (!set.has(n - 1)) {
            let currentNum = n;
            let currentStreak = 1;

            while (set.has(currentNum + 1)) {
                currentNum++;
                currentStreak++;
            }

            longestStreak = Math.max(longestStreak, currentStreak);
        }
    }

    return longestStreak;
};

// TC: O(n); SC: O(n)


(() => { 
    console.log(longestConsecutive([1, 2, 0, 1]));
    console.log(longestConsecutive([0]));
    console.log(longestConsecutive([0, 0]));
    console.log(longestConsecutive([]));
})();