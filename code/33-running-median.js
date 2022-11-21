/*
Compute the running median of a sequence of numbers. 
That is, given a stream of numbers, print out the median of the list so far on each new element.

Recall that the median of an even-numbered list is the average of the two middle numbers.

For example, given the sequence [2, 1, 5, 7, 2, 0, 5], your algorithm should print out:

2
1.5
2
3.5
2
2
2
*/

const runningSequence = (seq) => {
    const length = seq.length;
    let temp = [];

    for (let i = 0; i < length; i++) {
        temp.push(seq[i]);
        temp = temp.sort((a, b) => a - b);

        // console.log(i);
        // console.log(temp);

        // if the number of elements in the list is ODD (i starts from 0 - it means the max index here)
        if (i % 2 === 0) {
            console.log(temp[Math.floor(i * 0.5)]);
        } else if (i % 2 === 1) {
            // if the number of elements in the list is EVEN
            console.log((temp[Math.floor(i * 0.5)] + temp[Math.floor(i * 0.5 + 1)]) * 0.5);
        }
    }
};

runningSequence([2, 1, 5, 7, 2, 0, 5]);

// if we ignore reading from the stream, then time complexity will be O(n * log(n))
// space complexity: O(n)