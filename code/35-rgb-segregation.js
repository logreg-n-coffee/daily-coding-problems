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
                temp = s[low];
                s[low] = s[mid];
                s[mid] = temp;
                low++;
                mid++;
                break;

            case 'G':
                mid++;
                break;

            case 'B':
                temp = s[mid];
                s[mid] = s[high];
                s[high] = temp;
                high--;
                break;
        }
    }

    return s;
};

console.log(segregate(['G', 'B', 'R', 'R', 'B', 'R', 'G']));
