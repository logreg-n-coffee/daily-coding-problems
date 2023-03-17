/* 
    Given a pivot x, and a list lst, partition the list into three parts.

    The first part contains all elements in lst that are less than x
    The second part contains all elements in lst that are equal to x
    The third part contains all elements in lst that are larger than x
    Ordering within a part can be arbitrary.
 */

(() => { 
    const partition = (lst: number[], x: number): number[] => { 
        let i = 0;
        let j = 0;
        let k = lst.length - 1;

        while (j < k) {
            if (lst[j] === x) {
                j++;
            } else if (lst[j] < x) {
                [lst[i], lst[j]] = [lst[j], lst[i]];
                i++;
                j++;
            } else {
                [lst[j], lst[k]] = [lst[k], lst[j]];
                k--;
            }
        }

        return lst;
    };

    const arr = [9, 12, 3, 5, 14, 10, 10];
    const pivot = 10;
    console.log(partition(arr, pivot));
})();

/*
Solution:
    Solve the problem with three pointer (i, j, k) approach: 
    1. All elements in lst[:i] are less than x
    2. All elements in lst[i:j] are equal to x
    3. All elements in lst[k + 1:] are greater than x
    Then, iterate with j and put lst[j] according to the above invariants.
 */