/*
Gray code is a binary code where each successive value differ 
in only one bit, as well as when wrapping around. 
Gray code is common in hardware so that we don't see temporary spurious values during transitions.

Given a number of bits n, generate a possible gray code for it.

For example, for n = 2, one gray code would be [00, 01, 11, 10].

https://en.wikipedia.org/wiki/Gray_code
 */

// use recursion to solve gray code problem
(() => { 
    function grayCode(n: number): number[] {
        if (n === 0) return [];
        else if (n === 1) return [0, 1];

        const prevGrayCode = grayCode(n - 1);
        const result = [];

        for (const code of prevGrayCode) {
            result.push(code);
        }

        for (const code of prevGrayCode.reverse()) {
            result.push((1 << n - 1) + code);
        }

        return result;
    }

    console.log(grayCode(2).map(x => x.toString(2)));
})();