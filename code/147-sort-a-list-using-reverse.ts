/*
Given a list, sort it using this method: 
reverse(lst, i, j), which reverses lst from i to j.
 */

/* Solve the question using pancake sorting
First, let size be the size of the list that we're concerned with sorting at the moment.
Then, we can find the position where the maximum element is in list[:size + 1], say max_ind.
Then, reverse the sublist from 0 to max_ind to put the element at the front.
Then, reverse the sublist from 0 to size to put the max element to the end.
Decrement size and repeat, until size is 0.
 */
(() => { 
    // reverse the items (in place) in the list from i to j (j included)
    const reverse = (lst: number[], i: number, j: number) => { 
        while (i < j) {
            [lst[i], lst[j]] = [lst[j], lst[i]];
            i++;
            j--;
        }
    };

    // implement pancake sort d
    function pancakeSort(lst: number[]): number[] {
        for (let size = lst.length - 1; size >= 0; size--) {
            const maxInd = maxPos(lst.slice(0, size + 1));
            reverse(lst, 0, maxInd);
            reverse(lst, 0, size);
        }
        return lst;
    }

    function maxPos(lst: number[]): number {
        return lst.indexOf(Math.max(...lst));
    }

    const myList = [9, 5, 2, 1, 3, 4];
    console.log(pancakeSort(myList));
})();

/* 
using built-in methods for reverse (j not included):
const reverse = (lst: number[], i: number, j: number) => { 
    let selected = lst.slice(i, j + 2);
    selected = selected.reverse();

    for (let x = i; x < j; x++) {
        lst[x] = selected[x];
    }
};
 */
