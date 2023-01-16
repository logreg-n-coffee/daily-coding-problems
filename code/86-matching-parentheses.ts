/*
Given a string of parentheses, write a function to compute 
the minimum number of parentheses to be removed to make the string valid 
(i.e. each open parenthesis is eventually closed).

For example, given the string "()())()", you should return 1. 
Given the string ")(", you should return 2, since we must remove all of them.
 */

const findParenthesesToRemove = (str: string): number => { 
    // for a valid string, each open parenthesis needs to be closed 
    let opened = 0;
    let invalid = 0;

    for (const character of str) {
        if (character === '(') {
            opened++;
        } else if (character === ')') { 
            if (opened > 0) {
                opened--;
            } else {
                invalid++;
            }
        }
    }

    // for all unclosed parentheses, count them as invalid as we finished going through the string
    invalid += opened;

    return invalid;
};

// driver code
(() => { 
    console.log('()())()', findParenthesesToRemove('()())()'));
    console.log(')(', findParenthesesToRemove(')('));
    console.log('()()', findParenthesesToRemove('()()'));
})();
