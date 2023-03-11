/*
    You're given a string consisting solely of (, ), and *. * can represent either a (, ), or an empty string. 
    Determine whether the parentheses are balanced.

    For example, (()* and (*) are balanced. )*( is not balanced.
    
    - refer to LeetCode 678
 */

(() => { 
    const checkValidString = (s: string) => { 
        // the smallest and largest possible number of open left brackets 
        // after processing the current character in the string
        let lo = 0, hi = 0;

        // go through the string
        for (const c of s) {
            lo += c === '(' ? 1 : -1;
            hi += c !== ')' ? 1 : -1;
            if (hi < 0) break;
            // lo can't be negative
            lo = Math.max(lo, 0);
        }

        return lo === 0;
    };

    console.log(checkValidString(''));
    console.log(checkValidString('(()*'));
    console.log(checkValidString('(*)'));
    console.log(checkValidString(')*('));

})();

/**
Intuition: 

When checking whether the string is valid, we only cared about the "balance": the number of extra, open left brackets as we parsed through the string. 
For example, when checking whether '(()())' is valid, we had a balance of 1, 2, 1, 2, 1, 0 as we parse through the string: 
'(' has 1 left bracket, '((' has 2, '(()' has 1, and so on. 
This means that after parsing the first i symbols, (which may include asterisks,) we only need to keep track of what the balance could be.

For example, if we have string '(***)', then as we parse each symbol, 
the set of possible values for the balance is 
[1] for '('; 
[0, 1, 2] for '(*'; [0, 1, 2, 3] for '(**'; 
[0, 1, 2, 3, 4] for '(***', and 
[0, 1, 2, 3] for '(***)'.

Furthermore, we can prove these states always form a contiguous interval. 
Thus, we only need to know the left and right bounds of this interval. 
That is, we would keep those intermediate states described above as [lo, hi] = [1, 1], [0, 2], [0, 3], [0, 4], [0, 3].
 */