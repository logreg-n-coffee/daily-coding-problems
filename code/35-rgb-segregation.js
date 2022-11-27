/*
Given an array of strictly the characters 'R', 'G', and 'B', 
segregate the values of the array so that all the Rs come first, 
the Gs come second, and the Bs come last. 

You can only swap elements of the array.

Do this in linear time and in-place.

For example, given the array ['G', 'B', 'R', 'R', 'B', 'R', 'G'], 
it should become ['R', 'R', 'R', 'G', 'G', 'B', 'B'].
*/

/**
 * @description segregate the values of the array so that all the Rs come first, then Gs, and the Bs come last. 
 * @param {string[]} s an array of strictly the characters 'R', 'G', and 'B',
 * @returns {string[]} array of strings of segregated characters
 */
const segregate = (s) => {
    const n = s.length;

    let low = 0;
    let mid = 0;
    let high = n - 1;

    let temp;

    while (mid <= high) {
        switch (s[mid]) {
            case 'R':
                // swap value at low with value at mid
                // temp = s[low];
                // s[low] = s[mid];
                // s[mid] = temp;
                [s[low], s[mid]] = [s[mid], s[low]];  // using the ES6 javascript syntax
                low++;
                mid++;
                break;

            case 'G':
                mid++;
                break;

            case 'B':
                // swap value at high with value at high
                // temp = s[mid];
                // s[mid] = s[high];
                // s[high] = temp;
                [s[high], s[mid]] = [s[mid], s[high]];
                high--;
                break;
        }
    }

    return s;
};

console.log(segregate(['G', 'B', 'R', 'R', 'B', 'R', 'G']));
