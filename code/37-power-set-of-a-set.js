/*
The power set of a set is the set of all its subsets. Write a function that, given a set, generates its power set.

For example, given the set {1, 2, 3}, it should return {{}, {1}, {2}, {3}, {1, 2}, {1, 3}, {2, 3}, {1, 2, 3}}.

You may also use a list or array to represent a set.
*/

const powerSet = (nums) => {
    const subsets = [[]];
    for (const num of nums) {
        subsets.forEach(subset => subsets.push([...subset, num]));
    }
    return subsets;
};

// driver code 
const myNums = [1, 2, 3, 4, 5];
console.log('Power set of ', myNums, 'is: ', powerSet(myNums));

/*
How does it work?

If we have some subsets generated from input numbers and we want to add one more number to our input array, 
it means that we can take all already existing subsets and generate new ones by appending the new number to each of the existing.

Here is an example for [1, 2, 3]

Start with an empty subset: []

Create new subsets by adding "1" to each existing subset. It will be:[] [1]
Create new subsets by adding "2" to each existing subset. It will be:[], [1] [2], [1, 2]
Create new subsets by adding "3" to each existing subset. It will be: [], [1], [2], [1, 2] [3], [1, 3], [2, 3], [1, 2, 3]
*/
